"use client";

import Link from "next/link";
import { INITIAL_DATA } from "@/data/pawanData";

export default function Footer({ onOpenEnquiry }) {
  const { settings, categories, brands, branches } = INITIAL_DATA;

  const handleEnquiryClick = (e) => {
    e.preventDefault();
    if (onOpenEnquiry) {
      onOpenEnquiry("");
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-quick-enquiry"));
    }
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #091428 0%, #060D1A 100%)",
        color: "#94A3B8",
        paddingTop: "60px",
        paddingBottom: "30px",
        borderTop: "3px solid #F59E0B",
        position: "relative",
      }}
    >
      <div className="container">
        {/* 1. TOP TRUST HIGHLIGHTS BAR */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "16px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "50px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "rgba(245, 158, 11, 0.15)", color: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <strong style={{ color: "#FFFFFF", fontSize: "0.95rem", display: "block" }}>100% Original Brands</strong>
              <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Amaron, Exide, Luminous, Microtek</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
              <i className="fa-solid fa-solar-panel"></i>
            </div>
            <div>
              <strong style={{ color: "#FFFFFF", fontSize: "0.95rem", display: "block" }}>PM Surya Ghar Solar</strong>
              <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Up to ₹78,000 Direct Subsidy</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.15)", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <strong style={{ color: "#FFFFFF", fontSize: "0.95rem", display: "block" }}>Doorstep Delivery</strong>
              <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Prayagraj, Kaushambi &amp; 100km</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "rgba(168, 85, 247, 0.15)", color: "#C084FC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
              <i className="fa-solid fa-battery-three-quarters"></i>
            </div>
            <div>
              <strong style={{ color: "#FFFFFF", fontSize: "0.95rem", display: "block" }}>Free Battery Health Test</strong>
              <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Computerized Bench at Showrooms</span>
            </div>
          </div>
        </div>

        {/* 2. MAIN 4-COLUMN FOOTER CONTENT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "40px",
            marginBottom: "50px",
          }}
        >
          {/* Col 1: Big Logo & About Superstore */}
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "20px" }}>
              <img
                src="/assets/images/logo.png"
                alt="Pawan Traders"
                style={{
                  height: "64px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                }}
                onError={(e) => {
                  e.currentTarget.src = "/assets/images/logo.svg";
                  e.currentTarget.style.filter = "brightness(0) invert(1)";
                }}
              />
            </Link>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.7",
                marginBottom: "20px",
                color: "#CBD5E1",
              }}
            >
              <strong>PAWAN TRADERS</strong> is Prayagraj &amp; Kaushambi&apos;s leading multi-brand battery, inverter, lithium storage &amp; rooftop solar superstore since 2008.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "#94A3B8" }}>
              <div>
                <strong style={{ color: "#E2E8F0" }}>Director:</strong> {settings.director}
              </div>
              <div>
                <strong style={{ color: "#E2E8F0" }}>General Manager:</strong> {settings.manager}
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
              <a
                href={`tel:+91${settings.callingNumber || "9935618513"}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(59, 130, 246, 0.15)",
                  color: "#60A5FA",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <i className="fa-solid fa-phone"></i> +91 {settings.callingNumber || "9935618513"}
              </a>
              <a
                href={`https://wa.me/91${settings.whatsAppNumber || "8299362360"}?text=Hello%20Pawan%20Traders`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34D399",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <i className="fa-brands fa-whatsapp"></i> WhatsApp
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "1.05rem",
                fontWeight: 800,
                marginBottom: "18px",
                position: "relative",
                paddingBottom: "8px",
              }}
            >
              5 Core Categories
              <span style={{ position: "absolute", bottom: 0, left: 0, width: "32px", height: "2.5px", background: "#F59E0B", borderRadius: "2px" }}></span>
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "0.9rem",
              }}
            >
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    style={{
                      color: "#94A3B8",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                    className="footer-link-hover"
                  >
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.7rem", color: "#F59E0B" }}></i>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Brands */}
          <div>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "1.05rem",
                fontWeight: 800,
                marginBottom: "18px",
                position: "relative",
                paddingBottom: "8px",
              }}
            >
              Authorized Brands
              <span style={{ position: "absolute", bottom: 0, left: 0, width: "32px", height: "2.5px", background: "#38BDF8", borderRadius: "2px" }}></span>
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "0.9rem",
              }}
            >
              {brands.slice(0, 7).map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/brands/${b.slug}`}
                    style={{
                      color: "#94A3B8",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                    className="footer-link-hover"
                  >
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.7rem", color: "#38BDF8" }}></i>
                    {b.name} Batteries &amp; Solar
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Branches Information */}
          <div>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "1.05rem",
                fontWeight: 800,
                marginBottom: "18px",
                position: "relative",
                paddingBottom: "8px",
              }}
            >
              Our Two Branches
              <span style={{ position: "absolute", bottom: 0, left: 0, width: "32px", height: "2.5px", background: "#10B981", borderRadius: "2px" }}></span>
            </h4>
            {branches.map((b) => (
              <div
                key={b.id}
                style={{
                  marginBottom: "14px",
                  fontSize: "0.85rem",
                  background: "rgba(255,255,255,0.02)",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                  <i className="fa-solid fa-location-dot" style={{ color: "#F59E0B", fontSize: "0.85rem" }}></i>
                  <strong style={{ color: "#FDE047" }}>{b.name}</strong>
                </div>
                <span style={{ color: "#94A3B8", fontSize: "0.82rem", lineHeight: 1.5, display: "block" }}>
                  {b.address}
                </span>
                <div style={{ marginTop: "6px" }}>
                  <a href={`tel:+91${b.phone}`} style={{ color: "#60A5FA", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-phone"></i> +91 {b.phone}
                  </a>
                </div>
              </div>
            ))}

            <div style={{ marginTop: "16px" }}>
              <button
                onClick={handleEnquiryClick}
                className="btn btn-solar btn-sm"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  borderRadius: "999px",
                  padding: "10px 16px",
                  fontWeight: 800,
                }}
              >
                <i className="fa-solid fa-paper-plane"></i> Quick Enquiry
              </button>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM COPYRIGHT & ADMIN LINK */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.82rem",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} <strong style={{ color: "#FFFFFF" }}>Pawan Traders</strong>. All rights reserved. Puramufti (Prayagraj) &amp; Charwa (Kaushambi).
          </div>
          <div style={{ display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/about" style={{ color: "#94A3B8", textDecoration: "none" }} className="footer-link-hover">
              About Us
            </Link>
            <Link href="/products" style={{ color: "#94A3B8", textDecoration: "none" }} className="footer-link-hover">
              Products
            </Link>
            <Link href="/solar" style={{ color: "#94A3B8", textDecoration: "none" }} className="footer-link-hover">
              Solar Subsidy
            </Link>
            <Link href="/branches" style={{ color: "#94A3B8", textDecoration: "none" }} className="footer-link-hover">
              Branches
            </Link>
            <Link href="/contact" style={{ color: "#94A3B8", textDecoration: "none" }} className="footer-link-hover">
              Contact
            </Link>
            <Link
              href="/admin"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#FDE047",
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.35)",
                padding: "4px 12px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "0.78rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              title="Access Staff Admin Panel"
            >
              <i className="fa-solid fa-lock"></i> Admin Portal
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.footer-link-hover:hover) {
          color: #F59E0B !important;
          transform: translateX(3px);
        }
      `}</style>
    </footer>
  );
}
