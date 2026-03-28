import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education — Joyce",
};

const EDUCATION = [
  {
    degree: "MSc in Artificial Intelligence",
    institution: "Northumbria University, London Campus",
    years: "2025 — Present",
    grade: "In progress",
    major: "Artificial Intelligence",
    description: "Postgraduate study in AI at Northumbria University's London Campus, deepening expertise in machine learning, deep learning, NLP, and intelligent systems design.",
    icon: "🎓",
    current: true,
  },
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Parul University",
    years: "2020 — 2024",
    grade: "7.71 CGPA",
    major: "AI Specialization",
    description: "Four-year undergraduate degree with a specialisation in Artificial Intelligence. Built a strong foundation in algorithms, data structures, machine learning, and software engineering — alongside hands-on project work in NLP and computer vision.",
    icon: "🎓",
    current: false,
  },
  {
    degree: "Sr Secondary (Class XII)",
    institution: "Narayana Education Institute",
    years: "2018 — 2020",
    grade: "9.34 CGPA",
    major: null,
    description: "Completed senior secondary education with exceptional academic performance, building a strong base in mathematics and science that laid the groundwork for a career in engineering and AI.",
    icon: "🏫",
    current: false,
  },
  {
    degree: "Hr Secondary (Class X)",
    institution: "VS St. Johns Hr. Sec School",
    years: "2012 — 2018",
    grade: "440 / 500",
    major: null,
    description: "Completed foundational schooling with strong academic results across all subjects, demonstrating consistency, discipline, and a love of learning from an early age.",
    icon: "🏫",
    current: false,
  },
];

export default function EducationPage() {
  return (
    <div className="section">
      <div style={{ marginBottom: "52px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
          MY JOURNEY
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>Education</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px" }}>
          Every institution, every grade, every lesson — the academic path that shaped who I am as an engineer.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: "32px", borderLeft: "1px solid var(--border)" }}>
        {EDUCATION.map((e, i) => (
          <div key={i} style={{ position: "relative", marginBottom: "40px", paddingLeft: "24px" }}>
            {/* Dot */}
            <div style={{
              position: "absolute",
              left: "-38px",
              top: "20px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: e.current
                ? "linear-gradient(135deg, var(--accent-lavender), var(--accent-rose))"
                : "var(--border)",
              border: "2px solid var(--bg-primary)",
              boxShadow: e.current ? "0 0 12px rgba(192,132,252,0.4)" : "none",
            }} />

            <div className="glass-card" style={{ padding: "28px 32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap", marginBottom: "14px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "1.2rem" }}>{e.icon}</span>
                    <h2 style={{ fontSize: "1.15rem", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{e.degree}</h2>
                    {e.current && (
                      <span className="badge" style={{ background: "rgba(192,132,252,0.12)", borderColor: "rgba(192,132,252,0.3)", color: "var(--accent-lavender)" }}>
                        Currently studying
                      </span>
                    )}
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: "4px" }}>
                    🏛️ {e.institution}
                  </p>
                  {e.major && (
                    <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem" }}>
                      Major: {e.major}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "8px" }}>{e.years}</p>
                  <span className="badge" style={{ background: "rgba(52,211,153,0.1)", borderColor: "rgba(52,211,153,0.25)", color: "var(--accent-mint)" }}>
                    {e.grade}
                  </span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                {e.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}