"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "./data";

const STATUS_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  "Completed":   { bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  color: "#34d399" },
  "Live":        { bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.3)", color: "var(--accent-lavender)" },
  "In Progress": { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)", color: "var(--accent-rose)" },
};

function BookCard({ p }: { p: typeof PROJECTS[0] }) {
  const [open, setOpen] = useState(false);
  const s = STATUS_STYLES[p.status] ?? STATUS_STYLES["Completed"];

  return (
    <Link
      href={`/projects/${p.id}`}
      className="glass-card"
      style={{
        display: "block",
        overflow: "hidden",
        position: "relative",
        aspectRatio: "1 / 1",
        color: "inherit",
        textDecoration: "none",
        background: "var(--bg-card)",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Cover image */}
      <img
        src={p.cover}
        alt={p.title}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          opacity: open ? 0.35 : 0.85,
          transition: "opacity 0.4s ease",
        }}
      />
      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(13,15,26,0.92) 0%, rgba(13,15,26,0.2) 50%, transparent 100%)",
      }} />

      {/* Title panel — slides left */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, bottom: 0,
        width: open ? "38%" : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "24px",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 2,
        background: open ? "rgba(13,15,26,0.85)" : "transparent",
      }}>
        <span style={{
          display: "inline-block",
          padding: "3px 10px",
          borderRadius: "999px",
          fontSize: "0.7rem",
          fontWeight: 500,
          marginBottom: "12px",
          width: "fit-content",
          background: s.bg,
          border: `1px solid ${s.border}`,
          color: s.color,
          opacity: open ? 0 : 1,
          transition: "opacity 0.2s ease",
          whiteSpace: "nowrap",
        }}>
          {p.status}
        </span>
        <h3 style={{
          fontSize: "1rem",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          lineHeight: 1.3,
          marginBottom: "8px",
          color: "var(--text-primary)",
        }}>
          {p.title}
        </h3>
        <p style={{
          color: "var(--accent-rose)",
          fontSize: "0.78rem",
          fontStyle: "italic",
          lineHeight: 1.5,
          opacity: open ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}>
          "{p.tagline}"
        </p>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "0.72rem",
          marginTop: "auto",
          paddingTop: "8px",
          opacity: open ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}>
          {p.year}
        </p>
      </div>

      {/* Divider line */}
      <div style={{
        position: "absolute",
        top: 0, bottom: 0,
        left: open ? "38%" : "100%",
        width: "1px",
        background: "rgba(192,132,252,0.3)",
        transition: "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 4,
      }} />

      {/* Description panel — slides in from right */}
      <div style={{
        position: "absolute",
        top: 0, right: 0, bottom: 0,
        width: open ? "62%" : "0%",
        overflow: "hidden",
        background: "rgba(13,15,26,0.96)",
        backdropFilter: "blur(12px)",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: open ? "24px 20px" : "24px 0",
      }}>
        <div style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(16px)",
          transition: "opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s",
          minWidth: "180px",
          display: "flex",
          flexDirection: "column",
        }}>
          <p style={{ color: "var(--accent-lavender)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "8px" }}>
            ABOUT
          </p>
          <p style={{
            color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "12px",
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {p.desc}
          </p>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "12px" }}>
            {p.tags.map(t => (
              <span key={t} className="badge" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>{t}</span>
            ))}
          </div>
          {/* Action buttons */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  padding: "5px 12px", borderRadius: "999px", fontSize: "0.7rem",
                  fontWeight: 500, textDecoration: "none",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--text-primary)",
                  display: "inline-flex", alignItems: "center", gap: "4px",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                Code
              </a>
            )}
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  padding: "5px 12px", borderRadius: "999px", fontSize: "0.7rem",
                  fontWeight: 500, textDecoration: "none",
                  background: "linear-gradient(135deg, var(--accent-amber), var(--accent-orange))",
                  border: "none", color: "#0e0a07",
                  display: "inline-flex", alignItems: "center", gap: "4px",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  return (
    <div className="section">
      <div style={{ marginBottom: "52px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
          MY WORK
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>Projects</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px" }}>
          Each project started with a problem I couldn't stop thinking about. Hover to open. ✨
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
      }}>
        {PROJECTS.map(p => <BookCard key={p.title} p={p} />)}
      </div>
    </div>
  );
}