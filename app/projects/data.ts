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
};

export const PROJECTS: Project[] = [
  {
    id: "jobo",
    title: "JoBo (Journalising Book)",
    tagline: "What if your handwriting could think?",
    desc: "Uses OCR to pull text from photos of journals and notebooks — turning messy handwriting into searchable digital entries. A bridge between the analogue and digital self.",
    details: "Built with OpenCV for image preprocessing and Tesseract OCR for text extraction. Dramatically improves accuracy on real-world handwriting, with entries stored securely and made fully searchable. Features sentiment analysis on extracted text using TextBlob.",
    tags: ["Python", "OpenCV", "Tesseract OCR", "NumPy", "Pandas"],
    github: "https://github.com/kalpanajoycedovari/JoBo-OCR-digital-journal",
    cover: "/projects/jobo-cover.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    id: "solites-corner",
    title: "Solite's Corner",
    tagline: "A cosy corner of the internet, built from scratch.",
    desc: "A personal website with full email login and Firebase-backed storage. Hosted on GitHub Pages, engineered to feel like home the moment you land on it.",
    details: "Implements Firebase Authentication for secure email login and Firebase Storage for user data. Hosted on GitHub Pages with a custom domain setup — demonstrating a full-stack mindset even in a static site environment.",
    tags: ["Firebase", "GitHub Pages", "Email Auth", "JavaScript"],
    github: "https://github.com/kalpanajoycedovari/My-Website",
    demo: "https://kalpanajoycedovari.github.io/My-Website/",
    cover: "/projects/solite-cover.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    id: "speech-recognition",
    title: "Speech Recognition Pipeline",
    tagline: "Teaching machines to listen.",
    desc: "A lightweight pipeline built around Wav2Vec 2.0. Takes raw audio and transcribes it — clean, accurate speech-to-text that actually works.",
    details: "Built using PyTorch and Wav2Vec 2.0 for feature extraction and transcription, with NumPy handling audio signal processing. Designed as a modular pipeline that plugs into larger AI systems.",
    tags: ["Wav2Vec", "PyTorch", "NumPy", "Speech Processing"],
    github: "https://github.com/kalpanajoycedovari/Speech-Recognition-Mini-Pipeline",
    cover: "/projects/speech-cover.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    tagline: "Your resume, but smarter.",
    desc: "NLP-powered tool that reads your resume the way a recruiter does — scanning for keywords, structure, and relevance. Gives actionable feedback instead of leaving you guessing.",
    details: "Uses spaCy for named entity recognition and keyword extraction, with a scoring system that compares resume content against job description patterns. Deployed live on Render.",
    tags: ["NLP", "Python", "Machine Learning", "spaCy", "FastAPI"],
    github: "https://github.com/kalpanajoycedovari/AI-resume-screener",
    demo: "https://ai-resume-screener-x5c1.onrender.com",
    cover: "/projects/resume-cover.jpg",
    year: "2024",
    status: "Completed",
  },
  {
    id: "scamscan",
    title: "ScamScan",
    tagline: "Because not everything with 5 stars deserves your money.",
    desc: "Scrapes 6,000+ Reddit posts, detects scam signals using NLP and a custom red flag keyword engine, and scores each entry on a 0–100 trust scale.",
    details: "99.6% of Reddit posts mentioning course keywords were flagged as likely scams. Built with TextBlob sentiment analysis, SQLite with 3 normalised tables, and an interactive Streamlit dashboard. SQL layer showcases CTEs, window functions, and PERCENT_RANK.",
    tags: ["Python", "NLP", "TextBlob", "SQLite", "Streamlit", "Plotly"],
    github: "https://github.com/kalpanajoycedovari/scamscan",
    cover: "/projects/scamscan-cover.jpg",
    year: "2025",
    status: "Completed",
  },
  {
    id: "commit-roaster",
    title: "Commit Roaster",
    tagline: "Your code is fine. Your commit messages? Not so much.",
    desc: "A Streamlit app that reads your Git commit history and roasts it — mercilessly, specifically, and with love.",
    details: "Built with Streamlit and the Claude API. Lightweight, ruthlessly funny, and genuinely useful for developers who need a mirror held up to their version control habits.",
    tags: ["Python", "Streamlit", "Claude API"],
    github: "https://github.com/kalpanajoycedovari/commit-roaster",
    demo: "https://commit-roaster.streamlit.app",
    cover: "/projects/roaster-cover.jpg",
    year: "2025",
    status: "Live",
  },
  {
    id: "uk-job-market",
    title: "UK Job Market Dashboard",
    tagline: "1.6 million job postings walked so this dashboard could run.",
    desc: "Interactive Tableau dashboard analysing the UK job market across top hiring companies, work type distribution, and experience level requirements.",
    details: "Built on a 1.6M row Kaggle dataset filtered to UK postings. Key insight: mid-range experience (1–12 years) dominates demand. Published live on Tableau Public.",
    tags: ["Tableau", "Data Analytics", "SQL", "Data Visualisation"],
    github: "https://github.com/kalpanajoycedovari/uk-job-market-dashboard",
    demo: "https://public.tableau.com/app/profile/kalpana.joyce.dovari/viz/UKJobMarketDashboard/",
    cover: "/projects/tableau-cover.jpg",
    year: "2025",
    status: "Completed",
  },
  {
    id: "zig-playground",
    title: "Zig Playground",
    tagline: "Learning at 5am like a nerd. No regrets.",
    desc: "A personal sandbox for Zig — a systems programming language I picked up out of pure curiosity.",
    details: "Built with Zig v0.15.2, covering basic syntax, memory management, and std.debug.print output. Small repo, big curiosity — proof that the best engineers never stop exploring.",
    tags: ["Zig", "Systems Programming"],
    github: "https://github.com/kalpanajoycedovari/zig-playground",
    cover: "/projects/zig-cover.jpg",
    year: "2025",
    status: "In Progress",
  },
];

export const FEATURED = PROJECTS.slice(0, 2);