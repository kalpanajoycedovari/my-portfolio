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
import TimelineLayout from "./components/TimelineLayout";
import CaseStudies from "./components/CaseStudies";

// ── Featured projects data ───────────────────────────────────────────────────
const FEATURED = [
  { title: "JoBo (Journalising Book)", tagline: "Written in these pages are the stories that you have penned down!", desc: "Uses OCR to pull text from photos of journals — turning handwriting into searchable digital entries.", tags: ["Python", "OpenCV", "Tesseract OCR"], id: "jobo", cover: "/projects/jobo-cover.jpg", accent: "#f59e0b" },
  { title: "Solite's Corner", tagline: "A cozy safe space on the internet, for you....& just YOU!", desc: "Full email login and Firebase-backed storage — hosted on GitHub Pages, engineered to feel like home.", tags: ["Firebase", "GitHub Pages", "JavaScript"], id: "solites-corner", cover: "/projects/solite-cover.jpg", accent: "#fb923c" },
  { title: "Speech Recognition Pipeline", tagline: "Teaching machines to listen.", desc: "Lightweight pipeline around Wav2Vec 2.0 — clean, accurate speech-to-text that actually works.", tags: ["Wav2Vec", "PyTorch", "NumPy"], id: "speech-recognition", cover: "/projects/speech-cover.jpg", accent: "#fcd34d" },
  { title: "AI Resume Analyzer", tagline: "Your resume, but smarter.", desc: "NLP-powered tool reading your resume like a recruiter — giving actionable feedback, not silence.", tags: ["NLP", "Python", "spaCy"], id: "ai-resume-analyzer", cover: "/projects/resume-cover.jpg", accent: "#f43f5e" },
  { title: "ScamCheck Agent", tagline: "Because 'it looked legit' is not a fraud prevention strategy.", desc: "Intelligent scam detection on Cloudflare's edge. Paste a URL — it runs page analysis, Reddit scan, and Llama 3.1 AI verdict in parallel.", tags: ["Cloudflare Workers", "Llama 3.1", "WebSockets"], id: "scamcheck-agent", cover: "/projects/scamcheck-cover.jpg", accent: "#34d399" },
  { title: "ScamScan", tagline: "Not everything with 5 stars deserves your money.", desc: "Scrapes 6,000+ Reddit posts, detects scam signals using NLP and scores trust on a 0–100 scale.", tags: ["Python", "TextBlob", "Streamlit"], id: "scamscan", cover: "/projects/scamscan-cover.jpg", accent: "#f59e0b" },
  { title: "Komiso", tagline: "Set it, forget it — let the agents do the hustle.", desc: "Multi-agent affiliate automation in N8N that autonomously scouts programs, generates AI content, tracks performance metrics, and delivers weekly reports via Gmail. Built on a fully free stack: Groq LLaMA 3.3, SerpAPI, and Google Sheets.", tags: ["N8N", "Groq LLaMA 3.3", "SerpAPI", "Google Sheets"], id: "komiso", cover: "/projects/komiso-cover.jpg", accent: "#a78bfa" },
  { title: "SOLÈNE", tagline: "Where fabric meets philosophy.", desc: "A luxury fashion editorial website with a Three.js geometric hero, ivory and gold palette, and Cormorant Garamond typography. Built as a complete brand experience with shop, about, and submission pages.", tags: ["Three.js", "HTML/CSS", "JavaScript", "GitHub Pages"], id: "solene", cover: "/projects/solene-cover.jpg", accent: "#d4a853" },
];

