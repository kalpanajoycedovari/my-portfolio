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
          opacity: open ? 0.25 : 0.55,
          transition: "opacity 0.4s ease",
        }}
      />
      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(13,15,26,0.95) 0%, rgba(13,15,26,0.5) 100%)",
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
        }}>
          <p style={{ color: "var(--accent-lavender)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "8px" }}>
            ABOUT
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "12px" }}>
            {p.desc}
          </p>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "12px" }}>
            {p.tags.map(t => (
              <span key={t} className="badge" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>{t}</span>
            ))}
          </div>
          <p style={{ color: "var(--accent-rose)", fontSize: "0.75rem" }}>View on GitHub →</p>
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