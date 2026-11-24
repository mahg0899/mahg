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
                    ? 'bg-btn/20 text-btn border-btn/30'
                    : 'bg-transparent text-textMain/80 border-textMain/50 hover:border-btn hover:text-btn'
                    }`}
            >
                Todos
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => handleClick(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${active === cat.id
                        ? 'bg-btn/20 text-btn border-btn/30'
                        : 'bg-transparent text-textMain border-textMain/50 hover:border-btn hover:text-btn'
                        }`}
                >
                    {cat.title}
                </button>
            ))}
        </div>
    )
}
