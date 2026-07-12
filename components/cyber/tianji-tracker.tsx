import Script from 'next/script';

export default function TianjiTracker() {
  return (
    <>
      <Script
        src="https://numbers.trumpstein.me/tracker.js"
        data-website-id="cmrhmhqv2000blftpn3fyhjte"
        strategy="beforeInteractive"
        async
        defer
      />
    </>
  );
}
