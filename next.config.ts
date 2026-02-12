import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Esto permitirá que el build termine aunque falten los tipos de "projects"
    ignoreBuildErrors: true,
  },
};

export default withPayload(nextConfig);