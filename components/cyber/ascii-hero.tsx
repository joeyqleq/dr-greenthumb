"use client";
import { useEffect, useState } from "react";

// 5-row block ascii alphabet (subset: A-Z, ., space)
const FONT: Record<string, string[]> = {
  A: [
    " ██ ",
    "█  █",
    "████",
    "█  █",
    "█  █",
  ],
  B: [
    "███ ",
    "█  █",
    "███ ",
    "█  █",
    "███ ",
  ],
  C: [
    " ███",
    "█   ",
    "█   ",
    "█   ",
    " ███",
  ],
  D: [
    "███ ",
    "█  █",
    "█  █",
    "█  █",
    "███ ",
  ],
  E: [
    "████",
    "█   ",
    "███ ",
    "█   ",
    "████",
  ],
  G: [
    " ███",
    "█   ",
    "█ ██",
    "█  █",
    " ███",
  ],
  H: [
    "█  █",
    "█  █",
    "████",
    "█  █",
    "█  █",
  ],
  M: [
    "█   █",
    "██ ██",
    "█ █ █",
    "█   █",
    "█   █",
  ],
  N: [
    "█  █",
    "██ █",
    "█ ██",
    "█  █",
    "█  █",
  ],
  R: [
    "███ ",
    "█  █",
    "███ ",
    "█ █ ",
    "█  █",
  ],
  T: [
    "█████",
    "  █  ",
    "  █  ",
    "  █  ",
    "  █  ",
  ],
  U: [
    "█  █",
    "█  █",
    "█  █",
    "█  █",
    " ██ ",
  ],
  ".": ["  ", "  ", "  ", "  ", "██"],
  " ": ["  ", "  ", "  ", "  ", "  "],
};

function buildLines(text: string): string[] {
  const chars = text.toUpperCase().split("");
  const rows = ["", "", "", "", ""];
  chars.forEach((ch, idx) => {
    const glyph = FONT[ch] || FONT[" "];
    for (let r = 0; r < 5; r++) {
      rows[r] += (idx === 0 ? "" : "  ") + glyph[r];
    }
  });
  return rows;
}

export default function AsciiHero({
  text = "DR. GREENTHUMB",
  lines: rawLines,
  className = "",
}: {
  text?: string;
  lines?: string[];
  className?: string;
}) {
  const sources = rawLines && rawLines.length > 0 ? rawLines : [text];
  const built = sources.map(buildLines);
  // flatten with blank row between blocks
  const lines: string[] = [];
  built.forEach((block, i) => {
    if (i > 0) lines.push("", ""); // gap between text lines
    block.forEach((r) => lines.push(r));
  });
  const total = lines.reduce((s, l) => s + l.length, 0);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    let i = 0;
    // resolve any prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(total);
      return;
    }
    const id = setInterval(() => {
      i += Math.max(2, Math.floor(total / 80));
      if (i >= total) {
        i = total;
        clearInterval(id);
      }
      setRevealed(i);
    }, 22);
    return () => clearInterval(id);
  }, [total]);

  // build masked version that reveals char-by-char with random fillers
  let consumed = 0;
  const palette = ["█", "▓", "▒", "░", "▚", "▞", "◆", "✦"];
  const out = lines.map((line) => {
    const chars: { ch: string; lit: boolean }[] = [];
    for (let i = 0; i < line.length; i++) {
      const idx = consumed + i;
      const original = line[i];
      const lit = idx < revealed;
      let ch = original;
      if (!lit) {
        if (original.trim() === "") ch = " ";
        else ch = palette[(idx * 7) % palette.length];
      }
      chars.push({ ch, lit });
    }
    consumed += line.length;
    return chars;
  });

  return (
    <pre
      className={`select-none font-mono leading-[1] whitespace-pre ${className}`}
      aria-label={text}
      role="img"
    >
      {out.map((row, ri) => (
        <div key={ri} className="block">
          {row.map((c, ci) => (
            <span
              key={ci}
              className={
                c.lit
                  ? "text-[var(--acid)] [text-shadow:0_0_8px_rgba(198,255,58,0.7),0_0_18px_rgba(0,255,163,0.45)]"
                  : "text-white/15"
              }
            >
              {c.ch}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
}
