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
        // Standard robust caching for static image assets under /images (excludes mp4 to allow edge range requests)
        source: "/images/:path*\\.(jpg|jpeg|png|webp|avif|gif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
