import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true,
 
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "**", // Replace with your hostname
        // Replace with your image path or use `/**` for all paths
      },
    ],
  },
};

export default withNextIntl(nextConfig);
