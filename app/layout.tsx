import type { Metadata } from "next";
import "./globals.css";
import SolarBackground from "./components/SolarBackground";
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-portfolio-taupe-kappa-13.vercel.app"),
  title: "Joyce Dovari — AI/ML Engineer",
  description: "Portfolio of Kalpana Joyce Dovari — AI/ML Engineer and MSc Artificial Intelligence student at Northumbria University London. Building intelligent systems that solve real-world problems.",
  keywords: ["AI Engineer", "ML Engineer", "Data Analyst", "Portfolio", "London", "NLP", "PyTorch", "Next.js"],
  authors: [{ name: "Kalpana Joyce Dovari" }],
  openGraph: {
    title: "Joyce Dovari — AI/ML Engineer",
    description: "Building intelligent systems that solve real-world problems. AI/ML Engineer based in London.",
    url: "https://my-portfolio-taupe-kappa-13.vercel.app",
    siteName: "Joyce Dovari Portfolio",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Joyce Dovari Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joyce Dovari — AI/ML Engineer",
    description: "Building intelligent systems that solve real-world problems.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        <SolarBackground />
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />

        <main style={{ paddingTop: "80px", position: "relative", zIndex: 1 }}>
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}>
          <span>© 2025 Joyce · Built with Next.js & ☕</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="https://github.com/kalpanajoycedovari" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/kalpanajoycedovari" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}