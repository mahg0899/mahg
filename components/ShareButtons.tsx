'use client'

import { useState } from 'react'

export default function ShareButtons({ title, slug }: { title: string, slug: string }) {
    const [copied, setCopied] = useState(false)

    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${slug}`

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url,
                })
            } catch (err) {
                console.error('Error sharing:', err)
            }
        } else {
            handleCopy()
        }
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={handleShare}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1c2127] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                title="Compartir"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            </button>
            <button
                onClick={handleCopy}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1c2127] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                title="Copiar enlace"
            >
                {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                )}
            </button>
        </div>
    )
}
