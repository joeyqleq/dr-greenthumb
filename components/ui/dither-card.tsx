"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DitherCardProps {
  label: string;
  title: string;
  description: string;
  weight: string;
  price: string;
  color: string;
  isCustomExplainer?: boolean;
}

export default function DitherCard({
  label,
  title,
  description,
  weight,
  price,
  color,
  image,
  isCustomExplainer = false,
  onImageClick,
}: DitherCardProps & { image?: string; onImageClick?: () => void }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/40 p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1",
        isCustomExplainer ? "col-span-1 md:col-span-2 lg:col-span-3" : ""
      )}
    >
      {/* Magic Bento Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${color}22, transparent 40%)`,
        }}
      />
      
      {/* Border Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0 rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${color}66, transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1.5px",
        }}
      />

      {/* Mild Dither / Noise Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex-1">
        <div className="mb-4 flex items-center justify-between">
          <span 
            className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase"
            style={{ color }}
          >
            {label}
          </span>
          <span className="font-mono text-xs text-white/40">{weight}</span>
        </div>
        
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
              {title}
            </h3>
            
            {isCustomExplainer ? (
              <p className="mt-3 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--toxic)]">
                <span className="text-white/60">Explanation: </span>
                Liquid Ketamine, Crystal MDMA, E pill, Psilocybin Mushrooms, LSD Tabs available but it could be any time anywhere and it's best to let me know what you're thinking of and I'll keep an eye out once I come across them. The products in the main list above are always available.
              </p>
            ) : (
              <p className="mt-2 font-mono text-[11px] sm:text-xs leading-relaxed text-white/50">
                {description}
              </p>
            )}
          </div>
          
          {image && (
            <div 
              className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/20 transition-transform hover:scale-105 hover:border-[var(--acid)]"
              onClick={onImageClick}
            >
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-end justify-between shrink-0">
        <div className="font-display text-2xl sm:text-3xl font-black text-white tracking-tighter">
          {price}
        </div>
        <div className="h-6 w-6 rounded-full border border-white/20 bg-white/5 grid place-items-center transition-colors group-hover:bg-white/10 group-hover:border-white/40">
          <span className="text-[10px] text-white/70">→</span>
        </div>
      </div>
    </div>
  );
}
