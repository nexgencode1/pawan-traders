import { INITIAL_DATA } from "@/data/pawanData";
import SolarCalculator from "@/components/SolarCalculator";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Solar Panel & Rooftop EPC Prayagraj | PM Surya Ghar Yojana | ₹78,000 Subsidy | Pawan Traders",
  description: "PM Surya Ghar Yojana authorized solar dealer in Prayagraj & Kaushambi. Install 1kW–10kW On-Grid, Off-Grid & Hybrid rooftop solar systems. Get up to ₹78,000 direct bank subsidy. Luminous, Microtek, UTL Solar, Smarten & Vion Lithium storage. Free site survey. Call 9935618513.",
  keywords: [
    "PM Surya Ghar Yojana Prayagraj",
    "Solar panel dealer Prayagraj Allahabad",
    "Rooftop solar installation Kaushambi",
    "Solar subsidy Allahabad 2024 2025",
    "1kW 2kW 3kW solar plant Prayagraj",
    "On-grid solar system Prayagraj",
    "Off-grid solar Kaushambi village",
    "Solar EPC contractor Puramufti",
    "Luminous solar dealer Prayagraj",
    "UTL Solar dealer Allahabad",
    "Free solar site survey Prayagraj",
    "PM Surya Ghar subsidy 78000",
    "Vion lithium solar battery Prayagraj",
    "Hybrid solar system Prayagraj",
  ],
  openGraph: {
    title: "Solar Rooftop & PM Surya Ghar Yojana | Pawan Traders Prayagraj | ₹78,000 Subsidy",
    description: "Prayagraj's most trusted PM Surya Ghar solar dealer. Install 1kW-10kW rooftop solar with ₹78K subsidy. Luminous, UTL, Microtek. Free site survey. Call 9935618513.",
    images: [{ url: "/assets/images/categories/solar.svg", width: 1200, height: 630, alt: "Solar Rooftop Installation Prayagraj - PM Surya Ghar Yojana" }],
    type: "website",
    locale: "en_IN",
    siteName: "Pawan Traders Battery & Solar Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Surya Ghar Solar | ₹78,000 Subsidy | Pawan Traders Prayagraj",
    description: "On-Grid, Off-Grid & Hybrid solar in Prayagraj & Kaushambi. Up to ₹78,000 subsidy. Luminous, UTL Solar, Microtek. Free site survey.",
    images: ["/assets/images/categories/solar.svg"],
  },
  alternates: { canonical: "https://www.pawantraders.in/solar" },
};

export default function SolarPage() {
  const solarProducts = INITIAL_DATA.products.filter((p) => p.categoryId === "cat-solar");

  return (
    <div>
      <section style={{
        background: "linear-gradient(135deg, #0F172A, #0284C7)",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "70px 20px"
      }}>
        <div className="container">
          <span className="section-badge solar" style={{ margin: "0 auto 14px" }}>
            <i className="fa-solid fa-sun"></i> PM Surya Ghar Yojana
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "16px", color: "#FFFFFF" }}>
            Solar Energy &amp; Rooftop EPC Solutions
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "740px", margin: "0 auto", color: "#E0F2FE" }}>
            Residential &amp; Commercial Turnkey Solar Plants in Prayagraj &amp; Kaushambi. Authorized dealer of Luminous, Microtek, Smarten, UTL Solar &amp; Vion Lithium Storage.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {/* 3 System Types */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "60px"
          }}>
            <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-lg)", padding: "32px", border: "1px solid var(--gray-200)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "#EFF6FF", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "18px" }}>
                <i className="fa-solid fa-network-wired"></i>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" }}>1. On-Grid Solar Systems</h3>
              <p style={{ color: "#64748B", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "16px" }}>
                Connected directly to the electricity grid with Bi-directional Net Meter. Excess power produced in daytime is exported back to DISCOM, reducing electricity bills by up to 90%.
              </p>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#059669", background: "#ECFDF5", padding: "4px 10px", borderRadius: "999px" }}>
                Eligible for PM Surya Ghar Subsidy (₹30K - ₹78K)
              </span>
            </div>

            <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-lg)", padding: "32px", border: "1px solid var(--gray-200)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "#FEF3C7", color: "var(--solar-hover)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "18px" }}>
                <i className="fa-solid fa-battery-full"></i>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" }}>2. Off-Grid Solar Systems</h3>
              <p style={{ color: "#64748B", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "16px" }}>
                Complete energy independence with deep-cycle tubular or Vion lithium batteries. Stores daytime solar power to run heavy loads and air conditioners through night outages.
              </p>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#B45309", background: "#FEF3C7", padding: "4px 10px", borderRadius: "999px" }}>
                Ideal for Rural &amp; Frequent Outage Areas
              </span>
            </div>

            <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-lg)", padding: "32px", border: "1px solid var(--gray-200)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "#EDE9FE", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "18px" }}>
                <i className="fa-solid fa-microchip"></i>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" }}>3. Hybrid Solar Systems</h3>
              <p style={{ color: "#64748B", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "16px" }}>
                The ultimate solution combining grid export benefits with emergency battery backup. Never worry about blackouts while enjoying massive bill reductions.
              </p>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#6D28D9", background: "#EDE9FE", padding: "4px 10px", borderRadius: "999px" }}>
                Best for Hospitals, Schools &amp; Modern Villas
              </span>
            </div>
          </div>

          {/* Interactive Calculator Section */}
          <div style={{
            background: "linear-gradient(135deg, #0F172A, #1E293B)",
            borderRadius: "var(--radius-xl)",
            padding: "48px",
            color: "#FFFFFF",
            marginBottom: "60px"
          }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <SolarCalculator />
            </div>
          </div>

          {/* Solar Products Grid */}
          <h2 className="section-title" style={{ marginBottom: "24px" }}>
            Recommended <span>Solar Equipment &amp; Packages</span>
          </h2>
          <div className="products-grid">
            {solarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Rooftop Solar EPC & PM Surya Ghar Installation",
          "url": "https://www.pawantraders.in/solar",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Pawan Traders",
            "telephone": "+919935618513",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "GT Road, Puramufti",
              "addressLocality": "Prayagraj",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "212208",
              "addressCountry": "IN"
            }
          },
          "areaServed": ["Prayagraj", "Allahabad", "Kaushambi", "Puramufti", "Charwa"],
          "description": "Complete turnkey rooftop solar EPC including On-Grid, Off-Grid and Hybrid systems with PM Surya Ghar Yojana subsidy assistance up to ₹78,000.",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "description": "1kW to 10kW rooftop solar systems with up to ₹78,000 PM Surya Ghar subsidy"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pawantraders.in/" },
              { "@type": "ListItem", "position": 2, "name": "Solar Solutions", "item": "https://www.pawantraders.in/solar" }
            ]
          }
        }) }}
      />
    </div>
  );
}

