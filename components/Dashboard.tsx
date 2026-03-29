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
                <p style={{ color: 'var(--theme-elevation-400)', fontSize: '0.875rem', margin: 0 }}>
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
                <StatCard href="/admin/collections/posts" title="Posts publicados" count={postsPublished.totalDocs} icon="📝" accent="#3b82f6" />
                <StatCard href="/admin/collections/posts?where[or][0][and][0][_status][equals]=draft" title="Borradores" count={postsDraft.totalDocs} icon="📄" accent="#f59e0b" />
                <StatCard href="/admin/collections/projects" title="Proyectos" count={projectsCount.totalDocs} icon="🚀" accent="#8b5cf6" />
                <StatCard href="/admin/collections/categories" title="Categorías" count={categoriesCount.totalDocs} icon="🏷️" accent="#10b981" />
                <StatCard href="/admin/collections/media" title="Archivos" count={mediaCount.totalDocs} icon="📁" accent="#6366f1" />
            </div>

            {/* Content Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
            }}>
                {/* Recent Posts */}
                <div style={{
                    background: 'var(--theme-elevation-50)',
                    border: '1px solid var(--theme-elevation-100)',
                    borderRadius: '10px',
                    padding: '1.5rem',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                            Últimos Posts
                        </h2>
                        <a href="/admin/collections/posts" style={{
                            fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'none',
                        }}>Ver todos →</a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {recentPosts.docs.length === 0 && (
                            <p style={{ color: 'var(--theme-elevation-400)', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
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
                                    borderBottom: '1px solid var(--theme-elevation-100)',
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
                                    <div style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-400)', marginTop: '2px' }}>
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
                                    background: post._status === 'published' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                                    color: post._status === 'published' ? '#10b981' : '#f59e0b',
                                }}>
                                    {post._status === 'published' ? 'Publicado' : 'Borrador'}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Actions - I'm testing right now with this element. I'll remove it later or change it if it's not useful.
                Could be useful to test analytics.
                
                <div style={{
                    background: 'var(--theme-elevation-50)',
                    border: '1px solid var(--theme-elevation-100)',
                    borderRadius: '10px',
                    padding: '1.5rem',
                }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Acciones Rápidas
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <QuickActionButton href="/admin/collections/posts/create" label="✏️ Nuevo Post" />
                        <QuickActionButton href="/admin/collections/projects/create" label="🚀 Nuevo Proyecto" />
                        <QuickActionButton href="/admin/collections/media/create" label="📁 Subir Archivo" />
                        <QuickActionButton href="/admin/collections/categories" label="🏷️ Gestionar Categorías" />
                        <QuickActionButton href="/admin/globals/site-settings" label="⚙️ Configuración del Sitio" />
                    </div>

                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--theme-elevation-100)' }}>
                        <h3 style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--theme-elevation-400)' }}>
                            Enlaces
                        </h3>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <a href="/" target="_blank" rel="noopener noreferrer" style={{
                                fontSize: '0.8rem', color: '#3b82f6', textDecoration: 'none',
                            }}>Ver sitio web ↗</a>
                            <a href="/blog" target="_blank" rel="noopener noreferrer" style={{
                                fontSize: '0.8rem', color: '#3b82f6', textDecoration: 'none',
                            }}>Ver blog ↗</a>
                        </div>
                    </div>
                </div>
                */}
            </div>
        </div>
    )
}

function StatCard({ title, count, icon, accent, href }: { title: string; count: number; icon: string; accent: string; href: string }) {
    return (
        <a href={href} style={{
            background: 'var(--theme-elevation-50)',
            border: '1px solid var(--theme-elevation-100)',
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
            <div style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-400)', marginTop: '0.25rem' }}>
                {title}
            </div>
        </a>
    )
}

function QuickActionButton({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            style={{
                display: 'block',
                padding: '0.65rem 1rem',
                background: 'var(--theme-elevation-100)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: '6px',
                textDecoration: 'none',
                color: 'var(--theme-text)',
                fontSize: '0.85rem',
                fontWeight: '500',
                transition: 'background 0.15s',
            }}
        >
            {label}
        </a>
    )
}
