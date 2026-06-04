"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ShinyText from "@/components/react-bits/ShinyText";
import DecryptedText from "@/components/react-bits/DecryptedText";
import Shuffle from "@/components/react-bits/Shuffle";
import { HudCorners, HudLabel, StatusDot } from "@/components/cyber/hud-frame";

import GridPixelateWipe from "@/components/ui/grid-pixelate-wipe";
import LetterGlitch from "@/components/ui/letter-glitch";
import PacmanSvg from "@/components/ui/pacman-svg";
const KPIS = [
  { k: "FACE_TIME", v: "00:00:00", color: "var(--toxic)" },
  { k: "DELIVERY", v: "STASH/HIDDEN", color: "var(--acid)" },
  { k: "ROUTE", v: "RDT → WSH → BKA → DRP", color: "var(--sky)" },
  { k: "TRACE", v: "ZERO", color: "var(--amber)" },
];

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative overflow-hidden border border-[var(--acid)]/20 bg-[var(--ink-2)]/60 backdrop-blur-md">
        <HudCorners />

        {/* Background Pixelate Wipe -> Letter Glitch */}
        <div className="absolute inset-0 z-0 opacity-80">
          <GridPixelateWipe
            from={<div className="bg-[#050505] w-full h-full" />}
            to={
              <LetterGlitch
                speed={25}
                glitchSpeed={50}
                colors={["#781bf3", "#2ac77e", "#870c0c"]}
                showOuterVignette={true}
                showCenterVignette={true}
              />
            }
            cols={16}
            rows={10}
            transitionDuration={2.5}
            pattern="wave"
          />
        </div>

        {/* terminal header bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[var(--acid)]/20 bg-black/40 px-3 py-1.5 font-mono text-[10px] sm:px-4 sm:py-2 sm:text-[11px]">
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

        {/* CRT body — tight on mobile, roomy on desktop */}
        <div className="relative z-10 px-3 py-2 sm:px-5 sm:py-4 md:px-10 md:py-7 lg:px-12 lg:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(198,255,58,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(255,43,214,0.10),transparent_55%)]" />

          <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 border border-[var(--acid)]/30 bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--acid)] sm:mb-4 sm:gap-3 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.3em]">
                <StatusDot />
                <span>encrypted · anonymous · ritual</span>
                <span className="hidden text-white/30 sm:inline">// v4.2</span>
              </div>

              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] text-white/40 sm:gap-3 sm:text-xs">
                <span className="text-[var(--sky)]">$</span>
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

              {/* MAIN HEADLINE — Shuffle animation */}
              <h1 className="font-display text-[clamp(1.75rem,7vw,4.5rem)] font-bold leading-[0.95] tracking-tight text-white">
                <span className="cy-glitch-line block" data-text="DR. GREENTHUMB.">
                  <motion.h1
                    className="font-display text-[clamp(1.75rem,7vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
                  >
                    <Shuffle
                      text="DR. GREENTHUMB."
                      shuffleDirection="right"
                      duration={0.3}
                      shuffleTimes={1}
                      ease="back.out(1.1)"
                      triggerOnHover
                      loop
                      loopDelay={0.4}
                      className="bg-gradient-to-r from-[var(--acid)] via-[var(--toxic)] to-[var(--sky)] bg-clip-text text-transparent"
                    />
                  </motion.h1>
                </span>
              </h1>

              {/* DEMOTED subhead */}
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/55 sm:mt-4 sm:text-[12px] md:text-[13px]">
                <span className="text-[var(--acid)]">{"// "}</span>
                facilitator of peace of mind
              </p>

              <p className="mt-3 max-w-2xl font-mono text-[11.5px] leading-relaxed text-white/55 sm:mt-4 sm:text-[13px] md:text-sm">
                I procure premium products straight from the source in the Bekaa Valley and deliver them securely via dead-drop to your location. My service exists to provide unmatched quality, total convenience, and complete anonymity for both of us.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
                <div className="group relative border border-[var(--acid)]/15 bg-black/40 p-3 backdrop-blur-sm transition hover:border-[var(--acid)]/50 sm:p-4">
                  <span className="absolute -top-px -left-px h-2 w-2 border-t border-l border-[var(--toxic)]" />
                  <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[var(--toxic)]" />
                  <HudLabel>PILLAR_01</HudLabel>
                  <h4 className="mt-2 font-display text-base font-semibold text-white">
                    <DecryptedText text="Quality Source" speed={40} maxIterations={10} />
                  </h4>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/50">
                    Straight from the Bekaa Valley. No tainted Beirut street product. Only the finest grade, guaranteed purity.
                  </p>
                </div>
                <div className="group relative border border-[var(--acid)]/15 bg-black/40 p-3 backdrop-blur-sm transition hover:border-[var(--acid)]/50 sm:p-4">
                  <span className="absolute -top-px -left-px h-2 w-2 border-t border-l border-[var(--acid)]" />
                  <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[var(--acid)]" />
                  <HudLabel>PILLAR_02</HudLabel>
                  <h4 className="mt-2 font-display text-base font-semibold text-white">
                    <DecryptedText text="Convenience" speed={40} maxIterations={10} />
                  </h4>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/50">
                    Why drive dangerous roads? I deliver directly to you. A dead-drop right under your home or office.
                  </p>
                </div>
                <div className="group relative border border-[var(--acid)]/15 bg-black/40 p-3 backdrop-blur-sm transition hover:border-[var(--acid)]/50 sm:p-4">
                  <span className="absolute -top-px -left-px h-2 w-2 border-t border-l border-[var(--sky)]" />
                  <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[var(--sky)]" />
                  <HudLabel>PILLAR_03</HudLabel>
                  <h4 className="mt-2 font-display text-base font-semibold text-white">
                    <DecryptedText text="Anonymity" speed={40} maxIterations={10} />
                  </h4>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/50">
                    No face-to-face contact. You don&apos;t know me, I don&apos;t know you. A system built entirely for mutual safety.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Pacman SVG Ghost */}
            <div className="hidden md:flex flex-col justify-center relative h-full w-full min-h-[300px]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <PacmanSvg />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
