"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INITIAL_DATA } from "@/data/pawanData";

export default function Header({ onOpenEnquiry }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { settings, branches } = INITIAL_DATA;

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
      {/* Top Announcement & Branch Coordinates Bar */}
      <div style={{ background: "#0B132B", color: "#CBD5E1", fontSize: "0.825rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, color: "#FBBF24" }}>
            <i className="fa-solid fa-bolt"></i> {settings.announcement}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <i className="fa-solid fa-location-dot" style={{ color: "#F59E0B" }}></i>
              <span><strong>Main:</strong> Puramufti, Prayagraj</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <i className="fa-solid fa-location-dot" style={{ color: "#F59E0B" }}></i>
              <span><strong>Branch 2:</strong> Charwa, Kaushambi</span>
            </div>
            <div>
              <a href={`tel:+91${settings.callingNumber}`} style={{ color: "#FDE047", fontWeight: 700 }}>
                <i className="fa-solid fa-phone"></i> {settings.callingNumber}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--gray-200)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }} title="Pawan Traders">
            <img src="/assets/images/logo.svg" alt="Pawan Traders" style={{ height: "50px", width: "auto" }} />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }} className="desktop-nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: isActive ? "var(--primary)" : "var(--gray-700)",
                    borderBottom: isActive ? "2px solid var(--primary)" : "none",
                    padding: "6px 2px",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry("")}
              className="btn btn-primary btn-sm"
            >
              <i className="fa-solid fa-paper-plane"></i> Quick Enquiry
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "var(--gray-800)",
                cursor: "pointer",
                padding: "8px",
              }}
              aria-label="Toggle Navigation"
            >
              <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            background: "#FFFFFF",
            borderBottom: "1px solid var(--gray-200)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "var(--shadow-lg)"
          }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: pathname === item.href ? "var(--primary)" : "var(--gray-800)",
                  padding: "6px 0",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <style jsx>{`
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 992px) {
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

