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
                            defaultValue: 'MAHG.me',
                            required: true,
                        },
                        {
                            name: 'siteDescription',
                            type: 'textarea',
                            label: 'Descripción del Sitio',
                            admin: {
                                description: 'Se usa como descripción en motores de búsqueda y embeds si no se especifica otra.',
                            }
                        }
                    ]
                },
                {
                    label: 'SEO Global',
                    description: 'Configura cómo se ve tu sitio en buscadores y al compartir en redes sociales.',
                    fields: [
                        {
                            name: 'metaTitleSuffix',
                            type: 'text',
                            label: 'Sufijo del Título',
                            defaultValue: ' | MAHG.me',
                            admin: {
                                description: 'Se añade al final de cada título (ej: "Mi Post | MAHG.me").',
                            }
                        },
                        {
                            name: 'defaultImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Imagen por Defecto (OG Image)',
                            admin: {
                                description: 'Se usa como imagen del embed cuando una página no tiene imagen propia. Recomendado: 1200×630px.',
                            }
                        },
                        {
                            name: 'favicon',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Favicon / Icono',
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'twitterCard',
                                    type: 'select',
                                    label: 'Tipo de Twitter Card',
                                    defaultValue: 'summary_large_image',
                                    options: [
                                        { label: 'Imagen Grande', value: 'summary_large_image' },
                                        { label: 'Resumen', value: 'summary' },
                                    ],
                                    admin: {
                                        width: '50%',
                                        description: '"Imagen Grande" muestra la imagen completa. "Resumen" muestra un cuadrado pequeño.',
                                    },
                                },
                                {
                                    name: 'twitterHandle',
                                    type: 'text',
                                    label: 'Twitter / X Handle',
                                    admin: {
                                        width: '50%',
                                        placeholder: '@mahg_dev',
                                        description: 'Tu usuario de Twitter/X (con @).',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'themeColor',
                            type: 'text',
                            label: 'Color del Tema',
                            defaultValue: '#0f172a',
                            admin: {
                                description: 'Color de la barra del navegador móvil y del borde del embed en Discord.',
                                placeholder: '#0f172a',
                            },
                        },
                    ]
                },
            ]
        }
    ],
}
