"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@/components/ui/terminal";
import { cn } from "@/lib/utils";
import VirtualKeyboard from "@/components/ui/virtual-keyboard";

const BOOT_COMMANDS = [
  "boot --rom dgt-vault --cold",
  "calibrate crt --phosphor green",
  "mount /dev/tty0 /vault",
  "link --peripheral kbd-60 --clicks on",
  "auth --token",
];
const BOOT_OUTPUTS: Record<number, string[]> = {
  0: [
    "MEMORY TEST 0000-7FFF .......... OK",
    "DRUM CLOCK 60HZ ................ LOCKED",
    "VACUUM TRACE ................... WARM",
  ],
  1: [
    "RASTER BLOOM ................... 92%",
    "SCANLINE PHASE ................. ++--++--",
    "GHOST IMAGE PURGE .............. COMPLETE",
  ],
  2: [
    "CARRIER DETECTED ON LINE 04",
    "VAULT RELAY: BEKAA/NODE-7",
    "PAPER TAPE HASH: 4F:9B:2E:1A:7C:88",
  ],
  3: [
    "PERIPHERAL HANDSHAKE: KBD-60",
    "SWITCH NOISE GATE: ARMED",
    "KEYBED NOW MIRRORS TERMINAL INPUT",
  ],
  4: [
    "[!] AUTHORIZED CLIENTS ONLY",
    "[?] AWAITING TOKEN ...",
  ],
};

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetHash, setTargetHash] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showCable, setShowCable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isUnlocked = false;
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        isUnlocked = window.sessionStorage.getItem("dgt.gate") === "ok";
      }
    } catch (e) {
      console.warn("sessionStorage not accessible:", e);
    }

    setMounted(true);

    if (isUnlocked) {
      setUnlocked(true);
      return;
    }

    setTargetHash("ready");

    const keyboardTimer = setTimeout(() => setShowKeyboard(true), 2100);
    const cableTimer = setTimeout(() => setShowCable(true), 3000);
    const promptTimer = setTimeout(() => setShowInput(true), 7600);
    return () => {
      clearTimeout(keyboardTimer);
      clearTimeout(cableTimer);
      clearTimeout(promptTimer);
    };
  }, []);

  useEffect(() => {
    if (showInput && inputRef.current) inputRef.current.focus();
  }, [showInput]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (checking || !targetHash) return;
    if (!inputRef.current) return;
    setChecking(true);
    setError(null);
    const val = inputRef.current.value.trim();

    try {
      const res = await fetch("/api/auth/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: val }),
      });

      await new Promise((r) => setTimeout(r, 350));

      if (res.ok) {
        try {
          if (typeof window !== "undefined" && window.sessionStorage) {
            window.sessionStorage.setItem("dgt.gate", "ok");
          }
        } catch {}
        setUnlocked(true);
      } else {
        setError("AUTH_FAILED :: invalid token. session terminated.");
        setChecking(false);
        inputRef.current.value = "";
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    } catch (err) {
      setError("AUTH_ERROR :: network failure.");
      setChecking(false);
      inputRef.current.value = "";
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  const handleVirtualKeyPress = (key: string) => {
    if (inputRef.current) {
      inputRef.current.value += key;
      inputRef.current.focus();
    }
  };

  const handleVirtualBackspace = () => {
    if (inputRef.current) {
      inputRef.current.value = inputRef.current.value.slice(0, -1);
      inputRef.current.focus();
    }
  };

  const handleVirtualSubmit = () => {
    if (inputRef.current) {
      const event = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(event);
    }
  };

  // Avoid hydration flash: render nothing until mounted, then either gate or content.
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[200] grid place-items-center bg-[var(--ink)]">
        <span className="font-mono text-[11px] tracking-[0.3em] text-emerald-400/60">
          BOOTING_VAULT...
        </span>
      </div>
    );
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="gate-wall fixed inset-0 z-[200] flex items-start justify-center overflow-x-hidden overflow-y-auto bg-[var(--ink)] px-3 py-4 sm:px-4 sm:py-7">
      <div className="gate-crt-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="cy-noise pointer-events-none absolute inset-0 opacity-20" />
      <div className="gate-console-shell relative mx-auto w-full max-w-[760px] break-words">
        <div className="gate-console-rig">
          <div className="gate-crt-assembly">
            <div className="gate-monitor-anchor">
              <Terminal
                commands={BOOT_COMMANDS}
                outputs={BOOT_OUTPUTS}
                username="root"
                title="vault.dgt"
                typingSpeed={18}
                delayBetweenCommands={360}
                initialDelay={1450}
                height="h-56 xs:h-64 sm:h-72"
                className="text-[10px] sm:text-xs"
              />
            </div>

            <form
              onSubmit={handleSubmit}
              className={cn(
                "retro-token-panel w-full overflow-hidden px-3 py-3 font-mono text-[11px] transition-all duration-700 sm:px-4 sm:text-[13px]",
                showInput ? "is-ready" : "is-standby",
              )}
            >
              <div className="retro-token-badge" aria-hidden="true">
                AUTH CASSETTE
              </div>
              <div className="retro-token-prompt flex flex-wrap items-baseline gap-x-1 leading-relaxed">
                <span className="text-emerald-400">root</span>
                <span className="text-emerald-600">@</span>
                <span className="text-sky-400">vault</span>
                <span className="text-neutral-500">:~$</span>
                <span className="text-neutral-300">token:</span>
              </div>
              <div className="retro-token-row mt-2 flex flex-col gap-2 sm:flex-row sm:items-stretch">
                <input
                  ref={inputRef}
                  type="password"
                  disabled={checking || !showInput}
                  autoComplete="off"
                  spellCheck={false}
                  inputMode="text"
                  className="retro-token-input w-full min-w-0 px-2 py-1.5 font-mono text-[12px] text-emerald-300 caret-emerald-300 outline-none placeholder:text-neutral-700 sm:flex-1 sm:text-[13px]"
                  placeholder="••••••"
                  aria-label="Access token"
                />
                <button
                  type="submit"
                  disabled={checking || !showInput}
                  className="retro-token-submit w-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-emerald-300 transition disabled:opacity-40 sm:w-auto"
                >
                  {checking ? "verifying" : "submit"}
                </button>
              </div>
              {error && (
                <div className="mt-2 break-words text-red-400">{error}</div>
              )}
            </form>
          </div>

          <div
            className={cn("retro-coil-cable", showCable && "is-connected")}
            aria-hidden="true"
          >
            <svg viewBox="0 0 760 92" preserveAspectRatio="none">
              <path
                className="retro-cable-shadow"
                d="M380 92 C380 80 330 76 330 64 S430 52 430 40 330 28 330 16 380 12 380 0"
              />
              <path
                className="retro-cable-core"
                d="M380 92 C380 80 330 76 330 64 S430 52 430 40 330 28 330 16 380 12 380 0"
              />
              <path
                className="retro-cable-highlight"
                d="M380 92 C380 80 330 76 330 64 S430 52 430 40 330 28 330 16 380 12 380 0"
              />
            </svg>
          </div>

          <div
            className={cn(
              "retro-keyboard-stage transition-all duration-1000",
              showKeyboard
                ? "is-online translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 pointer-events-none",
            )}
          >
            <VirtualKeyboard
              onKeyPress={handleVirtualKeyPress}
              onBackspace={handleVirtualBackspace}
              onSubmit={handleVirtualSubmit}
            />
          </div>

          <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-white/35 sm:text-[10px] sm:tracking-[0.3em]">
            {"// "}restricted · authorized only
          </p>
        </div>
      </div>
    </div>
  );
}
