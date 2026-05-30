"use client";

import Image from "next/image";
import { ReactNode } from "react";
import DecryptedText from "@/components/react-bits/DecryptedText";
import LetterGlitch from "@/components/react-bits/LetterGlitch";
import Shuffle from "@/components/react-bits/Shuffle";
import { HudLabel, StatusDot } from "@/components/cyber/hud-frame";
import TerminalFrame from "@/components/cyber/terminal-frame";
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
  termTitle: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    label: "INGRESS // SOCIAL_LAYER",
    title: "Customer pings on Reddit or Telegram",
    command: "open --channel=secure.dm",
    body: (
      <>
        Customer messages first on Reddit or Telegram. Everything is discussed there — what
        is needed, the arrangement, all comms. No phone numbers. No identity
        required. Stay remote from the very first packet.
      </>
    ),
    tags: ["SECURE_DMS", "FULLY_REMOTE", "NO_ID"],
    icon: (
      <div className="relative h-9 w-9 sm:h-12 sm:w-12">
        <Image src="/images/reddit.png" alt="Reddit" fill className="object-contain" />
      </div>
    ),
    color: "var(--magenta)",
    glow: "rgba(255,43,214,0.4)",
    termTitle: "secure.dm",
  },
  {
    num: "02",
    label: "FINANCIAL // RAIL",
    title: "Settle via Whish Money",
    command: "tx --rail=whish.lb --confirm",
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
      <div className="relative h-9 w-9 overflow-hidden sm:h-12 sm:w-12">
        <Image src="/images/whish.webp" alt="Whish Money" fill className="object-cover" />
      </div>
    ),
    color: "var(--blood)",
    glow: "rgba(255,51,85,0.4)",
    termTitle: "whish.lb",
  },
  {
    num: "03",
    label: "LOGISTICS // BEKAA_RUN",
    title: "Bekaa pickup run",
    command: "exec --route=bekaa --grade=AAA",
    body: (
      <>
        After the rail confirms, sourcing begins. Product comes from the{" "}
        <span className="text-[var(--acid)]">Bekaa region</span> — the finest
        grade available. Round trip takes a few hours. Customer plans for the
        wait.
      </>
    ),
    tags: ["BEKAA_LB", "AAA_GRADE", "ETA_HOURS"],
    icon: <Flower2 className="h-8 w-8 text-[var(--acid)] sm:h-10 sm:w-10" strokeWidth={1.5} />,
    color: "var(--acid)",
    glow: "rgba(198,255,58,0.4)",
    termTitle: "logistics.run",
  },
  {
    num: "04",
    label: "DELIVERY // STASH_DROP",
    title: "Secluded hidden drop-off",
    command: "drop --geo=secluded --photo=true",
    body: (
      <>
        On return, a private easy-to-find spot nearby is selected. Product is
        stashed. A photo is sent for visual confirmation. Google Maps pin is
        dropped if needed. Customer collects after the area is{" "}
        <span className="text-[var(--toxic)]">fully clear</span>.
      </>
    ),
    tags: ["HIDDEN_STASH", "PHOTO_PROOF", "PIN_DROP"],
    icon: <MapPin className="h-8 w-8 text-[var(--toxic)] sm:h-10 sm:w-10" strokeWidth={1.5} />,
    color: "var(--toxic)",
    glow: "rgba(0,255,163,0.4)",
    termTitle: "drop.exec",
  },
];

function NodeBadge({ num, color, glow, size = "md" }: { num: string; color: string; glow: string; size?: "sm" | "md" }) {
  const dims =
    size === "sm"
      ? "h-7 w-7 text-[10px]"
      : "h-11 w-11 text-sm md:h-14 md:w-14 md:text-base";
  return (
    <div
      className={`relative grid ${dims} place-items-center border-2 bg-[var(--ink)] font-mono font-bold`}
      style={{ borderColor: color, color, boxShadow: `0 0 20px -2px ${glow}` }}
    >
      {num}
      <span className="absolute -inset-1 border border-dashed opacity-40" style={{ borderColor: color }} />
    </div>
  );
}

function StepCard({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <div className="relative">
      {/* MOBILE: number badge sits above each card, centered, with vertical connector below */}
      <div className="flex flex-col items-center md:hidden">
        <NodeBadge num={step.num} color={step.color} glow={step.glow} size="sm" />
        <div className="mt-3 w-full">
          <CardBody step={step} compact />
        </div>
        {!isLast && (
          <div
            aria-hidden="true"
            className="my-3 h-10 w-[2px]"
            style={{
              backgroundImage: `linear-gradient(180deg, ${step.color} 0 6px, transparent 6px 14px)`,
              backgroundSize: "2px 14px",
              backgroundRepeat: "repeat-y",
              animation: "cy-flow-v 1.4s linear infinite",
            }}
          />
        )}
      </div>

      {/* DESKTOP: left rail with connector + card */}
      <div className="hidden md:grid md:grid-cols-[80px_1fr] md:gap-6">
        <div className="relative flex flex-col items-center">
          <NodeBadge num={step.num} color={step.color} glow={step.glow} />
          {!isLast && (
            <div
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 top-14 bottom-0 w-[2px]"
              style={{
                backgroundImage: `linear-gradient(180deg, ${step.color} 0 10px, transparent 10px 22px)`,
                backgroundSize: "2px 22px",
                backgroundRepeat: "repeat-y",
                animation: "cy-flow-v 1.4s linear infinite",
              }}
            />
          )}
        </div>
        <div className="mb-10">
          <CardBody step={step} />
        </div>
      </div>
    </div>
  );
}

