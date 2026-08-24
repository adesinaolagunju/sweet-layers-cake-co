import { CakeSlice } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site-config";

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-banner-heading" className="relative overflow-hidden bg-rose-700 py-24 text-center sm:py-32">
      {/* Soft glow blobs */}
      <div
        aria-hidden
        className="absolute -left-24 -top-24 size-80 rounded-full bg-gold-400/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-28 -right-20 size-96 rounded-full bg-cream-50/10 blur-3xl"
      />
      <CakeSlice
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 size-56 rotate-12 text-white/5"
      />

      <Container className="relative z-10 flex flex-col items-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
            Ready When You Are
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="cta-banner-heading"
            className="mt-4 max-w-2xl text-balance font-serif text-4xl font-bold leading-tight text-cream-50 sm:text-5xl"
          >
            Let&apos;s make your celebration unforgettable.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-5 max-w-xl text-base text-cream-100/90 sm:text-lg">
            Tell us about your event — the date, the servings, the daydreams — and we&apos;ll
            reply within one business day with ideas and a quote.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Get a Quote
            </ButtonLink>
            <ButtonLink href={siteConfig.phone.href} variant="outlineLight" size="lg">
              Or call {siteConfig.phone.display}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-7 text-sm text-cream-100/70">
            Free design consultations · Tasting boxes available · Wedding delivery included
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
