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
        // Cache images with immutable
        source: "/images/:path*(jpe?g|png|gif|webp|avif|ico|svg|jpeg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache videos without immutable to support HTTP Range requests on Vercel/Safari
        source: "/images/:path*(mp4)",
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
