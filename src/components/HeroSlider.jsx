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
    title: "Heavy-Duty Automotive & Tubular Batteries with Free Fitting",
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
        height: "clamp(340px, 48vw, 540px)",
        minHeight: "300px",
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
            overflow: "hidden",
            backgroundColor: "#050B18",
          }}
        >
          {/* Ambient soft backdrop to fill empty space with matching tones */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(30px) brightness(0.45)",
              transform: "scale(1.15)",
            }}
          />

          {/* Sharp Foreground image with 100% aspect ratio preserved (Zero Cropping) */}
          <img
            src={slide.imageUrl}
            alt=""
            aria-hidden="true"
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              transform: "none",
            }}
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          />

          {/* Subtle light translucent overlay for crisp image clarity with high button contrast */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              background: "linear-gradient(180deg, rgba(5, 11, 24, 0.1) 0%, rgba(5, 11, 24, 0.42) 100%)",
            }}
          />
        </div>
      ))}

      {/* Action Buttons Layer (Only Buttons - No Text Overlay) */}
      {(currentSlide.button1Text || currentSlide.button2Text) && (
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: "48px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              pointerEvents: "auto",
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
                  textDecoration: "none",
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
                  background: "rgba(15, 23, 42, 0.75)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                  transition: "var(--transition)",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                className="hover-lift"
              >
                {currentSlide.button2Link?.includes("wa.me") ? (
                  <i className="fa-brands fa-whatsapp" style={{ color: "#25D366", fontSize: "1.1rem" }}></i>
                ) : (
                  <i className="fa-solid fa-sparkles" style={{ color: "#FDE047" }}></i>
                )}
                {currentSlide.button2Text}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Navigation Controls (Arrows & Dots Only - No Text / Counter) */}
      {slides.length > 1 && (
        <>
          {/* Prev Arrow */}
          <button
            onClick={goToPrev}
            aria-label="Previous slide"
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
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
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
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

          {/* Bottom Dots Indicator (No 02/03 Text) */}
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
                  background: idx === currentIndex ? "#F59E0B" : "rgba(255, 255, 255, 0.45)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
