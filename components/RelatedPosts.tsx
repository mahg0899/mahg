import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media, Post } from '@/payload-types'

export default function RelatedPosts({ posts }: { posts: Post[] }) {
    if (!posts || posts.length === 0) return null

    return (
        <div className="border-t border-main/25 pt-16 mt-0">
            <div className="max-w-[1400px] mx-auto px-6">
                <h3 className="text-2xl font-bold text-slate-100 mb-8">
                    Artículos Relacionados
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {posts.map((post) => {
                        const featuredImage = post.featuredImage as Media | undefined
                        const category = post.categories && post.categories.length > 0 ? post.categories[0] : null

                        return (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group block transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Card Image */}
                                <div className="aspect-video rounded-lg overflow-hidden bg-bento dark:bg-bento border border-main/25 mb-4 relative group-hover:border-btn/50 transition-all">
                                    {featuredImage && featuredImage.url ? (
                                        <Image
                                            src={featuredImage.url}
                                            alt={featuredImage.alt || post.title || ''}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                                <circle cx="9" cy="9" r="2" />
                                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Card Content */}
                                <div>
                                    {category && (
                                        <span className="inline-block text-xs font-bold text-btn uppercase tracking-widest mb-2">
                                            {typeof category === 'string' ? category : (category.title || 'Blog')}
                                        </span>
                                    )}
                                    {!category && (
                                        <span className="inline-block text-xs font-bold text-btn uppercase tracking-widest mb-2">
                                            Blog
                                        </span>
                                    )}

                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-btn transition-colors leading-tight">
                                        {post.title}
                                    </h4>

                                    {post.excerpt && (
                                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
