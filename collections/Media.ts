import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  admin: {
    group: 'Contenido',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
    listSearchableFields: ['alt', 'filename'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto Alternativo',
    },
  ],
  upload: {
    staticDir: 'media',
    filesRequiredOnCreate: false,
    displayPreview: true,
    adminThumbnail: ({ doc }) => (
      typeof doc.mimeType === 'string' &&
      doc.mimeType.startsWith('image/') &&
      typeof doc.url === 'string'
        ? doc.url
        : null
    ),
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
  },
}
