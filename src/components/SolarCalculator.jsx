"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/data/pawanData";

export default function SolarCalculator() {
  const [bill, setBill] = useState(3000);

  // Calculations
  const unitsPerMonth = bill / 7.5;
  const unitsPerDay = unitsPerMonth / 30;
  const recommendedKw = Math.max(1, Math.round((unitsPerDay / 4) * 10) / 10);
  const panelCount = Math.ceil((recommendedKw * 1000) / 550);
  const roofArea = Math.ceil(recommendedKw * 90);

  let subsidy = 0;
  if (recommendedKw >= 1 && recommendedKw < 2) subsidy = 30000;
  else if (recommendedKw >= 2 && recommendedKw < 3) subsidy = 60000;
  else if (recommendedKw >= 3) subsidy = 78000;

  const monthlySavings = Math.round(unitsPerMonth * 7);
  const annualSavings = monthlySavings * 12;
  const savings25Yrs = annualSavings * 25;

  const handleEnquiry = () => {
    const msg = `Hello Pawan Traders, I used your Next.js Solar Calculator:\n• Monthly Bill: ₹${bill.toLocaleString("en-IN")}\n• Recommended Plant: ${recommendedKw} kW (${panelCount} Panels)\n• Estimated Subsidy: ₹${subsidy.toLocaleString("en-IN")}\n• 25-Year Savings: ₹${savings25Yrs.toLocaleString("en-IN")}\n\nPlease contact me for a free site survey in Prayagraj / Kaushambi.`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "var(--radius-lg)",
      padding: "clamp(18px, 4vw, 30px)",
      color: "var(--gray-900)",
      boxShadow: "var(--shadow-lg)",
      maxWidth: "100%",
      boxSizing: "border-box",
      overflow: "hidden"
    }}>
      <h3 style={{ fontSize: "clamp(1.2rem, 3vw, 1.35rem)", fontWeight: 800, marginBottom: "6px" }}>Solar Rooftop Savings Calculator</h3>
      <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "18px" }}>
        Slide to select your average monthly electricity bill:
      </p>

      <div style={{ marginBottom: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700, marginBottom: "8px" }}>
          <span>Monthly Bill:</span>
          <span style={{ color: "var(--primary)", fontSize: "1.25rem" }}>₹ {bill.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="25000"
          step="500"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--solar)" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94A3B8", marginTop: "4px" }}>
          <span>₹1,000</span>
          <span>₹10,000</span>
          <span>₹25,000+</span>
        </div>
      </div>

      <div style={{
        background: "var(--gray-50)",
        border: "1.5px dashed var(--gray-300)",
        borderRadius: "var(--radius-md)",
        padding: "16px",
        marginTop: "18px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", padding: "8px 0", borderBottom: "1px solid var(--gray-200)", fontSize: "0.88rem" }}>
          <span>Recommended Plant:</span>
          <strong>{recommendedKw} kW</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", padding: "8px 0", borderBottom: "1px solid var(--gray-200)", fontSize: "0.88rem" }}>
          <span>Panels Needed:</span>
          <strong>{panelCount} Panels (550W Mono PERC)</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", padding: "8px 0", borderBottom: "1px solid var(--gray-200)", fontSize: "0.88rem" }}>
          <span>Roof Area:</span>
          <strong>~ {roofArea} sq.ft</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", padding: "8px 0", borderBottom: "1px solid var(--gray-200)", fontSize: "0.88rem" }}>
          <span>Govt Subsidy:</span>
          <strong style={{ color: "#059669" }}>₹ {subsidy.toLocaleString("en-IN")}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", padding: "10px 0 4px 0", fontSize: "1.05rem", fontWeight: 800, color: "var(--eco-dark)" }}>
          <span>Est. Annual Savings:</span>
          <strong>₹ {annualSavings.toLocaleString("en-IN")} / yr</strong>
        </div>
      </div>

      <button
        onClick={handleEnquiry}
        className="btn btn-whatsapp"
        style={{ width: "100%", marginTop: "16px" }}
      >
        <i className="fa-brands fa-whatsapp"></i> Get Quote for this Solar Size
      </button>
    </div>
  );
}

