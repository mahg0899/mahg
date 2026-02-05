
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const payload = await getPayload({ config })

        // FETCH ALL POSTS
        const posts = await payload.find({
            collection: 'posts',
            limit: 100,
            draft: true,
        })

        const deleted = []

        // DELETE THEM ALL (As requested by user: "eliminalos")
        for (const doc of posts.docs) {
            await payload.delete({
                collection: 'posts',
                id: doc.id,
            })
            deleted.push({ id: doc.id, title: doc.title })
        }

        return NextResponse.json({
            success: true,
            message: "Deleted all posts as requested",
            deletedCount: deleted.length,
            deletedDocs: deleted
        })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
