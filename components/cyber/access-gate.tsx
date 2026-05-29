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

function sha256Fallback(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }
  
  const words: number[] = [];
  const asciiLength = ascii.length;
  for (let i = 0; i < asciiLength; i++) {
    words[i >> 2] |= (ascii.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
  }
  
  const totalBits = asciiLength * 8;
  const finalBitIndex = totalBits >> 5;
  words[finalBitIndex] |= 0x80 << (24 - (totalBits % 32));
  
  // Pad with zeros, leaving room for length
  const padToWords = (((totalBits + 64) >>> 9) << 4) + 15;
  while (words.length <= padToWords) {
    words.push(0);
  }
  
  words[padToWords] = totalBits;
  
  const hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  
  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  
  for (let chunkStart = 0; chunkStart < words.length; chunkStart += 16) {
    const w = new Array(64);
    for (let i = 0; i < 16; i++) {
      w[i] = words[chunkStart + i] || 0;
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    
    let [a, b, c, d, e, f, g, h] = hash;
    
    for (let i = 0; i < 64; i++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + k[i] + w[i]) | 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;
      
      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }
    
    hash[0] = (hash[0] + a) | 0;
    hash[1] = (hash[1] + b) | 0;
    hash[2] = (hash[2] + c) | 0;
    hash[3] = (hash[3] + d) | 0;
    hash[4] = (hash[4] + e) | 0;
    hash[5] = (hash[5] + f) | 0;
    hash[6] = (hash[6] + g) | 0;
    hash[7] = (hash[7] + h) | 0;
  }
  
  return hash.map((val) => {
    const hex = (val >>> 0).toString(16);
    return "00000000".substring(hex.length) + hex;
  }).join("");
}

async function sha256Hex(s: string) {
  if (typeof window !== "undefined" && window.crypto?.subtle?.digest) {
    try {
      const enc = new TextEncoder().encode(s);
      const buf = await window.crypto.subtle.digest("SHA-256", enc);
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } catch (e) {
      console.warn("Subtle crypto failed, falling back to pure JS SHA-256", e);
    }
  }
  return sha256Fallback(s);
}

const BOOT_COMMANDS = [
  "ssh root@vault.dgt",
  "verify --cipher aes256",
  "auth --token",
];
const BOOT_OUTPUTS: Record<number, string[]> = {
  0: [
    "[*] resolving vault.dgt ...",
    "[*] channel ok",
  ],
  1: [
    "[*] cipher: AES-256-GCM",
    "[*] fp: 4f:9b:2e:1a:7c:88",
    "[ok] handshake complete",
  ],
  2: [
    "[!] authorized clients only",
    "[?] awaiting token ...",
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

    sha256Hex(decodeSeed() + decodeSalt())
      .then(setTargetHash)
      .catch((err) => {
        console.error("Failed to initialize target hash:", err);
      });

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
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-x-hidden overflow-y-auto bg-[var(--ink)] px-3 py-6 sm:px-4 sm:py-8">
      <div className="cy-noise pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto w-full max-w-[min(640px,100%)] break-words">
        <Terminal
          commands={BOOT_COMMANDS}
          outputs={BOOT_OUTPUTS}
          username="root"
          title="vault.dgt"
          typingSpeed={28}
          delayBetweenCommands={500}
          initialDelay={300}
          height="h-56 xs:h-64 sm:h-72"
          className="text-[10px] sm:text-xs"
        />

        <form
          onSubmit={handleSubmit}
          className={cn(
            "mt-3 w-full overflow-hidden border border-emerald-500/30 bg-[#070809] px-3 py-3 font-mono text-[11px] transition-opacity sm:px-4 sm:text-[13px]",
            showInput ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={!showInput}
        >
          {/* Prompt line — always wraps cleanly */}
          <div className="flex flex-wrap items-baseline gap-x-1 leading-relaxed">
            <span className="text-emerald-400">root</span>
            <span className="text-emerald-600">@</span>
            <span className="text-sky-400">vault</span>
            <span className="text-neutral-500">:~$</span>
            <span className="text-neutral-300">token:</span>
          </div>
          {/* Input + button row stacks under prompt on mobile */}
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              ref={inputRef}
              type="password"
              disabled={checking || !targetHash}
              autoComplete="off"
              spellCheck={false}
              inputMode="numeric"
              className="w-full min-w-0 border border-emerald-500/20 bg-black/40 px-2 py-1.5 font-mono text-[12px] text-emerald-300 caret-emerald-400 outline-none placeholder:text-neutral-700 focus:border-emerald-400/60 sm:flex-1 sm:text-[13px]"
              placeholder="••••••"
              aria-label="Access token"
            />
            <button
              type="submit"
              disabled={checking || !targetHash}
              className="w-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-40 sm:w-auto"
            >
              {checking ? "verifying" : "submit"}
            </button>
          </div>
          {error && (
            <div className="mt-2 break-words text-red-400">{error}</div>
          )}
        </form>

        <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-white/35 sm:text-[10px] sm:tracking-[0.3em]">
          {"// "}restricted · authorized only
        </p>
      </div>
    </div>
  );
}
