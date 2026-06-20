import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

// Force dynamic rendering — the sitemap queries the DB at runtime.
// Without this, Next.js tries to statically pre-render it during `npm run build`,
// which fails because the database is not reachable from the Docker build container.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mahg.me'

    const payload = await getPayload({ config })

    const posts = await payload.find({
        collection: 'posts',
        where: {
            _status: { equals: 'published' },
        },
        limit: 500,
        select: {
            slug: true,
            publishedAt: true,
        },
    })

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/portfolio`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    const postPages: MetadataRoute.Sitemap = posts.docs.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticPages, ...postPages]
}
