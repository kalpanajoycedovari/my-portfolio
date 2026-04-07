"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Orbiting tech stack canvas ──────────────────────────────────────────────
const SKILL_ORBITS = [
  {
    label: "AI / ML",
    color: "#34d399",
    radius: 130,
    speed: 0.004,
    tilt: 0.42,
    phase: 0,
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Keras", "OpenCV", "NumPy", "Pandas", "Wav2Vec"],
  },
  {
    label: "Frontend",
    color: "#c084fc",
    radius: 220,
    speed: 0.0028,
    tilt: 0.36,
    phase: 1.1,
    items: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "Bootstrap"],
  },
  {
    label: "Backend",
    color: "#f472b6",
    radius: 310,
    speed: 0.0018,
    tilt: 0.28,
    phase: 2.4,
    items: ["Flask", "Firebase", "MongoDB", "MySQL", "Express.js", "Web Scraping"],
  },
  {
    label: "Data & Tools",
    color: "#fbbf24",
    radius: 400,
    speed: 0.0012,
    tilt: 0.22,
    phase: 3.8,
    items: ["Tableau", "Power BI", "Docker", "Vercel", "Jupyter", "Google Colab", "VS Code", "GitHub Pages"],
  },
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

    let animId: number;
    let t = 0;

    const dpr = window.devicePixelRatio || 1;
    const W = 900, H = 820;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);
    const cx = W / 2, cy = H / 2 - 30;

    type Node = { label: string; color: string; angle: number; orbitR: number; tilt: number; speed: number };
    const nodes: Node[] = [];
    SKILL_ORBITS.forEach(orbit => {
      orbit.items.forEach((item, i) => {
        nodes.push({
          label: item,
          color: orbit.color,
          angle: orbit.phase + (i / orbit.items.length) * Math.PI * 2,
          orbitR: orbit.radius,
          tilt: orbit.tilt,
          speed: orbit.speed,
        });
      });
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Orbit rings
      SKILL_ORBITS.forEach(o => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, o.radius, o.radius * o.tilt, 0, 0, Math.PI * 2);
        ctx.strokeStyle = o.color + "28";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.font = "500 11px Inter, sans-serif";
        ctx.fillStyle = o.color + "99";
        ctx.textAlign = "left";
        ctx.fillText(o.label, cx + o.radius + 8, cy + 4);
      });

      // Core glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52);
      glow.addColorStop(0, "rgba(192,132,252,0.7)");
      glow.addColorStop(0.5, "rgba(192,132,252,0.2)");
      glow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 52, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      const core = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx, cy, 18);
      core.addColorStop(0, "#fdf4ff");
      core.addColorStop(0.5, "#c084fc");
      core.addColorStop(1, "#7c3aed");
      ctx.fillStyle = core;
      ctx.fill();

      ctx.font = "700 9px Inter, sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("TECH", cx, cy - 2);
      ctx.fillText("STACK", cx, cy + 9);

      // Nodes
      nodes.forEach(n => {
        const angle = n.angle + t * n.speed;
        const px = cx + Math.cos(angle) * n.orbitR;
        const py = cy + Math.sin(angle) * n.orbitR * n.tilt;
        const isHov = hoveredRef.current === n.label;
        const nodeR = isHov ? 9 : 6;

        const ng = ctx.createRadialGradient(px, py, 0, px, py, nodeR * 3.5);
        ng.addColorStop(0, n.color + (isHov ? "ee" : "99"));
        ng.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, nodeR * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = isHov ? "#fff" : n.color;
        ctx.fill();

        const above = py < cy;
        const ly = above ? py - nodeR - 6 : py + nodeR + 14;
        ctx.font = isHov ? "700 12px Inter, sans-serif" : "400 10.5px Inter, sans-serif";
        ctx.fillStyle = isHov ? "#fff" : n.color + "dd";
        ctx.textAlign = "center";
        ctx.fillText(n.label, px, ly);
      });

      t++;
      animId = requestAnimationFrame(draw);
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
      hoveredRef.current = found;
      setHovered(found);
    };

    canvas.addEventListener("mousemove", onMove);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth: "900px", height: "auto", cursor: hovered ? "pointer" : "default" }}
      />
    </div>
  );
}

