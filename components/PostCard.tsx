'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Media } from '@/payload-types'

interface PostCardProps {
    slug: string
    title: string
    excerpt?: string | null
    featuredImage?: Media
    categories?: string[] | null
    publishedAt?: string | null
    author?: string
}

export default function PostCard({
    slug,
    title,
    excerpt,
    featuredImage,
    categories,
    publishedAt,
    author
}: PostCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <article
            style={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s',
                background: 'var(--bento)',
                color: '#f8fafc',
                boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.2)',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/blog/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {/* Featured Image */}
                {featuredImage && (
                    <div style={{
                        width: '100%',
                        height: '200px',
                        overflow: 'hidden',
                        background: '#0f172a'
                    }}>
                        <img
                            src={featuredImage.url || ''}
                            alt={title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                )}

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                    {/* Categories */}
                    {categories && categories.length > 0 && (
                        <div style={{ marginBottom: '0.75rem' }}>
                            {categories.slice(0, 2).map((cat) => (
                                <span
                                    key={cat}
                                    style={{
                                        display: 'inline-block',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '999px',
                                        background: 'rgba(37, 99, 235, 0.2)',
                                        color: '#60a5fa',
                                        marginRight: '0.5rem',
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        border: '1px solid rgba(37, 99, 235, 0.3)'
                                    }}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '0.75rem',
                        lineHeight: '1.3',
                        color: '#f8fafc'
                    }}>
                        {title}
                    </h2>

                    {/* Excerpt */}
                    {excerpt && (
                        <p style={{
                            color: '#94a3b8',
                            marginBottom: '1rem',
                            lineHeight: '1.6'
                        }}>
                            {excerpt.substring(0, 120)}
                            {excerpt.length > 120 ? '...' : ''}
                        </p>
                    )}

                    {/* Meta */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontSize: '0.875rem',
                        color: '#64748b'
                    }}>
                        {publishedAt && (
                            <time>
                                {new Date(publishedAt).toLocaleDateString('es-MX', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        )}
                        {author && (
                            <span>• {author}</span>
                        )}
                    </div>
                </div>
            </Link>
        </article>
    )
}
