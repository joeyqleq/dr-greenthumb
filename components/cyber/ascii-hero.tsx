"use client";
import { useEffect, useState, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   ASCII cannabis leaf — manually pixel-art'd for the hero.
   Each line is the same width (padded) so the typing animation
   reveals row-by-row cleanly.
   ───────────────────────────────────────────────────────────── */
const LEAF_ART = [
  "                         ▄▓▓▄                         ",
  "                        ▓█▒▒█▓                        ",
  "                       ▓█▒░░▒█▓                       ",
  "            ▄▓▓▄      ▓█▒░░░░▒█▓      ▄▓▓▄            ",
  "           ▓█▒▒█▓    ▓█▒░░░░░░▒█▓    ▓█▒▒█▓           ",
  "          ▓█▒░░▒█▓  ▓█▒░░░██░░░▒█▓  ▓█▒░░▒█▓          ",
  "         ▓█▒░░░░▒██▓█▒░░░████░░░▒█▓██▒░░░░▒█▓         ",
  "        ▓█▒░░░░░░▒██▒░░░██████░░░▒██▒░░░░░░▒█▓        ",
  "       ▓█▒░░░░░░░░▒█░░░████████░░░█▒░░░░░░░░▒█▓       ",
  "  ▄▓▓▓██▒░░░░░░░░░░░░░██████████░░░░░░░░░░░░░▒██▓▓▓▄  ",
  " ▓█▒▒▒▒▒░░░░░░░░░░░░░████████████░░░░░░░░░░░░░▒▒▒▒▒█▓ ",
  "  ▀▓██▒░░░░░░░░░░░░░░██████████████░░░░░░░░░░░░░▒██▓▀  ",
  "     ▓█▒░░░░░░░░░░░░░░████████████░░░░░░░░░░░░░▒█▓     ",
  "      ▀█▓▒░░░░░░░░░░░░░██████████░░░░░░░░░░░░░▒▓█▀     ",
  "        ▀▓█▒░░░░░░░░░░░░████████░░░░░░░░░░░░▒█▓▀       ",
  "          ▀▓█▒░░░░░░░░░░░██████░░░░░░░░░░░▒█▓▀         ",
  "            ▀▓█▒░░░░░░░░░░████░░░░░░░░░░▒█▓▀           ",
  "              ▀▓█▒░░░░░░░░░██░░░░░░░░░▒█▓▀             ",
  "                ▀▓█▒░░░░░░░██░░░░░░░▒█▓▀               ",
  "                  ▀▓█▒░░░░░██░░░░░▒█▓▀                 ",
  "                    ▀▓█▒░░░██░░░▒█▓▀                   ",
  "                      ▀▓█▒░██░▒█▓▀                     ",
  "                        ▀▓████▓▀                       ",
  "                          ▓██▓                         ",
  "                          ▓██▓                         ",
  "                        ▄▓████▓▄                       ",
  "                       ▓████████▓                      ",
  "                        ▀▓████▓▀                       ",
];

/* ─── glitch characters to inject ─── */
const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~¡¢£¥¦§¨©ª«¬®¯°±²³´µ¶·¹º»¼½¾¿×÷";

/* ─── matrix rain column ─── */
type RainDrop = {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  opacity: number;
};

export default function AsciiHero({ className = "" }: { className?: string }) {
  const [revealed, setRevealed] = useState(0);
  const [glitchLines, setGlitchLines] = useState<Set<number>>(new Set());
  const [matrixCols, setMatrixCols] = useState<RainDrop[]>([]);
  const matrixRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  const totalChars = LEAF_ART.reduce((sum, line) => sum + line.length, 0);

  /* ─── typing reveal animation ─── */
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(totalChars);
      return;
    }
    let i = 0;
    const charsPerTick = Math.max(4, Math.floor(totalChars / 50));
    const id = setInterval(() => {
      i += charsPerTick;
      if (i >= totalChars) {
        i = totalChars;
        clearInterval(id);
      }
      setRevealed(i);
    }, 30);
    return () => clearInterval(id);
  }, [totalChars]);

  /* ─── random glitch bursts ─── */
  useEffect(() => {
    const glitch = () => {
      const count = Math.floor(Math.random() * 4) + 1;
      const lines = new Set<number>();
      for (let i = 0; i < count; i++) {
        lines.add(Math.floor(Math.random() * LEAF_ART.length));
      }
      setGlitchLines(lines);
      setTimeout(() => setGlitchLines(new Set()), 100 + Math.random() * 150);
    };
    const id = setInterval(glitch, 2000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);

  /* ─── matrix rain behind the leaf ─── */
  const initMatrix = useCallback(() => {
    const cols: RainDrop[] = [];
    const charW = 9.6; // approximate monospace char width at ~14px font
    const containerW = Math.min(600, window.innerWidth - 32);
    const numCols = Math.floor(containerW / charW);
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()ÀÁÂÃÄÅÆÇÈÉÊÌÍÎÏÐÑÒÓÔÕÖÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöùúûüýþÿ";
    for (let i = 0; i < numCols; i++) {
      if (Math.random() > 0.35) continue; // sparse
      const len = Math.floor(Math.random() * 12) + 4;
      cols.push({
        x: i,
        y: -Math.random() * 30,
        speed: 0.15 + Math.random() * 0.35,
        length: len,
        opacity: 0.15 + Math.random() * 0.25,
        chars: Array.from({ length: len }, () =>
          matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ),
      });
    }
    return cols;
  }, []);

  useEffect(() => {
    setMatrixCols(initMatrix());
    const id = setInterval(() => setMatrixCols(initMatrix()), 8000);
    return () => clearInterval(id);
  }, [initMatrix]);

  /* ─── animate matrix rain ─── */
  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running) return;
      setMatrixCols(prev =>
        prev.map(col => ({
          ...col,
          y: col.y + col.speed,
          chars: col.chars.map((ch, i) =>
            Math.random() < 0.02
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : ch
          ),
        }))
      );
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  /* ─── render leaf with reveal + glitch ─── */
  let consumed = 0;
  const renderedLines = LEAF_ART.map((line, lineIdx) => {
    const isGlitched = glitchLines.has(lineIdx);
    const chars = line.split("").map((ch, charIdx) => {
      const globalIdx = consumed + charIdx;
      const isRevealed = globalIdx < revealed;
      let displayChar = ch;
      if (!isRevealed) {
        displayChar = ch.trim() === "" ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      } else if (isGlitched && ch.trim() !== "") {
        displayChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      return { ch: displayChar, isRevealed, isGlitched: isGlitched && ch.trim() !== "", original: ch };
    });
    consumed += line.length;
    return { chars, isGlitched, lineIdx };
  });

  return (
    <div className={`relative select-none ${className}`}>
      {/* Matrix rain backdrop */}
      <div
        ref={matrixRef}
        className="pointer-events-none absolute inset-0 overflow-hidden font-mono text-[11px] leading-[1]"
        aria-hidden="true"
        style={{ opacity: 0.4 }}
      >
        {matrixCols.map((col, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(col.x / 60) * 100}%`,
              top: `${col.y}em`,
              opacity: col.opacity,
              transition: "none",
            }}
          >
            {col.chars.map((ch, j) => (
              <div
                key={j}
                style={{
                  color:
                    j === 0
                      ? "rgba(198,255,58,0.9)"
                      : j < 3
                      ? "rgba(0,255,163,0.6)"
                      : "rgba(0,255,163,0.2)",
                  textShadow:
                    j === 0
                      ? "0 0 8px rgba(198,255,58,0.8)"
                      : "none",
                }}
              >
                {ch}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* The ASCII leaf */}
      <pre
        className="relative z-10 mx-auto font-mono leading-[1.15] whitespace-pre"
        role="img"
        aria-label="Cannabis leaf ASCII art"
        style={{
          fontSize: "clamp(7px, 1.6vw, 14px)",
          textAlign: "center",
        }}
      >
        {renderedLines.map(({ chars, isGlitched, lineIdx }) => (
          <div
            key={lineIdx}
            className="block"
            style={
              isGlitched
                ? {
                    transform: `translateX(${Math.random() * 6 - 3}px)`,
                    filter: "brightness(1.8)",
                  }
                : undefined
            }
          >
            {chars.map((c, ci) => {
              if (c.original.trim() === "") {
                return (
                  <span key={ci} className="text-transparent">
                    {c.ch}
                  </span>
                );
              }
              if (!c.isRevealed) {
                return (
                  <span key={ci} className="text-white/10">
                    {c.ch}
                  </span>
                );
              }
              if (c.isGlitched) {
                return (
                  <span
                    key={ci}
                    style={{
                      color: Math.random() > 0.5 ? "var(--magenta)" : "var(--toxic)",
                      textShadow: "0 0 6px currentColor",
                    }}
                  >
                    {c.ch}
                  </span>
                );
              }
              // Revealed normal char — map to color based on char type
              const isBlock = "█▓▒░▄▀".includes(c.original);
              const isLeafInterior = "░".includes(c.original) || c.original === "░";
              return (
                <span
                  key={ci}
                  style={{
                    color: isLeafInterior
                      ? "rgba(0,255,163,0.5)"
                      : isBlock
                      ? "var(--acid)"
                      : "var(--toxic)",
                    textShadow: isBlock
                      ? "0 0 10px rgba(198,255,58,0.6), 0 0 20px rgba(0,255,163,0.3)"
                      : "0 0 6px rgba(0,255,163,0.4)",
                  }}
                >
                  {c.ch}
                </span>
              );
            })}
          </div>
        ))}
      </pre>

      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {/* Bottom glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to top, var(--ink-2), transparent)",
        }}
      />
    </div>
  );
}
