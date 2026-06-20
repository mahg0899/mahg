import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@/components/RichText'
import SubscribeBox from '@/components/SubscribeBox'
import ShareButtons from '@/components/ShareButtons'
import TableOfContents from '@/components/TableOfContents'
import RelatedPosts from '@/components/RelatedPosts'
import type { Metadata, Viewport } from 'next'
import { getSeoData } from '@/lib/getSeoData'
import { draftMode } from 'next/headers'
import { getMediaSrc } from '@/lib/utils'

export const dynamic = 'force-dynamic'

// Calculate reading time from richText content
function calculateReadingTime(content: any): number {
    if (!content?.root?.children) return 1
    let wordCount = 0
    const extractText = (node: any) => {
        if (node.text) wordCount += node.text.split(/\s+/).filter(Boolean).length
        if (node.children) node.children.forEach(extractText)
    }
    content.root.children.forEach(extractText)
    return Math.max(1, Math.ceil(wordCount / 200))
}

export async function generateViewport({ params }: { params: Promise<{ slug: string }> }): Promise<Viewport> {
    try {
        const seo = await getSeoData()
        return { themeColor: seo.themeColor || '#0f172a' }
    } catch {
        return { themeColor: '#0f172a' }
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    try {
        const { slug } = await params
        const payload = await getPayload({ config })
        const seo = await getSeoData()

        const result = await payload.find({
            collection: 'posts',
            where: { slug: { equals: slug } },
        })

        const post = result.docs[0]
        if (!post) return {}

        const postSeo = (post as any).seo || {}

        // Priority: SEO override → post defaults → site defaults
        const title = postSeo.metaTitle || post.title
        const description = postSeo.metaDescription || (post as any).excerpt || seo.siteDescription || ''
        const fullTitle = `${title} | MAHG`

        // OG image served by /api/og/[slug] — dynamic image with MAHG logo watermark
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const ogImageUrl = `${baseUrl}/api/og/${slug}`

        return {
            title,
            description,
            alternates: {
                canonical: `https://mahg.me/blog/${slug}`,
            },
            openGraph: {
                title: fullTitle,
                description,
                type: 'article',
                siteName: seo.siteTitle,
                url: `${baseUrl}/blog/${slug}`,
                ...(post.publishedAt && { publishedTime: post.publishedAt }),
                images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
            },
            twitter: {
                card: seo.twitterCard || 'summary_large_image',
                title: fullTitle,
                description,
                ...(seo.twitterHandle && { creator: seo.twitterHandle }),
                images: [ogImageUrl],
            },
        }
    } catch {
        return {}
    }
}

export default async function BlogPost({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { slug } = await params
    const resolvedSearchParams = await searchParams
    const payload = await getPayload({ config })

    // Check if draft mode is requested (for live preview)
    const { isEnabled: isDraftMode } = await draftMode()
    const isDraft = isDraftMode || resolvedSearchParams.draft === 'true'

    const result = await payload.find({
        collection: 'posts',
        where: {
            slug: { equals: slug }
        },
        draft: isDraft,
    })

    const post = result.docs[0]

    if (!post) {
        notFound()
    }

    // Only block non-published posts if not in draft mode
    if (!isDraft && (post as any)._status !== 'published') {
        notFound()
    }

    const relatedPosts = await payload.find({
        collection: 'posts',
        where: {
            slug: { not_equals: slug },
            _status: { equals: 'published' }
        },
        limit: 3,
        depth: 1
    })

    const featuredImage = post.featuredImage as Media | undefined
    const author = typeof post.author === 'object' ? post.author : null
    const readingTime = calculateReadingTime(post.content)

    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const toc = [] as { id: string; text: string; level: number }[]
    let hasContentBeforeFirstHeading = false

    if (post.content && post.content.root && post.content.root.children) {
        const children = post.content.root.children as any[]
        const headingTypes = ['heading', 'h1', 'h2', 'h3', 'h4']

        // Check if there's content before the first heading
        const firstHeadingIndex = children.findIndex((node: any) =>
            headingTypes.includes(node.type)
        )
        const hasHeadings = firstHeadingIndex !== -1
        hasContentBeforeFirstHeading = hasHeadings && firstHeadingIndex > 0

        // If there's text before the first heading, add "Introducción" to TOC
        if (hasContentBeforeFirstHeading) {
            toc.push({ id: 'introduccion', text: 'Introducción', level: 1 })
        }

        children.forEach((node: any) => {
            const text = node.children?.map((c: any) => c.text).join('') || ''
            if (text && headingTypes.includes(node.type)) {
                const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
                let level = 2
                if (node.tag === 'h1' || node.type === 'h1') level = 1
                if (node.tag === 'h2' || node.type === 'h2') level = 2
                if (node.tag === 'h3' || node.type === 'h3') level = 3
                if (node.tag === 'h4' || node.type === 'h4') level = 4
                if ([1, 2, 3, 4].includes(level)) {
                    toc.push({ id, text, level })
                }
            }
        })
    }

    return (
        <article className="min-h-screen bg-background text-foreground font-sans pb-20">
            <div className="pt-5 pb-16 px-6 relative">
                <div className="relative z-10 flex justify-start w-full mb-8 md:absolute md:w-auto md:mb-0 md:top-8 md:left-8">
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-bento/50 hover:bg-bento backdrop-blur-sm px-4 py-2 rounded-full border border-main/25"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-wider">Blog</span>
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto text-center">
                    {post.categories && post.categories.length > 0 && (
                        <div className="mb-8 flex justify-center gap-2">
                            {post.categories.map((cat: any) => {
                                const catTitle = typeof cat === 'string' ? cat : (cat.title || 'Blog')
                                const catKey = typeof cat === 'string' ? cat : cat.id
                                return (
                                    <span
                                        key={catKey}
                                        className="inline-block px-4 py-1.5 rounded-full bg-bento text-btn text-xs font-bold uppercase tracking-wider border border-main/25"
                                    >
                                        {catTitle}
                                    </span>
                                )
                            })}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight mb-8">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-400 border-t border-slate-800 pt-8 mt-8 inline-flex mx-auto">
                        {author && (
                            <div className="flex items-center gap-3">
                                {author.avatarUrl ? (
                                    <Image src={getMediaSrc(author.avatarUrl)} alt={author.name || 'Autor'} width={32} height={32} className="rounded-full border border-slate-700" />
                                ) : null}
                                <span className="font-medium text-slate-200">
                                    {author.name || author.email}
                                </span>
                            </div>
                        )}
                        {post.publishedAt && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <time dateTime={post.publishedAt}>
                                    {formatDate(post.publishedAt)}
                                </time>
                            </>
                        )}
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>{readingTime} min de lectura</span>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10 mb-16">
                {featuredImage && featuredImage.url ? (
                    <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-800/50 aspect-video bg-slate-900 relative">
                        <Image
                            src={getMediaSrc(featuredImage.url)}
                            alt={featuredImage.alt || post.title}
                            fill
                            priority
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            className="object-cover"
                        />
                    </div>
                ) : null}
            </div>
            <div className="max-w-[1400px] mx-auto px-6 -mt-10 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <aside className="hidden lg:block col-span-2 relative">
                        <TableOfContents items={toc} />
                    </aside>
                    <div className="col-span-1 lg:col-span-7">
                        <div className="prose prose-lg prose-invert max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-code:text-pink-400 prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-800 prose-img:rounded-xl">
                            <RichText content={post.content} hasIntroduction={hasContentBeforeFirstHeading} />
                        </div>
                        <hr className="border-slate-800 my-16" />
                        <div className="bg-bento dark:bg-bento rounded-2xl p-8 border border-main/25 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                            <div className="shrink-0">
                                {author?.avatar && typeof author.avatar === 'object' && author.avatar.url ? (
                                    <Image
                                        src={getMediaSrc(author.avatar.url)}
                                        alt={author.name || 'Author'}
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover shadow-lg ring-2 ring-blue-500/20"
                                    />
                                ) : author?.avatarUrl ? (
                                    <Image
                                        src={getMediaSrc(author.avatarUrl)}
                                        alt={author.name || 'Author'}
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover shadow-lg ring-2 ring-blue-500/20"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-2 ring-blue-500/20">
                                        {author?.name ? author.name[0].toUpperCase() : (author?.email?.[0].toUpperCase() || 'A')}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-100 mb-2">
                                    {author?.name || author?.email || 'Autor'}
                                </h3>
                                {author?.bio && (
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-lg">
                                        {author.bio}
                                    </p>
                                )}

                                {!author?.bio && (
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-lg italic">
                                        Autor en BentoMahg.
                                    </p>
                                )}
                                {author?.links && author.links.length > 0 && (
                                    <div className="flex gap-4 justify-center md:justify-start">
                                        {author.links.map((link: { url: string; label?: string }, i: number) => (
                                            link.url && (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    {link.label || 'Link'}
                                                </a>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <aside className="hidden lg:block col-span-3 relative">
                        <div className="sticky top-32 space-y-8">
                            <SubscribeBox />
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    Compartir
                                </h3>
                                <ShareButtons title={post.title} slug={post.slug} />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <RelatedPosts posts={relatedPosts.docs} />
        </article>
    )
}
