import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

async function getLogoBase64(): Promise<string> {
    try {
        const logoPath = path.join(process.cwd(), 'public', 'mahg.png')
        const buffer = await readFile(logoPath)
        return `data:image/png;base64,${buffer.toString('base64')}`
    } catch {
        return ''
    }
}

async function loadFont(filename: string): Promise<ArrayBuffer | null> {
    try {
        const fontPath = path.join(process.cwd(), 'public', filename)
        const buffer = await readFile(fontPath)
        return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer
    } catch {
        return null
    }
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    let title = 'MAHG Blog'
    let featuredImageUrl: string | null = null
    let excerpt: string | null = null
    let categoryName: string | null = null

    try {
        const payload = await getPayload({ config })

        const result = await payload.find({
            collection: 'posts',
            where: { slug: { equals: slug } },
            depth: 1,
        })

        const post = result.docs[0]

        if (post) {
            title = post.title || title
            excerpt = (post as any).excerpt || null

            const featuredImage = post.featuredImage as Media | undefined
            if (featuredImage?.url) {
                featuredImageUrl = featuredImage.url
            }

            const cats = (post as any).categories || []
            if (cats.length > 0) {
                const firstCat = cats[0]
                categoryName = typeof firstCat === 'object' ? firstCat.title : null
            }
        }
    } catch {
        // Fallback to defaults if DB is unavailable
    }

    const logoBase64 = await getLogoBase64()
    const [inter700, inter800, bitcountFont] = await Promise.all([
        loadFont('inter-700.ttf'),
        loadFont('inter-800.ttf'),
        loadFont('bitcount-prop-single.ttf'),
    ])

    const fonts: { name: string; data: ArrayBuffer; style: 'normal'; weight: number }[] = []
    if (inter700) fonts.push({ name: 'Inter', data: inter700, style: 'normal', weight: 700 })
    if (inter800) fonts.push({ name: 'Inter', data: inter800, style: 'normal', weight: 800 })
    if (bitcountFont) fonts.push({ name: 'BitcountPropSingle', data: bitcountFont, style: 'normal', weight: 700 })

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    position: 'relative',
                    fontFamily: '"Inter", sans-serif',
                    overflow: 'hidden',
                    background: '#0a1222',
                }}
            >
                {/* Background: featured image or gradient fallback */}
                {featuredImageUrl ? (
                    <img
                        src={featuredImageUrl}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                        alt=""
                    />
                ) : (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, #0a1222 0%, #1e3a5f 50%, #0a1222 100%)',
                            display: 'flex',
                        }}
                    />
                )}

                {/* ── OVERLAYS ─────────────────────────────────────────────── */}

                {/* Bottom fade — subtle backing just for text legibility */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '1200px',
                        height: '630px',
                        background:
                            'linear-gradient(to top, rgba(10,18,34,0.92) 0%, rgba(10,18,34,0.75) 18%, rgba(10,18,34,0.35) 35%, rgba(10,18,34,0.0) 52%)',
                        display: 'flex',
                    }}
                />

                {/* Top dark strip — very subtle */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '1200px',
                        height: '630px',
                        background: 'linear-gradient(to bottom, rgba(10,18,34,0.6) 0%, rgba(10,18,34,0.0) 14%)',
                        display: 'flex',
                    }}
                />

                {/* Side vignette */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '1200px',
                        height: '630px',
                        background:
                            'linear-gradient(to right, rgba(10,18,34,0.6) 0%, rgba(10,18,34,0.0) 18%, rgba(10,18,34,0.0) 82%, rgba(10,18,34,0.6) 100%)',
                        display: 'flex',
                    }}
                />

                {/* ── TOP-LEFT LABEL ───────────────────────────────────────── */}
                <div
                    style={{
                        position: 'absolute',
                        top: '32px',
                        left: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <div
                        style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#2D8BFF',
                        }}
                    />
                    <span
                        style={{
                            color: '#c8d8ec',
                            fontSize: '15px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            fontFamily: '"Inter", sans-serif',
                        }}
                    >
                        mahg.me · blog
                    </span>
                </div>

                {/* ── BOTTOM-RIGHT: BRAND WATERMARK ────────────────────────── */}
                {logoBase64 && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '32px',
                            right: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <img
                            src={logoBase64}
                            style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '10px',
                            }}
                            alt="MAHG"
                        />
                        <span style={{ display: 'flex', flexDirection: 'row', fontFamily: '"BitcountPropSingle", sans-serif', fontSize: '28px', fontWeight: 700, textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
                            <span style={{ color: '#2D8BFF' }}>MAHG</span>
                            <span style={{ color: '#ffffff' }}>.me</span>
                        </span>
                    </div>
                )}

                {/* ── BOTTOM CONTENT ────────────────────────────────────────── */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '0 52px 44px 52px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    {/* Category badge */}
                    {categoryName && (
                        <div style={{ display: 'flex', marginBottom: '4px' }}>
                            <span
                                style={{
                                    background: 'rgba(45,139,255,0.2)',
                                    border: '1px solid rgba(45,139,255,0.55)',
                                    color: '#93c5fd',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    padding: '4px 14px',
                                    borderRadius: '100px',
                                    fontFamily: '"Inter", sans-serif',
                                }}
                            >
                                {categoryName}
                            </span>
                        </div>
                    )}

                    {/* Post title */}
                    <div
                        style={{
                            color: '#f8fafc',
                            fontSize: title.length > 60 ? '42px' : '52px',
                            fontWeight: 800,
                            lineHeight: 1.15,
                            letterSpacing: '-0.03em',
                            fontFamily: '"Inter", sans-serif',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {title}
                    </div>

                    {/* Excerpt / subtitle */}
                    {excerpt && (
                        <div
                            style={{
                                color: '#94a3b8',
                                fontSize: '20px',
                                fontWeight: 400,
                                lineHeight: 1.5,
                                fontFamily: '"Inter", sans-serif',
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                maxWidth: '900px',
                            }}
                        >
                            {excerpt}
                        </div>
                    )}
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts,
        }
    )
}
