"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const skills = [
  { name: "Python", level: 95 },
  { name: "Machine Learning", level: 90 },
  { name: "Deep Learning", level: 88 },
  { name: "NLP", level: 85 },
  { name: "TensorFlow", level: 82 },
  { name: "PyTorch", level: 80 },
  { name: "React", level: 75 },
  { name: "Next.js", level: 72 },
];

const projects = [
  {
    id: "01",
    title: "AI Resume Analyzer",
    tag: "NLP · Matching",
    description:
      "NLP-based resume analysis tool that semantically parses skills and experience, improving job-candidate matching accuracy.",
    tech: ["Python", "spaCy", "BERT", "FastAPI"],
    href: "#",
  },
  {
    id: "02",
    title: "Image Classifier",
    tag: "CV · Deep Learning",
    description:
      "Convolutional neural network for multi-class image classification, trained on custom datasets with transfer learning.",
    tech: ["PyTorch", "ResNet", "CUDA", "Weights & Biases"],
    href: "#",
  },
];

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: { x: number; y: number; vx: number; vy: number }[] = Array.from(
      { length: 40 },
      () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      })
    );

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,210,150,${0.12 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,210,150,0.35)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080c0f;
          --surface: #0f1519;
          --border: rgba(255,255,255,0.07);
          --accent: #00d296;
          --accent-dim: rgba(0,210,150,0.12);
          --accent-glow: rgba(0,210,150,0.25);
          --text: #e8f0ec;
          --muted: rgba(232,240,236,0.45);
          --tag-bg: rgba(0,210,150,0.08);
          --tag-border: rgba(0,210,150,0.25);
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'JetBrains Mono', monospace;
          overflow-x: hidden;
        }

        h1, h2, h3, h4 {
          font-family: 'Syne', sans-serif;
        }

        ::selection { background: var(--accent); color: #000; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
      `}</style>

      <NeuralBackground />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 2.5rem",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          background: "rgba(8,12,15,0.7)",
        }}
      >
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "var(--accent)",
            letterSpacing: "0.04em",
          }}
        >
          JOYCE
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Projects", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                color: "var(--muted)",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1 }}>
        {/* HERO */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, y: heroY }}
          id="hero"
        >
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 2.5rem",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                  fontWeight: 500,
                }}
              >
                ◆ AI / ML Engineer
              </motion.p>

              <motion.h1
                variants={fadeUp}
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  marginBottom: "2rem",
                }}
              >
                Hi,
                <br />
                I'm{" "}
                <span
                  style={{
                    color: "var(--accent)",
                    textShadow: "0 0 60px var(--accent-glow)",
                  }}
                >
                  Joyce
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: "1.05rem",
                  color: "var(--muted)",
                  maxWidth: "480px",
                  lineHeight: 1.7,
                  marginBottom: "2.5rem",
                }}
              >
                I build AI-powered applications and machine learning systems
                that solve real-world problems — from NLP pipelines to deep
                vision models.
              </motion.p>

              <motion.div
                variants={fadeUp}
                style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
              >
                <a
                  href="#projects"
                  style={{
                    background: "var(--accent)",
                    color: "#000",
                    padding: "0.75rem 1.75rem",
                    borderRadius: "4px",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    display: "inline-block",
                    fontFamily: "Syne, sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px var(--accent-glow)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  View Projects
                </a>
                {[
                  { label: "GitHub", href: "https://github.com/dovarikalpanajoyce-coder" },
                  { label: "Resume", href: "/resume.pdf" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      padding: "0.75rem 1.75rem",
                      borderRadius: "4px",
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "border-color 0.2s, color 0.2s",
                      display: "inline-block",
                      fontFamily: "Syne, sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text)";
                    }}
                  >
                    {label}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                position: "absolute",
                bottom: "2.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>
                scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--accent), transparent)" }}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <section
          id="projects"
          style={{
            padding: "8rem 2.5rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3.5rem" }}>
              <span style={{ color: "var(--accent)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                02
              </span>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2.5rem", letterSpacing: "-0.02em" }}>
                Projects
              </h2>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "2rem",
                  cursor: "pointer",
                  transition: "border-color 0.3s, transform 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
                whileHover={{ borderColor: "var(--accent)", y: -4 }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(to right, var(--accent), transparent)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  className="project-topline"
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "var(--accent)", opacity: 0.6 }}>
                      {p.id}
                    </span>
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.01em" }}>
                      {p.title}
                    </h3>
                  </div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "100px",
                      background: "var(--tag-bg)",
                      border: "1px solid var(--tag-border)",
                      color: "var(--accent)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {p.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "0.68rem",
                        fontFamily: "JetBrains Mono, monospace",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "3px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--border)",
                        color: "var(--muted)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          style={{
            padding: "4rem 2.5rem 8rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3.5rem" }}>
              <span style={{ color: "var(--accent)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                03
              </span>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2.5rem", letterSpacing: "-0.02em" }}>
                Skills
              </h2>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", letterSpacing: "0.06em", color: "var(--text)" }}>
                    {skill.name}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>
                    {skill.level}%
                  </span>
                </div>
                <div
                  style={{
                    height: "3px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.07 + 0.2, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(to right, var(--accent), rgba(0,210,150,0.5))",
                      borderRadius: "2px",
                      boxShadow: "0 0 8px var(--accent-glow)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          style={{
            padding: "4rem 2.5rem 10rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3.5rem" }}>
              <span style={{ color: "var(--accent)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                04
              </span>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2.5rem", letterSpacing: "-0.02em" }}>
                Contact
              </h2>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
              }}
            >
              <div>
                <p style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Open to collaborations, research roles, and ML engineering opportunities.
                </p>
                <a
                  href="mailto:dovarikalpanajoyce@gmail.com"
                  style={{
                    display: "inline-block",
                    background: "var(--accent)",
                    color: "#000",
                    padding: "0.75rem 1.75rem",
                    borderRadius: "4px",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    fontFamily: "Syne, sans-serif",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px var(--accent-glow)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Say Hello →
                </a>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { label: "Email", value: "dovarikalpanajoyce@gmail.com", href: "mailto:dovarikalpanajoyce@gmail.com" },
                  { label: "GitHub", value: "dovarikalpanajoyce-coder", href: "https://github.com/dovarikalpanajoyce-coder" },
                ].map(({ label, value, href }) => (
                  <div key={label}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>
                      {label}
                    </span>
                    <a
                      href={href}
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--muted)",
                        textDecoration: "none",
                        fontFamily: "JetBrains Mono, monospace",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.5rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
          © 2025 JOYCE — AI/ML ENGINEER
        </span>
        <span style={{ fontSize: "0.7rem", color: "var(--muted)", fontFamily: "JetBrains Mono, monospace" }}>
          built with next.js
        </span>
      </footer>
    </>
  );
}