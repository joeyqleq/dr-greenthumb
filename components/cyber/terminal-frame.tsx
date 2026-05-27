"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function TerminalFrame({
  title = "session",
  badge,
  accent = "var(--acid)",
  children,
  className,
}: {
  title?: string;
  badge?: string;
  accent?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border bg-[#0a0c10]/95 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm",
        className
      )}
      style={{
        borderColor: `color-mix(in srgb, ${accent} 32%, transparent)`,
        boxShadow: `0 0 0 1px color-mix(in srgb, ${accent} 12%, transparent), 0 30px 80px -20px ${accent}22`,
      }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-3 border-b px-3 py-2 sm:px-4"
        style={{ borderColor: `color-mix(in srgb, ${accent} 18%, transparent)`, background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))" }}
      >
        {/* traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)]" />
        </div>

        {/* title */}
        <div className="flex-1 truncate text-center font-mono text-[10px] tracking-[0.2em] text-white/45 sm:text-[11px]">
          {title}
        </div>

        {/* badge / right side */}
        {badge ? (
          <span
            className="hidden sm:inline-block border px-2 py-0.5 font-mono text-[9px] tracking-[0.18em]"
            style={{
              borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
              color: accent,
              background: `color-mix(in srgb, ${accent} 8%, transparent)`,
            }}
          >
            {badge}
          </span>
        ) : (
          <span className="w-12 sm:w-16" aria-hidden />
        )}
      </div>

      {/* body */}
      <div className="relative">{children}</div>
    </div>
  );
}
