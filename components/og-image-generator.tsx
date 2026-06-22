'use client'

import { useEffect, useState } from 'react'

export default function OGImageGenerator() {
  const [imageSvg] = useState(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
          
          .bg { fill: #0a0a0a; }
          .noise { fill: url(#noise); opacity: 0.2; }
          .acid { fill: #80ff00; }
          .toxic { fill: #00ffff; }
          .magenta { fill: #ff00ff; }
          .white { fill: #ffffff; }
          .title { font-family: 'Space Grotesk', sans-serif; font-size: 72px; font-weight: 700; fill: #ffffff; letter-spacing: -2px; }
          .subtitle { font-family: 'JetBrains Mono', monospace; font-size: 24px; font-weight: 400; fill: rgba(255,255,255,0.6); letter-spacing: 3px; }
          .tagline { font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 500; fill: rgba(255,255,255,0.8); margin-top: 20px; }
          .accent { font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 600; fill: #80ff00; letter-spacing: 2px; }
        </style>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" />
        </filter>
      </defs>
      
      <!-- Background -->
      <rect class="bg" width="1200" height="630" />
      <rect class="noise" width="1200" height="630" />
      
      <!-- Grid background -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(128,255,0,0.08)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#grid)" />
      
      <!-- Gradient overlay -->
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(128,255,0,0.1);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,255,255,0.1);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad)" />
      
      <!-- Left accent bar -->
      <rect x="0" y="0" width="6" height="630" class="acid" />
      
      <!-- Content container -->
      <g transform="translate(80, 100)">
        <!-- Top label -->
        <text x="0" y="40" class="accent">{"//"} PRIVATE.DROP.PROTOCOL</text>
        
        <!-- Main title -->
        <text x="0" y="160" class="title">DR. GREENTHUMB</text>
        <text x="640" y="160" class="acid" style="font-family: 'Space Grotesk', sans-serif; font-size: 72px; font-weight: 700;">_</text>
        
        <!-- Tagline -->
        <text x="0" y="240" class="tagline">Encrypted Delivery Protocol</text>
        
        <!-- Description -->
        <text x="0" y="310" class="subtitle" style="font-size: 20px;">Reddit Handshake • Whish Payment • Bekaa Pickup • Hidden Drop</text>
        
        <!-- Bottom badge -->
        <g transform="translate(0, 380)">
          <rect x="0" y="0" width="300" height="50" fill="none" stroke="rgba(128,255,0,0.3)" stroke-width="2" />
          <text x="15" y="32" class="accent" style="font-size: 16px;">• ZERO FACE TIME •</text>
        </g>
      </g>
      
      <!-- Corner accents -->
      <circle cx="1200" cy="0" r="60" fill="none" stroke="rgba(0,255,255,0.2)" stroke-width="2" />
      <circle cx="0" cy="630" r="60" fill="none" stroke="rgba(255,0,255,0.2)" stroke-width="2" />
    </svg>
  `)

  // This component is for reference - the actual OG image is a static file
  // The SVG above should be saved as public/og-image.png using an image editor
  return null
}
