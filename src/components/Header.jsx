"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INITIAL_DATA } from "@/data/pawanData";

export default function Header({ onOpenEnquiry }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = INITIAL_DATA;

  // Running Announcement Settings
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [announcementText, setAnnouncementText] = useState(
    settings.announcement || "⚡ Special Festive Offer: Flat 10% Off on Solar Hybrid Inverters & Free Battery Health Checkup at both Branches! Call 9935618513"
  );

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.settings) {
            setShowAnnouncement(data.settings.showAnnouncement !== false);
            if (data.settings.announcementText) {
              setAnnouncementText(data.settings.announcementText);
            }
          }
        }
      } catch (err) {}
    }
    fetchSettings();
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Product Catalogue", href: "/products" },
    { label: "Brands", href: "/brands" },
    { label: "Solar Solutions", href: "/solar" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Branches", href: "/branches" },
    { label: "Contact Us", href: "/contact" },
  ];

  const handleEnquiryClick = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry("");
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-quick-enquiry"));
    }
  };

  return (
    <>
      {/* Continuous Running Marquee Ticker Banner (Controlled via Admin) */}
      {showAnnouncement && (
        <div
          style={{
            background: "linear-gradient(90deg, #091E42 0%, #0F2D6B 50%, #091E42 100%)",
            color: "#FFFFFF",
            overflow: "hidden",
            whiteSpace: "nowrap",
            borderBottom: "1px solid rgba(245, 158, 11, 0.35)",
            position: "relative",
            zIndex: 1001,
            height: "36px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="marquee-track" style={{ display: "inline-flex", alignItems: "center" }}>
            <div className="marquee-content" style={{ display: "inline-flex", alignItems: "center", gap: "30px", paddingRight: "30px" }}>
              <span style={{ color: "#FDE047", fontWeight: 700, fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-bolt" style={{ color: "#F59E0B" }}></i> {announcementText}
              </span>
              <span style={{ color: "#38BDF8", fontSize: "0.82rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-phone"></i> Puramufti: 9935618513 &bull; Charwa: 9305839018
              </span>
              <span style={{ color: "#FDE047", fontWeight: 700, fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-solar-panel" style={{ color: "#F59E0B" }}></i> PM Surya Ghar Direct Bank Subsidy Assistance Up to ₹78,000
              </span>
              <span style={{ color: "#A7F3D0", fontSize: "0.82rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-certificate"></i> 100% Original Brand Guarantee &bull; Free In-Store Battery Health Testing
              </span>
            </div>
            {/* Duplicate for seamless infinite loop */}
            <div className="marquee-content" aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "30px", paddingRight: "30px" }}>
              <span style={{ color: "#FDE047", fontWeight: 700, fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-bolt" style={{ color: "#F59E0B" }}></i> {announcementText}
              </span>
              <span style={{ color: "#38BDF8", fontSize: "0.82rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-phone"></i> Puramufti: 9935618513 &bull; Charwa: 9305839018
              </span>
              <span style={{ color: "#FDE047", fontWeight: 700, fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-solar-panel" style={{ color: "#F59E0B" }}></i> PM Surya Ghar Direct Bank Subsidy Assistance Up to ₹78,000
              </span>
              <span style={{ color: "#A7F3D0", fontSize: "0.82rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-certificate"></i> 100% Original Brand Guarantee &bull; Free In-Store Battery Health Testing
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Header - Clean & Sticky */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--gray-200)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
            gap: "12px",
          }}
        >
          {/* Logo with Emblem & Brand Name */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              flexShrink: 0,
            }}
            title="Pawan Traders"
          >
            <img
              src="/assets/images/logo.png"
              alt="Pawan Traders"
              style={{
                height: "48px",
                width: "auto",
                objectFit: "contain",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  color: "#0F172A",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                PAWAN <span style={{ color: "#F59E0B" }}>TRADERS</span>
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "#64748B",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Battery &amp; Solar Hub
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 1.3vw, 20px)",
              flexWrap: "nowrap",
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: "clamp(0.84rem, 0.9vw, 0.94rem)",
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? "var(--primary)" : "var(--gray-700)",
                    borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                    padding: "6px 2px",
                    whiteSpace: "nowrap",
                    transition: "color 0.15s ease, border-color 0.15s ease",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <button
              onClick={handleEnquiryClick}
              className="btn btn-primary btn-sm header-enquiry-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              <i className="fa-solid fa-paper-plane"></i>
              <span className="enquiry-btn-text">Quick Enquiry</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              style={{
                background: "none",
                border: "none",
                fontSize: "1.45rem",
                color: "var(--gray-800)",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
              }}
              aria-label="Toggle Navigation"
            >
              <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "#FFFFFF",
              borderBottom: "1px solid var(--gray-200)",
              padding: "16px 20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: "var(--shadow-xl)",
              maxHeight: "calc(100vh - 72px)",
              overflowY: "auto",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "1.02rem",
                  fontWeight: 600,
                  color: pathname === item.href ? "var(--primary)" : "var(--gray-800)",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  background: pathname === item.href ? "var(--primary-bg)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.label}</span>
                <i
                  className="fa-solid fa-chevron-right"
                  style={{ fontSize: "0.75rem", opacity: 0.5 }}
                ></i>
              </Link>
            ))}

            <div
              style={{
                marginTop: "12px",
                paddingTop: "16px",
                borderTop: "1px solid var(--gray-200)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleEnquiryClick();
                }}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <i className="fa-solid fa-paper-plane"></i> Quick Enquiry
              </button>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <a
                  href={`tel:+91${settings?.callingNumber || "9935618513"}`}
                  className="btn btn-call btn-sm"
                  style={{ justifyContent: "center" }}
                >
                  <i className="fa-solid fa-phone"></i> Call Now
                </a>
                <a
                  href={`https://wa.me/91${settings?.whatsAppNumber || "8299362360"}?text=Hello%20Pawan%20Traders`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ justifyContent: "center" }}
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <style jsx>{`
        @keyframes marqueeLoop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: inline-flex;
          animation: marqueeLoop 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 1080px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 1081px) {
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        @media (max-width: 520px) {
          .enquiry-btn-text {
            display: none;
          }
          .header-enquiry-btn {
            padding: 8px 12px !important;
          }
        }
      `}</style>
    </>
  );
}
