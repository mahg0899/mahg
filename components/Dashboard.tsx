import type { AdminViewProps } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Dashboard({ user }: AdminViewProps) {
    const payload = await getPayload({ config })

    // Fetch collection stats
    const usersCount = await payload.count({ collection: 'users' })
    const mediaCount = await payload.count({ collection: 'media' })

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
                Bienvenido, {user?.email}
            </h1>

            {/* Quick Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <StatCard title="Usuarios" count={usersCount.totalDocs} icon="👥" />
                <StatCard title="Media" count={mediaCount.totalDocs} icon="📁" />
            </div>

            {/* Quick Actions */}
            <div style={{ marginTop: '2rem' }}>
                <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600' }}>
                    Acciones Rápidas
                </h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <QuickActionButton href="/admin/collections/users/create" label="Crear Usuario" />
                    <QuickActionButton href="/admin/collections/media/create" label="Subir Media" />
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, count, icon }: { title: string; count: number; icon: string }) {
    return (
        <div style={{
            background: 'var(--theme-elevation-50)',
            border: '1px solid var(--theme-elevation-100)',
            borderRadius: '8px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <div style={{ fontSize: '2rem' }}>{icon}</div>
            <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--theme-elevation-400)', marginBottom: '0.25rem' }}>
                    {title}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {count}
                </div>
            </div>
        </div>
    )
}

function QuickActionButton({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'var(--theme-elevation-100)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: '6px',
                textDecoration: 'none',
                color: 'var(--theme-text)',
                fontWeight: '500',
                transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--theme-elevation-150)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--theme-elevation-100)'
            }}
        >
            {label}
        </a>
    )
}
