"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_DATA, buildWhatsAppUrl } from "@/data/pawanData";

export default function GalleryPage() {
  const [items, setItems] = useState(INITIAL_DATA.gallery || []);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "solar", label: "Solar Installations" },
    { id: "batteries", label: "Batteries & Inverters" },
    { id: "branches", label: "Showrooms & Branches" },
    { id: "installations", label: "UPS & Industrial" },
  ];

  useEffect(() => {
    async function loadGallery() {
      try {
        const url = activeCategory === "all" ? "/api/gallery" : `/api/gallery?category=${activeCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success && data.items) {
          setItems(data.items);
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, [activeCategory]);

  return (
    <>
      {/* Header Banner */}
      <section style={{
        background: "linear-gradient(135deg, #091E42 0%, #0F2D6B 60%, #1D4ED8 100%)",
        color: "#FFFFFF",
        padding: "60px 0 50px 0",
        textAlign: "center"
      }}>
        <div className="container">
          <div className="section-badge" style={{ background: "rgba(255,255,255,0.12)", color: "#FDE047", margin: "0 auto 16px auto" }}>
            <i className="fa-solid fa-camera"></i> LIVE INSTALLATIONS &amp; SHOWCASE
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "14px" }}>
            Product &amp; Project Gallery
          </h1>
          <p style={{ color: "#CBD5E1", fontSize: "1.05rem", maxWidth: "650px", margin: "0 auto" }}>
            Real installation photos of Rooftop Solar Projects, Inverter Battery Setups, Puramufti &amp; Charwa branches, and customer dispatches across Prayagraj &amp; Kaushambi.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: "30px 0 10px 0", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap"
          }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "var(--transition)",
                  background: activeCategory === cat.id ? "#1D4ED8" : "#FFFFFF",
                  color: activeCategory === cat.id ? "#FFFFFF" : "#475569",
                  boxShadow: activeCategory === cat.id ? "0 4px 12px rgba(29, 78, 216, 0.25)" : "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{ padding: "50px 0 80px 0" }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#64748B" }}>
              <i className="fa-solid fa-circle-notch fa-spin fa-2x" style={{ color: "#1D4ED8", marginBottom: "12px" }}></i>
              <p>Loading photo gallery...</p>
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px dashed #CBD5E1" }}>
              <i className="fa-solid fa-images fa-3x" style={{ color: "#94A3B8", marginBottom: "16px" }}></i>
              <h3 style={{ fontSize: "1.25rem", color: "#1E293B", marginBottom: "8px" }}>No photos found in this category</h3>
              <p style={{ color: "#64748B", marginBottom: "20px" }}>Admin can upload photos via Cloudinary in the Admin Control Panel.</p>
              <Link href="/admin" className="btn btn-primary">
                <i className="fa-solid fa-plus"></i> Go to Admin Gallery Manager
              </Link>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}>
              {items.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedPhoto(item)}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    border: "1px solid #E2E8F0",
                    boxShadow: "var(--shadow-sm)",
                    cursor: "pointer",
                    transition: "var(--transition)",
                  }}
                  className="hover-card"
                >
                  <div style={{
                    height: "240px",
                    overflow: "hidden",
                    position: "relative",
                    background: "#0F172A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title || "Pawan Traders Gallery"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      className="zoom-hover"
                    />
                    <span style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(15, 23, 42, 0.75)",
                      color: "#F8FAFC",
                      backdropFilter: "blur(6px)",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ padding: "18px" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>
                      {item.title || "Installation Showcase"}
                    </h3>
                    {item.caption && (
                      <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.5 }}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(5, 11, 24, 0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1E293B",
              borderRadius: "var(--radius-xl)",
              maxWidth: "800px",
              width: "100%",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              color: "#FFFFFF",
            }}
          >
            <div style={{ position: "relative", maxHeight: "480px", background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title || "Preview"}
                style={{ maxHeight: "480px", width: "100%", objectFit: "contain" }}
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  background: "rgba(0, 0, 0, 0.6)",
                  border: "none",
                  color: "#FFFFFF",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF" }}>
                  {selectedPhoto.title || "Pawan Traders Gallery Showcase"}
                </h3>
                <span style={{ background: "#F59E0B", color: "#0F172A", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
                  {selectedPhoto.category}
                </span>
              </div>
              {selectedPhoto.caption && (
                <p style={{ color: "#CBD5E1", fontSize: "0.95rem", marginBottom: "20px", lineHeight: 1.6 }}>
                  {selectedPhoto.caption}
                </p>
              )}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={buildWhatsAppUrl(`Hello Pawan Traders, I saw this project/photo in your gallery: ${selectedPhoto.title || selectedPhoto.category}. I want similar battery/solar setup.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solar"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Enquire for Similar Setup
                </a>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="btn btn-outline"
                  style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.3)" }}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

