import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { PostCardProps } from './PostCard' // Reusing the type
import { calculateReadingTime } from '@/utils/readingTime'

export const FeaturedPost: React.FC<PostCardProps> = ({ post }) => {
    if (!post) return null

    const featuredImage = post.featuredImage as Media | undefined
    const author = typeof post.author === 'object' ? post.author : null

    // Format Date
    const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-MX', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }) : ''

    const readingTime = calculateReadingTime(post.content)

    return (
        <section className="w-full mb-16">
            <div className="group relative flex flex-col md:flex-row bg-bento dark:bg-bento border border-main/25 rounded-lg overflow-hidden transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 hover:shadow-lg shadow-btn/20">

                {/* Left: Image (50% on desktop) */}
                <div className="w-full md:w-1/2 relative bg-slate-800 min-h-[300px] md:min-h-[450px] overflow-hidden">
                    <div className="absolute inset-0 p-8 flex items-center justify-center">
                        {featuredImage && featuredImage.url ? (
                            <Image
                                src={featuredImage.url}
                                alt={featuredImage.alt || post.title || 'Featured Post'}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-4/5 h-4/5 bg-slate-700 rounded-lg flex items-center justify-center">
                                <span className="text-slate-400 font-medium">Featured Image</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Content (50% on desktop) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">

                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-btn animate-pulse"></span>
                        <span className="text-2xs font-bold tracking-[0.2em] text-btn uppercase">
                            Post Destacado
                        </span>
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${post.slug}`} className="block mb-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] group-hover:text-btn transition-colors">
                            {post.title}
                        </h2>
                    </Link>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Author & Meta */}
                    <div className="flex items-center gap-6 mb-10">
                        {/* Author */}
                        <div className="flex items-center gap-3">
                            {author?.avatar && typeof author.avatar === 'object' && author.avatar.url ? (
                                <Image src={author.avatar.url} alt={author.name || 'Author'} width={40} height={40} className="rounded-full ring-2 ring-main/25" />
                            ) : (author as any)?.avatarUrl ? (
                                <Image src={(author as any).avatarUrl} alt={author?.name || 'Author'} width={40} height={40} className="rounded-full ring-2 ring-main/25" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center ring-2 ring-main/25">
                                    <span className="text-sm text-slate-300 font-bold">
                                        {author?.name ? author.name.charAt(0) : 'A'}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">
                                    {author?.name || 'Admin'}
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-8 w-[1px] bg-main/25"></div>

                        {/* Read Time */}
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>{readingTime}</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-btn hover:bg-btn/80 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-btn/25"
                        >
                            Leer Ahora
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
