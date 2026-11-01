"use client";

import { useState } from "react";

export default function BranchMap({ branch }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use the verified Google Maps embed URL from data, fallback to OSM if unavailable
  const embedUrl =
    branch.mapEmbedUrl ||
    (branch.city === "Kaushambi"
      ? "https://www.openstreetmap.org/export/embed.html?bbox=81.549%2C25.411%2C81.589%2C25.451&layer=mapnik&marker=25.431289%2C81.569421"
      : "https://www.openstreetmap.org/export/embed.html?bbox=81.685%2C25.456%2C81.725%2C25.496&layer=mapnik&marker=25.476049%2C81.705128");

  return (
    <div
      style={{
        position: "relative",
        height: "200px",
        width: "100%",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "#0F172A",
        border: "1px solid var(--gray-200)",
      }}
    >
      {/* If iframe fails or is blocked, render a styled interactive location card */}
      {hasError ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #091E42 0%, #1E293B 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            textAlign: "center",
            zIndex: 1,
            color: "#FFFFFF",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(245, 158, 11, 0.2)",
              border: "2px solid #F59E0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8px",
              color: "#FDE047",
              fontSize: "1.1rem",
            }}
          >
            <i className="fa-solid fa-location-dot"></i>
          </div>

          <strong style={{ fontSize: "0.95rem", color: "#FFFFFF", marginBottom: "4px" }}>
            {branch.name}
          </strong>
          <small style={{ color: "#94A3B8", fontSize: "0.78rem", maxWidth: "280px", marginBottom: "12px", lineHeight: 1.4 }}>
            {branch.landmark || branch.address}
          </small>

          <a
            href={branch.mapDirectionsUrl || `https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solar btn-sm"
            style={{ fontSize: "0.8rem", padding: "6px 14px", textDecoration: "none" }}
          >
            <i className="fa-solid fa-diamond-turn-right"></i> Open in Google Maps
          </a>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          title={`${branch.name} Location`}
          style={{
            height: "100%",
            width: "100%",
            border: "none",
            display: "block",
          }}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
