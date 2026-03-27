import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Joyce",
  description: "AI/ML projects by Kalpana Joyce Dovari",
};

const PROJECTS = [
  {
    title: "AI Resume Analyzer",
    desc: "An NLP-powered resume analysis tool that parses resumes, extracts key signals, and provides smart feedback to improve job matching scores.",
    tags: ["NLP", "Python", "Machine Learning", "spaCy"],
    href: "https://github.com/kalpanajoycedovari",
    year: "2024",
    status: "Completed",
  },
  {
    title: "Image Classifier",
    desc: "Deep learning model for image classification built with PyTorch. Trained on custom datasets with data augmentation for improved generalization.",
    tags: ["PyTorch", "CNN", "Computer Vision", "Python"],
    href: "https://github.com/dovarikalpanajoyce-coder",
    year: "2024",
    status: "Completed",
  },
  // Add more projects here!
];

export default function ProjectsPage() {
  return (
    <div className="section">
      <div style={{ marginBottom: "48px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
          MY WORK
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>Projects</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "500px" }}>
          AI and ML projects I've built — from NLP tools to computer vision systems.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="glass-card"
            style={{ padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", color: "inherit" }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <h2 style={{ fontSize: "1.15rem", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{p.title}</h2>
                <span className="badge" style={{ background: "rgba(52, 211, 153, 0.1)", borderColor: "rgba(52, 211, 153, 0.25)", color: "var(--accent-mint)" }}>
                  {p.status}
                </span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "16px", lineHeight: 1.65 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {p.tags.map(t => <span key={t} className="badge">{t}</span>)}
              </div>
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", whiteSpace: "nowrap", paddingTop: "4px" }}>
              {p.year}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}