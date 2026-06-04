"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  className?: string;
}

type KeyDef = {
  key: string;
  alt?: string;
  width: number;
  variant?: "modifier";
};

const KEYBOARD_LAYOUT: KeyDef[][] = [
  [
    { key: "`", alt: "~", width: 1 },
    { key: "1", alt: "!", width: 1 },
    { key: "2", alt: "@", width: 1 },
    { key: "3", alt: "#", width: 1 },
    { key: "4", alt: "$", width: 1 },
    { key: "5", alt: "%", width: 1 },
    { key: "6", alt: "^", width: 1 },
    { key: "7", alt: "&", width: 1 },
    { key: "8", alt: "*", width: 1 },
    { key: "9", alt: "(", width: 1 },
    { key: "0", alt: ")", width: 1 },
    { key: "-", alt: "_", width: 1 },
    { key: "=", alt: "+", width: 1 },
    { key: "backspace", width: 2, variant: "modifier" },
  ],
  [
    { key: "tab", width: 1.5, variant: "modifier" },
    { key: "q", width: 1 },
    { key: "w", width: 1 },
    { key: "e", width: 1 },
    { key: "r", width: 1 },
    { key: "t", width: 1 },
    { key: "y", width: 1 },
    { key: "u", width: 1 },
    { key: "i", width: 1 },
    { key: "o", width: 1 },
    { key: "p", width: 1 },
    { key: "[", alt: "{", width: 1 },
    { key: "]", alt: "}", width: 1 },
    { key: "\\", alt: "|", width: 1.5 },
  ],
  [
    { key: "caps", width: 1.75, variant: "modifier" },
    { key: "a", width: 1 },
    { key: "s", width: 1 },
    { key: "d", width: 1 },
    { key: "f", width: 1 },
    { key: "g", width: 1 },
    { key: "h", width: 1 },
    { key: "j", width: 1 },
    { key: "k", width: 1 },
    { key: "l", width: 1 },
    { key: ";", alt: ":", width: 1 },
    { key: "'", alt: "\"", width: 1 },
    { key: "enter", width: 2.25, variant: "modifier" },
  ],
  [
    { key: "lshift", width: 2.25, variant: "modifier" },
    { key: "z", width: 1 },
    { key: "x", width: 1 },
    { key: "c", width: 1 },
    { key: "v", width: 1 },
    { key: "b", width: 1 },
    { key: "n", width: 1 },
    { key: "m", width: 1 },
    { key: ",", alt: "<", width: 1 },
    { key: ".", alt: ">", width: 1 },
    { key: "/", alt: "?", width: 1 },
    { key: "rshift", width: 2.75, variant: "modifier" },
  ],
  [
    { key: "lctrl", width: 1.25, variant: "modifier" },
    { key: "lwin", width: 1.25, variant: "modifier" },
    { key: "lalt", width: 1.25, variant: "modifier" },
    { key: "space", width: 6.25 },
    { key: "ralt", width: 1.25, variant: "modifier" },
    { key: "rwin", width: 1.25, variant: "modifier" },
    { key: "rctx", width: 1.25, variant: "modifier" },
    { key: "rctrl", width: 1.25, variant: "modifier" },
  ],
];

const CLICK_SOUNDS = [
  [2894, 226],
  [12946, 191],
  [13470, 190],
  [13963, 199],
  [14481, 204],
  [14994, 187],
] as const;

const CODE_TO_KEY: Record<string, string> = {
  AltLeft: "lalt",
  AltRight: "ralt",
  Backspace: "backspace",
  Backslash: "\\",
  CapsLock: "caps",
  ContextMenu: "rctx",
  ControlLeft: "lctrl",
  ControlRight: "rctrl",
  Enter: "enter",
  MetaLeft: "lwin",
  MetaRight: "rwin",
  Quote: "'",
  ShiftLeft: "lshift",
  ShiftRight: "rshift",
  Space: "space",
  Tab: "tab",
};

function buildKeyLookup() {
  const map = new Map<string, string>();
  for (const row of KEYBOARD_LAYOUT) {
    for (const key of row) {
      map.set(key.key, key.key);
      if (key.alt) map.set(key.alt, key.key);
    }
  }
  return map;
}

