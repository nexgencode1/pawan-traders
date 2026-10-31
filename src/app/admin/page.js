"use client";

import { useState } from "react";
import Link from "next/link";
import { INITIAL_DATA } from "@/data/pawanData";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // State data initialized from INITIAL_DATA
  const [products, setProducts] = useState(INITIAL_DATA.products);
  const [categories, setCategories] = useState(INITIAL_DATA.categories);
  const [brands, setBrands] = useState(INITIAL_DATA.brands);
  const [enquiries, setEnquiries] = useState(INITIAL_DATA.enquiries);
  const [settings, setSettings] = useState(INITIAL_DATA.settings);
  const [branches, setBranches] = useState(INITIAL_DATA.branches);

  // Modals state
  const [editProductModal, setEditProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [editNoteModal, setEditNoteModal] = useState(false);
  const [currentEnquiry, setCurrentEnquiry] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      (username === "admin" || username === "pawantraders") &&
      (password === "pawan@2026" || password === "admin123")
    ) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials! Use: admin / pawan@2026");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Status changer for enquiries
  const handleStatusChange = (id, newStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ["ID", "Date", "Customer Name", "Mobile", "Email", "Category", "Product", "Branch", "Status", "Notes", "Message"];
    const rows = enquiries.map((e) => [
      `"${e.id || ''}"`,
      `"${e.date || ''}"`,
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${e.mobile || ''}"`,
      `"${e.email || ''}"`,
      `"${(e.categoryName || e.category || '').replace(/"/g, '""')}"`,
      `"${(e.productName || '').replace(/"/g, '""')}"`,
      `"${(e.branchName || '').replace(/"/g, '""')}"`,
      `"${e.status || ''}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Pawan_Traders_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Product save
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.model) {
      alert("Product name and model number are required.");
      return;
    }

    if (currentProduct.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === currentProduct.id ? currentProduct : p))
      );
    } else {
      const newProd = {
        ...currentProduct,
        id: "prod-" + Date.now().toString(36),
        image: currentProduct.image || "/assets/images/products/automotive-battery.svg",
        published: true,
      };
      setProducts((prev) => [newProd, ...prev]);
    }
    setEditProductModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // 1-Click WhatsApp Reply
  const handleReplyWhatsApp = (enq) => {
    const cleanNum = enq.mobile.replace(/[^0-9]/g, "");
    const finalNum = cleanNum.startsWith("91") ? cleanNum : `91${cleanNum}`;
    const text = `Hello ${enq.name},\nThis is Mr. Pawan Kumar Kushwaha / Kartik Kushwaha from *Pawan Traders*. We received your website enquiry for *${enq.productName}*. How may we assist you today with pricing and doorstep delivery?`;
    window.open(`https://wa.me/${finalNum}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // ==================== 1. LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top right, #1D4ED8, #0B132B)",
        padding: "20px"
      }}>
        <div style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          maxWidth: "440px",
          width: "100%",
          padding: "40px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          textAlign: "center"
        }}>
          <img src="/assets/images/logo.svg" alt="Pawan Traders" style={{ height: "54px", margin: "0 auto 20px" }} />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", marginBottom: "6px" }}>Admin Portal</h2>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginBottom: "20px" }}>
            Pawan Traders &bull; Battery &amp; Solar Solutions
          </p>

          <div style={{
            background: "#EFF6FF",
            border: "1px dashed #93C5FD",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "0.8rem",
            color: "#1E40AF",
            marginBottom: "20px",
            textAlign: "left"
          }}>
            <i className="fa-solid fa-circle-info"></i> <strong>Default Credentials:</strong><br />
            Username: <code>admin</code> &bull; Password: <code>pawan@2026</code>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ textAlign: "left", marginBottom: "16px" }}>
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username (admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ textAlign: "left", marginBottom: "24px" }}>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password (pawan@2026)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", height: "48px" }}>
              <i className="fa-solid fa-right-to-bracket"></i> Login to Portal
            </button>
          </form>

          <div style={{ marginTop: "20px" }}>
            <Link href="/" style={{ fontSize: "0.85rem", color: "#64748B" }}>
              &larr; Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 2. MAIN ADMIN PORTAL ====================
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--gray-50)" }}>
      {/* Sidebar */}
      <aside style={{
        width: "260px",
        background: "#0B132B",
        color: "#CBD5E1",
        display: "flex",
        flexDirection: "column",
        padding: "20px 0"
      }}>
        <div style={{ padding: "0 24px 20px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <img src="/assets/images/logo-mark.svg" alt="Pawan Traders" style={{ height: "36px" }} />
          <div>
            <strong style={{ color: "#FFFFFF", fontSize: "1rem", display: "block", lineHeight: 1.2 }}>PAWAN TRADERS</strong>
            <small style={{ color: "#F59E0B", fontSize: "0.75rem", fontWeight: 700 }}>ADMIN CONTROL</small>
          </div>
        </div>

        <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              color: activeTab === "dashboard" ? "#FFFFFF" : "#94A3B8",
              background: activeTab === "dashboard" ? "var(--primary)" : "transparent",
              fontSize: "0.9rem",
              fontWeight: 600,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%"
            }}
          >
            <i className="fa-solid fa-chart-pie"></i> Dashboard
          </button>

          <button
            onClick={() => setActiveTab("products")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              color: activeTab === "products" ? "#FFFFFF" : "#94A3B8",
              background: activeTab === "products" ? "var(--primary)" : "transparent",
              fontSize: "0.9rem",
              fontWeight: 600,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%"
            }}
          >
            <i className="fa-solid fa-box-archive"></i> Product Catalogue
          </button>

          <button
            onClick={() => setActiveTab("enquiries")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              color: activeTab === "enquiries" ? "#FFFFFF" : "#94A3B8",
              background: activeTab === "enquiries" ? "var(--primary)" : "transparent",
              fontSize: "0.9rem",
              fontWeight: 600,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%"
            }}
          >
            <span><i className="fa-solid fa-envelope-open-text"></i> Enquiries</span>
            <span style={{ background: "#F59E0B", color: "#0F172A", padding: "2px 8px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 800 }}>
              {enquiries.filter((e) => e.status === "New").length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("branches")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              color: activeTab === "branches" ? "#FFFFFF" : "#94A3B8",
              background: activeTab === "branches" ? "var(--primary)" : "transparent",
              fontSize: "0.9rem",
              fontWeight: 600,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%"
            }}
          >
            <i className="fa-solid fa-store"></i> Both Branches
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              color: activeTab === "settings" ? "#FFFFFF" : "#94A3B8",
              background: activeTab === "settings" ? "var(--primary)" : "transparent",
              fontSize: "0.9rem",
              fontWeight: 600,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%"
            }}
          >
            <i className="fa-solid fa-sliders"></i> Content &amp; SEO
          </button>
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#F87171",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: "30px", overflowY: "auto" }}>
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "products" && "Product Catalogue Management"}
              {activeTab === "enquiries" && "Customer Enquiries & WhatsApp Leads"}
              {activeTab === "branches" && "Branch Locations Management"}
              {activeTab === "settings" && "Website Content & SEO"}
            </h2>
            <small style={{ color: "#64748B" }}>Pawan Traders &bull; Prayagraj &amp; Kaushambi</small>
          </div>
          <Link href="/" target="_blank" className="btn btn-outline btn-sm">
            <i className="fa-solid fa-eye"></i> View Live Site
          </Link>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
              <div style={{ background: "#FFFFFF", border: "1px solid var(--gray-200)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)" }}>{products.length}</div>
                <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 600 }}>Total Products</div>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid var(--gray-200)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--solar-hover)" }}>{categories.length}</div>
                <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 600 }}>Categories</div>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid var(--gray-200)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#7C3AED" }}>{brands.length}</div>
                <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 600 }}>Partner Brands</div>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid var(--gray-200)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#059669" }}>{enquiries.length}</div>
                <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 600 }}>Total Enquiries</div>
              </div>
            </div>

            <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid var(--gray-200)", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Recent Customer Enquiries</h3>
                <button className="btn btn-outline btn-sm" onClick={() => setActiveTab("enquiries")}>View All</button>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ background: "var(--gray-50)", textAlign: "left" }}>
                    <th style={{ padding: "12px" }}>Customer</th>
                    <th style={{ padding: "12px" }}>Mobile</th>
                    <th style={{ padding: "12px" }}>Interested Item</th>
                    <th style={{ padding: "12px" }}>Status</th>
                    <th style={{ padding: "12px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.slice(0, 5).map((e) => (
                    <tr key={e.id} style={{ borderBottom: "1px solid var(--gray-200)" }}>
                      <td style={{ padding: "12px" }}><strong>{e.name}</strong><br /><small style={{ color: "#64748B" }}>{e.date}</small></td>
                      <td style={{ padding: "12px" }}>{e.mobile}</td>
                      <td style={{ padding: "12px" }}>{e.productName}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{
                          background: e.status === "New" ? "#FEF3C7" : "#D1FAE5",
                          color: e.status === "New" ? "#B45309" : "#047857",
                          padding: "3px 8px",
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          fontWeight: 700
                        }}>
                          {e.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <button
                          onClick={() => handleReplyWhatsApp(e)}
                          className="btn btn-whatsapp btn-sm"
                        >
                          <i className="fa-brands fa-whatsapp"></i> Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === "products" && (
          <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid var(--gray-200)", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Manage Catalogue Models</h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setCurrentProduct({
                    name: "",
                    model: "",
                    brandId: brands[0]?.id || "",
                    categoryId: categories[0]?.id || "",
                    capacityAh: "",
                    voltage: "12V",
                    warranty: "",
                    priceText: "",
                    shortDescription: "",
                    image: "/assets/images/products/automotive-battery.svg"
                  });
                  setEditProductModal(true);
                }}
              >
                <i className="fa-solid fa-plus"></i> Add New Product
              </button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "var(--gray-50)", textAlign: "left" }}>
                  <th style={{ padding: "12px" }}>Product &amp; Model</th>
                  <th style={{ padding: "12px" }}>Capacity</th>
                  <th style={{ padding: "12px" }}>Voltage</th>
                  <th style={{ padding: "12px" }}>Warranty</th>
                  <th style={{ padding: "12px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--gray-200)" }}>
                    <td style={{ padding: "12px" }}>
                      <strong>{p.name}</strong><br />
                      <small style={{ color: "#64748B" }}>Model: {p.model}</small>
                    </td>
                    <td style={{ padding: "12px" }}>{p.capacityAh}</td>
                    <td style={{ padding: "12px" }}>{p.voltage}</td>
                    <td style={{ padding: "12px" }}>{p.warranty}</td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => {
                          setCurrentProduct(p);
                          setEditProductModal(true);
                        }}
                        className="btn btn-outline btn-sm"
                        style={{ marginRight: "6px" }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="btn btn-outline btn-sm"
                        style={{ color: "#DC2626", borderColor: "#FCA5A5" }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: ENQUIRY MANAGEMENT */}
        {activeTab === "enquiries" && (
          <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid var(--gray-200)", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Customer Leads &amp; Enquiries</h3>
              <button className="btn btn-outline btn-sm" onClick={handleExportCSV}>
                <i className="fa-solid fa-download"></i> Export to CSV
              </button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "var(--gray-50)", textAlign: "left" }}>
                  <th style={{ padding: "12px" }}>Customer &amp; Date</th>
                  <th style={{ padding: "12px" }}>Mobile</th>
                  <th style={{ padding: "12px" }}>Interested Product</th>
                  <th style={{ padding: "12px" }}>Status</th>
                  <th style={{ padding: "12px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e.id} style={{ borderBottom: "1px solid var(--gray-200)" }}>
                    <td style={{ padding: "12px" }}>
                      <strong>{e.name}</strong><br />
                      <small style={{ color: "#64748B" }}>{e.date}</small>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <a href={`tel:+91${e.mobile}`} style={{ color: "var(--primary)", fontWeight: 700 }}>
                        {e.mobile}
                      </a>
                    </td>
                    <td style={{ padding: "12px" }}>{e.productName}</td>
                    <td style={{ padding: "12px" }}>
                      <select
                        value={e.status}
                        onChange={(evt) => handleStatusChange(e.id, evt.target.value)}
                        className="form-control"
                        style={{ height: "34px", padding: "4px 8px", fontSize: "0.8rem", width: "120px" }}
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => handleReplyWhatsApp(e)}
                        className="btn btn-whatsapp btn-sm"
                      >
                        <i className="fa-brands fa-whatsapp"></i> Reply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: BRANCHES MANAGEMENT */}
        {activeTab === "branches" && (
          <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid var(--gray-200)", padding: "24px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "20px" }}>Branch Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {branches.map((b, idx) => (
                <div key={b.id} style={{ border: "1px solid var(--gray-200)", borderRadius: "12px", padding: "20px" }}>
                  <h4 style={{ color: "var(--primary)", marginBottom: "12px" }}>
                    Branch 0{idx + 1}: {b.name}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={b.address}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBranches((prev) => prev.map((item) => (item.id === b.id ? { ...item, address: val } : item)));
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={b.phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBranches((prev) => prev.map((item) => (item.id === b.id ? { ...item, phone: val } : item)));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-primary"
                style={{ width: "200px" }}
                onClick={() => alert("Branch details saved successfully!")}
              >
                Save Branches
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === "settings" && (
          <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid var(--gray-200)", padding: "24px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "20px" }}>Website Announcement &amp; SEO</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label>Top Announcement Banner</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.announcement}
                  onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label>Calling Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.callingNumber}
                    onChange={(e) => setSettings({ ...settings, callingNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.whatsAppNumber}
                    onChange={(e) => setSettings({ ...settings, whatsAppNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>SEO Meta Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.seoTitle}
                  onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>SEO Meta Description</label>
                <textarea
                  className="form-control"
                  style={{ height: "70px", resize: "none" }}
                  value={settings.seoDescription}
                  onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                ></textarea>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: "200px" }}
                onClick={() => alert("Settings saved successfully!")}
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Product Edit / Add Modal */}
      {editProductModal && currentProduct && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setEditProductModal(false); }}>
          <div className="modal-content" style={{ maxWidth: "600px" }}>
            <div className="modal-header">
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                {currentProduct.id ? "Edit Product" : "Add New Product"}
              </h3>
              <button className="modal-close-btn" onClick={() => setEditProductModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSaveProduct}>
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "12px", marginBottom: "12px" }}>
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentProduct.name}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Model *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentProduct.model}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, model: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      className="form-control"
                      value={currentProduct.categoryId}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, categoryId: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Brand</label>
                    <select
                      className="form-control"
                      value={currentProduct.brandId}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, brandId: e.target.value })}
                    >
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div className="form-group">
                    <label>Capacity</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentProduct.capacityAh}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, capacityAh: e.target.value })}
                      placeholder="e.g. 150 Ah"
                    />
                  </div>
                  <div className="form-group">
                    <label>Voltage</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentProduct.voltage}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, voltage: e.target.value })}
                      placeholder="e.g. 12V"
                    />
                  </div>
                  <div className="form-group">
                    <label>Warranty</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentProduct.warranty}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, warranty: e.target.value })}
                      placeholder="e.g. 60 Months"
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "16px" }}>
                  <label>Price Text / Offer</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentProduct.priceText || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, priceText: e.target.value })}
                    placeholder="e.g. Call for Best Price / Old Battery Exchange"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Save Product
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

