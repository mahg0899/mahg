import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { PostCard } from '@/components/PostCard'
import { FeaturedPost } from '@/components/FeaturedPost'

export default async function BlogIndex() {
    const payload = await getPayload({ config })

    // 1. Fetch the Featured Post
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

    const featuredPost = featuredQuery.docs.length > 0 ? featuredQuery.docs[0] : null

    // 2. Fetch Recent Posts (excluding the featured one if it exists)
    const recentPostsQuery = await payload.find({
        collection: 'posts',
        where: {
            and: [
                { _status: { equals: 'published' } },
                { id: { not_equals: featuredPost?.id } }
            ]
        },
        sort: '-publishedAt',
        limit: 20
    })

    const recentPosts = recentPostsQuery.docs

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
            {/* Featured Post (if exists) */}
            {featuredPost && (
                <FeaturedPost post={featuredPost} />
            )}

            {/* Posts Grid */}
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

