"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LetterGlitchProps {
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  showCenterVignette?: boolean;
  showOuterVignette?: boolean;
  smooth?: boolean;
  speed?: number;
  colors?: string[];
  className?: string;
  density?: number; // 0 to 1, how many characters are drawn vs empty gaps
}

export default function LetterGlitch({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  showCenterVignette = true,
  showOuterVignette = true,
  smooth = true,
  speed = 25,
  colors = ["#781bf3", "#2ac77e", "#870c0c"],
  className,
  density = 0.6, // 40% empty space for "random transparent gaps"
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = Date.now();
    let charArr: any[] = [];
    let w: number;
    let h: number;
    const charSize = 14;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()";

    const init = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      const cols = Math.floor(w / charSize) + 1;
      const rows = Math.floor(h / charSize) + 1;

      charArr = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > density) continue; // Random transparent gaps
          charArr.push({
            x: i * charSize,
            y: j * charSize,
            char: chars[Math.floor(Math.random() * chars.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: (Math.random() * speed) / 10 + 1,
            opacity: Math.random(),
            fadeDir: Math.random() > 0.5 ? 1 : -1,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${charSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      charArr.forEach((c) => {
        // Handle fading
        if (smooth) {
          c.opacity += c.fadeDir * 0.02 * c.speed;
          if (c.opacity >= 1) {
            c.opacity = 1;
            c.fadeDir = -1;
          } else if (c.opacity <= 0) {
            c.opacity = 0;
            c.fadeDir = 1;
            c.char = chars[Math.floor(Math.random() * chars.length)];
            c.color = colors[Math.floor(Math.random() * colors.length)];
          }
        }

        // Handle Glitch randomly changing character
        if (Math.random() * 1000 < glitchSpeed) {
          c.char = chars[Math.floor(Math.random() * chars.length)];
        }

        ctx.fillStyle = c.color;
        ctx.globalAlpha = c.opacity;
        ctx.fillText(c.char, c.x + charSize / 2, c.y + charSize / 2);
      });
      ctx.globalAlpha = 1;

      // Center vignette
      if (centerVignette || showCenterVignette) {
        const grd = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2);
        grd.addColorStop(0, "rgba(0,0,0,0)");
        grd.addColorStop(1, "rgba(0,0,0,0.8)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }

      // Outer vignette
      if (outerVignette || showOuterVignette) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, w, charSize * 2);
        ctx.fillRect(0, h - charSize * 2, w, charSize * 2);
        ctx.fillRect(0, 0, charSize * 2, h);
        ctx.fillRect(w - charSize * 2, 0, charSize * 2, h);
      }
    };

    const animate = () => {
      const now = Date.now();
      if (now - lastTime > 1000 / 30) {
        draw();
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [glitchSpeed, centerVignette, showCenterVignette, outerVignette, showOuterVignette, smooth, speed, colors, density]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full pointer-events-none", className)}
    />
  );
}
