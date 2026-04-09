"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const USERNAME = "kalpanajoycedovari";

type ContribDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export default function GitHubGraph() {
  const [weeks, setWeeks] = useState<ContribDay[][]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<ContribDay | null>(null);

  useEffect(() => {
    // Use GitHub contribution calendar via github-contributions-api
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then(r => r.json())
      .then(data => {
        const contributions: ContribDay[] = data.contributions ?? [];
        setTotal(data.total?.lastYear ?? 0);
        // Group into weeks of 7
        const w: ContribDay[][] = [];
        for (let i = 0; i < contributions.length; i += 7) {
          w.push(contributions.slice(i, i + 7));
        }
        setWeeks(w);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const levelColor = (level: number) => {
    const colors = [
      "rgba(255,255,255,0.04)",
      "rgba(245,158,11,0.25)",
      "rgba(245,158,11,0.5)",
      "rgba(251,146,60,0.75)",
      "#fb923c",
    ];
    return colors[level] ?? colors[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: "24px 28px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <h3 style={{ fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: "2px" }}>
            GitHub Contributions
          </h3>
          {!loading && (
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent-amber)", fontWeight: 600 }}>{total.toLocaleString()}</span> contributions in the last year
            </p>
          )}
        </div>
        <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer"
          style={{ fontSize: "0.78rem", color: "var(--accent-amber)", textDecoration: "none" }}>
          View profile →
        </a>
      </div>

      {loading ? (
        <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Loading contributions...</p>
        </div>
      ) : weeks.length === 0 ? (
        <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Could not load contributions</p>
        </div>
      ) : (
        <>
          {/* Tooltip */}
          <div style={{ minHeight: "20px", marginBottom: "8px" }}>
            {hovered && (
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--accent-amber)", fontWeight: 600 }}>{hovered.count} contribution{hovered.count !== 1 ? "s" : ""}</span>
                {" on "}
                {new Date(hovered.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            )}
          </div>

          {/* Graph */}
          <div style={{ display: "flex", gap: "3px", overflowX: "auto", paddingBottom: "4px" }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {week.map((day, di) => (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (wi * 7 + di) * 0.002 }}
                    onMouseEnter={() => setHovered(day)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      width: "11px", height: "11px",
                      borderRadius: "2px",
                      background: levelColor(day.level),
                      cursor: "pointer",
                      transition: "transform 0.1s ease",
                    }}
                    whileHover={{ scale: 1.4 }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>Less</span>
            {[0, 1, 2, 3, 4].map(l => (
              <div key={l} style={{ width: "10px", height: "10px", borderRadius: "2px", background: levelColor(l) }} />
            ))}
            <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>More</span>
          </div>
        </>
      )}
    </motion.div>
  );
}