"use client";

import { useState } from "react";
import { INITIAL_DATA, buildWhatsAppUrl } from "@/data/pawanData";

export default function ContactPage() {
  const { settings, branches, categories } = INITIAL_DATA;
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    category: "cat-automotive",
    branchId: "branch-prayagraj",
    product: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert("Please provide name and 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    const branch = branches.find((b) => b.id === formData.branchId);
    const cat = categories.find((c) => c.id === formData.category);

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.mobile,
          email: formData.email,
          branch: branch ? branch.name : "Main Branch - Puramufti",
          category: cat ? cat.name : "General Enquiry",
          batteryOrSolarReq: formData.product || "General Query",
          message: formData.message || "Submitted via contact page",
        }),
      });
      setSuccessMessage("Thank you! Your enquiry has been received and saved. Redirecting to WhatsApp...");
    } catch (err) {
      console.warn("Could not save to API:", err);
    }

    const waText = `*NEW WEBSITE ENQUIRY - PAWAN TRADERS*\n\n` +
      `• *Customer Name:* ${formData.name}\n` +
      `• *Mobile:* ${formData.mobile}\n` +
      `• *Email:* ${formData.email || 'N/A'}\n` +
      `• *Category:* ${cat ? cat.name : 'General'}\n` +
      `• *Interested Product:* ${formData.product || 'Not Specified'}\n` +
      `• *Preferred Branch:* ${branch ? branch.name : 'Main Branch'}\n` +
      `• *Message:* ${formData.message || 'Looking for pricing and availability'}`;

    setSubmitted(true);
    setSubmitting(false);
    setTimeout(() => {
      window.open(buildWhatsAppUrl(waText), "_blank");
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div>
      <section style={{
        background: "linear-gradient(135deg, #091E42, #1D4ED8)",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "60px 20px"
      }}>
        <div className="container">
          <span className="section-badge solar" style={{ margin: "0 auto 14px" }}>
            <i className="fa-solid fa-envelope"></i> Reach Out
          </span>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 800, marginBottom: "12px", color: "#FFFFFF" }}>
            Contact Pawan Traders
          </h1>
          <p style={{ fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto", color: "#CBD5E1" }}>
            We are available 7 days a week for battery emergency delivery, solar site surveys, and wholesale inquiries.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            marginBottom: "50px"
          }}>
            {/* Direct Directory */}
            <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--gray-200)", padding: "36px", boxShadow: "var(--shadow-sm)" }}>
              <span className="section-badge"><i className="fa-solid fa-phone"></i> Contact Directory</span>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "20px" }}>Get in Touch Directly</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <strong style={{ color: "#64748B", fontSize: "0.85rem", textTransform: "uppercase" }}>Calling Helpline</strong>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary)" }}>
                    <a href={`tel:+91${settings.callingNumber}`}>+91 {settings.callingNumber}</a>
                  </div>
                  <small style={{ color: "#64748B" }}>Director: {settings.director}</small>
                </div>

                <div>
                  <strong style={{ color: "#64748B", fontSize: "0.85rem", textTransform: "uppercase" }}>Manager Direct Contact</strong>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--solar-hover)" }}>
                    <a href={`tel:+91${settings.managerContact}`}>+91 {settings.managerContact}</a>
                  </div>
                  <small style={{ color: "#64748B" }}>Manager: {settings.manager}</small>
                </div>

                <div>
                  <strong style={{ color: "#64748B", fontSize: "0.85rem", textTransform: "uppercase" }}>WhatsApp Support</strong>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#059669" }}>
                    <a href={`https://wa.me/91${settings.whatsAppNumber}`} target="_blank" rel="noopener noreferrer">
                      +91 {settings.whatsAppNumber}
                    </a>
                  </div>
                  <small style={{ color: "#64748B" }}>Instant Quote &amp; Battery Advice</small>
                </div>

                <div>
                  <strong style={{ color: "#64748B", fontSize: "0.85rem", textTransform: "uppercase" }}>Official Email</strong>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-900)" }}>
                    {settings.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Online Form */}
            <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--gray-200)", padding: "36px", boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "20px" }}>Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px" }}>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="10-digit number"
                      pattern="[0-9]{10}"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px" }}>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      className="form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred Branch</label>
                    <select
                      className="form-control"
                      value={formData.branchId}
                      onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                    >
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "14px" }}>
                  <label>Product or Vehicle Model</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Amaron 65Ah, 150Ah Tall Tubular, 3kW Solar"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <label>Message / Old Battery Scrap Details</label>
                  <textarea
                    className="form-control"
                    style={{ height: "80px", resize: "none" }}
                    placeholder="Tell us if you need old battery exchange, same-day delivery, or solar survey..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", height: "50px" }}>
                  <i className="fa-solid fa-paper-plane"></i> {submitted ? "Opening WhatsApp..." : "Send Message on WhatsApp"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

