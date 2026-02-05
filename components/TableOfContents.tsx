'use client'

import { useEffect, useState } from 'react'

type TOCItem = {
    id: string
    text: string
    level: number
}

export default function TableOfContents({ items }: { items: TOCItem[] }) {
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-100px 0px -66% 0px' }
        )

        items.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [items])



    return (
        <nav className="sticky top-32">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                Tabla de Contenidos
            </h3>
            <div className="relative border-l border-slate-800">
                <ul className="space-y-0">
                    {items.length === 0 ? (
                        <li className="relative">
                            <span className="block py-2 pl-4 text-sm text-slate-600 border-l-2 border-transparent -ml-[1px] italic cursor-default">
                                No hay temas disponibles.
                            </span>
                        </li>
                    ) : (
                        items.map((item, i) => (
                            <li key={i} className="relative">
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        document.getElementById(item.id)?.scrollIntoView({
                                            behavior: 'smooth'
                                        })
                                        setActiveId(item.id)
                                    }}
                                    className={`
                                        block py-2 pl-4 text-sm transition-all duration-200 border-l-2 -ml-[1px]
                                        ${activeId === item.id
                                            ? 'border-blue-500 text-blue-400 font-medium'
                                            : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                                        }
                                    `}
                                    style={{
                                        paddingLeft: '1rem'
                                    }}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    )
}
