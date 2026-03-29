'use client'

import React, { useState, useRef, useCallback } from 'react'
import { PostCard } from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'

interface Category {
    id: string | number
    title: string
}

interface BlogPostsGridProps {
    posts: any[]
    categories: Category[]
}

export default function BlogPostsGrid({ posts, categories }: BlogPostsGridProps) {
    const [displayCategoryId, setDisplayCategoryId] = useState<string | number | null>(null)
    const [fadingOutIds, setFadingOutIds] = useState<Set<string>>(new Set())
    const [fadingInIds, setFadingInIds] = useState<Set<string>>(new Set())
    const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())
    const animatingRef = useRef(false)

    const isMatch = useCallback((post: any, catId: string | number | null) => {
        if (!catId) return true
        if (!post.categories) return false
        return post.categories.some((cat: any) => {
            const id = typeof cat === 'object' ? cat.id : cat
            return id === catId
        })
    }, [])

    const handleFilter = useCallback((newCatId: string | number | null) => {
        if (animatingRef.current) return
        if (newCatId === displayCategoryId) return
        animatingRef.current = true

        const oldCatId = displayCategoryId
        const oldMatchIds = new Set(posts.filter(p => isMatch(p, oldCatId)).map(p => p.id))
        const newMatchIds = new Set(posts.filter(p => isMatch(p, newCatId)).map(p => p.id))

        // Posts leaving (in old, not in new)
        const leavingIds = new Set<string>()
        oldMatchIds.forEach(id => { if (!newMatchIds.has(id)) leavingIds.add(id) })

        // Posts entering (in new, not in old)
        const enteringIds = new Set<string>()
        newMatchIds.forEach(id => { if (!oldMatchIds.has(id)) enteringIds.add(id) })

        // Posts staying (in both) — these will FLIP
        const stayingIds = new Set<string>()
        newMatchIds.forEach(id => { if (oldMatchIds.has(id)) stayingIds.add(id) })

        // 1. Snapshot positions of staying posts
        const oldPositions = new Map<string, DOMRect>()
        stayingIds.forEach(id => {
            const el = cardRefs.current.get(id)
            if (el) oldPositions.set(id, el.getBoundingClientRect())
        })

        // 2. Fade out leaving posts
        setFadingOutIds(leavingIds)

        // 3. After fade-out completes, swap to new set
        setTimeout(() => {
            // Show new filtered set (entering posts start invisible)
            setFadingInIds(enteringIds)
            setFadingOutIds(new Set())
            setDisplayCategoryId(newCatId)

            // 4. FLIP staying posts + fade in entering posts
            requestAnimationFrame(() => {
                // FLIP: animate staying posts from old to new position
                stayingIds.forEach(id => {
                    const el = cardRefs.current.get(id)
                    if (!el) return
                    const oldRect = oldPositions.get(id)
                    if (!oldRect) return
                    const newRect = el.getBoundingClientRect()
                    const dx = oldRect.left - newRect.left
                    const dy = oldRect.top - newRect.top
                    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return

                    el.style.transition = 'none'
                    el.style.transform = `translate(${dx}px, ${dy}px)`

                    requestAnimationFrame(() => {
                        el.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)'
                        el.style.transform = 'translate(0, 0)'
                    })
                })

                // Fade in entering posts with slight delay
                setTimeout(() => {
                    setFadingInIds(new Set())
                }, 50)

                // Cleanup
                setTimeout(() => {
                    posts.forEach(post => {
                        const el = cardRefs.current.get(post.id)
                        if (el) {
                            el.style.transition = ''
                            el.style.transform = ''
                        }
                    })
                    animatingRef.current = false
                }, 500)
            })
        }, 280)
    }, [displayCategoryId, posts, isMatch])

    const displayPosts = posts.filter(p => isMatch(p, displayCategoryId))

    return (
        <>
            {categories.length > 0 && (
                <CategoryFilter
                    categories={categories}
                    onFilter={handleFilter}
                />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPosts.map((post) => {
                    const isFadingOut = fadingOutIds.has(post.id)
                    const isFadingIn = fadingInIds.has(post.id)
                    return (
                        <div
                            key={post.id}
                            ref={(el) => {
                                if (el) cardRefs.current.set(post.id, el)
                                else cardRefs.current.delete(post.id)
                            }}
                            style={{
                                opacity: isFadingOut ? 0 : isFadingIn ? 0 : 1,
                                transform: isFadingOut ? 'scale(0.9)' : isFadingIn ? 'scale(0.95) translateY(12px)' : undefined,
                                transition: isFadingOut
                                    ? 'opacity 0.25s ease, transform 0.25s ease'
                                    : isFadingIn
                                        ? 'none'
                                        : 'opacity 0.3s ease, transform 0.3s ease',
                            }}
                        >
                            <PostCard post={post} />
                        </div>
                    )
                })}
            </div>
            {displayPosts.length === 0 && fadingOutIds.size === 0 && (
                <div className="text-center py-16">
                    <p className="text-slate-400 text-lg">
                        No hay posts en esta categoría.
                    </p>
                </div>
            )}
        </>
    )
}
