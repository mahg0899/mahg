import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    versions: {
        drafts: true,
    },
    labels: {
        singular: 'Post',
        plural: 'Posts',
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'publishedAt'],
        livePreview: {
            url: ({ data }) => {
                return `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${data.slug}?draft=true`
            },
        },
        components: {
            edit: {
                // 'actions' does not exist, using 'beforeDocumentControls' to place it near the other buttons
                beforeDocumentControls: ['/components/PreviewLink#PreviewLink'],
            }
        }
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Título',
            admin: {
                placeholder: 'Escribe un título llamativo...',
                className: 'post-title',
            }
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Imagen Destacada',
            required: false,
            admin: {
                description: 'Imagen principal del artículo.',
                className: 'post-featured-image',
            }
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            label: 'Categorías',
            admin: {
                className: 'post-categories',
            },
        },

        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Contenido',
                    fields: [
                        {
                            name: 'content',
                            type: 'richText',
                            required: true,
                            label: false,
                            admin: {
                                className: 'post-content-editor',
                            }
                        },
                    ]
                },
                {
                    label: 'Configuración',
                    fields: [
                        {
                            name: 'excerpt',
                            type: 'textarea',
                            label: 'Resumen / Extracto',
                            admin: {
                                description: 'Aparece en las tarjetas del blog.',
                                rows: 3,
                            },
                        },
                        {
                            type: 'row',
                            fields: [

                                {
                                    name: 'publishedAt',
                                    type: 'date',
                                    label: 'Fecha de Publicación',
                                    admin: {
                                        date: {
                                            pickerAppearance: 'dayAndTime',
                                        },
                                        width: '50%',
                                        description: 'Se establece automáticamente al publicar. Puedes modificarla manualmente.',
                                    },
                                    hooks: {
                                        beforeChange: [
                                            ({ value, data, originalDoc }) => {
                                                // If the user explicitly set/changed the date, respect it
                                                if (value && originalDoc?.publishedAt && value !== originalDoc.publishedAt) {
                                                    return value
                                                }
                                                // Auto-set date when publishing for the first time
                                                const isPublishing = data?._status === 'published'
                                                const wasDraft = !originalDoc?._status || originalDoc?._status === 'draft'
                                                if (isPublishing && wasDraft && !value) {
                                                    return new Date().toISOString()
                                                }
                                                // If already published and has a date, keep it
                                                if (value) return value
                                                // If publishing without a date (edge case), set it now
                                                if (isPublishing && !value) {
                                                    return new Date().toISOString()
                                                }
                                                return value
                                            }
                                        ]
                                    },
                                },
                            ]
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'author',
                                    type: 'relationship',
                                    relationTo: 'users',
                                    required: true,
                                    label: 'Autor',
                                    defaultValue: ({ user }: { user: { id: string } }) => user?.id,
                                    admin: {
                                        width: '50%',
                                    }
                                },
                                {
                                    name: 'isFeatured',
                                    type: 'checkbox',
                                    label: 'Destacar como Post Principal',
                                    admin: {
                                        position: 'sidebar',
                                        description: 'Si se marca, aparecerá destacado al inicio del blog.',
                                    },
                                },
                                {
                                    name: 'slug',
                                    type: 'text',
                                    label: 'Slug URL',
                                    unique: true,
                                    admin: {
                                        description: 'Se genera automáticamente.',
                                    },
                                    hooks: {
                                        beforeValidate: [
                                            ({ value, data }) => {
                                                if (!value && data?.title) {
                                                    return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                                }
                                                return value;
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    label: 'SEO',
                    fields: [
                        {
                            name: 'seo',
                            type: 'group',
                            label: 'Configuración SEO',
                            fields: [
                                {
                                    name: 'metaTitle',
                                    type: 'text',
                                    label: 'Meta Título',
                                },
                                {
                                    name: 'metaDescription',
                                    type: 'textarea',
                                    label: 'Meta Descripción',
                                },
                                {
                                    name: 'metaImage',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Imagen OG',
                                },
                            ],
                        },
                    ]
                }
            ]
        }
    ],
}