const FEATURED_DATA: Record<string, { github?: string; demo?: string }> = {
  "scamcheck-agent":    { github: "https://github.com/kalpanajoycedovari/cf_ai_scamcheck_agent", demo: "https://cf-ai-scamcheck-agent.dovarikalpanajoyce.workers.dev/" },
  "jobo":               { github: "https://github.com/kalpanajoycedovari/JoBo-OCR-digital-journal" },
  "solites-corner":     { github: "https://github.com/kalpanajoycedovari/My-Website", demo: "https://kalpanajoycedovari.github.io/My-Website/" },
  "speech-recognition": { github: "https://github.com/kalpanajoycedovari/Speech-Recognition-Mini-Pipeline" },
  "ai-resume-analyzer": { github: "https://github.com/kalpanajoycedovari/AI-resume-screener", demo: "https://ai-resume-screener-x5c1.onrender.com/" },
  "scamscan":           { github: "https://github.com/kalpanajoycedovari/scamscan" },
  "uk-job-market":      { github: "https://github.com/kalpanajoycedovari/uk-job-market-dashboard", demo: "https://public.tableau.com/app/profile/kalpana.joyce.dovari/viz/UKJobMarketDashboard/UKJobMarketDashboard?publish=yes" },
  "komiso":             {},
  "solene":             { github: "https://github.com/kalpanajoycedovari/solene-fashion", demo: "https://kalpanajoycedovari.github.io/solene-fashion/" },
};

