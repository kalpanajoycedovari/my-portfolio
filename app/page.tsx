"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import TechStack from "./components/TechStack";
import TimelineLayout from "./components/TimelineLayout";
import CaseStudies from "./components/CaseStudies";

const A = "#38a8d8";


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
    { number: "01", title: "Tech Stack",         subtitle: "Everything I work with — click a category to filter",    color: A, children: <TechStack /> },
    { number: "02", title: "Case Studies",       subtitle: "UX/UI research and redesign — click a card to flip it",  color: A, children: <CaseStudies /> },
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
