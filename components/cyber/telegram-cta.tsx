"use client";

import { useState } from "react";

export default function TelegramCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 md:px-6">
        <button
          onClick={() => setOpen(true)}
          className="group flex w-full items-center gap-4 border border-sky-500/20 bg-sky-500/5 px-5 py-4 font-mono text-[12px] transition hover:border-sky-500/40 hover:bg-sky-500/10 sm:text-[13px]"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-sky-500/30 bg-sky-500/10 text-sky-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.928l-2.95-.924c-.64-.203-.652-.64.136-.954l11.52-4.441c.537-.194 1.006.131.928.612z" />
            </svg>
          </span>
          <div className="text-left">
            <div className="text-sky-300">REACH ME ON TELEGRAM</div>
            <div className="mt-0.5 text-[10px] text-white/40">scan QR code to add directly — click to view</div>
          </div>
          <span className="ml-auto font-mono text-[11px] text-sky-400/60 transition group-hover:text-sky-400">
            SCAN →
          </span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative mx-4 max-w-sm w-full border border-sky-500/30 bg-[#0b0e14] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between font-mono text-[11px] text-white/50">
              <span className="text-sky-400/80 uppercase tracking-[0.2em]">// telegram.qr</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/30 hover:text-white/70 transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <img
              src="/telegram.png"
              alt="Telegram QR Code"
              className="w-full h-auto"
            />
            <p className="mt-4 text-center font-mono text-[11px] text-white/40">
              scan to open Telegram chat directly
            </p>
          </div>
        </div>
      )}
    </>
  );
}
