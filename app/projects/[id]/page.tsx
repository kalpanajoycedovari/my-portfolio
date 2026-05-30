import { PROJECTS } from "../data";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = PROJECTS.find(p => p.id === id);
  if (!project) notFound();

  const statusColors: Record<string, { bg: string; border: string; color: string }> = {
    "Completed":   { bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  color: "#2baa7e" },
    "Live":        { bg: "rgba(56,168,216,0.1)",  border: "rgba(56,168,216,0.3)",  color: "#38a8d8" },
    "In Progress": { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)", color: "#e05a7a" },
  };
  const s = statusColors[project.status] ?? statusColors["Completed"];

  const learned: Record<string, string[]> = {
    "finsentiment-mlops": [
      "MLflow experiment tracking changes how you think about model development — every run is logged, every metric is comparable, and you stop guessing which version was best",
      "A quality gate in CI/CD (blocking deployment if F1 drops below threshold) is what separates a pipeline from a toy — the model has to earn its deploy",
      "pytest for ML isn't just unit testing — testing prediction schema, response time, and edge case inputs catches production failures before they happen",
      "Docker makes the 'it works on my machine' problem disappear, but writing a clean multi-stage Dockerfile for a Python ML app takes more thought than expected",
      "Azure Container Apps auto-scaling is deceptively simple to configure and genuinely impressive to watch — zero-to-replica in seconds under load",
    ],
    "uk-job-market-pipeline": [
      "Azure's free trial has hidden VM quota restrictions — Databricks clusters silently fail to provision, and the fix isn't in the docs, it's in the subscription settings",
      "Databricks Serverless starts instantly but blocks standard PySpark auth methods — reading ADLS Gen2 via HTTP requests with a SAS token is a perfectly valid workaround for small datasets",
      "GitHub Actions is a better scheduled ingestion trigger than Azure Functions for student subscriptions — free, reliable, and the 40-second runtime proved it",
      "Synapse Analytics external tables over ADLS Gen2 work cleanly once you use credential-based data sources — the BLOB_STORAGE shortcut isn't always supported",
      "The honest story of a project (quota errors, policy blocks, £1.81 in cloud spend) is more impressive to engineers than a clean run — real pipelines always involve workarounds",
    ],
    "tiktok-retention": [
      "Geometric distribution is the right model for churn timing — each day is a Bernoulli trial, and the math produces survival curves that actually match how real platform users behave",
      "Poisson distribution for session counts felt obvious in hindsight, but getting the segment-conditional parameters right took more iteration than expected",
      "Cohort heatmaps tell a story that line charts can't — seeing retention decay visually across 12 monthly cohorts makes the seasonal patterns immediately obvious",
      "Logistic regression as a churn predictor is underrated for explainability — the feature coefficients directly answer which product features actually matter for retention",
      "Building synthetic data that's statistically believable is harder than it sounds — if the distributions don't reflect real platform behaviour, the analysis conclusions mean nothing",
    ],
    "tiktok-ab-testing": [
      "Welch's T-Test over Student's T-Test is almost always the right default — assuming equal variance between control and treatment groups is rarely justified in real product experiments",
      "Cohen's d made effect sizes legible to non-statisticians — a p-value alone doesn't tell you if a result is worth shipping, but 'medium effect' does",
      "Running 4 concurrent tests exposed the multiple comparisons problem — Bonferroni correction feels conservative but it's the honest approach when testing several hypotheses at once",
      "Dashboard design for stakeholders is a different skill from analysis — the verdict cards weren't aesthetic choices, they were communication choices",
      "Power analysis before running a test is the step most people skip — it's the only way to know if your sample size is actually large enough to detect the effect you care about",
    ],
    "scamcheck-agent": [
      "Cloudflare Durable Objects give you persistent session memory across WebSocket connections — genuinely different from stateless Workers",
      "Workers AI in local dev mode lies to you. Deploy first, debug second — the free tier rate limits hit hard locally but work fine on actual infrastructure",
      "WebSockets transform a frustrating loading spinner into a live 'watching it think' experience — incremental status updates change the entire feel of a slow pipeline",
      "Accessibility-first typography isn't just ethical — it makes everything more readable for everyone, not just users who need it",
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
    "mi-armoire": [
      "LangGraph's node-based architecture makes multi-step AI pipelines genuinely maintainable — each node has one job and hands off cleanly",
      "HuggingFace's Inference Router replaced direct SDXL calls after deprecation — always pin your model IDs or your image generation silently breaks",
      "FLUX.1-schnell produces fashion-quality images when you write body-aware, specific prompts — vague prompts get vague results",
      "Streamlit's HTML sanitiser blocks inline SVG — components.html() is the workaround for custom hero sections",
      "Groq's speed makes a real difference in agentic loops where you're calling the model multiple times per user request",
    ],
    "nexus-edu": [
      "Multi-agent n8n workflows require careful handoff design — each agent needs clean input/output contracts to avoid cascading failures",
      "OpenRouter makes it easy to swap LLMs without rewriting pipeline logic — huge advantage in a hackathon where you're iterating fast",
      "Personalising content by grade level is harder than it sounds — the prompt engineering to hit the right reading complexity took most of our time",
      "Supabase is genuinely fast to set up for session memory — we had persistent student profiles working within an hour",
      "Hackathons teach you that a working demo with one feature beats a broken demo with ten",
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
        Back to Projects
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
          <span style={{ padding: "4px 14px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 500, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
            {project.status}
          </span>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>{project.year}</span>
          {project.collab && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              · Built with{" "}
              <a href={project.collab.url} target="_blank" rel="noreferrer" style={{ color: "var(--accent-amber)", textDecoration: "none", fontWeight: 500 }}>
                {project.collab.name}
              </a>
            </span>
          )}
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1.2, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {project.title}
        </h1>
      </div>

      {/* Action buttons */}
      {(project.github || project.demo) && (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 22px", borderRadius: "999px",
              border: "1px solid rgba(0,0,0,0.12)", background: "rgba(255,255,255,0.7)",
              color: "#1a1a1a", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none",
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
            border: "1px solid rgba(56,168,216,0.3)", background: "rgba(56,168,216,0.08)",
            color: "#38a8d8", fontSize: "0.9rem", fontWeight: 500,
          }}>
            Local Build · No public repo
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
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", height: "420px" }}>
            <iframe src={project.demo} style={{ width: "100%", height: "100%", border: "none" }} title={`${project.title} live demo`} loading="lazy" />
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "8px", opacity: 0.6 }}>
            Having trouble viewing? <a href={project.demo} target="_blank" rel="noreferrer" style={{ color: "var(--accent-amber)" }}>Open in new tab</a>
          </p>
        </div>
      )}

      {/* Back link */}
      <Link href="/projects" style={{ color: "var(--accent-amber)", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
        Back to all projects
      </Link>

    </div>
  );
}