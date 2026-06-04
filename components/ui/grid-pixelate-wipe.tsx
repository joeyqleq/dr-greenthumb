"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GridPixelateWipeProps {
  from?: React.ReactNode;
  to?: React.ReactNode;
  cols?: number;
  rows?: number;
  pattern?: "wave" | "diagonal" | "spiral";
  transitionDuration?: number;
  className?: string;
}

function spiralIndices(cols: number, rows: number): number[][] {
  const grid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;
  let i = 0;
  while (top <= bottom && left <= right) {
    for (let x = left; x <= right; x++) grid[top][x] = i++;
    top++;
    for (let y = top; y <= bottom; y++) grid[y][right] = i++;
    right--;
    if (top <= bottom) {
      for (let x = right; x >= left; x--) grid[bottom][x] = i++;
      bottom--;
    }
    if (left <= right) {
      for (let y = bottom; y >= top; y--) grid[y][left] = i++;
      left--;
    }
  }
  return grid;
}

export default function GridPixelateWipe({
  from,
  to,
  cols = 12,
  rows = 7,
  pattern = "wave",
  transitionDuration = 1.5,
  className,
}: GridPixelateWipeProps) {
  const delays = useMemo(() => {
    const raw: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    const spiral = pattern === "spiral" ? spiralIndices(cols, rows) : null;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (pattern === "wave") {
          raw[y][x] = Math.hypot(x - (cols - 1) / 2, y - (rows - 1) / 2);
        } else if (pattern === "diagonal") {
          raw[y][x] = x + y;
        } else if (spiral) {
          raw[y][x] = spiral[y][x];
        }
      }
    }

    let min = Infinity;
    let max = -Infinity;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (raw[y][x] < min) min = raw[y][x];
        if (raw[y][x] > max) max = raw[y][x];
      }
    }

    const range = max - min || 1;
    const normalized: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Normalize between 0 and 1, then scale by transitionDuration
        normalized[y][x] = ((raw[y][x] - min) / range) * (transitionDuration * 0.8);
      }
    }
    return normalized;
  }, [cols, rows, pattern, transitionDuration]);

  const cells: React.ReactNode[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const delay = delays[y][x];
      cells.push(
        <motion.div
          key={`${x}-${y}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            delay: 0.5 + delay, // initial pause
            duration: transitionDuration * 0.2,
            ease: "easeOut",
          }}
          style={{
            background: "black",
            width: "100%",
            height: "100%",
          }}
        />
      );
    }
  }

  return (
    <div
      className={cn("relative overflow-hidden w-full h-full", className)}
      style={{ background: "black" }}
    >
      {/* Background (to) */}
      <div className="absolute inset-0 z-0">{to}</div>

      {/* Grid Overlay (wipes away) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {cells}
      </div>

      {/* Foreground (from - disappears instantly after grid covers or fades out) */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.1 }}
      >
        {from}
      </motion.div>
    </div>
  );
}
