import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'

export interface SeoData {
    siteTitle: string
    siteDescription: string
    metaTitleSuffix: string
    defaultImageUrl: string | null
    faviconUrl: string | null
    twitterCard: 'summary' | 'summary_large_image'
    twitterHandle: string | null
    themeColor: string
}

export async function getSeoData(): Promise<SeoData> {
    const payload = await getPayload({ config })

    // @ts-ignore - SiteSettings type not yet in payload-types.ts
    const settings: any = await payload.findGlobal({
        slug: 'site-settings',
    })

    const defaultImage = settings?.defaultImage as Media | undefined
    const favicon = settings?.favicon as Media | undefined

    return {
        siteTitle: settings?.siteTitle || 'MAHG',
        siteDescription: settings?.siteDescription || '',
        metaTitleSuffix: settings?.metaTitleSuffix || ' | MAHG',
        defaultImageUrl: defaultImage?.url || null,
        faviconUrl: favicon?.url || null,
        twitterCard: settings?.twitterCard || 'summary_large_image',
        twitterHandle: settings?.twitterHandle || null,
        themeColor: settings?.themeColor || '#0f172a',
    }
}
