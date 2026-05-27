"use client";

import MagicBento, { type BentoCardProps } from "@/components/react-bits/MagicBento";
import { HudLabel, StatusDot } from "@/components/cyber/hud-frame";

const PRICES: BentoCardProps[] = [
  { color: "#0d1014", label: "// SKU_01", title: "xxx", description: "Indoor cured · top shelf", weight: "30 g", price: "$50" },
  { color: "#0d1014", label: "// SKU_02", title: "xxx", description: "Premium hybrid", weight: "30 g", price: "$60" },
  { color: "#0d1014", label: "// SKU_03", title: "xxx", description: "Hand-trimmed reserve", weight: "20 g", price: "$100" },
  { color: "#0d1014", label: "// SKU_04", title: "xxx", description: "Concentrate · solventless", weight: "0.5 g", price: "$120" },
  { color: "#0d1014", label: "// SKU_05", title: "xxx", description: "Concentrate · live", weight: "0.5 g", price: "$120" },
  { color: "#0d1014", label: "// SKU_06", title: "xxx", description: "Limited drop", weight: "0.7 g", price: "$60" },
];

export default function PriceBento() {
  return (
    <section id="catalog" className="relative border-t border-white/5 bg-[var(--ink)] py-24">
      <div className="pointer-events-none absolute inset-0 cy-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* heading */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <HudLabel>// CATALOG.LIVE</HudLabel>
            <h2 className="mt-3 cy-chrome font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-white">
              <span className="block">PRICE</span>
              <span className="block bg-gradient-to-r from-[var(--acid)] to-[var(--magenta)] bg-clip-text text-transparent">
                MANIFEST.
              </span>
            </h2>
            <p className="mt-4 max-w-xl font-mono text-sm text-white/55">
              Vacuum-sealed at source. Quoted in USD, settled in LBP at the day&apos;s rate via Whish. Hover any tile to ping the spotlight.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[11px] text-white/55">
            <span className="flex items-center gap-2">
              <StatusDot color="var(--acid)" /> 6 SKU live · more on request
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
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="cy-card relative p-5">
            <HudLabel>// FREEBIE.POLICY</HudLabel>
            <p className="mt-3 font-mono text-[13px] leading-relaxed text-white/75">
              Volume = <span className="text-[var(--acid)]">samples</span>, not slashed prices. We protect floor pricing for everyone in the network.
            </p>
          </div>

          <div className="cy-card relative p-5">
            <HudLabel>// PACKAGING</HudLabel>
            <p className="mt-3 font-mono text-[13px] leading-relaxed text-white/75">
              Every gram leaves the source <span className="text-[var(--toxic)]">vacuum-sealed</span>. Tamper evident. Smell-tight. No re-bagging in transit.
            </p>
          </div>

          <a
            href="https://www.reddit.com/user/joeyleq"
            target="_blank"
            rel="noopener noreferrer"
            className="cy-card group relative flex flex-col justify-between p-5 transition hover:border-[var(--magenta)]/60"
          >
            <HudLabel>// CONTACT.HANDLE</HudLabel>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-sm bg-[#FF4500]/15 ring-1 ring-[#FF4500]/40">
                {/* Reddit mark */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/reddit.png" alt="Reddit" className="h-6 w-6" />
              </span>
              <div>
                <div className="font-mono text-[11px] text-white/45">REDDIT.PRIVATE_MSG</div>
                <div className="font-display text-lg font-semibold text-white group-hover:text-[var(--magenta)]">
                  u/joeyleq
                </div>
              </div>
              <span className="ml-auto font-mono text-[var(--acid)] transition group-hover:translate-x-1">→</span>
            </div>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-white/50">
              Other SKUs (xxx, xxx, xxx) and prices on demand. Encrypted DM only.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
