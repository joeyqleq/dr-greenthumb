"use client";

import DecryptedText from "@/components/react-bits/DecryptedText";

export default function Philosophy() {
  return (
    <section className="relative w-full border-t border-[var(--acid)]/10 bg-black/50 py-16 sm:py-24 backdrop-blur-sm">
      <div className="absolute inset-0 cy-noise opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-[var(--sky)] text-sm sm:text-base font-bold mb-6 uppercase tracking-[0.3em]">
          <DecryptedText text="// The Philosophy" speed={40} maxIterations={15} />
        </h2>
        
        <div className="font-mono text-[13px] sm:text-sm text-white/70 leading-loose space-y-6 max-w-2xl mx-auto">
          <p>
            Make no mistake: <strong className="text-white">I am not a dealer. I am not a shop.</strong> I am a service provider, a freelancer, a facilitator of peace of mind. This process is something I have perfected, and I never break my rule of being absolutely strict on this protocol.
          </p>
          <p>
            My prices are higher than your average street dealer in Beirut because I am a procurer. I only get premium, best-quality, guaranteed-purity product straight from the Bekaa. Plus, I deliver it straight to you.
          </p>
          <p>
            I understand it is not easy to ask someone to send money to a stranger over the internet without receiving the product first. But this is the only way my method works. I need the customer to send cash first so I can be sure they mean business, and to filter out anyone who might attract the wrong kind of attention.
          </p>
          
          <div className="mt-8 border-t border-[var(--acid)]/20 pt-8">
            <p className="text-[var(--toxic)] text-[11px] sm:text-[12px] font-bold uppercase tracking-widest leading-relaxed">
              At the end of the day, you are risking a couple of bucks. The danger I am putting myself into by driving to the source is much, much more than that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
