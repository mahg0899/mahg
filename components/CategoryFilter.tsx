'use client'

import React, { useState } from 'react'

interface Category {
    id: string | number
    title: string
}

interface CategoryFilterProps {
    categories: Category[]
    onFilter: (categoryId: string | number | null) => void
}

export default function CategoryFilter({ categories, onFilter }: CategoryFilterProps) {
    const [active, setActive] = useState<string | number | null>(null)

    const handleClick = (id: string | number | null) => {
        const newActive = active === id ? null : id
        setActive(newActive)
        onFilter(newActive)
    }

    return (
        <div className="flex flex-wrap gap-2 mb-10">
            <button
                onClick={() => handleClick(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${active === null
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-transparent text-textMain/80 border-textMain/50 hover:border-blue-500 hover:text-blue-400'
                    }`}
            >
                Todos
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => handleClick(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${active === cat.id
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        : 'bg-transparent text-textMain border-textMain/50 hover:border-blue-500 hover:text-blue-400'
                        }`}
                >
                    {cat.title}
                </button>
            ))}
        </div>
    )
}
