import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joyce — AI/ML Engineer",
  description: "Building intelligent AI systems and ML-powered applications.",
};

const SKILLS = [
  "Python", "Machine Learning", "Deep Learning", "NLP",
  "TensorFlow", "PyTorch", "React", "Next.js", "TypeScript",
];

const FEATURED = [
  {
    title: "JoBo (Journalising Book)",
    tagline: "What if your handwriting could think?",
    desc: "I built JoBo after getting tired of losing handwritten notes in the void. It uses OCR to pull text straight from photos of journals and notebooks — turning messy, beautiful handwriting into searchable, organised digital entries. Think of it as a bridge between the analogue and digital self.",
    tags: ["Python", "OpenCV", "Tesseract OCR"],
    href: "https://github.com/kalpanajoycedovari",
    cover: "/projects/jobo-cover.jpg",
    screenshot: "/projects/jobo-screenshot.jpg",
  },
  {
    title: "Solite's Corner",
    tagline: "A cosy corner of the internet, built from scratch.",
    desc: "A personal website with a full email login system and Firebase-backed storage. Solite's Corner is where design meets functionality — built with care, hosted on GitHub Pages, and engineered to feel like home the moment you land on it.",
    tags: ["Firebase", "GitHub Pages", "Email Auth", "JavaScript"],
    href: "https://github.com/kalpanajoycedovari",
    cover: "/projects/solite-cover.jpg",
    screenshot: "/projects/solite-screenshot.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="section">

      {/* ── Hero ── */}
      <section style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.9rem", fontWeight: 500, marginBottom: "12px", letterSpacing: "0.1em" }}>
          HI THERE, I'M
        </p>
        <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", lineHeight: 1.1, marginBottom: "20px" }}>
          Kalpana Joyce<br />
          <span className="gradient-text">Dovari</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "540px", marginBottom: "36px" }}>
          AI/ML Engineer building intelligent systems that solve real-world problems.
          I turn data into decisions and ideas into deployed applications.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link href="/projects" className="btn-primary">View Projects →</Link>
          <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume ↗</a>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Featured Projects</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "36px" }}>
          A selection of things I've built — and the stories behind them
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {FEATURED.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="glass-card"
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr",
                gap: "0",
                overflow: "hidden",
                color: "inherit",
                minHeight: "260px",
              }}
            >
              {/* Image side */}
              <div style={{ order: i % 2 === 0 ? 2 : 1, position: "relative", minHeight: "220px", overflow: "hidden" }}>
                <Image
                  src={p.cover}
                  alt={`${p.title} cover`}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                <div style={{
                  position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.4s ease",
                }} className="screenshot-overlay">
                  <Image
                    src={p.screenshot}
                    alt={`${p.title} screenshot`}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>
                <div style={{
                  position: "absolute", inset: 0,
                  background: i % 2 === 0
                    ? "linear-gradient(to left, rgba(13,15,26,0.6), transparent)"
                    : "linear-gradient(to right, rgba(13,15,26,0.6), transparent)",
                }} />
              </div>

              {/* Text side */}
              <div style={{
                order: i % 2 === 0 ? 1 : 2,
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "12px",
              }}>
                <p style={{ color: "var(--accent-lavender)", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.08em" }}>
                  FEATURED PROJECT
                </p>
                <h3 style={{ fontSize: "1.3rem", lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ color: "var(--accent-rose)", fontSize: "0.95rem", fontStyle: "italic", fontWeight: 500 }}>
                  "{p.tagline}"
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                  {p.tags.map(t => <span key={t} className="badge">{t}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: "28px" }}>
          <Link href="/projects" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem" }}>
            View all projects →
          </Link>
        </div>
      </section>

      {/* ── Skills ── */}
      <section>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "24px" }}>Tech Stack</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {SKILLS.map(s => (
            <span key={s} className="badge" style={{ fontSize: "0.85rem", padding: "6px 16px" }}>{s}</span>
          ))}
        </div>
      </section>

    </div>
  );
}