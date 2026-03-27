import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Joyce",
};

export default function ContactPage() {
  return (
    <div className="section">
      <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
        GET IN TOUCH
      </p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>
        Let's Connect
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "480px", marginBottom: "48px" }}>
        Whether you have an opportunity, a collaboration idea, or just want to chat abput AI, New Tech in Town! or BOOKS AND COFFEE — my inbox is open.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", maxWidth: "600px" }}>
        {[
          {
            label: "Email",
            value: "dovarikalpanajoyce@gmail.com",   // ← replace with your email
            href: "mailto:dovarikalpanajoyce@gmail.com",
            icon: "✉️",
          },
          {
            label: "GitHub",
            value: "dovarikalpanajoyce-coder",
            href: "https://github.com/kalpanajoycedovari",
            icon: "🐙",
          },
          {
            label: "LinkedIn",
            value: "Connect with me",
            href: "https://linkedin.com/in/kalpanajoycedovari",  // ← replace
            icon: "💼",
          },
        ].map(item => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="glass-card"
            style={{ padding: "24px", display: "block", color: "inherit" }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{item.icon}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px", letterSpacing: "0.05em" }}>{item.label.toUpperCase()}</div>
            <div style={{ fontSize: "0.9rem", color: "var(--accent-lavender)" }}>{item.value}</div>
          </a>
        ))}
      </div>
    </div>
  );
}