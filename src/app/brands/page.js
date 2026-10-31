import Link from "next/link";
import { INITIAL_DATA } from "@/data/pawanData";

export const metadata = {
  title: "Authorized Brands | Pawan Traders - Battery & Solar",
  description: "Browse 14 authorized brands at Pawan Traders: Amaron, Exide, Luminous, Microtek, Vion Lithium, Tata Green, Livfast, and more.",
};

export default function BrandsDirectoryPage() {
  const { brands, products } = INITIAL_DATA;

  return (
    <div>
      <section style={{
        background: "linear-gradient(135deg, #091E42, #1E293B)",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "60px 20px"
      }}>
        <div className="container">
          <span className="section-badge solar" style={{ margin: "0 auto 14px" }}>
            <i className="fa-solid fa-handshake"></i> Complete Brand Directory
          </span>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 800, marginBottom: "12px", color: "#FFFFFF" }}>
            Authorized Battery &amp; Solar Brands
          </h1>
          <p style={{ fontSize: "1.05rem", maxWidth: "700px", margin: "0 auto", color: "#CBD5E1" }}>
            We carry India&apos;s foremost energy brands across all automotive, lithium, tubular inverter, and solar energy lines.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            {brands.map((b) => {
              const brandProds = products.filter((p) => p.brandId === b.id);
              return (
                <div
                  key={b.id}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid var(--gray-200)",
                    borderRadius: "var(--radius-lg)",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <div style={{ height: "50px", display: "flex", alignItems: "center", marginBottom: "16px" }}>
                    <img src={b.logo} alt={b.name} style={{ maxHeight: "42px", width: "auto" }} />
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "4px" }}>{b.name}</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--solar-hover)", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>
                    {b.tagline}
                  </span>
                  <p style={{ fontSize: "0.88rem", color: "#64748B", marginBottom: "18px", flexGrow: 1 }}>
                    {b.description}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--gray-100)" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)" }}>
                      {brandProds.length} Products
                    </span>
                    <Link href={`/brands/${b.slug}`} className="btn btn-outline btn-sm">
                      View Products &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

