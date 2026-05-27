"use client";

const TICKS = [
  "PROTOCOL/v4.2",
  "NODE: bekaa-01",
  "PAYLOAD: encrypted",
  "RTT: ~03:30:00",
  "HANDSHAKE: reddit.dm",
  "RAIL: whish.lb",
  "SIG: 0xDR-GREEN",
  "TRACE: zero",
  "TLS: pinned",
  "CHANNEL: anonymous",
];

export default function Ticker() {
  const stream = [...TICKS, ...TICKS, ...TICKS];
  return (
    <div className="border-y border-[var(--acid)]/20 bg-black/40 backdrop-blur-sm">
      <div className="overflow-hidden">
        <div className="cy-marquee flex whitespace-nowrap py-2 font-mono text-[11px] tracking-[0.3em] text-[var(--acid)]/80">
          {stream.map((t, i) => (
            <span key={i} className="px-6">
              <span className="text-[var(--magenta)]">▣</span>{" "}
              <span className="text-white/40">[{String(i).padStart(3, "0")}]</span>{" "}
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
