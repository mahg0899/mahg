import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: false,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto de Perfil',
    },
    {
      name: 'avatarUrl',
      type: 'text',
      label: 'URL de Avatar (GitHub)',
      defaultValue: 'https://avatars.githubusercontent.com/u/46274461?v=4',
      admin: {
        description: 'Se usará si no subes una foto de perfil.',
      }
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografía',
    },
    {
      name: 'links',
      type: 'array',
      label: 'Enlaces',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Nombre (ej: Twitter)',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        }
      ]
    },
    // Email added by default
    // Add more fields as needed
  ],
}
