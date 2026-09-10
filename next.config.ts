import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Allow large file uploads for videos
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  images: {
    remotePatterns: [
      { hostname: 'localhost' },
      { hostname: 'mahg.me' },
      { protocol: 'https', hostname: 'cdn.mahg.me', pathname: '/mahg/media/**' },
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
  async redirects() {
    if (process.env.NODE_ENV !== 'production' || process.env.R2_MEDIA_REDIRECT_ENABLED !== 'true') return [];

    return [
      {
        source: '/api/media/file/:path*',
        destination: 'https://cdn.mahg.me/mahg/media/:path*',
        statusCode: 301,
      },
    ];
  },
};

export default withPayload(nextConfig);
