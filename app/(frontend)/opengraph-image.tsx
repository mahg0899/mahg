import { generateStaticOg } from '@/lib/og-static'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export default async function OgImage() {
    return generateStaticOg({
        title: 'Bienvenido\na MAHG.me',
        description: 'Desarrollo web, tecnología y creatividad.\nPortafolio personal de Miguel Ángel.',
        label: 'Portafolio personal',
    })
}
