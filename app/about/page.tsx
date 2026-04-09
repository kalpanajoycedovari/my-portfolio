"use client";

import { useState } from "react";

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/kalpanajoycedovari",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kalpanajoycedovari",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

const EMAIL = "dovarikalpanajoyce@gmail.com";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="section">
      <p style={{ color: "var(--accent-amber)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
        GET IN TOUCH
      </p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>Let's Connect</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "480px", marginBottom: "48px" }}>
        Whether you have an opportunity, a collaboration idea, or just want to chat AI — my inbox is open.
      </p>

      {/* Email copy card */}
      <div className="glass-card" style={{ padding: "24px 28px", marginBottom: "24px", maxWidth: "460px" }}>
        <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", letterSpacing: "0.08em", marginBottom: "8px" }}>EMAIL</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <p style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 500 }}>{EMAIL}</p>
          <button
            onClick={copyEmail}
            style={{
              padding: "8px 16px", borderRadius: "8px", fontSize: "0.8rem",
              fontWeight: 500, cursor: "pointer", flexShrink: 0,
              background: copied ? "rgba(52,211,153,0.15)" : "rgba(245,158,11,0.12)",
              border: copied ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(245,158,11,0.3)",
              color: copied ? "#34d399" : "var(--accent-amber)",
              transition: "all 0.2s ease",
            }}
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Icon link buttons */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
        {LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              padding: "20px 24px", borderRadius: "14px",
              border: hoveredLink === link.label ? "1px solid rgba(245,158,11,0.4)" : "1px solid var(--border)",
              background: hoveredLink === link.label ? "rgba(245,158,11,0.06)" : "var(--bg-card)",
              color: hoveredLink === link.label ? "var(--accent-amber)" : "var(--text-secondary)",
              textDecoration: "none", minWidth: "80px",
              transform: hoveredLink === link.label ? "translateY(-3px)" : "translateY(0)",
              boxShadow: hoveredLink === link.label ? "0 8px 24px rgba(245,158,11,0.1)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            {link.icon}
            <span style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em" }}>
              {link.label.toUpperCase()}
            </span>
          </a>
        ))}
      </div>

      {/* Info card */}
      <div className="glass-card" style={{ padding: "24px 28px", maxWidth: "460px" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.8 }}>
          Based in <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>London, UK 🇬🇧</span> — open to full-time, internship, and freelance opportunities in AI/ML and data analytics. Response time: usually within 24 hours ☕
        </p>
      </div>
    </div>
  );
}