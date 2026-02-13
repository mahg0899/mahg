import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '404',
    description: 'Página no encontrada.',
}

export default function NotFound() {
    return (
        <div>
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 gap-6">
                <div className="relative w-full max-w-lg bg-[#1c2127] border border-slate-700/50 rounded-2xl p-8 md:p-12 text-center overflow-hidden shadow-2xl">
                    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] z-20" />
                    <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase text-left mb-8 relative z-10">
                        HTTP/1.1 404 NOT FOUND
                    </p>
                    <div className="relative z-10 mb-8 select-none">
                        <h1
                            className="relative text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter text-white/90"
                        >
                            <span className="relative inline-block">
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 text-red-500 opacity-70"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)', transform: 'translate(-4px, -2px)' }}
                                >
                                    404
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 text-green-500 opacity-70"
                                    style={{ clipPath: 'polygon(0 33%, 100% 33%, 100% 66%, 0 66%)', transform: 'translate(4px, 0px)' }}
                                >
                                    404
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 text-blue-600 opacity-70"
                                    style={{ clipPath: 'polygon(0 66%, 100% 66%, 100% 100%, 0 100%)', transform: 'translate(-3px, 2px)' }}
                                >
                                    404
                                </span>
                                <span className="relative">404</span>
                            </span>
                        </h1>
                    </div>
                    <div className="relative z-10 flex items-center justify-center gap-2 mb-4">
                        <span className="text-2xl">💔</span>
                        <p className="text-blue-400 font-mono font-bold text-sm md:text-base tracking-wide">
                            Error: Recurso_No_Encontrado
                        </p>
                    </div>
                    <p className="relative z-10 text-slate-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-8">
                        La página que solicitas no existe o se encuentra en mantenimiento. Por favor vuelve más tarde.
                    </p>
                    <Link
                        href="/"
                        className="relative z-10 inline-flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 hover:border-blue-500/50 text-blue-400 hover:text-blue-300 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 mb-6"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Volver al Inicio
                    </Link>
                    <p className="relative z-10 text-[10px] font-mono text-slate-600 tracking-widest text-right">
                        REQ_ID: 0x44F
                    </p>
                </div>
            </div>
        </div>
    )
}
