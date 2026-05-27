import Ticker from "@/components/cyber/ticker";
import Hero from "@/components/cyber/hero";
import StepsFlow from "@/components/cyber/steps-flow";
import BottomPanels from "@/components/cyber/bottom-panels";
import PriceBento from "@/components/cyber/price-bento";
import PixelBlastBg from "@/components/cyber/pixel-blast-bg";
import { StatusDot } from "@/components/cyber/hud-frame";
import { Leaf } from "lucide-react";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <PixelBlastBg />

      {/* fixed faint noise */}
      <div className="cy-noise pointer-events-none fixed inset-0 z-[1] opacity-20" aria-hidden="true" />

      {/* TOP NAV */}
      <header className="relative z-10 border-b border-[var(--acid)]/15 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative grid h-9 w-9 place-items-center border border-[var(--acid)] bg-[var(--acid)]/10">
              <Leaf className="h-5 w-5 text-[var(--acid)]" strokeWidth={2} />
              <span className="absolute -inset-1 border border-[var(--acid)]/30" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-bold tracking-tight text-white">
                DR. GREENTHUMB<span className="text-[var(--acid)]">_</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                {"//"} private.drop.protocol
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-6 font-mono text-[11px] text-white/50 md:flex">
            <span className="flex items-center gap-2">
              <StatusDot /> <span className="text-[var(--toxic)]">ONLINE</span>
            </span>
            <span>BEKAA / LB</span>
            <span className="text-white/30">|</span>
            <span>v4.2.1</span>
          </div>
        </div>
      </header>

      <Ticker />

      {/* HERO — fits one viewport with even margins */}
      <section className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-4 py-4 md:px-6 md:py-6"
        style={{ minHeight: "calc(100svh - 110px)" }}>
        <div className="w-full">
          <Hero />
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-16">
        <StepsFlow />
        <BottomPanels />
      </div>

      <PriceBento />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 md:px-6">
        <footer className="mt-14 border-t border-[var(--acid)]/15 pt-6 font-mono text-[11px] text-white/40">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <StatusDot color="var(--acid)" />
              <span>
                {"//"} session ends after handoff. logs purge in{" "}
                <span className="text-[var(--acid)]">00:14:33</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>DR.GREENTHUMB</span>
              <span className="text-white/20">·</span>
              <span>BEKAA → DROP</span>
              <span className="text-white/20">·</span>
              <span className="text-[var(--magenta)]">END_OF_FEED</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
