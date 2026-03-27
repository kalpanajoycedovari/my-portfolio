import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Joyce",
};

export default function AboutPage() {
  return (
    <div className="section">
      <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
        ABOUT ME
      </p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "32px" }}>
        Hi, I'm Joyce 👋
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
        <div>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "20px" }}>
            I'm an AI/ML Engineer passionate about building intelligent systems that bridge the gap between cutting-edge research and real-world applications.
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "20px" }}>
            I specialize in AI (NLP), Computer vision, and End-to-end ML pipelines — from data wrangling to model deployment. I love turning messy problems into clean, intelligent solutions.
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
            When I'm not training models, I'm probably exploring the latest AI tools,New Tech in Town,Building side projects, or Drinking too much coffee☕and Reading books and exploring cafes
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { label: "Location", value: "UK 🇬🇧" },
            { label: "Focus", value: "AI/ML Engineering" },
            { label: "Currently", value: "Open to opportunities" },
            { label: "Education", value: "Computer Science" },
          ].map(item => (
            <div key={item.label} className="glass-card" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{item.label}</span>
              <span style={{ color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}