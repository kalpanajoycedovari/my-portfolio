import { PROJECTS } from "../data";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = PROJECTS.find(p => p.id === params.id);
  if (!project) notFound();

  const statusColors: Record<string, { bg: string; border: string; color: string }> = {
    "Completed":   { bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  color: "#34d399" },
    "Live":        { bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  color: "#f59e0b" },
    "In Progress": { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)", color: "#f43f5e" },
  };
  const s = statusColors[project.status] ?? statusColors["Completed"];

  const learned: Record<string, string[]> = {
    "scamcheck-agent": [
      "Cloudflare Durable Objects give you persistent session memory across WebSocket connections — genuinely different from stateless Workers",
      "Workers AI in local dev mode lies to you. Deploy first, debug second — the free tier rate limits hit hard locally but work fine on actual infrastructure",
      "WebSockets transform a frustrating loading spinner into a live 'watching it think' experience — incremental status updates change the entire feel of a slow pipeline",
      "Accessibility-first typography (Atkinson Hyperlegible) isn't just ethical — it makes everything more readable for everyone, not just users who need it",
    ],
    "jobo": [
      "How image preprocessing dramatically improves OCR accuracy on real-world handwriting",
      "Working with OpenCV pipelines for noise reduction, thresholding and deskewing",
      "The gap between 'it works on clean text' and 'it works on actual handwriting'",
    ],
    "solites-corner": [
      "Full Firebase Auth flow including email verification and session management",
      "How to architect a social platform with Firestore's real-time listeners",
      "The complexity of invite systems and how to cap signups gracefully",
    ],
    "speech-recognition": [
      "How Wav2Vec 2.0 encodes raw audio waveforms into contextual representations",
      "The difference between fine-tuned and zero-shot speech recognition models",
      "Audio preprocessing pipelines using NumPy for real-world input handling",
    ],
    "ai-resume-analyzer": [
      "Building NLP pipelines with spaCy for named entity recognition",
      "How to design a scoring system that feels meaningful, not arbitrary",
      "Deploying FastAPI on Render with proper Python version management",
    ],
    "scamscan": [
      "How to paginate Reddit's public JSON API across 20 subreddits at scale",
      "Designing a weighted trust formula that balances sentiment, ratings and red flags",
      "Advanced SQL — CTEs, window functions and PERCENT_RANK in practice",
    ],
    "commit-roaster": [
      "How to parse Git log output programmatically and extract meaningful patterns",
      "Prompt engineering for Claude to produce roasts that are funny but specific",
      "Deploying Streamlit apps with minimal config on Streamlit Cloud",
    ],
    "uk-job-market": [
      "Working with 1.6M row datasets and filtering strategies in Tableau",
      "How to tell a data story through dashboard composition rather than raw numbers",
      "The surprising distributions in UK job market data — mid-range experience dominates",
    ],
    "zig-playground": [
      "Manual memory management and why Python was hiding everything from me",
      "Zig's comptime system and how it differs from generics in other languages",
      "How to actually read compiler errors instead of just being afraid of them",
    ],
    "solene": [
      "How to use Three.js to create an atmospheric geometric hero that feels editorial rather than just technical",
      "Cormorant Garamond at large sizes behaves differently from body copy — kerning and line height need careful tuning",
      "Building a multi-page static site with a consistent luxury brand identity across every page",
      "How restraint in colour (ivory, gold, one accent) creates more impact than a complex palette",
      "CSS transitions and scroll-triggered reveals can replace heavy JS frameworks for simple storytelling sites",
    ],
    "komiso": [
      "How to chain multiple N8N agents so each one's output feeds cleanly into the next without breaking the flow",
      "SerpAPI returns a lot of noise — learning to filter and score affiliate program results took more prompt engineering than expected",
      "Groq's LLaMA 3.3 is surprisingly good at structured content generation when you give it tight output schemas",
      "Google Sheets as a lightweight database actually works well for solo automation projects — no overhead, instantly readable",
      "Building a fully free, locally hosted automation stack is completely viable — the constraint forces creative problem solving",
    ],
    "mi-armoire": [
      "LangGraph's node-based architecture makes multi-step AI pipelines genuinely maintainable — each node has one job and hands off cleanly",
      "HuggingFace's Inference Router replaced direct SDXL calls after deprecation — always pin your model IDs or your image generation silently breaks",
      "FLUX.1-schnell produces fashion-quality images when you write body-aware, specific prompts — vague prompts get vague results",
      "Streamlit's HTML sanitiser blocks inline SVG — components.html() is the workaround for custom hero sections",
      "Groq's speed makes a real difference in agentic loops where you're calling the model multiple times per user request",
    ],
  };

  const projectLearned = learned[project.id] ?? [
    "Building end-to-end from idea to deployment",
    "Debugging is 70% of the work and that's okay",
    "Documentation matters more than you think while building",
  ];

  return (
    <div className="section" style={{ maxWidth: "760px" }}>

      {/* Back */}
      <Link href="/projects" style={{ color: "var(--accent-amber)", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px", textDecoration: "none" }}>
        ← Back to Projects
      </Link>

      {/* Cover image */}
      <div style={{ position: "relative", height: "280px", borderRadius: "16px", overflow: "hidden", marginBottom: "36px" }}>
        <img src={project.cover} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,10,7,0.9) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: "24px", left: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
            <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 500, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
              {project.status}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>{project.year}</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", lineHeight: 1.2, color: "white" }}>
            {project.title}
          </h1>
          <p style={{ color: "#f59e0b", fontSize: "0.9rem", fontStyle: "italic", marginTop: "4px" }}>
            "{project.tagline}"
          </p>
        </div>
      </div>

      {/* Action buttons */}
      {(project.github || project.demo) && (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 22px", borderRadius: "999px",
              border: "1px solid var(--border)", background: "var(--bg-card)",
              color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 500,
              textDecoration: "none",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              View Code
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      )}

      {/* Local build badge */}
      {!project.github && !project.demo && (
        <div style={{ marginBottom: "40px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "10px 22px", borderRadius: "999px",
            border: "1px solid rgba(167,139,250,0.3)", background: "rgba(167,139,250,0.08)",
            color: "rgba(167,139,250,0.7)", fontSize: "0.9rem", fontWeight: 500,
          }}>
            🖥️ Local Build · No public repo
          </span>
        </div>
      )}

      {/* About */}
      <div className="glass-card" style={{ padding: "28px 32px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "0.78rem", color: "var(--accent-amber)", fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "14px" }}>
          ABOUT THIS PROJECT
        </h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "16px" }}>{project.desc}</p>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: "0.9rem", opacity: 0.8 }}>{project.details}</p>
      </div>

      {/* What I learned */}
      <div className="glass-card" style={{ padding: "28px 32px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "0.78rem", color: "var(--accent-amber)", fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "16px" }}>
          WHAT I LEARNED
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {projectLearned.map((l, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ color: "var(--accent-amber)", fontSize: "0.85rem", marginTop: "1px", flexShrink: 0 }}>→</span>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "12px", letterSpacing: "0.08em" }}>TECH STACK</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {project.tags.map(t => (
            <span key={t} className="badge" style={{ fontSize: "0.85rem", padding: "6px 16px" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Live demo embed */}
      {project.demo && !project.demo.includes("tableau") && !project.demo.includes("github.io") && (
        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "12px", letterSpacing: "0.08em" }}>LIVE PREVIEW</p>
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)", height: "420px" }}>
            <iframe
              src={project.demo}
              style={{ width: "100%", height: "100%", border: "none" }}
              title={`${project.title} live demo`}
              loading="lazy"
            />
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "8px", opacity: 0.6 }}>
            Having trouble viewing? <a href={project.demo} target="_blank" rel="noreferrer" style={{ color: "var(--accent-amber)" }}>Open in new tab →</a>
          </p>
        </div>
      )}

      {/* Back link */}
      <Link href="/projects" style={{ color: "var(--accent-amber)", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
        ← Back to all projects
      </Link>

    </div>
  );
}