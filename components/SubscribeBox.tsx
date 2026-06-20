'use client'

import Link from 'next/link'

export default function SubscribeBox() {
    return (
        <div className="bg-btn rounded-2xl p-6 text-white shadow-lg shadow-btn/20 mb-8">
            <h3 className="text-xl font-bold mb-2">Mantente Actualizado</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Recibe las ultimas novedades sobre diseno y desarrollo directamente en tu bandeja de entrada.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="email"
                    placeholder="email@ejemplo.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />
                <Link
                    href="/contact"
                    className="block w-full px-4 py-2.5 rounded-lg bg-white text-btn font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm text-center"
                >
                    Suscribirse
                </Link>
            </form>
        </div>
    )
}
