import Link from "next/link";
import { INITIAL_DATA } from "@/data/pawanData";

export const metadata = {
  title: "About Us | Pawan Traders - Battery & Solar Energy Solutions",
  description: "Learn about Pawan Traders, Director Mr. Pawan Kumar Kushwaha, Manager Mr. Kartik Kushwaha, and our 15+ years of delivering reliable power in Prayagraj & Kaushambi.",
};

export default function AboutPage() {
  const { settings, branches } = INITIAL_DATA;

  return (
    <div>
      <section style={{
        background: "linear-gradient(135deg, #091E42, #1D4ED8)",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "70px 20px"
      }}>
        <div className="container">
          <span className="section-badge solar" style={{ margin: "0 auto 16px" }}>
            <i className="fa-solid fa-building"></i> Company Profile
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "16px", color: "#FFFFFF" }}>
            About Pawan Traders
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "760px", margin: "0 auto", color: "#E2E8F0" }}>
            Your trusted multi-brand battery distributor, inverter specialist and rooftop solar turnkey EPC contractor in Puramufti (Prayagraj) and Charwa Town (Kaushambi).
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "50px",
            alignItems: "center",
            marginBottom: "60px"
          }}>
            <div>
              <span className="section-badge"><i className="fa-solid fa-clock-rotate-left"></i> 15+ Years Track Record</span>
              <h2 className="section-title">
                Committed to <span>Uninterrupted Power</span> for Every Home &amp; Vehicle
              </h2>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "20px" }}>
                Founded with the principle of zero compromise on genuine products, <strong>Pawan Traders</strong> is one of eastern Uttar Pradesh&apos;s leading energy solution providers. We hold direct authorized dealerships for premier brands including <strong>Amaron, Exide, Luminous, Microtek, Vion Lithium, and UTL Solar</strong>.
              </p>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "28px" }}>
                Led by <strong>Director Mr. Pawan Kumar Kushwaha</strong> and <strong>Manager Mr. Kartik Kushwaha</strong>, our operations span two physical branches with on-site computerized battery testing benches, warranty exchange counters, and dedicated solar technical teams.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: "16px" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>Our Mission</h4>
                  <p style={{ fontSize: "0.9rem", color: "#64748B" }}>
                    To provide 100% genuine energy storage and clean rooftop solar at fair, transparent prices with immediate local warranty support.
                  </p>
                </div>
                <div style={{ borderLeft: "4px solid var(--solar)", paddingLeft: "16px" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>Our Vision</h4>
                  <p style={{ fontSize: "0.9rem", color: "#64748B" }}>
                    To power 5,000+ homes and enterprises across Prayagraj and Kaushambi with high-efficiency solar and lithium energy.
                  </p>
                </div>
              </div>
            </div>

            {/* Leadership Profiles */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid var(--gray-200)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                boxShadow: "var(--shadow-md)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "14px" }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#EFF6FF",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem"
                  }}>
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "2px" }}>Mr. Pawan Kumar Kushwaha</h3>
                    <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>Director &amp; Founder</span>
                  </div>
                </div>
                <p style={{ fontSize: "0.92rem", color: "#64748B", lineHeight: 1.6, marginBottom: "14px" }}>
                  &ldquo;At Pawan Traders, every customer receives certified original products with manufacturer warranty registration. We stand behind every battery and solar panel we sell.&rdquo;
                </p>
                <div style={{ fontSize: "0.9rem", color: "#0F172A", fontWeight: 700 }}>
                  <i className="fa-solid fa-phone" style={{ color: "var(--primary)" }}></i> Calling: +91 {settings.callingNumber}
                </div>
              </div>

              <div style={{
                background: "#FFFFFF",
                border: "1px solid var(--gray-200)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                boxShadow: "var(--shadow-md)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "14px" }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#FEF3C7",
                    color: "var(--solar-hover)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem"
                  }}>
                    <i className="fa-solid fa-id-badge"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "2px" }}>Mr. Kartik Kushwaha</h3>
                    <span style={{ color: "var(--solar-hover)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>General Manager &amp; Operations</span>
                  </div>
                </div>
                <p style={{ fontSize: "0.92rem", color: "#64748B", lineHeight: 1.6, marginBottom: "14px" }}>
                  &ldquo;Overseeing customer enquiries, fast doorstep dispatch, and rooftop solar engineering teams across both Puramufti and Charwa branches.&rdquo;
                </p>
                <div style={{ fontSize: "0.9rem", color: "#0F172A", fontWeight: 700 }}>
                  <i className="fa-solid fa-phone" style={{ color: "var(--solar-hover)" }}></i> Manager Direct: +91 {settings.managerContact}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

