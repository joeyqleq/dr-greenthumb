import type { ReactNode } from "react";

export function HudCorners() {
  return (
    <>
      <span className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-t border-l border-[var(--acid)]" />
      <span className="pointer-events-none absolute -top-px -right-px h-3 w-3 border-t border-r border-[var(--acid)]" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l border-[var(--acid)]" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-[var(--acid)]" />
    </>
  );
}

export function HudLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--acid)]/70">
      {children}
    </div>
  );
}

export function StatusDot({ color = "var(--toxic)" }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2 w-2 items-center justify-center">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}
