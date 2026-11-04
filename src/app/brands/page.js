import Link from "next/link";
import { INITIAL_DATA } from "@/data/pawanData";

export const metadata = {
  title: "Authorized Battery & Solar Brands | Amaron Exide Luminous Microtek Vion | Pawan Traders Prayagraj",
  description: "Shop 14 authorized battery and solar brands at Pawan Traders Prayagraj: Amaron, Exide, Luminous, Microtek, Vion Lithium, Tata Green, SF Sonic, Livfast, Smarten, UTL Solar, Extron, Amaze, Tuga Power, Konta. Genuine products with manufacturer warranty. Call 9935618513.",
  keywords: [
    "Amaron battery dealer Prayagraj Allahabad",
    "Exide battery dealer Prayagraj",
    "Luminous inverter dealer Prayagraj",
    "Microtek solar inverter Kaushambi",
    "Vion lithium battery dealer UP",
    "Authorized battery brands Puramufti",
    "Tata Green battery dealer Prayagraj",
    "UTL Solar dealer Prayagraj",
    "SF Sonic battery Allahabad",
    "14 battery brands Prayagraj",
  ],
  openGraph: {
    title: "14 Authorized Battery & Solar Brands | Pawan Traders Prayagraj",
    description: "Browse Amaron, Exide, Luminous, Microtek, Vion Lithium, UTL Solar and 8 more brands — all genuine with manufacturer warranty — at Pawan Traders Puramufti, Prayagraj.",
    images: [{ url: "/assets/images/brands/amaron.svg", width: 400, height: 300, alt: "Amaron Authorized Dealer Prayagraj - Pawan Traders" }],
    type: "website",
    locale: "en_IN",
    siteName: "Pawan Traders Battery & Solar Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "14 Authorized Battery Brands at Pawan Traders Prayagraj",
    description: "Amaron, Exide, Luminous, Microtek, Vion, UTL Solar & more. Genuine products. Puramufti Prayagraj & Charwa Kaushambi.",
    images: ["/assets/images/brands/amaron.svg"],
  },
  alternates: { canonical: "https://www.pawantraders.in/brands" },
};

export default function BrandsDirectoryPage() {
  const { brands, products } = INITIAL_DATA;

  return (
    <div>
      <section style={{
        background: "linear-gradient(135deg, #091E42, #1E293B)",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "60px 20px"
      }}>
        <div className="container">
          <span className="section-badge solar" style={{ margin: "0 auto 14px" }}>
            <i className="fa-solid fa-handshake"></i> Complete Brand Directory
          </span>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 800, marginBottom: "12px", color: "#FFFFFF" }}>
            Authorized Battery &amp; Solar Brands
          </h1>
          <p style={{ fontSize: "1.05rem", maxWidth: "700px", margin: "0 auto", color: "#CBD5E1" }}>
            We carry India&apos;s foremost energy brands across all automotive, lithium, tubular inverter, and solar energy lines.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            {brands.map((b) => {
              const brandProds = products.filter((p) => p.brandId === b.id);
              return (
                <div
                  key={b.id}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid var(--gray-200)",
                    borderRadius: "var(--radius-lg)",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <div style={{ height: "50px", display: "flex", alignItems: "center", marginBottom: "16px" }}>
                    <img src={b.logo} alt={b.name} style={{ maxHeight: "42px", width: "auto" }} />
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "4px" }}>{b.name}</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--solar-hover)", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>
                    {b.tagline}
                  </span>
                  <p style={{ fontSize: "0.88rem", color: "#64748B", marginBottom: "18px", flexGrow: 1 }}>
                    {b.description}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--gray-100)" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)" }}>
                      {brandProds.length} Products
                    </span>
                    <Link href={`/brands/${b.slug}`} className="btn btn-outline btn-sm">
                      View Products &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Authorized Brands at Pawan Traders Prayagraj",
          "url": "https://www.pawantraders.in/brands",
          "description": "14 authorized battery and solar brands available at Pawan Traders, Prayagraj and Kaushambi.",
          "numberOfItems": 14,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "AMARON", "url": "https://www.pawantraders.in/brands/amaron" },
            { "@type": "ListItem", "position": 2, "name": "EXIDE", "url": "https://www.pawantraders.in/brands/exide" },
            { "@type": "ListItem", "position": 3, "name": "LUMINOUS", "url": "https://www.pawantraders.in/brands/luminous" },
            { "@type": "ListItem", "position": 4, "name": "MICROTEK", "url": "https://www.pawantraders.in/brands/microtek" },
            { "@type": "ListItem", "position": 5, "name": "VION", "url": "https://www.pawantraders.in/brands/vion" },
            { "@type": "ListItem", "position": 6, "name": "TATA GREEN", "url": "https://www.pawantraders.in/brands/tata-green" },
            { "@type": "ListItem", "position": 7, "name": "UTL SOLAR", "url": "https://www.pawantraders.in/brands/utl-solar" }
          ],
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pawantraders.in/" },
              { "@type": "ListItem", "position": 2, "name": "Brands", "item": "https://www.pawantraders.in/brands" }
            ]
          }
        }) }}
      />
    </div>
  );
}

