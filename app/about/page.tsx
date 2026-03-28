import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Joyce",
};

const HOBBIES = [
  { emoji: "📚", label: "Reading" },
  { emoji: "✍️", label: "Writing" },
  { emoji: "📓", label: "Journaling" },
  { emoji: "🎵", label: "Music" },
  { emoji: "🗺️", label: "Exploring new places" },
  { emoji: "🔬", label: "Researching" },
];

const TRAITS = [
  { emoji: "🧠", label: "Strong theoretical foundation" },
  { emoji: "📋", label: "Excellent at organising & planning" },
  { emoji: "🔍", label: "Research-driven mindset" },
  { emoji: "💡", label: "AI/ML enthusiast" },
];

export default function AboutPage() {
  return (
    <div className="section">

      {/* ── Header ── */}
      <div style={{ marginBottom: "52px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
          ABOUT ME
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "4px" }}>
          Hi, I'm Joyce 👋
        </h1>
      </div>

      {/* ── Bio ── */}
      <section style={{ marginBottom: "64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "40px", alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>Who I am</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: "16px", fontSize: "0.95rem" }}>
              I'm Kalpana Joyce Dovari — an AI/ML Engineer with a deep passion for
              building intelligent systems that actually make a difference. Currently
              pursuing my MSc in Artificial Intelligence at Northumbria University's
              London Campus, I bring a strong theoretical foundation paired with
              hands-on engineering experience.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: "16px", fontSize: "0.95rem" }}>
              I thrive at the intersection of research and implementation — equally
              comfortable diving into academic papers and translating those ideas into
               working code. I have a natural talent for organising complex problems
              into clear, structured solutions, and I bring that same precision to
              everything I build.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, fontSize: "0.95rem" }}>
              When I'm not training models or debugging pipelines, you'll find me
              journaling, getting lost in a good book, or planning my next adventure
              somewhere new. I believe the best engineers are also curious humans —
              and I try to be both. ✨
            </p>
          </div>

          {/* Traits */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>What defines me</h2>
            {TRAITS.map(t => (
              <div key={t.label} className="glass-card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontSize: "1.3rem" }}>{t.emoji}</span>
                <span style={{ color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 500 }}>{t.label}</span>
              </div>
            ))}
            <div className="glass-card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontSize: "1.3rem" }}>📍</span>
              <div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.75rem", marginBottom: "2px" }}>BASED IN</p>
                <p style={{ color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 500 }}>London, UK 🇬🇧</p>
              </div>
            </div>
            <div className="glass-card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontSize: "1.3rem" }}>💼</span>
              <div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.75rem", marginBottom: "2px" }}>STATUS</p>
                <p style={{ color: "var(--accent-mint)", fontSize: "0.9rem", fontWeight: 500 }}>Open to opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Education Timeline ── */}
      <section style={{ marginBottom: "64px" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "32px" }}>Education</h2>
        <div style={{ position: "relative", paddingLeft: "28px", borderLeft: "1px solid var(--border)" }}>
          {[
            {
              degree: "MSc in Artificial Intelligence",
              institution: "Northumbria University, London Campus",
              years: "2025 — Present",
              grade: "In progress",
              icon: "🎓",
              current: true,
            },
            {
              degree: "B.Tech in Computer Science Engineering",
              institution: "Parul University",
              years: "2020 — 2024",
              grade: "7.71 CGPA",
              major: "AI Specialization",
              icon: "🎓",
            },
            {
              degree: "Sr Secondary (Class XII)",
              institution: "Narayana Education Institute",
              years: "2018 — 2020",
              grade: "9.34 CGPA",
              icon: "🏫",
            },
            {
              degree: "Hr Secondary (Class X)",
              institution: "VS St. Johns Hr. Sec School",
              years: "2012 — 2018",
              grade: "440 / 500",
              icon: "🏫",
            },
          ].map((e, i) => (
            <div key={i} style={{ position: "relative", marginBottom: "32px", paddingLeft: "24px" }}>
              {/* Timeline dot */}
              <div style={{
                position: "absolute",
                left: "-34px",
                top: "4px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: e.current ? "linear-gradient(135deg, var(--accent-lavender), var(--accent-rose))" : "var(--border)",
                border: "2px solid var(--bg-primary)",
              }} />
              <div className="glass-card" style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span>{e.icon}</span>
                      <h3 style={{ fontSize: "1rem", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{e.degree}</h3>
                      {e.current && (
                        <span className="badge" style={{ background: "rgba(192,132,252,0.12)", borderColor: "rgba(192,132,252,0.3)", color: "var(--accent-lavender)", fontSize: "0.7rem" }}>
                          Current
                        </span>
                      )}
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "4px" }}>{e.institution}</p>
                    {e.major && <p style={{ color: "var(--accent-lavender)", fontSize: "0.82rem" }}>Major: {e.major}</p>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "4px" }}>{e.years}</p>
                    <span className="badge" style={{ background: "rgba(52,211,153,0.1)", borderColor: "rgba(52,211,153,0.25)", color: "var(--accent-mint)" }}>
                      {e.grade}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hobbies ── */}
      <section>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>Outside of code</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "24px" }}>
          Things that keep me inspired, grounded, and human ✨
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px" }}>
          {HOBBIES.map(h => (
            <div key={h.label} className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{h.emoji}</div>
              <p style={{ fontSize: "0.88rem", fontWeight: 500 }}>{h.label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}