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
        height: "clamp(280px, 44vw, 520px)",
        minHeight: "260px",
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
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: "none",
            }}
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          />
        </div>
      ))}

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
