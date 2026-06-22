import type { Metadata } from 'next'
import { StatusDot } from "@/components/cyber/hud-frame";

export const metadata: Metadata = {
  title: 'Terms of Service - DR. GREENTHUMB',
  description: 'Terms of service for DR. GREENTHUMB private drop protocol. Know the rules before you drop.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TosPage() {
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
          <h1 className="text-4xl font-bold mb-2 text-white">Terms of Service</h1>
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--acid)] mb-8">{"//"} Last Updated: June 2026</div>

          <div className="space-y-8 text-sm md:text-base">
            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Acceptance of Terms</h2>
              <p className="text-white/80">By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Use License</h2>
              <p className="text-white/80 mb-3">Permission is granted to temporarily download one copy of the materials (information or software) on our service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer, disassemble, or decompile any software</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Disclaimer</h2>
              <p className="text-white/80">The materials on our service are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Limitations</h2>
              <p className="text-white/80">In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Accuracy of Materials</h2>
              <p className="text-white/80">The materials appearing on our service could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. We may make changes to the materials contained on our service at any time without notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Materials and Content</h2>
              <p className="text-white/80">We do not review all materials posted to our service, but we reserve the right to remove any materials deemed inappropriate at our sole discretion.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Links</h2>
              <p className="text-white/80">We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Modifications</h2>
              <p className="text-white/80">We may revise these terms of service for our service at any time without notice. By using this service, you are agreeing to be bound by the then current version of these terms of service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Governing Law</h2>
              <p className="text-white/80">These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">User Accounts</h2>
              <p className="text-white/80">If you create an account on our service, you are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Prohibited Activities</h2>
              <p className="text-white/80 mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Harass, threaten, defame, or abuse others</li>
                <li>Engage in any unlawful conduct</li>
                <li>Violate any intellectual property rights</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Transmit viruses or harmful code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--acid)] mb-4 pb-2 border-b border-[var(--acid)]/15">Contact</h2>
              <p className="text-white/80">For questions regarding these Terms of Service, please contact us at support@example.com.</p>
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
