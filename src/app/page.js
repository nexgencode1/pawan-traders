"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { INITIAL_DATA } from "@/data/pawanData";
import ProductCard from "@/components/ProductCard";
import SolarCalculator from "@/components/SolarCalculator";
import QuickEnquiryModal from "@/components/QuickEnquiryModal";
import HeroSlider from "@/components/HeroSlider";
import BranchMap from "@/components/BranchMap";

export default function HomePage() {
  const { settings, categories, brands, products, branches } = INITIAL_DATA;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (prod = null) => {
    setSelectedProduct(prod);
    setModalOpen(true);
  };

  const featuredProducts = products.filter((p) => p.featured && p.published);

  return (
    <>
      {/* ==================== 1. HERO SECTION SLIDER ==================== */}
      <HeroSlider />

      {/* ==================== 2. 5 CORE CATEGORIES ==================== */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}
          >
            <span className="section-badge">
              <i className="fa-solid fa-cubes"></i> Core Specializations
            </span>
            <h2 className="section-title">
              Explore Our <span>5 Core Categories</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              From heavy-duty commercial transport and automotive batteries to next-gen lithium home storage and government-subsidized rooftop solar systems.
            </p>
          </motion.div>

          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                style={{ display: "flex", height: "100%" }}
              >
                <Link
                  href={`/products?category=${cat.id}`}
                  className="category-card"
                  style={{ width: "100%", display: "flex", flexDirection: "column" }}
                >
                  <div className="cat-card-img-wrap">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="cat-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="cat-card-body">
                    <span className="cat-card-num">Category 0{idx + 1}</span>
                    <h3 className="cat-card-title">{cat.name}</h3>
                    <p className="cat-card-desc">{cat.description}</p>
                    <span className="cat-card-action">Explore Models &rarr;</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 3. BRANDS STRIP - RIGHT TO LEFT CONTINUOUS MARQUEE ==================== */}
      <section
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid var(--gray-200)",
          borderBottom: "1px solid var(--gray-200)",
          padding: "50px 0 45px",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "26px",
            }}
          >
            <div>
              <span className="section-badge">
                <i className="fa-solid fa-handshake"></i> Official Partnerships
              </span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Authorized <span>Brand Partners</span>
              </h2>
            </div>
            <Link href="/brands" className="btn btn-outline btn-sm">
              View All 14 Brands &rarr;
            </Link>
          </div>

          <div className="brands-marquee-wrapper" title="Hover to pause">
            <div className="brands-marquee-track">
              {[...brands, ...brands].map((b, idx) => (
                <Link
                  key={`${b.id}-${idx}`}
                  href={`/brands/${b.slug}`}
                  className="brand-card-marquee"
                >
                  <img
                    src={b.logo}
                    alt={b.name}
                    style={{ height: "40px", width: "auto", objectFit: "contain", marginBottom: "8px" }}
                  />
                  <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1E293B" }}>
                    {b.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. FEATURED PRODUCTS (STRICTLY 3 CARDS + REDIRECT BUTTON) ==================== */}
      <section className="section-padding" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <div>
              <span className="section-badge solar">
                <i className="fa-solid fa-star"></i> Hand-Picked For You
              </span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Featured <span>Battery &amp; Solar Products</span>
              </h2>
            </div>
            <Link href="/products" className="btn btn-primary btn-sm">
              Open Full Catalogue &rarr;
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.slice(0, 3).map((prod, idx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <ProductCard product={prod} onQuickView={handleOpenModal} />
              </motion.div>
            ))}
          </div>

          {/* Prominent Redirect Button to full catalogue */}
          <div style={{ textAlign: "center", marginTop: "44px" }}>
            <Link
              href="/products"
              className="btn btn-primary btn-lg"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 34px",
                fontSize: "1.05rem",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 8px 24px rgba(29, 78, 216, 0.25)",
              }}
            >
              <span>Explore All 20+ Models in Full Catalogue</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== 5. VISIT OUR PRIME BRANCHES (MOVED UP FOR FAST CUSTOMER ACCESS) ==================== */}
      <section className="section-padding" style={{ background: "#FFFFFF", borderTop: "1px solid var(--gray-200)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}
          >
            <span className="section-badge">
              <i className="fa-solid fa-store"></i> Direct Showrooms
            </span>
            <h2 className="section-title">
              Visit Our <span>Prime Branches</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Walk into either of our two convenient branches for free battery health checkups, same-day delivery, and instant warranty claims.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "30px",
            }}
          >
            {branches.map((b, idx) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--gray-200)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #0F2D6B, #1D4ED8)",
                    color: "#FFFFFF",
                    padding: "24px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: "rgba(255,255,255,0.15)",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#FDE047",
                      marginBottom: "8px",
                    }}
                  >
                    {b.isMain ? "★ MAIN HEAD BRANCH" : "★ AUTHORIZED BRANCH"}
                  </span>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#FFFFFF" }}>
                    {b.name}
                  </h3>
                </div>

                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        color: "#64748B",
                        textTransform: "uppercase",
                      }}
                    >
                      Address
                    </strong>
                    <div style={{ fontSize: "0.92rem", color: "var(--gray-800)" }}>{b.address}</div>
                    <small style={{ color: "#64748B" }}>Landmark: {b.landmark}</small>
                  </div>

                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        color: "#64748B",
                        textTransform: "uppercase",
                      }}
                    >
                      Calling Contact
                    </strong>
                    <a
                      href={`tel:+91${b.phone}`}
                      style={{ color: "var(--primary)", fontWeight: 700, fontSize: "1.05rem" }}
                    >
                      +91 {b.phone}
                    </a>
                  </div>

                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        color: "#64748B",
                        textTransform: "uppercase",
                      }}
                    >
                      Working Hours
                    </strong>
                    <div style={{ fontSize: "0.9rem", color: "var(--gray-700)" }}>{b.hours}</div>
                  </div>

                  {/* Resilient interactive BranchMap */}
                  <BranchMap branch={b} />

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <a href={`tel:+91${b.phone}`} className="btn btn-call btn-sm">
                      <i className="fa-solid fa-phone"></i> Call Branch
                    </a>
                    <a
                      href={b.mapDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <i className="fa-solid fa-diamond-turn-right"></i> Directions
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 6. MEET OUR FOUNDER & LEADERSHIP (1 CARD PER 100VH, 60VW WIDTH) ==================== */}
      <section style={{ background: "var(--gray-50)", borderTop: "1px solid var(--gray-200)" }}>
        {/* Section Title Header */}
        <div className="container" style={{ paddingTop: "70px", paddingBottom: "10px", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: "720px", margin: "0 auto" }}
          >
            <span className="section-badge">
              <i className="fa-solid fa-users"></i> Executive Leadership
            </span>
            <h2 className="section-title">
              Meet Our <span>Founding Leadership</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Committed to providing 100% genuine batteries, expert technical guidance, and transparent wholesale pricing across Prayagraj &amp; Kaushambi.
            </p>
          </motion.div>
        </div>

        {/* 100VH SPOTLIGHT 1: DIRECTOR & FOUNDER (60VW CARD) */}
        <div className="leadership-spotlight-section-100vh">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="leadership-card-60vw"
          >
            <div className="leadership-photo-pane">
              <div className="leadership-photo-frame">
                <img
                  src="/director.jpeg"
                  alt="Mr. Pawan Kumar Kushwaha"
                />
              </div>
            </div>

            <div className="leadership-info-pane">
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
                  marginBottom: "12px",
                  width: "fit-content",
                }}
              >
                ★ Director &amp; Founder
              </span>

              <h3 style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)", fontWeight: 900, color: "#0F172A", marginBottom: "6px" }}>
                Mr. Pawan Kumar Kushwaha
              </h3>

              <div style={{ color: "#2563EB", fontSize: "1.02rem", fontWeight: 700, marginBottom: "18px" }}>
                15+ Years in Power Storage &amp; Solar Distribution
              </div>

              <blockquote
                style={{
                  fontSize: "0.95rem",
                  color: "#475569",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  marginBottom: "24px",
                  background: "#F8FAFC",
                  padding: "16px 22px",
                  borderRadius: "var(--radius-md)",
                  borderLeft: "4px solid var(--primary)",
                }}
              >
                &ldquo;At Pawan Traders, every customer receives certified original products with manufacturer warranty registration. We stand behind every battery and solar panel we sell, ensuring complete trust.&rdquo;
              </blockquote>

              <div>
                <a
                  href={`tel:+91${settings.callingNumber}`}
                  className="btn btn-primary"
                  style={{ padding: "12px 28px", fontSize: "0.95rem", borderRadius: "10px", display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <i className="fa-solid fa-phone"></i> Call Director: +91 {settings.callingNumber}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 100VH SPOTLIGHT 2: GENERAL MANAGER (60VW CARD) */}
        <div className="leadership-spotlight-section-100vh" style={{ paddingTop: "0" }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="leadership-card-60vw"
            style={{ border: "1px solid rgba(245, 158, 11, 0.25)" }}
          >
            <div className="leadership-photo-pane" style={{ background: "linear-gradient(145deg, #1C1917 0%, #292524 60%, #1E293B 100%)" }}>
              <div className="leadership-photo-frame" style={{ borderColor: "rgba(245, 158, 11, 0.25)" }}>
                <img
                  src="/manager.jpeg"
                  alt="Mr. Kartik Kushwaha"
                />
              </div>
            </div>

            <div className="leadership-info-pane">
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
                  marginBottom: "12px",
                  width: "fit-content",
                }}
              >
                ★ General Manager &amp; Technical Operations
              </span>

              <h3 style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)", fontWeight: 900, color: "#0F172A", marginBottom: "6px" }}>
                Mr. Kartik Kushwaha
              </h3>

              <div style={{ color: "#D97706", fontSize: "1.02rem", fontWeight: 700, marginBottom: "18px" }}>
                Rooftop Solar EPC &amp; Store Dispatch Specialist
              </div>

              <blockquote
                style={{
                  fontSize: "0.95rem",
                  color: "#475569",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  marginBottom: "24px",
                  background: "#F8FAFC",
                  padding: "16px 22px",
                  borderRadius: "var(--radius-md)",
                  borderLeft: "4px solid var(--solar)",
                }}
              >
                &ldquo;Overseeing customer technical enquiries, fast same-day doorstep dispatch, and rooftop solar engineering teams across both our Puramufti and Charwa branches.&rdquo;
              </blockquote>

              <div>
                <a
                  href={`tel:+91${settings.managerContact || "9305839018"}`}
                  className="btn btn-solar"
                  style={{ padding: "12px 28px", fontSize: "0.95rem", borderRadius: "10px", display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <i className="fa-solid fa-phone"></i> Call Manager: +91 {settings.managerContact || "9305839018"}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 7. PHOTO & INSTALLATION GALLERY HIGHLIGHT (REAL STORE PHOTOS) ==================== */}
      <section className="section-padding" style={{ background: "#F1F5F9" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "36px",
            }}
          >
            <div>
              <span className="section-badge">
                <i className="fa-solid fa-camera"></i> Live Work Showcase
              </span>
              <h2 className="section-title" style={{ marginBottom: "8px" }}>
                Recent <span>Installations &amp; Gallery</span>
              </h2>
              <p className="section-subtitle">
                Real photos of solar rooftops, lithium storage, inverter banks, and Puramufti &amp; Charwa shops.
              </p>
            </div>
            <div>
              <Link href="/gallery" className="btn btn-primary">
                <i className="fa-solid fa-images"></i> View Full Gallery (24 Photos)
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            <motion.div
              whileHover={{ y: -6 }}
              className="hover-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
              }}
            >
              <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                <img
                  src="/assets/images/gallery/gallery-01.jpg"
                  alt="Pawan Traders Puramufti Showroom Front"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "18px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase" }}>
                  Main Branch Showroom
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>
                  Puramufti Head Office &amp; Retail Hub
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "4px" }}>
                  Full inventory of Amaron, Exide, and Luminous batteries ready for dispatch on GT Road Puramufti.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="hover-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
              }}
            >
              <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                <img
                  src="/assets/images/gallery/gallery-02.jpg"
                  alt="Rooftop Solar Plant Installation"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "18px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#F59E0B", textTransform: "uppercase" }}>
                  Solar Installation
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>
                  Mono-PERC Rooftop Solar Plant
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "4px" }}>
                  High efficiency PM Surya Ghar subsidy approved on-grid solar plant in Prayagraj region.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="hover-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
              }}
            >
              <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                <img
                  src="/assets/images/gallery/gallery-03.jpg"
                  alt="Inverter & Battery Stock"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "18px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", textTransform: "uppercase" }}>
                  Power Storage
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>
                  Inverter &amp; Tubular Battery Stock
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "4px" }}>
                  Heavy-duty inverter and tubular battery solutions tested and dispatched same-day.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== 8. SOLAR FEATURETTE & CALCULATOR ==================== */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
              borderRadius: "var(--radius-xl)",
              padding: "clamp(24px, 4vw, 44px)",
              color: "#FFFFFF",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <div>
                <span className="section-badge solar">
                  <i className="fa-solid fa-sun"></i> PM Surya Ghar Yojana
                </span>
                <h2 style={{ fontSize: "2.2rem", color: "#FFFFFF", marginBottom: "16px" }}>
                  Cut Electricity Bills to <span style={{ color: "#FBBF24" }}>Zero with Solar Power</span>
                </h2>
                <p style={{ color: "#CBD5E1", fontSize: "1.05rem", marginBottom: "24px", lineHeight: 1.7 }}>
                  Pawan Traders is your certified rooftop solar EPC contractor in Puramufti, Prayagraj and Charwa, Kaushambi. Complete On-Grid net metering, Off-Grid storage, and Hybrid systems with up to ₹78,000 direct bank subsidy assistance.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
                    gap: "16px",
                    marginBottom: "28px",
                  }}
                >
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "14px" }}>
                    <strong style={{ color: "#FBBF24", display: "block", fontSize: "1.1rem", marginBottom: "4px" }}>
                      Tier-1 Mono PERC
                    </strong>
                    <span style={{ fontSize: "0.85rem", color: "#E2E8F0" }}>
                      550W+ High efficiency panels with 25 yrs warranty.
                    </span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "14px" }}>
                    <strong style={{ color: "#38BDF8", display: "block", fontSize: "1.1rem", marginBottom: "4px" }}>
                      Smart Lithium &amp; Hybrid
                    </strong>
                    <span style={{ fontSize: "0.85rem", color: "#E2E8F0" }}>
                      Vion LiFePO4 batteries &amp; MPPT hybrid PCUs.
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Link href="/solar" className="btn btn-solar btn-lg">
                    <i className="fa-solid fa-solar-panel"></i> Full Solar Guide
                  </Link>
                  <button
                    className="btn btn-white btn-lg"
                    onClick={() => handleOpenModal({ name: "Rooftop Solar Plant Free Site Survey" })}
                  >
                    <i className="fa-solid fa-clipboard-check"></i> Book Site Survey
                  </button>
                </div>
              </div>

              {/* Calculator */}
              <SolarCalculator />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Enquiry Modal */}
      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedProduct={selectedProduct}
      />
    </>
  );
}
