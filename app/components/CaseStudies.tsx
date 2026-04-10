"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CASE_STUDIES = [
  {
    id: "duolingo",
    title: "Duolingo Reimagined",
    subtitle: "Teaching language, not just surviving it",
    problem: "500M+ users. Less than 1% reach conversational fluency. Duolingo teaches you to pass a quiz — not to speak. This redesign adds the pedagogical layer the app is missing: grammar, conjugation, real pronunciation, and personalised vocabulary.",
    domain: "UX/UI Design",
    tools: ["Figma", "Maze"],
    timeline: "2 weeks",
    stats: [
      { value: "500M+", label: "Downloads" },
      { value: "<1%", label: "Reach fluency" },
      { value: "8/8", label: "Users preferred redesign" },
    ],
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, #1a1000, #2a1800)",
    emoji: "🦉",
    docx: "/case-studies/duolingo-case-study.docx",
    pptx: "/case-studies/duolingo-case-study.pptx",
  },
  {
    id: "pinterest",
    title: "Pinterest Reclaimed",
    subtitle: "Giving users control of what they walk into",
    problem: "Pinterest was a safe space. Now AI-generated imagery, affiliate links, and ads are mixed together with no walls between them. This redesign gives users three modes — Origin, AI Studio, Explore — so they choose what version of Pinterest they walk into.",
    domain: "UX/UI Design",
    tools: ["Figma", "Maze"],
    timeline: "2 weeks",
    stats: [
      { value: "91%", label: "Miss old Pinterest" },
      { value: "61%", label: "Can't tell AI from real" },
      { value: "6/6", label: "Understood mode system" },
    ],
    accent: "#c084fc",
    gradient: "linear-gradient(135deg, #0e0018, #1a0030)",
    emoji: "📌",
    docx: "/case-studies/pinterest-case-study.docx",
    pptx: "/case-studies/pinterest-case-study.pptx",
  },
];

function CaseStudyCard({ cs }: { cs: typeof CASE_STUDIES[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{ perspective: "1200px", height: "380px", cursor: "pointer" }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
      >
        {/* ── Front ── */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          background: cs.gradient,
          border: `1px solid ${cs.accent}33`,
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
          {/* Glow */}
          <div style={{ position: "absolute", top: -40, right: -40, width: "180px", height: "180px", borderRadius: "50%", background: `radial-gradient(circle, ${cs.accent}18, transparent 70%)`, pointerEvents: "none" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <span style={{ fontSize: "2.2rem" }}>{cs.emoji}</span>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: "999px", background: `${cs.accent}18`, border: `1px solid ${cs.accent}33`, color: cs.accent, fontWeight: 500 }}>
                {cs.domain}
              </span>
              <p style={{ fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: "6px" }}>{cs.timeline} · {cs.tools.join(", ")}</p>
            </div>
          </div>

          <h3 style={{ fontSize: "1.4rem", fontFamily: "'Playfair Display', serif", marginBottom: "6px", color: "var(--text-primary)" }}>
            {cs.title}
          </h3>
          <p style={{ fontSize: "0.82rem", color: cs.accent, fontStyle: "italic", marginBottom: "16px" }}>
            "{cs.subtitle}"
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, flex: 1 }}>
            {cs.problem}
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "16px", marginTop: "20px", paddingTop: "16px", borderTop: `1px solid ${cs.accent}22` }}>
            {cs.stats.map(s => (
              <div key={s.label} style={{ flex: 1, textAlign: "center" }}>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: cs.accent, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: "0.65rem", color: "var(--text-secondary)", marginTop: "3px" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Flip hint */}
          <div style={{ position: "absolute", bottom: "12px", right: "16px", fontSize: "0.65rem", color: "var(--text-secondary)", opacity: 0.5, display: "flex", alignItems: "center", gap: "4px" }}>
            <motion.span animate={{ rotateY: [0, 180, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}>⟳</motion.span>
            click to flip
          </div>
        </div>

        {/* ── Back ── */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: cs.gradient,
          border: `1px solid ${cs.accent}55`,
          borderRadius: "16px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          overflow: "hidden",
        }}>
          {/* Glow */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${cs.accent}12, transparent 70%)`, pointerEvents: "none" }} />

          <span style={{ fontSize: "2.8rem" }}>{cs.emoji}</span>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "1.3rem", fontFamily: "'Playfair Display', serif", marginBottom: "6px" }}>{cs.title}</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>View the full case study</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "260px" }}>
            <a
              href={cs.docx}
              download
              onClick={e => e.stopPropagation()}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                padding: "14px 24px", borderRadius: "12px", textDecoration: "none",
                background: `${cs.accent}18`, border: `1px solid ${cs.accent}44`,
                color: cs.accent, fontWeight: 600, fontSize: "0.9rem",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <polyline points="9 15 12 18 15 15"/>
              </svg>
              Download .docx
            </a>
            <a
              href={cs.pptx}
              download
              onClick={e => e.stopPropagation()}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                padding: "14px 24px", borderRadius: "12px", textDecoration: "none",
                background: "linear-gradient(135deg, #f59e0b, #fb923c)",
                border: "none", color: "#0e0a07", fontWeight: 700, fontSize: "0.9rem",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Download .pptx
            </a>
          </div>

          <p style={{ fontSize: "0.68rem", color: "var(--text-secondary)", opacity: 0.5 }}>click anywhere to flip back</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
      {CASE_STUDIES.map((cs, i) => (
        <motion.div
          key={cs.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
        >
          <CaseStudyCard cs={cs} />
        </motion.div>
      ))}
    </div>
  );
}