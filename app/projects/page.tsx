"use client";

import Image from "next/image";
import { useState } from "react";
import type { Metadata } from "next";

const PROJECTS = [
  {
    title: "JoBo (Journalising Book)",
    tagline: "What if your handwriting could think?",
    desc: "I built JoBo after getting tired of losing handwritten notes in the void. It uses OCR to pull text straight from photos of journals and notebooks — turning messy, beautiful handwriting into searchable, organised digital entries.",
    details: "Built with OpenCV for image preprocessing and Tesseract OCR for text extraction. Dramatically improves accuracy on real-world handwriting, with entries stored securely and made fully searchable.",
    tags: ["Python", "OpenCV", "Tesseract OCR", "NumPy", "Pandas"],
    href: "https://github.com/kalpanajoycedovari/JoBo-OCR-digital-journal",
    cover: "/projects/jobo-cover.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    title: "Solite's Corner",
    tagline: "A cosy corner of the internet, built from scratch.",
    desc: "A personal website with a full email login system and Firebase-backed storage — built with care, hosted on GitHub Pages, and engineered to feel like home the moment you land on it.",
    details: "Implements Firebase Authentication for secure email login and Firebase Storage for user data. Hosted on GitHub Pages, demonstrating a full-stack mindset even in a static site environment.",
    tags: ["Firebase", "GitHub Pages", "Email Auth", "JavaScript"],
    href: "https://github.com/kalpanajoycedovari/My-Website",
    cover: "/projects/solite-cover.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    title: "Speech Recognition Mini Pipeline",
    tagline: "Teaching machines to listen.",
    desc: "A lightweight speech recognition pipeline built around Facebook's Wav2Vec 2.0 model. Takes raw audio input and transcribes it into text — clean, accurate speech-to-text that actually works.",
    details: "Built using PyTorch and Wav2Vec 2.0 for feature extraction and transcription, with NumPy handling audio signal processing. Designed as a modular pipeline that plugs into larger AI systems.",
    tags: ["Wav2Vec", "PyTorch", "NumPy", "Speech Processing"],
    href: "https://github.com/kalpanajoycedovari/Speech-Recognition-Mini-Pipeline",
    cover: "/projects/speech-cover.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    title: "ScamScan",
    tagline: "Because not everything with 5 stars deserves your money.",
    desc: "An end-to-end data pipeline that scrapes 6,000+ Reddit posts across 20 subreddits, detects scam signals using NLP and a custom red flag keyword engine, and scores each entry on a 0–100 trust scale. Turns chaos into clarity — with receipts.",
    details: "99.6% of Reddit posts mentioning course keywords were flagged as likely scams. Built with TextBlob sentiment analysis, a weighted trust formula, SQLite with 3 normalised tables, and an interactive Streamlit dashboard with Plotly charts. SQL layer showcases CTEs, window functions, and PERCENT_RANK.",
    tags: ["Python", "NLP", "TextBlob", "SQLite", "Streamlit", "Plotly", "Reddit API"],
    href: "https://github.com/kalpanajoycedovari/scamscan",
    cover: "/projects/scamscan-cover.jpg",
    screenshot: "/projects/scamscan-screenshot.jpg",
    year: "2025",
    status: "Completed",
  },
  {
    title: "Commit Roaster",
    tagline: "Your code is fine. Your commit messages? Not so much.",
    desc: "A Streamlit app that reads your Git commit history and roasts it — mercilessly, specifically, and with love. Because 'fixed stuff' is not a commit message and someone had to say it.",
    details: "Built with Streamlit and deployed live. Lightweight, ruthlessly funny, and genuinely useful for developers who need a mirror held up to their version control habits.",
    tags: ["Python", "Streamlit", "Git", "Claude API"],
    href: "https://github.com/kalpanajoycedovari/commit-roaster",
    cover: "/projects/roaster-cover.jpg",
    screenshot: "/projects/roaster-screenshot.jpg",
    year: "2025",
    status: "Live",
  },
  {
    title: "UK Job Market Dashboard",
    tagline: "1.6 million job postings walked so this dashboard could run.",
    desc: "An interactive Tableau dashboard analysing the UK job market across three dimensions — top hiring companies, work type distribution, and experience level requirements. Data storytelling at its cleanest.",
    details: "Built on a 1.6M row Kaggle dataset filtered to UK postings. Key insight: mid-range experience (1–12 years) dominates demand. Published live on Tableau Public with COUNT measures, aggregations, and dashboard composition.",
    tags: ["Tableau", "Data Analytics", "SQL", "Data Visualisation"],
    href: "https://github.com/kalpanajoycedovari/uk-job-market-dashboard",
    cover: "/projects/tableau-cover.jpg",
    screenshot: "/projects/tableau-screenshot.jpg",
    year: "2025",
    status: "Completed",
  },
  {
    title: "Zig Playground",
    tagline: "Learning at 5am like a nerd. No regrets.",
    desc: "A personal learning sandbox for Zig — a systems programming language I picked up out of pure curiosity. The commit messages alone tell the story: 'lol i made 5 mistakes' is peak learning energy.",
    details: "Built with Zig v0.15.2, covering basic syntax, memory management, and std.debug.print output. Small repo, big curiosity — proof that the best engineers never stop exploring new tools.",
    tags: ["Zig", "Systems Programming", "Learning"],
    href: "https://github.com/kalpanajoycedovari/zig-playground",
    cover: "/projects/zig-cover.jpg",
    screenshot: "/projects/zig-screenshot.jpg",
    year: "2025",
    status: "In Progress",
  },
  {
    title: "AI Resume Analyzer",
    tagline: "Your resume, but smarter.",
    desc: "Built out of frustration with generic job rejections, this NLP-powered tool reads your resume the way a recruiter does — scanning for keywords, structure, and relevance.",
    details: "Uses spaCy for named entity recognition and keyword extraction, with a scoring system that compares resume content against job description patterns. Honest, specific, and actually useful.",
    tags: ["NLP", "Python", "Machine Learning", "spaCy"],
    href: "https://github.com/kalpanajoycedovari/AI-resume-screener",
    cover: "/projects/resume-cover.jpg",
    year: "2024",
    status: "Completed",
  },
];

