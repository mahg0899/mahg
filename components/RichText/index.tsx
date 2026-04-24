'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const PlyrVideo = dynamic(() => import('@/components/PlyrVideo'), { ssr: false })
const ImageGallery = dynamic(() => import('@/components/ImageGallery'), { ssr: false })

type Node = {
    type: string
    value?: {
        url?: string
        alt?: string
        mimeType?: string
    }
    children?: Node[]
    url?: string
    format?: number
    newTab?: boolean
    fields?: {
        blockType?: string
        code?: string
        language?: string
        blockName?: string
        url?: string
        caption?: string
        [key: string]: any
    }
    [key: string]: unknown
}

// Helper to extract YouTube video ID from various URL formats
function getYouTubeId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
        /(?:youtube\.com\/embed\/)([\w-]{11})/,
        /(?:youtu\.be\/)([\w-]{11})/,
        /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    ]
    for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) return match[1]
    }
    return null
}

const YouTubeEmbed = ({ url, caption }: { url: string; caption?: string }) => {
    const videoId = getYouTubeId(url)
    if (!videoId) {
        return (
            <div className="my-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                URL de YouTube no válida: {url}
            </div>
        )
    }

    return (
        <div className="my-8 max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black aspect-video">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title={caption || 'Video de YouTube'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                />
            </div>
            {caption && (
                <p className="mt-3 text-center text-sm text-slate-400 italic">
                    {caption}
                </p>
            )}
        </div>
    )
}

// GitHub Dark syntax highlighter for code blocks
function highlightLine(line: string, lang?: string): React.ReactNode[] {
    const tokens: React.ReactNode[] = []
    const l = lang?.toLowerCase() || ''

    // Shell/bash highlighting
    if (['bash', 'sh', 'shell', 'zsh'].includes(l)) {
        if (line.startsWith('#!')) {
            tokens.push(<span key="shebang" style={{ color: '#79c0ff' }}>{line}</span>)
            return tokens
        }
        if (line.trimStart().startsWith('#')) {
            tokens.push(<span key="comment" style={{ color: '#8b949e' }}>{line}</span>)
            return tokens
        }

        let remaining = line
        let tokenIdx = 0
        while (remaining.length > 0) {
            const dqMatch = remaining.match(/^("(?:[^"\\]|\\.)*")/)
            if (dqMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#a5d6ff' }}>{dqMatch[1]}</span>)
                remaining = remaining.slice(dqMatch[1].length)
                continue
            }
            const sqMatch = remaining.match(/^('(?:[^'\\]|\\.)*')/)
            if (sqMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#a5d6ff' }}>{sqMatch[1]}</span>)
                remaining = remaining.slice(sqMatch[1].length)
                continue
            }
            const flagMatch = remaining.match(/^(--?[\w-]+)/)
            if (flagMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#d2a8ff' }}>{flagMatch[1]}</span>)
                remaining = remaining.slice(flagMatch[1].length)
                continue
            }
            const specialMatch = remaining.match(/^([{}|;+]+)/)
            if (specialMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#e6edf3' }}>{specialMatch[1]}</span>)
                remaining = remaining.slice(specialMatch[1].length)
                continue
            }
            const cmdMatch = remaining.match(/^(echo|find|rm|cd|ls|cat|grep|sed|awk|chmod|chown|mkdir|cp|mv|curl|wget|sudo|apt|yum|npm|pnpm|yarn|node|python|pip|docker|git)\b/)
            if (cmdMatch && (tokens.length === 0 || (typeof tokens[tokens.length - 1] === 'object' && remaining === line.trimStart().slice(line.trimStart().indexOf(cmdMatch[1]))))) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#ff7b72' }}>{cmdMatch[1]}</span>)
                remaining = remaining.slice(cmdMatch[1].length)
                continue
            }
            if (remaining[0] === '.') {
                tokens.push(<span key={tokenIdx++} style={{ color: '#e6edf3' }}>{remaining[0]}</span>)
                remaining = remaining.slice(1)
                continue
            }
            const plainMatch = remaining.match(/^([^"'{}|;+.\-]+)/)
            if (plainMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#e6edf3' }}>{plainMatch[1]}</span>)
                remaining = remaining.slice(plainMatch[1].length)
                continue
            }
            tokens.push(<span key={tokenIdx++} style={{ color: '#e6edf3' }}>{remaining[0]}</span>)
            remaining = remaining.slice(1)
        }
        return tokens
    }

    // JavaScript/TypeScript highlighting
    if (['javascript', 'js', 'typescript', 'ts', 'jsx', 'tsx'].includes(l)) {
        if (line.trimStart().startsWith('//')) {
            tokens.push(<span key="comment" style={{ color: '#8b949e' }}>{line}</span>)
            return tokens
        }

        let remaining = line
        let tokenIdx = 0
        while (remaining.length > 0) {
            const kwMatch = remaining.match(/^(const|let|var|function|return|if|else|for|while|import|export|from|default|class|extends|new|this|async|await|try|catch|throw|typeof|instanceof)\b/)
            if (kwMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#ff7b72' }}>{kwMatch[1]}</span>)
                remaining = remaining.slice(kwMatch[1].length)
                continue
            }
            const strMatch = remaining.match(/^(["'`](?:[^"'`\\]|\\.)*?["'`])/)
            if (strMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#a5d6ff' }}>{strMatch[1]}</span>)
                remaining = remaining.slice(strMatch[1].length)
                continue
            }
            const numMatch = remaining.match(/^(\d+\.?\d*)/)
            if (numMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#79c0ff' }}>{numMatch[1]}</span>)
                remaining = remaining.slice(numMatch[1].length)
                continue
            }
            const opMatch = remaining.match(/^(=>|===|!==|==|!=|&&|\|\||[+\-*/%=<>!&|^~?:]+)/)
            if (opMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#ff7b72' }}>{opMatch[1]}</span>)
                remaining = remaining.slice(opMatch[1].length)
                continue
            }
            const braceMatch = remaining.match(/^([{}[\]()])/)
            if (braceMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#e6edf3' }}>{braceMatch[1]}</span>)
                remaining = remaining.slice(1)
                continue
            }
            const plainMatch = remaining.match(/^([^"'`{}[\]()=<>!&|+\-*/%^~?:0-9\s]+)/)
            if (plainMatch) {
                tokens.push(<span key={tokenIdx++} style={{ color: '#e6edf3' }}>{plainMatch[1]}</span>)
                remaining = remaining.slice(plainMatch[1].length)
                continue
            }
            tokens.push(<span key={tokenIdx++} style={{ color: '#e6edf3' }}>{remaining[0]}</span>)
            remaining = remaining.slice(1)
        }
        return tokens
    }

    // Default: no highlighting
    tokens.push(<span key="plain" style={{ color: '#e6edf3' }}>{line}</span>)
    return tokens
}

const CodeBlock = ({ code, language, filename }: { code: string; language?: string; filename?: string }) => {
    const [copied, setCopied] = useState(false)
    const lines = code.split('\n')
    if (lines.length > 1 && lines[lines.length - 1] === '') {
        lines.pop()
    }
    const lineNumWidth = String(lines.length).length

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const displayLabel = filename || language || 'code'

    return (
        <div className="my-8 max-w-[90%] mx-auto" style={{
            borderRadius: '6px',
            overflow: 'hidden',
            background: '#0d1117',
            border: '1px solid #30363d',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 16px',
                background: '#161b22',
                borderBottom: '1px solid #30363d',
            }}>
                <span style={{
                    fontSize: '12px',
                    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
                    color: '#8b949e',
                }}>
                    {displayLabel}
                </span>
                <button
                    onClick={handleCopy}
                    title="Copiar código"
                    style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid #30363d',
                        background: copied ? 'rgba(63,185,80,0.1)' : 'transparent',
                        color: copied ? '#3fb950' : '#8b949e',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
                        transition: 'color 0.15s, background 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                    onMouseEnter={(e) => {
                        if (!copied) {
                            e.currentTarget.style.color = '#e6edf3'
                            e.currentTarget.style.borderColor = '#8b949e'
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!copied) {
                            e.currentTarget.style.color = '#8b949e'
                            e.currentTarget.style.borderColor = '#30363d'
                        }
                    }}
                >
                    {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    )}
                </button>
            </div>
            {/* Code body */}
            <div style={{ overflow: 'auto', padding: '12px 0' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
                    fontSize: '13px',
                    lineHeight: '1.6',
                }}>
                    <tbody>
                        {lines.map((line, i) => (
                            <tr key={i}>
                                <td style={{
                                    width: `${lineNumWidth + 2}ch`,
                                    padding: '0 12px 0 16px',
                                    textAlign: 'right',
                                    color: '#484f58',
                                    userSelect: 'none',
                                    verticalAlign: 'top',
                                    fontVariantNumeric: 'tabular-nums',
                                }}>
                                    {i + 1}
                                </td>
                                <td style={{
                                    padding: '0 16px 0 12px',
                                    whiteSpace: 'pre',
                                }}>
                                    {highlightLine(line, language)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const RichText: React.FC<{ className?: string; content: any; hasIntroduction?: boolean }> = ({ className, content, hasIntroduction }) => {
    if (!content) {
        return null
    }

    const nodes = content?.root?.children || []

    // If hasIntroduction, split nodes into intro (before first heading) and rest
    if (hasIntroduction && nodes.length > 0) {
        const headingTypes = ['heading', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        const firstHeadingIndex = nodes.findIndex((n: Node) => headingTypes.includes(n.type))

        if (firstHeadingIndex > 0) {
            const introNodes = nodes.slice(0, firstHeadingIndex)
            const restNodes = nodes.slice(firstHeadingIndex)

            return (
                <div className={[className].filter(Boolean).join(' ')}>
                    <section id="introduccion" className="scroll-mt-24">
                        {serializeLexical({ nodes: introNodes })}
                    </section>
                    {serializeLexical({ nodes: restNodes })}
                </div>
            )
        }
    }

    return (
        <div className={[className].filter(Boolean).join(' ')}>
            {serializeLexical({ nodes })}
        </div>
    )
}

// Helper to extract plain text for IDs
function getTextFromNodes(nodes: Node[]): string {
    if (!nodes || !Array.isArray(nodes)) return ''
    return nodes.map(node => {
        if (node.type === 'text') return node.text || ''
        if (node.children) return getTextFromNodes(node.children)
        return ''
    }).join('')
}

function serializeLexical({ nodes }: { nodes: Node[] }) {
    if (!nodes || !Array.isArray(nodes)) return null
    return (
        <>
            {nodes.map((node, index) => {
                if (node == null) {
                    return null
                }

                // ... (rest of text handling is fine, skipping to headings)

                if (node.type === 'text') {
                    // ... (keep existing text handling logic)
                    let text = <span dangerouslySetInnerHTML={{ __html: node.text as string }} key={index} />
                    if (node.format && node.format & 1) text = <strong key={index}>{text}</strong>
                    if (node.format && node.format & 2) text = <em key={index}>{text}</em>
                    if (node.format && node.format & 8) text = <u key={index}>{text}</u>
                    if (node.format && node.format & 16) text = <code key={index}>{text}</code>
                    return text
                }

                if (!node) return null

                switch (node.type) {
                    case 'heading': {
                        const tag = node.tag
                        const children = serializeLexical({ nodes: node.children || [] })
                        // FIX: Use helper to get plain text only
                        const textContent = getTextFromNodes(node.children || [])
                        const id = textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

                        if (tag === 'h1') return <h1 key={index} id={id} className="text-3xl font-bold mt-12 mb-6 text-slate-100 scroll-mt-24">{children}</h1>
                        if (tag === 'h2') return <h2 key={index} id={id} className="text-2xl font-bold mt-12 mb-6 text-slate-100 border-b border-slate-800 pb-2 scroll-mt-24">{children}</h2>
                        if (tag === 'h3') return <h3 key={index} id={id} className="text-xl font-bold mt-8 mb-4 text-blue-400 scroll-mt-24">{children}</h3>
                        if (tag === 'h4') return <h4 key={index} id={id} className="text-lg font-bold mt-8 mb-4 text-slate-200 scroll-mt-24">{children}</h4>
                        if (tag === 'h5') return <h5 key={index} id={id} className="text-base font-bold mt-6 mb-3 text-slate-300 scroll-mt-24">{children}</h5>
                        if (tag === 'h6') return <h6 key={index} id={id} className="text-sm font-bold mt-6 mb-3 text-slate-400 uppercase tracking-wide scroll-mt-24">{children}</h6>
                        return <h1 key={index} id={id} className="text-4xl font-bold mt-12 mb-6 text-slate-100 scroll-mt-24">{children}</h1>
                    }
                    // Clean up individual heading cases if they exist or ensure they use the same ID logic

                    case 'h1':
                        return (
                            <h1 key={index} id={serializeLexical({ nodes: node.children || [] })?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')} className="text-4xl font-bold mt-12 mb-6 text-slate-100 scroll-mt-24">
                                {serializeLexical({ nodes: node.children || [] })}
                            </h1>
                        )
                    case 'h2':
                        return (
                            <h2 key={index} id={serializeLexical({ nodes: node.children || [] })?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')} className="text-xl font-bold mt-12 mb-6 text-slate-100 border-b border-slate-800 pb-2 scroll-mt-24">
                                {serializeLexical({ nodes: node.children || [] })}
                            </h2>
                        )
                    case 'h3':
                        return (
                            <h3 key={index} id={serializeLexical({ nodes: node.children || [] })?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')} className="text-lg font-bold mt-8 mb-4 text-blue-400 scroll-mt-24">
                                {serializeLexical({ nodes: node.children || [] })}
                            </h3>
                        )
                    case 'h4':
                        return (
                            <h4 key={index} id={serializeLexical({ nodes: node.children || [] })?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')} className="text-xl font-bold mt-8 mb-4 text-slate-200 scroll-mt-24">
                                {serializeLexical({ nodes: node.children || [] })}
                            </h4>
                        )
                    case 'h5':
                        return (
                            <h5 key={index} id={serializeLexical({ nodes: node.children || [] })?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')} className="text-lg font-bold mt-6 mb-3 text-slate-300 scroll-mt-24">
                                {serializeLexical({ nodes: node.children || [] })}
                            </h5>
                        )
                    case 'h6':
                        return (
                            <h6 key={index} id={serializeLexical({ nodes: node.children || [] })?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')} className="text-base font-bold mt-6 mb-3 text-slate-400 uppercase tracking-wide scroll-mt-24">
                                {serializeLexical({ nodes: node.children || [] })}
                            </h6>
                        )
                    case 'quote':
                        return (
                            <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-300">
                                {serializeLexical({ nodes: node.children || [] })}
                            </blockquote>
                        )
                    case 'ul':
                    case 'list':
                        return (
                            <ul key={index} className="list-disc list-inside my-4 space-y-2">
                                {serializeLexical({ nodes: node.children || [] })}
                            </ul>
                        )
                    case 'ol':
                        return (
                            <ol key={index} className="list-decimal list-inside my-4 space-y-2">
                                {serializeLexical({ nodes: node.children || [] })}
                            </ol>
                        )
                    case 'li':
                    case 'listitem':
                        return (
                            <li key={index} className="ml-4">
                                {serializeLexical({ nodes: node.children || [] })}
                            </li>
                        )
                    case 'autolink':
                    case 'link': {
                        // Payload CMS 3.x Lexical stores link data in node.fields
                        const linkUrl = (node.fields as any)?.url || node.url || '#'
                        const linkNewTab = (node.fields as any)?.newTab ?? node.newTab
                        const linkType = (node.fields as any)?.linkType // 'custom' or 'internal'

                        // For internal links, the URL might be a relationship
                        let finalUrl = linkUrl
                        if (linkType === 'internal' && (node.fields as any)?.doc) {
                            const doc = (node.fields as any).doc
                            // doc can be { relationTo: 'posts', value: { slug: '...' } } or { value: { slug: '...' } }
                            const relationTo = doc?.relationTo || ''
                            const docValue = typeof doc?.value === 'object' ? doc.value : null

                            if (docValue?.slug) {
                                // Map collection to its frontend URL path
                                switch (relationTo) {
                                    case 'posts':
                                        finalUrl = `/blog/${docValue.slug}`
                                        break
                                    case 'pages':
                                        finalUrl = `/${docValue.slug}`
                                        break
                                    default:
                                        finalUrl = `/blog/${docValue.slug}`
                                        break
                                }
                            }
                        }

                        return (
                            <a
                                href={finalUrl}
                                key={index}
                                target={linkNewTab ? '_blank' : '_self'}
                                rel={linkNewTab ? 'noopener noreferrer' : undefined}
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                {serializeLexical({ nodes: node.children || [] })}
                            </a>
                        )
                    }
                    case 'upload': {
                        // Handle custom fields: width and alignment
                        const alignment = node.fields?.alignment || 'center'
                        const width = node.fields?.width || 'full'

                        let alignClass = 'justify-center'
                        if (alignment === 'left') alignClass = 'justify-start'
                        if (alignment === 'right') alignClass = 'justify-end'

                        let widthClass = 'w-full'
                        if (width === 'wide') widthClass = 'w-3/4' // 75%
                        if (width === 'half') widthClass = 'w-1/2' // 50%
                        if (width === 'narrow') widthClass = 'w-1/4' // 25%

                        // Payload Lexical upload nodes: value can be the full media doc
                        const uploadValue = node.value as any
                        const mediaUrl = uploadValue?.url || ''
                        const mediaAlt = uploadValue?.alt || ''
                        const mimeType = uploadValue?.mimeType || ''

                        // Detect video by mimeType OR file extension
                        const videoExtensions = ['.mp4', '.webm']
                        const urlLower = mediaUrl.toLowerCase()
                        const isVideo = mimeType.startsWith('video/') ||
                            videoExtensions.some((ext: string) => urlLower.endsWith(ext))

                        return (
                            <div key={index} className={`my-8 flex ${alignClass}`}>
                                {mediaUrl && isVideo ? (
                                    <div className={`${widthClass}`}>
                                        <PlyrVideo
                                            src={mediaUrl}
                                            caption={mediaAlt}
                                        />
                                    </div>
                                ) : mediaUrl ? (
                                    <img
                                        src={mediaUrl}
                                        alt={mediaAlt}
                                        className={`rounded-xl h-auto ${widthClass} object-cover shadow-lg`}
                                    />
                                ) : null}
                            </div>
                        )
                    }

                    case 'block':
                        // Code block
                        if (node.fields?.blockType === 'Code' || node.fields?.blockType === 'code') {
                            return (
                                <CodeBlock
                                    key={index}
                                    code={node.fields?.code || ''}
                                    language={node.fields?.language}
                                    filename={node.fields?.blockName}
                                />
                            )
                        }
                        // YouTube embed block
                        if (node.fields?.blockType === 'youtube') {
                            return (
                                <YouTubeEmbed
                                    key={index}
                                    url={node.fields?.url || ''}
                                    caption={node.fields?.caption}
                                />
                            )
                        }
                        // Image Gallery block
                        if (node.fields?.blockType === 'imageGallery') {
                            return (
                                <ImageGallery
                                    key={index}
                                    images={node.fields?.images || []}
                                    columns={node.fields?.columns}
                                    gap={node.fields?.gap}
                                    caption={node.fields?.caption}
                                />
                            )
                        }
                        return null

                    default:
                        return (
                            <p key={index} className="my-4 leading-relaxed text-gray-300">
                                {serializeLexical({ nodes: node.children || [] })}
                            </p>
                        )
                }
            })}
        </>
    )
}
