"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export const DEFAULT_HERO_SLIDES = [
  {
    _id: "slide-1",
    imageUrl: "/assets/images/categories/solar.svg",
    title: "Official Battery & Solar Energy Superstore for Prayagraj & Kaushambi",
    badge: "100% Authorized Hub",
    button1Text: "Explore Products",
    button1Link: "/products",
    button2Text: "Solar Subsidy Calculator",
    button2Link: "/solar",
    order: 1,
    active: true,
  },
  {
    _id: "slide-2",
    imageUrl: "/assets/images/categories/lithium.svg",
    title: "Advanced LiFePO4 Lithium Storage & Tall Tubular Inverter Setups",
    badge: "Vion Lithium Authorized",
    button1Text: "View Lithium Range",
    button1Link: "/products",
    button2Text: "Get WhatsApp Quote",
    button2Link: "https://wa.me/918299362360?text=Hello%20Pawan%20Traders,%20I%20need%20a%20quote%20for%20Lithium%20Inverter.",
    order: 2,
    active: true,
  },
  {
    _id: "slide-3",
    imageUrl: "/assets/images/categories/automotive.svg",
    title: "", // Optional text!
    badge: "Same-Day Delivery & Free Fitting",
    button1Text: "Call Puramufti: 9935618513",
    button1Link: "tel:+919935618513",
    button2Text: "Call Charwa: 9305839018",
    button2Link: "tel:+919305839018",
    order: 3,
    active: true,
  },
];

export default function HeroSlider({ initialSlides = DEFAULT_HERO_SLIDES }) {
  const [slides, setSlides] = useState(
    initialSlides && initialSlides.length > 0 ? initialSlides : DEFAULT_HERO_SLIDES
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Background fetch to load custom slides from DB if available
  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await fetch("/api/hero-slides");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.slides && data.slides.length > 0) {
            setSlides(data.slides);
          }
        }
      } catch (err) {
        // Fallback safely preserved
      }
    }
    loadSlides();
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timerRef.current);
  }, [slides.length, isPaused, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex] || slides[0] || DEFAULT_HERO_SLIDES[0];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "relative",
        minHeight: "clamp(460px, 62vh, 600px)",
        overflow: "hidden",
        backgroundColor: "#050B18",
        color: "#FFFFFF",
      }}
      aria-label="Featured Highlights Slider"
    >
      {/* Background Image Container with Crossfade Effect */}
      {slides.map((slide, idx) => (
        <div
          key={slide._id || idx}
          style={{
            position: "absolute",
            inset: 0,
            opacity: idx === currentIndex ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 1,
            pointerEvents: idx === currentIndex ? "auto" : "none",
          }}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title || "Pawan Traders Hero Slide"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: idx === currentIndex ? "scale(1.02)" : "scale(1.08)",
              transition: "transform 7s ease-out",
            }}
          />
          {/* Multi-layer Gradient Overlay for Ultra Readability without blacking out photo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(5, 11, 24, 0.88) 0%, rgba(5, 11, 24, 0.65) 55%, rgba(5, 11, 24, 0.45) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 30% 50%, rgba(29, 78, 216, 0.22) 0%, transparent 70%)",
            }}
          />
        </div>
      ))}

      {/* Slide Content Layer */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "clamp(460px, 62vh, 600px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "40px",
          paddingBottom: "50px",
        }}
      >
        <div style={{ maxWidth: "780px" }}>
          {/* Badge (Optional) */}
          {currentSlide.badge && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                background: "rgba(245, 158, 11, 0.18)",
                border: "1px solid rgba(245, 158, 11, 0.45)",
                color: "#FDE047",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "16px",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 14px rgba(245, 158, 11, 0.15)",
              }}
            >
              <i className="fa-solid fa-certificate"></i> {currentSlide.badge}
            </div>
          )}

          {/* SINGLE TEXT (OPTIONAL AS REQUESTED) */}
          {currentSlide.title && currentSlide.title.trim() !== "" ? (
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4.5vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.18,
                color: "#FFFFFF",
                marginBottom: "24px",
                letterSpacing: "-0.02em",
                textShadow: "0 4px 18px rgba(0, 0, 0, 0.6)",
              }}
            >
              {currentSlide.title}
            </h1>
          ) : null}

          {/* TWO ACTION BUTTONS (Configurable from Admin) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: currentSlide.title ? "0px" : "14px",
              marginBottom: "32px",
            }}
          >
            {/* Button 1 */}
            {currentSlide.button1Text && (
              <a
                href={currentSlide.button1Link || "/products"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 26px",
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  color: "#0F172A",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  boxShadow: "0 8px 24px rgba(245, 158, 11, 0.35)",
                  transition: "var(--transition)",
                  border: "none",
                  cursor: "pointer",
                }}
                className="hover-lift"
              >
                <i className="fa-solid fa-arrow-right"></i> {currentSlide.button1Text}
              </a>
            )}

            {/* Button 2 */}
            {currentSlide.button2Text && (
              <a
                href={currentSlide.button2Link || "https://wa.me/918299362360"}
                target={currentSlide.button2Link?.startsWith("http") ? "_blank" : "_self"}
                rel={currentSlide.button2Link?.startsWith("http") ? "noopener noreferrer" : ""}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 26px",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(12px)",
                  transition: "var(--transition)",
                  cursor: "pointer",
                }}
                className="hover-lift"
              >
                {currentSlide.button2Link?.includes("wa.me") ? (
                  <i className="fa-brands fa-whatsapp" style={{ color: "#25D366" }}></i>
                ) : (
                  <i className="fa-solid fa-sparkles" style={{ color: "#FDE047" }}></i>
                )}
                {currentSlide.button2Text}
              </a>
            )}
          </div>

          {/* Quick Value Pillars */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "rgba(245, 158, 11, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#F59E0B",
                  fontSize: "0.85rem"
                }}
              >
                <i className="fa-solid fa-shield-check"></i>
              </div>
              <div>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#FFFFFF", display: "block" }}>
                  100% Original Brand Warranty
                </span>
                <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Amaron, Exide, Vion &amp; Luminous</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10B981",
                  fontSize: "0.85rem"
                }}
              >
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#FFFFFF", display: "block" }}>
                  2 Major Regional Branches
                </span>
                <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Puramufti (Prayagraj) &amp; Charwa (Kaushambi)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls (Arrows & Slide Counter) */}
      {slides.length > 1 && (
        <>
          {/* Prev Arrow */}
          <button
            onClick={goToPrev}
            aria-label="Previous slide"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "var(--transition)",
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Next Arrow */}
          <button
            onClick={goToNext}
            aria-label="Next slide"
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "var(--transition)",
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          {/* Bottom Dots & Slide Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "0",
              right: "0",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "var(--radius-full)",
                  background: idx === currentIndex ? "#F59E0B" : "rgba(255, 255, 255, 0.35)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
            <span
              style={{
                marginLeft: "10px",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#94A3B8",
                letterSpacing: "0.05em",
              }}
            >
              {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </>
      )}
    </section>
  );
}
