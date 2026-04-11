'use client'

import React, { useCallback } from 'react'
import { useField, useListDrawer } from '@payloadcms/ui'

/**
 * BulkImagePicker: A custom UI field that provides a "Add Multiple Images" button.
 * When clicked, opens Payload's media list drawer where the user can select
 * multiple images via checkboxes. Selected images get appended to the
 * parent 'images' array field.
 */
export default function BulkImagePicker() {
    const { value: imagesValue, setValue: setImagesValue } = useField<Array<{ image: string }>>({ path: 'images' })

    const [ListDrawer, , { openDrawer }] = useListDrawer({
        collectionSlugs: ['media'],
        uploads: true,
    })

    // Single select callback — user clicks on a media doc
    const handleSelect = useCallback(({ doc }: { collectionSlug: string; doc: { id: string;[key: string]: unknown }; docID: string }) => {
        const currentImages = Array.isArray(imagesValue) ? [...imagesValue] : []
        currentImages.push({ image: doc.id })
        setImagesValue(currentImages)
    }, [imagesValue, setImagesValue])

    // Bulk select callback — user selects multiple via checkboxes
    const handleBulkSelect = useCallback((selected: Map<string | number, boolean>) => {
        const currentImages = Array.isArray(imagesValue) ? [...imagesValue] : []
        const newImages: Array<{ image: string }> = []

        selected.forEach((isSelected, id) => {
            if (isSelected) {
                newImages.push({ image: String(id) })
            }
        })

        if (newImages.length > 0) {
            setImagesValue([...currentImages, ...newImages])
        }
    }, [imagesValue, setImagesValue])

    return (
        <div style={{ marginBottom: '0.5rem' }}>
            <button
                type="button"
                onClick={openDrawer}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1rem',
                    background: 'var(--theme-elevation-100)',
                    border: '1px solid var(--theme-elevation-200)',
                    borderRadius: '6px',
                    color: 'var(--theme-text)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                </svg>
                Añadir múltiples imágenes
            </button>

            <ListDrawer
                allowCreate
                enableRowSelections
                onSelect={handleSelect}
                onBulkSelect={handleBulkSelect}
            />
        </div>
    )
}
