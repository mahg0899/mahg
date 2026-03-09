import React from 'react'
import Link from 'next/link'
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
            <div className="group relative flex flex-col md:flex-row bg-[#0B0D14] border border-white/5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-blue-500/30">

                {/* Left: Image (50% on desktop) */}
                <div className="w-full md:w-1/2 relative bg-[#F3EFE0] min-h-[300px] md:min-h-[450px] overflow-hidden">
                    {/* Mock Device Frame or just Image - following reference which is clean */}
                    <div className="absolute inset-0 p-8 flex items-center justify-center">
                        {featuredImage && featuredImage.url ? (
                            <img
                                src={featuredImage.url}
                                alt={featuredImage.alt || post.title || 'Featured Post'}
                                className="w-full h-full object-cover shadow-2xl rounded-lg transform transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            // Fallback placeholder pattern
                            <div className="w-4/5 h-4/5 bg-white shadow-xl rounded-lg flex items-center justify-center">
                                <span className="text-slate-400 font-medium">Featured Image</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Content (50% on desktop) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0B0D14]">

                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
                            Post Destacado
                        </span>
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${post.slug}`} className="block mb-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] group-hover:text-blue-400 transition-colors">
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
                                <img src={author.avatar.url} alt={author.name || 'Author'} className="w-10 h-10 rounded-full ring-2 ring-white/10" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center ring-2 ring-white/10">
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
                        <div className="h-8 w-[1px] bg-white/10"></div>

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
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
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
