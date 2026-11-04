import Link from "next/link";
import { notFound } from "next/navigation";
import { INITIAL_DATA, buildProductWhatsAppUrl } from "@/data/pawanData";
import { getProductById } from "@/lib/dataStore";

export async function generateMetadata({ params }) {
  const { id } = await params;
  let product = await getProductById(id);
  if (!product) {
    product = INITIAL_DATA.products.find((p) => p.id === id || String(p._id) === id);
  }
  if (!product) return { title: "Product Not Found | Pawan Traders" };

  const brand = INITIAL_DATA.brands.find((b) => b.id === product.brandId);
  const category = INITIAL_DATA.categories.find((c) => c.id === product.categoryId);
  const brandName = brand ? brand.name : "";
  const categoryName = category ? category.name : "Battery";

  const customKeywords = product.seoKeywords
    ? product.seoKeywords.split(",").map((k) => k.trim())
    : [];

  const autoKeywords = [
    `${product.name} price Prayagraj`,
    `${brandName} ${categoryName} dealer Allahabad`,
    `Buy ${brandName} ${product.capacityAh || ""} Prayagraj`,
    `${product.name} Puramufti GT Road`,
    `${brandName} authorized dealer Prayagraj`,
    `Battery shop in Soraon Prayagraj`,
    `Phaphamau battery inverter shop`,
    `Naini battery dealer Allahabad`,
    `Jhunsi battery shop`,
    `Kunda Pratapgarh battery dealer`,
    `Fatehpur battery wholesale rate`,
    `Manjhanpur Kaushambi battery dealer`,
    `Bharwari battery shop`,
    `Battery wholesale dealer Uttar Pradesh`,
    `Doorstep battery fitting within 100km Prayagraj`,
    `Exide Amaron exchange offer Allahabad`,
    `${categoryName} shop near me Prayagraj`,
  ];

  const metaDesc =
    product.seoDescription ||
    `Buy ${product.name} (${product.capacityAh || ""}, ${product.voltage || ""}) with ${product.warranty || "official warranty"} at Pawan Traders. ${product.shortDescription || ""} Authorized ${brandName} dealer in Puramufti Prayagraj & Charwa Kaushambi. Express same-day delivery across Prayagraj, Soraon, Phaphamau, Naini, Kunda & Kaushambi. Best wholesale price with old battery exchange. Call 9935618513.`;

  return {
    title: `${product.name} | ${brandName} ${categoryName} | Best Price Prayagraj Allahabad | Pawan Traders`,
    description: metaDesc,
    keywords: customKeywords.length > 0 ? customKeywords : autoKeywords,
    openGraph: {
      title: `${product.name} | Pawan Traders Prayagraj`,
      description: metaDesc,
      images: [{ url: product.image || "/assets/images/categories/automotive.svg", width: 800, height: 600, alt: `${product.name} - Pawan Traders Prayagraj` }],
      type: "website",
      locale: "en_IN",
      siteName: "Pawan Traders Battery & Solar Hub",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Pawan Traders Prayagraj`,
      description: `${brandName} authorized dealer. Best wholesale price, old battery exchange, fast delivery in Prayagraj & 100km radius. 9935618513.`,
      images: [product.image || "/assets/images/categories/automotive.svg"],
    },
    alternates: { canonical: `https://www.pawantraders.in/products/${product.id || id}` },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  let product = await getProductById(id);
  if (!product) {
    product = INITIAL_DATA.products.find((p) => p.id === id || String(p._id) === id);
  }
  if (!product) notFound();

  const brand = INITIAL_DATA.brands.find((b) => b.id === product.brandId);
  const category = INITIAL_DATA.categories.find((c) => c.id === product.categoryId);
  const waUrl = buildProductWhatsAppUrl(product, brand ? brand.name : "");

  const parsedPrice =
    product.priceText && product.priceText.match(/\d[\d,]*/)
      ? product.priceText.match(/\d[\d,]*/)[0].replace(/,/g, "")
      : "4999";

  return (
    <div className="section-padding">
      <div className="container">
        {/* Google Merchant Product Schema with Rich Snippet (Ratings, Price, InStock, Delivery) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": [`https://www.pawantraders.in${product.image || "/assets/images/categories/automotive.svg"}`],
            "description": product.seoDescription || product.shortDescription || product.name,
            "sku": product.model || product.id || String(product._id || ""),
            "mpn": product.model || product.id || String(product._id || ""),
            "brand": { "@type": "Brand", "name": brand ? brand.name : "Pawan Traders" },
            "offers": {
              "@type": "Offer",
              "url": `https://www.pawantraders.in/products/${product.id || product._id || id}`,
              "priceCurrency": "INR",
              "price": parsedPrice,
              "priceValidUntil": "2026-12-31",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "LocalBusiness",
                "name": "Pawan Traders",
                "telephone": "+919935618513",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "GT Road, Puramufti",
                  "addressLocality": "Prayagraj",
                  "addressRegion": "Uttar Pradesh",
                  "postalCode": "212208",
                  "addressCountry": "IN"
                }
              },
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "IN",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 7,
                "returnMethod": "https://schema.org/ReturnInStore",
                "returnFees": "https://schema.org/FreeReturn"
              },
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "INR"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "IN",
                  "addressRegion": ["Uttar Pradesh"]
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
                  "transitTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" }
                }
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "184"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pawantraders.in/" },
                { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.pawantraders.in/products" },
                { "@type": "ListItem", "position": 3, "name": product.name, "item": `https://www.pawantraders.in/products/${product.id || product._id || id}` }
              ]
            }
          }) }}
        />
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: "8px", fontSize: "0.85rem", color: "#64748B", marginBottom: "24px" }}>
          <Link href="/">Home</Link> &gt;
          <Link href="/products">Products</Link> &gt;
          <span style={{ color: "var(--primary)", fontWeight: 700 }}>{product.name}</span>
        </div>

        <div style={{
          background: "#FFFFFF",
          border: "1px solid var(--gray-200)",
          borderRadius: "var(--radius-xl)",
          padding: "36px",
          boxShadow: "var(--shadow-sm)",
          marginBottom: "40px"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            alignItems: "center"
          }}>
            {/* Image Box */}
            <div style={{
              background: "#F8FAFC",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--gray-200)"
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxHeight: "320px", objectFit: "contain" }}
              />
            </div>

            {/* Details Box */}
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span className="section-badge" style={{ margin: 0 }}>{category ? category.name : ""}</span>
                <span className="section-badge solar" style={{ margin: 0 }}>{brand ? brand.name : ""}</span>
              </div>

              <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "8px", color: "var(--gray-900)" }}>
                {product.name}
              </h1>

              <div style={{ fontSize: "0.95rem", color: "#64748B", marginBottom: "16px" }}>
                Model: <strong>{product.model}</strong> &bull; Capacity: <strong>{product.capacityAh}</strong>
              </div>

              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, marginBottom: "24px" }}>
                {product.shortDescription}
              </p>

              <div style={{
                background: "#EFF6FF",
                borderLeft: "4px solid var(--primary)",
                padding: "16px 20px",
                borderRadius: "8px",
                marginBottom: "28px"
              }}>
                <div style={{ fontSize: "0.85rem", color: "#1E40AF", fontWeight: 700 }}>AUTHORIZED DEALER PRICING</div>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1D4ED8" }}>
                  {product.priceText || "Call for Best Price / Old Battery Exchange"}
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                  <i className="fa-brands fa-whatsapp"></i> Enquire on WhatsApp
                </a>
                <a href={`tel:+91${INITIAL_DATA.settings.callingNumber}`} className="btn btn-primary btn-lg">
                  <i className="fa-solid fa-phone"></i> Call for Price ({INITIAL_DATA.settings.callingNumber})
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid var(--gray-200)",
          borderRadius: "var(--radius-xl)",
          padding: "36px",
          boxShadow: "var(--shadow-sm)"
        }}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "20px", borderBottom: "2px solid var(--primary)", paddingBottom: "8px", display: "inline-block" }}>
            Technical Specifications &amp; Official Warranty
          </h3>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: "#475569", padding: "12px 16px", borderBottom: "1px solid #E2E8F0", width: "35%" }}>Brand Partner</td>
                <td style={{ color: "#0F172A", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>{brand ? brand.name : "-"}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: "#475569", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>Capacity Rating</td>
                <td style={{ color: "#0F172A", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>{product.capacityAh}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: "#475569", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>Operating Voltage</td>
                <td style={{ color: "#0F172A", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>{product.voltage}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: "#475569", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>Warranty Term</td>
                <td style={{ color: "#059669", fontWeight: 800, padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>{product.warranty}</td>
              </tr>
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <tr key={key}>
                  <td style={{ fontWeight: 700, color: "#475569", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>{key}</td>
                  <td style={{ color: "#0F172A", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "10px",
            padding: "18px",
            marginTop: "24px",
            fontSize: "0.88rem",
            color: "#475569"
          }}>
            <strong><i className="fa-solid fa-truck-fast" style={{ color: "var(--primary)" }}></i> Branch Availability Guarantee:</strong><br />
            • Main Branch: Puramufti, Prayagraj &bull; Call: 9935618513<br />
            • Second Branch: Charwa Town, Kaushambi &bull; Call: 9305839018<br />
            <em>* Free testing and same-day delivery available across Prayagraj &amp; Kaushambi.</em>
          </div>
        </div>
      </div>
    </div>
  );
}

