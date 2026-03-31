import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor, BlocksFeature, CodeBlock, UploadFeature } from "@payloadcms/richtext-lexical";
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
      icons: [{ url: '/mahg.ico' }],
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
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
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
