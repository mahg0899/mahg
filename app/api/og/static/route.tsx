import { NextRequest } from 'next/server'
import { generateStaticOg } from '@/lib/og-static'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const pages: Record<string, { title: string; description: string; label?: string }> = {
    home: {
        title: 'Bienvenido a MAHG.me',
        description: 'Frontend Developer especializado en React, Next.js y TypeScript. Explora mis proyectos, lee artículos sobre desarrollo web y conoce mi trabajo.',
        label: 'Inicio - Portafolio Personal',
    },
    about: {
        title: 'Sobre mí',
        description: 'Desarrollador frontend egresado en Derecho, transformando curiosidad tecnológica en soluciones digitales. Mi stack, experiencia y lo que me mueve.',
        label: 'Sobre mí',
    },
    contact: {
        title: 'Contacto',
        description: '¿Tienes un proyecto o propuesta laboral? Ponte en contacto conmigo, estoy disponible para freelance, colaboraciones y nuevas oportunidades.',
        label: 'Contacto',
    },
    blog: {
        title: 'Blog',
        description: 'Mi rincón en internet. Escribo sobre lo que me interesa, me apasiona o simplemente me da la gana de compartir.',
        label: 'Blog',
    },
    portfolio: {
        title: 'Portafolio',
        description: 'Aplicaciones web, interfaces UI/UX y proyectos open source. Explora mi trabajo con React, Next.js, Payload CMS y otras tecnologías modernas.',
        label: 'Portafolio',
    },
}

export async function GET(req: NextRequest) {
    const page = req.nextUrl.searchParams.get('page') ?? 'home'
    const data = pages[page] ?? pages.home
    return generateStaticOg(data)
}
