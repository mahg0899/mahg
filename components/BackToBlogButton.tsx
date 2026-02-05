'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function BackToBlogButton() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link
            href="/blog"
            style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: isHovered ? '#1d4ed8' : '#2563eb',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'background 0.2s'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            Ver más posts
        </Link>
    )
}
