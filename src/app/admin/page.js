"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { INITIAL_DATA } from "@/data/pawanData";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // System Health & Stats
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    totalSlides: 0,
    totalGallery: 0,
    isMongoConnected: false,
    isCloudinaryConfigured: false,
  });

  // State Data
  const [slides, setSlides] = useState([]);
  const [products, setProducts] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Modals
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [slideFormData, setSlideFormData] = useState({
    id: null,
    imageUrl: "",
    cloudinaryPublicId: "",
    title: "", // Optional text
    badge: "100% Authorized Hub",
    button1Text: "Explore Products",
    button1Link: "/products",
    button2Text: "WhatsApp Quote",
    button2Link: "https://wa.me/918299362360",
    order: 0,
    active: true,
  });

  const [showProductModal, setShowProductModal] = useState(false);
  const [productFormData, setProductFormData] = useState({
    id: null,
    name: "",
    model: "",
    brandId: "brand-amaron",
    categoryId: "cat-automotive",
    capacityAh: "150 Ah",
    voltage: "12V",
    warranty: "36 Months",
    image: "",
    cloudinaryPublicId: "",
    priceText: "Call for Best Rate",
    badge: "Popular",
    featured: true,
    published: true,
    shortDescription: "",
  });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    title: "",
    caption: "",
    category: "solar",
    imageUrl: "",
    cloudinaryPublicId: "",
  });

  // Uploading state
  const [uploading, setUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState("");

  const showToastMsg = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      (username === "admin" || username === "pawantraders") &&
      (password === "admin123" || password === "pawan@2026")
    ) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials! Username: admin | Password: admin123");
    }
  };

  // Fetch all data from API
  const refreshAllData = async () => {
    setLoading(true);
    try {
      // 1. Stats
      const statsRes = await fetch("/api/stats");
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);

      // 2. Hero Slides
      const slidesRes = await fetch("/api/hero-slides?all=true");
      const slidesData = await slidesRes.json();
      if (slidesData.success) setSlides(slidesData.slides || []);

      // 3. Products
      const prodsRes = await fetch("/api/products");
      const prodsData = await prodsRes.json();
      if (prodsData.success) setProducts(prodsData.products || []);

      // 4. Gallery
      const galRes = await fetch("/api/gallery");
      const galData = await galRes.json();
      if (galData.success) setGalleryItems(galData.items || []);

      // 5. Enquiries
      const enqRes = await fetch("/api/enquiries");
      const enqData = await enqRes.json();
      if (enqData.success) setEnquiries(enqData.enquiries || []);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshAllData();
    }
  }, [isAuthenticated]);

  // Generic Cloudinary Upload Handler
  const handleFileUpload = async (file, folder = "pawan-traders") => {
    if (!file) return null;
    setUploading(true);
    setUploadProgressText("Uploading image to Cloudinary...");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }
      showToastMsg(
        data.cloudinaryConfigured
          ? "Uploaded successfully to Cloudinary!"
          : "Saved image (Cloudinary credentials can be added to .env.local anytime)"
      );
      return { url: data.url, public_id: data.public_id };
    } catch (error) {
      alert("Image upload error: " + error.message);
      return null;
    } finally {
      setUploading(false);
      setUploadProgressText("");
    }
  };

  // ================= HERO SLIDES ACTIONS =================
  const handleSaveSlide = async (e) => {
    e.preventDefault();
    if (!slideFormData.imageUrl) {
      alert("Please upload or enter a slide image URL.");
      return;
    }

    try {
      const method = slideFormData.id ? "PUT" : "POST";
      const payload = slideFormData.id
        ? { ...slideFormData, id: slideFormData.id }
        : slideFormData;

      const res = await fetch("/api/hero-slides", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showToastMsg(slideFormData.id ? "Slide updated!" : "New Hero Slide added!");
        setShowSlideModal(false);
        refreshAllData();
      } else {
        alert("Failed to save slide: " + data.error);
      }
    } catch (err) {
      alert("Error saving slide: " + err.message);
    }
  };

  const handleDeleteSlide = async (id, publicId) => {
    if (!confirm("Are you sure you want to delete this Hero slide?")) return;
    try {
      const res = await fetch(`/api/hero-slides?id=${id}&publicId=${publicId || ""}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToastMsg("Hero slide deleted.");
        refreshAllData();
      }
    } catch (err) {
      alert("Error deleting slide: " + err.message);
    }
  };

  // ================= PRODUCT ACTIONS =================
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productFormData.name || !productFormData.image) {
      alert("Product name and image are required.");
      return;
    }

    try {
      const method = productFormData.id ? "PUT" : "POST";
      const payload = productFormData.id
        ? { ...productFormData, id: productFormData.id }
        : productFormData;

      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showToastMsg(productFormData.id ? "Product updated!" : "New product published!");
        setShowProductModal(false);
        refreshAllData();
      } else {
        alert("Failed: " + data.error);
      }
    } catch (err) {
      alert("Error saving product: " + err.message);
    }
  };

  const handleDeleteProduct = async (id, publicId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products?id=${id}&publicId=${publicId || ""}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToastMsg("Product deleted successfully.");
        refreshAllData();
      }
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  // ================= GALLERY ACTIONS =================
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!galleryFormData.imageUrl) {
      alert("Please upload an image for the gallery.");
      return;
    }

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryFormData),
      });

      const data = await res.json();
      if (data.success) {
        showToastMsg("Photo added to Gallery!");
        setShowGalleryModal(false);
        setGalleryFormData({
          title: "",
          caption: "",
          category: "solar",
          imageUrl: "",
          cloudinaryPublicId: "",
        });
        refreshAllData();
      } else {
        alert("Failed: " + data.error);
      }
    } catch (err) {
      alert("Error saving gallery photo: " + err.message);
    }
  };

  const handleDeleteGallery = async (id, publicId) => {
    if (!confirm("Are you sure you want to remove this photo from the gallery?")) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}&publicId=${publicId || ""}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToastMsg("Gallery photo removed.");
        refreshAllData();
      }
    } catch (err) {
      alert("Error removing photo: " + err.message);
    }
  };

  // ================= ENQUIRIES ACTIONS =================
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToastMsg(`Status updated to ${newStatus}`);
        setEnquiries((prev) =>
          prev.map((e) => (String(e._id) === String(id) ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!confirm("Delete this customer enquiry record?")) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToastMsg("Enquiry deleted.");
        setEnquiries((prev) => prev.filter((e) => String(e._id) !== String(id)));
      }
    } catch (err) {
      alert("Error deleting enquiry: " + err.message);
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Customer Name", "Phone", "Email", "Branch", "Category/Product", "Status", "Date", "Message"];
    const rows = enquiries.map((e) => [
      `"${e._id || ''}"`,
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${e.phone || ''}"`,
      `"${e.email || ''}"`,
      `"${(e.branch || '').replace(/"/g, '""')}"`,
      `"${(e.batteryOrSolarReq || e.category || '').replace(/"/g, '""')}"`,
      `"${e.status || ''}"`,
      `"${new Date(e.createdAt).toLocaleDateString()}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `pawan-traders-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ================= LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #050B18 0%, #0F172A 100%)",
        padding: "20px"
      }}>
        <div style={{
          background: "#1E293B",
          borderRadius: "var(--radius-xl)",
          padding: "40px",
          width: "100%",
          maxWidth: "440px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          color: "#FFFFFF"
        }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
              margin: "0 auto 16px",
              boxShadow: "0 10px 25px rgba(29, 78, 216, 0.4)"
            }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF" }}>Staff Portal Login</h2>
            <p style={{ color: "#94A3B8", fontSize: "0.88rem", marginTop: "6px" }}>
              Pawan Traders Full-Stack Master Control
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: "18px" }}>
              <label style={{ color: "#CBD5E1", fontSize: "0.85rem", fontWeight: 600 }}>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "26px" }}>
              <label style={{ color: "#CBD5E1", fontSize: "0.85rem", fontWeight: 600 }}>Master Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-solar btn-block"
              style={{ padding: "14px", fontWeight: 800, fontSize: "1rem" }}
            >
              <i className="fa-solid fa-right-to-bracket"></i> Sign In to Dashboard
            </button>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.78rem", color: "#64748B" }}>
            Default username: <strong style={{ color: "#CBD5E1" }}>admin</strong> &bull; Password: <strong style={{ color: "#CBD5E1" }}>admin123</strong>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN AUTHENTICATED ADMIN PANEL =================
  return (
    <div style={{ minHeight: "100vh", background: "#0B132B", color: "#F8FAFC" }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 9999,
          background: toast.type === "success" ? "#10B981" : "#EF4444",
          color: "#FFFFFF",
          padding: "12px 24px",
          borderRadius: "var(--radius-md)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <i className="fa-solid fa-circle-check"></i> {toast.msg}
        </div>
      )}

      {/* Top Admin Bar */}
      <div style={{
        background: "#080F21",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img src="/assets/images/logo.svg" alt="Pawan Traders" style={{ height: "36px", filter: "brightness(0) invert(1)" }} />
          <span style={{
            background: "rgba(245, 158, 11, 0.2)",
            color: "#FDE047",
            padding: "4px 10px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.05em"
          }}>
            FULL-STACK MASTER PANEL
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* MongoDB Status Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: stats.isMongoConnected ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
            border: `1px solid ${stats.isMongoConnected ? "#10B981" : "#F59E0B"}`,
            color: stats.isMongoConnected ? "#34D399" : "#FDE047",
            padding: "5px 12px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.75rem",
            fontWeight: 700,
          }} title="MongoDB Atlas or Local Connection">
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: stats.isMongoConnected ? "#10B981" : "#F59E0B", display: "inline-block" }}></span>
            MongoDB: {stats.isMongoConnected ? "Connected" : "Memory / Local"}
          </div>

          {/* Cloudinary Status Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: stats.isCloudinaryConfigured ? "rgba(59, 130, 246, 0.15)" : "rgba(148, 163, 184, 0.15)",
            border: `1px solid ${stats.isCloudinaryConfigured ? "#3B82F6" : "#64748B"}`,
            color: stats.isCloudinaryConfigured ? "#60A5FA" : "#CBD5E1",
            padding: "5px 12px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.75rem",
            fontWeight: 700,
          }} title="Cloudinary Image Storage">
            <i className="fa-solid fa-cloud-arrow-up"></i>
            Cloudinary: {stats.isCloudinaryConfigured ? "Active" : "Ready (.env.local)"}
          </div>

          <Link href="/" target="_blank" style={{ color: "#94A3B8", fontSize: "0.85rem", fontWeight: 600 }}>
            <i className="fa-solid fa-arrow-up-right-from-square"></i> View Website
          </Link>

          <button
            onClick={() => setIsAuthenticated(false)}
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              color: "#F87171",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              padding: "6px 14px",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            <i className="fa-solid fa-power-off"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Admin Content Layout */}
      <div className="container" style={{ padding: "30px 20px" }}>
        {/* Navigation Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "16px",
          marginBottom: "28px",
          flexWrap: "wrap",
        }}>
          {[
            { id: "dashboard", label: "Dashboard", icon: "fa-chart-pie" },
            { id: "slider", label: "Hero Slider", icon: "fa-sliders", count: slides.length },
            { id: "products", label: "Products Catalog", icon: "fa-boxes-stacked", count: products.length },
            { id: "gallery", label: "Product Gallery", icon: "fa-images", count: galleryItems.length },
            { id: "enquiries", label: "Contact Submissions", icon: "fa-envelope-open-text", count: enquiries.filter(e => e.status === "New").length, highlight: true },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 18px",
                borderRadius: "var(--radius-md)",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.9rem",
                transition: "var(--transition)",
                background: activeTab === tab.id ? "#1D4ED8" : "rgba(255, 255, 255, 0.05)",
                color: activeTab === tab.id ? "#FFFFFF" : "#94A3B8",
              }}
            >
              <i className={`fa-solid ${tab.icon}`}></i> {tab.label}
              {tab.count !== undefined && (
                <span style={{
                  background: tab.highlight ? "#EF4444" : "rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.75rem",
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ================= TAB 1: DASHBOARD OVERVIEW ================= */}
        {activeTab === "dashboard" && (
          <div>
            {/* Quick Metrics Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
              <div style={{ background: "#1E293B", borderRadius: "var(--radius-lg)", padding: "20px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8", fontSize: "0.85rem", fontWeight: 700 }}>
                  <span>HERO SLIDES</span>
                  <i className="fa-solid fa-sliders" style={{ color: "#3B82F6" }}></i>
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#FFFFFF", marginTop: "8px" }}>{slides.length}</div>
                <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>Admin-managed with Cloudinary photos</p>
              </div>

              <div style={{ background: "#1E293B", borderRadius: "var(--radius-lg)", padding: "20px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8", fontSize: "0.85rem", fontWeight: 700 }}>
                  <span>PRODUCTS IN STOCK</span>
                  <i className="fa-solid fa-boxes-stacked" style={{ color: "#F59E0B" }}></i>
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#FFFFFF", marginTop: "8px" }}>{products.length}</div>
                <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>Across 5 Major Battery &amp; Solar Categories</p>
              </div>

              <div style={{ background: "#1E293B", borderRadius: "var(--radius-lg)", padding: "20px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8", fontSize: "0.85rem", fontWeight: 700 }}>
                  <span>GALLERY PHOTOS</span>
                  <i className="fa-solid fa-images" style={{ color: "#10B981" }}></i>
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#FFFFFF", marginTop: "8px" }}>{galleryItems.length}</div>
                <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>Live Project &amp; Branch Showcases</p>
              </div>

              <div style={{ background: "#1E293B", borderRadius: "var(--radius-lg)", padding: "20px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8", fontSize: "0.85rem", fontWeight: 700 }}>
                  <span>NEW CONTACT LEADS</span>
                  <i className="fa-solid fa-bell" style={{ color: "#EF4444" }}></i>
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#EF4444", marginTop: "8px" }}>
                  {enquiries.filter(e => e.status === "New").length}
                </div>
                <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>Total Submissions: {enquiries.length}</p>
              </div>
            </div>

            {/* Quick Action Shortcuts */}
            <div style={{
              background: "#1E293B",
              borderRadius: "var(--radius-xl)",
              padding: "28px",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "32px",
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "16px" }}>
                <i className="fa-solid fa-bolt" style={{ color: "#F59E0B" }}></i> Quick Control Actions
              </h3>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => {
                    setSlideFormData({
                      id: null,
                      imageUrl: "",
                      cloudinaryPublicId: "",
                      title: "",
                      badge: "100% Authorized Hub",
                      button1Text: "Explore Products",
                      button1Link: "/products",
                      button2Text: "WhatsApp Quote",
                      button2Link: "https://wa.me/918299362360",
                      order: slides.length + 1,
                      active: true,
                    });
                    setShowSlideModal(true);
                  }}
                  className="btn btn-solar"
                >
                  <i className="fa-solid fa-plus"></i> Add Hero Slide
                </button>

                <button
                  onClick={() => {
                    setProductFormData({
                      id: null,
                      name: "",
                      model: "",
                      brandId: "brand-amaron",
                      categoryId: "cat-automotive",
                      capacityAh: "150 Ah",
                      voltage: "12V",
                      warranty: "36 Months",
                      image: "",
                      cloudinaryPublicId: "",
                      priceText: "Call for Best Rate",
                      badge: "Popular",
                      featured: true,
                      published: true,
                      shortDescription: "",
                    });
                    setShowProductModal(true);
                  }}
                  className="btn btn-primary"
                >
                  <i className="fa-solid fa-plus"></i> Add New Product
                </button>

                <button
                  onClick={() => setShowGalleryModal(true)}
                  className="btn btn-eco"
                >
                  <i className="fa-solid fa-camera"></i> Upload to Gallery
                </button>

                <button
                  onClick={() => setActiveTab("enquiries")}
                  className="btn btn-white"
                >
                  <i className="fa-solid fa-list-check"></i> Manage Submissions ({enquiries.length})
                </button>
              </div>
            </div>

            {/* Cloudinary & MongoDB Setup Help Card */}
            <div style={{
              background: "rgba(15, 23, 42, 0.6)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#CBD5E1", marginBottom: "8px" }}>
                <i className="fa-solid fa-circle-info" style={{ color: "#38BDF8" }}></i> Cloudinary &amp; MongoDB Configuration
              </h4>
              <p style={{ fontSize: "0.85rem", color: "#94A3B8", lineHeight: 1.6, marginBottom: "12px" }}>
                To connect your live MongoDB Atlas database and Cloudinary storage, configure your credentials in <code>.env.local</code>:
              </p>
              <pre style={{
                background: "#080F21",
                padding: "14px",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8rem",
                color: "#A7F3D0",
                overflowX: "auto"
              }}>
{`MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/pawantraders
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret`}
              </pre>
            </div>
          </div>
        )}

        {/* ================= TAB 2: HERO SLIDER MANAGEMENT ================= */}
        {activeTab === "slider" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF" }}>Hero Section Image Slider</h2>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
                  Add, edit, or remove slides with Cloudinary photo, optional headline text, and 2 action buttons.
                </p>
              </div>
              <button
                onClick={() => {
                  setSlideFormData({
                    id: null,
                    imageUrl: "",
                    cloudinaryPublicId: "",
                    title: "",
                    badge: "100% Authorized Hub",
                    button1Text: "Explore Products",
                    button1Link: "/products",
                    button2Text: "WhatsApp Quote",
                    button2Link: "https://wa.me/918299362360",
                    order: slides.length + 1,
                    active: true,
                  });
                  setShowSlideModal(true);
                }}
                className="btn btn-solar"
              >
                <i className="fa-solid fa-plus"></i> Add New Slide
              </button>
            </div>

            {/* Slides List */}
            <div style={{ display: "grid", gap: "18px" }}>
              {slides.map((slide, idx) => (
                <div
                  key={slide._id || idx}
                  style={{
                    background: "#1E293B",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "20px",
                    display: "grid",
                    gridTemplateColumns: "180px 1fr auto",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ height: "110px", borderRadius: "var(--radius-md)", overflow: "hidden", background: "#050B18", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <img src={slide.imageUrl} alt={slide.title || "Slide"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ background: "#1D4ED8", color: "#FFFFFF", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700 }}>
                        Slide #{idx + 1}
                      </span>
                      {slide.badge && (
                        <span style={{ background: "rgba(245,158,11,0.2)", color: "#FDE047", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 600 }}>
                          {slide.badge}
                        </span>
                      )}
                      <span style={{ color: slide.active ? "#10B981" : "#94A3B8", fontSize: "0.8rem", fontWeight: 700 }}>
                        &bull; {slide.active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>
                      {slide.title && slide.title.trim() !== "" ? (
                        slide.title
                      ) : (
                        <span style={{ color: "#64748B", fontStyle: "italic" }}>(No text &mdash; Image &amp; Buttons Only)</span>
                      )}
                    </h4>

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: "0.8rem", color: "#CBD5E1" }}>
                      <span><strong>Btn 1:</strong> {slide.button1Text || "N/A"} &rarr; <code>{slide.button1Link || "/"}</code></span>
                      <span><strong>Btn 2:</strong> {slide.button2Text || "N/A"} &rarr; <code>{slide.button2Link || "/"}</code></span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => {
                        setSlideFormData({
                          id: slide._id,
                          imageUrl: slide.imageUrl,
                          cloudinaryPublicId: slide.cloudinaryPublicId || "",
                          title: slide.title || "",
                          badge: slide.badge || "",
                          button1Text: slide.button1Text || "",
                          button1Link: slide.button1Link || "",
                          button2Text: slide.button2Text || "",
                          button2Link: slide.button2Link || "",
                          order: slide.order || 0,
                          active: slide.active !== undefined ? slide.active : true,
                        });
                        setShowSlideModal(true);
                      }}
                      className="btn btn-outline"
                      style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.2)" }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i> Edit
                    </button>

                    <button
                      onClick={() => handleDeleteSlide(slide._id, slide.cloudinaryPublicId)}
                      style={{
                        background: "rgba(239, 68, 68, 0.15)",
                        color: "#F87171",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        padding: "8px 14px",
                        borderRadius: "var(--radius-md)",
                        cursor: "pointer",
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PRODUCTS CATALOG ================= */}
        {activeTab === "products" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF" }}>Product Management</h2>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
                  Add, edit, remove battery &amp; solar products with Cloudinary image upload.
                </p>
              </div>
              <button
                onClick={() => {
                  setProductFormData({
                    id: null,
                    name: "",
                    model: "",
                    brandId: "brand-amaron",
                    categoryId: "cat-automotive",
                    capacityAh: "150 Ah",
                    voltage: "12V",
                    warranty: "36 Months",
                    image: "",
                    cloudinaryPublicId: "",
                    priceText: "Call for Best Rate",
                    badge: "Popular",
                    featured: true,
                    published: true,
                    shortDescription: "",
                  });
                  setShowProductModal(true);
                }}
                className="btn btn-primary"
              >
                <i className="fa-solid fa-plus"></i> Add New Product
              </button>
            </div>

            <div style={{
              background: "#1E293B",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(255,255,255,0.08)",
              overflowX: "auto",
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "#0F172A", color: "#94A3B8", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <th style={{ padding: "14px 18px" }}>Product</th>
                    <th style={{ padding: "14px 18px" }}>Brand &amp; Category</th>
                    <th style={{ padding: "14px 18px" }}>Capacity / Specs</th>
                    <th style={{ padding: "14px 18px" }}>Warranty</th>
                    <th style={{ padding: "14px 18px" }}>Price Text</th>
                    <th style={{ padding: "14px 18px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod._id || prod.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <td style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "45px", height: "45px", borderRadius: "8px", overflow: "hidden", background: "#050B18", flexShrink: 0 }}>
                          <img src={prod.image} alt={prod.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div>
                          <strong style={{ color: "#FFFFFF", display: "block" }}>{prod.name}</strong>
                          <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{prod.model || "N/A"}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px", color: "#CBD5E1" }}>
                        <div>{prod.brandId?.replace("brand-", "").toUpperCase()}</div>
                        <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{prod.categoryId?.replace("cat-", "")}</span>
                      </td>
                      <td style={{ padding: "14px 18px", color: "#FDE047" }}>
                        {prod.capacityAh} &bull; {prod.voltage}
                      </td>
                      <td style={{ padding: "14px 18px", color: "#CBD5E1" }}>
                        {prod.warranty || "Standard"}
                      </td>
                      <td style={{ padding: "14px 18px", color: "#34D399", fontWeight: 700 }}>
                        {prod.priceText}
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => {
                              setProductFormData({
                                id: prod._id || prod.id,
                                name: prod.name,
                                model: prod.model || "",
                                brandId: prod.brandId,
                                categoryId: prod.categoryId,
                                capacityAh: prod.capacityAh || "",
                                voltage: prod.voltage || "12V",
                                warranty: prod.warranty || "",
                                image: prod.image,
                                cloudinaryPublicId: prod.cloudinaryPublicId || "",
                                priceText: prod.priceText || "",
                                badge: prod.badge || "",
                                featured: prod.featured || false,
                                published: prod.published !== false,
                                shortDescription: prod.shortDescription || "",
                              });
                              setShowProductModal(true);
                            }}
                            style={{
                              background: "rgba(59, 130, 246, 0.15)",
                              color: "#60A5FA",
                              border: "1px solid rgba(59, 130, 246, 0.3)",
                              padding: "6px 10px",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod._id || prod.id, prod.cloudinaryPublicId)}
                            style={{
                              background: "rgba(239, 68, 68, 0.15)",
                              color: "#F87171",
                              border: "1px solid rgba(239, 68, 68, 0.3)",
                              padding: "6px 10px",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: GALLERY MANAGEMENT ================= */}
        {activeTab === "gallery" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF" }}>Product &amp; Installation Gallery</h2>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
                  Upload customer installation photos, battery replacements, and shop views directly to Cloudinary.
                </p>
              </div>
              <button
                onClick={() => setShowGalleryModal(true)}
                className="btn btn-eco"
              >
                <i className="fa-solid fa-upload"></i> Upload Photo to Gallery
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {galleryItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    background: "#1E293B",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    position: "relative",
                  }}
                >
                  <div style={{ height: "180px", background: "#050B18", overflow: "hidden" }}>
                    <img src={item.imageUrl} alt={item.title || "Gallery photo"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "14px" }}>
                    <span style={{ background: "#F59E0B", color: "#0F172A", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>
                      {item.category}
                    </span>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", marginTop: "6px" }}>
                      {item.title || "Photo"}
                    </h4>
                    {item.caption && (
                      <p style={{ fontSize: "0.8rem", color: "#94A3B8", marginTop: "4px" }}>{item.caption}</p>
                    )}
                    <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => handleDeleteGallery(item._id, item.cloudinaryPublicId)}
                        style={{
                          background: "rgba(239, 68, 68, 0.15)",
                          color: "#F87171",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          padding: "5px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                        }}
                      >
                        <i className="fa-solid fa-trash"></i> Delete Photo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: CONTACT SUBMISSIONS ================= */}
        {activeTab === "enquiries" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF" }}>Contact Submissions &amp; Customer Leads</h2>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
                  All enquiries submitted via Contact page and Homepage quick popup saved to database.
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                className="btn btn-outline"
                style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.3)" }}
              >
                <i className="fa-solid fa-file-csv"></i> Export to CSV
              </button>
            </div>

            <div style={{
              background: "#1E293B",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(255,255,255,0.08)",
              overflowX: "auto",
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "#0F172A", color: "#94A3B8", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <th style={{ padding: "14px 18px" }}>Customer</th>
                    <th style={{ padding: "14px 18px" }}>Branch / Service</th>
                    <th style={{ padding: "14px 18px" }}>Message</th>
                    <th style={{ padding: "14px 18px" }}>Date</th>
                    <th style={{ padding: "14px 18px" }}>Status</th>
                    <th style={{ padding: "14px 18px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>
                        No customer submissions yet.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((enq) => (
                      <tr key={enq._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <td style={{ padding: "14px 18px" }}>
                          <strong style={{ color: "#FFFFFF", display: "block" }}>{enq.name}</strong>
                          <a href={`tel:+91${enq.phone}`} style={{ color: "#FDE047", fontSize: "0.82rem", fontWeight: 700 }}>
                            <i className="fa-solid fa-phone"></i> +91 {enq.phone}
                          </a>
                          {enq.email && <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{enq.email}</div>}
                        </td>
                        <td style={{ padding: "14px 18px", color: "#CBD5E1" }}>
                          <div style={{ fontWeight: 600 }}>{enq.branch}</div>
                          <span style={{ fontSize: "0.78rem", color: "#38BDF8" }}>{enq.batteryOrSolarReq || enq.category}</span>
                        </td>
                        <td style={{ padding: "14px 18px", color: "#94A3B8", maxWidth: "260px" }}>
                          {enq.message || "No message provided."}
                        </td>
                        <td style={{ padding: "14px 18px", color: "#64748B", fontSize: "0.8rem" }}>
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <select
                            value={enq.status || "New"}
                            onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                            style={{
                              background: enq.status === "New" ? "#DC2626" : enq.status === "Contacted" ? "#D97706" : "#059669",
                              color: "#FFFFFF",
                              border: "none",
                              padding: "4px 8px",
                              borderRadius: "var(--radius-sm)",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              cursor: "pointer",
                            }}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            {/* WhatsApp Reply Shortcut */}
                            <a
                              href={`https://wa.me/91${enq.phone}?text=Hello%20${encodeURIComponent(enq.name)},%20thank%20you%20for%20contacting%20Pawan%20Traders%20regarding%20${encodeURIComponent(enq.batteryOrSolarReq || 'batteries%20and%20solar%20solutions')}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: "#25D366",
                                color: "#000",
                                padding: "6px 10px",
                                borderRadius: "6px",
                                fontWeight: 700,
                                fontSize: "0.8rem",
                              }}
                              title="Chat on WhatsApp"
                            >
                              <i className="fa-brands fa-whatsapp"></i>
                            </a>
                            <button
                              onClick={() => handleDeleteEnquiry(enq._id)}
                              style={{
                                background: "rgba(239, 68, 68, 0.15)",
                                color: "#F87171",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                padding: "6px 10px",
                                borderRadius: "6px",
                                cursor: "pointer",
                              }}
                              title="Delete enquiry"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL: ADD / EDIT HERO SLIDE ================= */}
      {showSlideModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "#1E293B",
            borderRadius: "var(--radius-xl)",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "28px",
            color: "#FFFFFF"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                {slideFormData.id ? "Edit Hero Slide" : "Add New Hero Slide"}
              </h3>
              <button
                onClick={() => setShowSlideModal(false)}
                style={{ background: "transparent", border: "none", color: "#94A3B8", fontSize: "1.5rem", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveSlide}>
              {/* Photo Upload with Cloudinary */}
              <div style={{ marginBottom: "20px", background: "#0F172A", padding: "16px", borderRadius: "var(--radius-md)", border: "1px dashed rgba(255,255,255,0.2)" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#FDE047", marginBottom: "8px" }}>
                  <i className="fa-solid fa-cloud-arrow-up"></i> Slide Photo (Cloudinary Upload) *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const res = await handleFileUpload(file, "pawan-traders/hero");
                      if (res) {
                        setSlideFormData((prev) => ({
                          ...prev,
                          imageUrl: res.url,
                          cloudinaryPublicId: res.public_id,
                        }));
                      }
                    }
                  }}
                  style={{ color: "#94A3B8", fontSize: "0.85rem" }}
                />
                {uploading && <p style={{ fontSize: "0.8rem", color: "#F59E0B", marginTop: "6px" }}>{uploadProgressText}</p>}

                {slideFormData.imageUrl && (
                  <div style={{ marginTop: "12px", height: "120px", borderRadius: "8px", overflow: "hidden", background: "#000" }}>
                    <img src={slideFormData.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}

                <div style={{ marginTop: "10px" }}>
                  <label style={{ fontSize: "0.75rem", color: "#64748B" }}>Or Paste Image URL directly:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://..."
                    value={slideFormData.imageUrl}
                    onChange={(e) => setSlideFormData({ ...slideFormData, imageUrl: e.target.value })}
                    style={{ background: "#050B18", border: "1px solid #334155", color: "#FFFFFF", fontSize: "0.8rem", marginTop: "4px" }}
                  />
                </div>
              </div>

              {/* SINGLE TEXT (OPTIONAL AS REQUESTED) */}
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label style={{ color: "#CBD5E1", fontSize: "0.85rem", fontWeight: 700 }}>
                  Single Headline Text <span style={{ color: "#F59E0B" }}>(Optional &mdash; Leave blank if not needed)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Authorized Battery & Solar Energy Superstore"
                  value={slideFormData.title}
                  onChange={(e) => setSlideFormData({ ...slideFormData, title: e.target.value })}
                  style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                />
                <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                  If left empty, the slide will highlight the photo and the 2 buttons without empty text gaps.
                </span>
              </div>

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label style={{ color: "#CBD5E1", fontSize: "0.85rem", fontWeight: 700 }}>Small Badge (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 100% Genuine Brands | PM Surya Ghar Subsidy"
                  value={slideFormData.badge}
                  onChange={(e) => setSlideFormData({ ...slideFormData, badge: e.target.value })}
                  style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                />
              </div>

              {/* Two Action Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Button 1 Label</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Explore Products"
                    value={slideFormData.button1Text}
                    onChange={(e) => setSlideFormData({ ...slideFormData, button1Text: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Button 1 Link</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="/products"
                    value={slideFormData.button1Link}
                    onChange={(e) => setSlideFormData({ ...slideFormData, button1Link: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Button 2 Label</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="WhatsApp Quote"
                    value={slideFormData.button2Text}
                    onChange={(e) => setSlideFormData({ ...slideFormData, button2Text: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Button 2 Link</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://wa.me/918299362360"
                    value={slideFormData.button2Link}
                    onChange={(e) => setSlideFormData({ ...slideFormData, button2Link: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "18px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem" }}>
                  <input
                    type="checkbox"
                    checked={slideFormData.active}
                    onChange={(e) => setSlideFormData({ ...slideFormData, active: e.target.checked })}
                  />
                  Active on Homepage
                </label>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setShowSlideModal(false)}
                    className="btn btn-outline"
                    style={{ color: "#CBD5E1", borderColor: "#475569" }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-solar">
                    <i className="fa-solid fa-check"></i> Save Slide
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
      {showProductModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "#1E293B",
            borderRadius: "var(--radius-xl)",
            maxWidth: "640px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "28px",
            color: "#FFFFFF"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                {productFormData.id ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                style={{ background: "transparent", border: "none", color: "#94A3B8", fontSize: "1.5rem", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              {/* Product Photo Upload */}
              <div style={{ marginBottom: "18px", background: "#0F172A", padding: "16px", borderRadius: "var(--radius-md)", border: "1px dashed rgba(255,255,255,0.2)" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#38BDF8", marginBottom: "8px" }}>
                  <i className="fa-solid fa-cloud-arrow-up"></i> Product Photo (Cloudinary Upload) *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const res = await handleFileUpload(file, "pawan-traders/products");
                      if (res) {
                        setProductFormData((prev) => ({
                          ...prev,
                          image: res.url,
                          cloudinaryPublicId: res.public_id,
                        }));
                      }
                    }
                  }}
                  style={{ color: "#94A3B8", fontSize: "0.85rem" }}
                />
                {uploading && <p style={{ fontSize: "0.8rem", color: "#F59E0B", marginTop: "6px" }}>{uploadProgressText}</p>}

                {productFormData.image && (
                  <div style={{ marginTop: "10px", height: "90px", width: "90px", borderRadius: "8px", overflow: "hidden", background: "#000" }}>
                    <img src={productFormData.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Product Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Amaron Pro 150Ah"
                    value={productFormData.name}
                    onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Model Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. AM-PRO-DIN65"
                    value={productFormData.model}
                    onChange={(e) => setProductFormData({ ...productFormData, model: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Brand *</label>
                  <select
                    className="form-control"
                    value={productFormData.brandId}
                    onChange={(e) => setProductFormData({ ...productFormData, brandId: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  >
                    {INITIAL_DATA.brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Category *</label>
                  <select
                    className="form-control"
                    value={productFormData.categoryId}
                    onChange={(e) => setProductFormData({ ...productFormData, categoryId: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  >
                    {INITIAL_DATA.categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "14px" }}>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Capacity (Ah)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="150 Ah"
                    value={productFormData.capacityAh}
                    onChange={(e) => setProductFormData({ ...productFormData, capacityAh: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Voltage</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="12V / 48V"
                    value={productFormData.voltage}
                    onChange={(e) => setProductFormData({ ...productFormData, voltage: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Warranty</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="36 Months"
                    value={productFormData.warranty}
                    onChange={(e) => setProductFormData({ ...productFormData, warranty: e.target.value })}
                    style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Price Tag / Text</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Call for Wholesale Rate / Old Exchange"
                  value={productFormData.priceText}
                  onChange={(e) => setProductFormData({ ...productFormData, priceText: e.target.value })}
                  style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "18px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem" }}>
                  <input
                    type="checkbox"
                    checked={productFormData.featured}
                    onChange={(e) => setProductFormData({ ...productFormData, featured: e.target.checked })}
                  />
                  Featured on Homepage
                </label>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="btn btn-outline"
                    style={{ color: "#CBD5E1", borderColor: "#475569" }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="fa-solid fa-check"></i> Save Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: UPLOAD GALLERY PHOTO ================= */}
      {showGalleryModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "#1E293B",
            borderRadius: "var(--radius-xl)",
            maxWidth: "520px",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "28px",
            color: "#FFFFFF"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>Upload Photo to Gallery</h3>
              <button
                onClick={() => setShowGalleryModal(false)}
                style={{ background: "transparent", border: "none", color: "#94A3B8", fontSize: "1.5rem", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveGallery}>
              <div style={{ marginBottom: "18px", background: "#0F172A", padding: "16px", borderRadius: "var(--radius-md)", border: "1px dashed rgba(255,255,255,0.2)" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#10B981", marginBottom: "8px" }}>
                  <i className="fa-solid fa-cloud-arrow-up"></i> Photo File (Cloudinary) *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const res = await handleFileUpload(file, "pawan-traders/gallery");
                      if (res) {
                        setGalleryFormData((prev) => ({
                          ...prev,
                          imageUrl: res.url,
                          cloudinaryPublicId: res.public_id,
                        }));
                      }
                    }
                  }}
                  style={{ color: "#94A3B8", fontSize: "0.85rem" }}
                  required
                />
                {uploading && <p style={{ fontSize: "0.8rem", color: "#F59E0B", marginTop: "6px" }}>{uploadProgressText}</p>}

                {galleryFormData.imageUrl && (
                  <div style={{ marginTop: "10px", height: "120px", borderRadius: "8px", overflow: "hidden", background: "#000" }}>
                    <img src={galleryFormData.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: "14px" }}>
                <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Category *</label>
                <select
                  className="form-control"
                  value={galleryFormData.category}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}
                  style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                >
                  <option value="solar">Solar Installations</option>
                  <option value="batteries">Batteries &amp; Inverters</option>
                  <option value="branches">Showrooms &amp; Branches</option>
                  <option value="installations">UPS &amp; Commercial</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: "14px" }}>
                <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Photo Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 5kW Solar Rooftop Installation"
                  value={galleryFormData.title}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                  style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label style={{ color: "#CBD5E1", fontSize: "0.82rem", fontWeight: 700 }}>Caption / Description</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Brief details of the work or project"
                  value={galleryFormData.caption}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, caption: e.target.value })}
                  style={{ background: "#0F172A", border: "1px solid #334155", color: "#FFFFFF" }}
                ></textarea>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "18px" }}>
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="btn btn-outline"
                  style={{ color: "#CBD5E1", borderColor: "#475569" }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-eco">
                  <i className="fa-solid fa-check"></i> Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
