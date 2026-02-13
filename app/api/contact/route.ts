import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let resend: Resend | null = null
function getResend() {
    if (!resend) {
        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY is not configured.')
        }
        resend = new Resend(process.env.RESEND_API_KEY)
    }
    return resend
}

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const entry = rateLimit.get(ip)

    if (!entry || now > entry.resetAt) {
        rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
        return false
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        return true
    }

    entry.count++
    return false
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Demasiados mensajes enviados. Intenta de nuevo más tarde.' },
                { status: 429 }
            )
        }

        const body = await request.json()
        const { name, email, subject, message } = body

        // Validation
        if (!email || !email.trim()) {
            return NextResponse.json(
                { error: 'El email es requerido.' },
                { status: 400 }
            )
        }

        if (!message || !message.trim()) {
            return NextResponse.json(
                { error: 'El mensaje es requerido.' },
                { status: 400 }
            )
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'El formato del email no es válido.' },
                { status: 400 }
            )
        }

        // Send email via Resend
        const { data, error } = await getResend().emails.send({
            from: 'Formulario Web <noreply@mahg.me>',
            to: ['contacto@mahg.me'],
            replyTo: email,
            subject: `[Web] ${subject || 'Contacto'} — ${name || 'Anónimo'}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                        Nuevo mensaje de contacto
                    </h2>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="padding: 8px 12px; font-weight: bold; color: #64748b; width: 120px;">Nombre:</td>
                            <td style="padding: 8px 12px; color: #1e293b;">${name || 'No proporcionado'}</td>
                        </tr>
                        <tr style="background: #f8fafc;">
                            <td style="padding: 8px 12px; font-weight: bold; color: #64748b;">Email:</td>
                            <td style="padding: 8px 12px; color: #1e293b;">
                                <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 12px; font-weight: bold; color: #64748b;">Asunto:</td>
                            <td style="padding: 8px 12px; color: #1e293b;">${subject || 'No especificado'}</td>
                        </tr>
                    </table>
                    <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                        <p style="margin: 0 0 8px 0; font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Mensaje:</p>
                        <p style="margin: 0; color: #1e293b; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                    </div>
                    <p style="color: #94a3b8; font-size: 12px; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                        Enviado desde el formulario de contacto de mahg.me
                    </p>
                </div>
            `,
        })

        if (error) {
            console.error('Resend error:', error)
            return NextResponse.json(
                { error: 'Error al enviar el mensaje. Intenta de nuevo más tarde.' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, id: data?.id })
    } catch (err) {
        console.error('Contact API error:', err)
        return NextResponse.json(
            { error: 'Error interno del servidor.' },
            { status: 500 }
        )
    }
}
