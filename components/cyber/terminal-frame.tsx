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
        className="flex items-center gap-2 border-b px-2 py-1.5 sm:gap-3 sm:px-4 sm:py-2"
        style={{ borderColor: `color-mix(in srgb, ${accent} 18%, transparent)`, background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))" }}
      >
        {/* traffic lights */}
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)] sm:h-3 sm:w-3" />
        </div>

        {/* title */}
        <div className="min-w-0 flex-1 truncate text-center font-mono text-[9px] tracking-[0.15em] text-white/45 sm:text-[11px] sm:tracking-[0.2em]">
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
          <span className="w-8 sm:w-16" aria-hidden />
        )}
      </div>

      {/* body */}
      <div className="relative">{children}</div>
    </div>
  );
}
