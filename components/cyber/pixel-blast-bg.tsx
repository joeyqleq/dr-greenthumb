"use client";

import dynamic from "next/dynamic";

const PixelBlast = dynamic(() => import("@/components/react-bits/PixelBlast.jsx"), {
  ssr: false,
});

export default function PixelBlastBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <PixelBlast
        variant="circle"
        pixelSize={6}
        color="#B19EEF"
        patternScale={3}
        patternDensity={1.2}
        pixelSizeJitter={0.5}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.6}
        edgeFade={0.25}
        transparent
      />
      <div className="absolute inset-0 bg-[var(--ink)]/55" />
    </div>
  );
}
