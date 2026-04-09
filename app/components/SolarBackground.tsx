"use client";

import { useEffect, useRef } from "react";

interface Branch {
  x: number;
  y: number;
  angle: number;
  length: number;
  depth: number;
  alpha: number;
  width: number;
  progress: number;
  speed: number;
  color: string;
  children: Branch[];
  grown: boolean;
}

export default function SolarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let scrollProgress = 0;
    let targetScroll = 0;
    const COLORS = ["#f59e0b", "#fb923c", "#f43f5e", "#fcd34d", "#c084fc"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track scroll
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll);

    // Sparse warm stars
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.35 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.002,
    }));

    // Create a neural branch tree starting from a point
    function createBranch(x: number, y: number, angle: number, length: number, depth: number, color: string): Branch {
      return {
        x, y, angle, length,
        depth, alpha: depth === 0 ? 0.5 : 0.3 - depth * 0.05,
        width: Math.max(0.3, 2.5 - depth * 0.4),
        progress: 0,
        speed: 0.018 + Math.random() * 0.012,
        color,
        children: [],
        grown: false,
      };
    }

    // Grow children when branch finishes
    function growChildren(b: Branch, W: number, H: number) {
      if (b.depth >= 6) return;
      const endX = b.x + Math.cos(b.angle) * b.length;
      const endY = b.y + Math.sin(b.angle) * b.length;
      const numChildren = b.depth < 2 ? 3 : 2;
      for (let i = 0; i < numChildren; i++) {
        const spread = (Math.random() - 0.5) * 0.9;
        const childAngle = b.angle + spread;
        const childLen = b.length * (0.62 + Math.random() * 0.18);
        const childColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        b.children.push(createBranch(endX, endY, childAngle, childLen, b.depth + 1, childColor));
      }
    }

    // Seed roots — spread around edges and center
    function createRoots(W: number, H: number): Branch[] {
      const roots: Branch[] = [];
      // Bottom center
      roots.push(createBranch(W * 0.5, H, -Math.PI / 2, H * 0.18, 0, "#f59e0b"));
      // Bottom left
      roots.push(createBranch(W * 0.15, H, -Math.PI / 2 + 0.3, H * 0.15, 0, "#fb923c"));
      // Bottom right
      roots.push(createBranch(W * 0.85, H, -Math.PI / 2 - 0.3, H * 0.15, 0, "#f43f5e"));
      // Left edge
      roots.push(createBranch(0, H * 0.6, 0.2, H * 0.14, 0, "#fcd34d"));
      // Right edge
      roots.push(createBranch(W, H * 0.5, Math.PI + 0.2, H * 0.14, 0, "#c084fc"));
      return roots;
    }

    let roots: Branch[] = [];
    let W = canvas.width, H = canvas.height;
    roots = createRoots(W, H);

    // Draw a branch recursively
    function drawBranch(b: Branch, ctx: CanvasRenderingContext2D, scrollP: number) {
      if (b.progress <= 0) return;

      const endX = b.x + Math.cos(b.angle) * b.length * Math.min(b.progress, 1);
      const endY = b.y + Math.sin(b.angle) * b.length * Math.min(b.progress, 1);

      // Glow
      ctx.shadowBlur = b.depth < 2 ? 8 : 4;
      ctx.shadowColor = b.color;

      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = b.color + Math.floor(b.alpha * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = b.width;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Small node at end
      if (b.progress >= 1) {
        ctx.beginPath();
        ctx.arc(endX, endY, b.width * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = b.color + "88";
        ctx.fill();
      }

      b.children.forEach(child => drawBranch(child, ctx, scrollP));
    }

    // Update branch growth based on scroll
    function updateBranches(branches: Branch[], scrollP: number, parentDone = true) {
      branches.forEach(b => {
        if (!parentDone) return;

        // Grow faster with more scroll
        const growRate = b.speed * (1 + scrollP * 3);

        if (b.progress < 1) {
          b.progress = Math.min(1, b.progress + growRate);
        } else if (!b.grown && scrollP > b.depth * 0.08) {
          b.grown = true;
          growChildren(b, W, H);
        }

        updateBranches(b.children, scrollP, b.progress >= 0.8);
      });
    }

    let t = 0;

    const draw = () => {
      W = canvas.width;
      H = canvas.height;

      // Smooth scroll
      scrollProgress += (targetScroll - scrollProgress) * 0.05;

      ctx.clearRect(0, 0, W, H);

      // Subtle warm background glow
      const g1 = ctx.createRadialGradient(W * 0.3, H * 0.7, 0, W * 0.3, H * 0.7, W * 0.6);
      g1.addColorStop(0, "rgba(245,158,11,0.04)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * 0.8, H * 0.3, 0, W * 0.8, H * 0.3, W * 0.5);
      g2.addColorStop(0, "rgba(251,146,60,0.03)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        const flicker = s.o * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(252,211,77,${flicker})`;
        ctx.fill();
      });

      // Update and draw neural branches
      updateBranches(roots, scrollProgress);
      roots.forEach(root => drawBranch(root, ctx, scrollProgress));

      // Pulse effect on nodes — subtle glow that breathes
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.03);
      roots.forEach(root => {
        if (root.progress >= 1) {
          ctx.beginPath();
          ctx.arc(root.x + Math.cos(root.angle) * root.length, root.y + Math.sin(root.angle) * root.length, 4 + pulse * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,158,11,${0.1 + pulse * 0.1})`;
          ctx.fill();
        }
      });

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 0,
      pointerEvents: "none", opacity: 0.9,
    }} />
  );
}