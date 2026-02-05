
import { getPayload } from 'payload'
import config from '@payload-config'

async function checkPosts() {
    const payload = await getPayload({ config })

    console.log('--- Checking Posts ---')
    const posts = await payload.find({
        collection: 'posts',
        limit: 10,
        draft: true, // Include drafts
    })

    console.log(`Found ${posts.totalDocs} posts.`)
    if (posts.docs) {
        posts.docs.forEach(doc => {
            console.log(`- ID: ${doc.id}, Title: ${doc.title}, Status: ${(doc as any)._status || 'N/A'}`)
        })
    } else {
        console.log('No docs array found.')
    }
    process.exit(0)
}

checkPosts()
