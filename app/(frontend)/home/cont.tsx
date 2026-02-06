import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Cont() {
    return (
        <div className="mx-auto max-w-6/10 pt-30 pb-15">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="pt-10 pb-10 relative col-span-3 overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white">¿Comenzamos un proyecto?</h1>
                            <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">Si tienes alguna idea en mente o necesitas ayuda con algún proyecto, no dudes en contactarme.</p>
                        </div>
                        <div className="flex justify-end items-center">
                            <Link href="/contact" className="mt-4 bg-btn hover:bg-btn/80 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-btn/25 hover:-translate-y-0.5 flex items-center gap-2">
                                Contactarme
                                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:border-btn/50 transition-all duration-300 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 md:col-span-1 flex flex-col justify-center gap-8">
                    <h2 className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Conecta</h2>
                    <div className="flex items-center justify-center gap-8">
                        <a href="https://www.linkedin.com/in/mahg0899/" className="group/icon relative flex flex-col items-center" target="_blank">
                            <span className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></span>
                            <FontAwesomeIcon icon={faLinkedin} className="relative z-10 text-slate-600 group-hover/icon:text-blue-500 transition-colors w-7 h-7" />
                        </a>
                        <a href="https://github.com/mahg0899" className="group/icon relative flex flex-col items-center" target="_blank">
                            <span className="absolute -inset-4 bg-slate-500/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></span>
                            <FontAwesomeIcon icon={faGithub} className="relative z-10 text-slate-600 group-hover/icon:text-white transition-colors w-7 h-7" />
                        </a>
                        <a href="https://x.com/mahg0899" className="group/icon relative flex flex-col items-center" target="_blank">
                            <span className="absolute -inset-4 bg-sky-500/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></span>
                            <FontAwesomeIcon icon={faXTwitter} className="relative z-10 text-slate-600 group-hover/icon:text-sky-400 transition-colors w-7 h-7" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}