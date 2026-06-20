import { NextRequest } from 'next/server'
import { generateStaticOg } from '@/lib/og-static'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const pages: Record<string, { title: string; description: string; label?: string }> = {
    home: {
        title: 'Bienvenido\na MAHG.me',
        description: 'Diseño y desarrollo de software. Bienvenido al portafolio de Miguel Alejandro.',
        label: 'Portafolio personal',
    },
    about: {
        title: 'Sobre mí',
        description: 'Conóceme: quién soy, qué hago\ny qué me apasiona.',
        label: 'About me',
    },
    contact: {
        title: 'Contacto',
        description: '¿Tienes un proyecto en mente?\nEscríbeme y lo hablamos.',
        label: 'Hablemos',
    },
    blog: {
        title: 'Blog',
        description: 'Artículos sobre desarrollo, tecnología\ny todo lo que me llama la atención.',
        label: 'MAHG.me · Blog',
    },
    portfolio: {
        title: 'Portafolio',
        description: 'Proyectos y trabajos desarrollados.\nDiseño, código y creatividad.',
        label: 'Mis proyectos',
    },
}

export async function GET(req: NextRequest) {
    const page = req.nextUrl.searchParams.get('page') ?? 'home'
    const data = pages[page] ?? pages.home
    return generateStaticOg(data)
}
