import Link from "next/link";
import { INITIAL_DATA } from "@/data/pawanData";

export default function Footer() {
  const { settings, categories, brands, branches } = INITIAL_DATA;

  return (
    <footer style={{
      background: "#0B132B",
      color: "#94A3B8",
      paddingTop: "70px",
      paddingBottom: "30px",
      borderTop: "4px solid var(--solar)"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "40px",
          marginBottom: "50px"
        }}>
          {/* Col 1 */}
          <div>
            <img
              src="/assets/images/logo.svg"
              alt="Pawan Traders"
              style={{ height: "48px", marginBottom: "18px", filter: "brightness(0) invert(1)" }}
            />
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "16px", color: "#CBD5E1" }}>
              <strong>PAWAN TRADERS</strong> &bull; Complete Battery, Inverter, UPS, Lithium Storage &amp; Solar Solutions across Prayagraj &amp; Kaushambi.
            </p>
            <div style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
              <div><strong>Director:</strong> {settings.director}</div>
              <div><strong>Manager:</strong> {settings.manager}</div>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 800, marginBottom: "16px" }}>5 Core Categories</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem" }}>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products?category=${cat.id}`} style={{ color: "#CBD5E1" }}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 800, marginBottom: "16px" }}>Authorized Brands</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem" }}>
              {brands.slice(0, 6).map((b) => (
                <li key={b.id}>
                  <Link href={`/brands/${b.slug}`} style={{ color: "#CBD5E1" }}>
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 800, marginBottom: "16px" }}>Branch Contacts</h4>
            <div style={{ fontSize: "0.88rem", display: "flex", flexDirection: "column", gap: "12px", color: "#CBD5E1" }}>
              {branches.map((b) => (
                <div key={b.id}>
                  <strong style={{ color: "#FBBF24" }}>{b.name}:</strong><br />
                  <span style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8" }}>{b.address}</span>
                  Call: <a href={`tel:+91${b.phone}`} style={{ color: "#FFFFFF", fontWeight: 700 }}>+91 {b.phone}</a>
                </div>
              ))}
              <div>
                <strong>Email:</strong> {settings.email}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: "24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          fontSize: "0.85rem"
        }}>
          <div>
            &copy; 2026 <strong>Pawan Traders</strong>. All Rights Reserved. Battery, Inverter &amp; Solar Solutions.
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/" style={{ color: "#94A3B8" }}>Home</Link>
            <Link href="/about" style={{ color: "#94A3B8" }}>About</Link>
            <Link href="/products" style={{ color: "#94A3B8" }}>Products</Link>
            <Link href="/solar" style={{ color: "#94A3B8" }}>Solar</Link>
            <Link href="/admin" style={{ color: "#FBBF24" }}>Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
