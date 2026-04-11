import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor, BlocksFeature, CodeBlock, UploadFeature, LinkFeature } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Categories } from "./collections/Categories";
import { Pages } from "./collections/Pages";

import { Projects } from "./collections/Projects";

import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- MAHG.me Admin',
      icons: [{ url: '/mahgw.ico' }],
    },
    dateFormat: 'dd/MM/yyyy',
    avatar: 'gravatar',
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeNavLinks: ['/components/CustomNavHeader'],
      providers: ['/components/admin/AdminStyles'],
      graphics: {
        Icon: '/components/admin/AdminIcon',
      },
      views: {
        /* Dashboard with letter D on mayus load the default dashboard, with d minus load the custom dashboard*/
        dashboard: {
          Component: '/components/Dashboard',
        },
      },
    },
  },
  collections: [Users, Media, Posts, Categories, Pages, Projects],
  globals: [SiteSettings],
  plugins: [
    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
  ],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter(f => f.key !== 'link'),
      LinkFeature({
        enabledCollections: ['posts'],
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'url') {
              return {
                ...field,
                validate: (value: any, { siblingData }: any) => {
                  if (siblingData?.linkType === 'internal') return true
                  if (!value) return 'URL requerida'
                  // Accept any valid URL including steam://, discord://, etc.
                  try { new URL(value); return true } catch { /* continue */ }
                  // Also accept relative URLs
                  if (value.startsWith('/') || value.startsWith('#')) return true
                  // Accept URLs starting with www.
                  if (value.startsWith('www.')) return true
                  return true // Be permissive
                },
              } as typeof field
            }
            return field
          })
        },
      }),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'alignment',
                type: 'select',
                admin: {
                  width: '50%',
                  style: {
                    alignSelf: 'end',
                  }
                },
                options: [
                  { label: 'Centro', value: 'center' },
                  { label: 'Izquierda', value: 'left' },
                  { label: 'Derecha', value: 'right' },
                ],
                defaultValue: 'center',
                label: 'Alineación',
              },
              {
                name: 'width',
                type: 'select',
                admin: {
                  width: '50%',
                  style: {
                    alignSelf: 'end',
                  }
                },
                options: [
                  { label: '100% (Ancho Completo)', value: 'full' },
                  { label: 'Grande (75%)', value: 'wide' },
                  { label: 'Mediano (50%)', value: 'half' },
                  { label: 'Pequeño (25%)', value: 'narrow' },
                ],
                defaultValue: 'full',
                label: 'Tamaño',
              }
            ]
          }
        }
      }),
      BlocksFeature({
        blocks: [
          CodeBlock(),
          {
            slug: 'youtube',
            labels: {
              singular: 'Video de YouTube',
              plural: 'Videos de YouTube',
            },
            fields: [
              {
                name: 'url',
                type: 'text',
                required: true,
                label: 'URL del Video',
                admin: {
                  placeholder: 'https://www.youtube.com/watch?v=... o https://youtu.be/...',
                  description: 'Pega la URL completa del video de YouTube.',
                },
              },
              {
                name: 'caption',
                type: 'text',
                label: 'Descripción (opcional)',
                admin: {
                  placeholder: 'Descripción del video...',
                },
              },
              {
                name: 'preview',
                type: 'ui',
                admin: {
                  components: {
                    Field: '/components/admin/YouTubeBlockPreview',
                  },
                },
              },
            ],
          },
          {
            slug: 'imageGallery',
            labels: {
              singular: 'Galería de Imágenes',
              plural: 'Galerías de Imágenes',
            },
            fields: [
              {
                name: 'bulkUpload',
                type: 'ui',
                admin: {
                  components: {
                    Field: '/components/admin/BulkImagePicker',
                  },
                },
              },
              {
                name: 'images',
                type: 'array',
                label: 'Imágenes',
                required: true,
                minRows: 2,
                labels: {
                  singular: 'Imagen',
                  plural: 'Imágenes',
                },
                fields: [
                  {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: 'Imagen',
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'columns',
                    type: 'select',
                    label: 'Columnas',
                    defaultValue: '2',
                    options: [
                      { label: '2 Columnas', value: '2' },
                      { label: '3 Columnas', value: '3' },
                      { label: '4 Columnas', value: '4' },
                    ],
                    admin: { width: '50%' },
                  },
                  {
                    name: 'gap',
                    type: 'select',
                    label: 'Espaciado',
                    defaultValue: 'md',
                    options: [
                      { label: 'Sin espacio', value: 'none' },
                      { label: 'Pequeño', value: 'sm' },
                      { label: 'Mediano', value: 'md' },
                      { label: 'Grande', value: 'lg' },
                    ],
                    admin: { width: '50%' },
                  },
                ],
              },
              {
                name: 'caption',
                type: 'text',
                label: 'Descripción (opcional)',
                admin: {
                  placeholder: 'Descripción de la galería...',
                },
              },
            ],
          },
        ],
      }),
    ],
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    push: true,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,

});
