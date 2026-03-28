"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
  tag: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("blog_posts");
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  return (
    <div className="section">
      <div style={{ marginBottom: "48px" }}>
        <p style={{ color: "var(--accent-lavender)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "8px" }}>
          MY THOUGHTS
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "12px" }}>Blog</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "500px" }}>
          Fun bits about tech, AI, and whatever's living rent-free in my head lately.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="glass-card" style={{ padding: "48px", textAlign: "center" }}>
          <p style={{ fontSize: "2rem", marginBottom: "12px" }}>✍️</p>
          <p style={{ color: "var(--text-secondary)" }}>No posts yet — check back soon!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="glass-card"
              style={{ padding: "28px 32px", display: "block", color: "inherit" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "10px" }}>
                <h2 style={{ fontSize: "1.15rem", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{post.title}</h2>
                <span className="badge" style={{ whiteSpace: "nowrap" }}>{post.tag}</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "16px" }}>
                {post.content.slice(0, 160)}...
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", opacity: 0.6 }}>
                {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}