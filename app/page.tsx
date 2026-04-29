"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import TiltCard from "./components/TiltCard";
import TechStack from "./components/TechStack";
import StatsAndBuilding from "./components/StatsAndBuilding";
import GitHubGraph from "./components/GitHubGraph";
import TimelineLayout from "./components/TimelineLayout";
import CaseStudies from "./components/CaseStudies";

// ── Single amber accent throughout ──────────────────────────────────────────
const A = "#f59e0b";

// ── Featured projects data ───────────────────────────────────────────────────
const FEATURED = [
  { title: "TikTok Retention Dashboard", tagline: "Acquiring a user is the easy part. Keeping them is where it gets interesting.", desc: "End-to-end analytics project analysing user retention, churn behaviour, and feature impact across a synthetic TikTok EMEA user base of 50,000 users — cohort heatmaps, survival curves, and a logistic regression churn predictor.", tags: ["Python", "Streamlit", "Plotly", "scikit-learn", "Pandas"], id: "tiktok-retention" },
  { title: "TikTok A/B Testing", tagline: "Because 'ship it' should be a data-driven decision.", desc: "Simulates a real-world A/B experimentation suite across 4 concurrent TikTok product tests — Welch's T-Test, Chi-Square, Cohen's d, and an executive Streamlit dashboard.", tags: ["Python", "Streamlit", "SciPy", "Pandas"], id: "tiktok-ab-testing" },
  { title: "JoBo (Journalising Book)", tagline: "Written in these pages are the stories that you have penned down!", desc: "Uses OCR to pull text from photos of journals — turning handwriting into searchable digital entries.", tags: ["Python", "OpenCV", "Tesseract OCR"], id: "jobo" },
  { title: "Solite's Corner", tagline: "A cozy safe space on the internet, for you....& just YOU!", desc: "Full email login and Firebase-backed storage — hosted on GitHub Pages, engineered to feel like home.", tags: ["Firebase", "GitHub Pages", "JavaScript"], id: "solites-corner" },
  { title: "Speech Recognition Pipeline", tagline: "Teaching machines to listen.", desc: "Lightweight pipeline around Wav2Vec 2.0 — clean, accurate speech-to-text that actually works.", tags: ["Wav2Vec", "PyTorch", "NumPy"], id: "speech-recognition" },
  { title: "AI Resume Analyzer", tagline: "Your resume, but smarter.", desc: "NLP-powered tool reading your resume like a recruiter — giving actionable feedback, not silence.", tags: ["NLP", "Python", "spaCy"], id: "ai-resume-analyzer" },
  { title: "ScamCheck Agent", tagline: "Because 'it looked legit' is not a fraud prevention strategy.", desc: "Intelligent scam detection on Cloudflare's edge. Paste a URL — it runs page analysis, Reddit scan, and Llama 3.1 AI verdict in parallel.", tags: ["Cloudflare Workers", "Llama 3.1", "WebSockets"], id: "scamcheck-agent" },
  { title: "ScamScan", tagline: "Not everything with 5 stars deserves your money.", desc: "Scrapes 6,000+ Reddit posts, detects scam signals using NLP and scores trust on a 0–100 scale.", tags: ["Python", "TextBlob", "Streamlit"], id: "scamscan" },
  { title: "Komiso", tagline: "Set it, forget it — let the agents do the hustle.", desc: "Multi-agent affiliate automation in N8N that autonomously scouts programs, generates AI content, tracks performance metrics, and delivers weekly reports via Gmail.", tags: ["N8N", "Groq LLaMA 3.3", "SerpAPI", "Google Sheets"], id: "komiso" },
  { title: "SOLÈNE", tagline: "Where fabric meets philosophy.", desc: "A luxury fashion editorial website with a Three.js geometric hero, ivory and gold palette, and Cormorant Garamond typography.", tags: ["Three.js", "HTML/CSS", "JavaScript", "GitHub Pages"], id: "solene" },
];

