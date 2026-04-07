"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SKILLS = [
  {
    label: "Frontend",
    icon: "🎨",
    color: "#c084fc",
    items: ["CSS", "JavaScript", "TypeScript", "React", "Next.js", "Bootstrap"],
  },
  {
    label: "Backend & Database",
    icon: "🗄️",
    color: "#f472b6",
    items: ["Express.js", "Firebase", "MongoDB", "MySQL", "Flask"],
  },
  {
    label: "AI / ML / Data Science",
    icon: "🤖",
    color: "#34d399",
    items: ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "OpenCV", "Pandas", "NumPy", "Wav2Vec"],
  },
  {
    label: "Tools & Platforms",
    icon: "🛠️",
    color: "#818cf8",
    items: ["VS Code", "Docker", "Vercel", "GitHub Pages", "Jupyter Notebook", "Google Colab"],
  },
];

const FEATURED = [
  {
    title: "JoBo (Journalising Book)",
    tagline: "What if your handwriting could think?",
    desc: "Uses OCR to pull text from photos of journals and notebooks — turning messy handwriting into searchable digital entries.",
    tags: ["Python", "OpenCV", "Tesseract OCR"],
    id: "jobo",
    gradient: "linear-gradient(135deg, #1a0533 0%, #2d1b4e 50%, #0d1b2a 100%)",
    accent: "#c084fc",
  },
  {
    title: "Solite's Corner",
    tagline: "A cosy corner of the internet, built from scratch.",
    desc: "A personal website with full email login and Firebase-backed storage — engineered to feel like home.",
    tags: ["Firebase", "GitHub Pages", "JavaScript"],
    id: "solites-corner",
    gradient: "linear-gradient(135deg, #0a1628 0%, #1a2744 50%, #0d2137 100%)",
    accent: "#34d399",
  },
  {
    title: "Speech Recognition Pipeline",
    tagline: "Teaching machines to listen.",
    desc: "A lightweight pipeline built around Wav2Vec 2.0 — clean, accurate speech-to-text that actually works.",
    tags: ["Wav2Vec", "PyTorch", "NumPy"],
    id: "speech-recognition",
    gradient: "linear-gradient(135deg, #0f1923 0%, #1a2d3a 50%, #0a1f2e 100%)",
    accent: "#818cf8",
  },
  {
    title: "AI Resume Analyzer",
    tagline: "Your resume, but smarter.",
    desc: "NLP-powered tool that reads your resume the way a recruiter does — giving actionable feedback instead of silence.",
    tags: ["NLP", "Python", "spaCy"],
    id: "ai-resume-analyzer",
    gradient: "linear-gradient(135deg, #1a0a1e 0%, #2a1535 50%, #150d2a 100%)",
    accent: "#f472b6",
  },
  {
    title: "ScamScan",
    tagline: "Because not everything with 5 stars deserves your money.",
    desc: "Scrapes 6,000+ Reddit posts, detects scam signals using NLP and scores each entry on a 0–100 trust scale.",
    tags: ["Python", "TextBlob", "Streamlit"],
    id: "scamscan",
    gradient: "linear-gradient(135deg, #0a1a0f 0%, #142a1a 50%, #0d2010 100%)",
    accent: "#34d399",
  },
  {
    title: "UK Job Market Dashboard",
    tagline: "1.6 million job postings walked so this dashboard could run.",
    desc: "Interactive Tableau dashboard analysing the UK job market across hiring companies, work types, and experience levels.",
    tags: ["Tableau", "SQL", "Data Analytics"],
    id: "uk-job-market",
    gradient: "linear-gradient(135deg, #0f1a2e 0%, #1a2d4a 50%, #0a1628 100%)",
    accent: "#818cf8",
  },
];

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function BookCard({ p }: { p: typeof FEATURED[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <Link
      href={`/projects/${p.id}`}
      className="glass-card"
      style={{
        display: "block",
        overflow: "hidden",
        position: "relative",
        aspectRatio: "1 / 1",
        color: "inherit",
        textDecoration: "none",
        border: `1px solid ${p.accent}22`,
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Gradient cover */}
      <div style={{
        position: "absolute", inset: 0,
        background: p.gradient,
        transition: "opacity 0.4s ease",
        opacity: open ? 0.4 : 1,
      }} />

      {/* Accent glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 30% 50%, ${p.accent}20 0%, transparent 65%)`,
      }} />

      {/* Title panel */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0,
        width: open ? "36%" : "100%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "20px",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 2,
      }}>
        <p style={{
          color: p.accent, fontSize: "0.65rem", fontWeight: 600,
          letterSpacing: "0.1em", marginBottom: "6px",
          opacity: open ? 0 : 1, transition: "opacity 0.15s ease",
        }}>
          FEATURED
        </p>
        <h3 style={{
          fontSize: "0.95rem", fontFamily: "'Inter', sans-serif",
          fontWeight: 700, lineHeight: 1.3, marginBottom: "6px",
          color: "var(--text-primary)",
        }}>
          {p.title}
        </h3>
        <p style={{
          color: p.accent, fontSize: "0.72rem", fontStyle: "italic",
          lineHeight: 1.4, opacity: open ? 0 : 1, transition: "opacity 0.15s ease",
        }}>
          "{p.tagline}"
        </p>
      </div>

      {/* Divider */}
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        left: open ? "36%" : "100%",
        width: "1px",
        background: `${p.accent}55`,
        transition: "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 4,
      }} />

      {/* Description panel */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        width: open ? "64%" : "0%",
        overflow: "hidden",
        background: "rgba(13,15,26,0.97)",
        backdropFilter: "blur(16px)",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 3,
      }}>
        <div style={{
          padding: "20px 16px",
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(12px)",
          transition: "opacity 0.3s ease 0.18s, transform 0.3s ease 0.18s",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
        }}>
          <p style={{ color: p.accent, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em" }}>
            ABOUT
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.78rem", lineHeight: 1.65 }}>
            {p.desc}
          </p>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {p.tags.map(t => (
              <span key={t} style={{
                padding: "2px 8px", borderRadius: "999px", fontSize: "0.65rem",
                fontWeight: 500, border: `1px solid ${p.accent}44`,
                color: p.accent, background: `${p.accent}12`,
              }}>{t}</span>
            ))}
          </div>
          <p style={{ color: p.accent, fontSize: "0.72rem", marginTop: "auto" }}>
            Click to explore →
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="section">

      {/* ── Hero ── */}
      <section style={{ paddingTop: "20px", paddingBottom: "60px", position: "relative" }}>

        {/* Corner clock */}
        <div className="glass-card" style={{
          position: "absolute", top: "60px", right: "0",
          padding: "12px 16px", borderRadius: "12px",
          display: "flex", flexDirection: "column", gap: "4px", minWidth: "165px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "0.7rem" }}>📍</span>
            <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>London, United Kingdom</span>
          </div>
          <p style={{ fontSize: "1.1rem", fontWeight: 600, fontVariantNumeric: "tabular-nums", color: "var(--accent-lavender)", lineHeight: 1 }}>
            {now ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--"}
          </p>
          <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
            {now ? now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "---"}
          </p>
        </div>

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

        {/* Hero buttons with icons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/projects" className="btn-primary">
            View Projects →
          </Link>
          <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <GithubIcon /> GitHub
          </a>
          <a href="https://linkedin.com/in/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <LinkedInIcon /> LinkedIn
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">
            Resume ↗
          </a>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Featured Projects</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
          Hover to preview, click to explore ✨
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {FEATURED.map(p => <BookCard key={p.id} p={p} />)}
        </div>
        <div style={{ marginTop: "28px" }}>
          <Link href="/projects" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem" }}>View all projects →</Link>
        </div>
      </section>

      {/* ── Skills — Tree style ── */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Tech Stack</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>Everything I work with, organised by domain</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {SKILLS.map((category, ci) => (
            <div key={category.label} style={{ display: "flex", gap: "0", alignItems: "stretch" }}>

              {/* Trunk line */}
              <div style={{
                width: "40px", flexShrink: 0,
                display: "flex", flexDirection: "column", alignItems: "center",
              }}>
                <div style={{
                  width: "2px",
                  flex: 1,
                  background: ci === 0
                    ? `linear-gradient(to bottom, transparent, ${category.color})`
                    : ci === SKILLS.length - 1
                    ? `linear-gradient(to bottom, ${category.color}, transparent)`
                    : category.color,
                  opacity: 0.5,
                }} />
                <div style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: category.color,
                  border: "2px solid var(--bg-primary)",
                  boxShadow: `0 0 8px ${category.color}`,
                  flexShrink: 0,
                  zIndex: 1,
                }} />
                <div style={{
                  width: "2px", flex: 1,
                  background: ci === SKILLS.length - 1
                    ? "transparent"
                    : category.color,
                  opacity: 0.5,
                }} />
              </div>

              {/* Branch line */}
              <div style={{
                width: "24px", flexShrink: 0,
                display: "flex", alignItems: "center",
                marginTop: "0",
              }}>
                <div style={{
                  height: "2px", width: "100%",
                  background: category.color,
                  opacity: 0.5,
                }} />
              </div>

              {/* Content card */}
              <div className="glass-card" style={{
                flex: 1,
                padding: "20px 24px",
                margin: "10px 0",
                borderColor: `${category.color}22`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <span style={{ fontSize: "1.1rem" }}>{category.icon}</span>
                  <h3 style={{
                    fontSize: "0.82rem", fontFamily: "'Inter', sans-serif",
                    fontWeight: 600, letterSpacing: "0.1em",
                    color: category.color,
                  }}>
                    {category.label.toUpperCase()}
                  </h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {category.items.map(skill => (
                    <span key={skill} style={{
                      padding: "5px 14px", borderRadius: "999px",
                      fontSize: "0.82rem", fontWeight: 500,
                      background: `${category.color}12`,
                      border: `1px solid ${category.color}33`,
                      color: category.color,
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}