import type { NextConfig } from "next";

const ONE_WEEK = "public, max-age=604800, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimallashtirilgan rasmlar CDN'da uzoq saqlanadi (qayta tekshirish yo'q)
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      {
        // public/ dagi statik rasmlar: avval max-age=0 edi (har safar qayta tekshirilardi)
        source: "/:path*.(webp|png|jpg|jpeg|avif|svg|ico|woff2)",
        headers: [{ key: "Cache-Control", value: ONE_WEEK }],
      },
    ];
  },
};

export default nextConfig;
