'use client'

import { useState } from 'react'
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('Propuesta de Proyecto')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<FormStatus>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email.trim() || !message.trim()) {
            setStatus('error')
            setErrorMessage('El email y el mensaje son requeridos.')
            return
        }

        setStatus('sending')
        setErrorMessage('')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message }),
            })

            const data = await res.json()

            if (!res.ok) {
                setStatus('error')
                setErrorMessage(data.error || 'Error al enviar el mensaje.')
                return
            }

            setStatus('success')
            setName('')
            setEmail('')
            setSubject('Propuesta de Proyecto')
            setMessage('')

            setTimeout(() => setStatus('idle'), 5000)
        } catch {
            setStatus('error')
            setErrorMessage('Error de conexión. Intenta de nuevo.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bento-card group lg:col-span-7 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-btn/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre Completo</label>
                    <input
                        type="text"
                        placeholder="Alejandro Hernández"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={status === 'sending'}
                        className="w-full bg-contrast/50 border border-main/25 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-btn focus:ring-1 focus:ring-btn transition-all text-sm font-medium disabled:opacity-50"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email <span className="text-btn">*</span></label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === 'sending'}
                        className="w-full bg-contrast/50 border border-main/25 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-btn focus:ring-1 focus:ring-btn transition-all text-sm font-medium disabled:opacity-50"
                    />
                </div>
            </div>
            <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Asunto</label>
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={status === 'sending'}
                    className="w-full bg-contrast/50 border border-main/25 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-btn focus:ring-1 focus:ring-btn transition-all text-sm font-medium appearance-none disabled:opacity-50"
                >
                    <option>Propuesta de Proyecto</option>
                    <option>Oferta Laboral</option>
                    <option>Colaboración</option>
                    <option>Soporte Técnico</option>
                    <option>Otro</option>
                </select>
            </div>

            <div className="space-y-2 mb-8">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mensaje <span className="text-btn">*</span></label>
                <textarea
                    rows={5}
                    placeholder="Hola, me gustaría proponerte un proyecto..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={status === 'sending'}
                    className="w-full bg-contrast/50 border border-main/25 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-btn focus:ring-1 focus:ring-btn transition-all text-sm font-medium resize-none disabled:opacity-50"
                />
            </div>

            {status === 'success' && (
                <div className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-sm font-semibold animate-in fade-in">
                    <CircleCheck className="size-5 shrink-0" />
                    <span>¡Mensaje enviado correctamente! Te responderé pronto.</span>
                </div>
            )}

            {status === 'error' && (
                <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm font-semibold">
                    <CircleAlert className="size-5 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-btn hover:bg-btn/80 text-white font-bold py-4 rounded-xl shadow-lg shadow-btn/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
                {status === 'sending' ? (
                    <>
                        Enviando...
                        <LoaderCircle className="size-4 animate-spin" />
                    </>
                ) : (
                    <>
                        Enviar Mensaje
                        <Send className="size-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    )
}
