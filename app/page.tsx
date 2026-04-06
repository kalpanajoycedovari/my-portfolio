"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SKILLS = [
  {
    label: "Frontend",
    icon: "🎨",
    items: ["CSS", "JavaScript", "TypeScript", "React", "Next.js", "Bootstrap"],
  },
  {
    label: "Backend & Database",
    icon: "🗄️",
    items: ["Express.js", "Firebase", "MongoDB", "MySQL", "Flask"],
  },
  {
    label: "AI / ML / Data Science",
    icon: "🤖",
    items: ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "OpenCV", "Pandas", "NumPy"],
  },
  {
    label: "Tools & Platforms",
    icon: "🛠️",
    items: ["VS Code", "Docker", "Vercel", "GitHub Pages", "Jupyter Notebook", "Google Colab"],
  },
];

const FEATURED = [
  {
    title: "JoBo (Journalising Book)",
    tagline: "What if your handwriting could think?",
    desc: "I built JoBo after getting tired of losing handwritten notes in the void. It uses OCR to pull text straight from photos of journals and notebooks — turning messy, beautiful handwriting into searchable, organised digital entries.",
    tags: ["Python", "OpenCV", "Tesseract OCR"],
    href: "https://github.com/kalpanajoycedovari",
    cover: "/projects/jobo-cover.jpg",
  },
  {
    title: "Solite's Corner",
    tagline: "A cosy corner of the internet, built from scratch.",
    desc: "A personal website with a full email login system and Firebase-backed storage — built with care, hosted on GitHub Pages, and engineered to feel like home the moment you land on it.",
    tags: ["Firebase", "GitHub Pages", "Email Auth", "JavaScript"],
    href: "https://github.com/kalpanajoycedovari",
    cover: "/projects/solite-cover.jpg",
  },
];

type Post = { id: string; title: string; content: string; date: string; tag: string };

function BookCard({ p }: { p: typeof FEATURED[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      className="glass-card"
      style={{
        display: "block", overflow: "hidden", position: "relative",
        aspectRatio: "1 / 1", color: "inherit", textDecoration: "none",
        background: "var(--bg-card)",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Title panel */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0,
        width: open ? "38%" : "100%",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "24px",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 2,
        background: "var(--bg-secondary)",
      }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "10px", opacity: open ? 0 : 1, transition: "opacity 0.2s ease" }}>
          FEATURED
        </p>
        <h3 style={{ fontSize: "1rem", fontFamily: "'Inter', sans-serif", fontWeight: 700, lineHeight: 1.3, marginBottom: "8px", color: "var(--text-primary)" }}>
          {p.title}
        </h3>
        <p style={{ color: "var(--accent-rose)", fontSize: "0.78rem", fontStyle: "italic", lineHeight: 1.5, opacity: open ? 0 : 1, transition: "opacity 0.2s ease" }}>
          "{p.tagline}"
        </p>
      </div>

      {/* Divider */}
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        left: open ? "38%" : "100%",
        width: "1px",
        background: "rgba(192,132,252,0.3)",
        transition: "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 4,
      }} />

      {/* Description panel */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        width: open ? "62%" : "0%",
        overflow: "hidden",
        background: "rgba(13,15,26,0.96)",
        backdropFilter: "blur(12px)",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 3,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: open ? "24px 20px" : "24px 0",
      }}>
        <div style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(16px)",
          transition: "opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s",
          minWidth: "180px",
        }}>
          <p style={{ color: "var(--accent-lavender)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "8px" }}>ABOUT</p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "12px" }}>{p.desc}</p>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "12px" }}>
            {p.tags.map(t => <span key={t} className="badge" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>{t}</span>)}
          </div>
          <p style={{ color: "var(--accent-rose)", fontSize: "0.75rem" }}>View on GitHub →</p>
        </div>
      </div>
    </a>
  );
}

export default function HomePage() {
  const [now, setNow] = useState<Date | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    const stored = localStorage.getItem("blog_posts");
    if (stored) setPosts(JSON.parse(stored).slice(0, 2));
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="section">

      {/* ── Hero ── */}
      <section style={{ paddingTop: "60px", paddingBottom: "60px" }}>
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
          <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume ↗</a>
        </div>
      </section>

      {/* ── Date / Time widget ── */}
      <section style={{ marginBottom: "60px" }}>
        <div className="glass-card" style={{
          padding: "20px 28px", display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "1.4rem" }}>🕐</span>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", letterSpacing: "0.08em", marginBottom: "2px" }}>LOCAL TIME</p>
              <p style={{ fontSize: "1.4rem", fontWeight: 600, fontVariantNumeric: "tabular-nums", color: "var(--accent-lavender)" }}>
                {now ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--"}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", letterSpacing: "0.08em", marginBottom: "2px" }}>DATE</p>
              <p style={{ fontSize: "1rem", fontWeight: 500 }}>
                {now ? now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) : "---"}
              </p>
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", letterSpacing: "0.08em", marginBottom: "2px" }}>YEAR</p>
              <p style={{ fontSize: "1rem", fontWeight: 500 }}>{now ? now.getFullYear() : "----"}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", letterSpacing: "0.08em", marginBottom: "2px" }}>TIMEZONE</p>
              <p style={{ fontSize: "1rem", fontWeight: 500 }}>
                {now ? Intl.DateTimeFormat().resolvedOptions().timeZone : "---"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Featured Projects</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
          Hover over a project to open it ✨
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}>
          {FEATURED.map(p => <BookCard key={p.title} p={p} />)}
        </div>
        <div style={{ marginTop: "28px" }}>
          <Link href="/projects" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem" }}>View all projects →</Link>
        </div>
      </section>

      {/* ── Blog preview ── */}
      <section style={{ marginBottom: "80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
          <h2 style={{ fontSize: "1.8rem" }}>From the Blog</h2>
          <Link href="/blog" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem" }}>All posts →</Link>
        </div>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
          Fun bits about tech and whatever's living rent-free in my head
        </p>
        {posts.length === 0 ? (
          <div className="glass-card" style={{ padding: "36px", textAlign: "center" }}>
            <p style={{ fontSize: "1.5rem", marginBottom: "8px" }}>✍️</p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>No posts yet — coming soon!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.id}`} className="glass-card" style={{ padding: "24px 28px", display: "block", color: "inherit" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span className="badge">{post.tag}</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.78rem", opacity: 0.6 }}>
                    {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: "8px" }}>{post.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  {post.content.slice(0, 100)}...
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Skills ── */}
      <section>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Tech Stack</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>Everything I work with, organised by domain</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {SKILLS.map(category => (
            <div key={category.label} className="glass-card" style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span style={{ fontSize: "1.2rem" }}>{category.icon}</span>
                <h3 style={{ fontSize: "0.85rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                  {category.label.toUpperCase()}
                </h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {category.items.map(skill => (
                  <span key={skill} className="badge" style={{ fontSize: "0.85rem", padding: "6px 16px" }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}