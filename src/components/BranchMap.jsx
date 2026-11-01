"use client";

import { useState } from "react";

export default function BranchMap({ branch }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback to standard query-based embed if pb format fails
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    branch.name + " " + branch.address
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

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
      {/* Visual Map Backdrop / Fallback Card (Shows if Google Maps iframe is loading, blocked, or connection closed) */}
      {(!isLoading && !hasError) ? null : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #0F2D6B 0%, #1E293B 100%)",
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
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(245, 158, 11, 0.2)",
              border: "2px solid #F59E0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8px",
              color: "#FDE047",
              fontSize: "1.2rem",
            }}
          >
            <i className="fa-solid fa-location-dot"></i>
          </div>

          <strong style={{ fontSize: "0.95rem", color: "#FFFFFF", marginBottom: "2px" }}>
            {branch.name}
          </strong>
          <small style={{ color: "#94A3B8", fontSize: "0.78rem", maxWidth: "260px", marginBottom: "10px" }}>
            {branch.landmark}
          </small>

          <a
            href={branch.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solar btn-sm"
            style={{ fontSize: "0.78rem", padding: "6px 14px", textDecoration: "none" }}
          >
            <i className="fa-solid fa-diamond-turn-right"></i> Open in Google Maps
          </a>
        </div>
      )}

      {/* Google Maps Embed Iframe */}
      {!hasError && (
        <iframe
          src={embedUrl}
          title={`${branch.name} Location`}
          style={{
            height: "100%",
            width: "100%",
            border: "none",
            display: hasError ? "none" : "block",
          }}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

