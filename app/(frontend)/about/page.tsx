import { Book, Brain, ChevronRight, Clock, Code, Gamepad2, Monitor, Music, Puzzle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mahg.me'

export const metadata: Metadata = {
    title: 'Sobre Mí',
    description: 'Desarrollador frontend egresado en Derecho, transformando curiosidad tecnológica en soluciones digitales. Mi stack, experiencia y lo que me mueve.',
    alternates: {
        canonical: `${baseUrl}/about`,
    },
    openGraph: {
        title: 'Sobre mí',
        description: 'Desarrollador frontend egresado en Derecho, transformando curiosidad tecnológica en soluciones digitales. Mi stack, experiencia y lo que me mueve.',
        url: `${baseUrl}/about`,
        images: [{ url: `${baseUrl}/api/og/static?page=about`, width: 1200, height: 630, alt: 'Sobre mí | MAHG.me' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sobre mí',
        description: 'Desarrollador frontend egresado en Derecho, transformando curiosidad tecnológica en soluciones digitales. Mi stack, experiencia y lo que me mueve.',
        images: [`${baseUrl}/api/og/static?page=about`],
    },
}

export default function About() {
    return (
        <div className="mx-auto w-11/12 xl:w-6/10 pb-15 text-main">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-6 gap-4 auto-rows-[minmax(160px,auto)]">
                <div className="bento-card group md:col-span-3 md:row-span-3 pl-10 pt-4 pb-6 flex flex-col">
                    <p className="text-3xs font-semibold text-btn uppercase tracking-wider mb-2 block pt-7">Mi historia</p>
                    <h1 className="text-3xl md:text-5xl font-black font-inter leading-none drop-shadow-md pt-3">Todo<span className="text-btn italic">proyecto</span> tiene una idea <span className="text-btn italic">detrás</span> y nunca es solo código.</h1>
                    <p className="text-slate-500 mt-6 font-semibold max-w-8/10 pt-4">
                        Licenciado por carrera, pero con ganas de aprender y mejorar mis habilidades, aprendí programación de forma autodidacta y hoy tengo la capacidad de entender y comprender lo mejor de los dos mundos, mi enfoque es desarrrollar aplicaciones demostrando resultados reales y solucionar problemas reales. Actualmente sigo aprendiendo y mejorando estas habilidades para ofrecer los mejores servicios posibles.
                    </p>
                    <p className="text-slate-500 mt-6 font-semibold max-w-8/10">
                        Egresado por la Universidad Veracruzana, y con capacidad real de entender los problemas que podrían afectar la manera de ver el mundo, mi enfoque es no desarrollar por desarrollar, sino también entender el problema de raíz, solucionarlo y brindar las mejores herramientas para cada caso. Pues no todo se puede solucionar con una aplicación, a veces se requiere paciencia y empatía para comprender el enfoque. Es por ello que como asesor jurídico puedo entender el problema y brindar la mejor solución para cada caso.
                    </p>
                    <div className="flex gap-4 mt-8">
                        <div className="flex flex-col justify-center border-r pr-8 border-main/25">
                            <p className="text-2xl font-black text-primary">3+</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Años</p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-2xl font-black text-primary">20+</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Proyectos</p>
                        </div>
                    </div>
                </div>
                <div className="bento-card group md:col-span-1 md:row-span-2 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <Monitor className="shrink-0 text-btn size-3" />
                        <p className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Mi setup</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        {[
                            { name: "Lenovo Ideapad Gaming 3", tag: "WORKSTATION", color: "text-btn bg-btn/10 border-btn/20" },
                            { name: "HyperX Alloy Origins Core", tag: "PERIPHERAL", color: "text-slate-400 bg-slate-400/10 border-slate-400/20" },
                            { name: "Cursor", tag: "IDE", color: "text-slate-400 bg-slate-400/10 border-slate-400/20" },
                            { name: "Obsidian", tag: "TOOLS", color: "text-slate-400 bg-slate-400/10 border-slate-400/20" },
                            { name: "Cursor / Claude", tag: "AI", color: "text-slate-400 bg-slate-400/10 border-slate-400/20"},
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2 px-3">
                                <span className="text-slate-200 font-semibold text-sm">{item.name}</span>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${item.color} uppercase tracking-wider`}>
                                    {item.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bento-card group md:col-span-1 md:row-span-4 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="shrink-0 text-btn size-3" />
                        <p className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Experiencia</p>
                    </div>
                    <div className="relative pl-8 border-l border-main/25 space-y-8 ml-2 my-4">
                        {[
                            { year: "PRESENTE", title: "Estudiante de Ciencia de Datos", desc: "Estudiante de la EBAC en la carrera de Ciencia de Datos." },
                            { year: "2024 — PRESENTE", title: "Desarrollador Freelancer", desc: "Desarrollador web con enfoque en front-end, con experiencia demostrable en UX/UI, TailwindCSS, React y TypeScript." },
                            { year: "2023 — PRESENTE", title: "Asesor Jurídico", desc: "Asesor jurídico en áreas del derecho civil, laboral y administrativo." },
                            { year: "2020 — 2022", title: "Auxiliar de Investigador", desc: "Asesor jurídico en áreas del derecho civil, laboral y administrativo." },
                            { year: "2023", title: "Lic. en Derecho", desc: "Egresado por tesis de la Lic. en Derecho por la Universidad Veracruzana." },
                        ].map((item, i) => (
                            <div key={i} className="relative group/item">
                                <div className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-btn group-hover/item:scale-125 transition-transform duration-300 shadow-[0_0_10px_color-mix(in_srgb,var(--btnColor)_50%,transparent)]"></div>
                                <span className="text-3xs font-bold text-btn uppercase tracking-widest mb-1 block">{item.year}</span>
                                <h3 className="font-bold text-main mb-2 group-hover/item:text-btn transition-colors text-[15px]">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bento-card group md:col-span-2 md:row-span-1 p-6 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-4">
                        <Puzzle className="shrink-0 text-btn size-3" />
                        <p className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Intereses</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {[
                            { name: "Videojuegos", icon: Gamepad2, color: "text-btn border-btn/20 bg-btn/10" },
                            { name: "Libros", icon: Book, color: "text-btn border-btn/20 bg-btn/10" },
                            { name: "Música", icon: Music, color: "text-btn border-btn/20 bg-btn/10" },
                            { name: "Tecnología", icon: Monitor, color: "text-btn border-btn/20 bg-btn/10" },
                            { name: "Coding", icon: Code, color: "text-btn border-btn/20 bg-btn/10" },
                        ].map((interest, i) => (
                            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${interest.color} hover:bg-white/5 transition-colors group/interest`}>
                                <interest.icon className="size-3" />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 group-hover/interest:text-white transition-colors">
                                    {interest.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bento-card group md:col-span-1 md:row-span-1 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="shrink-0 text-btn size-3" />
                        <p className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Mis superpoderes</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 ">
                        {["Pensamiento crítico", "Resolución de problemas", "Trabajo en equipo", "Trabajo en equipo", "Diseño de interfaces"].map((tag, i) => (
                            <span key={i} className="text-[10px] bg-contrast px-2 py-1 rounded font-semibold border border-main/25">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="group relative flex flex-col justify-center overflow-hidden rounded-2xl border border-main/25 bg-btn p-10 transition-all duration-300 hover:-translate-y-2 hover:border-main/50 hover:shadow-lg hover:shadow-btn/20 md:col-span-3 md:row-span-2">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">¿Interesado en iniciar un proyecto?</h2>
                    <p className="mb-6 text-lg">
                        Contactame por mi formulario o mis redes sociales para hablar de tu proyecto.
                    </p>
                    <div className="flex justify-end items-center">
                        <Link href="/contact" className="bg-main text-btn px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 group/btn">
                            ¡Vamos!
                            <ChevronRight className="size-3 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}