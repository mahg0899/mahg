import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { PostCard } from '@/components/PostCard'
export const dynamic = 'force-dynamic'
import { FeaturedPost } from '@/components/FeaturedPost'

export default async function BlogIndex() {
    const payload = await getPayload({ config })

    const featuredQuery = await payload.find({
        collection: 'posts',
        where: {
            and: [
                { _status: { equals: 'published' } },
                { isFeatured: { equals: true } }
            ]
        },
        limit: 1,
        depth: 1
    })

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
            limit: 20
        })
        recentPosts = recentPostsQuery.docs
    } else {
        const allPostsQuery = await payload.find({
            collection: 'posts',
            where: {
                _status: { equals: 'published' }
            },
            sort: '-publishedAt',
            limit: 21
        })

        if (allPostsQuery.docs.length > 0) {
            featuredPost = allPostsQuery.docs[0]
            recentPosts = allPostsQuery.docs.slice(1)
        }
    }

    return (
        <div className="mx-auto w-11/12 xl:w-6/10 px-0 py-12 md:py-20">
            {featuredPost && (
                <FeaturedPost post={featuredPost} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
            {(!featuredPost && recentPosts.length === 0) && (
                <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/50">
                    <p className="text-xl text-slate-400 mb-4 font-medium">
                        No hay posts publicados aún.
                    </p>
                    <p className="text-slate-500">
                        Crea tu primer post en el{' '}
                        <a
                            href="/admin/collections/posts/create"
                            className="text-blue-400 hover:text-blue-300 underline font-medium"
                        >
                            panel de admin
                        </a>
                    </p>
                </div>
            )}
        </div>
    )
}

