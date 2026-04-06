"use client";

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/kalpanajoycedovari",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kalpanajoycedovari",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:kalpanajoycedovari@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="section">
      <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
        GET IN TOUCH
      </p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>Let's Connect</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "480px", marginBottom: "56px" }}>
        Whether you have an opportunity, a collaboration idea, or just want to chat AI — my inbox is open.
      </p>

      {/* Icon buttons row */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "64px" }}>
        {LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "20px 24px",
              borderRadius: "14px",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              backdropFilter: "blur(12px)",
              transition: "border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              minWidth: "80px",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(192,132,252,0.5)";
              el.style.color = "var(--accent-lavender)";
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 8px 24px rgba(192,132,252,0.12)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--text-secondary)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            {link.icon}
            <span style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em" }}>
              {link.label.toUpperCase()}
            </span>
          </a>
        ))}
      </div>

      {/* Extra info */}
      <div className="glass-card" style={{ padding: "28px 32px", maxWidth: "480px" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.8 }}>
          I'm currently based in <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>London, UK 🇬🇧</span> and open to
          full-time, internship, and freelance opportunities in AI/ML engineering and data analytics.
          Response time: usually within 24 hours ☕
        </p>
      </div>
    </div>
  );
}