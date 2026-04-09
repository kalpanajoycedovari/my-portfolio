"use client";

import { useEffect, useRef } from "react";

export default function SolarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Sparse warm stars
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.003,
    }));

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Warm vignette glow — top left
      const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.7);
      g1.addColorStop(0, "rgba(245,158,11,0.06)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // Warm glow — bottom right
      const g2 = ctx.createRadialGradient(W, H, 0, W, H, W * 0.6);
      g2.addColorStop(0, "rgba(251,146,60,0.05)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Subtle horizontal line — like a horizon
      ctx.beginPath();
      ctx.moveTo(0, H * 0.72);
      ctx.lineTo(W, H * 0.72);
      ctx.strokeStyle = "rgba(245,158,11,0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Stars — warm tinted
      stars.forEach(s => {
        const flicker = s.o * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(252,211,77,${flicker})`;
        ctx.fill();
      });

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 0,
      pointerEvents: "none", opacity: 1,
    }} />
  );
}