import Link from "next/link";
import { INITIAL_DATA } from "@/data/pawanData";

export const metadata = {
  title: "About Pawan Traders | 15+ Years Battery & Solar Dealer Prayagraj | Director Mr. Pawan Kumar Kushwaha",
  description: "Pawan Traders — Prayagraj & Kaushambi's most trusted authorized battery and solar dealer since 2008. Director Mr. Pawan Kumar Kushwaha leads two showrooms in Puramufti (Prayagraj) & Charwa (Kaushambi). Authorized for Amaron, Exide, Luminous, Microtek & Vion Lithium.",
  keywords: [
    "About Pawan Traders Prayagraj",
    "Battery dealer Puramufti history",
    "Mr Pawan Kumar Kushwaha director",
    "Authorized Exide dealer Prayagraj",
    "Amaron authorized dealer Prayagraj",
    "Best battery shop Allahabad 15 years",
    "Solar EPC contractor Prayagraj",
    "Battery wholesale dealer Kaushambi",
  ],
  openGraph: {
    title: "About Pawan Traders | Director Mr. Pawan Kumar Kushwaha | Prayagraj & Kaushambi",
    description: "15+ years serving Prayagraj (Puramufti) & Kaushambi (Charwa) with genuine Amaron, Exide, Luminous batteries and rooftop solar. Meet the team behind Prayagraj's most trusted energy store.",
    images: [{ url: "/director.jpeg", width: 800, height: 900, alt: "Mr. Pawan Kumar Kushwaha - Director, Pawan Traders Prayagraj" }],
    type: "website",
    locale: "en_IN",
    siteName: "Pawan Traders Battery & Solar Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pawan Traders Prayagraj | Director Mr. Pawan Kumar Kushwaha",
    description: "Authorized battery & solar dealer in Puramufti Prayagraj since 2008. Exide, Amaron, Luminous, Vion Lithium & PM Surya Ghar solar.",
    images: ["/director.jpeg"],
  },
  alternates: { canonical: "https://www.pawantraders.in/about" },
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

      {/* 2. EXECUTIVE LEADERSHIP SPOTLIGHT (EXACT MAHADEV MOTORS UI) */}
      <section className="executive-spotlight-section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div className="executive-spotlight-container">
          {/* Row 1: Director & Founder */}
          <div className="executive-spotlight-row">
            <div className="executive-spotlight-content">
              <span className="executive-spotlight-eyebrow">
                MEET OUR DIRECTOR
              </span>
              <h2 className="executive-spotlight-name">
                Mr. Pawan Kumar Kushwaha
              </h2>
              <a href={`tel:+91${settings.callingNumber}`} className="executive-spotlight-phone">
                <i className="fa-solid fa-phone"></i>
                <span>+91 {settings.callingNumber}</span>
              </a>
              <p className="executive-spotlight-bio">
                A visionary leader with a deep passion for automotive energy storage and solar power distribution, Mr. Pawan Kumar Kushwaha founded Pawan Traders with a simple goal &mdash; to create a dealership built on 100% genuine brand products, fair wholesale transparency, and authentic customer trust.
              </p>
              <div className="executive-spotlight-signature">
                <span className="executive-spotlight-sign-name">
                  Pawan Kumar Kushwaha
                </span>
                <span className="executive-spotlight-sign-role">
                  DIRECTOR, PAWAN TRADERS
                </span>
              </div>
            </div>

            <div className="executive-spotlight-image-card">
              <img
                src="/director.jpeg"
                alt="Mr. Pawan Kumar Kushwaha - Director & Founder"
              />
              <div className="executive-spotlight-quote-overlay">
                &ldquo;Leadership is about service, trust, and creating real lasting value for people.&rdquo;
              </div>
            </div>
          </div>

          {/* Row 2: General Manager & Technical Operations (Image Left, Info Right) */}
          <div className="executive-spotlight-row" style={{ paddingTop: "40px", borderTop: "1px solid var(--gray-200)" }}>
            <div className="executive-spotlight-image-card">
              <img
                src="/manager.jpeg"
                alt="Mr. Kartik Kushwaha - General Manager"
              />
              <div className="executive-spotlight-quote-overlay">
                &ldquo;Excellence is about fast doorstep service, computerized battery testing, and flawless rooftop solar execution.&rdquo;
              </div>
            </div>

            <div className="executive-spotlight-content">
              <span className="executive-spotlight-eyebrow" style={{ color: "var(--solar-hover)" }}>
                MEET OUR GENERAL MANAGER
              </span>
              <h2 className="executive-spotlight-name">
                Mr. Kartik Kushwaha
              </h2>
              <a href={`tel:+91${settings.managerContact || "9305839018"}`} className="executive-spotlight-phone" style={{ color: "var(--solar-hover)" }}>
                <i className="fa-solid fa-phone"></i>
                <span>+91 {settings.managerContact || "9305839018"}</span>
              </a>
              <p className="executive-spotlight-bio">
                Overseeing technical customer enquiries, rooftop solar EPC engineering, and same-day express doorstep dispatch, Mr. Kartik Kushwaha manages computerized battery testing benches and installation teams across both our Puramufti and Charwa branches.
              </p>
              <div className="executive-spotlight-signature">
                <span className="executive-spotlight-sign-name" style={{ color: "var(--solar-hover)" }}>
                  Kartik Kushwaha
                </span>
                <span className="executive-spotlight-sign-role">
                  GENERAL MANAGER &amp; TECHNICAL HEAD, PAWAN TRADERS
                </span>
              </div>
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

      {/* SEO: Hidden keyword content for local search */}
      <div style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
        <p>Pawan Traders is Prayagraj and Allahabad&apos;s best battery shop. Authorized Amaron battery dealer Prayagraj, Exide battery dealer Allahabad, Luminous inverter dealer Puramufti, Microtek solar inverter Kaushambi. Mr. Pawan Kumar Kushwaha director, 15+ years experience, GT Road Puramufti Prayagraj 212208. Battery dealer near me Prayagraj, solar panel dealer near me Kaushambi.</p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Pawan Traders - Battery & Solar Energy Solutions",
          "url": "https://www.pawantraders.in/about",
          "description": "Pawan Traders — Prayagraj & Kaushambi authorized battery and solar dealer since 2008. Director Mr. Pawan Kumar Kushwaha.",
          "mainEntity": {
            "@type": "Person",
            "name": "Mr. Pawan Kumar Kushwaha",
            "jobTitle": "Director & Founder",
            "worksFor": {
              "@type": "LocalBusiness",
              "name": "Pawan Traders",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "GT Road, Puramufti",
                "addressLocality": "Prayagraj",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "212208",
                "addressCountry": "IN"
              }
            },
            "telephone": "+919935618513"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pawantraders.in/" },
              { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.pawantraders.in/about" }
            ]
          }
        }) }}
      />
    </div>
  );
}
