import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/media/file/')) {
        const response = NextResponse.next()
        response.headers.set('Accept-Ranges', 'bytes')
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
        response.headers.set('Access-Control-Allow-Origin', '*')
        response.headers.set('X-Content-Type-Options', 'nosniff')
        response.headers.set('Vary', 'Accept')
        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/api/media/file/:path*',
}
