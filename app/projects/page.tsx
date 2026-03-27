import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Joyce",
  description: "AI/ML projects by Kalpana Joyce Dovari",
};

const PROJECTS = [
  {
    title: "AI Resume Analyzer",
    desc: "An NLP-powered resume analysis tool that intelligently matches candidates to job descriptions, improving hiring accuracy and saving time. Built using transformer models and custom scoring logic.",
    tags: ["NLP", "Python", "Machine Learning", "Transformers"],
    href: "https://github.com/kalpanajoycedovari",
    year: "2024",
  },
  {
    title: "Image Classifier",
    desc: "A deep learning model for multi-class image classification using convolutional neural networks, trained on custom datasets with data augmentation pipelines for robust performance.",
    tags: ["Deep Learning", "PyTorch", "Computer Vision", "CNN"],
    href: "https://github.com/kalpanajoycedovari",
    year: "2024",
  },
];

export default function Projects() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(160,100,200,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* NAV */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(14,11,20,0.75)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              padding: "1.1rem 2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 400,
                letterSpacing: "0.08em",
                color: "var(--accent)",
              }}
            >
              Joyce
            </Link>
            <div style={{ display: "flex", gap: "2.5rem" }}>
              {[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }].map(
                (l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{
                      fontSize: "0.85rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    {l.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>

        {/* HEADER */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "7rem 2rem 4rem",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
              marginBottom: "0.8rem",
            }}
          >
            Selected Work
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              color: "var(--text)",
              marginBottom: "1.2rem",
            }}
          >
            Projects
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "480px" }}>
            A collection of AI and machine learning projects I&apos;ve built — from NLP pipelines
            to computer vision systems.
          </p>
        </section>

        {/* PROJECT LIST */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 2rem 8rem",
          }}
        >
          <div
            style={{
              height: "1px",
              background: "linear-gradient(to right, transparent, var(--border), transparent)",
              marginBottom: "3rem",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {PROJECTS.map((p, i) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                  gap: "2rem",
                  padding: "2rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  color: "inherit",
                  textDecoration: "none",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border-hover)";
                  el.style.background = "var(--bg3)";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 10px 40px rgba(140,80,180,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border)";
                  el.style.background = "var(--surface)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      color: "var(--text-faint)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.6rem",
                        fontWeight: 400,
                        color: "var(--text)",
                      }}
                    >
                      {p.title}
                    </h2>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-faint)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {p.year}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                      marginBottom: "1.2rem",
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.68rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "0.25rem 0.7rem",
                          background: "rgba(160,100,200,0.1)",
                          border: "1px solid rgba(160,100,200,0.18)",
                          borderRadius: "2px",
                          color: "var(--accent3)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            maxWidth: "900px",
            margin: "0 auto",
            padding: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.72rem", color: "var(--text-faint)", letterSpacing: "0.08em" }}>
            © 2025 Joyce — AI/ML Engineer
          </span>
          <Link
            href="/"
            style={{
              fontSize: "0.72rem",
              color: "var(--text-faint)",
              letterSpacing: "0.08em",
              transition: "color 0.3s",
            }}
          >
            ← Back to Home
          </Link>
        </footer>
      </div>
    </>
  );
}