export type Project = {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  details: string;
  tags: string[];
  github: string;
  demo?: string;
  cover: string;
  year: string;
  status: string;
  category: "AI & Machine Learning" | "Data Analytics" | "AI Agents & Automation";
  collab?: { name: string; url: string };
};

export const PROJECTS: Project[] = [
  {
    id: "agent-governance-layer",
    title: "Agent Governance Layer",
    tagline: "",
    desc: "A multi-agent governance system that enforces EU AI Act compliance on autonomous agent outputs — policy checks, risk classification, and full audit logging, deployed live on Azure.",
    details: "A governance layer that sits between AI agents and their actions, enforcing compliance before anything ships. Built with FastAPI and a multi-agent orchestration flow, it runs policy checks against EU AI Act requirements, classifies risk, and writes a complete audit trail for every decision. Retrieval uses a hybrid RAG setup — Qdrant with BM25 for keyword-plus-semantic search over regulatory text — backed by Postgres for state and Groq for fast inference. Containerised with Docker and deployed to Azure Container Apps in Sweden Central, with a live Fleet Registry dashboard showing system status in real time.",
    tags: ["FastAPI", "Multi-Agent", "Qdrant", "Hybrid RAG", "BM25", "PostgreSQL", "Groq", "Docker", "Azure Container Apps", "n8n"],
    github: "https://github.com/kalpanajoycedovari/ai-governance-gateway",
    demo: "https://governance-backend.victoriousdesert-a185ae98.swedencentral.azurecontainerapps.io/",
    cover: "",
    year: "2026",
    status: "Live",
    category: "AI Agents & Automation",
  },
  {
    id: "finsentiment-mlops",
    title: "FinSentiment MLOps Pipeline",
    tagline: "A Data Scientist's prototype, made production-grade.",
    desc: "End-to-end MLOps pipeline for financial news sentiment classification — trained, versioned, tested, containerised, and deployed to Azure with a full CI/CD pipeline.",
    details: "Classifies financial headlines as positive, neutral, or negative using scikit-learn (90% accuracy, 0.90 weighted F1). MLflow handles experiment tracking and model versioning. FastAPI serves predictions via REST API with 9 automated pytest tests and a quality gate that blocks bad models from shipping. Containerised with Docker, pushed to Azure Container Registry, and deployed to Azure Container Apps in UK South — auto-scaling 1–3 replicas. CI/CD via GitHub Actions runs in under 4 minutes. Streamlit UI for interactive inference.",
    tags: ["Python", "scikit-learn", "MLflow", "FastAPI", "pytest", "Docker", "GitHub Actions", "Azure Container Registry", "Azure Container Apps", "Streamlit"],
    github: "https://github.com/kalpanajoycedovari/finsentiment-mlops",
    demo: "https://finsentiment-api.calmmoss-828614b8.uksouth.azurecontainerapps.io/docs",
    cover: "/projects/finsentiment-cover.jpg",
    year: "2026",
    status: "Live",
    category: "AI & Machine Learning",
  },
  {
    id: "mi-armoire",
    title: "Mi Armoire",
    tagline: "Your wardrobe, curated by AI — dressed for the moment.",
    desc: "AI styling agent that builds complete outfits with FLUX-generated visuals. Pick your occasion, choose how many looks — done.",
    details: "Built with LangGraph for a four-node agentic pipeline, Groq LLaMA 3.3 70B for styling intelligence, and FLUX.1-schnell via HuggingFace Inference Router for image generation. Streamlit UI with a luxury SOLÈNE-inspired aesthetic — Cormorant Garamond, cream and gold palette, SVG geometric hero. Deployed live on Streamlit Cloud.",
    tags: ["LangGraph", "Groq", "FLUX.1-schnell", "HuggingFace", "Streamlit", "Python"],
    github: "https://github.com/kalpanajoycedovari/miarmoire",
    demo: "https://miarmoire.streamlit.app/",
    cover: "/projects/miarmoire-cover.jpg",
    year: "2026",
    status: "Live",
    category: "AI & Machine Learning",
  },
  {
    id: "tiktok-retention",
    title: "TikTok Retention Dashboard",
    tagline: "Acquiring a user is the easy part. Keeping them is where it gets interesting.",
    desc: "End-to-end analytics project analysing user retention, churn behaviour, and feature impact across a synthetic TikTok EMEA user base of 50,000 users spanning January to December 2024.",
    details: "User segments are modelled with weighted sampling (Casual 40%, Lurker 25%, Creator 20%, Power User 15%), churn timing via geometric distribution, and session counts via Poisson. Features a cohort retention heatmap, Kaplan-Meier-style survival curves per segment, logistic regression churn predictor with ROC curve, and a Streamlit dashboard with KPI cards, feature impact analysis, and sidebar filters.",
    tags: ["Python", "Streamlit", "Plotly", "Matplotlib", "Seaborn", "scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/kalpanajoycedovari/tiktok-retention-dashboard",
    demo: "https://tiktok-retention-dashboard.streamlit.app/",
    cover: "/projects/tiktok-retention-cover.jpg",
    year: "2026",
    status: "Live",
    category: "Data Analytics",
  },
  {
    id: "tiktok-ab-testing",
    title: "TikTok A/B Testing Suite",
    tagline: "Because 'ship it' should be a data-driven decision.",
    desc: "Simulates a real-world A/B experimentation suite across 4 concurrent TikTok product tests — with rigorous statistical analysis and an executive-grade Streamlit dashboard.",
    details: "Covers Welch's T-Test for continuous metrics, Chi-Square for conversion rates, Cohen's d for effect sizes, and power analysis for sample sizing. The Streamlit dashboard is designed to read like an internal TikTok product review doc — black header, gold accents, Playfair Display, and green/red verdict cards for instant decision clarity.",
    tags: ["Python", "Streamlit", "SciPy", "Pandas", "NumPy", "Plotly"],
    github: "https://github.com/kalpanajoycedovari/tiktok-ab-testing-analysis",
    demo: "https://tiktok-ab-testing-analysis.streamlit.app/",
    cover: "/projects/tiktok-ab-cover.jpg",
    year: "2026",
    status: "Live",
    category: "Data Analytics",
  },
  {
    id: "scamcheck-agent",
    title: "ScamCheck Agent",
    tagline: "Because 'it looked legit' is not a fraud prevention strategy.",
    desc: "Edge-hosted scam detection agent. Paste a URL — it runs page analysis, Reddit scanning, and AI verdict in parallel with live updates.",
    details: "Built with Cloudflare Workers, Durable Objects for session memory, Workers AI (Llama 3.1 8B), and WebSockets for live status updates. The agent remembers every URL you've checked, caches results, and lets you compare two sites side by side. Evolved from ScamScan — the same signal detection logic, now with memory, conversation, and real reasoning.",
    tags: ["Cloudflare Workers", "Durable Objects", "Llama 3.1", "Workers AI", "TypeScript", "WebSockets", "Reddit API"],
    github: "https://github.com/kalpanajoycedovari/cf_ai_scamcheck_agent",
    demo: "https://cf-ai-scamcheck-agent.dovarikalpanajoyce.workers.dev/",
    cover: "/projects/scamcheck-cover.jpg",
    year: "2025",
    status: "Live",
    category: "AI Agents & Automation",
  },
  {
    id: "nexus-edu",
    title: "NexusEdu",
    tagline: "Learning that adapts to you, not the other way around.",
    desc: "Hackathon-built AI tutoring system with multi-agent workflows that adapt learning paths by grade level and style.",
    details: "Built as part of a group hackathon for our MSc course module. NexusEdu uses n8n multi-agent workflows to generate personalised learning paths, with OpenRouter routing to Llama for LLM-powered content generation tailored by grade level. Supabase handles persistent student data and session memory. Self-hosted, no public deployment.",
    tags: ["n8n", "OpenRouter", "Llama", "Supabase"],
    github: "",
    cover: "/projects/nexusedu-cover.jpg",
    year: "2026",
    status: "Completed",
    category: "AI Agents & Automation",
    collab: {
      name: "Ramya Sri Muthuluri",
      url: "https://ramya-portfolio-ten.vercel.app/",
    },
  },
];

export const CATEGORIES = ["All", "AI & Machine Learning", "Data Analytics", "AI Agents & Automation"] as const;
export type Category = typeof CATEGORIES[number];