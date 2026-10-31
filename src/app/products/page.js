"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { INITIAL_DATA } from "@/data/pawanData";
import ProductCard from "@/components/ProductCard";
import QuickEnquiryModal from "@/components/QuickEnquiryModal";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialBrand = searchParams.get("brand") || "";
  const initialQuery = searchParams.get("q") || "";

  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [search, setSearch] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("featured");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { categories, brands, products } = INITIAL_DATA;

  const filteredProducts = useMemo(() => {
    let prods = products.filter((p) => p.published !== false);

    if (category) {
      prods = prods.filter((p) => p.categoryId === category);
    }
    if (brand) {
      prods = prods.filter((p) => p.brandId === brand);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      prods = prods.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.capacityAh.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    if (sortBy === "name-asc") {
      prods.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "capacity") {
      prods.sort((a, b) => (parseInt(b.capacityAh) || 0) - (parseInt(a.capacityAh) || 0));
    }

    return prods;
  }, [products, category, brand, search, sortBy]);

  const handleQuickView = (prod) => {
    setSelectedProduct(prod);
    setModalOpen(true);
  };

  const handleClear = () => {
    setCategory("");
    setBrand("");
    setSearch("");
    setSortBy("featured");
  };

  return (
    <div>
      <section style={{
        background: "linear-gradient(135deg, #091E42, #0F2D6B)",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "60px 20px"
      }}>
        <div className="container">
          <span className="section-badge solar" style={{ margin: "0 auto 14px" }}>
            <i className="fa-solid fa-boxes-stacked"></i> Complete Catalogue
          </span>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 800, marginBottom: "12px", color: "#FFFFFF" }}>
            Battery &amp; Solar Product Catalogue
          </h1>
          <p style={{ fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto", color: "#CBD5E1" }}>
            Explore models across Automotive, Vion Lithium, Solar Panels, Tall Tubular, and SMF UPS dry batteries.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {/* Controls Bar */}
          <div style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            padding: "20px",
            border: "1px solid var(--gray-200)",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "30px"
          }}>
            <div style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px"
            }}>
              <div style={{ flex: 1, minWidth: "260px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by model, brand, Ah, or application..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div style={{ minWidth: "200px" }}>
                <select
                  className="form-control"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="">All Brands ({brands.length})</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ minWidth: "180px" }}>
                <select
                  className="form-control"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured First</option>
                  <option value="name-asc">Name (A to Z)</option>
                  <option value="capacity">Capacity (Ah High to Low)</option>
                </select>
              </div>
            </div>

            {/* Category Chips */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => setCategory("")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  background: !category ? "var(--primary)" : "var(--gray-100)",
                  color: !category ? "#FFFFFF" : "var(--gray-700)"
                }}
              >
                All Products ({products.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    background: category === c.id ? "var(--primary)" : "var(--gray-100)",
                    color: category === c.id ? "#FFFFFF" : "var(--gray-700)"
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count & Clear */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#64748B" }}>
              Showing {filteredProducts.length} Models
            </span>
            {(category || brand || search) && (
              <button className="btn btn-outline btn-sm" onClick={handleClear}>
                <i className="fa-solid fa-rotate"></i> Clear Filters
              </button>
            )}
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px dashed #CBD5E1"
            }}>
              <i className="fa-solid fa-box-open" style={{ fontSize: "3rem", color: "#94A3B8", marginBottom: "16px" }}></i>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>No products match your search</h3>
              <p style={{ color: "#64748B", marginBottom: "20px" }}>Try clearing category or search query.</p>
              <button className="btn btn-primary btn-sm" onClick={handleClear}>
                <i className="fa-solid fa-rotate"></i> Reset All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={handleQuickView} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick View / Enquiry Modal */}
      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedProduct={selectedProduct}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "80px 20px" }}>Loading catalogue...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