const FEATURED_DATA: Record<string, { github?: string; demo?: string }> = {
  "tiktok-retention":   { github: "https://github.com/kalpanajoycedovari/tiktok-retention-dashboard", demo: "https://tiktok-retention-dashboard.streamlit.app/" },
  "tiktok-ab-testing":  { github: "https://github.com/kalpanajoycedovari/tiktok-ab-testing-analysis", demo: "https://tiktok-ab-testing-analysis.streamlit.app/" },
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

// ── Particle canvas — amber network animation ────────────────────────────────
function ParticleCanvas({ hovered }: { hovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const hoveredRef = useRef(hovered);

  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth || 400;
    const H = canvas.offsetHeight || 300;
    canvas.width = W;
    canvas.height = H;

    type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const pts: P[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.5,
      alpha: Math.random() * 0.45 + 0.2,
    }));

    const CONN = 95;
    const RGB = "245,158,11";

    function tick() {
      ctx!.clearRect(0, 0, W, H);
      const sp = hoveredRef.current ? 1.8 : 1;
      for (const p of pts) {
        p.x += p.vx * sp;
        p.y += p.vy * sp;
        if (p.x < 0) p.x = W;
        else if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        else if (p.y > H) p.y = 0;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONN) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(${RGB},${(1 - d / CONN) * (hoveredRef.current ? 0.38 : 0.16)})`;
            ctx!.lineWidth = 0.55;
            ctx!.moveTo(pts[i].x, pts[i].y);
            ctx!.lineTo(pts[j].x, pts[j].y);
            ctx!.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${RGB},${hoveredRef.current ? Math.min(p.alpha + 0.35, 0.9) : p.alpha})`;
        ctx!.fill();
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Book card ────────────────────────────────────────────────────────────────
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
        borderRadius: "16px",
        border: `1px solid ${open ? `${A}50` : `${A}18`}`,
        background: "#0a0807",
        transition: "border-color 0.4s ease",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <ParticleCanvas hovered={open} />

      {/* Amber glow overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: open
          ? `radial-gradient(ellipse at 55% 40%, ${A}18 0%, transparent 65%)`
          : `radial-gradient(ellipse at 30% 70%, ${A}08 0%, transparent 55%)`,
        transition: "background 0.5s ease",
      }} />

      {/* Top dot + label */}
      <div style={{
        position: "absolute", top: "20px", left: "24px", zIndex: 2,
        opacity: open ? 0 : 1, transition: "opacity 0.2s ease",
        display: "flex", gap: "6px", alignItems: "center",
      }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: A }} />
        <span style={{ fontSize: "0.6rem", color: A, fontWeight: 600, letterSpacing: "0.12em" }}>PROJECT</span>
      </div>

      {/* Title panel — default state */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "22px 24px", zIndex: 2,
        opacity: open ? 0 : 1,
        transform: open ? "translateY(6px)" : "translateY(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        <p style={{ color: A, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "4px" }}>FEATURED</p>
        <h3 style={{ fontSize: "1.1rem", fontFamily: "'Inter',sans-serif", fontWeight: 700, lineHeight: 1.3, color: "white", marginBottom: "3px" }}>{p.title}</h3>
        <p style={{ color: A, fontSize: "0.75rem", fontStyle: "italic", opacity: 0.85 }}>"{p.tagline}"</p>
      </div>

      {/* Hover content */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        padding: "28px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s",
      }}>
        <p style={{ color: A, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "12px" }}>ABOUT</p>
        <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "16px" }}>{p.desc}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "18px" }}>
          {p.tags.map(t => (
            <span key={t} style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 500, border: `1px solid ${A}55`, color: A, background: `${A}15` }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {hasGithub && (
            <a href={data.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 500, textDecoration: "none", background: "rgba(255,255,255,0.08)", border: `1px solid ${A}44`, color: "white", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              Code
            </a>
          )}
          {hasDemo && (
            <a href={data.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none", background: `linear-gradient(135deg, ${A}, #fb923c)`, border: "none", color: "#0a0807", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
          {!hasGithub && !hasDemo && (
            <span style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 500, background: "rgba(255,255,255,0.06)", border: `1px solid ${A}22`, color: `${A}88`, display: "inline-flex", alignItems: "center", gap: "5px" }}>
              🖥️ Local Build
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Komiso spotlight ─────────────────────────────────────────────────────────
function KomisoSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6 }}
      style={{ position: "relative", borderRadius: "20px", padding: "36px 40px", background: `linear-gradient(135deg, ${A}12 0%, ${A}04 100%)`, border: `1px solid ${A}33`, overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: `radial-gradient(circle, ${A}18 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "10px", padding: "4px 12px", borderRadius: "999px", background: `${A}18`, border: `1px solid ${A}44` }}>
            <span style={{ fontSize: "0.68rem", color: A, fontWeight: 600, letterSpacing: "0.1em" }}>✦ LATEST BUILD</span>
          </div>
          <h3 style={{ fontSize: "1.9rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "white", marginBottom: "6px", lineHeight: 1.1 }}>Komiso</h3>
          <p style={{ fontSize: "0.88rem", color: A, fontStyle: "italic" }}>"Set it, forget it — let the agents do the hustle."</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "flex-start" }}>
          {["N8N", "Groq LLaMA 3.3", "SerpAPI", "Google Sheets"].map(t => (
            <span key={t} style={{ padding: "5px 12px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 500, border: `1px solid ${A}44`, color: A, background: `${A}12` }}>{t}</span>
          ))}
        </div>
      </div>
      <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "680px", marginBottom: "28px" }}>
        A multi-agent affiliate automation system built in N8N that autonomously scouts affiliate programs, generates AI-written content, tracks performance metrics, and delivers weekly digest reports straight to Gmail — all on a fully free stack.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
        {["Scout Agent", "→", "Content Agent", "→", "Tracker Agent", "→", "Report Agent"].map((step, i) => (
          step === "→"
            ? <span key={i} style={{ color: `${A}55`, fontSize: "0.8rem" }}>→</span>
            : <span key={i} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 600, background: `${A}12`, color: "rgba(255,255,255,0.85)", border: `1px solid ${A}25` }}>{step}</span>
        ))}
      </div>
      <p style={{ fontSize: "0.75rem", color: `${A}77`, display: "flex", alignItems: "center", gap: "6px" }}>
        <span>🖥️</span> Local build · N8N self-hosted · No cloud deployment
      </p>
    </motion.div>
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
    { number: "01", title: "At a Glance", subtitle: "Numbers, momentum, and what's keeping me busy right now", color: A, children: <StatsAndBuilding /> },
    { number: "02", title: "Tech Stack", subtitle: "Everything I work with — click a category to filter", color: A, children: <TechStack /> },
    { number: "03", title: "Case Studies", subtitle: "UX/UI research and redesign — click a card to flip it", color: A, children: <CaseStudies /> },
    { number: "04", title: "Latest Build", subtitle: "What I shipped most recently ✦", color: A, children: <KomisoSpotlight /> },
    {
      number: "05", title: "Featured Projects", subtitle: "Hover to preview · Click to explore ✨", color: A,
      children: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {FEATURED.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <TiltCard style={{ height: "100%" }}>
                  <BookCard p={p} />
                </TiltCard>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ marginTop: "24px" }}>
            <Link href="/projects" style={{ color: A, fontSize: "0.9rem" }}>View all projects →</Link>
          </motion.div>
        </div>
      ),
    },
    { number: "06", title: "Coding Activity", subtitle: "Proof that I actually show up", color: A, children: <GitHubGraph /> },
  ];

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px", maxWidth: "1000px", margin: "0 auto", position: "relative" }}>

        {/* Clock */}
        <div style={{ position: "absolute", top: "100px", right: "0", background: "rgba(255,255,255,0.03)", border: `1px solid ${A}22`, borderRadius: "12px", padding: "10px 14px", display: "flex", flexDirection: "column", gap: "3px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ fontSize: "0.65rem" }}>📍</span>
            <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>London, UK</span>
          </div>
          <p style={{ fontSize: "1rem", fontWeight: 600, fontVariantNumeric: "tabular-nums", color: A, lineHeight: 1 }}>
            {now ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--"}
          </p>
          <p style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>
            {now ? now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "---"}
          </p>
        </div>

        {/* Giant name */}
        <motion.div style={{ marginBottom: "32px" }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "20px", padding: "6px 14px", borderRadius: "999px", background: `${A}15`, border: `1px solid ${A}44` }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: A, animation: "pulse-amber 2s infinite" }} />
            <span style={{ fontSize: "0.75rem", color: A, fontWeight: 500 }}>Open to opportunities</span>
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
        <motion.div style={{ display: "flex", alignItems: "flex-start", gap: "40px", marginBottom: "48px", flexWrap: "wrap" }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ fontSize: "1.15rem", color: A, fontWeight: 600, marginBottom: "12px", minHeight: "1.8rem" }}>
              <TypeAnimation
                sequence={["AI/ML Engineer", 2000, "Data Analyst", 2000, "MSc AI Student", 2000, "Problem Solver", 2000, "Builder of Things", 2000]}
                wrapper="span" speed={50} repeat={Infinity} cursor={true}
              />
            </div>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "480px" }}>
              "My first real task at work wasn't a problem set with a right answer — it was just 'how did we perform last week?' I sat there for ten minutes, everything I'd studied suddenly feeling very far away. That moment taught me more than any lecture did. Now I build from the question first, the query second."
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "4px" }}>
            {["Based in London 🇬🇧", "Currently — MSc AI", "Available to work and internships from Summer 2026 (May)"].map(t => (
              <span key={t} style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: A, flexShrink: 0 }} />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "60px" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}>
          <Link href="/projects" className="btn-primary">View Projects →</Link>
          <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><GithubIcon /> GitHub</a>
          <a href="https://linkedin.com/in/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><LinkedInIcon /> LinkedIn</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume ↗</a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div style={{ display: "flex", alignItems: "center", gap: "12px" }} initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1, delay: 0.8 }}>
          <div style={{ width: "32px", height: "1px", background: A }} />
          <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>SCROLL TO EXPLORE</p>
        </motion.div>

        <style>{`
          @keyframes pulse-amber {
            0%   { box-shadow: 0 0 0 0 rgba(245,158,11,0.55); }
            70%  { box-shadow: 0 0 0 8px rgba(245,158,11,0); }
            100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
          }
        `}</style>
      </section>

      {/* ── Timeline sections ── */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 32px 80px" }}>
        <TimelineLayout sections={SECTIONS} />
      </div>
    </div>
  );
}