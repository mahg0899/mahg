
import { getPayload } from 'payload'
import config from '@payload-config'

async function fixPostsStatus() {
    const payload = await getPayload({ config })

    console.log('--- Fixing Posts Status ---')
    const posts = await payload.find({
        collection: 'posts',
        limit: 100,
        draft: true,
    })

    // We need to update directly via DB or use update API. 
    // Since _status is managed, we might need to use 'update' with draft: false to force publish, or just update the document.

    for (const doc of posts.docs) {
        if (!(doc as any)._status) {
            console.log(`Fixing post: ${doc.title} (${doc.id})`)
            try {
                await payload.update({
                    collection: 'posts',
                    id: doc.id,
                    data: {
                        _status: 'published', // Force status
                    } as any,
                    draft: false, // Publish it
                })
                console.log(`-> Fixed and Published: ${doc.title}`)
            } catch (e) {
                console.error(`-> Failed to fix ${doc.title}:`, e)
            }
        }
    }

    process.exit(0)
}

fixPostsStatus()
