import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import pg from 'pg'

try {
  process.loadEnvFile()
} catch (error) {
  const code = (error as NodeJS.ErrnoException).code
  if (code !== 'ENOENT') throw error
}

const R2_MEDIA_PREFIX = 'mahg/media'
const configuredMediaDirectory = process.env.MEDIA_LOCAL_DIR
if (!configuredMediaDirectory) {
  throw new Error(
    'MEDIA_LOCAL_DIR is required. Point it to the production media volume; development media must not be migrated.',
  )
}
const mediaDirectory = path.resolve(configuredMediaDirectory)
const dryRun = process.argv.includes('--dry-run')
const verifyOnly = process.argv.includes('--verify-only')
const overwrite = process.argv.includes('--overwrite')

const requiredEnvironment = [
  'DATABASE_URL',
  'S3_BUCKET',
  'S3_ENDPOINT',
  'S3_ACCESS_KEY_ID',
  'S3_SECRET_ACCESS_KEY',
  'MEDIA_PUBLIC_URL',
] as const

const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name])
if (missingEnvironment.length > 0) {
  throw new Error(`Missing R2 environment variables: ${missingEnvironment.join(', ')}`)
}

const bucket = process.env.S3_BUCKET as string
const client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
})

type MediaFile = { filename: string; mimeType: string }
type MediaRow = {
  filename: null | string
  mime_type: null | string
  sizes_thumbnail_filename: null | string
  sizes_thumbnail_mime_type: null | string
  sizes_card_filename: null | string
  sizes_card_mime_type: null | string
  sizes_tablet_filename: null | string
  sizes_tablet_mime_type: null | string
}
type MigrationResult = MediaFile & {
  key: string
  status: 'missing-local' | 'uploaded' | 'verified' | 'would-upload' | 'conflict' | 'failed'
  detail?: string
}

const mimeTypes: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
}

function getMimeType(filename: string, fallback: string) {
  return mimeTypes[path.extname(filename).toLowerCase()] || fallback
}

function safeLocalPath(filename: string) {
  const resolved = path.resolve(mediaDirectory, filename)
  const relative = path.relative(mediaDirectory, resolved)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Unsafe media filename: ${filename}`)
  }
  return resolved
}

async function collectMediaFiles(): Promise<MediaFile[]> {
  const database = new pg.Client({ connectionString: process.env.DATABASE_URL })
  const files = new Map<string, MediaFile>()
  await database.connect()

  try {
    const result = await database.query<MediaRow>(`
      SELECT
        filename,
        mime_type,
        sizes_thumbnail_filename,
        sizes_thumbnail_mime_type,
        sizes_card_filename,
        sizes_card_mime_type,
        sizes_tablet_filename,
        sizes_tablet_mime_type
      FROM media
      ORDER BY id
    `)

    for (const document of result.rows) {
      const fallbackMimeType = document.mime_type || 'application/octet-stream'

      if (document.filename) {
        files.set(document.filename, {
          filename: document.filename,
          mimeType: fallbackMimeType,
        })
      }

      const sizes = [
        [document.sizes_thumbnail_filename, document.sizes_thumbnail_mime_type],
        [document.sizes_card_filename, document.sizes_card_mime_type],
        [document.sizes_tablet_filename, document.sizes_tablet_mime_type],
      ] as const

      for (const [filename, mimeType] of sizes) {
        if (filename) {
          files.set(filename, {
            filename,
            mimeType: mimeType || getMimeType(filename, fallbackMimeType),
          })
        }
      }
    }
  } finally {
    await database.end()
  }

  return [...files.values()]
}

async function migrateFile(file: MediaFile): Promise<MigrationResult> {
  const key = `${R2_MEDIA_PREFIX}/${file.filename}`
  let localStats

  try {
    localStats = await stat(safeLocalPath(file.filename))
  } catch (error) {
    return {
      ...file,
      key,
      status: 'missing-local',
      detail: error instanceof Error ? error.message : String(error),
    }
  }

  let remoteMatches = false
  let remoteExists = false
  try {
    const remote = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
    remoteExists = true
    remoteMatches = remote.ContentLength === localStats.size && remote.ContentType === file.mimeType
  } catch (error) {
    const status = (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode
    if (status !== 404) {
      return {
        ...file,
        key,
        status: 'failed',
        detail: error instanceof Error ? error.message : String(error),
      }
    }
  }

  if (remoteMatches) return { ...file, key, status: 'verified' }
  if (remoteExists && !overwrite) {
    return {
      ...file,
      key,
      status: 'conflict',
      detail: 'Remote object differs; rerun with --overwrite after review.',
    }
  }
  if (verifyOnly) {
    return {
      ...file,
      key,
      status: 'failed',
      detail: remoteExists ? 'Remote object differs.' : 'Remote object does not exist.',
    }
  }
  if (dryRun) return { ...file, key, status: 'would-upload' }

  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: createReadStream(safeLocalPath(file.filename)),
    ContentLength: localStats.size,
    ContentType: file.mimeType,
    CacheControl: 'public, max-age=604800',
  }))

  const uploaded = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
  if (uploaded.ContentLength !== localStats.size || uploaded.ContentType !== file.mimeType) {
    return { ...file, key, status: 'failed', detail: 'Post-upload verification failed.' }
  }
  return { ...file, key, status: 'uploaded' }
}

async function main() {
  const files = await collectMediaFiles()
  const results: MigrationResult[] = []

  for (const file of files) {
    const result = await migrateFile(file)
    results.push(result)
    console.log(`${result.status.padEnd(13)} ${result.key}${result.detail ? ` - ${result.detail}` : ''}`)
  }

  const summary = results.reduce<Record<string, number>>((totals, result) => {
    totals[result.status] = (totals[result.status] || 0) + 1
    return totals
  }, {})
  console.log(JSON.stringify({ bucket, mediaDirectory, total: results.length, summary }, null, 2))

  const failed = results.some((result) =>
    ['missing-local', 'conflict', 'failed'].includes(result.status),
  )
  process.exitCode = failed ? 1 : 0
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
