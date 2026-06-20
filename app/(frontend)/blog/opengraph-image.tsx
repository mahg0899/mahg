import { generateStaticOg } from '@/lib/og-static'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export default async function OgImage() {
    return generateStaticOg({
        title: 'Blog',
        description: 'Artículos sobre desarrollo, tecnología\ny todo lo que me llama la atención.',
        label: 'MAHG.me · Blog',
    })
}
