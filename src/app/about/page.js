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
      {/* 1. Header Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #091E42, #1D4ED8)",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "70px 20px 60px",
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

          {/* 3 Real Photos in About Hero Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "20px",
              marginTop: "40px",
              maxWidth: "1060px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                height: "220px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
                position: "relative",
              }}
            >
              <img
                src="/assets/images/about/about-1.jpg"
                alt="Pawan Traders Puramufti Showroom"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "16px",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                }}
              >
                Puramufti Showroom &amp; Retail Hub
              </div>
            </div>

            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                height: "220px",
                border: "2px solid rgba(245, 158, 11, 0.4)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
                position: "relative",
              }}
            >
              <img
                src="/assets/images/about/about-2.jpg"
                alt="Solar Rooftop Installation"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "16px",
                  color: "#FDE047",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                }}
              >
                On-Grid &amp; Hybrid Solar Installations
              </div>
            </div>

            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                height: "220px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
                position: "relative",
              }}
            >
              <img
                src="/assets/images/about/about-3.jpg"
                alt="Inverter & Battery Stock"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "16px",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                }}
              >
                Amaron, Exide &amp; Lithium Inventory
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED EXECUTIVE LEADERSHIP SECTION (1 CARD PER 100VH, 60VW IMAGE) */}
      <section style={{ width: "100%", overflow: "hidden", background: "var(--gray-50)", borderTop: "1px solid var(--gray-200)" }}>
        {/* Section Title Header */}
        <div className="container" style={{ paddingTop: "60px", paddingBottom: "20px", textAlign: "center" }}>
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
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
        </div>

        {/* 100VH CARD 1: DIRECTOR & FOUNDER (IMAGE 60VW, HEIGHT 100VH) */}
        <div className="leadership-fullscreen-row">
          <div className="leadership-image-60vw">
            <img
              src="/director.jpeg"
              alt="Mr. Pawan Kumar Kushwaha"
            />
          </div>

          <div className="leadership-info-40vw">
            <span
              style={{
                display: "inline-block",
                background: "rgba(29, 78, 216, 0.1)",
                color: "var(--primary)",
                padding: "6px 16px",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "14px",
                width: "fit-content",
              }}
            >
              ★ Director &amp; Founder
            </span>

            <h3 style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.3rem)", fontWeight: 900, color: "#0F172A", marginBottom: "8px" }}>
              Mr. Pawan Kumar Kushwaha
            </h3>

            <div style={{ color: "#2563EB", fontSize: "1.05rem", fontWeight: 700, marginBottom: "22px" }}>
              15+ Years in Power Storage &amp; Solar Distribution
            </div>

            <blockquote
              style={{
                fontSize: "1rem",
                color: "#475569",
                lineHeight: 1.8,
                fontStyle: "italic",
                marginBottom: "26px",
                background: "#F8FAFC",
                padding: "18px 22px",
                borderRadius: "var(--radius-md)",
                borderLeft: "5px solid var(--primary)",
              }}
            >
              &ldquo;At Pawan Traders, every customer receives certified original products with manufacturer warranty registration. We stand behind every battery and solar panel we sell, ensuring complete trust.&rdquo;
            </blockquote>

            <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "0.92rem", fontWeight: 600 }}>
                <i className="fa-solid fa-circle-check" style={{ color: "#16A34A" }}></i>
                <span>Direct Authorized Dealer for Amaron, Exide, Luminous &amp; Microtek</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "0.92rem", fontWeight: 600 }}>
                <i className="fa-solid fa-circle-check" style={{ color: "#16A34A" }}></i>
                <span>On-Site Warranty Claim Benches at Puramufti &amp; Charwa</span>
              </div>
            </div>

            <div>
              <a
                href={`tel:+91${settings.callingNumber}`}
                className="btn btn-primary btn-lg"
                style={{ padding: "14px 32px", fontSize: "1rem", borderRadius: "12px", display: "inline-flex", alignItems: "center", gap: "10px", width: "fit-content" }}
              >
                <i className="fa-solid fa-phone"></i> Call Director: +91 {settings.callingNumber}
              </a>
            </div>
          </div>
        </div>

        {/* 100VH CARD 2: GENERAL MANAGER (IMAGE 60VW, HEIGHT 100VH) */}
        <div className="leadership-fullscreen-row" style={{ borderTop: "1px solid var(--gray-200)" }}>
          <div className="leadership-image-60vw">
            <img
              src="/manager.jpeg"
              alt="Mr. Kartik Kushwaha"
            />
          </div>

          <div className="leadership-info-40vw">
            <span
              style={{
                display: "inline-block",
                background: "rgba(245, 158, 11, 0.12)",
                color: "#D97706",
                padding: "6px 16px",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "14px",
                width: "fit-content",
              }}
            >
              ★ General Manager &amp; Technical Operations
            </span>

            <h3 style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.3rem)", fontWeight: 900, color: "#0F172A", marginBottom: "8px" }}>
              Mr. Kartik Kushwaha
            </h3>

            <div style={{ color: "#D97706", fontSize: "1.05rem", fontWeight: 700, marginBottom: "22px" }}>
              Rooftop Solar EPC &amp; Store Dispatch Specialist
            </div>

            <blockquote
              style={{
                fontSize: "1rem",
                color: "#475569",
                lineHeight: 1.8,
                fontStyle: "italic",
                marginBottom: "26px",
                background: "#F8FAFC",
                padding: "18px 22px",
                borderRadius: "var(--radius-md)",
                borderLeft: "4px solid var(--solar)",
              }}
            >
              &ldquo;Overseeing customer technical enquiries, fast same-day doorstep dispatch, and rooftop solar engineering teams across both our Puramufti and Charwa branches.&rdquo;
            </blockquote>

            <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "0.92rem", fontWeight: 600 }}>
                <i className="fa-solid fa-circle-check" style={{ color: "#F59E0B" }}></i>
                <span>PM Surya Ghar Muft Bijli Yojana Rooftop Solar Installations</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "0.92rem", fontWeight: 600 }}>
                <i className="fa-solid fa-circle-check" style={{ color: "#F59E0B" }}></i>
                <span>Doorstep Inverter &amp; Battery Delivery in Under 4 Hours</span>
              </div>
            </div>

            <div>
              <a
                href={`tel:+91${settings.managerContact || "9305839018"}`}
                className="btn btn-solar btn-lg"
                style={{ padding: "14px 32px", fontSize: "1rem", borderRadius: "12px", display: "inline-flex", alignItems: "center", gap: "10px", width: "fit-content" }}
              >
                <i className="fa-solid fa-phone"></i> Call Manager: +91 {settings.managerContact || "9305839018"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Company Story & Mission */}
      <section className="section-padding" style={{ background: "#FFFFFF", borderTop: "1px solid var(--gray-200)" }}>
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
    </div>
  );
}
