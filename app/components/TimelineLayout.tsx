"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Section = {
  number: string;
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
};

function TimelineNode({ color, number }: { color: string; number: string }) {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Outer pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", width: "32px", height: "32px",
          borderRadius: "50%", border: `1px solid ${color}`,
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      {/* Node */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        style={{
          width: "18px", height: "18px", borderRadius: "50%",
          background: color, border: "3px solid #0e0a07",
          boxShadow: `0 0 16px ${color}88`,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2, flexShrink: 0,
        }}
      />
    </div>
  );
}

function BranchLine({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        height: "1.5px", width: "48px", flexShrink: 0,
        background: `linear-gradient(to right, ${color}, ${color}44)`,
        transformOrigin: "left",
        marginTop: "8px",
      }}
    />
  );
}

export function TimelineSection({ section }: { section: Section }) {
  const ref = useRef(null);

  return (
    <div ref={ref} style={{ display: "flex", gap: "0", alignItems: "flex-start", marginBottom: "80px" }}>
      {/* Left: spine node + branch */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px", flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        >
          <TimelineNode color={section.color} number={section.number} />
        </motion.div>
      </div>

      {/* Branch line */}
      <BranchLine color={section.color} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ flex: 1, paddingTop: "0" }}
      >
        {/* Section header */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.72rem", color: section.color, fontWeight: 600, letterSpacing: "0.15em" }}>
              {section.number}
            </span>
            <div style={{ height: "1px", width: "24px", background: `${section.color}44` }} />
          </div>
          <h2 style={{ fontSize: "2rem", marginBottom: "4px" }}>{section.title}</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{section.subtitle}</p>
        </div>

        {section.children}
      </motion.div>
    </div>
  );
}

export function TimelineSpine({ sections }: { sections: Section[] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 20%", "end 80%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} style={{ position: "absolute", left: "8px", top: "24px", bottom: "24px", width: "2px" }}>
      {/* Background track */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.04)", borderRadius: "999px" }} />
      {/* Animated fill */}
      <motion.div
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          background: "linear-gradient(to bottom, #f59e0b, #fb923c, #f43f5e)",
          borderRadius: "999px",
          scaleY, transformOrigin: "top",
          boxShadow: "0 0 8px rgba(245,158,11,0.4)",
        }}
      />
    </div>
  );
}

export default function TimelineLayout({ sections }: { sections: Section[] }) {
  return (
    <div style={{ position: "relative", paddingLeft: "32px" }}>
      <TimelineSpine sections={sections} />
      {sections.map(s => (
        <TimelineSection key={s.number} section={s} />
      ))}
    </div>
  );
}