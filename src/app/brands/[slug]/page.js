import Link from "next/link";
import { notFound } from "next/navigation";
import { INITIAL_DATA, buildWhatsAppUrl } from "@/data/pawanData";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = INITIAL_DATA.brands.find((b) => b.slug === slug);
  if (!brand) return { title: "Brand Not Found | Pawan Traders" };

  return {
    title: `${brand.name} Batteries & Solar Products | Pawan Traders`,
    description: `Buy genuine ${brand.name} products with official warranty in Prayagraj & Kaushambi at Pawan Traders. Call 9935618513.`,
  };
}

export default async function BrandProductsPage({ params }) {
  const { slug } = await params;
  const brand = INITIAL_DATA.brands.find((b) => b.slug === slug);
  if (!brand) notFound();

  const brandProducts = INITIAL_DATA.products.filter((p) => p.brandId === brand.id && p.published !== false);
  const waUrl = buildWhatsAppUrl(`Hello Pawan Traders, I want to enquire about ${brand.name} products and today's best price.`);

  return (
    <div>
      <section style={{
        background: "linear-gradient(135deg, #091E42, #1D4ED8)",
        color: "#FFFFFF",
        padding: "60px 20px"
      }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
              <div style={{ background: "#FFFFFF", padding: "8px 16px", borderRadius: "10px" }}>
                <img src={brand.logo} alt={brand.name} style={{ height: "40px", width: "auto" }} />
              </div>
              <h1 style={{ fontSize: "2.4rem", fontWeight: 800, margin: 0, color: "#FFFFFF" }}>{brand.name}</h1>
            </div>
            <p style={{ fontSize: "1.05rem", color: "#E0F2FE", maxWidth: "600px" }}>
              {brand.tagline} &bull; {brand.description}
            </p>
          </div>

          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
            <i className="fa-brands fa-whatsapp"></i> Enquire {brand.name} Rates
          </a>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>Available {brand.name} Models ({brandProducts.length})</h2>
            <Link href="/products" className="btn btn-outline btn-sm">
              &larr; All Products
            </Link>
          </div>

          {brandProducts.length === 0 ? (
            <p style={{ color: "#64748B" }}>No specific models listed yet for this brand. Please call 9935618513 for in-stock options.</p>
          ) : (
            <div className="products-grid">
              {brandProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

