"use client";

import React from "react";
import { motion } from "framer-motion";

const Hexagon = ({ delay }: { delay: number }) => (
  <motion.svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="currentColor"
    className="text-[var(--acid)]/40 inline-block mx-0.5"
    animate={{
      opacity: [0.1, 0.8, 0.1, 0.4, 0.1],
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path d="M8 0L15.5 4.5V13.5L8 18L0.5 13.5V4.5L8 0Z" />
  </motion.svg>
);

export default function HexMarquee() {
  // Generate a long strip of hexagons
  const numHexagons = 50;
  const strip = Array.from({ length: numHexagons }).map((_, i) => (
    <Hexagon key={i} delay={Math.random() * 2} />
  ));

  return (
    <div className="border-y border-[var(--acid)]/20 bg-black/40 backdrop-blur-sm overflow-hidden flex py-1">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="flex px-4">{strip}</div>
        <div className="flex px-4">{strip}</div>
        <div className="flex px-4">{strip}</div>
      </motion.div>
    </div>
  );
}
