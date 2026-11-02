"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { INITIAL_DATA, buildWhatsAppUrl } from "@/data/pawanData";
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
      {/* ==================== HERO SECTION SLIDER ==================== */}
      <HeroSlider />

      {/* ==================== 5 CORE CATEGORIES ==================== */}
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

      {/* ==================== BRANDS STRIP ==================== */}
      <section
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid var(--gray-200)",
          borderBottom: "1px solid var(--gray-200)",
          padding: "60px 0",
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
              marginBottom: "30px",
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

          <div className="brands-grid">
            {brands.map((b, idx) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (idx % 7) * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/brands/${b.slug}`} className="brand-card">
                  <img src={b.logo} alt={b.name} className="brand-card-logo" />
                  <span className="brand-card-name">{b.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
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
            {featuredProducts.slice(0, 8).map((prod, idx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -6 }}
              >
                <ProductCard product={prod} onQuickView={handleOpenModal} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SOLAR FEATURETTE & CALCULATOR ==================== */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
              borderRadius: "var(--radius-xl)",
              padding: "clamp(20px, 4vw, 40px)",
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

      {/* ==================== PHOTO & INSTALLATION GALLERY HIGHLIGHT ==================== */}
      <section className="section-padding" style={{ background: "#F1F5F9" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "40px",
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
                <i className="fa-solid fa-images"></i> View Full Gallery
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
              <div
                style={{
                  height: "200px",
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                <img
                  src="/assets/images/categories/solar.svg"
                  alt="Rooftop Solar Plant"
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ padding: "18px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#F59E0B",
                    textTransform: "uppercase",
                  }}
                >
                  Solar Installation
                </span>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginTop: "4px",
                  }}
                >
                  10kW Rooftop On-Grid Solar Plant
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "4px" }}>
                  PM Surya Ghar verified installation in Prayagraj region.
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
              <div
                style={{
                  height: "200px",
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                <img
                  src="/assets/images/categories/lithium.svg"
                  alt="Vion Lithium Storage"
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ padding: "18px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#10B981",
                    textTransform: "uppercase",
                  }}
                >
                  Lithium Storage
                </span>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginTop: "4px",
                  }}
                >
                  Vion LiFePO4 Inverter Battery Setup
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "4px" }}>
                  Wall mounted smart lithium system for uninterrupted backup.
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
              <div
                style={{
                  height: "200px",
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                <img
                  src="/assets/images/categories/automotive.svg"
                  alt="Puramufti Showroom"
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ padding: "18px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#1D4ED8",
                    textTransform: "uppercase",
                  }}
                >
                  Branches
                </span>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginTop: "4px",
                  }}
                >
                  Puramufti Main Branch Showroom
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "4px" }}>
                  GT Road Puramufti inventory of Amaron &amp; Exide batteries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== BOTH BRANCHES ==================== */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
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

      {/* ==================== LEADERSHIP SECTION ==================== */}
      <section className="section-padding" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}
          >
            <span className="section-badge">
              <i className="fa-solid fa-users"></i> Dedicated Leadership
            </span>
            <h2 className="section-title">
              Meet Our <span>Founding Leadership</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Committed to providing authentic batteries, expert technical guidance, and transparent pricing across Prayagraj &amp; Kaushambi.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "30px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {/* Director */}
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 15px 35px rgba(30, 58, 138, 0.15)" }}
              className="hover-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                padding: "30px 24px",
                textAlign: "center",
                border: "1px solid var(--gray-200)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  height: "300px",
                  borderRadius: "14px",
                  margin: "0 auto 20px",
                  overflow: "hidden",
                  border: "3px solid #1E3A8A",
                  boxShadow: "0 10px 25px rgba(30,58,138,0.2)",
                  background: "linear-gradient(135deg, #0A1128 0%, #1E293B 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px",
                }}
              >
                <img
                  src="/director.jpeg"
                  alt="Mr. Pawan Kumar Kushwaha"
                  style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "8px" }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--gray-900)",
                  marginBottom: "4px",
                }}
              >
                Mr. Pawan Kumar Kushwaha
              </h3>
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(30,58,138,0.1)",
                  color: "#1E3A8A",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                Director &amp; Founder
              </span>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--gray-600)",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                }}
              >
                Leading Pawan Traders with 15+ years of excellence, dedicated to authentic quality and trusted customer relationships.
              </p>
              <a
                href="tel:+919935618513"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--primary)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                <i className="fa-solid fa-phone"></i> +91 9935618513
              </a>
            </motion.div>

            {/* Manager */}
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 15px 35px rgba(245, 158, 11, 0.15)" }}
              className="hover-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                padding: "30px 24px",
                textAlign: "center",
                border: "1px solid var(--gray-200)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  height: "300px",
                  borderRadius: "14px",
                  margin: "0 auto 20px",
                  overflow: "hidden",
                  border: "3px solid #F59E0B",
                  boxShadow: "0 10px 25px rgba(245,158,11,0.2)",
                  background: "linear-gradient(135deg, #0A1128 0%, #1E293B 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px",
                }}
              >
                <img
                  src="/manager.jpeg"
                  alt="Mr. Kartik Kushwaha"
                  style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "8px" }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--gray-900)",
                  marginBottom: "4px",
                }}
              >
                Mr. Kartik Kushwaha
              </h3>
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(245,158,11,0.1)",
                  color: "#D97706",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                General Manager &amp; Technical Head
              </span>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--gray-600)",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                }}
              >
                Overseeing store operations, solar installations, technical customer support, and seamless same-day service delivery.
              </p>
              <a
                href="tel:+919935618513"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--primary)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                <i className="fa-solid fa-phone"></i> +91 9935618513
              </a>
            </motion.div>
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
