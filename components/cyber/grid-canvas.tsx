"use client";

import { useEffect, useRef } from "react";

/**
 * Custom WebGL-free animated background. NOT matrix rain.
 * It's a slow-pulsing constellation of acid-green nodes connected by
 * dim trace lines, with occasional magenta "scan" sweeps. Reads more
 * like a packet-sniffer / circuit graph than typical hacker AI slop.
 */
export default function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    type Node = { x: number; y: number; vx: number; vy: number; pulse: number };
    const N = 60;
    const nodes: Node[] = Array.from({ length: N }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.18 * dpr,
      vy: (Math.random() - 0.5) * 0.18 * dpr,
      pulse: Math.random() * Math.PI * 2,
    }));

    let scanX = -200;

    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      // Connection traces
      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        a.pulse += 0.02;
        if (a.x < 0 || a.x > c.width) a.vx *= -1;
        if (a.y < 0 || a.y > c.height) a.vy *= -1;

        for (let j = i + 1; j < N; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          const max = 180 * dpr;
          if (d < max) {
            const alpha = (1 - d / max) * 0.22;
            ctx.strokeStyle = `rgba(198,255,58,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const r = 1.2 * dpr + Math.sin(n.pulse) * 0.6 * dpr;
        ctx.fillStyle = "rgba(0,255,163,0.85)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Magenta scan sweep
      scanX += 1.4 * dpr;
      if (scanX > c.width + 200) scanX = -200;
      const grad = ctx.createLinearGradient(scanX - 80, 0, scanX + 80, 0);
      grad.addColorStop(0, "rgba(255,43,214,0)");
      grad.addColorStop(0.5, "rgba(255,43,214,0.18)");
      grad.addColorStop(1, "rgba(255,43,214,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(scanX - 80, 0, 160, c.height);

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
