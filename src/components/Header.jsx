"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INITIAL_DATA } from "@/data/pawanData";

export default function Header({ onOpenEnquiry }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = INITIAL_DATA;

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

  return (
    <>
      {/* Main Navigation Header - Clean & Sticky without cluttered top bar */}
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
          {/* Logo with clean fallback */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
            title="Pawan Traders"
          >
            <img
              src="/assets/images/logo.svg"
              alt="Pawan Traders"
              style={{
                height: "44px",
                width: "auto",
                maxWidth: "200px",
                objectFit: "contain",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement.querySelector(".logo-fallback-render");
                if (fallback) fallback.style.display = "flex";
              }}
            />
            {/* Fallback Vector Emblem */}
            <div
              className="logo-fallback-render"
              style={{ display: "none", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #0F2D6B 0%, #1D4ED8 50%, #F59E0B 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  boxShadow: "0 4px 12px rgba(29, 78, 216, 0.3)",
                }}
              >
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.2rem",
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
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#64748B",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Battery &amp; Solar Hub
                </div>
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
              onClick={() => onOpenEnquiry && onOpenEnquiry("")}
              className="btn btn-primary btn-sm header-enquiry-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
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
                  if (onOpenEnquiry) onOpenEnquiry("");
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
