"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS, CATEGORIES, type Category } from "./data";

const STATUS_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  "Completed":   { bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  color: "#2baa7e" },
  "Live":        { bg: "rgba(56,168,216,0.1)",  border: "rgba(56,168,216,0.3)",  color: "#38a8d8" },
  "In Progress": { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)", color: "#e05a7a" },
};

const CATEGORY_META: Record<string, { description: string }> = {
  "AI & Machine Learning": {
    description: "End-to-end ML systems — trained, versioned, tested, and deployed.",
  },
  "Data Analytics": {
    description: "Pipelines, dashboards, and statistical analysis on real datasets.",
  },
  "AI Agents & Automation": {
    description: "Multi-agent workflows, edge AI, and automation systems.",
  },
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
        background: "#0a0a0a",
        border: `1px solid ${open ? "rgba(56,168,216,0.35)" : "rgba(56,168,216,0.12)"}`,
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={{
        position: "absolute",
        top: 0, left: 0, bottom: 0,
        width: open ? "36%" : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "24px 20px",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 2,
        background: "rgba(224,242,254,0.6)",
        overflow: "hidden",
      }}>
        <span style={{
          display: "inline-block",
          padding: "3px 10px",
          borderRadius: "999px",
          fontSize: "0.7rem",
          fontWeight: 500,
          marginBottom: "16px",
          width: "fit-content",
          background: s.bg,
          border: `1px solid ${s.border}`,
          color: s.color,
          opacity: open ? 0 : 1,
          transition: "opacity 0.15s ease",
          whiteSpace: "nowrap",
        }}>
          {p.status}
        </span>
        <h3 style={{
          fontSize: "0.88rem",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          lineHeight: 1.4,
          color: "#1a1a1a",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          wordBreak: "break-word",
        }}>
          {p.title}
        </h3>
        <p style={{
          color: "#6b7280",
          fontSize: "0.72rem",
          marginTop: "auto",
          opacity: open ? 0 : 1,
          transition: "opacity 0.15s ease",
        }}>
          {p.year}
        </p>
      </div>

      <div style={{
        position: "absolute",
        top: 0, bottom: 0,
        left: open ? "36%" : "100%",
        width: "1px",
        background: "rgba(56,168,216,0.25)",
        transition: "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 4,
      }} />

      <div style={{
        position: "absolute",
        top: 0, right: 0, bottom: 0,
        width: "64%",
        background: "rgba(224,242,254,0.85)",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 18px 20px 16px",
        opacity: open ? 1 : 0,
        transform: open ? "translateX(0)" : "translateX(12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        pointerEvents: open ? "auto" : "none",
      }}>
        <p style={{ color: "#38a8d8", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "8px", textTransform: "uppercase" }}>
          About
        </p>
        <p style={{ color: "#1a1a1a", fontSize: "0.8rem", lineHeight: 1.65, marginBottom: "10px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {p.desc}
        </p>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "12px" }}>
          {p.tags.map(t => (
            <span key={t} className="badge" style={{ fontSize: "0.62rem", padding: "2px 7px" }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {p.github && (
            <span role="link" tabIndex={0} onClick={e => { e.stopPropagation(); window.open(p.github, "_blank", "noreferrer"); }}
              style={{ padding: "5px 12px", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 500, textDecoration: "none", background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.12)", color: "#1a1a1a", display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              Code
            </span>
          )}
          {p.demo && (
            <span role="link" tabIndex={0} onClick={e => { e.stopPropagation(); window.open(p.demo, "_blank", "noreferrer"); }}
              style={{ padding: "5px 12px", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 500, textDecoration: "none", background: "linear-gradient(135deg, #38a8d8, #1e8fbe)", border: "none", color: "#ffffff", display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function CategorySection({ category, projects }: { category: string; projects: typeof PROJECTS }) {
  const meta = CATEGORY_META[category];
  return (
    <div style={{ marginBottom: "56px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <h2 style={{ fontSize: "0.78rem", fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#38a8d8", whiteSpace: "nowrap" }}>
          {category}
        </h2>
        <div style={{ flex: 1, height: "1px", background: "rgba(56,168,216,0.15)" }} />
        <span style={{ fontSize: "0.72rem", color: "rgba(0,0,0,0.25)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </span>
      </div>
      <p style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "20px" }}>{meta.description}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {projects.map(p => <BookCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const categories = CATEGORIES.filter(c => c !== "All") as string[];
  const filteredProjects = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);
  const groupedByCategory = categories.reduce((acc, cat) => {
    const projects = filteredProjects.filter(p => p.category === cat);
    if (projects.length > 0) acc[cat] = projects;
    return acc;
  }, {} as Record<string, typeof PROJECTS>);

  return (
    <div className="section">
      <div style={{ marginBottom: "44px" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>Projects</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px" }}>
          Things I've built, shipped, and learned from. Hover to open.
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "48px" }}>
        {CATEGORIES.map(cat => {
          const isActive = activeFilter === cat;
          const count = cat === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length;
          return (
            <button key={cat} onClick={() => setActiveFilter(cat)} style={{
              padding: "8px 18px", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
              transition: "all 0.2s ease",
              border: isActive ? "1px solid rgba(56,168,216,0.6)" : "1px solid rgba(0,0,0,0.1)",
              background: isActive ? "rgba(56,168,216,0.12)" : "transparent",
              color: isActive ? "#38a8d8" : "#6b7280",
              display: "inline-flex", alignItems: "center", gap: "6px",
            }}>
              {cat}
              <span style={{ fontSize: "0.68rem", padding: "1px 6px", borderRadius: "999px", background: isActive ? "rgba(56,168,216,0.2)" : "rgba(0,0,0,0.06)", color: isActive ? "#38a8d8" : "#6b7280" }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {Object.entries(groupedByCategory).map(([cat, projects]) => (
        <CategorySection key={cat} category={cat} projects={projects} />
      ))}
    </div>
  );
}