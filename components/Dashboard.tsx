import type { AdminViewProps } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Dashboard({ user }: AdminViewProps) {
    const payload = await getPayload({ config })

    // Fetch all stats in parallel
    const [usersCount, mediaCount, postsPublished, postsDraft, projectsCount, categoriesCount, recentPosts] = await Promise.all([
        payload.count({ collection: 'users' }),
        payload.count({ collection: 'media' }),
        payload.count({ collection: 'posts', where: { _status: { equals: 'published' } } }),
        payload.count({ collection: 'posts', where: { _status: { equals: 'draft' } } }),
        payload.count({ collection: 'projects' }),
        payload.count({ collection: 'categories' }),
        payload.find({
            collection: 'posts',
            sort: '-updatedAt',
            limit: 5,
            depth: 0,
        }),
    ])

    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '80%', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    Bienvenido, {user?.name}
                </h1>
                <p style={{ color: '#888', fontSize: '0.875rem', margin: 0 }}>
                    Panel de administración — MAHG.me
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                marginBottom: '2.5rem',
            }}>
                <StatCard href="/admin/collections/posts" title="Posts publicados" count={postsPublished.totalDocs} icon="📝" accent="#10b981" />
                <StatCard href="/admin/collections/posts?where[or][0][and][0][_status][equals]=draft" title="Borradores" count={postsDraft.totalDocs} icon="📄" accent="#f59e0b" />
                <StatCard href="/admin/collections/projects" title="Proyectos" count={projectsCount.totalDocs} icon="🚀" accent="#8b5cf6" />
                <StatCard href="/admin/collections/categories" title="Categorías" count={categoriesCount.totalDocs} icon="🏷️" accent="#10b981" />
                <StatCard href="/admin/collections/media" title="Archivos" count={mediaCount.totalDocs} icon="📁" accent="#a855f7" />
            </div>

            {/* Content Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
            }}>
                {/* Recent Posts */}
                <div style={{
                    background: '#1c1c1c',
                    border: '1px solid #2e2e2e',
                    borderRadius: '10px',
                    padding: '1.5rem',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                            Últimos Posts
                        </h2>
                        <a href="/admin/collections/posts" style={{
                            fontSize: '0.75rem', color: '#aaa', textDecoration: 'none',
                        }}>Ver todos →</a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {recentPosts.docs.length === 0 && (
                            <p style={{ color: '#888', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                                No hay posts aún.
                            </p>
                        )}
                        {recentPosts.docs.map((post: any) => (
                            <a
                                key={post.id}
                                href={`/admin/collections/posts/${post.id}`}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.75rem 0',
                                    borderBottom: '1px solid #2e2e2e',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    gap: '1rem',
                                }}
                            >
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {post.title || 'Sin título'}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '2px' }}>
                                        {formatDate(post.updatedAt)}
                                    </div>
                                </div>
                                <span style={{
                                    fontSize: '0.65rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    flexShrink: 0,
                                    background: post._status === 'published' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                                    color: post._status === 'published' ? '#10b981' : '#f59e0b',
                                }}>
                                    {post._status === 'published' ? 'Publicado' : 'Borrador'}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Actions - I'm testing right now with this element. I'll remove it later or change it if it's not useful.
                Could be useful to test analytics. <- Dashboard need this quick actions. I'll keep it for now, if Alejandro in the future thinks it's not useful, he can remove it.
                */}

                <div style={{
                    background: '#1c1c1c',
                    border: '1px solid #2e2e2e',
                    borderRadius: '10px',
                    padding: '1.5rem',
                }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Acciones Rápidas
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <QuickActionButton href="/admin/collections/posts/create" label="Nuevo Post" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>} />
                        <QuickActionButton href="/admin/collections/projects/create" label="Nuevo Proyecto" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>} />
                        <QuickActionButton href="/admin/collections/media/create" label="Subir Archivo" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>} />
                        <QuickActionButton href="/admin/collections/categories" label="Gestionar Categorías" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>} />
                        <QuickActionButton href="/admin/globals/site-settings" label="Configuración del Sitio" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>} />
                    </div>

                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #2e2e2e' }}>
                        <h3 style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.75rem', color: '#888' }}>
                            Enlaces
                        </h3>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <a href="/" target="_blank" rel="noopener noreferrer" style={{
                                fontSize: '0.8rem', color: '#aaa', textDecoration: 'none',
                            }}>Ver sitio web ↗</a>
                            <a href="/blog" target="_blank" rel="noopener noreferrer" style={{
                                fontSize: '0.8rem', color: '#aaa', textDecoration: 'none',
                            }}>Ver blog ↗</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, count, icon, accent, href }: { title: string; count: number; icon: string; accent: string; href: string }) {
    return (
        <a href={href} style={{
            background: '#1c1c1c',
            border: '1px solid #2e2e2e',
            borderRadius: '10px',
            padding: '1.25rem',
            borderTop: `3px solid ${accent}`,
            textDecoration: 'none',
            color: 'inherit',
            display: 'block',
            transition: 'background 0.15s',
        }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icon}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', lineHeight: 1 }}>
                {count}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                {title}
            </div>
        </a>
    )
}

function QuickActionButton({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.65rem 1rem',
                background: '#262626',
                border: '1px solid #333',
                borderRadius: '6px',
                textDecoration: 'none',
                color: '#ddd',
                fontSize: '0.85rem',
                fontWeight: '500',
                transition: 'background 0.15s',
            }}
        >
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, opacity: 0.7 }}>{icon}</span>
            {label}
        </a>
    )
}