function BookCard({ p }: { p: typeof PROJECTS[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      className="glass-card"
      style={{
        display: "block",
        overflow: "hidden",
        position: "relative",
        height: "220px",
        color: "inherit",
        textDecoration: "none",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Cover image always visible */}
      <Image
        src={p.cover}
        alt={p.title}
        fill
        style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
        unoptimized
      />

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(13,15,26,0.95) 0%, rgba(13,15,26,0.6) 60%, rgba(13,15,26,0.3) 100%)",
        transition: "opacity 0.4s ease",
      }} />

      {/* Title panel — slides left on hover */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, bottom: 0,
        width: open ? "42%" : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "28px 32px",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 2,
      }}>
        <span className="badge" style={{
          marginBottom: "12px",
          display: "inline-block",
          width: "fit-content",
          background: "rgba(52,211,153,0.15)",
          borderColor: "rgba(52,211,153,0.3)",
          color: "#34d399",
          opacity: open ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}>
          {p.status}
        </span>
        <h2 style={{
          fontSize: "1.3rem",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          marginBottom: "8px",
          lineHeight: 1.3,
          color: "white",
        }}>
          {p.title}
        </h2>
        <p style={{
          color: "var(--accent-rose)",
          fontSize: "0.88rem",
          fontStyle: "italic",
          opacity: open ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}>
          "{p.tagline}"
        </p>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "0.78rem",
          marginTop: "auto",
          paddingTop: "12px",
          opacity: open ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}>
          {p.year}
        </p>
      </div>

      {/* Description panel — slides in from right */}
      <div style={{
        position: "absolute",
        top: 0, right: 0, bottom: 0,
        width: open ? "58%" : "0%",
        overflow: "hidden",
        background: "rgba(13,15,26,0.92)",
        backdropFilter: "blur(12px)",
        borderLeft: "1px solid rgba(192,132,252,0.2)",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: open ? "28px 28px" : "28px 0",
      }}>
        <div style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(20px)",
          transition: "opacity 0.35s ease 0.2s, transform 0.35s ease 0.2s",
          minWidth: "280px",
        }}>
          <p style={{ color: "var(--accent-lavender)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "10px" }}>
            ABOUT THIS PROJECT
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "14px" }}>
            {p.desc}
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {p.tags.map(t => (
              <span key={t} className="badge" style={{ fontSize: "0.75rem", padding: "3px 10px" }}>{t}</span>
            ))}
          </div>
          <p style={{ color: "var(--accent-rose)", fontSize: "0.8rem", marginTop: "14px" }}>
            View on GitHub →
          </p>
        </div>
      </div>
    </a>
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

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {PROJECTS.map(p => <BookCard key={p.title} p={p} />)}
      </div>
    </div>
  );
}