function CardBody({ step, compact = false }: { step: Step; compact?: boolean }) {
  return (
    <TerminalFrame
      title={step.termTitle}
      badge={`NODE-${step.num}`}
      accent={step.color}
    >
      <div className="relative overflow-hidden">
        {/* LetterGlitch Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            glitchColors={["var(--acid)", "var(--toxic)", "var(--magenta)"]}
          />
        </div>

        <div className={`relative z-10 ${compact ? "px-3 py-4" : "px-4 py-5 sm:px-5 sm:py-6 md:px-7 md:py-7"}`}>
          {/* command line */}
          <div className={`mb-3 flex items-center gap-2 overflow-x-auto border-b border-white/5 pb-2 font-mono text-[10px] sm:mb-4 sm:pb-3 sm:text-[11px] md:text-xs ${compact ? "" : ""}`}>
            <span style={{ color: step.color }}>$</span>
            <DecryptedText
              text={step.command}
              animateOn="view"
              speed={32}
              maxIterations={10}
              className="whitespace-nowrap text-white/70"
              encryptedClassName="text-white/25"
            />
          </div>

          <div className={`flex flex-col gap-3 sm:gap-4 ${compact ? "" : "md:flex-row md:items-start md:gap-5"}`}>
            {/* icon block */}
            <div className="flex flex-shrink-0 items-center gap-3">
              <div
                className={`relative grid place-items-center border bg-black/60 ${
                  compact ? "h-12 w-12" : "h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
                }`}
                style={{ borderColor: `${step.color}55` }}
              >
                <span className="absolute inset-1 border opacity-30" style={{ borderColor: step.color }} />
                {step.icon}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <HudLabel>
                <span className="break-words" style={{ color: step.color }}>{step.label}</span>
              </HudLabel>
              <h3
                className={`mt-1 font-display font-semibold leading-tight text-white break-words ${
                  compact ? "text-lg" : "text-xl sm:text-2xl md:text-3xl"
                }`}
              >
                <DecryptedText
                  text={step.title}
                  animateOn="inViewHover"
                  speed={40}
                  maxIterations={12}
                  className="text-white"
                  encryptedClassName="text-white/30"
                  useOriginalCharsOnly={true}
                />
              </h3>
              <p
                className={`mt-2 font-mono leading-relaxed text-white/65 ${
                  compact ? "text-[12px]" : "text-[12px] sm:mt-3 sm:text-[13px] md:text-sm"
                }`}
              >
                {step.body}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {step.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex max-w-full items-center gap-1.5 break-all border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.18em]"
                    style={{ borderColor: `${step.color}55`, color: step.color, background: `${step.color}10` }}
                  >
                    <span className="h-1 w-1 flex-shrink-0" style={{ background: step.color }} />
                    {t}
                  </span>
                ))}
              </div>

              {/* telemetry — wraps cleanly */}
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] text-white/40 sm:mt-4 sm:gap-x-6 sm:text-[10px]">
                <span><span className="text-white/30">PKT:</span> 0x{(parseInt(step.num) * 1337).toString(16).toUpperCase()}</span>
                <span><span className="text-white/30">HASH:</span> {step.num}a4f{step.num}c2</span>
                <span className="flex items-center gap-1.5"><StatusDot color={step.color} /> READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TerminalFrame>
  );
}

export default function StepsFlow() {
  return (
    <section className="relative mt-8 sm:mt-10">
      <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <HudLabel>
            <StatusDot color="var(--acid)" /> <span className="ml-2">SEQUENCE.MAP</span>
          </HudLabel>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            <Shuffle
              text="Four nodes."
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
              className="inline-block"
              style={{ textAlign: "left" }}
            />
            {" "}
            <Shuffle
              text="One handshake."
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
              className="inline-block text-[var(--acid)]"
              style={{ textAlign: "left" }}
            />
          </h2>
        </div>
        <div className="font-mono text-[10px] text-white/40">
          [{STEPS.length}/{STEPS.length}] NODES SYNCED
        </div>
      </div>

      <div>
        {STEPS.map((s, i) => (
          <StepCard key={s.num} step={s} isLast={i === STEPS.length - 1} />
        ))}
      </div>
    </section>
  );
}
