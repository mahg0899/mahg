
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const ensureUrl = (url?: string | null) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `https://${url}`;
};

/**
 * Keeps external media (including R2) on its public origin and converts only
 * same-origin Payload media URLs to relative paths for Next.js Image.
 *
 * In Docker, the container often can't reach its own public hostname
 * (e.g. https://mahg.me/api/media/file/x.png) for the image optimization
 * step. Stripping the origin returns /api/media/file/x.png, which
 * Next.js resolves locally and serves without any network round-trip.
 */
export function getMediaSrc(url: string | null | undefined): string {
    if (!url) return ''
    try {
        const parsed = new URL(url)
        // Only strip the origin if it matches our own server URL
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
        if (serverUrl) {
            const serverOrigin = new URL(serverUrl).origin
            if (parsed.origin === serverOrigin) {
                return parsed.pathname + parsed.search
            }
        }
        return url
    } catch {
        // Already a relative path or malformed — return as-is
        return url
    }
}

/**
 * Remote Payload media is already served by its public CDN. Bypassing Next's
 * optimizer for those URLs keeps healthy R2 objects accessible even if the
 * optimizer's build-time allow-list is stale or unavailable.
 */
export function shouldBypassMediaOptimization(url: string | null | undefined): boolean {
    if (!url) return false

    try {
        const mediaOrigin = new URL(url).origin
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''

        return !serverUrl || mediaOrigin !== new URL(serverUrl).origin
    } catch {
        return false
    }
}
