import { generateStaticOg } from '@/lib/og-static'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export default async function OgImage() {
    return generateStaticOg({
        title: 'Contacto',
        description: '¿Tienes un proyecto en mente?\nEscríbeme y lo hablamos.',
        label: 'Hablemos',
    })
}
