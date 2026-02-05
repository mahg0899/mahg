import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Ajustes General & SEO',
    admin: {
        group: 'Configuración Web',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'General',
                    fields: [
                        {
                            name: 'siteTitle',
                            type: 'text',
                            label: 'Nombre del Sitio',
                            defaultValue: 'BentoMahg',
                            required: true,
                        },
                        {
                            name: 'siteDescription',
                            type: 'textarea',
                            label: 'Descripción Corta',
                            admin: {
                                description: 'Descripción general para motores de búsqueda.',
                            }
                        }
                    ]
                },
                {
                    label: 'SEO Global',
                    fields: [
                        {
                            name: 'metaTitleSuffix',
                            type: 'text',
                            label: 'Sufijo del Título',
                            defaultValue: ' | BentoMahg',
                            admin: {
                                description: 'Se añade al final de cada título (ej: "Mi Post | BentoMahg").',
                            }
                        },
                        {
                            name: 'defaultImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Imagen por Defecto (OG Image)',
                            admin: {
                                description: 'Se usa cuando una página o post no tiene imagen destacada.',
                            }
                        },
                        {
                            name: 'favicon',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Favicon / Icono',
                        }
                    ]
                }
            ]
        }
    ],
}
