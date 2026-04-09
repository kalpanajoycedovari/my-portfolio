"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target: number, duration = 1.8) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

const STATS = [
  { value: 10, suffix: "+", label: "Projects built", icon: "◈" },
  { value: 1,  suffix: "",  label: "Dissertation",   icon: "📄" },
  { value: 8,  suffix: "",  label: "Deployed apps",  icon: "🚀" },
  { value: 2,  suffix: "",  label: "Languages learning", icon: "{ }" },
];

function StatCard({ stat }: { stat: typeof STATS[0] }) {
  const { count, ref } = useCounter(stat.value);
  return (
    <motion.div
      ref={ref}
      className="glass-card"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ padding: "24px", textAlign: "center", flex: 1, minWidth: "140px" }}
    >
      <div style={{ fontSize: "1.4rem", marginBottom: "8px" }}>{stat.icon}</div>
      <div style={{ fontSize: "2.4rem", fontWeight: 700, fontVariantNumeric: "tabular-nums", fontFamily: "'Playfair Display', serif", background: "linear-gradient(135deg, #f59e0b, #fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "6px", letterSpacing: "0.04em" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

const BUILDING = [
  {
    title: "Solite's Corner",
    desc: "Adding new features, fixing bugs, improving the invite system and notification toasts. There's always something to polish in a social platform.",
    status: "Active",
    statusColor: "#34d399",
    tags: ["Firebase", "GitHub Pages", "JavaScript"],
    href: "https://github.com/kalpanajoycedovari/My-Website",
    progress: 72,
  },
  {
    title: "MSc Dissertation",
    desc: "Researching and developing my AI dissertation at Northumbria University London. Deep in the literature review and methodology phase.",
    status: "In progress",
    statusColor: "#f59e0b",
    tags: ["Research", "AI/ML", "Academic"],
    href: "#",
    progress: 30,
  },
  {
    title: "Learning Go & Zig",
    desc: "Writing small programs, making mistakes, committing them to GitHub at 2am, and somehow learning from it all. The grind is real.",
    status: "Ongoing",
    statusColor: "#818cf8",
    tags: ["Go", "Zig", "Systems Programming"],
    href: "https://github.com/kalpanajoycedovari/zig-playground",
    progress: 20,
  },
];

export default function StatsAndBuilding() {
  return (
    <div>
      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "64px" }}
      >
        {STATS.map(s => <StatCard key={s.label} stat={s} />)}
      </motion.div>

      {/* ── Currently Building ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}
      >
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 0 0 rgba(52,211,153,0.4)", animation: "pulse-green 2s infinite", flexShrink: 0 }} />
        <p style={{ fontSize: "0.78rem", color: "#34d399", fontWeight: 600, letterSpacing: "0.12em" }}>
          CURRENTLY BUILDING
        </p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {BUILDING.map((item, i) => (
          <motion.a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="glass-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ x: 6, transition: { duration: 0.2 } }}
            style={{ padding: "20px 24px", display: "block", color: "inherit", textDecoration: "none" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.statusColor, flexShrink: 0 }} />
                <h3 style={{ fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{item.title}</h3>
              </div>
              <span style={{ fontSize: "0.7rem", padding: "2px 10px", borderRadius: "999px", border: `1px solid ${item.statusColor}44`, color: item.statusColor, background: `${item.statusColor}12`, whiteSpace: "nowrap", flexShrink: 0 }}>
                {item.status}
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "12px" }}>
              {item.desc}
            </p>
            {/* Progress bar */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)", letterSpacing: "0.06em" }}>PROGRESS</span>
                <span style={{ fontSize: "0.68rem", color: item.statusColor }}>{item.progress}%</span>
              </div>
              <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "999px", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                  style={{ height: "100%", background: `linear-gradient(to right, ${item.statusColor}, ${item.statusColor}99)`, borderRadius: "999px" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {item.tags.map(t => (
                <span key={t} style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "0.68rem", fontWeight: 500, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>{t}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}