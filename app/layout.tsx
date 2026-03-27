import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joyce — AI/ML Engineer",
  description: "Portfolio of Kalpana Joyce Dovari — AI/ML Engineer building intelligent systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}