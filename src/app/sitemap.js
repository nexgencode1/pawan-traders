import { INITIAL_DATA } from "@/data/pawanData";
import { getSiteUrl } from "@/lib/siteConfig";

export default function sitemap() {
  const BASE_URL = getSiteUrl();
  const now = new Date().toISOString();

  // Static pages
  const staticRoutes = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/solar`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/branches`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Dynamic product pages
  const productRoutes = INITIAL_DATA.products
    .filter((p) => p.published !== false)
    .map((p) => ({
      url: `${BASE_URL}/products/${p.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // Dynamic brand pages
  const brandRoutes = INITIAL_DATA.brands
    .filter((b) => b.active !== false)
    .map((b) => ({
      url: `${BASE_URL}/brands/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...productRoutes, ...brandRoutes];
}

