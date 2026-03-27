import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joyce — AI/ML Engineer",
  description: "Building intelligent AI systems and ML-powered applications.",
};

const SKILLS = [
  "Python", "Machine Learning", "Deep Learning", "NLP",
  "TensorFlow", "PyTorch", "React", "Next.js", "TypeScript",
];

export default function HomePage() {
  return (
    <div className="section">

      {/* ── Hero ── */}
      <section style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.9rem", fontWeight: 500, marginBottom: "12px", letterSpacing: "0.1em" }}>
          HI THERE, I'M
        </p>
        <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", lineHeight: 1.1, marginBottom: "20px" }}>
          Kalpana Joyce<br />
          <span className="gradient-text">Dovari</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "540px", marginBottom: "36px" }}>
          AI/ML Engineer building intelligent systems that solve real-world problems. 
          I turn data into decisions and ideas into deployed applications.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link href="/projects" className="btn-primary">View Projects →</Link>
          <a href="https://github.com/dovarikalpanajoyce-coder" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume ↗</a>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Featured Projects</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
          A selection of things I've built
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {[
            {
              title: "AI Resume Analyzer",
              desc: "NLP-powered tool that analyzes resumes and provides smart, actionable feedback to improve job matching.",
              tags: ["NLP", "Python", "ML"],
              href: "https://github.com/dovarikalpanajoyce-coder",
            },
            {
              title: "Image Classifier",
              desc: "Deep learning model trained to classify images with high accuracy using convolutional neural networks.",
              tags: ["PyTorch", "CNN", "Computer Vision"],
              href: "https://github.com/dovarikalpanajoyce-coder",
            },
          ].map((p) => (
            <a key={p.title} href={p.href} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: "28px", display: "block", color: "inherit" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>{p.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "20px", lineHeight: 1.6 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {p.tags.map(t => <span key={t} className="badge">{t}</span>)}
              </div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: "24px" }}>
          <Link href="/projects" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem" }}>View all projects →</Link>
        </div>
      </section>

      {/* ── Skills ── */}
      <section>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "24px" }}>Tech Stack</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {SKILLS.map(s => (
            <span key={s} className="badge" style={{ fontSize: "0.85rem", padding: "6px 16px" }}>{s}</span>
          ))}
        </div>
      </section>

    </div>
  );
}