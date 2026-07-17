import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Compress responses
  compress: true,
  // Optimize production builds
  reactStrictMode: true,
  // Power performance headers
  async headers() {
    return [
      {
        // Standard robust wildcard caching for static assets under /images
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
