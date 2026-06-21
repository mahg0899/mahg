import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarDays, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mahg.me'

export const metadata: Metadata = {
    title: 'Contacto',
    description: '¿Tienes un proyecto o propuesta laboral? Ponte en contacto conmigo, estoy disponible para freelance, colaboraciones y nuevas oportunidades.',
    alternates: {
        canonical: `${baseUrl}/contact`,
    },
    openGraph: {
        title: 'Contacto',
        description: '¿Tienes un proyecto o propuesta laboral? Ponte en contacto conmigo, estoy disponible para freelance, colaboraciones y nuevas oportunidades.',
        url: `${baseUrl}/contact`,
        images: [{ url: `${baseUrl}/api/og/static?page=contact`, width: 1200, height: 630, alt: 'Contacto — MAHG.me' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contacto',
        description: '¿Tienes un proyecto o propuesta laboral? Ponte en contacto conmigo, estoy disponible para freelance, colaboraciones y nuevas oportunidades.',
        images: [`${baseUrl}/api/og/static?page=contact`],
    },
}

export default function Contact() {
    return (
        <div className="min-h-screen relative flex flex-col justify-center overflow-hidden mx-auto w-11/12 xl:w-6/10 py-24 md:py-0">
            <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none mx-auto"></div>

            <div className="relative z-10 pb-12">
                <h1 className="text-3xl md:text-5xl font-black font-inter leading-none drop-shadow-md text-white mb-6">
                    Comencemos a trabajar <span className="text-btn">juntos.</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl font-inter font-medium leading-relaxed">
                    ¿Tienes un proyecto en mente o una propuesta laboral? <br />
                    Rellena el siguiente formulario y me pondré en contacto a la brevedad.
                </p>
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                <ContactForm />
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-bento border border-main/25 rounded-lg p-6 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 transition-all duration-300">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">Contacto Directo</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group/item">
                                <div className="p-3 rounded-lg bg-btn/10 text-btn group-hover/item:bg-btn group-hover/item:text-white transition-colors">
                                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Email</p>
                                    <a href="mailto:contacto@mahg.me" className="text-white font-semibold hover:text-btn transition-colors">contacto@mahg.me</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group/item">
                                <div className="p-3 rounded-lg bg-btn/10 text-btn group-hover/item:bg-btn group-hover/item:text-white transition-colors">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Ubicación</p>
                                    <p className="text-white font-semibold">Xalapa, Veracruz. (UTC-6)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href="https://cal.com/mahg0899/15min" className="block bg-btn rounded-lg p-8 shadow-lg shadow-btn/20 transition-all hover:-translate-y-2 group relative overflow-hidden duration-300">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-2">¿Necesitas una solución rápida?</h3>
                            <p className="text-blue-100 text-sm mb-6 leading-relaxed max-w-[280px]">
                                Agenda una llamada rápida de 15 min para discutir tu visión directamente conmigo.
                            </p>
                            <div className="bg-white text-btn px-4 py-3 rounded-lg font-bold text-sm inline-flex items-center gap-2 group-hover:shadow-lg transition-all hover:scale-105">
                                <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                                Agendar Cita
                            </div>
                        </div>
                        <div className="absolute -right-6 -bottom-6 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                            <FontAwesomeIcon icon={faCalendarDays} className="w-35 h-35 text-white/20" />
                        </div>
                    </Link>
                    <div className="bg-bento border border-main/25 rounded-lg p-6 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 transition-all duration-300">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Estemos conectados</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { name: "GitHub", icon: faGithub, url: "https://github.com/mahg0899" },
                                { name: "LinkedIn", icon: faLinkedin, url: "https://www.linkedin.com/in/mahg0899/" },
                                { name: "Twitter", icon: faTwitter, url: "https://twitter.com/mahg0899" },
                            ].map((social, i) => (
                                <Link key={i} href={social.url} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-main/25 hover:border-btn/50 transition-colors group">
                                    <FontAwesomeIcon icon={social.icon} className="text-slate-400 group-hover:text-white transition-colors w-4 h-4" />
                                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{social.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}