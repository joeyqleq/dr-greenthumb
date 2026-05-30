"use client";

import TerminalFrame from "@/components/cyber/terminal-frame";
import { HudLabel, StatusDot } from "@/components/cyber/hud-frame";
import { Shield, Lock, Eye, Camera, Clock, AlertOctagon } from "lucide-react";
import DecryptedText from "@/components/react-bits/DecryptedText";

const FEATURES = [
  { icon: Eye, title: "Mutual anonymity", body: "No face-to-face, ever. Both parties stay completely distant throughout the whole process.", color: "var(--toxic)" },
  { icon: Camera, title: "Visual proof", body: "A photo of the exact hiding spot is sent so there is no confusion on the customer's end.", color: "var(--acid)" },
  { icon: Clock, title: "Real logistics", body: "The Bekaa run takes real time. Customers should plan for a few hours of wait after settlement.", color: "var(--magenta)" },
  { icon: Lock, title: "Simple handoff", body: "Collect after the spot is clear. No contact, no overlap, no trace.", color: "var(--amber)" },
];

const RULES = [
  "01 :: Reddit/Telegram only — no phones, no other apps.",
  "02 :: Whish settles before sourcing begins.",
  "03 :: Bekaa run = real hours. Plan accordingly.",
  "04 :: Photo proof on every drop.",
  "05 :: Pin drops only when needed.",
  "06 :: Collect ONLY after the spot is clear.",
  "07 :: Zero face-to-face. Period.",
];

export default function BottomPanels() {
  return (
    <section className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* WHY panel */}
      <TerminalFrame
        title="~/why-this-exists.md"
        badge="DOC · WHY"
        accent="var(--toxic)"
      >
        <div className="p-4 sm:p-6 md:p-7">
          <div className="mb-5 flex items-start gap-3 sm:mb-6 sm:gap-4">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center border border-[var(--toxic)]/50 bg-[var(--toxic)]/10 sm:h-14 sm:w-14">
              <Shield className="h-6 w-6 text-[var(--toxic)] sm:h-7 sm:w-7" strokeWidth={1.5} />
            </div>
            <div>
              <HudLabel>WHY/THIS_EXISTS</HudLabel>
              <h3 className="mt-1 font-display text-xl font-semibold leading-tight text-[var(--acid)] sm:text-2xl md:text-3xl">
                <DecryptedText
                  text="Built around privacy & safety."
                  animateOn="view"
                  speed={40}
                  maxIterations={15}
                  useOriginalCharsOnly={true}
                />
              </h3>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group relative border border-white/10 bg-black/40 p-3 transition hover:border-white/30 sm:p-4"
              >
                <span
                  className="absolute -top-px -left-px h-2 w-2 border-t border-l"
                  style={{ borderColor: f.color }}
                />
                <span
                  className="absolute -bottom-px -right-px h-2 w-2 border-b border-r"
                  style={{ borderColor: f.color }}
                />
                <div className="mb-2 flex items-center justify-between sm:mb-3">
                  <f.icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: f.color }} strokeWidth={1.6} />
                  <StatusDot color={f.color} />
                </div>
                <h4 className="font-display text-sm font-semibold text-white sm:text-base">
                  {f.title}
                </h4>
                <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-white/55 sm:text-[12px]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </TerminalFrame>

      {/* RULES panel */}
      <TerminalFrame
        title="~/rules.lock"
        badge="LOCK · 07 RULES"
        accent="var(--amber)"
      >
        <div className="p-4 sm:p-6 md:p-7">
          <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-4">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center border border-[var(--amber)]/50 bg-[var(--amber)]/10 sm:h-14 sm:w-14">
              <AlertOctagon className="h-6 w-6 text-[var(--amber)] sm:h-7 sm:w-7" strokeWidth={1.5} />
            </div>
            <div>
              <HudLabel>RULES.LOCK</HudLabel>
              <h3 className="mt-1 font-display text-xl font-semibold leading-tight text-[var(--amber)] sm:text-2xl md:text-3xl">
                <DecryptedText
                  text="Strict for a reason."
                  animateOn="view"
                  speed={40}
                  maxIterations={15}
                  useOriginalCharsOnly={true}
                />
              </h3>
            </div>
          </div>

          <div className="border border-[var(--amber)]/30 bg-[var(--amber)]/5 p-3 font-mono text-[11px] leading-relaxed text-[#f3d8a0] sm:p-4 sm:text-[12px]">
            <span className="text-[var(--amber)]">{"// WARN:"}</span> The protocol
            is non-negotiable. Every step exists to protect both sides. Skip a
            step and the channel terminates.
          </div>

          <div className="mt-4 sm:mt-5">
            <HudLabel>PROTOCOL.RULES</HudLabel>
            <ol className="mt-3 space-y-1.5 font-mono text-[11px] leading-relaxed sm:space-y-2 sm:text-[12px]">
              {RULES.map((r, i) => {
                const [num, ...rest] = r.split("::");
                return (
                  <li
                    key={i}
                    className="group flex items-start gap-2 border-l-2 border-[var(--amber)]/30 bg-black/30 px-2.5 py-1.5 transition hover:border-[var(--amber)] hover:bg-[var(--amber)]/5 sm:gap-3 sm:px-3 sm:py-2"
                  >
                    <span className="font-bold text-[var(--amber)]">{num.trim()}</span>
                    <span className="text-white/60">::</span>
                    <span className="text-white/80">{rest.join("::").trim()}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-white/40 sm:pt-4">
            <span className="flex items-center gap-2">
              <StatusDot color="var(--blood)" /> NON-NEGOTIABLE
            </span>
            <span>SIG: 0xDR-GREEN</span>
          </div>
        </div>
      </TerminalFrame>
    </section>
  );
}
