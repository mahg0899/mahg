
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
 * Converts a Payload media URL to a relative path so Next.js Image
 * can optimize it without making an external HTTP request to itself.
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
