"use client";

import { useState } from "react";
import { INITIAL_DATA, buildWhatsAppUrl } from "@/data/pawanData";

export default function QuickEnquiryModal({ isOpen, onClose, preselectedProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    category: "cat-automotive",
    product: preselectedProduct ? preselectedProduct.name : "",
    branchId: "branch-prayagraj",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert("Please provide your name and 10-digit mobile number.");
      return;
    }

    const branch = INITIAL_DATA.branches.find((b) => b.id === formData.branchId);
    const cat = INITIAL_DATA.categories.find((c) => c.id === formData.category);

    const waMsg = `*NEW WEBSITE ENQUIRY - PAWAN TRADERS*\n\n` +
      `• *Customer Name:* ${formData.name}\n` +
      `• *Mobile:* ${formData.mobile}\n` +
      `• *Email:* ${formData.email || 'N/A'}\n` +
      `• *Category:* ${cat ? cat.name : 'General'}\n` +
      `• *Interested Product:* ${formData.product || preselectedProduct?.name || 'General Query'}\n` +
      `• *Preferred Branch:* ${branch ? branch.name : 'Main Branch'}\n` +
      `• *Message:* ${formData.message || 'Looking for best price & warranty details'}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(buildWhatsAppUrl(waMsg), "_blank");
      onClose();
      setSubmitted(false);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Quick Product &amp; Price Enquiry</h3>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {preselectedProduct && (
              <div className="form-group" style={{ marginBottom: "14px" }}>
                <label>Selected Product</label>
                <input
                  type="text"
                  className="form-control"
                  value={preselectedProduct.name}
                  readOnly
                  style={{ background: "#F8FAFC", fontWeight: 700, color: "var(--primary)" }}
                />
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {INITIAL_DATA.categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Nearest Branch</label>
                <select
                  className="form-control"
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                >
                  {INITIAL_DATA.branches.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "18px" }}>
              <label>Message / Old Battery Exchange Query</label>
              <textarea
                className="form-control"
                style={{ height: "80px", resize: "none" }}
                placeholder="Mention your car model, inverter load, or old battery scrap details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-whatsapp" style={{ width: "100%", height: "48px" }}>
              <i className="fa-brands fa-whatsapp"></i> {submitted ? "Opening WhatsApp..." : "Send Enquiry on WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

