import { getCanonicalUrl } from "@/lib/siteConfig";

export const metadata = {
  title: "Battery, Inverter & Solar Products Catalogue | Pawan Traders Prayagraj | Best Price",
  description: "Shop Pawan Traders complete product catalogue: Amaron & Exide car batteries, Luminous & Microtek tubular inverter batteries, Vion lithium batteries, rooftop solar panels & systems. Best price with old battery exchange. Prayagraj, Allahabad, Kaushambi. Call 9935618513.",
  keywords: [
    "Buy battery online Prayagraj",
    "Exide battery price Allahabad",
    "Amaron battery price Prayagraj",
    "Luminous tubular battery price Kaushambi",
    "Vion lithium battery price UP",
    "Inverter battery shop Puramufti",
    "Car battery shop Prayagraj",
    "Solar panel price Prayagraj",
    "Best battery price Allahabad",
    "Battery exchange offer Prayagraj",
    "Wholesale battery dealer Prayagraj",
  ],
  openGraph: {
    title: "Battery, Inverter & Solar Products | Best Price | Pawan Traders Prayagraj",
    description: "Full product catalogue: car batteries, tubular inverter batteries, lithium batteries, solar systems. Old battery exchange accepted. Prayagraj & Kaushambi. Call 9935618513.",
    images: [{ url: "/assets/images/categories/automotive.svg", width: 1200, height: 630, alt: "Battery Products Catalogue - Pawan Traders Prayagraj" }],
    type: "website",
    locale: "en_IN",
    siteName: "Pawan Traders Battery & Solar Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products Catalogue | Pawan Traders Battery Shop Prayagraj",
    description: "Amaron, Exide, Luminous, Microtek, Vion Lithium batteries & solar at best prices. Old battery exchange. 9935618513.",
    images: ["/assets/images/categories/automotive.svg"],
  },
  alternates: { canonical: getCanonicalUrl("/products") },
};

export default function ProductsLayout({ children }) {
  return <>{children}</>;
}

