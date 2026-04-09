"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", onMove);

    const addListeners = () => {
      document.querySelectorAll("a, button, [role='button']").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: isHovering ? 1.6 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.5 }}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          width: "40px", height: "40px", borderRadius: "50%",
          border: "1px solid rgba(245,158,11,0.5)",
          pointerEvents: "none",
          mixBlendMode: "difference",
        }}
      />
      {/* Inner dot */}
      <motion.div
        animate={{ x: pos.x - 4, y: pos.y - 4, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          width: "8px", height: "8px", borderRadius: "50%",
          background: "var(--accent-amber)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}