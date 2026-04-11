'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface GalleryImage {
    image: {
        url?: string
        alt?: string
        sizes?: {
            card?: { url?: string }
            tablet?: { url?: string }
            thumbnail?: { url?: string }
        }
    } | string
}

interface ImageGalleryProps {
    images: GalleryImage[]
    columns?: string
    gap?: string
    caption?: string
}

export default function ImageGallery({ images, columns = '3', gap = 'md', caption }: ImageGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    if (!images || images.length === 0) return null

    const gapMap: Record<string, string> = {
        none: '0',
        sm: '0.35rem',
        md: '0.75rem',
        lg: '1.25rem',
    }

    const gapValue = gapMap[gap] || gapMap.md
    const colCount = parseInt(columns) || 3

    const getImageUrl = (item: GalleryImage, size: 'full' | 'thumb' = 'thumb') => {
        const img = typeof item.image === 'object' ? item.image : null
        if (!img) return ''
        if (size === 'full') return img.url || ''
        return img.sizes?.card?.url || img.sizes?.tablet?.url || img.url || ''
    }

    const getAlt = (item: GalleryImage) => {
        const img = typeof item.image === 'object' ? item.image : null
        return img?.alt || ''
    }

    const responsiveGridCss = `
        .gallery-grid-${colCount} {
            display: grid;
            grid-template-columns: repeat(${colCount}, 1fr);
            gap: ${gapValue};
        }
        @media (max-width: 1024px) {
            .gallery-grid-${colCount} {
                grid-template-columns: repeat(${Math.min(colCount, 2)}, 1fr);
            }
        }
        @media (max-width: 640px) {
            .gallery-grid-${colCount} {
                grid-template-columns: 1fr;
                gap: ${gap === 'none' ? '0' : '0.75rem'};
            }
        }
    `

    return (
        <>
            <style>{responsiveGridCss}</style>
            <div className="my-8 max-w-5xl mx-auto px-0 sm:px-0">
                <div className={`gallery-grid-${colCount}`}>
                    {images.map((item, i) => {
                        const url = getImageUrl(item)
                        if (!url) return null
                        return (
                            <button
                                key={i}
                                onClick={() => setLightboxIndex(i)}
                                className="group relative overflow-hidden bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{
                                    aspectRatio: '1',
                                    borderRadius: gap === 'none' ? '0' : '8px',
                                }}
                            >
                                <img
                                    src={url}
                                    alt={getAlt(item)}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </button>
                        )
                    })}
                </div>
                {caption && (
                    <p className="mt-3 text-center text-sm text-slate-400 italic">
                        {caption}
                    </p>
                )}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    index={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onChange={setLightboxIndex}
                    getImageUrl={getImageUrl}
                    getAlt={getAlt}
                />
            )}
        </>
    )
}

/* ─── Lightbox with keyboard navigation ─── */

interface LightboxProps {
    images: GalleryImage[]
    index: number
    onClose: () => void
    onChange: (i: number) => void
    getImageUrl: (item: GalleryImage, size: 'full' | 'thumb') => string
    getAlt: (item: GalleryImage) => string
}

function Lightbox({ images, index, onClose, onChange, getImageUrl, getAlt }: LightboxProps) {
    const goPrev = useCallback(() => {
        if (index > 0) onChange(index - 1)
    }, [index, onChange])

    const goNext = useCallback(() => {
        if (index < images.length - 1) onChange(index + 1)
    }, [index, images.length, onChange])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault()
                    goPrev()
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    goNext()
                    break
                case 'Escape':
                    e.preventDefault()
                    onClose()
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        // Prevent body scroll while lightbox is open
        document.body.style.overflow = 'hidden'

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [goPrev, goNext, onClose])

    // Swipe support for mobile
    const [touchStart, setTouchStart] = React.useState<number | null>(null)

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX)
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return
        const diff = touchStart - e.changedTouches[0].clientX
        if (Math.abs(diff) > 60) {
            if (diff > 0) goNext()
            else goPrev()
        }
        setTouchStart(null)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.94)' }}
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
                aria-label="Cerrar (Esc)"
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Previous */}
            {index > 0 && (
                <button
                    onClick={(e) => { e.stopPropagation(); goPrev() }}
                    className="absolute left-2 sm:left-4 text-white/50 hover:text-white transition-colors z-10 p-2 sm:p-3 rounded-full hover:bg-white/10"
                    aria-label="Anterior (←)"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
            )}

            {/* Next */}
            {index < images.length - 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); goNext() }}
                    className="absolute right-2 sm:right-4 text-white/50 hover:text-white transition-colors z-10 p-2 sm:p-3 rounded-full hover:bg-white/10"
                    aria-label="Siguiente (→)"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            )}

            {/* Image */}
            <img
                key={index}
                src={getImageUrl(images[index], 'full')}
                alt={getAlt(images[index])}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[92vw] sm:max-w-[85vw] max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
                style={{ animation: 'galleryFadeIn 0.2s ease' }}
                draggable={false}
            />

            {/* Counter + keyboard hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <span className="text-white/50 text-sm font-mono">
                    {index + 1} / {images.length}
                </span>
                <span className="text-white/25 text-xs hidden sm:block">
                    ← → Navegar · Esc Cerrar
                </span>
            </div>

            <style>{`
                @keyframes galleryFadeIn {
                    from { opacity: 0; transform: scale(0.96); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    )
}
