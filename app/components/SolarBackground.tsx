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

    // Stars
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      o: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    // Planets: radius from sun, speed, size, color, phase offset
    const planets = [
      { r: 90,  speed: 0.012, size: 6,  color: "#f472b6", phase: 0 },
      { r: 140, speed: 0.007, size: 9,  color: "#c084fc", phase: 1.2 },
      { r: 195, speed: 0.0045,size: 7,  color: "#34d399", phase: 2.5 },
      { r: 255, speed: 0.0028,size: 11, color: "#fbbf24", phase: 0.8 },
      { r: 320, speed: 0.0018,size: 8,  color: "#38bdf8", phase: 3.8 },
    ];

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Sun position — right side, vertically centred
      const sx = W * 0.72;
      const sy = H * 0.45;

      // Stars
      stars.forEach(s => {
        const flicker = s.o * (0.7 + 0.3 * Math.sin(t * s.speed * 8 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${flicker})`;
        ctx.fill();
      });

      // Nebula glow
      const neb = ctx.createRadialGradient(sx, sy, 0, sx, sy, 420);
      neb.addColorStop(0,   "rgba(109,40,217,0.12)");
      neb.addColorStop(0.5, "rgba(88,28,135,0.07)");
      neb.addColorStop(1,   "transparent");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, W, H);

      // Orbit rings
      planets.forEach(p => {
        ctx.beginPath();
        ctx.ellipse(sx, sy, p.r, p.r * 0.38, -0.3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(192,132,252,0.13)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Sun
      const sunGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 55);
      sunGlow.addColorStop(0,   "rgba(245,208,254,1)");
      sunGlow.addColorStop(0.3, "rgba(192,132,252,0.9)");
      sunGlow.addColorStop(0.6, "rgba(139,92,246,0.4)");
      sunGlow.addColorStop(1,   "transparent");
      ctx.beginPath();
      ctx.arc(sx, sy, 55, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      // Sun core
      const sunCore = ctx.createRadialGradient(sx - 3, sy - 3, 0, sx, sy, 16);
      sunCore.addColorStop(0, "#fdf4ff");
      sunCore.addColorStop(0.5, "#c084fc");
      sunCore.addColorStop(1, "#7c3aed");
      ctx.beginPath();
      ctx.arc(sx, sy, 16, 0, Math.PI * 2);
      ctx.fillStyle = sunCore;
      ctx.fill();

      // Planets on elliptical orbits
      planets.forEach(p => {
        const angle = t * p.speed + p.phase;
        const px = sx + Math.cos(angle) * p.r;
        const py = sy + Math.sin(angle) * p.r * 0.38;

        // Planet glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, p.size * 2.5);
        glow.addColorStop(0,   p.color + "cc");
        glow.addColorStop(0.5, p.color + "44");
        glow.addColorStop(1,   "transparent");
        ctx.beginPath();
        ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Planet core
        const core = ctx.createRadialGradient(px - p.size * 0.3, py - p.size * 0.3, 0, px, py, p.size);
        core.addColorStop(0, "#ffffff88");
        core.addColorStop(0.4, p.color);
        core.addColorStop(1, p.color + "99");
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = core;
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
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.85,
      }}
    />
  );
}