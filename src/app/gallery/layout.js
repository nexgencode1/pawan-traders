export const metadata = {
  title: "Solar & Battery Installation Gallery | Pawan Traders Prayagraj | Real Customer Projects",
  description: "Browse 50+ real solar rooftop and battery installation photos by Pawan Traders in Prayagraj, Allahabad & Kaushambi. See completed PM Surya Ghar solar projects, inverter setups, and showroom photos. Authorized Amaron, Exide, Luminous dealer.",
  keywords: [
    "Solar installation photos Prayagraj",
    "Battery installation gallery Allahabad",
    "PM Surya Ghar solar projects Prayagraj",
    "Rooftop solar installation Kaushambi",
    "Pawan Traders gallery",
    "Exide battery installation photos",
    "Amaron battery dealer showroom Prayagraj",
    "Real solar project photos UP",
  ],
  openGraph: {
    title: "Solar & Battery Installation Gallery | Pawan Traders Prayagraj",
    description: "Real rooftop solar, inverter, and battery installation photos from Pawan Traders projects across Prayagraj (Puramufti) and Kaushambi (Charwa).",
    images: [{ url: "/assets/images/gallery/gallery-01.jpg", width: 1200, height: 800, alt: "Solar & Battery Installation by Pawan Traders Prayagraj" }],
    type: "website",
    locale: "en_IN",
    siteName: "Pawan Traders Battery & Solar Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Solar & Battery Installations | Pawan Traders Prayagraj",
    description: "Real solar rooftop & battery installation photos. Prayagraj, Allahabad, Kaushambi. 250+ projects completed.",
    images: ["/assets/images/gallery/gallery-01.jpg"],
  },
  alternates: { canonical: "https://www.pawantraders.in/gallery" },
};

export default function GalleryLayout({ children }) {
  return <>{children}</>;
}

