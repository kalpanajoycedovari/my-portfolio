import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Joyce",
  description: "AI/ML projects by Kalpana Joyce Dovari",
};

const PROJECTS = [
  {
    title: "JoBo (Journalising Book)",
    tagline: "What if your handwriting could think?",
    desc: "I built JoBo after getting tired of losing handwritten notes in the void. It uses OCR to pull text straight from photos of journals and notebooks — turning messy, beautiful handwriting into searchable, organised digital entries. Think of it as a bridge between the analogue and digital self.",
    details: "The system applies image preprocessing with OpenCV before feeding it to Tesseract OCR, which dramatically improves extraction accuracy on real-world handwriting. Extracted entries are stored securely and made fully searchable.",
    tags: ["Python", "OpenCV", "Tesseract OCR", "NumPy", "Pandas"],
    href: "https://github.com/kalpanajoycedovari",
    cover: "/projects/jobo-cover.jpg",
    screenshot: "/projects/jobo-screenshot.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    title: "Solite's Corner",
    tagline: "A cosy corner of the internet, built from scratch.",
    desc: "A personal website with a full email login system and Firebase-backed storage. Solite's Corner is where design meets functionality — built with care, hosted on GitHub Pages, and engineered to feel like home the moment you land on it.",
    details: "Implements Firebase Authentication for secure email login and Firebase Storage for user data. Hosted on GitHub Pages with a custom domain setup, it demonstrates a full-stack mindset even in a static site environment.",
    tags: ["Firebase", "GitHub Pages", "Email Auth", "JavaScript"],
    href: "https://github.com/kalpanajoycedovari",
    cover: "/projects/solite-cover.jpg",
    screenshot: "/projects/solite-screenshot.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    title: "Speech Recognition Mini Pipeline",
    tagline: "Teaching machines to listen.",
    desc: "A lightweight speech recognition pipeline built around Facebook's Wav2Vec 2.0 model. It takes raw audio input and transcribes it into text — no fluff, no overcomplicated setup, just clean, accurate speech-to-text that actually works.",
    details: "Built using PyTorch and Wav2Vec 2.0 for feature extraction and transcription, with NumPy handling the audio signal processing pipeline. Designed as a modular mini pipeline that can be plugged into larger AI systems.",
    tags: ["Wav2Vec", "PyTorch", "NumPy", "Speech Processing"],
    href: "https://github.com/kalpanajoycedovari",
    cover: "/projects/speech-cover.jpg",
    screenshot: "/projects/speech-screenshot.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    title: "AI Resume Screener",
    tagline: "Submit,Check it!, Edit & Make it a little better",
    desc: "Built out of frustration with generic job rejections, this NLP-powered tool reads your resume the way a recruiter does — scanning for keywords, structure, and relevance. It gives you actionable feedback instead of leaving you guessing.",
    details: "Uses spaCy for named entity recognition and keyword extraction, with a scoring system that compares resume content against job description patterns. Designed to be honest, specific, and actually useful.",
    tags: ["NLP", "Python", "Machine Learning", "spaCy"],
    href: "https://github.com/kalpanajoycedovari",
    cover: "/projects/resume-cover.jpg",
    screenshot: "/projects/resume-screenshot.jpg",
    year: "2024",
    status: "Completed",
  },
];

export default function ProjectsPage() {
  return (
    <div className="section">
      <div style={{ marginBottom: "52px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
          MY WORK
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>Projects</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px" }}>
          Each project started with a problem I couldn't stop thinking about. Here's what happened next.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="glass-card"
            style={{ overflow: "hidden", display: "block", color: "inherit" }}
          >
            {/* Cover + screenshot image */}
            <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
              <Image
                src={p.cover}
                alt={`${p.title} cover`}
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
              {/* Screenshot floating in bottom-right */}
              <div style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                width: "160px",
                height: "100px",
                borderRadius: "8px",
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}>
                <Image
                  src={p.screenshot}
                  alt={`${p.title} screenshot`}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(13,15,26,0.85) 0%, transparent 60%)",
              }} />
              {/* Title overlaid on image */}
              <div style={{ position: "absolute", bottom: "16px", left: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <h2 style={{ fontSize: "1.2rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "white" }}>
                    {p.title}
                  </h2>
                  <span className="badge" style={{ background: "rgba(52,211,153,0.15)", borderColor: "rgba(52,211,153,0.3)", color: "#34d399" }}>
                    {p.status}
                  </span>
                </div>
                <p style={{ color: "var(--accent-rose)", fontSize: "0.85rem", fontStyle: "italic", marginTop: "4px" }}>
                  "{p.tagline}"
                </p>
              </div>
            </div>

            {/* Text content */}
            <div style={{ padding: "24px 28px 28px" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.75, marginBottom: "12px" }}>
                {p.desc}
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, opacity: 0.75, marginBottom: "18px" }}>
                {p.details}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} className="badge">{t}</span>)}
                </div>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>{p.year}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}