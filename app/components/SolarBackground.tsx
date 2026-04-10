"use client";

import { useEffect, useRef } from "react";

interface Branch {
  x: number; y: number; angle: number; length: number;
  depth: number; alpha: number; width: number;
  progress: number; speed: number; color: string;
  children: Branch[]; grown: boolean;
}

export default function SolarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let scrollProgress = 0;
    let targetScroll = 0;
    let lastFrame = 0;
    const FPS = 30;
    const FRAME_TIME = 1000 / FPS;
    const COLORS = ["#f59e0b", "#fb923c", "#f43f5e", "#fcd34d"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.0 + 0.2,
      o: Math.random() * 0.3 + 0.08,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002,
    }));

    function createBranch(x: number, y: number, angle: number, length: number, depth: number, color: string): Branch {
      return {
        x, y, angle, length, depth,
        alpha: depth === 0 ? 0.45 : Math.max(0, 0.25 - depth * 0.04),
        width: Math.max(0.3, 2 - depth * 0.35),
        progress: 0,
        speed: 0.02 + Math.random() * 0.01,
        color, children: [], grown: false,
      };
    }

    function growChildren(b: Branch) {
      if (b.depth >= 4) return;
      const endX = b.x + Math.cos(b.angle) * b.length;
      const endY = b.y + Math.sin(b.angle) * b.length;
      for (let i = 0; i < 2; i++) {
        const spread = (Math.random() - 0.5) * 0.85;
        const childLen = b.length * (0.6 + Math.random() * 0.15);
        b.children.push(createBranch(endX, endY, b.angle + spread, childLen, b.depth + 1, COLORS[Math.floor(Math.random() * COLORS.length)]));
      }
    }

    // Store W and H at root level so nested functions can use them safely
    let W = canvas.width;
    let H = canvas.height;

    function createRoots(): Branch[] {
      return [
        createBranch(W * 0.5,  H,        -Math.PI / 2,        H * 0.16, 0, "#f59e0b"),
        createBranch(W * 0.15, H,        -Math.PI / 2 + 0.35, H * 0.13, 0, "#fb923c"),
        createBranch(W * 0.85, H,        -Math.PI / 2 - 0.35, H * 0.13, 0, "#f43f5e"),
        createBranch(0,        H * 0.65,  0.25,                H * 0.12, 0, "#fcd34d"),
        createBranch(W,        H * 0.55,  Math.PI + 0.25,      H * 0.12, 0, "#fb923c"),
      ];
    }

    let roots = createRoots();

    function drawBranch(b: Branch, c: CanvasRenderingContext2D) {
      if (b.progress <= 0) return;
      const endX = b.x + Math.cos(b.angle) * b.length * Math.min(b.progress, 1);
      const endY = b.y + Math.sin(b.angle) * b.length * Math.min(b.progress, 1);

      c.beginPath();
      c.moveTo(b.x, b.y);
      c.lineTo(endX, endY);
      c.strokeStyle = b.color + Math.floor(b.alpha * 255).toString(16).padStart(2, "0");
      c.lineWidth = b.width;
      c.lineCap = "round";
      c.stroke();

      if (b.progress >= 1) {
        c.beginPath();
        c.arc(endX, endY, b.width * 1.1, 0, Math.PI * 2);
        c.fillStyle = b.color + "66";
        c.fill();
      }
      b.children.forEach(child => drawBranch(child, c));
    }

    function updateBranches(branches: Branch[], scrollP: number, parentDone = true) {
      branches.forEach(b => {
        if (!parentDone) return;
        b.progress = Math.min(1, b.progress + b.speed * (1 + scrollP * 2));
        if (b.progress >= 1 && !b.grown && scrollP > b.depth * 0.1) {
          b.grown = true;
          growChildren(b);
        }
        updateBranches(b.children, scrollP, b.progress >= 0.85);
      });
    }

    let t = 0;

    const draw = (timestamp: number) => {
      animId = requestAnimationFrame(draw);
      if (timestamp - lastFrame < FRAME_TIME) return;
      lastFrame = timestamp;

      W = canvas.width;
      H = canvas.height;
      scrollProgress += (targetScroll - scrollProgress) * 0.04;

      ctx.clearRect(0, 0, W, H);

      const g1 = ctx.createRadialGradient(W * 0.2, H, 0, W * 0.2, H, W * 0.5);
      g1.addColorStop(0, "rgba(245,158,11,0.05)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      stars.forEach(s => {
        const flicker = s.o * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(252,211,77,${flicker.toFixed(2)})`;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      updateBranches(roots, scrollProgress);
      roots.forEach(r => drawBranch(r, ctx));

      t++;
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 0,
      pointerEvents: "none", opacity: 0.85,
    }} />
  );
}