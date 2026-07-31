import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/dashboard/admin',
        destination: '/admin',
        permanent: true,
      },
    ];
  }
};

export default bundleAnalyzer(nextConfig);
