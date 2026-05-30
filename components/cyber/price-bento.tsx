"use client";

import MagicBento, { type BentoCardProps } from "@/components/react-bits/MagicBento";
import TerminalFrame from "@/components/cyber/terminal-frame";
import Shuffle from "@/components/react-bits/Shuffle";
import { Send } from "lucide-react";
import { HudLabel, StatusDot } from "@/components/cyber/hud-frame";

const PRICES: BentoCardProps[] = [
  { color: "#0d1014", label: "// SKU_01", title: "Hash / Bezre", description: "2026 harvest — Yammouneh, Bekaa Valley", weight: "30 g", price: "$50" },
  { color: "#0d1014", label: "// SKU_02", title: "Bubble Hash", description: "Weed Resin Extract — Bekaa Valley", weight: "30 g", price: "$60" },
  { color: "#0d1014", label: "// SKU_03", title: "Weed / Marie", description: "2026 harvest — Yammouneh, Bekaa Valley", weight: "20 g", price: "$100" },
  { color: "#0d1014", label: "// SKU_04", title: "Coke (90% Pure)", description: "90% Pure Bolivian Cocaine Hydrochloride", weight: "0.5 g", price: "$100" },
  { color: "#0d1014", label: "// SKU_05", title: "Freebase Cocaine (Bazz)", description: "90% Pure Bolivian Freebase Cocaine Hydrochloride", weight: "0.5 g", price: "$100" },
  { color: "#0d1014", label: "// SKU_06", title: "Crystal Meth", description: "Imported", weight: "1 g", price: "$60" },
  { color: "#0d1014", label: "// SKU_07", title: "Other products available on demand", description: "Limited drop", weight: "—", price: "" },
];

export default function PriceBento() {
  return (
    <section id="catalog" className="relative border-t border-white/5 bg-[var(--ink)]/40 py-24 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 cy-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* heading */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <HudLabel>// CATALOG.LIVE</HudLabel>
            <h2 className="mt-3 cy-chrome font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-white">
              <Shuffle
                text="PRICE"
                shuffleDirection="right"
                duration={0.2}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="back.out(1.1)"
                stagger={0.01}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover
                respectReducedMotion={true}
                loop
                loopDelay={0.4}
                tag="span"
                className="block"
                style={{ textAlign: "left" }}
              />
              <Shuffle
                text="MANIFEST."
                shuffleDirection="right"
                duration={0.2}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="back.out(1.1)"
                stagger={0.01}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover
                respectReducedMotion={true}
                loop
                loopDelay={0.4}
                tag="span"
                className="block bg-gradient-to-r from-[var(--acid)] to-[var(--magenta)] bg-clip-text text-transparent"
                style={{ textAlign: "left" }}
              />
            </h2>
            <p className="mt-4 max-w-xl font-mono text-sm text-white/55">
              Vacuum-sealed at source. Quoted in USD, settled in LBP at the day&apos;s rate via Whish. Hover any tile to ping the spotlight.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[11px] text-white/55">
            <span className="flex items-center gap-2">
              <StatusDot color="var(--acid)" /> 7 SKU live · more on request
            </span>
            <span className="flex items-center gap-2">
              <StatusDot color="var(--amber)" /> Bigger orders → freebies, never discounts
            </span>
            <span className="flex items-center gap-2">
              <StatusDot color="var(--toxic)" /> Vacuum-sealed from source
            </span>
          </div>
        </div>

        {/* the bento itself */}
        <div className="cy-bento-wrap relative cy-bracket p-2">
          <MagicBento
            items={PRICES}
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            clickEffect
            enableMagnetism
            spotlightRadius={340}
            particleCount={10}
            glowColor="198, 255, 58"
          />
        </div>

        {/* footer / contact */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TerminalFrame title="~/freebie.policy" accent="var(--acid)">
            <div className="p-4 sm:p-5">
              <HudLabel>// FREEBIE.POLICY</HudLabel>
              <p className="mt-3 font-mono text-[12px] leading-relaxed text-white/75 sm:text-[13px]">
                Volume = <span className="text-[var(--acid)]">samples</span>, not slashed prices. We protect floor pricing for everyone in the network.
              </p>
            </div>
          </TerminalFrame>

          <TerminalFrame title="~/packaging.spec" accent="var(--toxic)">
            <div className="p-4 sm:p-5">
              <HudLabel>// PACKAGING</HudLabel>
              <p className="mt-3 font-mono text-[12px] leading-relaxed text-white/75 sm:text-[13px]">
                Every gram leaves the source <span className="text-[var(--toxic)]">vacuum-sealed</span>. Tamper evident. Smell-tight. No re-bagging in transit.
              </p>
            </div>
          </TerminalFrame>

          <a
            href="https://www.reddit.com/user/joeyleq"
            target="_blank"
            rel="noopener noreferrer"
            className="group block transition hover:translate-y-[-2px]"
          >
            <TerminalFrame title="~/contact.reddit" accent="var(--magenta)" badge="OPEN">
              <div className="p-4 sm:p-5">
                <HudLabel>// REDDIT</HudLabel>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-sm bg-[#FF4500]/15 ring-1 ring-[#FF4500]/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/reddit.png" alt="Reddit" className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="font-mono text-[11px] text-white/45">REDDIT.PRIVATE_MSG</div>
                    <div className="font-display text-base font-semibold text-white group-hover:text-[var(--magenta)] sm:text-lg">
                      u/joeyleq
                    </div>
                  </div>
                  <span className="ml-auto font-mono text-[var(--acid)] transition group-hover:translate-x-1">→</span>
                </div>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-white/50">
                  Other SKUs and prices on demand. Encrypted DM only.
                </p>
              </div>
            </TerminalFrame>
          </a>

          <a
            href="https://t.me/drgreenthumb"
            target="_blank"
            rel="noopener noreferrer"
            className="group block transition hover:translate-y-[-2px]"
          >
            <TerminalFrame title="~/contact.tele" accent="#0088cc" badge="OPEN">
              <div className="p-4 sm:p-5">
                <HudLabel>// TELEGRAM</HudLabel>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-sm bg-[#0088cc]/15 ring-1 ring-[#0088cc]/40">
                    <Send className="h-5 w-5 text-[#0088cc]" />
                  </span>
                  <div>
                    <div className="font-mono text-[11px] text-white/45">SECURE_MSG</div>
                    <div className="font-display text-base font-semibold text-white group-hover:text-[#0088cc] sm:text-lg">
                      @drgreenthumb
                    </div>
                  </div>
                  <span className="ml-auto font-mono text-[var(--acid)] transition group-hover:translate-x-1">→</span>
                </div>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-white/50">
                  Fastest response. Ensure your phone number is hidden.
                </p>
              </div>
            </TerminalFrame>
          </a>
        </div>
      </div>
    </section>
  );
}
