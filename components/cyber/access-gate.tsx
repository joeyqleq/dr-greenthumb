"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@/components/ui/terminal";
import { cn } from "@/lib/utils";

// XOR-obfuscated salt; the literal password "31337" never appears in source.
const SALT_BYTES = [
  0x3e, 0x28, 0x77, 0x3d, 0x28, 0x3f, 0x3f, 0x34, 0x2e, 0x32, 0x2f, 0x37,
  0x38, 0x60, 0x60, 0x2c, 0x3b, 0x2f, 0x36, 0x2e, 0x60, 0x60, 0x2c, 0x6b,
];
function decodeSalt() {
  return String.fromCharCode(...SALT_BYTES.map((b) => b ^ 0x5a));
}

// SEED_BYTES XOR 0x33 -> the access token (5 chars)
const SEED_BYTES = [0x00, 0x02, 0x00, 0x00, 0x04];
function decodeSeed() {
  return String.fromCharCode(...SEED_BYTES.map((b) => b ^ 0x33));
}

async function sha256Hex(s: string) {
  const enc = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const BOOT_COMMANDS = [
  "ssh root@dr-greenthumb.private --port=2222",
  "verify --cipher=aes256-gcm --kx=curve25519",
  "auth challenge --token",
];
const BOOT_OUTPUTS: Record<number, string[]> = {
  0: [
    "[*] resolving vault.dr-greenthumb.private ...",
    "[*] negotiating channel ... ok",
  ],
  1: [
    "[*] cipher: AES-256-GCM",
    "[*] host fingerprint: 4f:9b:2e:1a:7c:88:de:33",
    "[ok] handshake complete",
  ],
  2: [
    "[!] authorized clients only — sessions are logged",
    "[?] awaiting access token ...",
  ],
};

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetHash, setTargetHash] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("dgt.gate") === "ok") {
      setUnlocked(true);
      return;
    }
    sha256Hex(decodeSeed() + decodeSalt()).then(setTargetHash);
    // reveal prompt after the boot animation has had time to play
    const t = setTimeout(() => setShowInput(true), 4500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showInput && inputRef.current) inputRef.current.focus();
  }, [showInput]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputRef.current) return;
    setChecking(true);
    setError(null);
    const val = inputRef.current.value.trim();
    const candidate = await sha256Hex(val + decodeSalt());
    await new Promise((r) => setTimeout(r, 350));
    if (candidate === targetHash) {
      try {
        sessionStorage.setItem("dgt.gate", "ok");
      } catch {}
      setUnlocked(true);
    } else {
      setError("AUTH_FAILED :: invalid token. session terminated.");
      setChecking(false);
      inputRef.current.value = "";
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

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
    <div className="fixed inset-0 z-[200] grid place-items-center overflow-y-auto bg-[var(--ink)] px-4 py-8">
      <div className="cy-noise pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative w-full max-w-2xl">
        <Terminal
          commands={BOOT_COMMANDS}
          outputs={BOOT_OUTPUTS}
          username="root"
          title="vault.dr-greenthumb — secure shell"
          typingSpeed={28}
          delayBetweenCommands={500}
          initialDelay={300}
          height="h-72 sm:h-80"
        />

        <form
          onSubmit={handleSubmit}
          className={cn(
            "mt-3 overflow-hidden border border-emerald-500/30 bg-[#070809] px-4 py-3 font-mono text-[12px] transition-opacity sm:text-[13px]",
            showInput ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={!showInput}
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-emerald-400">root</span>
            <span className="text-emerald-600">@</span>
            <span className="text-sky-400">vault</span>
            <span className="text-neutral-500">:~$</span>
            <span className="text-neutral-300">enter access token:</span>
            <input
              ref={inputRef}
              type="password"
              disabled={checking || !targetHash}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 border-0 bg-transparent font-mono text-[12px] text-emerald-300 caret-emerald-400 outline-none placeholder:text-neutral-700 sm:text-[13px]"
              placeholder="••••••"
              aria-label="Access token"
            />
            <button
              type="submit"
              disabled={checking || !targetHash}
              className="border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-40"
            >
              {checking ? "verifying" : "submit"}
            </button>
          </div>
          {error && (
            <div className="mt-2 text-red-400">{error}</div>
          )}
        </form>

        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
          {"// "}restricted area · authorized clients only
        </p>
      </div>
    </div>
  );
}
