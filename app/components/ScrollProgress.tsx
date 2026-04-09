"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "2px", zIndex: 200,
        background: "linear-gradient(to right, var(--accent-amber), var(--accent-orange), var(--accent-rose))",
        transformOrigin: "0%",
        scaleX: scrollYProgress,
      }}
    />
  );
}