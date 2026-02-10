import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarDays, faEnvelope, faMapMarkerAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faDribbble, faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Contact() {
    return (
        <div className="min-h-screen relative flex flex-col justify-center overflow-hidden mx-auto max-w-6/10">
            <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none mx-auto"></div>

            <div className="relative z-10 pb-12">
                <h1 className="text-5xl font-black font-inter leading-none drop-shadow-md text-white mb-6">
                    Comencemos a trabajar <span className="text-btn">juntos.</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl font-inter font-medium leading-relaxed">
                    ¿Tienes un proyecto en mente o una propuesta laboral? <br />
                    Rellena el siguiente formulario y me pondré en contacto a la brevedad.
                </p>
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                <div className="lg:col-span-7 bg-bento border border-slate-700/50 rounded-2xl p-8 shadow-sm relative group overflow-hidden hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre Completo</label>
                            <input type="text" placeholder="Alejandro Hernández" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-btn focus:ring-1 focus:ring-btn transition-all text-sm font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email <span className="text-blue-500">*</span></label>
                            <input type="email" placeholder="your@email.com" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-btn focus:ring-1 focus:ring-btn transition-all text-sm font-medium" />
                        </div>
                    </div>
                    <div className="space-y-2 mb-6">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Asunto</label>
                        <select className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-btn focus:ring-1 focus:ring-btn transition-all text-sm font-medium appearance-none">
                            <option>Propuesta de Proyecto</option>
                            <option>Oferta Laboral</option>
                            <option>Colaboración</option>
                            <option>Soporte Técnico</option>
                            <option>Otro</option>
                        </select>
                    </div>

                    <div className="space-y-2 mb-8">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mensaje</label>
                        <textarea rows={5} placeholder="Hola, me gustaría proponerte un proyecto..." className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-btn focus:ring-1 focus:ring-btn transition-all text-sm font-medium resize-none"></textarea>
                    </div>
                    <button className="w-full bg-btn hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn cursor-pointer">
                        Enviar Mensaje
                        <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                </div>
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-bento border border-slate-700/50 rounded-2xl p-6 shadow-sm hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">Contacto Directo</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group/item">
                                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Email</p>
                                    <a href="mailto:contacto@mahg.me" className="text-white font-semibold hover:text-blue-400 transition-colors">contacto@mahg.me</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group/item">
                                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Ubicación</p>
                                    <p className="text-white font-semibold">Xalapa, Veracruz. (UTC-6)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href="https://cal.com/mahg0899/15min" className="block bg-btn rounded-2xl p-8 shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 group relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-2">¿Quieres saltarte el formulario?</h3>
                            <p className="text-blue-100 text-sm mb-6 leading-relaxed max-w-[280px]">
                                Agenda una llamada rápida de 15 min para discutir tu visión directamente conmigo.
                            </p>
                            <div className="bg-white text-btn px-4 py-3 rounded-lg font-bold text-sm inline-flex items-center gap-2 group-hover:shadow-lg transition-all hover:scale-105">
                                <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                                Agendar Reunión
                            </div>
                        </div>
                        <div className="absolute -right-6 -bottom-6 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                            <FontAwesomeIcon icon={faCalendarDays} className="w-35 h-35 text-white/20" />
                        </div>
                    </Link>
                    <div className="bg-bento border border-slate-700/50 rounded-2xl p-6 shadow-sm hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Estemos conectados</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { name: "GitHub", icon: faGithub, url: "https://github.com/mahg0899" },
                                { name: "LinkedIn", icon: faLinkedin, url: "https://www.linkedin.com/in/mahg0899/" },
                                { name: "Twitter", icon: faTwitter, url: "https://twitter.com/mahg0899" },
                            ].map((social, i) => (
                                <Link key={i} href={social.url} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-slate-500 transition-colors group">
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