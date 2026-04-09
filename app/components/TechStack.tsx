"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";

const CATEGORIES = [
  {
    label: "Languages",
    icon: "{ }",
    color: "#f59e0b",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C++", "Ruby", "Go", "Zig", "SQL"],
  },
  {
    label: "AI / ML",
    icon: "🤖",
    color: "#fb923c",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Keras", "OpenCV", "Wav2Vec", "HuggingFace", "LangChain"],
  },
  {
    label: "AI Agents & LLM Tools",
    icon: "⚡",
    color: "#fcd34d",
    items: ["N8N", "Flowise", "Ollama", "FastAPI", "Streamlit"],
  },
  {
    label: "Frontend",
    icon: "◈",
    color: "#f43f5e",
    items: ["React", "Next.js", "CSS", "Bootstrap"],
  },
  {
    label: "Backend & Database",
    icon: "⬡",
    color: "#c084fc",
    items: ["Flask", "Express.js", "Firebase", "MongoDB", "MySQL", "SQLite"],
  },
  {
    label: "Data & Analytics",
    icon: "◎",
    color: "#34d399",
    items: ["Pandas", "NumPy", "Plotly", "TextBlob", "Web Scraping", "Tableau", "Power BI"],
  },
  {
    label: "Tools & Platforms",
    icon: "⚙",
    color: "#818cf8",
    items: ["Docker", "Git", "Vercel", "GitHub Pages", "Jupyter", "Google Colab", "VS Code"],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const badgeAnim: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div>
      {/* Category filter pills */}
      <motion.div
        style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            padding: "6px 16px", borderRadius: "999px", fontSize: "0.8rem",
            fontWeight: 500, cursor: "pointer", border: "none", outline: "none",
            background: activeCategory === null ? "var(--accent-amber)" : "rgba(255,255,255,0.04)",
            color: activeCategory === null ? "#0e0a07" : "var(--text-secondary)",
            borderWidth: "1px", borderStyle: "solid",
            borderColor: activeCategory === null ? "var(--accent-amber)" : "rgba(255,255,255,0.08)",
            transition: "all 0.2s ease",
          }}
        >
          All
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.label}
            onClick={() => setActiveCategory(activeCategory === c.label ? null : c.label)}
            style={{
              padding: "6px 16px", borderRadius: "999px", fontSize: "0.8rem",
              fontWeight: 500, cursor: "pointer", border: "none", outline: "none",
              background: activeCategory === c.label ? `${c.color}22` : "rgba(255,255,255,0.04)",
              color: activeCategory === c.label ? c.color : "var(--text-secondary)",
              borderWidth: "1px", borderStyle: "solid",
              borderColor: activeCategory === c.label ? `${c.color}55` : "rgba(255,255,255,0.08)",
              transition: "all 0.2s ease",
            }}
          >
            {c.label}
          </button>
        ))}
      </motion.div>

      {/* Category cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}
      >
        {CATEGORIES
          .filter(c => activeCategory === null || c.label === activeCategory)
          .map(c => (
            <motion.div
              key={c.label}
              variants={cardAnim}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${c.color}22`,
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: `${c.color}18`, border: `1px solid ${c.color}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", color: c.color, fontWeight: 700,
                  fontFamily: "monospace",
                }}>
                  {c.icon}
                </div>
                <div>
                  <p style={{ fontSize: "0.72rem", color: `${c.color}99`, letterSpacing: "0.1em", marginBottom: "1px" }}>
                    {c.items.length} SKILLS
                  </p>
                  <h3 style={{
                    fontSize: "0.95rem", fontFamily: "'Inter', sans-serif",
                    fontWeight: 600, color: "var(--text-primary)",
                  }}>
                    {c.label}
                  </h3>
                </div>
              </div>

              {/* Skill badges */}
              <motion.div
                variants={container}
                style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}
              >
                {c.items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    variants={badgeAnim}
                    whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                    style={{
                      padding: "4px 12px", borderRadius: "999px",
                      fontSize: "0.78rem", fontWeight: 500, cursor: "default",
                      background: `${c.color}10`,
                      border: `1px solid ${c.color}30`,
                      color: c.color,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Bottom accent line */}
              <div style={{
                height: "2px", marginTop: "20px", borderRadius: "999px",
                background: `linear-gradient(to right, ${c.color}44, transparent)`,
              }} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}