// ── Komiso highlight card for homepage ──────────────────────────────────────
function KomisoSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      style={{
        position: "relative",
        borderRadius: "20px",
        padding: "36px 40px",
        background: "linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.04) 100%)",
        border: "1px solid rgba(167,139,250,0.3)",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "260px", height: "260px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "10px", padding: "4px 12px", borderRadius: "999px", background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.35)" }}>
            <span style={{ fontSize: "0.68rem", color: "#a78bfa", fontWeight: 600, letterSpacing: "0.1em" }}>✦ LATEST BUILD</span>
          </div>
          <h3 style={{ fontSize: "1.9rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "white", marginBottom: "6px", lineHeight: 1.1 }}>Komiso</h3>
          <p style={{ fontSize: "0.88rem", color: "#a78bfa", fontStyle: "italic" }}>"Set it, forget it — let the agents do the hustle."</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "flex-start" }}>
          {["N8N", "Groq LLaMA 3.3", "SerpAPI", "Google Sheets"].map(t => (
            <span key={t} style={{ padding: "5px 12px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 500, border: "1px solid rgba(167,139,250,0.4)", color: "#a78bfa", background: "rgba(167,139,250,0.1)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "680px", marginBottom: "28px" }}>
        A multi-agent affiliate automation system built in N8N that autonomously scouts affiliate programs, generates AI-written content, tracks performance metrics, and delivers weekly digest reports straight to Gmail — all on a fully free stack.
      </p>

      {/* Agent flow pills */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
        {["Scout Agent", "→", "Content Agent", "→", "Tracker Agent", "→", "Report Agent"].map((step, i) => (
          step === "→"
            ? <span key={i} style={{ color: "rgba(167,139,250,0.5)", fontSize: "0.8rem" }}>→</span>
            : <span key={i} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 600, background: "rgba(167,139,250,0.12)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(167,139,250,0.2)" }}>{step}</span>
        ))}
      </div>

      {/* Footer note */}
      <p style={{ fontSize: "0.75rem", color: "rgba(167,139,250,0.6)", display: "flex", alignItems: "center", gap: "6px" }}>
        <span>🖥️</span> Local build · N8N self-hosted · No cloud deployment
      </p>
    </motion.div>
  );
}

// ── Book card — cinematic, no dark overlay ───────────────────────────────────
function BookCard({ p }: { p: typeof FEATURED[0] }) {
  const [open, setOpen] = useState(false);
  const data = FEATURED_DATA[p.id];
  const hasGithub = data?.github;
  const hasDemo = data?.demo;

  return (
    <Link
      href={`/projects/${p.id}`}
      style={{
        display: "block", overflow: "hidden", position: "relative",
        aspectRatio: "4/3", color: "inherit", textDecoration: "none",
        borderRadius: "16px", border: `1px solid ${p.accent}22`,
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Full image — zooms on hover */}
      <img
        src={p.cover} alt={p.title}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          transform: open ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Gradient — only at bottom, for text legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: open
          ? "rgba(14,10,7,0.72)"
          : "linear-gradient(to top, rgba(14,10,7,0.88) 0%, rgba(14,10,7,0.2) 45%, transparent 100%)",
        transition: "background 0.5s ease",
      }} />

      {/* Title — bottom, fades out on hover */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "22px 24px", zIndex: 2,
        opacity: open ? 0 : 1,
        transform: open ? "translateY(6px)" : "translateY(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        <p style={{ color: p.accent, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "4px" }}>FEATURED</p>
        <h3 style={{ fontSize: "1.1rem", fontFamily: "'Inter',sans-serif", fontWeight: 700, lineHeight: 1.3, color: "white", marginBottom: "3px" }}>{p.title}</h3>
        <p style={{ color: p.accent, fontSize: "0.75rem", fontStyle: "italic", opacity: 0.9 }}>"{p.tagline}"</p>
      </div>

      {/* Hover content — fades in over the image */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        padding: "28px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s",
      }}>
        <p style={{ color: p.accent, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "12px" }}>ABOUT</p>
        <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.92rem", lineHeight: 1.75, marginBottom: "16px" }}>{p.desc}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "18px" }}>
          {p.tags.map(t => (
            <span key={t} style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 500, border: `1px solid ${p.accent}55`, color: p.accent, background: `${p.accent}15` }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {hasGithub && (
            <a href={data.github} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 500, textDecoration: "none", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "white", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              Code
            </a>
          )}
          {hasDemo && (
            <a href={data.demo} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none", background: `linear-gradient(135deg, ${p.accent}, ${p.accent}bb)`, border: "none", color: "#0e0a07", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
          {!hasGithub && !hasDemo && (
            <span style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 500, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              🖥️ Local Build
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────
function GithubIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>;
}
function LinkedInIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const SECTIONS = [
    {
      number: "01",
      title: "At a Glance",
      subtitle: "Numbers, momentum, and what's keeping me busy right now",
      color: "#f59e0b",
      children: <StatsAndBuilding />,
    },
    {
      number: "02",
      title: "Tech Stack",
      subtitle: "Everything I work with — click a category to filter",
      color: "#fb923c",
      children: <TechStack />,
    },
    {
      number: "03",
      title: "Case Studies",
      subtitle: "UX/UI research and redesign — click a card to flip it",
      color: "#c084fc",
      children: <CaseStudies />,
    },
    {
      number: "04",
      title: "Latest Build",
      subtitle: "What I shipped most recently ✦",
      color: "#a78bfa",
      children: <KomisoSpotlight />,
    },
    {
      number: "05",
      title: "Featured Projects",
      subtitle: "Hover to preview · Click to explore ✨",
      color: "#fcd34d",
      children: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {FEATURED.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <TiltCard style={{ height: "100%" }}>
                  <BookCard p={p} />
                </TiltCard>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: "24px" }}
          >
            <Link href="/projects" style={{ color: "#fcd34d", fontSize: "0.9rem" }}>View all projects →</Link>
          </motion.div>
        </div>
      ),
    },
    {
      number: "06",
      title: "Coding Activity",
      subtitle: "Proof that I actually show up",
      color: "#f43f5e",
      children: <GitHubGraph />,
    },
  ];

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
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "20px", padding: "6px 14px", borderRadius: "999px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34d399", animation: "pulse-green 2s infinite" }} />
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

        {/* Role + description */}
        <motion.div style={{ display: "flex", alignItems: "flex-start", gap: "40px", marginBottom: "48px", flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ fontSize: "1.15rem", color: "var(--accent-amber)", fontWeight: 600, marginBottom: "12px", minHeight: "1.8rem" }}>
              <TypeAnimation
                sequence={["AI/ML Engineer", 2000, "Data Analyst", 2000, "MSc AI Student", 2000, "Problem Solver", 2000, "Builder of Things", 2000]}
                wrapper="span" speed={50} repeat={Infinity} cursor={true}
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

        <style>{`
          @keyframes pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.4); }
            70% { box-shadow: 0 0 0 8px rgba(52,211,153,0); }
            100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
          }
        `}</style>
      </section>

      {/* ── Timeline connected sections ── */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 32px 80px" }}>
        <TimelineLayout sections={SECTIONS} />
      </div>
    </div>
  );
}