"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { use } from "react";

type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
  tag: string;
};

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("blog_posts");
    if (stored) {
      const posts: Post[] = JSON.parse(stored);
      const found = posts.find(p => p.id === id);
      setPost(found || null);
    }
  }, [id]);

  if (!post) return (
    <div className="section" style={{ paddingTop: "80px" }}>
      <p style={{ color: "var(--text-secondary)" }}>Post not found.</p>
      <Link href="/blog" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem" }}>← Back to blog</Link>
    </div>
  );

  return (
    <div className="section" style={{ maxWidth: "680px" }}>
      <Link href="/blog" style={{ color: "var(--accent-lavender)", fontSize: "0.9rem", display: "block", marginBottom: "32px" }}>
        ← Back to blog
      </Link>

      <span className="badge" style={{ marginBottom: "16px", display: "inline-block" }}>{post.tag}</span>
      <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2, marginBottom: "12px" }}>{post.title}</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "40px", opacity: 0.7 }}>
        {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
      </p>

      <div style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
        {post.content}
      </div>
    </div>
  );
}