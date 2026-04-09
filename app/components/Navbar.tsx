"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Education", href: "/education" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 40px",
      background: "rgba(14,10,7,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Logo */}
      <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "var(--text-primary)", fontWeight: 600, textDecoration: "none" }}>
        Joyce<span style={{ color: "var(--accent-amber)" }}>.</span>
      </Link>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "32px", fontSize: "0.9rem", alignItems: "center" }} className="desktop-nav">
        {LINKS.map(link => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} style={{
              color: active ? "var(--accent-amber)" : "var(--text-secondary)",
              textDecoration: "none",
              fontWeight: active ? 600 : 400,
              transition: "color 0.2s ease",
              position: "relative",
            }}>
              {link.label}
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: "absolute", bottom: "-4px", left: 0, right: 0,
                    height: "1.5px", background: "var(--accent-amber)",
                    borderRadius: "999px",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger"
        style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "none", flexDirection: "column", gap: "5px" }}
        aria-label="Toggle menu"
      >
        <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: "block", width: "22px", height: "1.5px", background: "var(--text-primary)", borderRadius: "2px", transformOrigin: "center" }} />
        <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: "block", width: "22px", height: "1.5px", background: "var(--text-primary)", borderRadius: "2px" }} />
        <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: "block", width: "22px", height: "1.5px", background: "var(--text-primary)", borderRadius: "2px", transformOrigin: "center" }} />
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: "rgba(14,10,7,0.97)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "16px 0",
              display: "flex", flexDirection: "column",
            }}
          >
            {LINKS.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: "12px 32px",
                    color: active ? "var(--accent-amber)" : "var(--text-secondary)",
                    fontWeight: active ? 600 : 400,
                    fontSize: "1rem",
                    textDecoration: "none",
                    borderLeft: active ? "2px solid var(--accent-amber)" : "2px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}