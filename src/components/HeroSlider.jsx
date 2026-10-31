"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSlider({ initialSlides = [] }) {
  const [slides, setSlides] = useState(initialSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(initialSlides.length === 0);
  const timerRef = useRef(null);

  // Load slides from API if not provided or to keep updated
  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await fetch("/api/hero-slides");
        const data = await res.json();
        if (data.success && data.slides?.length > 0) {
          setSlides(data.slides);
        }
      } catch (err) {
        console.warn("Could not fetch slides from API, using defaults:", err);
      } finally {
        setLoading(false);
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

  if (loading || slides.length === 0) {
    return (
      <div style={{
        minHeight: "480px",
        background: "linear-gradient(135deg, #091E42 0%, #0F2D6B 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#94A3B8"
      }}>
        <div style={{ textAlign: "center" }}>
          <i className="fa-solid fa-circle-notch fa-spin fa-2x" style={{ color: "#F59E0B", marginBottom: "12px" }}></i>
          <p>Loading Hero Showcase...</p>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "relative",
        minHeight: "560px",
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
          {/* Multi-layer Gradient Overlay for Ultra Readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(5, 11, 24, 0.95) 0%, rgba(5, 11, 24, 0.82) 45%, rgba(5, 11, 24, 0.4) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 20% 50%, rgba(29, 78, 216, 0.25) 0%, transparent 60%)",
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
          minHeight: "560px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "70px",
          paddingBottom: "80px",
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
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                color: "#FDE047",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "20px",
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
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#FFFFFF",
                marginBottom: "28px",
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
              gap: "16px",
              flexWrap: "wrap",
              marginTop: currentSlide.title ? "0px" : "20px",
              marginBottom: "36px",
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
                  padding: "14px 28px",
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  color: "#0F172A",
                  fontWeight: 800,
                  fontSize: "1rem",
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
                  padding: "14px 28px",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "1rem",
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
              gap: "28px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(245, 158, 11, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#F59E0B",
                }}
              >
                <i className="fa-solid fa-shield-check"></i>
              </div>
              <div>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF", display: "block" }}>
                  100% Original Brand Warranty
                </span>
                <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Amaron, Exide, Vion &amp; Luminous</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10B981",
                }}
              >
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF", display: "block" }}>
                  2 Major Regional Branches
                </span>
                <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Puramufti (Prayagraj) &amp; Charwa (Kaushambi)</span>
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
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              fontSize: "1.1rem",
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
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              fontSize: "1.1rem",
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
              bottom: "24px",
              left: "0",
              right: "0",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? "32px" : "10px",
                  height: "10px",
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
                marginLeft: "12px",
                fontSize: "0.8rem",
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

