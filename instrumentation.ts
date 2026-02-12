export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { getPayload } = await import('payload')
        const { pushDevSchema } = await import('@payloadcms/drizzle')
        const config = await import('./payload.config')

        console.log('==> Initializing Payload CMS...')
        const payload = await getPayload({ config: config.default })

        console.log('==> Pushing database schema...')
        await pushDevSchema(payload.db as any)
        console.log('==> Database schema pushed successfully!')
    }
}
