'use client'

import React, { useState, useEffect } from 'react'
import { useAllFormFields } from '@payloadcms/ui'

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

interface Props {
    path?: string
    [key: string]: unknown
}

const YouTubePreview: React.FC<Props> = ({ path }) => {
    const [fields] = useAllFormFields()

    // Derive the base path: "somepath.preview" → "somepath"
    const basePath = path ? path.replace(/\.preview$/, '') : ''

    let url = ''
    let caption = ''

    if (fields) {
        for (const [fieldPath, fieldData] of Object.entries(fields)) {
            if (fieldPath === `${basePath}.url`) {
                url = (fieldData?.value as string) || ''
            }
            if (fieldPath === `${basePath}.caption`) {
                caption = (fieldData?.value as string) || ''
            }
        }
    }

    const videoId = url ? getYouTubeId(url) : null

    if (!videoId) {
        return (
            <div style={{
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '6px',
                border: '1px dashed rgba(255,255,255,0.08)',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '13px',
                margin: '8px 0 4px',
            }}>
                Ingresa una URL de YouTube para ver la vista previa
            </div>
        )
    }

    return (
        <div style={{
            margin: '8px 0 4px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            maxWidth: '480px',
        }}>
            <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                background: '#000',
            }}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title={caption || 'Vista previa'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                />
            </div>
        </div>
    )
}

export default YouTubePreview
