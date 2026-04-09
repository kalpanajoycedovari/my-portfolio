"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import FadeIn from "./components/FadeIn";
import TiltCard from "./components/TiltCard";
import TechStack from "./components/TechStack";
import StatsAndBuilding from "./components/StatsAndBuilding";
import GitHubGraph from "./components/GitHubGraph";

// ── Featured projects ────────────────────────────────────────────────────────
const FEATURED = [
  { title: "JoBo (Journalising Book)", tagline: "What if your handwriting could think?", desc: "Uses OCR to pull text from photos of journals — turning handwriting into searchable digital entries.", tags: ["Python", "OpenCV", "Tesseract OCR"], id: "jobo", cover: "/projects/jobo-cover.jpg", accent: "#f59e0b" },
  { title: "Solite's Corner", tagline: "A cosy corner of the internet.", desc: "Full email login and Firebase-backed storage — hosted on GitHub Pages, engineered to feel like home.", tags: ["Firebase", "GitHub Pages", "JavaScript"], id: "solites-corner", cover: "/projects/solite-cover.jpg", accent: "#fb923c" },
  { title: "Speech Recognition Pipeline", tagline: "Teaching machines to listen.", desc: "Lightweight pipeline around Wav2Vec 2.0 — clean, accurate speech-to-text that actually works.", tags: ["Wav2Vec", "PyTorch", "NumPy"], id: "speech-recognition", cover: "/projects/speech-cover.jpg", accent: "#fcd34d" },
  { title: "AI Resume Analyzer", tagline: "Your resume, but smarter.", desc: "NLP-powered tool reading your resume like a recruiter — giving actionable feedback, not silence.", tags: ["NLP", "Python", "spaCy"], id: "ai-resume-analyzer", cover: "/projects/resume-cover.jpg", accent: "#f43f5e" },
  { title: "ScamScan", tagline: "Not everything with 5 stars deserves your money.", desc: "Scrapes 6,000+ Reddit posts, detects scam signals using NLP and scores trust on a 0–100 scale.", tags: ["Python", "TextBlob", "Streamlit"], id: "scamscan", cover: "/projects/scamscan-cover.jpg", accent: "#f59e0b" },
  { title: "UK Job Market Dashboard", tagline: "1.6M job postings. One dashboard.", desc: "Interactive Tableau dashboard analysing hiring companies, work types, and experience levels.", tags: ["Tableau", "SQL", "Data Analytics"], id: "uk-job-market", cover: "/projects/tableau-cover.jpg", accent: "#fb923c" },
];

