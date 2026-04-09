"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9998,
            background: "#0e0a07",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "24px",
          }}
        >
          {/* Animated name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #f59e0b, #fb923c, #f43f5e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Joyce
          </motion.h1>

          {/* Loading bar */}
          <motion.div
            style={{ width: "160px", height: "1px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", overflow: "hidden" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
              style={{
                height: "100%",
                background: "linear-gradient(to right, #f59e0b, #fb923c)",
                borderRadius: "999px",
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8 }}
            style={{ fontSize: "0.72rem", color: "#a8956f", letterSpacing: "0.2em" }}
          >
            PORTFOLIO
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}