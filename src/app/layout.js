import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata = {
  metadataBase: new URL("https://pawantraders.com"),
  title: "Pawan Traders | Battery & Solar Solutions | Prayagraj & Kaushambi",
  description: "Authorized dealer of Amaron, Exide, Luminous, Microtek, Vion Lithium & Solar Panels. Main branch at Puramufti Prayagraj & Second branch at Charwa Kaushambi. Call 9935618513.",
  keywords: [
    "Battery Shop in Puramufti",
    "Battery Dealer in Prayagraj",
    "Exide Battery Dealer",
    "Amaron Battery Dealer",
    "Inverter Battery Shop",
    "Solar Panel Dealer in Kaushambi",
    "Lithium Battery Dealer",
    "Solar Solutions in Prayagraj"
  ],
  openGraph: {
    title: "Pawan Traders – Battery & Solar Solutions",
    description: "100% Genuine Car, Inverter & UPS Batteries, Vion Lithium Storage, and Rooftop Solar Solutions in Prayagraj & Kaushambi.",
    images: ["/assets/images/logo.svg"],
    type: "website",
  },
  icons: {
    icon: "/assets/images/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "name": "Pawan Traders",
    "image": "https://pawantraders.com/assets/images/logo.svg",
    "telephone": "+919935618513",
    "priceRange": "₹₹",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "GT Road, Puramufti",
        "addressLocality": "Prayagraj",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "212208",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Charwa Town Area, In Front of Petrol Pump",
        "addressLocality": "Kaushambi",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "212203",
        "addressCountry": "IN"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.476049,
      "longitude": 81.705128
    }
  };

  return (
    <html lang="en">
      <head>
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

