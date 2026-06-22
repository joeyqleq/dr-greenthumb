import type { Metadata } from 'next'
import { StatusDot } from "@/components/cyber/hud-frame";

export const metadata: Metadata = {
  title: 'Privacy Policy - DR. GREENTHUMB',
  description: 'Privacy policy for DR. GREENTHUMB private drop protocol. Your data, your control.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <div className="cy-noise pointer-events-none fixed inset-0 z-[1] opacity-20" aria-hidden="true" />

      <header className="relative z-10 border-b border-[var(--acid)]/15 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="/" className="flex items-center gap-3 no-underline">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden">
              <img src="/images/gt_logo.png" alt="Dr. Greenthumb Logo" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-bold tracking-tight text-white">
                DR. GREENTHUMB<span className="text-[var(--acid)]">_</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                {"//"} private.drop.protocol
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-6 font-mono text-[11px] text-white/50 md:flex">
            <span className="flex items-center gap-2">
              <StatusDot /> <span className="text-[var(--toxic)]">ONLINE</span>
            </span>
            <span>BEKAA / LB</span>
            <span className="text-white/30">|</span>
            <span>v4.2.1</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 md:px-6">
        <div className="mt-14">
          <h1 className="text-4xl font-bold mb-2 text-white">Privacy Policy</h1>
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--acid)] mb-8">{"//"} Last Updated: June 2026</div>

          <div className="space-y-8 text-sm md:text-base">
            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Introduction</h2>
              <p className="text-white/80">This Privacy Policy describes how we collect, use, and protect your information when you use our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Information We Collect</h2>
              <p className="text-white/80 mb-3">We collect information you provide directly to us, such as:</p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Account registration information (name, email address)</li>
                <li>Profile information</li>
                <li>Communication preferences</li>
                <li>Device information and usage data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">How We Use Your Information</h2>
              <p className="text-white/80 mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Provide and maintain our services</li>
                <li>Process your requests</li>
                <li>Send you updates and promotional materials</li>
                <li>Improve and personalize your experience</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Information Sharing</h2>
              <p className="text-white/80 mb-3">We do not sell, trade, or rent your information to third parties. We may share information with:</p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Service providers who assist in operating our website and services</li>
                <li>Law enforcement when required by law</li>
                <li>Other parties with your consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Data Security</h2>
              <p className="text-white/80">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Your Rights</h2>
              <p className="text-white/80 mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Third-Party Links</h2>
              <p className="text-white/80">Our services may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Changes to This Policy</h2>
              <p className="text-white/80">We reserve the right to modify this Privacy Policy at any time. Changes will be effective immediately upon posting to the website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Contact Us</h2>
              <p className="text-white/80">For questions regarding this Privacy Policy, please contact us at support@example.com.</p>
            </section>
          </div>

          <footer className="mt-14 border-t border-[var(--acid)]/15 pt-6 font-mono text-[11px] text-white/40">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-3">
                <a href="/" className="text-[var(--acid)] no-underline hover:text-[var(--toxic)]">Home</a>
                <span className="text-white/20">·</span>
                <a href="/privacy" className="text-[var(--acid)] no-underline hover:text-[var(--toxic)]">Privacy</a>
                <span className="text-white/20">·</span>
                <a href="/tos" className="text-[var(--acid)] no-underline hover:text-[var(--toxic)]">Terms of Service</a>
              </div>
              <div className="flex items-center gap-4">
                <span>DR.GREENTHUMB</span>
                <span className="text-white/20">·</span>
                <span>BEKAA → DROP</span>
                <span className="text-white/20">·</span>
                <span className="text-[var(--magenta)]">END_OF_FEED</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}
