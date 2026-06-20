import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { calculateReadingTime } from '../utils/readingTime'
import { getMediaSrc } from '@/lib/utils'

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
        <article className="group relative flex flex-col h-full bg-bento dark:bg-bento border border-main/25 rounded-lg p-5 transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 hover:shadow-lg shadow-btn/20">

            {/* Image Container with Padding */}
            <Link href={`/blog/${post.slug}`} className="relative block w-full aspect-[16/10] overflow-hidden rounded-lg bg-slate-800">
                {featuredImage && featuredImage.url ? (
                    <Image
                        src={getMediaSrc(featuredImage.url)}
                        alt={featuredImage.alt || post.title || 'Post Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-slate-600">No Image</span>
                    </div>
                )}

                {/* Category Badge - Floating Top Left inside Image */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="inline-flex items-center justify-center px-3 py-1 bg-bento/90 backdrop-blur-md border border-main/25 rounded-full shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-btn">
                            {categoryTitle || 'Blog'}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow pt-6 px-1">

                {/* Title */}
                <Link href={`/blog/${post.slug}`} className="block mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-btn transition-colors leading-tight">
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

                {/* Divider */}
                <div className="w-full h-[1px] bg-main/25 mb-5"></div>

                {/* Footer: Author & Read Time */}
                <div className="flex items-center justify-between">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                        {author?.avatar && typeof author.avatar === 'object' && author.avatar.url ? (
                            <Image src={getMediaSrc(author.avatar.url)} alt={author.name || 'Author'} width={32} height={32} className="rounded-full ring-2 ring-main/25" />
                        ) : (author as any)?.avatarUrl ? (
                            <Image src={getMediaSrc((author as any).avatarUrl)} alt={author?.name || 'Author'} width={32} height={32} className="rounded-full ring-2 ring-main/25" unoptimized />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ring-2 ring-main/25">
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
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-700/50 rounded-lg border border-slate-700/50">
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