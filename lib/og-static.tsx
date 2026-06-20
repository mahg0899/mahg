import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'

async function getLogoBase64(): Promise<string> {
    try {
        const buffer = await readFile(path.join(process.cwd(), 'public', 'mahg.png'))
        return `data:image/png;base64,${buffer.toString('base64')}`
    } catch {
        return ''
    }
}

async function loadFont(filename: string): Promise<ArrayBuffer | null> {
    try {
        const buffer = await readFile(path.join(process.cwd(), 'public', filename))
        return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer
    } catch {
        return null
    }
}

// Bento card wrapper (matches site's card style)
const card = (
    children: React.ReactNode,
    style: React.CSSProperties = {}
): React.ReactNode => (
    <div
        style={{
            background: '#1c2127',
            border: '1px solid rgba(248,250,252,0.12)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            ...style,
        }}
    >
        {children}
    </div>
)

interface StaticOgOptions {
    title: string
    description: string
    label?: string
}

export async function generateStaticOg({ title, description, label }: StaticOgOptions) {
    const [logoBase64, inter700, inter800, bitcountFont] = await Promise.all([
        getLogoBase64(),
        loadFont('inter-700.ttf'),
        loadFont('inter-800.ttf'),
        loadFont('bitcount-prop-single.ttf'),
    ])

    const fonts: { name: string; data: ArrayBuffer; style: 'normal'; weight: number }[] = []
    if (inter700) fonts.push({ name: 'Inter', data: inter700, style: 'normal', weight: 700 })
    if (inter800) fonts.push({ name: 'Inter', data: inter800, style: 'normal', weight: 800 })
    if (bitcountFont) fonts.push({ name: 'BitcountPropSingle', data: bitcountFont, style: 'normal', weight: 700 })

    const techStack = ['React', 'Next.js', 'TypeScript', 'Tailwind']

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#101922',
                    fontFamily: '"Inter", sans-serif',
                    padding: '36px',
                    gap: '16px',
                }}
            >
                {/* ── LEFT COLUMN: HERO CARD ────────────────────────────────── */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        width: '720px',
                        flexShrink: 0,
                    }}
                >
                    {/* Hero card (matches site's main top-left card) */}
                    <div
                        style={{
                            background: '#1c2127',
                            border: '1px solid rgba(248,250,252,0.12)',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '40px 44px',
                            position: 'relative',
                            overflow: 'hidden',
                            flex: 1,
                        }}
                    >
                        {/* Blue corner glow — matches site's bg-btn/20 blur-[50px] */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '-40px',
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                background: 'rgba(45,139,255,0.22)',
                                filter: 'blur(50px)',
                                display: 'flex',
                            }}
                        />

                        {/* Label — "Frontend Developer" style */}
                        {label && (
                            <span
                                style={{
                                    color: '#2D8BFF',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    marginBottom: '16px',
                                    fontFamily: '"Inter", sans-serif',
                                }}
                            >
                                {label}
                            </span>
                        )}

                        {/* Title — matches site's text-3xl md:text-5xl font-black */}
                        <div
                            style={{
                                color: '#F8FAFC',
                                fontSize: title.length > 25 ? '44px' : '52px',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: '-0.03em',
                                fontFamily: '"Inter", sans-serif',
                                marginBottom: '20px',
                            }}
                        >
                            {title}
                        </div>

                        {/* Description — slate-500 style */}
                        <div
                            style={{
                                color: '#64748b',
                                fontSize: '18px',
                                fontWeight: 600,
                                lineHeight: 1.5,
                                fontFamily: '"Inter", sans-serif',
                                maxWidth: '580px',
                            }}
                        >
                            {description}
                        </div>

                        {/* "Descargar CV" style button */}
                        <div
                            style={{
                                display: 'flex',
                                marginTop: '28px',
                            }}
                        >
                            <div
                                style={{
                                    background: 'rgba(71,85,105,0.5)',
                                    borderRadius: '8px',
                                    padding: '8px 20px',
                                    color: '#F8FAFC',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#2D8BFF',
                                        display: 'flex',
                                    }}
                                />
                                mahg.me
                            </div>
                        </div>
                    </div>

                    {/* Bottom row: brand card */}
                    <div
                        style={{
                            background: '#1c2127',
                            border: '1px solid rgba(248,250,252,0.12)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '18px 24px',
                            gap: '14px',
                        }}
                    >
                        {logoBase64 && (
                            <img
                                src={logoBase64}
                                style={{ width: '36px', height: '36px', borderRadius: '8px' }}
                                alt="MAHG"
                            />
                        )}
                        <span
                            style={{
                                display: 'flex',
                                fontFamily: '"BitcountPropSingle", sans-serif',
                                fontSize: '22px',
                                fontWeight: 700,
                            }}
                        >
                            <span style={{ color: '#2D8BFF' }}>MAHG</span>
                            <span style={{ color: '#ffffff' }}>.me</span>
                        </span>
                        <div
                            style={{
                                marginLeft: 'auto',
                                color: '#334155',
                                fontSize: '12px',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                            }}
                        >
                            Frontend Developer
                        </div>
                    </div>
                </div>

                {/* ── RIGHT COLUMN: MINI BENTO GRID ─────────────────────────── */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        flex: 1,
                    }}
                >
                    {/* Tech stack card — matches site's tech stack card */}
                    <div
                        style={{
                            background: '#1c2127',
                            border: '1px solid rgba(248,250,252,0.12)',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '24px',
                            flex: 1,
                        }}
                    >
                        <span
                            style={{
                                color: '#475569',
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                marginBottom: '16px',
                                fontFamily: '"Inter", sans-serif',
                            }}
                        >
                            Tech Stack
                        </span>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px',
                            }}
                        >
                            {techStack.map((tech) => (
                                <div
                                    key={tech}
                                    style={{
                                        background: 'rgba(71,85,105,0.5)',
                                        borderRadius: '10px',
                                        padding: '8px 14px',
                                        color: '#94a3b8',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        display: 'flex',
                                    }}
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats card — matches site's 3+ años / 20+ proyectos */}
                    <div
                        style={{
                            background: '#1c2127',
                            border: '1px solid rgba(248,250,252,0.12)',
                            borderRadius: '12px',
                            display: 'flex',
                            padding: '24px',
                            gap: '0',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                flex: 1,
                                borderRight: '1px solid #3b4754',
                                paddingRight: '20px',
                            }}
                        >
                            <span style={{ color: '#2D8BFF', fontSize: '28px', fontWeight: 800, lineHeight: 1, fontFamily: '"Inter", sans-serif' }}>
                                3+
                            </span>
                            <span style={{ color: '#475569', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px', fontFamily: '"Inter", sans-serif' }}>
                                Años
                            </span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                flex: 1,
                                paddingLeft: '20px',
                            }}
                        >
                            <span style={{ color: '#2D8BFF', fontSize: '28px', fontWeight: 800, lineHeight: 1, fontFamily: '"Inter", sans-serif' }}>
                                20+
                            </span>
                            <span style={{ color: '#475569', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px', fontFamily: '"Inter", sans-serif' }}>
                                Proyectos
                            </span>
                        </div>
                    </div>

                    {/* Services card */}
                    <div
                        style={{
                            background: '#1c2127',
                            border: '1px solid rgba(45,139,255,0.2)',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '24px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '-30px',
                                right: '-30px',
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'rgba(45,139,255,0.12)',
                                filter: 'blur(30px)',
                                display: 'flex',
                            }}
                        />
                        <span style={{ color: '#475569', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: '"Inter", sans-serif' }}>
                            Servicios
                        </span>
                        {['Front-end Dev', 'UI/UX Design', 'API Integration'].map((s) => (
                            <div
                                key={s}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '6px',
                                }}
                            >
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2D8BFF', display: 'flex' }} />
                                <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, fontFamily: '"Inter", sans-serif' }}>{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts,
        }
    )
}
