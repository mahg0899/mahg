import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow large file uploads (250MB for videos)
  serverActions: {
    bodySizeLimit: '250mb',
  },
};

export default withPayload(nextConfig);