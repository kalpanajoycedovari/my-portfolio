import { PROJECTS } from "../data";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = PROJECTS.find(p => p.id === params.id);
  if (!project) notFound();

  const statusColors: Record<string, { bg: string; border: string; color: string }> = {
    "Completed":   { bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  color: "#34d399" },
    "Live":        { bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.3)", color: "var(--accent-lavender)" },
    "In Progress": { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)", color: "var(--accent-rose)" },
  };
  const s = statusColors[project.status] ?? statusColors["Completed"];

  return (
    <div className="section" style={{ maxWidth: "720px" }}>

      {/* Back */}
      <Link href="/projects" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
        ← Back to Projects
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
          <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 500, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
            {project.status}
          </span>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{project.year}</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2, marginBottom: "12px" }}>
          {project.title}
        </h1>
        <p style={{ color: "var(--accent-rose)", fontSize: "1rem", fontStyle: "italic" }}>
          "{project.tagline}"
        </p>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
        <a href={project.github} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "10px 22px", borderRadius: "999px",
          border: "1px solid var(--border)", background: "var(--bg-card)",
          color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 500,
          textDecoration: "none", backdropFilter: "blur(12px)",
          transition: "border-color 0.2s, color 0.2s",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          Code
        </a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live Demo
          </a>
        )}
      </div>

      {/* Description */}
      <div className="glass-card" style={{ padding: "28px 32px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: "14px", color: "var(--accent-lavender)" }}>
          About this project
        </h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: "0.95rem" }}>{project.desc}</p>
      </div>

      <div className="glass-card" style={{ padding: "28px 32px", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: "14px", color: "var(--accent-lavender)" }}>
          How it works
        </h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: "0.95rem" }}>{project.details}</p>
      </div>

      {/* Tags */}
      <div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "12px", letterSpacing: "0.08em" }}>TECH STACK</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {project.tags.map(t => (
            <span key={t} className="badge" style={{ fontSize: "0.85rem", padding: "6px 16px" }}>{t}</span>
          ))}
        </div>
      </div>

    </div>
  );
}