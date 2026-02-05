'use client'
import React from 'react'
import { useFormFields } from '@payloadcms/ui'

// Simple external link icon
const ExternalIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
)

export const PreviewLink: React.FC = () => {
    // We hook into the form state to get the slug live
    const slug = useFormFields(([fields]) => fields.slug?.value as string)

    if (!slug) return null

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const href = `${baseUrl}/blog/${slug}`

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir en pestaña nueva"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '35px', // Match standard button height
                width: '35px',
                padding: '0',
                backgroundColor: 'transparent',
                color: 'var(--theme-elevation-400)', // Muted color by default
                borderRadius: '4px',
                border: '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginLeft: '8px', // Spacing from other buttons
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--theme-elevation-100)'
                e.currentTarget.style.color = 'var(--theme-text)'
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--theme-elevation-400)'
            }}
        >
            <ExternalIcon />
        </a>
    )
}
