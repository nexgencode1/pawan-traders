"use client";

import { useState } from "react";
import Link from "next/link";
import { INITIAL_DATA, buildWhatsAppUrl } from "@/data/pawanData";
import ProductCard from "@/components/ProductCard";
import SolarCalculator from "@/components/SolarCalculator";
import QuickEnquiryModal from "@/components/QuickEnquiryModal";

export default function HomePage() {
  const { settings, categories, brands, products, branches } = INITIAL_DATA;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Quick Finder State
  const [finderSearch, setFinderSearch] = useState("");
  const [finderCategory, setFinderCategory] = useState("");
  const [finderBrand, setFinderBrand] = useState("");

  const handleOpenModal = (prod = null) => {
    setSelectedProduct(prod);
    setModalOpen(true);
  };

  const featuredProducts = products.filter((p) => p.featured && p.published);

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, #091E42 0%, #0F2D6B 50%, #1D4ED8 100%)",
        color: "#FFFFFF",
        paddingTop: "60px",
        paddingBottom: "90px",
        overflow: "hidden"
      }}>
        <div className="container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
          alignItems: "center"
        }}>
          <div>
            <div className="section-badge" style={{ background: "rgba(255,255,255,0.12)", color: "#FDE047", border: "1px solid rgba(255,255,255,0.2)" }}>
              <i className="fa-solid fa-award"></i> 100% AUTHORIZED BATTERY &amp; SOLAR HUB
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 800, lineHeight: 1.15, color: "#FFFFFF", marginBottom: "20px" }}>
              Reliable Power &amp; <span style={{ color: "#F59E0B" }}>Solar Energy</span> for Prayagraj &amp; Kaushambi
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#E2E8F0", marginBottom: "32px", lineHeight: 1.7, maxWidth: "580px" }}>
              Complete range of Automotive Batteries, Vion Lithium Storage, Tall Tubular Inverters, Dry UPS Batteries and Rooftop Solar Plants. Serving Puramufti, Charwa and nearby regions with official warranty &amp; same-day delivery.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
              <Link href="/products" className="btn btn-solar btn-lg">
                <i className="fa-solid fa-layer-group"></i> Explore Catalogue
              </Link>
              <Link href="/solar" className="btn btn-white btn-lg">
                <i className="fa-solid fa-solar-panel"></i> Solar Calculator
              </Link>
              <a href={`tel:+91${settings.callingNumber}`} className="btn btn-outline btn-lg" style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.4)" }}>
                <i className="fa-solid fa-phone"></i> Call {settings.callingNumber}
              </a>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B" }}>
                  <i className="fa-solid fa-certificate"></i>
                </div>
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#F1F5F9", display: "block" }}>100% Genuine Brands</span>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Amaron, Exide, Luminous</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B" }}>
                  <i className="fa-solid fa-truck-fast"></i>
                </div>
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#F1F5F9", display: "block" }}>Same-Day Delivery</span>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Free Fitting &amp; Testing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "var(--radius-xl)",
            padding: "24px",
            backdropFilter: "blur(16px)"
          }}>
            <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", background: "#020617", height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/assets/images/products/solar-panel.svg" alt="Solar & Battery Solutions" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "18px" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-md)", padding: "12px", textAlign: "center" }}>
                <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#F59E0B", display: "block" }}>15+</span>
                <span style={{ fontSize: "0.75rem", color: "#CBD5E1" }}>Years Experience</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-md)", padding: "12px", textAlign: "center" }}>
                <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#F59E0B", display: "block" }}>10K+</span>
                <span style={{ fontSize: "0.75rem", color: "#CBD5E1" }}>Happy Customers</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-md)", padding: "12px", textAlign: "center" }}>
                <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#F59E0B", display: "block" }}>2</span>
                <span style={{ fontSize: "0.75rem", color: "#CBD5E1" }}>Prime Branches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUICK SEARCH / FINDER ==================== */}
      <section style={{ position: "relative", marginTop: "-45px", zIndex: 10 }}>
        <div className="container">
          <div style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)",
            border: "1px solid var(--gray-200)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            alignItems: "flex-end"
          }}>
            <div className="form-group">
              <label><i className="fa-solid fa-magnifying-glass"></i> Search Model</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 150Ah Tubular, Creta..."
                value={finderSearch}
                onChange={(e) => setFinderSearch(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><i className="fa-solid fa-list"></i> Category</label>
              <select
                className="form-control"
                value={finderCategory}
                onChange={(e) => setFinderCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><i className="fa-solid fa-shield-halved"></i> Brand</label>
              <select
                className="form-control"
                value={finderBrand}
                onChange={(e) => setFinderBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Link
                href={`/products?q=${encodeURIComponent(finderSearch)}&category=${finderCategory}&brand=${finderBrand}`}
                className="btn btn-primary"
                style={{ height: "48px", width: "100%" }}
              >
                <i className="fa-solid fa-arrow-right"></i> Find Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5 CORE CATEGORIES ==================== */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}>
            <span className="section-badge"><i className="fa-solid fa-cubes"></i> Core Specializations</span>
            <h2 className="section-title">Explore Our <span>5 Core Categories</span></h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              From heavy-duty commercial transport and automotive batteries to next-gen lithium home storage and government-subsidized rooftop solar systems.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <Link href={`/products?category=${cat.id}`} key={cat.id} className="category-card">
                <div className="cat-card-img-wrap">
                  <img src={cat.image} alt={cat.name} className="cat-card-img" loading="lazy" />
                </div>
                <div className="cat-card-body">
                  <span className="cat-card-num">Category 0{idx + 1}</span>
                  <h3 className="cat-card-title">{cat.name}</h3>
                  <p className="cat-card-desc">{cat.description}</p>
                  <span className="cat-card-action">Explore Models &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BRANDS STRIP ==================== */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid var(--gray-200)", borderBottom: "1px solid var(--gray-200)", padding: "60px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "30px" }}>
            <div>
              <span className="section-badge"><i className="fa-solid fa-handshake"></i> Official Partnerships</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Authorized <span>Brand Partners</span></h2>
            </div>
            <Link href="/brands" className="btn btn-outline btn-sm">
              View All 14 Brands &rarr;
            </Link>
          </div>

          <div className="brands-grid">
            {brands.map((b) => (
              <Link href={`/brands/${b.slug}`} key={b.id} className="brand-card">
                <img src={b.logo} alt={b.name} className="brand-card-logo" />
                <span className="brand-card-name">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="section-padding" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "40px" }}>
            <div>
              <span className="section-badge solar"><i className="fa-solid fa-star"></i> Hand-Picked For You</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Featured <span>Battery &amp; Solar Products</span></h2>
            </div>
            <Link href="/products" className="btn btn-primary btn-sm">
              Open Full Catalogue &rarr;
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.slice(0, 8).map((prod) => (
              <ProductCard key={prod.id} product={prod} onQuickView={handleOpenModal} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SOLAR FEATURETTE & CALCULATOR ==================== */}
      <section className="section-padding">
        <div className="container">
          <div style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            borderRadius: "var(--radius-xl)",
            padding: "48px",
            color: "#FFFFFF",
            boxShadow: "var(--shadow-xl)"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              alignItems: "center"
            }}>
              <div>
                <span className="section-badge solar"><i className="fa-solid fa-sun"></i> PM Surya Ghar Yojana</span>
                <h2 style={{ fontSize: "2.2rem", color: "#FFFFFF", marginBottom: "16px" }}>
                  Cut Electricity Bills to <span style={{ color: "#FBBF24" }}>Zero with Solar Power</span>
                </h2>
                <p style={{ color: "#CBD5E1", fontSize: "1.05rem", marginBottom: "24px", lineHeight: 1.7 }}>
                  Pawan Traders is your certified rooftop solar EPC contractor in Puramufti, Prayagraj and Charwa, Kaushambi. Complete On-Grid net metering, Off-Grid storage, and Hybrid systems with up to ₹78,000 direct bank subsidy assistance.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "14px" }}>
                    <strong style={{ color: "#FBBF24", display: "block", fontSize: "1.1rem", marginBottom: "4px" }}>Tier-1 Mono PERC</strong>
                    <span style={{ fontSize: "0.85rem", color: "#E2E8F0" }}>550W+ High efficiency panels with 25 yrs warranty.</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "14px" }}>
                    <strong style={{ color: "#38BDF8", display: "block", fontSize: "1.1rem", marginBottom: "4px" }}>Smart Lithium &amp; Hybrid</strong>
                    <span style={{ fontSize: "0.85rem", color: "#E2E8F0" }}>Vion LiFePO4 batteries &amp; MPPT hybrid PCUs.</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Link href="/solar" className="btn btn-solar btn-lg">
                    <i className="fa-solid fa-solar-panel"></i> Full Solar Guide
                  </Link>
                  <button className="btn btn-white btn-lg" onClick={() => handleOpenModal({ name: "Rooftop Solar Plant Free Site Survey" })}>
                    <i className="fa-solid fa-clipboard-check"></i> Book Site Survey
                  </button>
                </div>
              </div>

              {/* Calculator */}
              <SolarCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BOTH BRANCHES ==================== */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}>
            <span className="section-badge"><i className="fa-solid fa-store"></i> Direct Showrooms</span>
            <h2 className="section-title">Visit Our <span>Prime Branches</span></h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Walk into either of our two convenient branches for free battery health checkups, same-day delivery, and instant warranty claims.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            {branches.map((b) => (
              <div key={b.id} style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--gray-200)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ background: "linear-gradient(135deg, #0F2D6B, #1D4ED8)", color: "#FFFFFF", padding: "24px" }}>
                  <span style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#FDE047",
                    marginBottom: "8px"
                  }}>
                    {b.isMain ? "★ MAIN HEAD BRANCH" : "★ AUTHORIZED BRANCH"}
                  </span>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#FFFFFF" }}>{b.name}</h3>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", color: "#64748B", textTransform: "uppercase" }}>Address</strong>
                    <div style={{ fontSize: "0.92rem", color: "var(--gray-800)" }}>{b.address}</div>
                    <small style={{ color: "#64748B" }}>Landmark: {b.landmark}</small>
                  </div>

                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", color: "#64748B", textTransform: "uppercase" }}>Calling Contact</strong>
                    <a href={`tel:+91${b.phone}`} style={{ color: "var(--primary)", fontWeight: 700, fontSize: "1.05rem" }}>
                      +91 {b.phone}
                    </a>
                  </div>

                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", color: "#64748B", textTransform: "uppercase" }}>Working Hours</strong>
                    <div style={{ fontSize: "0.9rem", color: "var(--gray-700)" }}>{b.hours}</div>
                  </div>

                  <iframe
                    src={b.mapEmbedUrl}
                    style={{ height: "180px", width: "100%", border: "none", borderRadius: "var(--radius-md)" }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
                    <a href={`tel:+91${b.phone}`} className="btn btn-call btn-sm">
                      <i className="fa-solid fa-phone"></i> Call Branch
                    </a>
                    <a href={b.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      <i className="fa-solid fa-diamond-turn-right"></i> Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedProduct={selectedProduct}
      />
    </>
  );
}

