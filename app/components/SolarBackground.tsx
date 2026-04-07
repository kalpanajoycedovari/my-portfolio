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
    let scrollY = 0;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", () => { scrollY = window.scrollY; });

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      o: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      parallax: Math.random() * 0.4 + 0.05,
    }));

    const planets = [
      { r: 90,  speed: 0.012, size: 6,  color: "#f472b6", phase: 0,   tilt: 0.32 },
      { r: 145, speed: 0.007, size: 9,  color: "#c084fc", phase: 1.2, tilt: 0.38 },
      { r: 200, speed: 0.0045,size: 7,  color: "#34d399", phase: 2.5, tilt: 0.28 },
      { r: 265, speed: 0.0028,size: 11, color: "#fbbf24", phase: 0.8, tilt: 0.42 },
      { r: 335, speed: 0.0018,size: 8,  color: "#38bdf8", phase: 3.8, tilt: 0.35 },
    ];

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const scrollProgress = scrollY / (document.body.scrollHeight - H);
      const camX = scrollProgress * W * 0.3;
      const camY = scrollProgress * H * 0.2;
      const zoom = 1 + scrollProgress * 0.4;

      // Sun drifts as you scroll
      const sx = W * 0.68 - camX * 0.6;
      const sy = H * 0.44 - camY * 0.3;

      // Stars with parallax
      stars.forEach(s => {
        const flicker = s.o * (0.7 + 0.3 * Math.sin(t * s.speed * 8 + s.phase));
        const px = ((s.x * W - camX * s.parallax) % W + W) % W;
        const py = ((s.y * H - camY * s.parallax * 0.5) % H + H) % H;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${flicker})`;
        ctx.fill();
      });

      // Nebula
      const neb = ctx.createRadialGradient(sx, sy, 0, sx, sy, 500 * zoom);
      neb.addColorStop(0,   "rgba(109,40,217,0.14)");
      neb.addColorStop(0.4, "rgba(88,28,135,0.08)");
      neb.addColorStop(0.7, "rgba(244,114,182,0.04)");
      neb.addColorStop(1,   "transparent");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, W, H);

      // Orbit rings
      planets.forEach(p => {
        ctx.beginPath();
        ctx.ellipse(sx, sy, p.r * zoom, p.r * p.tilt * zoom, -0.25, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(192,132,252,0.14)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Sun glow
      const sunR = 60 * zoom;
      const sunGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, sunR * 1.8);
      sunGlow.addColorStop(0,   "rgba(245,208,254,0.9)");
      sunGlow.addColorStop(0.3, "rgba(192,132,252,0.6)");
      sunGlow.addColorStop(0.7, "rgba(139,92,246,0.2)");
      sunGlow.addColorStop(1,   "transparent");
      ctx.beginPath();
      ctx.arc(sx, sy, sunR * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      // Sun core
      const core = ctx.createRadialGradient(sx - 4, sy - 4, 0, sx, sy, sunR * 0.5);
      core.addColorStop(0, "#fdf4ff");
      core.addColorStop(0.5, "#c084fc");
      core.addColorStop(1, "#7c3aed");
      ctx.beginPath();
      ctx.arc(sx, sy, sunR * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();

      // Planets
      planets.forEach(p => {
        const angle = t * p.speed + p.phase + scrollProgress * Math.PI * 0.8;
        const pr = p.r * zoom;
        const px = sx + Math.cos(angle) * pr;
        const py = sy + Math.sin(angle) * pr * p.tilt;
        const ps = p.size * zoom;

        const glow = ctx.createRadialGradient(px, py, 0, px, py, ps * 3);
        glow.addColorStop(0,   p.color + "bb");
        glow.addColorStop(0.5, p.color + "33");
        glow.addColorStop(1,   "transparent");
        ctx.beginPath();
        ctx.arc(px, py, ps * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        const pcore = ctx.createRadialGradient(px - ps * 0.3, py - ps * 0.3, 0, px, py, ps);
        pcore.addColorStop(0, "#ffffff88");
        pcore.addColorStop(0.4, p.color);
        pcore.addColorStop(1, p.color + "88");
        ctx.beginPath();
        ctx.arc(px, py, ps, 0, Math.PI * 2);
        ctx.fillStyle = pcore;
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
      pointerEvents: "none", opacity: 0.9,
    }} />
  );
}