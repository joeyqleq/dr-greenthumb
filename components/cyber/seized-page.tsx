"use client";

import { useEffect, useRef } from "react";
import { trackSeizedPageView, trackCedarTreeClick } from "@/lib/analytics";

const LEGAL_TEXT =
  "This website has been seized following victim complaints and the collection of substantial digital evidence. This action relates to suspected violations of 18 U.S.C.§ 1343 (Wire Fraud), 21 U.S.C.§§ 841 and 846, Lebanese Law No. 673/1998 on Narcotic Drugs, Psychotropic Substances and Precursors, Lebanese fraud offenses, and Law No. 81/2018 on Electronic Transactions and Personal Data. The operators of this website remain under investigation and may face criminal prosecution in the United States, Lebanon, and other jurisdictions.";

export default function SeizedPage() {
  const navigated = useRef(false);

  useEffect(() => {
    trackSeizedPageView();
  }, []);

  function handleTreeClick(e: React.MouseEvent) {
    e.preventDefault();
    if (navigated.current) return;
    navigated.current = true;
    trackCedarTreeClick();
    setTimeout(() => {
      window.location.href = "/?gate=1";
    }, 120);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {/* ── DESKTOP (≥768px) ── */}
      <div className="sz-desktop">
        <img
          src="/seized_desktop.png"
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            pointerEvents: "none",
          }}
        />

        {/* Cover original AI bottom text — exact match bg #09192f */}
        {/* Band: from y=929 to bottom (1081px total) → height = 152px → 14.06% */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "14.25%",
            background: "#09192f",
          }}
        />

        {/* Replacement legal text — desktop */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "14.25%",
            display: "flex",
            alignItems: "center",
            padding: "0 4.4%",
          }}
        >
          <p
            style={{
              fontFamily: '"Times New Roman", "Georgia", "DejaVu Serif", serif',
              fontSize: "clamp(10px, 0.95vw, 14px)",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "#cdd5e2",
              textAlign: "left",
              margin: 0,
              letterSpacing: "0.012em",
              maxWidth: "100%",
            }}
          >
            {LEGAL_TEXT}
          </p>
        </div>

        {/* Secret cedar tree button — desktop */}
        {/* ISF badge: x 1064–1178 (114px), y 509–589 (top arc ~80px) on 1920×1081 */}
        <CedarButton
          style={{
            left:   `${(1064 / 1920) * 100}%`,
            top:    `${(509  / 1081) * 100}%`,
            width:  `${(114  / 1920) * 100}%`,
            height: `${(80   / 1081) * 100}%`,
          }}
          onClick={handleTreeClick}
        />
      </div>

      {/* ── MOBILE (<768px) ── */}
      <div className="sz-mobile">
        <img
          src="/seized_mobile.png"
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            pointerEvents: "none",
          }}
        />

        {/* Cover original AI bottom text — mobile */}
        {/* Band: y=1497 to bottom (1672px total) → height = 175px → 10.47% */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "10.6%",
            background: "#0a192d",
          }}
        />

        {/* Replacement legal text — mobile */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "10.6%",
            display: "flex",
            alignItems: "center",
            padding: "0 4%",
          }}
        >
          <p
            style={{
              fontFamily: '"Times New Roman", "Georgia", "DejaVu Serif", serif',
              fontSize: "clamp(8px, 2.2vw, 12px)",
              fontWeight: 400,
              lineHeight: 1.58,
              color: "#cdd5e2",
              textAlign: "left",
              margin: 0,
              letterSpacing: "0.008em",
            }}
          >
            {LEGAL_TEXT}
          </p>
        </div>

        {/* Secret cedar tree — mobile */}
        {/* ISF badge: x 78–388 (310px), y 800–880 (top arc ~80px) on 941×1672 */}
        <CedarButton
          style={{
            left:   `${(78  / 941)  * 100}%`,
            top:    `${(800 / 1672) * 100}%`,
            width:  `${(310 / 941)  * 100}%`,
            height: `${(80  / 1672) * 100}%`,
          }}
          onClick={handleTreeClick}
        />
      </div>

      <style>{`
        .sz-desktop,.sz-mobile{position:absolute;inset:0;}
        @media(min-width:768px){.sz-desktop{display:block}.sz-mobile{display:none}}
        @media(max-width:767px){.sz-desktop{display:none}.sz-mobile{display:block}}
      `}</style>
    </div>
  );
}

function CedarButton({
  style,
  onClick,
}: {
  style: React.CSSProperties;
  onClick: (e: React.MouseEvent) => void;
}) {
  const glowRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function pulse() {
      // Random gap 8–18 seconds between pulses
      const gap = 8000 + Math.random() * 10000;
      timer = setTimeout(() => {
        const el = glowRef.current;
        if (el) {
          el.animate(
            [
              { opacity: "0", transform: "scale(0.92)" },
              { opacity: "0.9", transform: "scale(1.04)" },
              { opacity: "0", transform: "scale(0.92)" },
            ],
            { duration: 850, easing: "ease-in-out" }
          );
        }
        pulse();
      }, gap);
    }

    // Initial delay 5–10s before first pulse
    const init = 5000 + Math.random() * 5000;
    timer = setTimeout(pulse, init);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={onClick}
      role="presentation"
      aria-hidden="true"
      style={{
        position: "absolute",
        zIndex: 10,
        cursor: "default",
        WebkitTapHighlightColor: "transparent",
        outline: "none",
        ...style,
      }}
    >
      {/* Invisible to 99% of visitors — only a faint glow on the tree occasionally */}
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}
      >
        <defs>
          <radialGradient id="cglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#b8d4ff" stopOpacity="0.5" />
            <stop offset="60%"  stopColor="#6baed6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6baed6" stopOpacity="0"   />
          </radialGradient>
        </defs>
        {/* Cedar tree silhouette clip — approximate */}
        <ellipse
          ref={glowRef}
          cx="50"
          cy="50"
          rx="42"
          ry="48"
          fill="url(#cglow)"
          style={{ opacity: 0, transformOrigin: "50px 50px" }}
        />
      </svg>
    </div>
  );
}
