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
                return `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${data.slug}`
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
            type: 'select',
            hasMany: true,
            label: 'Categorías',
            options: [
                { label: 'Tecnología', value: 'tech' },
                { label: 'Diseño', value: 'design' },
                { label: 'Desarrollo', value: 'development' },
                { label: 'Tutorial', value: 'tutorial' },
                { label: 'Ideas', value: 'ideas' },
                { label: 'Libros', value: 'books' },
            ],
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
                                    defaultValue: () => new Date(),
                                    admin: {
                                        date: {
                                            pickerAppearance: 'dayAndTime',
                                        },
                                        width: '50%',
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
                        {
                            name: 'tags',
                            type: 'text',
                            hasMany: true,
                            label: 'Tags',
                            admin: {
                                description: 'Presiona Enter para añadir una etiqueta',
                            },
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
