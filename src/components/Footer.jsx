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
        background: "#0B132B",
        color: "#94A3B8",
        paddingTop: "70px",
        paddingBottom: "30px",
        borderTop: "4px solid var(--solar)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "40px",
            marginBottom: "50px",
          }}
        >
          {/* Col 1 */}
          <div>
            <img
              src="/assets/images/logo.png"
              alt="Pawan Traders"
              style={{
                height: "52px",
                width: "auto",
                marginBottom: "18px",
                objectFit: "contain",
              }}
              onError={(e) => {
                e.currentTarget.src = "/assets/images/logo.svg";
                e.currentTarget.style.filter = "brightness(0) invert(1)";
              }}
            />
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.6",
                marginBottom: "16px",
                color: "#CBD5E1",
              }}
            >
              <strong>PAWAN TRADERS</strong> &bull; Official Battery, Inverter, UPS, Lithium Storage
              &amp; Rooftop Solar Superstore for Prayagraj, Allahabad &amp; Kaushambi.
            </p>
            <div style={{ fontSize: "0.85rem", color: "#94A3B8", lineHeight: 1.8 }}>
              <div>
                <strong>Director:</strong> {settings.director}
              </div>
              <div>
                <strong>Manager:</strong> {settings.manager}
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "1.1rem",
                fontWeight: 800,
                marginBottom: "16px",
              }}
            >
              5 Core Categories
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "0.9rem",
              }}
            >
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products?category=${cat.id}`} style={{ color: "#CBD5E1" }}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "1.1rem",
                fontWeight: 800,
                marginBottom: "16px",
              }}
            >
              Popular Battery Brands
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "0.9rem",
              }}
            >
              {brands.slice(0, 7).map((b) => (
                <li key={b.id}>
                  <Link href={`/brands/${b.slug}`} style={{ color: "#CBD5E1" }}>
                    {b.name} Batteries &amp; Inverters
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "1.1rem",
                fontWeight: 800,
                marginBottom: "16px",
              }}
            >
              Our Two Branches
            </h4>
            {branches.map((b) => (
              <div key={b.id} style={{ marginBottom: "16px", fontSize: "0.85rem" }}>
                <strong style={{ color: "#FDE047", display: "block" }}>{b.name}</strong>
                <span style={{ color: "#94A3B8" }}>{b.address}</span>
                <div style={{ marginTop: "4px" }}>
                  <a href={`tel:+91${b.phone}`} style={{ color: "#60A5FA", fontWeight: 700 }}>
                    <i className="fa-solid fa-phone"></i> +91 {b.phone}
                  </a>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "16px" }}>
              <button
                onClick={handleEnquiryClick}
                className="btn btn-solar btn-sm"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <i className="fa-solid fa-paper-plane"></i> Quick Enquiry
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            fontSize: "0.82rem",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Pawan Traders. All rights reserved. Puramufti, Prayagraj &amp; Charwa, Kaushambi.
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/about" style={{ color: "#94A3B8" }}>
              About Us
            </Link>
            <Link href="/products" style={{ color: "#94A3B8" }}>
              Product Catalogue
            </Link>
            <Link href="/solar" style={{ color: "#94A3B8" }}>
              Solar Subsidy
            </Link>
            <Link href="/branches" style={{ color: "#94A3B8" }}>
              Locations
            </Link>
            <Link href="/contact" style={{ color: "#94A3B8" }}>
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
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "0.78rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              title="Access Admin Panel"
            >
              <i className="fa-solid fa-lock"></i> Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
