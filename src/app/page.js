"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { INITIAL_DATA } from "@/data/pawanData";
import ProductCard from "@/components/ProductCard";
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

      {/* ==================== 5. PHOTO & INSTALLATION GALLERY HIGHLIGHT (REAL STORE PHOTOS) ==================== */}
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

      {/* ==================== 6. EXECUTIVE LEADERSHIP SPOTLIGHT (EXACT MAHADEV MOTORS UI) ==================== */}
      <section className="executive-spotlight-section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div className="executive-spotlight-container">
          {/* Row 1: Director & Founder */}
          <div className="executive-spotlight-row">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="executive-spotlight-content"
            >
              <span className="executive-spotlight-eyebrow">
                MEET OUR DIRECTOR
              </span>
              <h2 className="executive-spotlight-name">
                Mr. Pawan Kumar Kushwaha
              </h2>
              <a href={`tel:+91${settings.callingNumber}`} className="executive-spotlight-phone">
                <i className="fa-solid fa-phone"></i>
                <span>+91 {settings.callingNumber}</span>
              </a>
              <p className="executive-spotlight-bio">
                A visionary leader with a deep passion for automotive energy storage and solar power distribution, Mr. Pawan Kumar Kushwaha founded Pawan Traders with a simple goal &mdash; to create a dealership built on 100% genuine brand products, fair wholesale transparency, and authentic customer trust.
              </p>
              <div className="executive-spotlight-signature">
                <span className="executive-spotlight-sign-name">
                  Pawan Kumar Kushwaha
                </span>
                <span className="executive-spotlight-sign-role">
                  DIRECTOR, PAWAN TRADERS
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="executive-spotlight-image-card"
            >
              <img
                src="/director.jpeg"
                alt="Mr. Pawan Kumar Kushwaha - Director & Founder"
              />
              <div className="executive-spotlight-quote-overlay">
                &ldquo;Leadership is about service, trust, and creating real lasting value for people.&rdquo;
              </div>
            </motion.div>
          </div>

          {/* Row 2: General Manager & Technical Operations */}
          <div className="executive-spotlight-row" style={{ paddingTop: "40px", borderTop: "1px solid var(--gray-200)" }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="executive-spotlight-content"
            >
              <span className="executive-spotlight-eyebrow" style={{ color: "var(--solar-hover)" }}>
                MEET OUR GENERAL MANAGER
              </span>
              <h2 className="executive-spotlight-name">
                Mr. Kartik Kushwaha
              </h2>
              <a href={`tel:+91${settings.managerContact || "9305839018"}`} className="executive-spotlight-phone" style={{ color: "var(--solar-hover)" }}>
                <i className="fa-solid fa-phone"></i>
                <span>+91 {settings.managerContact || "9305839018"}</span>
              </a>
              <p className="executive-spotlight-bio">
                Overseeing technical customer enquiries, rooftop solar EPC engineering, and same-day express doorstep dispatch, Mr. Kartik Kushwaha manages computerized battery testing benches and installation teams across both our Puramufti and Charwa branches.
              </p>
              <div className="executive-spotlight-signature">
                <span className="executive-spotlight-sign-name" style={{ color: "var(--solar-hover)" }}>
                  Kartik Kushwaha
                </span>
                <span className="executive-spotlight-sign-role">
                  GENERAL MANAGER &amp; TECHNICAL HEAD, PAWAN TRADERS
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="executive-spotlight-image-card"
            >
              <img
                src="/manager.jpeg"
                alt="Mr. Kartik Kushwaha - General Manager"
              />
              <div className="executive-spotlight-quote-overlay">
                &ldquo;Excellence is about fast doorstep service, computerized battery testing, and flawless rooftop solar execution.&rdquo;
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== 7. VISIT OUR PRIME BRANCHES (DIRECTLY ABOVE SOLAR CALCULATOR) ==================== */}
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

      {/* ==================== 8. CUSTOMER TESTIMONIALS & REVIEWS ==================== */}
      <section className="section-padding" style={{ background: "#F8FAFC", borderTop: "1px solid var(--gray-200)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 50px" }}>
            <span className="section-badge solar" style={{ margin: "0 auto 12px" }}>
              <i className="fa-solid fa-star"></i> 4.9/5 Rating &bull; 10,000+ Happy Customers
            </span>
            <h2 className="section-title">
              What Our Customers Say Across <span>Prayagraj &amp; Kaushambi</span>
            </h2>
            <p className="section-subtitle">
              Authentic reviews from homeowners, vehicle owners, and commercial establishments who rely on Pawan Traders for genuine batteries, fast doorstep service, and rooftop solar installations.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            {[
              {
                id: "test-1",
                name: "Dr. Arvind Mishra",
                role: "Senior Physician",
                location: "Civil Lines, Prayagraj",
                stars: 5,
                product: "5kW On-Grid Rooftop Solar Plant",
                review: "Installed a 5kW rooftop solar plant at my clinic & residence through Pawan Traders under PM Surya Ghar Yojana. The paperwork was completely seamless and the ₹78,000 direct bank subsidy was credited without any hassle. My monthly electricity bill dropped from ₹8,500 to almost zero! Very professional execution by Kartik ji and team.",
                date: "Verified Solar Buyer",
                initials: "AM",
                badgeColor: "#10B981"
              },
              {
                id: "test-2",
                name: "Rajesh Kesarwani",
                role: "Wholesale Merchant",
                location: "Main Market, Puramufti",
                stars: 5,
                product: "Luminous 220Ah Tall Tubular Inverter Setup",
                review: "Pawan Traders has been our family store for over 12 years. Replaced our home inverter battery with a high-capacity Luminous tall tubular. Got the best exchange rate for our old battery, same-day doorstep delivery, and proper computerized warranty. Honest pricing and zero hidden charges.",
                date: "Verified Inverter Buyer",
                initials: "RK",
                badgeColor: "#1D4ED8"
              },
              {
                id: "test-3",
                name: "Er. Sandeep Patel",
                role: "Civil Engineer",
                location: "Phaphamau, Prayagraj",
                stars: 5,
                product: "Amaron Pro Car Battery Replacement",
                review: "My SUV battery broke down in the morning near Soraon. Called Pawan Traders and their technician arrived in 30 minutes with a fresh Amaron Pro battery, tested the alternator for free, and fitted it on the spot. Truly lifesaver emergency doorstep service!",
                date: "Verified Automotive Buyer",
                initials: "SP",
                badgeColor: "#F59E0B"
              },
              {
                id: "test-4",
                name: "Mohd. Tariq",
                role: "Lab Director",
                location: "Charwa Town, Kaushambi",
                stars: 5,
                product: "Vion Smart Lithium Battery & Hybrid PCU",
                review: "Installed a Vion LiFePO4 smart lithium battery for my diagnostic lab in Charwa. Fast charging in 2.5 hours and zero maintenance water topping. Staff at the Charwa branch in front of the petrol pump is extremely helpful and technically sound. Highly recommended!",
                date: "Verified Lithium Buyer",
                initials: "MT",
                badgeColor: "#8B5CF6"
              },
              {
                id: "test-5",
                name: "Anil Yadav",
                role: "Agro Business Owner",
                location: "Soraon, Prayagraj",
                stars: 5,
                product: "3kW Commercial Hybrid Solar System",
                review: "Got a 3kW hybrid solar system for my dairy and grain shop. Even during severe power cuts in peak summer, all heavy fans and refrigeration run without interruption. Best wholesale price in the entire Allahabad region.",
                date: "Verified Commercial Buyer",
                initials: "AY",
                badgeColor: "#059669"
              },
              {
                id: "test-6",
                name: "Rameshwar Tiwari",
                role: "Transport Owner",
                location: "Manjhanpur, Kaushambi",
                stars: 5,
                product: "Exide Tractor & Home Tubular Batteries",
                review: "Got both my tractor battery and home inverter battery from Pawan Traders. Genuine Exide products with direct company warranty. Fair rate and very honest advice from Pawan Kumar ji.",
                date: "Verified Battery Buyer",
                initials: "RT",
                badgeColor: "#D97706"
              }
            ].map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--gray-200)",
                  borderRadius: "16px",
                  padding: "26px",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  {/* Top Row: Avatar, Name, Location & Verified Check */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: t.badgeColor,
                          color: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "1rem",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <h4 style={{ fontSize: "1.02rem", fontWeight: 800, margin: 0, color: "var(--gray-900)" }}>
                          {t.name}
                        </h4>
                        <span style={{ fontSize: "0.8rem", color: "#64748B", display: "flex", alignItems: "center", gap: "4px" }}>
                          <i className="fa-solid fa-location-dot" style={{ color: "#EF4444", fontSize: "0.75rem" }}></i>
                          {t.location}
                        </span>
                      </div>
                    </div>
                    <span
                      style={{
                        background: "#ECFDF5",
                        color: "#059669",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        padding: "4px 8px",
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <i className="fa-solid fa-circle-check"></i> Verified
                    </span>
                  </div>

                  {/* Stars */}
                  <div style={{ display: "flex", gap: "3px", color: "#F59E0B", fontSize: "0.9rem", marginBottom: "12px" }}>
                    {[...Array(t.stars)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>

                  {/* Product purchased tag */}
                  <div style={{ marginBottom: "14px" }}>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "#1E293B",
                        background: "#F1F5F9",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        display: "inline-block",
                      }}
                    >
                      <i className="fa-solid fa-tag" style={{ color: "var(--primary)", marginRight: "6px" }}></i>
                      {t.product}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                {/* Footer Tag */}
                <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid var(--gray-100)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "#94A3B8" }}>
                  <span>{t.date}</span>
                  <span style={{ color: "#059669", fontWeight: 700 }}>
                    <i className="fa-solid fa-shield-check"></i> 100% Genuine Bill
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Review Action Callout */}
          <div
            style={{
              background: "linear-gradient(135deg, #091E42 0%, #1D4ED8 100%)",
              borderRadius: "16px",
              padding: "24px 30px",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 6px 0", color: "#FFFFFF" }}>
                Need Genuine Batteries or PM Surya Ghar Solar for Your Home?
              </h3>
              <p style={{ color: "#E0F2FE", fontSize: "0.92rem", margin: 0 }}>
                Get wholesale prices, instant old battery exchange, and doorstep delivery across Prayagraj &amp; Kaushambi.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={`tel:+91${settings.callingNumber || "9935618513"}`}
                className="btn btn-solar"
                style={{ padding: "10px 20px" }}
              >
                <i className="fa-solid fa-phone"></i> Call 9935618513
              </a>
              <button
                className="btn btn-white"
                onClick={() => handleOpenModal({ name: "General Battery & Solar Enquiry" })}
                style={{ padding: "10px 20px" }}
              >
                <i className="fa-solid fa-paper-plane"></i> Quick Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SEO: Hidden Local & 100km Regional Keyword Content (Visible to Crawlers) ==================== */}
      <section
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <h2>Best Battery Shop in Prayagraj Allahabad &amp; 100 KM Radius – Pawan Traders Puramufti &amp; Charwa</h2>
        <p>
          Pawan Traders is the premier authorized battery, inverter, and solar energy distributor covering Prayagraj (Allahabad), Kaushambi, and all neighboring districts within a 100 km radius.
          Main branch: GT Road, Puramufti, Prayagraj, UP 212208 (Phone: 9935618513). Second branch: Charwa Town, In Front of Petrol Pump, Kaushambi, UP 212203 (Phone: 9305839018).
          Authorized distributor for Amaron, Exide, Luminous, Microtek, Vion Lithium, UTL Solar, Tata Green, Livfast, and Smarten. Same-day express doorstep delivery and computerized battery health testing across Prayagraj, Soraon, Phaphamau, Naini, Jhunsi, Kunda Pratapgarh, Bharwari, Manjhanpur, and Fatehpur.
        </p>

        <h3>Local Suburbs &amp; 100 KM Coverage Areas:</h3>
        <ul>
          <li><strong>Prayagraj Local:</strong> Puramufti, Soraon, Phaphamau, Naini, Jhunsi, Civil Lines, Katra, Dhoomanganj, Mauaima, Shankargarh, Karchana, Handia, Meja, Holagarh, Jasra</li>
          <li><strong>Kaushambi District:</strong> Charwa, Manjhanpur, Sirathu, Bharwari, Chail, Muratganj, Karari, Sarai Akil, Ajhuwa, Saini, Mooratganj</li>
          <li><strong>Within 100 KM Corridor:</strong> Pratapgarh (Kunda, Lalganj Ajhara, Bela Pratapgarh, Raniganj), Fatehpur (Khaga, Bindki, Fatehpur City), Bhadohi (Gopiganj), Mirzapur, Chitrakoot Karwi</li>
          <li><strong>Bahar ki Leads / State Wholesale:</strong> Wholesale battery supplier Uttar Pradesh, bulk commercial solar EPC contractor UP, PM Surya Ghar Muft Bijli Yojana ₹78,000 direct bank subsidy distributor, lithium LiFePO4 battery wholesale UP</li>
        </ul>

        <h3>High Search Volume Local Keywords:</h3>
        <ul>
          <li>Battery shop in Soraon Prayagraj</li>
          <li>Phaphamau battery and inverter dealer</li>
          <li>Naini battery shop Allahabad</li>
          <li>Jhunsi inverter battery dealer</li>
          <li>Kunda Pratapgarh battery shop</li>
          <li>Fatehpur battery wholesale rate GT Road</li>
          <li>Manjhanpur Kaushambi solar panel installer</li>
          <li>Bharwari Kaushambi battery dealer</li>
          <li>Amaron car battery dealer Prayagraj Allahabad</li>
          <li>Exide inverter battery dealer Puramufti</li>
          <li>Luminous tubular inverter battery price Prayagraj</li>
          <li>Microtek hybrid solar inverter Kaushambi</li>
          <li>Vion lithium wall mount battery distributor UP</li>
          <li>PM Surya Ghar 3kW 5kW solar rooftop subsidy Allahabad</li>
          <li>Car battery replacement near me Prayagraj 24x7</li>
          <li>Old battery exchange wholesale offer Allahabad</li>
        </ul>
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
