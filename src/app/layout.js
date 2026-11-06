import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { getSiteUrl, getCanonicalUrl } from "@/lib/siteConfig";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1D4ED8" },
    { media: "(prefers-color-scheme: dark)", color: "#1D4ED8" },
  ],
};

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pawan Traders | Best Battery Shop & Solar Inverter Dealer in Prayagraj (Allahabad)",
  description:
    "Pawan Traders is Prayagraj & Allahabad's authorized distributor for Amaron, Exide, Luminous, Microtek batteries, Vion Lithium & PM Surya Ghar Rooftop Solar. Free delivery & fitting in Puramufti, Prayagraj & Charwa, Kaushambi. Call 9935618513.",
  keywords: [
    "Battery Shop in Prayagraj",
    "Battery Dealer in Allahabad",
    "Best Battery Shop in Puramufti Prayagraj",
    "Exide Battery Dealer Allahabad Prayagraj",
    "Amaron Battery Dealer Prayagraj",
    "Inverter Battery Shop in Allahabad",
    "Solar Panel Dealer in Prayagraj",
    "Solar Rooftop PM Surya Ghar Allahabad",
    "Lithium Battery Dealer Prayagraj",
    "Car Battery Shop Prayagraj",
    "Tubular Inverter Battery Kaushambi",
    "Pawan Traders Puramufti",
    "Solar EPC Contractor Prayagraj Allahabad",
    "Battery Health Checkup Prayagraj",
    "Charwa Battery Dealer Kaushambi",
    "Luminous Inverter Dealer Prayagraj",
    "Microtek Solar Inverter Allahabad",
    "Vion Lithium Battery Distributor UP",
  ],
  openGraph: {
    title: "Pawan Traders | Official Battery & Rooftop Solar Superstore - Prayagraj / Allahabad",
    description:
      "Buy 100% genuine Amaron, Exide, Luminous batteries and PM Surya Ghar rooftop solar systems with direct bank subsidies, free testing, and same-day installation across Prayagraj & Kaushambi.",
    images: [
      {
        url: "/assets/images/categories/solar.svg",
        width: 1200,
        height: 630,
        alt: "Pawan Traders Rooftop Solar & Battery Installation Prayagraj Allahabad",
      },
    ],
    type: "website",
    locale: "en_IN",
    siteName: "Pawan Traders Battery & Solar Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Traders | Battery & Solar Energy Solutions Prayagraj",
    description:
      "Authorized Amaron, Exide, Luminous & Rooftop Solar contractor in Puramufti Prayagraj & Charwa Kaushambi.",
    images: ["/assets/images/categories/solar.svg"],
  },
  alternates: { canonical: getCanonicalUrl("/") },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/assets/images/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: { google: "" },
};

export default function RootLayout({ children }) {
  const currentBase = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "name": "Pawan Traders - Battery & Solar Energy Solutions",
    "image": `${currentBase}/assets/images/logo.png`,
    "telephone": "+919935618513",
    "priceRange": "₹₹",
    "areaServed": ["Prayagraj", "Allahabad", "Puramufti", "Kaushambi", "Charwa"],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "GT Road, Puramufti",
        "addressLocality": "Prayagraj",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "212208",
        "addressCountry": "IN",
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Charwa Town Area, In Front of Petrol Pump",
        "addressLocality": "Kaushambi",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "212203",
        "addressCountry": "IN",
      },
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.476049,
      "longitude": 81.705128,
    },
  };

  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
