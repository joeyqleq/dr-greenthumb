"use client";

import { HudCorners, HudLabel, StatusDot } from "@/components/cyber/hud-frame";
import { Shield, Lock, Eye, Camera, Clock, AlertOctagon } from "lucide-react";

const FEATURES = [
  { icon: Eye, title: "Mutual anonymity", body: "No face-to-face, ever. Both parties stay completely distant throughout the whole process.", color: "var(--toxic)" },
  { icon: Camera, title: "Visual proof", body: "A photo of the exact hiding spot is sent so there is no confusion on the customer's end.", color: "var(--acid)" },
  { icon: Clock, title: "Real logistics", body: "The Bekaa run takes real time. Customers should plan for a few hours of wait after settlement.", color: "var(--magenta)" },
  { icon: Lock, title: "Simple handoff", body: "Collect after the spot is clear. No contact, no overlap, no trace.", color: "var(--amber)" },
];

const RULES = [
  "01 :: Reddit DMs only — no phones, no other apps.",
  "02 :: Whish settles before sourcing begins.",
  "03 :: Bekaa run = real hours. Plan accordingly.",
  "04 :: Photo proof on every drop.",
  "05 :: Pin drops only when needed.",
  "06 :: Collect ONLY after the spot is clear.",
  "07 :: Zero face-to-face. Period.",
];

export default function BottomPanels() {
  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* WHY panel */}
      <div className="cy-card relative overflow-hidden p-6 md:p-8">
        <HudCorners />
        <div className="mb-6 flex items-start gap-4">
          <div className="grid h-14 w-14 flex-shrink-0 place-items-center border border-[var(--toxic)]/50 bg-[var(--toxic)]/10">
            <Shield className="h-7 w-7 text-[var(--toxic)]" strokeWidth={1.5} />
          </div>
          <div>
            <HudLabel>WHY/THIS_EXISTS</HudLabel>
            <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
              Built around{" "}
              <span className="text-[var(--toxic)]">privacy</span> &amp;{" "}
              <span className="text-[var(--acid)]">safety</span>.
            </h3>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative border border-white/10 bg-black/40 p-4 transition hover:border-white/30"
            >
              <span
                className="absolute -top-px -left-px h-2 w-2 border-t border-l"
                style={{ borderColor: f.color }}
              />
              <span
                className="absolute -bottom-px -right-px h-2 w-2 border-b border-r"
                style={{ borderColor: f.color }}
              />
              <div className="mb-3 flex items-center justify-between">
                <f.icon className="h-5 w-5" style={{ color: f.color }} strokeWidth={1.6} />
                <StatusDot color={f.color} />
              </div>
              <h4 className="font-display text-base font-semibold text-white">
                {f.title}
              </h4>
              <p className="mt-1.5 font-mono text-[12px] leading-relaxed text-white/55">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RULES panel */}
      <div className="cy-card relative overflow-hidden p-6 md:p-8">
        <HudCorners />
        <div className="mb-5 flex items-start gap-4">
          <div className="grid h-14 w-14 flex-shrink-0 place-items-center border border-[var(--amber)]/50 bg-[var(--amber)]/10">
            <AlertOctagon className="h-7 w-7 text-[var(--amber)]" strokeWidth={1.5} />
          </div>
          <div>
            <HudLabel>RULES.LOCK</HudLabel>
            <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
              Strict <span className="text-[var(--amber)]">for a reason</span>.
            </h3>
          </div>
        </div>

        <div className="border border-[var(--amber)]/30 bg-[var(--amber)]/5 p-4 font-mono text-[12px] leading-relaxed text-[#f3d8a0]">
          <span className="text-[var(--amber)]">{"// WARN:"}</span> The protocol
          is non-negotiable. Every step exists to protect both sides. Skip a
          step and the channel terminates.
        </div>

        <div className="mt-5">
          <HudLabel>PROTOCOL.RULES</HudLabel>
          <ol className="mt-3 space-y-2 font-mono text-[12px] leading-relaxed">
            {RULES.map((r, i) => {
              const [num, ...rest] = r.split("::");
              return (
                <li
                  key={i}
                  className="group flex items-start gap-3 border-l-2 border-[var(--amber)]/30 bg-black/30 px-3 py-2 transition hover:border-[var(--amber)] hover:bg-[var(--amber)]/5"
                >
                  <span className="font-bold text-[var(--amber)]">{num.trim()}</span>
                  <span className="text-white/60">::</span>
                  <span className="text-white/80">{rest.join("::").trim()}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] text-white/40">
          <span className="flex items-center gap-2">
            <StatusDot color="var(--blood)" /> NON-NEGOTIABLE
          </span>
          <span>SIG: 0xDR-GREEN</span>
        </div>
      </div>
    </section>
  );
}
