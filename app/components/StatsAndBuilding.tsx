"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
  { value: 10, suffix: "+", label: "Projects built",   icon: "◈" },
  { value: 1,  suffix: "",  label: "Dissertation",     icon: "◉" },
  { value: 8,  suffix: "",  label: "Deployed apps",    icon: "◎" },
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
      <div style={{ fontSize: "1.4rem", marginBottom: "8px", color: "var(--accent-amber)" }}>{stat.icon}</div>
      <div style={{
        fontSize: "2.4rem", fontWeight: 700, fontVariantNumeric: "tabular-nums",
        fontFamily: "'Playfair Display', serif",
        background: "linear-gradient(135deg, var(--accent-amber), var(--accent-orange))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", lineHeight: 1,
      }}>
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
    title: "MSc Dissertation",
    desc: "Prediction of RUL in Satellite Subsystems using Tree-based Machine Learning Algorithms and Deep Learning Algorithms — Northumbria University London.",
    status: "Completed",
    statusColor: "#2baa7e",
    tags: ["Research", "AI/ML", "Deep Learning", "Academic"],
    href: "#",
  },
  {
    title: "UK Open Banking Personal Finance Pipeline",
    desc: "End-to-end data engineering and analytics portfolio project using synthetic UK transaction data, PostgreSQL with medallion architecture, dbt, Prefect, LightGBM, Prophet, and Streamlit.",
    status: "Active",
    statusColor: "#38a8d8",
    tags: ["PostgreSQL", "dbt", "Prefect", "LightGBM", "Prophet", "Streamlit"],
    href: "#",
  },
];

export default function StatsAndBuilding() {
  return (
    <div>
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "64px" }}
      >
        {STATS.map(s => <StatCard key={s.label} stat={s} />)}
      </motion.div>

      {/* Currently Building */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "16px" }}
      >
        <p style={{ fontSize: "0.78rem", color: "#2baa7e", fontWeight: 600, letterSpacing: "0.12em" }}>
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
              <h3 style={{ fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{item.title}</h3>
              <span style={{
                fontSize: "0.7rem", padding: "2px 10px", borderRadius: "999px",
                border: `1px solid ${item.statusColor}44`,
                color: item.statusColor,
                background: `${item.statusColor}12`,
                whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {item.status}
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "12px" }}>
              {item.desc}
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {item.tags.map(t => (
                <span key={t} style={{
                  padding: "2px 8px", borderRadius: "999px", fontSize: "0.68rem", fontWeight: 500,
                  background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)",
                  color: "var(--text-secondary)",
                }}>{t}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}