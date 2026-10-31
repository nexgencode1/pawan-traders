"use client";

import Link from "next/link";
import { INITIAL_DATA, buildProductWhatsAppUrl } from "@/data/pawanData";

export default function ProductCard({ product, onQuickView }) {
  const brand = INITIAL_DATA.brands.find((b) => b.id === product.brandId);
  const category = INITIAL_DATA.categories.find((c) => c.id === product.categoryId);
  const waUrl = buildProductWhatsAppUrl(product, brand ? brand.name : "");

  return (
    <div className="product-card">
      <div className="prod-card-top" onClick={() => onQuickView && onQuickView(product)} style={{ cursor: "pointer" }}>
        <img
          src={product.image}
          alt={product.name}
          className="prod-card-img"
          loading="lazy"
        />
        {product.badge && <span className="prod-badge">{product.badge}</span>}
        <span className="prod-warranty-badge">
          <i className="fa-solid fa-shield-check"></i> {product.warranty}
        </span>
      </div>

      <div className="prod-card-body">
        <span className="prod-category-tag">
          {category ? category.name : "Battery"} &bull; <strong>{brand ? brand.name : ""}</strong>
        </span>
        <h4
          className="prod-card-title"
          onClick={() => onQuickView && onQuickView(product)}
        >
          {product.name}
        </h4>
        <span className="prod-card-model">Model: {product.model}</span>

        <div className="prod-specs-pills">
          <span className="spec-pill"><i className="fa-solid fa-bolt"></i> {product.voltage}</span>
          <span className="spec-pill"><i className="fa-solid fa-battery-full"></i> {product.capacityAh}</span>
        </div>

        <div className="prod-price-box">
          <span className="price-label">Pricing &amp; Offers</span>
          <div className="price-text">{product.priceText || "Call for Best Price"}</div>
        </div>

        <div className="prod-card-actions">
          <Link href={`/products/${product.id}`} className="btn btn-outline btn-sm">
            <i className="fa-solid fa-circle-info"></i> Details
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            <i className="fa-brands fa-whatsapp"></i> Enquire
          </a>
        </div>
      </div>
    </div>
  );
}

