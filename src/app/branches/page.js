import { INITIAL_DATA } from "@/data/pawanData";
import BranchMap from "@/components/BranchMap";

export const metadata = {
  title: "Our Branches | Pawan Traders Puramufti Prayagraj & Charwa Kaushambi | Battery Shop Near Me",
  description: "Find Pawan Traders nearest battery shop: Main Branch at GT Road Puramufti, Prayagraj (212208) — 8AM-9PM, Call 9935618513. Second Branch at Charwa Town In Front of Petrol Pump, Kaushambi (212203) — 8:30AM-8:30PM, Call 9305839018. Free battery testing & same-day service.",
  keywords: [
    "Battery shop Puramufti Prayagraj",
    "Battery dealer Charwa Kaushambi",
    "Pawan Traders Puramufti address",
    "Battery shop near me Prayagraj",
    "Battery dealer near me Kaushambi",
    "GT Road Puramufti battery shop",
    "Charwa petrol pump battery dealer",
    "Inverter shop Prayagraj 212208",
    "Battery shop open Sunday Allahabad",
  ],
  openGraph: {
    title: "Pawan Traders Branches | Puramufti Prayagraj & Charwa Kaushambi",
    description: "Visit our 2 battery & solar showrooms. Main: GT Road Puramufti, Prayagraj — open 8AM to 9PM all 7 days. Branch 2: Charwa Town, Kaushambi — open 8:30AM to 8:30PM.",
    images: [{ url: "/assets/images/gallery/gallery-01.jpg", width: 1200, height: 630, alt: "Pawan Traders Puramufti Prayagraj Showroom" }],
    type: "website",
    locale: "en_IN",
    siteName: "Pawan Traders Battery & Solar Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Traders | Battery Shop Puramufti Prayagraj & Charwa Kaushambi",
    description: "2 showrooms. GT Road Puramufti Prayagraj (9935618513) & Charwa Town Kaushambi (9305839018). Open all 7 days.",
    images: ["/assets/images/gallery/gallery-01.jpg"],
  },
  alternates: { canonical: "https://www.pawantraders.in/branches" },
};

export default function BranchesPage() {
  const { branches } = INITIAL_DATA;

  return (
    <div>
      <section style={{
        background: "linear-gradient(135deg, #091E42 0%, #1D4ED8 100%)",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "70px 20px 60px"
      }}>
        <div className="container">
          <span className="section-badge solar" style={{ margin: "0 auto 14px" }}>
            <i className="fa-solid fa-store"></i> Direct Counters
          </span>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 800, marginBottom: "12px", color: "#FFFFFF" }}>
            Our Two Branch Locations
          </h1>
          <p style={{ fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto", color: "#E2E8F0" }}>
            Convenient physical stores in Puramufti (Prayagraj) and Charwa Town (Kaushambi). Visit for prompt in-store testing, exchange, and pickup.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            {branches.map((b) => (
              <div key={b.id} style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--gray-200)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ background: "linear-gradient(135deg, #0F2D6B, #1D4ED8)", color: "#FFFFFF", padding: "24px" }}>
                  <span style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#FDE047",
                    marginBottom: "8px"
                  }}>
                    {b.isMain ? "★ MAIN HEAD BRANCH" : "★ AUTHORIZED BRANCH"}
                  </span>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#FFFFFF" }}>{b.name}</h3>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", color: "#64748B", textTransform: "uppercase" }}>Address</strong>
                    <div style={{ fontSize: "0.95rem", color: "var(--gray-800)" }}>{b.address}</div>
                    <small style={{ color: "#64748B" }}>Landmark: {b.landmark}</small>
                  </div>

                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", color: "#64748B", textTransform: "uppercase" }}>Direct Calling</strong>
                    <a href={`tel:+91${b.phone}`} style={{ color: "var(--primary)", fontWeight: 700, fontSize: "1.1rem" }}>
                      +91 {b.phone}
                    </a>
                  </div>

                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", color: "#64748B", textTransform: "uppercase" }}>Working Hours</strong>
                    <div style={{ fontSize: "0.9rem", color: "var(--gray-700)" }}>{b.hours}</div>
                  </div>

                  <BranchMap branch={b} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
                    <a href={`tel:+91${b.phone}`} className="btn btn-call btn-sm">
                      <i className="fa-solid fa-phone"></i> Call Branch
                    </a>
                    <a href={b.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      <i className="fa-solid fa-diamond-turn-right"></i> Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "name": "Pawan Traders - Main Branch (Puramufti Prayagraj)",
              "url": "https://www.pawantraders.in/branches",
              "telephone": "+919935618513",
              "image": "https://www.pawantraders.in/assets/images/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "GT Road, Puramufti",
                "addressLocality": "Prayagraj",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "212208",
                "addressCountry": "IN"
              },
              "geo": { "@type": "GeoCoordinates", "latitude": 25.476049, "longitude": 81.705128 },
              "openingHours": "Mo-Su 08:00-21:00",
              "priceRange": "₹₹"
            },
            {
              "@type": "LocalBusiness",
              "name": "Pawan Traders - Second Branch (Charwa Kaushambi)",
              "url": "https://www.pawantraders.in/branches",
              "telephone": "+919305839018",
              "image": "https://www.pawantraders.in/assets/images/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Charwa Town Area, In Front of Petrol Pump",
                "addressLocality": "Kaushambi",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "212203",
                "addressCountry": "IN"
              },
              "geo": { "@type": "GeoCoordinates", "latitude": 25.431289, "longitude": 81.569421 },
              "openingHours": "Mo-Su 08:30-20:30",
              "priceRange": "₹₹"
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pawantraders.in/" },
                { "@type": "ListItem", "position": 2, "name": "Our Branches", "item": "https://www.pawantraders.in/branches" }
              ]
            }
          ]
        }) }}
      />
    </div>
  );
}

