"use client";

import Image from "next/image";
import { ReactNode } from "react";
import DecryptedText from "@/components/react-bits/DecryptedText";
import { HudCorners, HudLabel, StatusDot } from "@/components/cyber/hud-frame";
import { Flower2, MapPin } from "lucide-react";

type Step = {
  num: string;
  label: string;
  title: string;
  command: string;
  body: ReactNode;
  tags: string[];
  icon: ReactNode;
  color: string;
  glow: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    label: "INGRESS // SOCIAL_LAYER",
    title: "Customer pings on Reddit",
    command: "open --channel=reddit.dm --identity=null",
    body: (
      <>
        Customer messages first on Reddit. Everything is discussed there — what
        is needed, the arrangement, all comms. No phone numbers. No identity
        required. Stay remote from the very first packet.
      </>
    ),
    tags: ["REDDIT_DMS", "FULLY_REMOTE", "NO_ID"],
    icon: (
      <div className="relative h-12 w-12">
        <Image
          src="/images/reddit.png"
          alt="Reddit"
          fill
          className="object-contain"
        />
      </div>
    ),
    color: "var(--magenta)",
    glow: "rgba(255,43,214,0.4)",
  },
  {
    num: "02",
    label: "FINANCIAL // RAIL",
    title: "Settle via Whish Money",
    command: "tx --rail=whish.lb --amount=full --confirm=true",
    body: (
      <>
        Once agreed, the customer wires the full amount through{" "}
        <span className="text-[var(--acid)]">Whish Money</span> — Lebanon&apos;s
        mobile payment rail. Payment first, then the order is provisioned.{" "}
        <span className="text-[var(--blood)]">No tx → no order.</span>
      </>
    ),
    tags: ["PAY_FIRST", "RECEIPT_VERIFIED", "NO_REFUNDS"],
    icon: (
      <div className="relative h-12 w-12 overflow-hidden rounded-sm">
        <Image
          src="/images/whish.webp"
          alt="Whish Money"
          fill
          className="object-cover"
        />
      </div>
    ),
    color: "var(--blood)",
    glow: "rgba(255,51,85,0.4)",
  },
  {
    num: "03",
    label: "LOGISTICS // BEKAA_RUN",
    title: "Bekaa pickup run",
    command: "exec --route=bekaa --grade=AAA --eta=180m",
    body: (
      <>
        After the rail confirms, sourcing begins. Product comes from the{" "}
        <span className="text-[var(--acid)]">Bekaa region</span> — the finest
        grade available. Round trip takes a few hours. Customer plans for the
        wait.
      </>
    ),
    tags: ["BEKAA_LB", "AAA_GRADE", "ETA_HOURS"],
    icon: (
      <Flower2 className="h-10 w-10 text-[var(--acid)]" strokeWidth={1.5} />
    ),
    color: "var(--acid)",
    glow: "rgba(198,255,58,0.4)",
  },
  {
    num: "04",
    label: "DELIVERY // STASH_DROP",
    title: "Secluded hidden drop-off",
    command: "drop --geo=secluded --photo=true --pin=optional",
    body: (
      <>
        On return, a private easy-to-find spot nearby is selected. Product is
        stashed. A photo is sent for visual confirmation. Google Maps pin is
        dropped if needed. Customer collects after the area is{" "}
        <span className="text-[var(--toxic)]">fully clear</span>.
      </>
    ),
    tags: ["HIDDEN_STASH", "PHOTO_PROOF", "PIN_DROP"],
    icon: (
      <MapPin className="h-10 w-10 text-[var(--toxic)]" strokeWidth={1.5} />
    ),
    color: "var(--toxic)",
    glow: "rgba(0,255,163,0.4)",
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const isReverse = index % 2 === 1;
  return (
    <div className="relative grid grid-cols-[44px_1fr] gap-4 md:grid-cols-[80px_1fr] md:gap-6">
      {/* left rail */}
      <div className="flex flex-col items-center">
        <div
          className="relative grid h-11 w-11 place-items-center border-2 font-mono text-sm font-bold md:h-14 md:w-14 md:text-base"
          style={{ borderColor: step.color, color: step.color, boxShadow: `0 0 20px -2px ${step.glow}` }}
        >
          {step.num}
          <span className="absolute -inset-1 border border-dashed opacity-40" style={{ borderColor: step.color }} />
        </div>
        <div className="cy-connector-v mt-2 flex-1" style={{ ["--acid" as string]: step.color }} />
      </div>

      {/* card */}
      <div
        className="cy-card group relative mb-10 px-5 py-6 md:px-8 md:py-8"
        style={{ borderColor: `${step.color}33` }}
      >
        <HudCorners />
        {/* faint corner ID */}
        <div className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.3em] text-white/25">
          NODE-{step.num}
        </div>

        {/* command line */}
        <div className="mb-5 flex items-center gap-2 border-b border-white/5 pb-3 font-mono text-[11px] md:text-xs">
          <span style={{ color: step.color }}>$</span>
          <DecryptedText
            text={step.command}
            animateOn="view"
            speed={32}
            maxIterations={10}
            className="text-white/70"
            encryptedClassName="text-white/25"
          />
        </div>

        <div className={`flex flex-col gap-5 md:flex-row md:items-start ${isReverse ? "md:flex-row-reverse" : ""}`}>
          {/* icon block */}
          <div className="flex flex-shrink-0 items-center gap-4">
            <div
              className="relative grid h-20 w-20 place-items-center border bg-black/60"
              style={{ borderColor: `${step.color}55` }}
            >
              <span className="absolute inset-1 border opacity-30" style={{ borderColor: step.color }} />
              {step.icon}
            </div>
          </div>

          <div className="flex-1">
            <HudLabel>
              <span style={{ color: step.color }}>{step.label}</span>
            </HudLabel>
            <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
              {step.title}
            </h3>
            <p className="mt-3 font-mono text-[13px] leading-relaxed text-white/65 md:text-sm">
              {step.body}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {step.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]"
                  style={{ borderColor: `${step.color}55`, color: step.color, background: `${step.color}10` }}
                >
                  <span className="h-1 w-1" style={{ background: step.color }} />
                  {t}
                </span>
              ))}
            </div>

            {/* tiny telemetry per node */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] text-white/40">
              <span><span className="text-white/30">PKT:</span> 0x{(parseInt(step.num) * 1337).toString(16).toUpperCase()}</span>
              <span><span className="text-white/30">HASH:</span> {step.num}a4f{step.num}c2{step.num}9d</span>
              <span className="flex items-center gap-1.5"><StatusDot color={step.color} /> READY</span>
            </div>
          </div>
        </div>

        {/* sweeping shimmer */}
        <div
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-1000 group-hover:translate-x-full"
        />
      </div>
    </div>
  );
}

export default function StepsFlow() {
  return (
    <section className="relative mt-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <HudLabel>
            <StatusDot color="var(--acid)" /> <span className="ml-2">SEQUENCE.MAP</span>
          </HudLabel>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Four nodes. <span className="text-[var(--acid)]">One handshake.</span>
          </h2>
        </div>
        <div className="hidden font-mono text-[10px] text-white/40 md:block">
          [{STEPS.length}/{STEPS.length}] NODES SYNCED
        </div>
      </div>

      <div>
        {STEPS.map((s, i) => (
          <StepCard key={s.num} step={s} index={i} />
        ))}
      </div>
    </section>
  );
}
