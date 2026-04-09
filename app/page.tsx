"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "./components/FadeIn";
import TiltCard from "./components/TiltCard";

// ── Orbiting tech stack ──────────────────────────────────────────────────────
const SKILL_ORBITS = [
  { label: "AI / ML",     color: "#f59e0b", radius: 130, speed: 0.004,  tilt: 0.42, phase: 0,   items: ["PyTorch", "TensorFlow", "scikit-learn", "Keras", "OpenCV", "NumPy", "Pandas", "Wav2Vec"] },
  { label: "Frontend",    color: "#fb923c", radius: 220, speed: 0.0028, tilt: 0.36, phase: 1.1, items: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "Bootstrap"] },
  { label: "Backend",     color: "#f43f5e", radius: 310, speed: 0.0018, tilt: 0.28, phase: 2.4, items: ["Flask", "Firebase", "MongoDB", "MySQL", "Express.js", "Web Scraping"] },
  { label: "Data & Tools",color: "#fcd34d", radius: 400, speed: 0.0012, tilt: 0.22, phase: 3.8, items: ["Tableau", "Power BI", "Docker", "Vercel", "Jupyter", "Google Colab", "VS Code", "GitHub Pages"] },
];

function TechOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number, t = 0;
    const dpr = window.devicePixelRatio || 1;
    const W = 900, H = 820;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);
    const cx = W / 2, cy = H / 2 - 30;

    type Node = { label: string; color: string; angle: number; orbitR: number; tilt: number; speed: number };
    const nodes: Node[] = [];
    SKILL_ORBITS.forEach(o => o.items.forEach((item, i) => nodes.push({
      label: item, color: o.color,
      angle: o.phase + (i / o.items.length) * Math.PI * 2,
      orbitR: o.radius, tilt: o.tilt, speed: o.speed,
    })));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      SKILL_ORBITS.forEach(o => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, o.radius, o.radius * o.tilt, 0, 0, Math.PI * 2);
        ctx.strokeStyle = o.color + "22"; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.font = "500 11px Inter, sans-serif";
        ctx.fillStyle = o.color + "88"; ctx.textAlign = "left";
        ctx.fillText(o.label, cx + o.radius + 8, cy + 4);
      });

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52);
      glow.addColorStop(0, "rgba(245,158,11,0.8)"); glow.addColorStop(0.5, "rgba(251,146,60,0.3)"); glow.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(cx, cy, 52, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();
      const core = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx, cy, 18);
      core.addColorStop(0, "#fef3e2"); core.addColorStop(0.5, "#f59e0b"); core.addColorStop(1, "#d97706");
      ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fillStyle = core; ctx.fill();
      ctx.font = "700 9px Inter, sans-serif"; ctx.fillStyle = "#0e0a07"; ctx.textAlign = "center";
      ctx.fillText("TECH", cx, cy - 2); ctx.fillText("STACK", cx, cy + 9);

      nodes.forEach(n => {
        const angle = n.angle + t * n.speed;
        const px = cx + Math.cos(angle) * n.orbitR;
        const py = cy + Math.sin(angle) * n.orbitR * n.tilt;
        const isHov = hoveredRef.current === n.label;
        const nodeR = isHov ? 9 : 6;
        const ng = ctx.createRadialGradient(px, py, 0, px, py, nodeR * 3.5);
        ng.addColorStop(0, n.color + (isHov ? "ee" : "88")); ng.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(px, py, nodeR * 3.5, 0, Math.PI * 2); ctx.fillStyle = ng; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, nodeR, 0, Math.PI * 2); ctx.fillStyle = isHov ? "#fef3e2" : n.color; ctx.fill();
        const ly = py < cy ? py - nodeR - 6 : py + nodeR + 14;
        ctx.font = isHov ? "700 12px Inter, sans-serif" : "400 10.5px Inter, sans-serif";
        ctx.fillStyle = isHov ? "#fef3e2" : n.color + "cc"; ctx.textAlign = "center";
        ctx.fillText(n.label, px, ly);
      });
      t++; animId = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);
      const my = (e.clientY - rect.top) * (H / rect.height);
      let found: string | null = null;
      nodes.forEach(n => {
        const angle = n.angle + t * n.speed;
        const px = cx + Math.cos(angle) * n.orbitR;
        const py = cy + Math.sin(angle) * n.orbitR * n.tilt;
        if (Math.hypot(mx - px, my - py) < 14) found = n.label;
      });
      hoveredRef.current = found; setHovered(found);
    };
    canvas.addEventListener("mousemove", onMove);
    draw();
    return () => { cancelAnimationFrame(animId); canvas.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ width: "100%", maxWidth: "900px", height: "auto", cursor: hovered ? "pointer" : "default" }} />
    </div>
  );
}

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
      {/* ── HERO — full screen statement ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px", maxWidth: "1000px", margin: "0 auto", position: "relative" }}>

        {/* Clock — top right corner */}
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
        <motion.div
          style={{ marginBottom: "32px" }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.2em", marginBottom: "16px", textTransform: "uppercase" }}>
            Kalpana Joyce Dovari
          </p>
          <h1 style={{ fontSize: "clamp(5rem, 14vw, 11rem)", lineHeight: 0.9, fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: "-0.03em" }}>
            <span className="gradient-text">Joyce</span>
            <span style={{ display: "block", color: "rgba(254,243,226,0.08)", fontSize: "0.55em", letterSpacing: "0.02em" }}>———</span>
          </h1>
        </motion.div>

        {/* Role + description */}
        <motion.div
          style={{ display: "flex", alignItems: "flex-start", gap: "40px", marginBottom: "48px", flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div style={{ flex: 1, minWidth: "280px" }}>
            <p style={{ fontSize: "1.15rem", color: "var(--text-primary)", fontWeight: 500, marginBottom: "12px" }}>
              AI/ML Engineer · MSc Artificial Intelligence
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "480px" }}>
              Building intelligent systems that solve real-world problems. I turn data into decisions and ideas into deployed applications.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "4px" }}>
            {["Open to opportunities", "Based in London 🇬🇧", "Currently — MSc AI"].map(t => (
              <span key={t} style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent-amber)", flexShrink: 0 }} />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "60px" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link href="/projects" className="btn-primary">View Projects →</Link>
          <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><GithubIcon /> GitHub</a>
          <a href="https://linkedin.com/in/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><LinkedInIcon /> LinkedIn</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume ↗</a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "12px", opacity: 0.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div style={{ width: "32px", height: "1px", background: "var(--accent-amber)" }} />
          <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>SCROLL TO EXPLORE</p>
        </motion.div>
      </section>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 32px 80px" }}>

        {/* ── Tech Stack ── */}
        <section style={{ marginBottom: "80px" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "6px" }}>
              <p style={{ color: "var(--accent-amber)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.15em" }}>01</p>
              <h2 style={{ fontSize: "2.2rem" }}>Tech Stack</h2>
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", paddingLeft: "32px" }}>Every tool in orbit — hover a node to highlight it</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <TechOrbit />
          </FadeIn>
        </section>

        {/* ── Featured Projects ── */}
        <section style={{ marginBottom: "80px" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "6px" }}>
              <p style={{ color: "var(--accent-amber)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.15em" }}>02</p>
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