import { generateStaticOg } from '@/lib/og-static'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export default async function OgImage() {
    return generateStaticOg({
        title: 'Sobre mí',
        description: 'Conóceme: quién soy, qué hago\ny qué me apasiona.',
        label: 'About me',
    })
}
