import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    labels: {
        singular: 'Artículo',
        plural: 'Artículos',
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'status', 'publishedAt'],
        livePreview: {
            url: ({ data }) => {
                return `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${data.slug}`
            },
        },
        group: 'Contenido',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Contenido Principal',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            label: 'Título del Artículo',
                            admin: {
                                placeholder: 'Escribe un título llamativo...',
                            }
                        },
                        {
                            name: 'content',
                            type: 'richText',
                            required: true,
                            label: 'Cuerpo del Artículo',
                            admin: {
                                style: {
                                    minHeight: '600px',
                                }
                            }
                        },
                        {
                            name: 'featuredImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Imagen de Portada',
                            required: false,
                            admin: {
                                description: 'Imagen principal que se muestra en el blog y al compartir en redes.',
                            }
                        },
                        {
                            name: 'excerpt',
                            type: 'textarea',
                            label: 'Resumen / Extracto',
                            admin: {
                                description: 'Aparece en las tarjetas del blog y en los resultados de búsqueda.',
                                rows: 3,
                            },
                        },
                    ]
                },
                {
                    label: 'Configuración y Medios',
                    fields: [

                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'status',
                                    type: 'select',
                                    required: true,
                                    defaultValue: 'draft',
                                    label: 'Estado',
                                    options: [
                                        { label: 'Borrador', value: 'draft' },
                                        { label: 'Publicado', value: 'published' },
                                        { label: 'Archivado', value: 'archived' },
                                    ],
                                    admin: {
                                        width: '50%',
                                    }
                                },
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
                                    name: 'slug',
                                    type: 'text',
                                    label: 'Slug URL',
                                    unique: true,
                                    admin: {
                                        position: 'sidebar',
                                        description: 'Se genera automáticamente si no lo escribes (TODO: hook)',
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
                            name: 'categories',
                            type: 'select',
                            hasMany: true,
                            label: 'Categorías',
                            options: [
                                { label: 'Tecnología', value: 'tech' },
                                { label: 'Diseño', value: 'design' },
                                { label: 'Desarrollo', value: 'development' },
                                { label: 'Tutorial', value: 'tutorial' },
                                { label: 'Noticias', value: 'news' },
                            ],
                        },
                        {
                            name: 'tags',
                            type: 'text',
                            hasMany: true,
                            label: 'Tags / Etiquetas',
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
                                    admin: {
                                        description: 'Si se deja vacío, se usará el título del artículo.',
                                    }
                                },
                                {
                                    name: 'metaDescription',
                                    type: 'textarea',
                                    label: 'Meta Descripción',
                                    admin: {
                                        description: 'Idealmente entre 150-160 caracteres.',
                                    }
                                },
                                {
                                    name: 'metaImage',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Imagen para Redes Sociales (OG Image)',
                                },
                            ],
                        },
                    ]
                }
            ]
        }
    ],
}