function BookCard({ p }: { p: typeof FEATURED[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <Link href={`/projects/${p.id}`} className="glass-card"
      style={{ display: "block", overflow: "hidden", position: "relative", aspectRatio: "1/1", color: "inherit", textDecoration: "none", border: `1px solid ${p.accent}18` }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
    >
      <img src={p.cover} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: open ? 0.3 : 0.8, transition: "opacity 0.4s ease" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(14,10,7,0.95) 0%, rgba(14,10,7,0.15) 60%, transparent 100%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${p.accent}12 0%, transparent 65%)` }} />

      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: open ? "36%" : "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "18px", transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)", zIndex: 2 }}>
        <p style={{ color: p.accent, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "5px", opacity: open ? 0 : 1, transition: "opacity 0.15s" }}>FEATURED</p>
        <h3 style={{ fontSize: "0.9rem", fontFamily: "'Inter',sans-serif", fontWeight: 700, lineHeight: 1.3, marginBottom: "5px", color: "var(--text-primary)" }}>{p.title}</h3>
        <p style={{ color: p.accent, fontSize: "0.7rem", fontStyle: "italic", opacity: open ? 0 : 1, transition: "opacity 0.15s" }}>"{p.tagline}"</p>
      </div>

      <div style={{ position: "absolute", top: 0, bottom: 0, left: open ? "36%" : "100%", width: "1px", background: `${p.accent}66`, transition: "left 0.5s cubic-bezier(0.4,0,0.2,1)", zIndex: 4 }} />

      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: open ? "64%" : "0%", overflow: "hidden", background: "rgba(14,10,7,0.97)", backdropFilter: "blur(16px)", transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)", zIndex: 3 }}>
        <div style={{ padding: "18px 14px", opacity: open ? 1 : 0, transform: open ? "translateX(0)" : "translateX(12px)", transition: "opacity 0.3s ease 0.18s, transform 0.3s ease 0.18s", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" }}>
          <p style={{ color: p.accent, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em" }}>ABOUT</p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.76rem", lineHeight: 1.65 }}>{p.desc}</p>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {p.tags.map(t => <span key={t} style={{ padding: "2px 7px", borderRadius: "999px", fontSize: "0.62rem", fontWeight: 500, border: `1px solid ${p.accent}44`, color: p.accent, background: `${p.accent}12` }}>{t}</span>)}
          </div>
          <p style={{ color: p.accent, fontSize: "0.7rem", marginTop: "auto" }}>Click to explore →</p>
        </div>
      </div>
    </Link>
  );
}

function GithubIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>;
}
function LinkedInIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
}

export default function HomePage() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px", maxWidth: "1000px", margin: "0 auto", position: "relative" }}>

        {/* Clock */}
        <div style={{ position: "absolute", top: "100px", right: "0", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "10px 14px", display: "flex", flexDirection: "column", gap: "3px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ fontSize: "0.65rem" }}>📍</span>
            <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>London, UK</span>
          </div>
          <p style={{ fontSize: "1rem", fontWeight: 600, fontVariantNumeric: "tabular-nums", color: "var(--accent-amber)", lineHeight: 1 }}>
            {now ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--"}
          </p>
          <p style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>
            {now ? now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "---"}
          </p>
        </div>

        {/* Giant name */}
        <motion.div style={{ marginBottom: "32px" }}
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Open to work badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "20px", padding: "6px 14px", borderRadius: "999px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 0 0 rgba(52,211,153,0.4)", animation: "pulse-green 2s infinite" }} />
            <span style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: 500 }}>Open to opportunities</span>
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.2em", marginBottom: "16px", textTransform: "uppercase" }}>
            Kalpana Joyce Dovari
          </p>
          <h1 style={{ fontSize: "clamp(5rem, 14vw, 11rem)", lineHeight: 0.9, fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: "-0.03em" }}>
            <span className="gradient-text">Joyce</span>
            <span style={{ display: "block", color: "rgba(254,243,226,0.08)", fontSize: "0.55em", letterSpacing: "0.02em" }}>———</span>
          </h1>
        </motion.div>

        {/* Role with typing animation + description */}
        <motion.div style={{ display: "flex", alignItems: "flex-start", gap: "40px", marginBottom: "48px", flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ fontSize: "1.15rem", color: "var(--accent-amber)", fontWeight: 600, marginBottom: "12px", minHeight: "1.8rem" }}>
              <TypeAnimation
                sequence={[
                  "AI/ML Engineer", 2000,
                  "Data Analyst", 2000,
                  "MSc AI Student", 2000,
                  "Problem Solver", 2000,
                  "Builder of Things", 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </div>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "480px" }}>
              Building intelligent systems that solve real-world problems. I turn data into decisions and ideas into deployed applications.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "4px" }}>
            {["Based in London 🇬🇧", "Currently — MSc AI", "Available from Summer 2025"].map(t => (
              <span key={t} style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent-amber)", flexShrink: 0 }} />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <style>{`
          @keyframes pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.4); }
            70% { box-shadow: 0 0 0 8px rgba(52,211,153,0); }
            100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
          }
        `}</style>

        {/* Buttons */}
        <motion.div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "60px" }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link href="/projects" className="btn-primary">View Projects →</Link>
          <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><GithubIcon /> GitHub</a>
          <a href="https://linkedin.com/in/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><LinkedInIcon /> LinkedIn</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume ↗</a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div style={{ display: "flex", alignItems: "center", gap: "12px" }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div style={{ width: "32px", height: "1px", background: "var(--accent-amber)" }} />
          <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>SCROLL TO EXPLORE</p>
        </motion.div>
      </section>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 32px 80px" }}>

        {/* ── Stats + Currently Building ── */}
        <section style={{ marginBottom: "80px" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "6px" }}>
              <p style={{ color: "var(--accent-amber)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.15em" }}>01</p>
              <h2 style={{ fontSize: "2.2rem" }}>At a Glance</h2>
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "32px", paddingLeft: "32px" }}>
              Numbers, momentum, and what's keeping me busy right now
            </p>
          </FadeIn>
          <StatsAndBuilding />
        </section>

        {/* ── GitHub Graph ── */}
        <section style={{ marginBottom: "80px" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "6px" }}>
              <p style={{ color: "var(--accent-amber)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.15em" }}>02</p>
              <h2 style={{ fontSize: "2.2rem" }}>Coding Activity</h2>
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "24px", paddingLeft: "32px" }}>
              Proof that I actually show up
            </p>
          </FadeIn>
          <GitHubGraph />
        </section>

        {/* ── Tech Stack ── */}
        <section style={{ marginBottom: "80px" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "6px" }}>
              <p style={{ color: "var(--accent-amber)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.15em" }}>03</p>
              <h2 style={{ fontSize: "2.2rem" }}>Tech Stack</h2>
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "24px", paddingLeft: "32px" }}>
              Everything I work with — click a category to filter
            </p>
          </FadeIn>
          <TechStack />
        </section>

        {/* ── Featured Projects ── */}
        <section style={{ marginBottom: "80px" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "6px" }}>
              <p style={{ color: "var(--accent-amber)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.15em" }}>04</p>
              <h2 style={{ fontSize: "2.2rem" }}>Featured Projects</h2>
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "32px", paddingLeft: "32px" }}>Hover to preview · Click to explore ✨</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {FEATURED.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <TiltCard style={{ height: "100%" }}>
                  <BookCard p={p} />
                </TiltCard>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div style={{ marginTop: "24px", paddingLeft: "32px" }}>
              <Link href="/projects" style={{ color: "var(--accent-amber)", fontSize: "0.9rem" }}>View all projects →</Link>
            </div>
          </FadeIn>
        </section>

      </div>
    </div>
  );
}