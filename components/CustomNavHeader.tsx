'use client'

import { useEffect, useState } from 'react'

export default function CustomNavHeader() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div style={{
            padding: '1.5rem 1rem',
            borderBottom: '1px solid var(--theme-elevation-150)',
            marginBottom: '1rem'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.5rem'
            }}>
                <a href="/admin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src="/mahg.svg" alt="Logo" style={{ width: '2rem', height: '2rem' }} />
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        margin: 0,
                        background: 'linear-gradient(135deg, #80c5ecff 0%, #1a9ae4ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        MAHG.me v3.2.0
                    </h2>
                </a>
            </div>
            <p style={{
                fontSize: '0.75rem',
                color: 'var(--theme-elevation-400)',
                margin: 0
            }}>
                Panel de Administración
            </p>
        </div>
    )
}
