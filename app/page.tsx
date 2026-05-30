"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import TiltCard from "./components/TiltCard";
import TechStack from "./components/TechStack";
import StatsAndBuilding from "./components/StatsAndBuilding";
import GitHubGraph from "./components/GitHubGraph";
import TimelineLayout from "./components/TimelineLayout";
import CaseStudies from "./components/CaseStudies";

const A = "#38a8d8";

const FEATURED = [
  {
    title: "FinSentiment MLOps Pipeline",
    tagline: "A Data Scientist's prototype, made production-grade.",
    desc: "End-to-end MLOps pipeline for financial news sentiment classification — trained, versioned, tested, containerised, and deployed to Azure with a full CI/CD pipeline.",
    tags: ["Python", "scikit-learn", "MLflow", "FastAPI", "Docker", "Azure"],
    id: "finsentiment-mlops",
  },
  {
    title: "UK Job Market Data Pipeline",
    tagline: "Real Azure. Real restrictions. Real pipeline anyway.",
    desc: "An end-to-end Azure data engineering pipeline ingesting live UK job market data from three sources, visualised in a 5-page Power BI dashboard.",
    tags: ["Azure Databricks", "Synapse Analytics", "Power BI", "Python"],
    id: "uk-job-market-pipeline",
  },
  {
    title: "TikTok Retention Dashboard",
    tagline: "Acquiring a user is the easy part. Keeping them is where it gets interesting.",
    desc: "End-to-end analytics across a synthetic TikTok EMEA user base of 50,000 — cohort heatmaps, survival curves, and a logistic regression churn predictor.",
    tags: ["Python", "Streamlit", "Plotly", "scikit-learn", "Pandas"],
    id: "tiktok-retention",
  },
  {
    title: "TikTok A/B Testing Suite",
    tagline: "Because 'ship it' should be a data-driven decision.",
    desc: "Real-world A/B experimentation suite across 4 concurrent product tests — Welch's T-Test, Chi-Square, Cohen's d, and an executive Streamlit dashboard.",
    tags: ["Python", "Streamlit", "SciPy", "Pandas"],
    id: "tiktok-ab-testing",
  },
  {
    title: "ScamCheck Agent",
    tagline: "Because 'it looked legit' is not a fraud prevention strategy.",
    desc: "Edge-hosted scam detection agent. Paste a URL — it runs page analysis, Reddit scanning, and AI verdict in parallel with live updates.",
    tags: ["Cloudflare Workers", "Llama 3.1", "WebSockets", "TypeScript"],
    id: "scamcheck-agent",
  },
  {
    title: "Mi Armoire",
    tagline: "Your wardrobe, curated by AI — dressed for the moment.",
    desc: "AI styling agent that builds complete outfits with FLUX-generated visuals. Pick your occasion, choose how many looks — done.",
    tags: ["LangGraph", "Groq", "FLUX.1-schnell", "Streamlit"],
    id: "mi-armoire",
  },
  {
    title: "UK Job Market Dashboard",
    tagline: "1.6 million job postings walked so this dashboard could run.",
    desc: "Interactive Tableau dashboard analysing the UK job market across top hiring companies, work type, and experience level.",
    tags: ["Tableau", "Data Analytics", "SQL"],
    id: "uk-job-market",
  },
  {
    title: "Commit Roaster",
    tagline: "Your code is fine. Your commit messages? Not so much.",
    desc: "Reads your Git commit history and roasts it — mercilessly, specifically, and with love.",
    tags: ["Python", "Streamlit", "Claude API"],
    id: "commit-roaster",
  },
  {
    title: "NexusEdu",
    tagline: "Learning that adapts to you, not the other way around.",
    desc: "Hackathon-built AI tutoring system with multi-agent workflows that adapt learning paths by grade level and style.",
    tags: ["n8n", "OpenRouter", "Llama", "Supabase"],
    id: "nexus-edu",
  },
];

