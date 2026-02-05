
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const payload = await getPayload({ config })

        // Find ALL posts
        const posts = await payload.find({
            collection: 'posts',
            limit: 100,
            draft: true,
        })

        return NextResponse.json({
            success: true,
            total: posts.totalDocs,
            docs: posts.docs.map(d => ({
                id: d.id,
                title: d.title,
                status: (d as any)._status,
                createdAt: d.createdAt
            }))
        })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
