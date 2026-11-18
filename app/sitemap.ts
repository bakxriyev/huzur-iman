import type { MetadataRoute } from "next";

const BASE = "https://www.imanakhmedovna.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/ichki-kuch`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/huzur`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/iman`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