// ── Featured projects ────────────────────────────────────────────────────────
const FEATURED = [
  { title: "JoBo (Journalising Book)", tagline: "What if your handwriting could think?", desc: "Uses OCR to pull text from photos of journals — turning handwriting into searchable digital entries.", tags: ["Python", "OpenCV", "Tesseract OCR"], id: "jobo", cover: "/projects/jobo-cover.jpg", accent: "#c084fc" },
  { title: "Solite's Corner", tagline: "A cosy corner of the internet.", desc: "Full email login and Firebase-backed storage — hosted on GitHub Pages, engineered to feel like home.", tags: ["Firebase", "GitHub Pages", "JavaScript"], id: "solites-corner", cover: "/projects/solite-cover.jpg", accent: "#34d399" },
  { title: "Speech Recognition Pipeline", tagline: "Teaching machines to listen.", desc: "Lightweight pipeline around Wav2Vec 2.0 — clean, accurate speech-to-text that actually works.", tags: ["Wav2Vec", "PyTorch", "NumPy"], id: "speech-recognition", cover: "/projects/speech-cover.jpg", accent: "#818cf8" },
  { title: "AI Resume Analyzer", tagline: "Your resume, but smarter.", desc: "NLP-powered tool reading your resume like a recruiter — giving actionable feedback, not silence.", tags: ["NLP", "Python", "spaCy"], id: "ai-resume-analyzer", cover: "/projects/resume-cover.jpg", accent: "#f472b6" },
  { title: "ScamScan", tagline: "Not everything with 5 stars deserves your money.", desc: "Scrapes 6,000+ Reddit posts, detects scam signals using NLP and scores trust on a 0–100 scale.", tags: ["Python", "TextBlob", "Streamlit"], id: "scamscan", cover: "/projects/scamscan-cover.jpg", accent: "#34d399" },
  { title: "UK Job Market Dashboard", tagline: "1.6M job postings. One dashboard.", desc: "Interactive Tableau dashboard analysing hiring companies, work types, and experience levels.", tags: ["Tableau", "SQL", "Data Analytics"], id: "uk-job-market", cover: "/projects/tableau-cover.jpg", accent: "#818cf8" },
];

function BookCard({ p }: { p: typeof FEATURED[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <Link
      href={`/projects/${p.id}`}
      className="glass-card"
      style={{ display: "block", overflow: "hidden", position: "relative", aspectRatio: "1/1", color: "inherit", textDecoration: "none" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Cover image */}
      <img src={p.cover} alt={p.title} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", opacity: open ? 0.2 : 0.5, transition: "opacity 0.4s ease",
      }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(13,15,26,0.97) 0%, rgba(13,15,26,0.5) 100%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${p.accent}18 0%, transparent 65%)` }} />

      {/* Title panel */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0,
        width: open ? "36%" : "100%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "18px", transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)", zIndex: 2,
      }}>
        <p style={{ color: p.accent, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "5px", opacity: open ? 0 : 1, transition: "opacity 0.15s" }}>FEATURED</p>
        <h3 style={{ fontSize: "0.9rem", fontFamily: "'Inter',sans-serif", fontWeight: 700, lineHeight: 1.3, marginBottom: "5px", color: "var(--text-primary)" }}>{p.title}</h3>
        <p style={{ color: p.accent, fontSize: "0.7rem", fontStyle: "italic", lineHeight: 1.4, opacity: open ? 0 : 1, transition: "opacity 0.15s" }}>"{p.tagline}"</p>
      </div>

      {/* Divider */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: open ? "36%" : "100%", width: "1px", background: `${p.accent}55`, transition: "left 0.5s cubic-bezier(0.4,0,0.2,1)", zIndex: 4 }} />

      {/* Description panel */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        width: open ? "64%" : "0%", overflow: "hidden",
        background: "rgba(13,15,26,0.97)", backdropFilter: "blur(16px)",
        transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)", zIndex: 3,
      }}>
        <div style={{
          padding: "18px 14px", opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(12px)",
          transition: "opacity 0.3s ease 0.18s, transform 0.3s ease 0.18s",
          height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px",
        }}>
          <p style={{ color: p.accent, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em" }}>ABOUT</p>
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

  return (
    <div className="section">

      {/* ── Hero ── */}
      <section style={{ paddingTop: "20px", paddingBottom: "60px", position: "relative", minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>

        {/* Clock */}
        <div className="glass-card" style={{ position: "absolute", top: "20px", right: "0", padding: "12px 16px", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "4px", minWidth: "165px" }}>
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

        <p style={{ color: "var(--accent-lavender)", fontSize: "0.9rem", fontWeight: 500, marginBottom: "12px", letterSpacing: "0.1em" }}>HI THERE, I'M</p>
        <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", lineHeight: 1.1, marginBottom: "20px" }}>
          Kalpana Joyce<br /><span className="gradient-text">Dovari</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "500px", marginBottom: "36px" }}>
          AI/ML Engineer building intelligent systems that solve real-world problems. I turn data into decisions and ideas into deployed applications.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/projects" className="btn-primary">View Projects →</Link>
          <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><GithubIcon /> GitHub</a>
          <a href="https://linkedin.com/in/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><LinkedInIcon /> LinkedIn</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume ↗</a>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.5 }}>
          <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>SCROLL TO ORBIT</p>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, var(--accent-lavender), transparent)" }} />
        </div>
      </section>

      {/* ── Orbiting Tech Stack ── */}
      <section style={{ marginBottom: "80px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "6px" }}>MY UNIVERSE</p>
        <h2 style={{ fontSize: "2rem", marginBottom: "6px" }}>Tech Stack</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>Every tool in orbit — hover a node to highlight it</p>
        <TechOrbit />
      </section>

      {/* ── Featured Projects ── */}
      <section style={{ marginBottom: "100px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>WHAT I'VE BUILT</p>
        <h2 style={{ fontSize: "2rem", marginBottom: "8px" }}>Featured Projects</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>Hover to preview · Click to explore ✨</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {FEATURED.map(p => <BookCard key={p.id} p={p} />)}
        </div>
        <div style={{ marginTop: "28px" }}>
          <Link href="/projects" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem" }}>View all projects →</Link>
        </div>
      </section>

    </div>
  );
}