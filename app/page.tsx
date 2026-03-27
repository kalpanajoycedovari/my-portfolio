"use client";

import Link from "next/link";

const SKILLS = [
  "Python", "Machine Learning", "Deep Learning",
  "NLP", "TensorFlow", "PyTorch", "React", "Next.js",
  "Data Analysis", "Computer Vision",
];

const PROJECTS = [
  {
    title: "AI Resume Analyzer",
    desc: "An NLP-powered resume analysis tool that intelligently matches candidates to job descriptions, improving hiring accuracy and saving time.",
    tags: ["NLP", "Python", "Machine Learning"],
    href: "https://github.com/kalpanajoycedovari",
  },
  {
    title: "Image Classifier",
    desc: "A deep learning model for multi-class image classification using convolutional neural networks, trained on custom datasets.",
    tags: ["Deep Learning", "PyTorch", "Computer Vision"],
    href: "https://github.com/kalpanajoycedovari",
  },
];

export default function Home() {
  return (
    <>
      {/* Ambient orbs */}
      <div style={{
        position: "fixed", top: "-20%", right: "-10%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(160,100,200,0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "10%", left: "-15%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,130,180,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* NAV */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          background: "rgba(14,11,20,0.75)",
          borderBottom: "1px solid var(--border)",
        }}>
          <div style={{
            maxWidth: "900px", margin: "0 auto", padding: "1.1rem 2rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem", fontWeight: 400,
              letterSpacing: "0.08em", color: "var(--accent)",
            }}>
              Joyce
            </span>
            <div style={{ display: "flex", gap: "2.5rem" }}>
              {[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }].map((l) => (
                <Link key={l.href} href={l.href} style={{
                  fontSize: "0.85rem", letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "var(--text-muted)",
                }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ maxWidth: "900px", margin: "0 auto", padding: "8rem 2rem 6rem" }}>
          <p style={{
            fontSize: "0.8rem", letterSpacing: "0.25em",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem",
          }}>
            AI / ML Engineer
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            fontWeight: 300, lineHeight: 1.1, color: "var(--text)", marginBottom: "1.8rem",
          }}>
            Hi, I&apos;m Joyce
            <span style={{ color: "var(--accent)", marginLeft: "0.3em" }}>✦</span>
          </h1>
          <p style={{
            fontSize: "1.1rem", color: "var(--text-muted)",
            maxWidth: "520px", lineHeight: 1.8, marginBottom: "3rem",
          }}>
            I build AI-powered applications and machine learning systems that solve
            real-world problems — blending technical depth with thoughtful design.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { label: "View Projects", href: "/projects", primary: true },
              { label: "GitHub", href: "https://github.com/kalpanajoycedovari", primary: false },
              { label: "Resume", href: "/resume.pdf", primary: false },
            ].map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target={btn.href.startsWith("http") ? "_blank" : undefined}
                rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-block",
                  padding: btn.primary ? "0.8rem 2rem" : "0.75rem 1.8rem",
                  fontSize: "0.82rem", letterSpacing: "0.12em",
                  textTransform: "uppercase", borderRadius: "2px",
                  transition: "all 0.3s ease",
                  background: btn.primary
                    ? "linear-gradient(135deg, rgba(180,120,220,0.25), rgba(200,140,190,0.2))"
                    : "transparent",
                  border: btn.primary
                    ? "1px solid rgba(180,130,210,0.4)"
                    : "1px solid var(--border)",
                  color: btn.primary ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, var(--border), transparent)" }} />
        </div>

        {/* PROJECTS */}
        <section style={{ maxWidth: "900px", margin: "0 auto", padding: "6rem 2rem" }}>
          <p style={{
            fontSize: "0.75rem", letterSpacing: "0.25em",
            textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.6rem",
          }}>
            Selected Work
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 300, color: "var(--text)", marginBottom: "3rem",
          }}>
            Projects
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {PROJECTS.map((p) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block", padding: "2rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px", color: "inherit",
                  textDecoration: "none", transition: "all 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border-hover)";
                  el.style.background = "var(--bg3)";
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = "0 12px 40px rgba(140,80,180,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border)";
                  el.style.background = "var(--surface)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem", fontWeight: 400,
                  color: "var(--text)", marginBottom: "0.8rem",
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: "0.88rem", color: "var(--text-muted)",
                  lineHeight: 1.75, marginBottom: "1.5rem",
                }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "0.7rem", letterSpacing: "0.1em",
                      textTransform: "uppercase", padding: "0.3rem 0.8rem",
                      background: "rgba(160,100,200,0.1)",
                      border: "1px solid rgba(160,100,200,0.2)",
                      borderRadius: "2px", color: "var(--accent3)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <Link href="/projects" style={{
              fontSize: "0.8rem", letterSpacing: "0.15em",
              textTransform: "uppercase", color: "var(--text-muted)",
              borderBottom: "1px solid var(--border)", paddingBottom: "2px",
            }}>
              View all projects →
            </Link>
          </div>
        </section>

        {/* SKILLS */}
        <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem 6rem" }}>
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--border), transparent)",
            marginBottom: "5rem",
          }} />
          <p style={{
            fontSize: "0.75rem", letterSpacing: "0.25em",
            textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.6rem",
          }}>
            Expertise
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 300, color: "var(--text)", marginBottom: "2.5rem",
          }}>
            Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
            {SKILLS.map((skill) => (
              <span key={skill} style={{
                padding: "0.55rem 1.2rem", fontSize: "0.82rem", letterSpacing: "0.05em",
                border: "1px solid var(--border)", borderRadius: "2px",
                color: "var(--text-muted)", background: "var(--surface)",
                transition: "all 0.3s ease", cursor: "default",
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--accent3)";
                  el.style.color = "var(--accent)";
                  el.style.background = "rgba(160,100,200,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text-muted)";
                  el.style.background = "var(--surface)";
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg2)",
        }}>
          <div style={{
            maxWidth: "900px", margin: "0 auto",
            padding: "5rem 2rem", textAlign: "center",
          }}>
            <p style={{
              fontSize: "0.75rem", letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "1rem",
            }}>
              Let&apos;s Connect
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300, color: "var(--text)", marginBottom: "1.2rem",
            }}>
              Open to opportunities
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              Whether it&apos;s a collaboration, role, or just a chat about AI — I&apos;d love to hear from you.
            </p>
            <a
              href="https://github.com/kalpanajoycedovari"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block", padding: "0.85rem 2.4rem",
                fontSize: "0.82rem", letterSpacing: "0.14em",
                textTransform: "uppercase",
                border: "1px solid rgba(180,130,210,0.4)",
                borderRadius: "2px", color: "var(--accent)",
                background: "linear-gradient(135deg, rgba(160,100,200,0.12), rgba(200,130,180,0.08))",
              }}
            >
              View GitHub
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          maxWidth: "900px", margin: "0 auto", padding: "2rem",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "0.5rem",
        }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-faint)", letterSpacing: "0.08em" }}>
            © 2025 Joyce — AI/ML Engineer
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-faint)", letterSpacing: "0.08em" }}>
            built with Next.js
          </span>
        </footer>

      </div>
    </>
  );
}