import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '404',
    description: 'Página no encontrada.',
}

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 gap-6">
            <div className="relative w-full max-w-lg bg-[#1c2127] border border-slate-700/50 rounded-2xl p-8 md:p-12 text-center overflow-hidden shadow-2xl">
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] z-20" />
                <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase text-left mb-8 relative z-10">
                    NULL_POINTER_EXCEPTION
                </p>
                <div className="relative z-10 mb-8 select-none">
                    <h1
                        className="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter text-transparent"
                        style={{ WebkitTextStroke: '2px rgba(248,250,252,0.9)' }}
                        data-text="404"
                    >
                        <span className="glitch-404" aria-hidden="true">404</span>
                    </h1>
                </div>
                <div className="relative z-10 flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl">💔</span>
                    <p className="text-blue-400 font-mono font-bold text-sm md:text-base tracking-wide">
                        Error: Resource_Not_Found
                    </p>
                </div>
                <p className="relative z-10 text-slate-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-8">
                    The requested component was not found
                    <br />
                    in the production environment.
                </p>
                <p className="relative z-10 text-[10px] font-mono text-slate-600 tracking-widest text-right">
                    STK_OVF_0x44
                </p>
            </div>
            <Link
                href="/"
                className="group w-full max-w-lg bg-[#1c2127] border border-slate-700/50 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
            >
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </div>
                <div className='text-center'>
                    <h2 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                        Go Home
                    </h2>
                    <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                        Back to safety
                    </p>
                </div>
            </Link>
        </div>
    )
}
