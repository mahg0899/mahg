import React from 'react'
import Link from 'next/link'
import { Media } from '@/payload-types'
import { calculateReadingTime } from '../utils/readingTime'

// Define a local interface since payload-types.ts seems to be missing Post
export interface PostCardProps {
    post: {
        id: string
        slug?: string | null
        title?: string | null
        featuredImage?: string | Media | null
        content?: any
        excerpt?: string | null
        status?: 'draft' | 'published' | 'archived' | null
        publishedAt?: string | null
        author?: string | {
            id: string
            name?: string | null
            avatar?: string | Media | null
            avatartUrl?: string | null
        } | null
        categories?: (string | { id?: string; title?: string })[] | null
        [key: string]: any
    }
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const featuredImage = post.featuredImage as Media | undefined
    const category = post.categories && post.categories.length > 0 ? post.categories[0] : null
    const categoryTitle = category
        ? (typeof category === 'string' ? category : (category.title || 'Blog'))
        : 'Blog'

    // Calculate Reading Time
    const readingTime = calculateReadingTime(post.content)

    // Resolve Author
    const author = typeof post.author === 'object' ? post.author : null

    return (
        <article className="group relative flex flex-col h-full bg-[#1A1C23] border border-white/5 rounded-[2rem] p-5 transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl">

            {/* Image Container with Padding */}
            <Link href={`/blog/${post.slug}`} className="relative block w-full aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900">
                {featuredImage && featuredImage.url ? (
                    <img
                        src={featuredImage.url}
                        alt={featuredImage.alt || post.title || 'Post Image'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-slate-700">No Image</span>
                    </div>
                )}

                {/* Overlay (Subtle) */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                {/* Category Badge - Floating Top Left inside Image */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="inline-flex items-center justify-center px-3 py-1 bg-[#0f1115]/90 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                            {categoryTitle || 'Blog'}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow pt-6 px-1">

                {/* Title */}
                <Link href={`/blog/${post.slug}`} className="block mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {post.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-6">
                        {post.excerpt}
                    </p>
                )}

                {/* Spacer */}
                <div className="mt-auto"></div>

                {/* Divider (Optional specific to design, maybe just spacing) */}
                <div className="w-full h-[1px] bg-white/5 mb-5"></div>

                {/* Footer: Author & Read Time */}
                <div className="flex items-center justify-between">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                        {author?.avatar && typeof author.avatar === 'object' && author.avatar.url ? (
                            <img src={author.avatar.url} alt={author.name || 'Author'} className="w-8 h-8 rounded-full ring-2 ring-[#1A1C23]" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ring-2 ring-[#1A1C23]">
                                <span className="text-[10px] text-slate-300 font-bold">
                                    {author?.name ? author.name.charAt(0) : 'A'}
                                </span>
                            </div>
                        )}
                        <span className="text-sm text-slate-400 font-medium">
                            {author?.name || 'Admin'}
                        </span>
                    </div>

                    {/* Read Time / Date Pill */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                            {readingTime}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    )
}