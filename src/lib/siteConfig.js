/**
 * Site Configuration & Dynamic Domain Resolver
 * Resolves site domain dynamically from .env (NEXT_PUBLIC_SITE_URL / SITE_URL)
 * Eliminates hardcoded domain dependencies for Canonical SEO, Sitemap, and Schema.
 */

export const getSiteUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://pawan-traders-next.onrender.com";

  return envUrl.replace(/\/+$/, "");
};

export const getCanonicalUrl = (path = "") => {
  const base = getSiteUrl();
  if (!path || path === "/") return `${base}/`;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

