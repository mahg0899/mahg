
import { getPayload } from 'payload'
import config from '@payload-config'

async function cleanupPosts() {
    const payload = await getPayload({ config })

    console.log('--- Deleting Ghost Posts ---')
    const posts = await payload.find({
        collection: 'posts',
        limit: 100,
        draft: true,
    })

    for (const doc of posts.docs) {
        // If _status is missing, it's a ghost post from the migration
        if (!(doc as any)._status) {
            console.log(`Deleting post: ${doc.title} (${doc.id})`)
            try {
                await payload.delete({
                    collection: 'posts',
                    id: doc.id,
                })
                console.log(`-> Deleted: ${doc.title}`)
            } catch (e) {
                console.error(`-> Failed to delete ${doc.title}:`, e)
            }
        }
    }

    process.exit(0)
}

cleanupPosts()
