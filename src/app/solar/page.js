import { INITIAL_DATA } from "@/data/pawanData";
import SolarCalculator from "@/components/SolarCalculator";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Solar Solutions & Rooftop EPC | Pawan Traders",
  description: "PM Surya Ghar Yojana authorized solar dealer in Prayagraj & Kaushambi. On-grid, off-grid & hybrid solar plants with up to ₹78,000 subsidy.",
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
    </div>
  );
}

