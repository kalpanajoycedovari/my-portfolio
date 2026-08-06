"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  // JoyOS boot sequence
  const bootLines = [
    "Booting JoyOS...",
    "✓ Loading AI Runtime",
    "✓ Connecting Services",
    "✓ Initializing Governance Layer",
    "✓ Loading Vector Memory",
    "✓ Ready",
  ];
  const SYSTEMS = [
    { name: "Governance Layer", status: "Healthy" },
    { name: "Policy Engine", status: "Running" },
    { name: "API Gateway", status: "Online" },
    { name: "Audit Logs", status: "Streaming" },
  ];
  const [booting, setBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("joyos_booted")) {
      setBooting(false);
      return;
    }
    let step = 0;
    const iv = setInterval(() => {
      step += 1;
      setBootStep(step);
      if (step >= bootLines.length) {
        clearInterval(iv);
        setTimeout(() => {
          setBooting(false);
          if (typeof window !== "undefined") sessionStorage.setItem("joyos_booted", "1");
        }, 500);
      }
    }, 320);
    return () => clearInterval(iv);
  }, []);

  const SECTIONS = [
    { number: "01", title: "Tech Stack",         subtitle: "Everything I work with — click a category to filter",    color: A, children: <TechStack /> },
    { number: "02", title: "Case Studies",       subtitle: "UX/UI research and redesign — click a card to flip it",  color: A, children: <CaseStudies /> },
  ];

  return (
    <div>
      {/* HERO — JoyOS */}
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
        <motion.div style={{ marginBottom: "28px" }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "20px", padding: "6px 14px", borderRadius: "999px", background: `${A}12`, border: `1px solid ${A}44` }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: A, animation: "pulse-blue 2s infinite" }} />
            <span style={{ fontSize: "0.75rem", color: A, fontWeight: 500 }}>Open to opportunities</span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.2em", marginBottom: "14px", textTransform: "uppercase" }}>
            Kalpana Joyce Dovari
          </p>
          <h1 style={{ fontSize: "clamp(4rem, 12vw, 9rem)", lineHeight: 0.9, fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "10px" }}>
            <span className="gradient-text">Joyce</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: A, fontWeight: 600, letterSpacing: "0.02em" }}>AI Engineer</p>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "440px", marginTop: "12px" }}>
            Building production AI systems that reason, govern, and automate decisions.
          </p>
        </motion.div>

        {/* JoyOS system panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            maxWidth: "540px", marginBottom: "36px",
            background: "rgba(255,255,255,0.55)", backdropFilter: "blur(10px)",
            border: `1px solid ${A}33`, borderRadius: "14px", padding: "20px 22px",
            fontFamily: "'SFMono-Regular', 'Consolas', ui-monospace, monospace",
            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          }}
        >
          {booting ? (
            <div>
              {bootLines.slice(0, bootStep).map((line, i) => (
                <motion.p
                  key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}
                  style={{ fontSize: "0.82rem", color: i === 0 ? A : "var(--text-secondary)", lineHeight: 1.9, letterSpacing: "0.01em" }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.18em", color: "var(--text-secondary)", fontWeight: 600 }}>AI SYSTEM STATUS</span>
                <span style={{ fontSize: "0.68rem", color: A, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 1.6s infinite" }} />
                  ALL SYSTEMS OPERATIONAL
                </span>
              </div>
              {SYSTEMS.map((s, i) => (
                <motion.div
                  key={s.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: i < SYSTEMS.length - 1 ? `1px solid ${A}15` : "none" }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.84rem", color: "var(--text-primary)" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 1.8s infinite", flexShrink: 0 }} />
                    {s.name}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: A, fontWeight: 500 }}>{s.status}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Buttons */}
        <motion.div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "56px" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}>
          <a href="https://governance-backend.victoriousdesert-a185ae98.swedencentral.azurecontainerapps.io/" target="_blank" rel="noreferrer" className="btn-primary">Live Demo →</a>
          <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><GithubIcon /> GitHub</a>
          <Link href="/projects" className="btn-ghost">Architecture →</Link>
          <Link href="/projects" className="btn-ghost">View Projects →</Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div style={{ display: "flex", alignItems: "center", gap: "12px" }} initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1, delay: 0.9 }}>
          <div style={{ width: "32px", height: "1px", background: A }} />
          <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>SCROLL TO EXPLORE</p>
        </motion.div>

        <style>{`
          @keyframes pulse-blue {
            0%   { box-shadow: 0 0 0 0 rgba(56,168,216,0.55); }
            70%  { box-shadow: 0 0 0 8px rgba(56,168,216,0); }
            100% { box-shadow: 0 0 0 0 rgba(56,168,216,0); }
          }
          @keyframes pulse-dot {
            0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
            70%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
            100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
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