'use client'

import React, { useState } from 'react'

type Node = {
    type: string
    value?: {
        url?: string
        alt?: string
    }
    children?: Node[]
    url?: string
    format?: number
    newTab?: boolean
    fields?: {
        blockType?: string
        code?: string
        language?: string
        blockName?: string // Added blockName to fields
        [key: string]: any
    }
    [key: string]: unknown
}

const CodeBlock = ({ code, language, filename }: { code: string; language?: string; filename?: string }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="my-8 rounded-xl overflow-hidden bg-[#0f172a] border border-slate-800 shadow-2xl ring-1 ring-white/5 max-w-8/10 mx-auto">
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b]/50 border-b border-slate-700/50 backdrop-blur-sm">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
                    {filename || language || 'CODE'}
                </span>
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all focus:outline-none"
                    title="Copiar código"
                >
                    {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    )}
                </button>
            </div>
            {/* Code Body */}
            <div className="relative group">
                <pre className="p-5 text-sm font-mono leading-relaxed text-slate-200 whitespace-pre-wrap break-words">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    )
}

export const RichText: React.FC<{ className?: string; content: any }> = ({ className, content }) => {
    if (!content) {
        return null
    }

    return (
        <div className={[className].filter(Boolean).join(' ')}>
            {serializeLexical({ nodes: content?.root?.children })}
        </div>
    )
}

function serializeLexical({ nodes }: { nodes: Node[] }) {
    if (!nodes || !Array.isArray(nodes)) return null

    return (
        <>
            {nodes.map((node, index) => {
                if (node == null) {
                    return null
                }

                if (node.type === 'text') {
                    let text = <span dangerouslySetInnerHTML={{ __html: node.text as string }} key={index} />
                    if (node.format && node.format & 1) {
                        text = <strong key={index}>{text}</strong>
                    }
                    if (node.format && node.format & 2) {
                        text = <em key={index}>{text}</em>
                    }
                    if (node.format && node.format & 8) {
                        text = <u key={index}>{text}</u>
                    }
                    if (node.format && node.format & 16) {
                        text = <code key={index}>{text}</code>
                    }
                    return text
                }

                if (!node) {
                    return null
                }

                switch (node.type) {
                    case 'heading': {
                        const tag = node.tag
                        const children = serializeLexical({ nodes: node.children || [] })
                        const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

                        if (tag === 'h1') return <h1 key={index} id={id} className="text-3xl font-bold mt-12 mb-6 text-slate-100 scroll-mt-24">{children}</h1>
                        if (tag === 'h2') return <h2 key={index} id={id} className="text-2xl font-bold mt-12 mb-6 text-slate-100 border-b border-slate-800 pb-2 scroll-mt-24">{children}</h2>
                        if (tag === 'h3') return <h3 key={index} id={id} className="text-xl font-bold mt-8 mb-4 text-blue-400 scroll-mt-24">{children}</h3>
                        if (tag === 'h4') return <h4 key={index} id={id} className="text-lg font-bold mt-8 mb-4 text-slate-200 scroll-mt-24">{children}</h4>
                        if (tag === 'h5') return <h5 key={index} id={id} className="text-base font-bold mt-6 mb-3 text-slate-300 scroll-mt-24">{children}</h5>
                        if (tag === 'h6') return <h6 key={index} id={id} className="text-sm font-bold mt-6 mb-3 text-slate-400 uppercase tracking-wide scroll-mt-24">{children}</h6>
                        return <h1 key={index} id={id} className="text-4xl font-bold mt-12 mb-6 text-slate-100 scroll-mt-24">{children}</h1>
                    }
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
                    case 'link':
                        return (
                            <a
                                href={node.url}
                                key={index}
                                target={node.newTab ? '_blank' : '_self'}
                                rel={node.newTab ? 'noopener noreferrer' : undefined}
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                {serializeLexical({ nodes: node.children || [] })}
                            </a>
                        )
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

                        return (
                            <div key={index} className={`my-8 flex ${alignClass}`}>
                                {node.value?.url && (
                                    <img
                                        src={node.value.url}
                                        alt={node.value.alt || ''}
                                        className={`rounded-xl h-auto ${widthClass} object-cover shadow-lg`}
                                    />
                                )}
                            </div>
                        )
                    }

                    case 'block':
                        // Match 'Code' (capitalized) based on debug output
                        if (node.fields?.blockType === 'Code' || node.fields?.blockType === 'code') {
                            return (
                                <CodeBlock
                                    key={index}
                                    code={node.fields?.code || ''}
                                    language={node.fields?.language}
                                    filename={node.fields?.blockName} // Pass blockName as filename
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
