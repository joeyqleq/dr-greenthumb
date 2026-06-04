"use client";

import DitherCard from "@/components/ui/dither-card";
import TerminalFrame from "@/components/cyber/terminal-frame";
import Shuffle from "@/components/react-bits/Shuffle";
import { Send } from "lucide-react";
import { HudLabel, StatusDot } from "@/components/cyber/hud-frame";
import { useState } from "react";

const PRICES = [
  { color: "var(--toxic)", label: "// SKU_01", title: "Hash / Bezre", description: "2026 harvest — Yammouneh, Bekaa Valley", weight: "30 g", price: "$50", image: "/images/hash.jpeg" },
  { color: "var(--acid)", label: "// SKU_02", title: "Bubble Hash", description: "Weed Resin Extract — Bekaa Valley", weight: "30 g", price: "$60", image: "/images/bubble_hash.png" },
  { color: "var(--magenta)", label: "// SKU_03", title: "Weed / Marie", description: "2026 harvest — Yammouneh, Bekaa Valley", weight: "20 g", price: "$100", image: "/images/weed_buds.jpg" },
  { color: "#00E8ED", label: "// SKU_04", title: "Coke (90% Pure)", description: "90% Pure Bolivian Cocaine Hydrochloride", weight: "0.5 g", price: "$100", image: "/images/cocaine.jpg" },
  { color: "#FFD800", label: "// SKU_05", title: "Freebase Cocaine (Bazz)", description: "90% Pure Bolivian Freebase Cocaine Hydrochloride", weight: "0.5 g", price: "$100", image: "/images/freebase.jpg" },
  { color: "var(--amber)", label: "// SKU_06", title: "Crystal Meth", description: "Imported", weight: "1 g", price: "$60", image: "/images/crystal.jpg" },
  { color: "#FF4500", label: "// SKU_07", title: "Buprenorphine", description: "Sublingual tablets", weight: "8 mg", price: "$25", image: "/images/bup.png" },
  { color: "#8A2BE2", label: "// SKU_08", title: "Ketamine", description: "Liquid Vial", weight: "1 vial", price: "TBD", image: "/images/ketamine.jpg" },
  { color: "#888888", label: "// SKU_09", title: "Available on demand", description: "Limited drop", weight: "—", price: "TBD", isCustomExplainer: true },
];

export default function PriceBento() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <section id="catalog" className="relative border-t border-white/5 bg-[var(--ink)]/40 py-24 backdrop-blur-sm">
      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-h-full max-w-full">
            <img 
              src={expandedImage} 
              alt="Expanded" 
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl border border-white/10" 
            />
            <button 
              className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--acid)] text-black font-bold hover:scale-110 transition-transform"
              onClick={() => setExpandedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
        <div className="relative mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PRICES.map((item, i) => (
            <DitherCard key={i} {...item} onImageClick={() => item.image && setExpandedImage(item.image)} />
          ))}
        </div>

        {/* footer / contact */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

          <TerminalFrame title="~/contact.exec" accent="var(--magenta)" badge="OPEN">
            <div className="p-4 sm:p-5">
              <HudLabel>// PRIVATE CHAT</HudLabel>
              <div className="mt-3 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-sm bg-[var(--magenta)]/15 ring-1 ring-[var(--magenta)]/40">
                  <span className="text-[var(--magenta)] text-xl font-bold">#</span>
                </span>
                <div>
                  <div className="font-mono text-[11px] text-white/45">SECURE_SERVER</div>
                  <div className="font-display text-base font-semibold text-white sm:text-lg">
                    Invite Only
                  </div>
                </div>
              </div>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-white/50">
                Once payment is sent, you receive an invite link to my self-hosted private chat server. Join anonymously and we can chat there.
              </p>
            </div>
          </TerminalFrame>
        </div>
      </div>
    </section>
  );
}
