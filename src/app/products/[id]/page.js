import Link from "next/link";
import { notFound } from "next/navigation";
import { INITIAL_DATA, buildProductWhatsAppUrl } from "@/data/pawanData";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = INITIAL_DATA.products.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found | Pawan Traders" };

  return {
    title: `${product.name} | Pawan Traders - Prayagraj & Kaushambi`,
    description: `${product.name} (${product.capacityAh}, ${product.voltage}) with ${product.warranty}. Authorized dealership pricing and same-day delivery at Pawan Traders.`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = INITIAL_DATA.products.find((p) => p.id === id);
  if (!product) notFound();

  const brand = INITIAL_DATA.brands.find((b) => b.id === product.brandId);
  const category = INITIAL_DATA.categories.find((c) => c.id === product.categoryId);
  const waUrl = buildProductWhatsAppUrl(product, brand ? brand.name : "");

  return (
    <div className="section-padding">
      <div className="container">
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

