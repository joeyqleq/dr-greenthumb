import Script from "next/script";

export default function Analytics() {
  return (
    <>
      {/* Tianji */}
      <Script
        id="tianji"
        async
        defer
        strategy="afterInteractive"
        src="https://tianji.myhayat.app/tracker.js"
        data-website-id="cmpo8l5a20f8h8lxcx76j78f0"
      />

      {/* Matomo */}
      <Script id="matomo" strategy="afterInteractive">
        {`
          var _paq = window._paq = window._paq || [];
          _paq.push(["setDomains", ["*.greenthumb.lol","*.www.greenthumb.lol"]]);
          _paq.push(["enableCrossDomainLinking"]);
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//matomo.myhayat.app/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '12']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>
    </>
  );
}
