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
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
};

export default withPayload(nextConfig);