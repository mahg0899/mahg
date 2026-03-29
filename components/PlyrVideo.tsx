'use client'

import { useEffect, useRef } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

interface PlyrVideoProps {
    src: string
    caption?: string
}

export default function PlyrVideo({ src, caption }: PlyrVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<Plyr | null>(null)
    const initializedRef = useRef(false)

    useEffect(() => {
        if (!containerRef.current || initializedRef.current) return
        initializedRef.current = true

        containerRef.current.innerHTML = ''

        const video = document.createElement('video')
        video.playsInline = true
        video.preload = 'metadata'

        const source = document.createElement('source')
        source.src = src
        source.type = src.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4'
        video.appendChild(source)

        containerRef.current.appendChild(video)

        playerRef.current = new Plyr(video, {
            controls: [
                'play-large',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'settings',
                'pip',
                'fullscreen',
            ],
            settings: ['quality', 'speed'],
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
            tooltips: { controls: true, seek: true },
            keyboard: { focused: true, global: false },
            blankVideo: '',
            loadSprite: true,
        })

        return () => {
            playerRef.current?.destroy()
            playerRef.current = null
            initializedRef.current = false
        }
    }, [src])

    return (
        <div className="my-8 max-w-4xl mx-auto plyr-wrapper">
            <div
                ref={containerRef}
                className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 [&>.plyr]:!rounded-none"
            />
            {caption && (
                <p className="mt-3 text-center text-sm text-slate-400 italic">
                    {caption}
                </p>
            )}
        </div>
    )
}
