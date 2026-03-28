"use client";

import { useEffect, useState } from "react";

// ── Change this to your own secret password ──
const SECRET_PASSWORD = "joyce2025";

type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
  tag: string;
};

const TAGS = ["AI", "Tech", "Life", "Tutorial", "Opinion", "Fun"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Tech");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("blog_posts");
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  const handleLogin = () => {
    if (password === SECRET_PASSWORD) setAuthed(true);
    else alert("Wrong password!");
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) return alert("Title and content can't be empty!");
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString(),
      tag,
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem("blog_posts", JSON.stringify(updated));
    setTitle("");
    setContent("");
    setTag("Tech");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this post?")) return;
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem("blog_posts", JSON.stringify(updated));
  };

  if (!authed) return (
    <div className="section" style={{ maxWidth: "400px", paddingTop: "80px" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Admin</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "0.9rem" }}>This page is just for you 🔒</p>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleLogin()}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: "10px",
          background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
          color: "var(--text-primary)", fontSize: "1rem", marginBottom: "16px", outline: "none",
        }}
      />
      <button className="btn-primary" onClick={handleLogin} style={{ width: "100%", justifyContent: "center" }}>
        Enter
      </button>
    </div>
  );

  return (
    <div className="section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "4px" }}>Blog Admin</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Write, publish, and manage your posts</p>
        </div>
        <a href="/blog" className="btn-ghost" style={{ fontSize: "0.85rem" }}>View Blog →</a>
      </div>

      {/* Write new post */}
      <div className="glass-card" style={{ padding: "32px", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "24px", fontFamily: "'Inter', sans-serif" }}>New Post</h2>

        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: "10px",
            background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
            color: "var(--text-primary)", fontSize: "1rem", marginBottom: "16px", outline: "none",
            boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          {TAGS.map(t => (
            <button
              key={t}
              onClick={() => setTag(t)}
              style={{
                padding: "6px 16px", borderRadius: "999px", fontSize: "0.8rem", cursor: "pointer",
                background: tag === t ? "linear-gradient(135deg, var(--accent-lavender), var(--accent-rose))" : "rgba(255,255,255,0.05)",
                border: tag === t ? "none" : "1px solid var(--border)",
                color: tag === t ? "white" : "var(--text-secondary)",
                fontWeight: tag === t ? 600 : 400,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <textarea
          placeholder="Write your post here... be quirky, be you ✨"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={10}
          style={{
            width: "100%", padding: "14px 16px", borderRadius: "10px",
            background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
            color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.7,
            resize: "vertical", outline: "none", marginBottom: "20px",
            boxSizing: "border-box", fontFamily: "'Inter', sans-serif",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button className="btn-primary" onClick={handlePublish}>Publish Post →</button>
          {saved && <span style={{ color: "var(--accent-mint)", fontSize: "0.9rem" }}>✓ Published!</span>}
        </div>
      </div>

      {/* Existing posts */}
      <h2 style={{ fontSize: "1.2rem", marginBottom: "20px", fontFamily: "'Inter', sans-serif" }}>
        Published Posts ({posts.length})
      </h2>
      {posts.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>No posts yet — write your first one above!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(post => (
            <div key={post.id} className="glass-card" style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{post.title}</span>
                  <span className="badge">{post.tag}</span>
                </div>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", opacity: 0.6 }}>
                  {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                style={{
                  padding: "6px 14px", borderRadius: "8px", fontSize: "0.8rem", cursor: "pointer",
                  background: "rgba(244, 114, 182, 0.1)", border: "1px solid rgba(244,114,182,0.25)",
                  color: "var(--accent-rose)",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}