function getKeyboardEventId(event: KeyboardEvent, lookup: Map<string, string>) {
  const byCode = CODE_TO_KEY[event.code];
  if (byCode) return byCode;
  return lookup.get(event.key.toLowerCase()) ?? null;
}

function getAccessibleLabel(key: KeyDef) {
  if (key.key === "space") return "Space";
  if (key.key === "lwin" || key.key === "rwin") return "Meta";
  if (key.key === "rctx") return "Menu";
  if (key.key.startsWith("l") && ["lshift", "lctrl", "lalt"].includes(key.key)) {
    return `Left ${key.key.slice(1)}`;
  }
  if (key.key.startsWith("r") && ["rshift", "rctrl", "ralt"].includes(key.key)) {
    return `Right ${key.key.slice(1)}`;
  }
  return key.alt ? `${key.alt} ${key.key}` : key.key;
}

export default function VirtualKeyboard({
  onKeyPress,
  onBackspace,
  onSubmit,
  className,
}: VirtualKeyboardProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(() => new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const releaseTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyLookup = useMemo(buildKeyLookup, []);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/sound.ogg");
    audioRef.current.preload = "auto";
  }, []);

  const playMechanicalClick = useCallback(() => {
    if (!audioRef.current) return;

    const [offset, duration] =
      CLICK_SOUNDS[Math.floor(Math.random() * CLICK_SOUNDS.length)];

    if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    audioRef.current.pause();
    audioRef.current.currentTime = offset / 1000;
    audioRef.current
      .play()
      .catch((e) => console.log("Audio play blocked by browser:", e));

    playTimeoutRef.current = setTimeout(() => {
      audioRef.current?.pause();
    }, duration);
  }, []);

  const pressKey = useCallback((keyId: string, withSound = true) => {
    if (withSound) playMechanicalClick();
    setPressedKeys((current) => {
      const next = new Set(current);
      next.add(keyId);
      return next;
    });
  }, [playMechanicalClick]);

  const releaseKey = useCallback((keyId: string) => {
    setPressedKeys((current) => {
      if (!current.has(keyId)) return current;
      const next = new Set(current);
      next.delete(keyId);
      return next;
    });
  }, []);

  const releaseAfterTap = (keyId: string) => {
    const existingTimer = releaseTimers.current.get(keyId);
    if (existingTimer) clearTimeout(existingTimer);

    const timer = setTimeout(() => {
      releaseKey(keyId);
      releaseTimers.current.delete(keyId);
    }, 115);
    releaseTimers.current.set(keyId, timer);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyId = getKeyboardEventId(event, keyLookup);
      if (!keyId) return;

      pressKey(keyId, !event.repeat);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const keyId = getKeyboardEventId(event, keyLookup);
      if (keyId) releaseKey(keyId);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      releaseTimers.current.forEach(clearTimeout);
      releaseTimers.current.clear();
      if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    };
  }, [keyLookup, pressKey, releaseKey]);

  const handleKeyClick = (keyId: string) => {
    pressKey(keyId);
    releaseAfterTap(keyId);

    if (keyId === "backspace") {
      onBackspace();
    } else if (keyId === "enter") {
      onSubmit();
    } else if (keyId === "space") {
      onKeyPress(" ");
    } else if (keyId.length === 1) {
      onKeyPress(keyId);
    }
  };

  return (
    <div className={cn("retro-keyboard-wrap", className)}>
      <div className="retro-keyboard" aria-label="Mechanical 60 percent keyboard">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div className="retro-keyboard-row" key={rowIndex}>
            {row.map((key) => {
              const isPressed = pressedKeys.has(key.key);

              return (
                <button
                  aria-label={getAccessibleLabel(key)}
                  className={cn(
                    "retro-key",
                    key.variant === "modifier" && "retro-key--modifier",
                    isPressed && "pressed",
                  )}
                  data-alt={key.alt}
                  data-key={key.key}
                  key={key.key}
                  onPointerCancel={() => releaseKey(key.key)}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    handleKeyClick(key.key);
                  }}
                  onPointerLeave={() => releaseKey(key.key)}
                  onPointerUp={() => releaseKey(key.key)}
                  style={{ width: `calc(var(--retro-u) * ${key.width})` }}
                  type="button"
                >
                  <span className="sr-only">{getAccessibleLabel(key)}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
