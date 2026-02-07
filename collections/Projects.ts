import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'techStack', 'createdAt'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Título del Proyecto',
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'isFeatured',
                    type: 'checkbox',
                    label: '¿Proyecto Destacado?',
                    defaultValue: false,
                    admin: {
                        width: '50%',
                        style: {
                            alignSelf: 'end',
                            marginBottom: '20px',
                        },
                    },
                },
            ],
        },
        {
            name: 'banner',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Banner / Imagen Principal',
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            label: 'Descripción Breve',
        },
        {
            name: 'techStack',
            type: 'array',
            label: 'Tecnologías (Tags)',
            minRows: 1,
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                    label: 'Tecnología (Ej: React, Next.js)',
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'githubLink',
                    type: 'text',
                    label: 'Link a GitHub',
                },
                {
                    name: 'figmaLink',
                    type: 'text',
                    label: 'Link a Figma',
                },
                {
                    name: 'websiteLink',
                    type: 'text',
                    label: 'Link al Sitio Web',
                },
            ],
        },
    ],
}
