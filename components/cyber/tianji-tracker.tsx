'use client';

import Script from 'next/script';

export default function TianjiTracker() {
  return (
    <Script
      async
      defer
      src="https://numbers.trumpstein.me/tracker.js"
      data-website-id="cmrhmhqv2000blftpn3fyhjte"
      strategy="afterInteractive"
    />
  );
}