const FEATURED_DATA: Record<string, { github?: string; demo?: string }> = {
  "finsentiment-mlops":    { github: "https://github.com/kalpanajoycedovari/finsentiment-mlops", demo: "https://finsentiment-api.calmmoss-828614b8.uksouth.azurecontainerapps.io/docs" },
  "uk-job-market-pipeline":{ github: "https://github.com/kalpanajoycedovari/uk-job-market-pipeline" },
  "tiktok-retention":      { github: "https://github.com/kalpanajoycedovari/tiktok-retention-dashboard", demo: "https://tiktok-retention-dashboard.streamlit.app/" },
  "tiktok-ab-testing":     { github: "https://github.com/kalpanajoycedovari/tiktok-ab-testing-analysis", demo: "https://tiktok-ab-testing-analysis.streamlit.app/" },
  "scamcheck-agent":       { github: "https://github.com/kalpanajoycedovari/cf_ai_scamcheck_agent", demo: "https://cf-ai-scamcheck-agent.dovarikalpanajoyce.workers.dev/" },
  "mi-armoire":            { github: "https://github.com/kalpanajoycedovari/miarmoire", demo: "https://miarmoire.streamlit.app/" },
  "uk-job-market":         { github: "https://github.com/kalpanajoycedovari/uk-job-market-dashboard", demo: "https://public.tableau.com/app/profile/kalpana.joyce.dovari/viz/UKJobMarketDashboard/UKJobMarketDashboard?publish=yes" },
  "commit-roaster":        { github: "https://github.com/kalpanajoycedovari/commit-roaster", demo: "https://commit-roaster.streamlit.app/" },
  "nexus-edu":             {},
};

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
        border: `1px solid ${open ? `${A}55` : `${A}20`}`,
        background: "rgba(255,255,255,0.6)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: open ? `0 8px 32px ${A}18` : "0 2px 12px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Subtle glow overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: open
          ? `radial-gradient(ellipse at 55% 40%, ${A}12 0%, transparent 65%)`
          : "transparent",
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

      {/* Title panel — default */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "22px 24px", zIndex: 2,
        opacity: open ? 0 : 1,
        transform: open ? "translateY(6px)" : "translateY(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        <p style={{ color: A, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "4px" }}>FEATURED</p>
        <h3 style={{ fontSize: "1.05rem", fontFamily: "'Inter',sans-serif", fontWeight: 700, lineHeight: 1.3, color: "var(--text-primary)", marginBottom: "3px" }}>{p.title}</h3>
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
        <p style={{ color: "var(--text-primary)", fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "16px" }}>{p.desc}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "18px" }}>
          {p.tags.map(t => (
            <span key={t} style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 500, border: `1px solid ${A}44`, color: A, background: `${A}12` }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {hasGithub && (
            <a href={data.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 500, textDecoration: "none", background: "rgba(0,0,0,0.06)", border: `1px solid ${A}44`, color: "var(--text-primary)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              Code
            </a>
          )}
          {hasDemo && (
            <a href={data.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none", background: `linear-gradient(135deg, ${A}, #1e8fbe)`, border: "none", color: "#ffffff", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
          {!hasGithub && !hasDemo && (
            <span style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 500, background: "rgba(0,0,0,0.04)", border: `1px solid ${A}22`, color: `${A}99`, display: "inline-flex", alignItems: "center", gap: "5px" }}>
              Local Build
            </span>
          )}
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

  const SECTIONS = [
    { number: "01", title: "At a Glance",       subtitle: "Numbers, momentum, and what's keeping me busy right now", color: A, children: <StatsAndBuilding /> },
    { number: "02", title: "Tech Stack",         subtitle: "Everything I work with — click a category to filter",    color: A, children: <TechStack /> },
    { number: "03", title: "Case Studies",       subtitle: "UX/UI research and redesign — click a card to flip it",  color: A, children: <CaseStudies /> },
    {
      number: "04", title: "Featured Projects", subtitle: "Hover to preview — click to explore", color: A,
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
    { number: "05", title: "Coding Activity", subtitle: "Proof that I actually show up", color: A, children: <GitHubGraph /> },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px", maxWidth: "1000px", margin: "0 auto", position: "relative" }}>

        {/* Clock */}
        <div style={{ position: "absolute", top: "100px", right: "0", background: "rgba(255,255,255,0.7)", border: `1px solid ${A}22`, borderRadius: "12px", padding: "10px 14px", display: "flex", flexDirection: "column", gap: "3px", backdropFilter: "blur(8px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: A }} />
            <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>London, UK</span>
          </div>
          <p style={{ fontSize: "1rem", fontWeight: 600, fontVariantNumeric: "tabular-nums", color: A, lineHeight: 1 }}>
            {now ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--"}
          </p>
          <p style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>
            {now ? now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "---"}
          </p>
        </div>

        {/* Name */}
        <motion.div style={{ marginBottom: "32px" }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "20px", padding: "6px 14px", borderRadius: "999px", background: `${A}12`, border: `1px solid ${A}44` }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: A, animation: "pulse-blue 2s infinite" }} />
            <span style={{ fontSize: "0.75rem", color: A, fontWeight: 500 }}>Open to opportunities</span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.2em", marginBottom: "16px", textTransform: "uppercase" }}>
            Kalpana Joyce Dovari
          </p>
          <h1 style={{ fontSize: "clamp(5rem, 14vw, 11rem)", lineHeight: 0.9, fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: "-0.03em" }}>
            <span className="gradient-text">Joyce</span>
            <span style={{ display: "block", color: "rgba(0,0,0,0.06)", fontSize: "0.55em", letterSpacing: "0.02em" }}>———</span>
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
            {["Based in London, UK", "Currently — MSc AI", "Available from Summer 2026"].map(t => (
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
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume →</a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div style={{ display: "flex", alignItems: "center", gap: "12px" }} initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1, delay: 0.8 }}>
          <div style={{ width: "32px", height: "1px", background: A }} />
          <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>SCROLL TO EXPLORE</p>
        </motion.div>

        <style>{`
          @keyframes pulse-blue {
            0%   { box-shadow: 0 0 0 0 rgba(56,168,216,0.55); }
            70%  { box-shadow: 0 0 0 8px rgba(56,168,216,0); }
            100% { box-shadow: 0 0 0 0 rgba(56,168,216,0); }
          }
        `}</style>
      </section>

      {/* Timeline sections */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 32px 80px" }}>
        <TimelineLayout sections={SECTIONS} />
      </div>
    </div>
  );
}