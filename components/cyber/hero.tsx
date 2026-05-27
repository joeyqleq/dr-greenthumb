"use client";

import DecryptedText from "@/components/react-bits/DecryptedText";
import ShinyText from "@/components/react-bits/ShinyText";
import { HudCorners, HudLabel, StatusDot } from "@/components/cyber/hud-frame";

const KPIS = [
  { k: "FACE_TIME", v: "00:00:00", color: "var(--toxic)" },
  { k: "DELIVERY", v: "STASH/HIDDEN", color: "var(--acid)" },
  { k: "ROUTE", v: "RDT → WSH → BKA → DRP", color: "var(--magenta)" },
  { k: "TRACE", v: "ZERO", color: "var(--amber)" },
];

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative overflow-hidden border border-[var(--acid)]/20 bg-[var(--ink-2)]/60 backdrop-blur-md">
        <HudCorners />
        {/* terminal header bar */}
        <div className="flex items-center justify-between border-b border-[var(--acid)]/20 bg-black/40 px-3 py-1.5 font-mono text-[10px] sm:px-4 sm:py-2 sm:text-[11px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex gap-1 sm:gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--blood)] sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-[var(--amber)] sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-[var(--toxic)] sm:h-2.5 sm:w-2.5" />
            </span>
            <span className="hidden text-white/40 sm:inline">~/dr-greenthumb/private-drop —</span>
            <span className="text-[var(--acid)]">protocol.exec</span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <StatusDot />
            <span className="text-[var(--toxic)]">CHANNEL ACTIVE</span>
            <span className="text-white/30">·</span>
            <span className="text-white/50">UPTIME 14d:07h:22m</span>
          </div>
        </div>

        {/* CRT body — sized to fit one viewport when combined with nav+ticker */}
        <div className="relative px-3 py-4 sm:px-5 sm:py-5 md:px-10 md:py-7 lg:px-12 lg:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(198,255,58,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(255,43,214,0.10),transparent_55%)]" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 border border-[var(--acid)]/30 bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--acid)] sm:mb-4 sm:gap-3 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.3em]">
              <StatusDot />
              <span>encrypted · anonymous · ritual</span>
              <span className="hidden text-white/30 sm:inline">// v4.2</span>
            </div>

            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] text-white/40 sm:gap-3 sm:text-xs">
              <span className="text-[var(--magenta)]">$</span>
              <DecryptedText
                text="./initiate --mode=stealth --src=reddit"
                animateOn="view"
                speed={28}
                maxIterations={14}
                className="text-[var(--toxic)]"
                encryptedClassName="text-white/30"
              />
              <span className="cy-caret text-[var(--acid)]">▌</span>
            </div>

            {/* MAIN HEADLINE — glitch */}
            <h1 className="cy-chrome cy-flicker font-display text-[clamp(1.75rem,7vw,4.5rem)] font-bold leading-[0.95] tracking-tight text-white">
              <span className="block bg-gradient-to-r from-[var(--acid)] via-[var(--toxic)] to-[var(--magenta)] bg-clip-text text-transparent">
                DR.
              </span>
              <span className="cy-glitch-line block" data-text="GREENTHUMB.">
                GREENTHUMB.
              </span>
            </h1>

            {/* DEMOTED subhead */}
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/55 sm:mt-4 sm:text-[12px] md:text-[13px]">
              <span className="text-[var(--acid)]">{"// "}</span>
              private drop protocol runs
            </p>

            <p className="mt-3 max-w-2xl font-mono text-[11.5px] leading-relaxed text-white/55 sm:mt-4 sm:text-[13px] md:text-sm">
              A four-step encrypted process — Reddit handshake, Whish Money rail,
              Bekaa pickup run, then a secluded hidden drop with photo proof and
              optional GPS pin. No phones. No faces. No paper trail.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3 md:grid-cols-4">
              {KPIS.map((k) => (
                <div
                  key={k.k}
                  className="group relative border border-[var(--acid)]/15 bg-black/40 p-2 backdrop-blur-sm transition hover:border-[var(--acid)]/50 sm:p-2.5 md:p-3"
                >
                  <span className="absolute -top-px -left-px h-2 w-2 border-t border-l" style={{ borderColor: k.color }} />
                  <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r" style={{ borderColor: k.color }} />
                  <HudLabel>{k.k}</HudLabel>
                  <div
                    className="mt-1.5 font-mono text-[11.5px] font-semibold tracking-tight sm:text-[13px] md:text-sm"
                    style={{ color: k.color }}
                  >
                    <ShinyText
                      text={k.v}
                      speed={4}
                      color={k.color}
                      shineColor="#ffffff"
                      spread={130}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* fake telemetry bars — only on lg+ to keep one viewport */}
            <div className="mt-5 hidden grid-cols-3 gap-4 font-mono text-[10px] text-white/40 lg:mt-6 lg:grid lg:max-w-md">
              {[
                { l: "OPSEC", v: 98, c: "var(--toxic)" },
                { l: "STEALTH", v: 100, c: "var(--acid)" },
                { l: "TRUST", v: 87, c: "var(--magenta)" },
              ].map((b) => (
                <div key={b.l}>
                  <div className="flex justify-between">
                    <span>{b.l}</span>
                    <span style={{ color: b.c }}>{b.v}%</span>
                  </div>
                  <div className="mt-1 h-1 w-full bg-white/5">
                    <div
                      className="h-full"
                      style={{ width: `${b.v}%`, background: b.c, boxShadow: `0 0 8px ${b.c}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
