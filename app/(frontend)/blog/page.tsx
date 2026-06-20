import { getPayload } from 'payload'
import config from '@payload-config'
import { FeaturedPost } from '@/components/FeaturedPost'
import BlogPostsGrid from '@/components/BlogPostsGrid'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Artículos sobre desarrollo web, frontend, tecnología y más — por MAHG.',
    alternates: {
        canonical: 'https://mahg.me/blog',
    },
}

export default async function BlogIndex() {
    const payload = await getPayload({ config })

    // Fetch categories and posts in parallel
    const [categoriesResult, featuredQuery] = await Promise.all([
        payload.find({
            collection: 'categories',
            limit: 50,
            sort: 'title',
        }),
        payload.find({
            collection: 'posts',
            where: {
                and: [
                    { _status: { equals: 'published' } },
                    { isFeatured: { equals: true } }
                ]
            },
            limit: 1,
            depth: 2
        }),
    ])

    const categories = categoriesResult.docs.map((cat: any) => ({
        id: cat.id,
        title: cat.title,
    }))

    let featuredPost = featuredQuery.docs.length > 0 ? featuredQuery.docs[0] : null
    let recentPosts: any[] = []

    if (featuredPost) {
        const recentPostsQuery = await payload.find({
            collection: 'posts',
            where: {
                and: [
                    { _status: { equals: 'published' } },
                    { id: { not_equals: featuredPost.id } }
                ]
            },
            sort: '-publishedAt',
            limit: 20,
            depth: 2,
        })
        recentPosts = recentPostsQuery.docs
    } else {
        const allPostsQuery = await payload.find({
            collection: 'posts',
            where: {
                _status: { equals: 'published' }
            },
            sort: '-publishedAt',
            limit: 21,
            depth: 2,
        })

        if (allPostsQuery.docs.length > 0) {
            featuredPost = allPostsQuery.docs[0]
            recentPosts = allPostsQuery.docs.slice(1)
        }
    }

    return (
        <div className="mx-auto w-11/12 xl:w-6/10 py-12 md:py-20">
            {featuredPost && (
                <FeaturedPost post={featuredPost} />
            )}
            <BlogPostsGrid posts={recentPosts} categories={categories} />
            {(!featuredPost && recentPosts.length === 0) && (
                <div className="text-center py-20 border border-dashed border-main/25 rounded-2xl bg-bento/50">
                    <p className="text-xl text-slate-400 mb-4 font-medium">
                        No hay posts publicados aun.
                    </p>
                    <p className="text-slate-500">
                        Crea tu primer post en el{' '}
                        <a
                            href="/admin/collections/posts/create"
                            className="text-btn hover:text-btn/80 underline font-medium"
                        >
                            panel de admin
                        </a>
                    </p>
                </div>
            )}
        </div>
    )
}
