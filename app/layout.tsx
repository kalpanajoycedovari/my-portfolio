import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Joyce — AI/ML Engineer",
description: "Portfolio of Joyce, AI/ML Engineer building intelligent systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        {/* ── Navbar ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 40px",
          background: "rgba(13, 15, 26, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <Link href="/" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.2rem",
            color: "var(--text-primary)",
            fontWeight: 600,
            textDecoration: "none",
          }}>
            joyce<span style={{ color: "var(--accent-lavender)" }}>.</span>
          </Link>

          <div style={{ display: "flex", gap: "32px", fontSize: "0.9rem" }}>
            {[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: "About", href: "/about" },
              { label: "Education", href: "/education" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* ── Page content ── */}
        <main style={{ paddingTop: "80px" }}>
          {children}
        </main>

        {/* ── Footer ── */}
        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          <span>© 2025 Joyce · Built with Next.js & ☕</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/kalpanajoycedovari" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </footer>

      </body>
    </html>
  );
}