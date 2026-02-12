
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const ensureUrl = (url?: string | null) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `https://${url}`;
};
