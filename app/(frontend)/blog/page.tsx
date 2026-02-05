import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import PostCard from '@/components/PostCard'

export default async function BlogIndex() {
    const payload = await getPayload({ config })

    const posts = await payload.find({
        collection: 'posts',
        where: {
            status: { equals: 'published' }
        },
        sort: '-publishedAt',
        limit: 20
    })

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1rem'
        }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                }}>
                    Blog
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#64748b'
                }}>
                    Artículos, tutoriales y noticias
                </p>
            </header>

            {/* Posts Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem'
            }}>
                {posts.docs.map((post) => {
                    const featuredImage = post.featuredImage as Media | undefined

                    return (
                        <PostCard
                            key={post.id}
                            slug={post.slug}
                            title={post.title}
                            excerpt={post.excerpt}
                            featuredImage={featuredImage}
                            categories={post.categories}
                            publishedAt={post.publishedAt}
                            author={typeof post.author === 'object' ? (post.author.name || 'Autor') : undefined}
                        />
                    )
                })}
            </div>
            {posts.docs.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: '#1c2127'
                }}>
                    <p style={{ fontSize: '1.25rem' }}>
                        No hay posts publicados aún.
                    </p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Crea tu primer post en el{' '}
                        <a
                            href="/admin/collections/posts/create"
                            style={{ color: '#2563eb', textDecoration: 'underline' }}
                        >
                            panel de admin
                        </a>
                    </p>
                </div>
            )}
        </div>
    )
}
