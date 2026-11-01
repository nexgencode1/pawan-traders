import { INITIAL_DATA } from "@/data/pawanData";
import BranchMap from "@/components/BranchMap";

export const metadata = {
  title: "Our Branches | Pawan Traders - Prayagraj & Kaushambi",
  description: "Visit Pawan Traders Main Branch at Puramufti (Prayagraj) or Second Branch at Charwa Town (Kaushambi). Google Maps directions, phone and timings.",
};

export default function BranchesPage() {
  const { branches } = INITIAL_DATA;

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
            <i className="fa-solid fa-store"></i> Direct Counters
          </span>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 800, marginBottom: "12px", color: "#FFFFFF" }}>
            Our Two Branch Locations
          </h1>
          <p style={{ fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto", color: "#CBD5E1" }}>
            Convenient physical stores in Puramufti (Prayagraj) and Charwa Town (Kaushambi). Visit for prompt in-store testing, exchange, and pickup.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            {branches.map((b) => (
              <div key={b.id} style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--gray-200)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ background: "linear-gradient(135deg, #0F2D6B, #1D4ED8)", color: "#FFFFFF", padding: "24px" }}>
                  <span style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#FDE047",
                    marginBottom: "8px"
                  }}>
                    {b.isMain ? "★ MAIN HEAD BRANCH" : "★ AUTHORIZED BRANCH"}
                  </span>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#FFFFFF" }}>{b.name}</h3>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", color: "#64748B", textTransform: "uppercase" }}>Address</strong>
                    <div style={{ fontSize: "0.95rem", color: "var(--gray-800)" }}>{b.address}</div>
                    <small style={{ color: "#64748B" }}>Landmark: {b.landmark}</small>
                  </div>

                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", color: "#64748B", textTransform: "uppercase" }}>Direct Calling</strong>
                    <a href={`tel:+91${b.phone}`} style={{ color: "var(--primary)", fontWeight: 700, fontSize: "1.1rem" }}>
                      +91 {b.phone}
                    </a>
                  </div>

                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", color: "#64748B", textTransform: "uppercase" }}>Working Hours</strong>
                    <div style={{ fontSize: "0.9rem", color: "var(--gray-700)" }}>{b.hours}</div>
                  </div>

                  <BranchMap branch={b} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
                    <a href={`tel:+91${b.phone}`} className="btn btn-call btn-sm">
                      <i className="fa-solid fa-phone"></i> Call Branch
                    </a>
                    <a href={b.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      <i className="fa-solid fa-diamond-turn-right"></i> Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

