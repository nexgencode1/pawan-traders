import Link from "next/link";
import { INITIAL_DATA } from "@/data/pawanData";

export const metadata = {
  title: "About Us | Pawan Traders - Battery & Solar Energy Solutions Prayagraj",
  description: "Learn about Pawan Traders, Director Mr. Pawan Kumar Kushwaha, Manager Mr. Kartik Kushwaha, and our 15+ years of delivering reliable battery and solar power in Prayagraj & Kaushambi.",
};

export default function AboutPage() {
  const { settings, branches } = INITIAL_DATA;

  return (
    <div>
      {/* Header Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #091E42, #1D4ED8)",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "70px 20px",
        }}
      >
        <div className="container">
          <span className="section-badge solar" style={{ margin: "0 auto 16px" }}>
            <i className="fa-solid fa-building"></i> Company Profile &amp; Legacy
          </span>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              marginBottom: "16px",
              color: "#FFFFFF",
            }}
          >
            About Pawan Traders
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              maxWidth: "760px",
              margin: "0 auto",
              color: "#E2E8F0",
              lineHeight: 1.7,
            }}
          >
            Your trusted multi-brand battery distributor, inverter specialist and rooftop solar turnkey EPC contractor in Puramufti (Prayagraj) and Charwa Town (Kaushambi).
          </p>
        </div>
      </section>

      {/* Company Story & Mission */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto 60px",
              textAlign: "center",
            }}
          >
            <span className="section-badge">
              <i className="fa-solid fa-clock-rotate-left"></i> 15+ Years Track Record
            </span>
            <h2 className="section-title">
              Committed to <span>Uninterrupted Power</span> for Every Home &amp; Vehicle
            </h2>
            <p
              style={{
                color: "#475569",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              Founded with the principle of zero compromise on genuine products, <strong>Pawan Traders</strong> is one of Prayagraj, Allahabad &amp; Kaushambi&apos;s leading energy solution providers. We hold direct authorized dealerships for premier brands including <strong>Amaron, Exide, Luminous, Microtek, Vion Lithium, and UTL Solar</strong>.
            </p>
            <p
              style={{
                color: "#475569",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                marginBottom: "32px",
              }}
            >
              Our operations span two physical branches with on-site computerized battery testing benches, instant warranty exchange counters, and dedicated solar technical installation teams.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  background: "var(--gray-50)",
                  borderLeft: "5px solid var(--primary)",
                  padding: "24px",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary)", marginBottom: "8px" }}>
                  <i className="fa-solid fa-bullseye"></i> Our Mission
                </h4>
                <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7 }}>
                  To provide 100% genuine energy storage and clean rooftop solar at fair, transparent wholesale prices with immediate local warranty and doorstep service.
                </p>
              </div>

              <div
                style={{
                  background: "var(--gray-50)",
                  borderLeft: "5px solid var(--solar)",
                  padding: "24px",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--solar-hover)", marginBottom: "8px" }}>
                  <i className="fa-solid fa-solar-panel"></i> Our Vision
                </h4>
                <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7 }}>
                  To power 5,000+ homes and enterprises across Prayagraj, Allahabad, and Kaushambi with high-efficiency PM Surya Ghar solar and next-gen lithium storage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED LARGE EXECUTIVE LEADERSHIP SECTION */}
      <section className="section-padding" style={{ background: "var(--gray-50)", borderTop: "1px solid var(--gray-200)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}>
            <span className="section-badge">
              <i className="fa-solid fa-users"></i> Executive Leadership
            </span>
            <h2 className="section-title">
              Meet Our <span>Founders &amp; Leadership</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Providing personal guidance, authentic factory warranties, and honest battery and solar advisory since inception.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
              gap: "36px",
              maxWidth: "1060px",
              margin: "0 auto",
            }}
          >
            {/* DIRECTOR CARD - LARGE & PROMINENT */}
            <div
              className="hover-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "2px solid rgba(29, 78, 216, 0.15)",
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "340px",
                  height: "360px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "3px solid var(--primary)",
                  boxShadow: "0 12px 32px rgba(29, 78, 216, 0.22)",
                  marginBottom: "24px",
                  background: "linear-gradient(135deg, #0A1128 0%, #1E293B 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/director.jpeg"
                  alt="Mr. Pawan Kumar Kushwaha"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <span
                style={{
                  display: "inline-block",
                  background: "rgba(29, 78, 216, 0.12)",
                  color: "var(--primary)",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "10px",
                }}
              >
                ★ Director &amp; Founder
              </span>

              <h3 style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "6px" }}>
                Mr. Pawan Kumar Kushwaha
              </h3>

              <div style={{ color: "#64748B", fontSize: "0.95rem", fontWeight: 600, marginBottom: "18px" }}>
                15+ Years in Power Storage &amp; Solar Distribution
              </div>

              <blockquote
                style={{
                  fontSize: "1rem",
                  color: "#475569",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "24px",
                  background: "#F8FAFC",
                  padding: "16px 20px",
                  borderRadius: "var(--radius-md)",
                  borderLeft: "4px solid var(--primary)",
                }}
              >
                &ldquo;At Pawan Traders, every customer receives certified original products with manufacturer warranty registration. We stand behind every battery and solar panel we sell, ensuring complete trust.&rdquo;
              </blockquote>

              <div style={{ display: "flex", gap: "12px", width: "100%", justifyContent: "center" }}>
                <a
                  href={`tel:+91${settings.callingNumber}`}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: "center", padding: "12px 20px" }}
                >
                  <i className="fa-solid fa-phone"></i> Call: +91 {settings.callingNumber}
                </a>
              </div>
            </div>

            {/* MANAGER CARD - LARGE & PROMINENT */}
            <div
              className="hover-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "2px solid rgba(245, 158, 11, 0.2)",
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "clamp(230px, 30vw, 290px)",
                  height: "clamp(230px, 30vw, 290px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "6px solid var(--solar)",
                  boxShadow: "0 18px 45px rgba(245, 158, 11, 0.3)",
                  marginBottom: "26px",
                  background: "#FEF3C7",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/manager.jpeg"
                  alt="Mr. Kartik Kushwaha"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>

              <span
                style={{
                  display: "inline-block",
                  background: "rgba(245, 158, 11, 0.15)",
                  color: "#D97706",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "10px",
                }}
              >
                ★ General Manager &amp; Technical Operations
              </span>

              <h3 style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "6px" }}>
                Mr. Kartik Kushwaha
              </h3>

              <div style={{ color: "#64748B", fontSize: "0.95rem", fontWeight: 600, marginBottom: "18px" }}>
                Rooftop Solar EPC &amp; Store Dispatch Specialist
              </div>

              <blockquote
                style={{
                  fontSize: "1rem",
                  color: "#475569",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "24px",
                  background: "#F8FAFC",
                  padding: "16px 20px",
                  borderRadius: "var(--radius-md)",
                  borderLeft: "4px solid var(--solar)",
                }}
              >
                &ldquo;Overseeing customer technical enquiries, fast same-day doorstep dispatch, and rooftop solar engineering teams across both our Puramufti and Charwa branches.&rdquo;
              </blockquote>

              <div style={{ display: "flex", gap: "12px", width: "100%", justifyContent: "center" }}>
                <a
                  href={`tel:+91${settings.managerContact || "9305839018"}`}
                  className="btn btn-solar"
                  style={{ flex: 1, justifyContent: "center", padding: "12px 20px" }}
                >
                  <i className="fa-solid fa-phone"></i> Call: +91 {settings.managerContact || "9305839018"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
