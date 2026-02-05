import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Media } from '@/payload-types'
import Link from 'next/link'
import BackToBlogButton from '@/components/BackToBlogButton'
import { RichText } from '@/components/RichText'
import SubscribeBox from '@/components/SubscribeBox'
import ShareButtons from '@/components/ShareButtons'
import TableOfContents from '@/components/TableOfContents'
import RelatedPosts from '@/components/RelatedPosts'

export async function generateStaticParams() {
    const payload = await getPayload({ config })

    const posts = await payload.find({
        collection: 'posts',
        where: {
            _status: { equals: 'published' }
        },
        limit: 100
    })

    return posts.docs.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'posts',
        where: {
            slug: { equals: slug }
        }
    })

    const post = result.docs[0]

    if (!post || (post as any)._status !== 'published') {
        notFound()
    }

    // Fetch Related Posts
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

    // Helper to format date
    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // Extract headings for TOC
    const toc = [] as { id: string; text: string; level: number }[]

    if (post.content && post.content.root && post.content.root.children) {
        post.content.root.children.forEach((node: any) => {
            // simplified matching for h1/h2/h3
            const text = node.children?.map((c: any) => c.text).join('') || ''
            if (text && (node.type === 'heading' || node.type === 'h1' || node.type === 'h2' || node.type === 'h3')) {
                const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

                let level = 2 // default
                if (node.tag === 'h1' || node.type === 'h1') level = 1
                if (node.tag === 'h2' || node.type === 'h2') level = 2
                if (node.tag === 'h3' || node.type === 'h3') level = 3

                // Push valid headings
                if ([1, 2, 3].includes(level)) {
                    toc.push({ id, text, level })
                }
            }
        })
    }

    return (
        <article className="min-h-screen bg-background text-foreground font-sans pb-20">
            {/* Header Section (Title & Meta) */}
            <div className="bg-[#101922] pt-5 pb-16 px-6 relative">
                {/* Back Button (Desktop/Mobile) */}
                <div className="absolute top-4 left-4 md:top-8 md:left-80 z-10">
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-[#1c2127]/50 hover:bg-[#1c2127] backdrop-blur-sm px-4 py-2 rounded-full ring-1 ring-slate-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-wider">Blog</span>
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto text-center">
                    {/* Category Badge */}
                    {post.categories && post.categories.length > 0 && (
                        <div className="mb-8 flex justify-center gap-2">
                            {post.categories.map((cat: any) => (
                                <span
                                    key={cat}
                                    className="inline-block px-4 py-1.5 rounded-full bg-[#1c2127] text-blue-400 text-xs font-bold uppercase tracking-wider border border-slate-800"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Meta Info Line */}
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-400 border-t border-slate-800 pt-8 mt-8 inline-flex mx-auto">
                        {author && (
                            <div className="flex items-center gap-3">
                                {author.avatarUrl ? (
                                    <img src={author.avatarUrl} alt="" className="w-8 h-8 rounded-full border border-slate-700" />
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
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10 mb-16">
                {featuredImage && featuredImage.url ? (
                    <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-800/50 aspect-video bg-slate-900">
                        <img
                            src={featuredImage.url}
                            alt={featuredImage.alt || post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : null}
            </div>
            {/* Main Content Grid */}
            <div className="max-w-[1400px] mx-auto px-6 -mt-10 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Sidebar: Table of Contents */}
                    <aside className="hidden lg:block col-span-2 relative">
                        <TableOfContents items={toc} />
                    </aside>
                    {/* Center Column: Main Content */}
                    <div className="col-span-1 lg:col-span-7">
                        {/* Content */}
                        <div className="prose prose-lg prose-invert max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-code:text-pink-400 prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-800 prose-img:rounded-xl">
                            <RichText content={post.content} />
                        </div>
                        {/* Footer / Author Card */}
                        <hr className="border-slate-800 my-16" />
                        <div className="bg-slate-900/40 rounded-2xl p-8 border border-white/5 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                            {/* Avatar */}
                            <div className="shrink-0">
                                {author?.avatar && typeof author.avatar === 'object' && author.avatar.url ? (
                                    <img
                                        src={author.avatar.url}
                                        alt={author.name || 'Author'}
                                        className="w-20 h-20 rounded-full object-cover shadow-lg ring-2 ring-blue-500/20"
                                    />
                                ) : author?.avatarUrl ? (
                                    <img
                                        src={author.avatarUrl}
                                        alt={author.name || 'Author'}
                                        className="w-20 h-20 rounded-full object-cover shadow-lg ring-2 ring-blue-500/20"
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
                                {/* Social Links */}
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
                    {/* Right Sidebar: Widgets */}
                    <aside className="hidden lg:block col-span-3 relative">
                        <div className="sticky top-32 space-y-8">
                            {/* Subscribe Box */}
                            <SubscribeBox />
                            {/* Sharing */}
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
            {/* Related Articles Section */}
            <RelatedPosts posts={relatedPosts.docs} />
        </article>
    )
}
