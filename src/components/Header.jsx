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
      {/* Main Navigation Header - Clean & Sticky without cluttered top bar */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--gray-200)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }} title="Pawan Traders">
            <img
              src="/assets/images/logo.svg"
              alt="Pawan Traders"
              style={{ height: "46px", width: "auto", maxWidth: "210px", objectFit: "contain" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement.querySelector(".logo-fallback-render");
                if (fallback) fallback.style.display = "flex";
              }}
            />
            {/* Fallback Vector Emblem in case SVG file blocked */}
            <div className="logo-fallback-render" style={{ display: "none", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #0F2D6B 0%, #1D4ED8 50%, #F59E0B 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: "1.1rem",
                boxShadow: "0 4px 12px rgba(29, 78, 216, 0.3)"
              }}>
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                  PAWAN <span style={{ color: "#F59E0B" }}>TRADERS</span>
                </div>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Battery &amp; Solar Hub
                </div>
              </div>
            </div>
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

