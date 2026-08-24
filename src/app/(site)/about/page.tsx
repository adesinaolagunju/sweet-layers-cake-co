import { pageMetadata } from "@/lib/seo";
import { ChefHat } from "lucide-react";
import { AboutHero } from "@/components/about/AboutHero";
import { KitchenStrip } from "@/components/about/KitchenStrip";
import { StorySection } from "@/components/about/StorySection";
import { TeamSection } from "@/components/about/TeamSection";
import { ValuesGrid } from "@/components/about/ValuesGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Meet Chioma and the Sweet Layers crew — a small-batch cake studio in Springfield baking custom celebration cakes with real butter since 2015.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <TeamSection />
      <ValuesGrid />
      <KitchenStrip />

      {/* Closing CTA */}
      <section aria-labelledby="about-cta-heading" className="bg-white py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-espresso-900 px-6 py-16 text-center sm:px-12 sm:py-20">
              <div
                aria-hidden
                className="absolute -left-20 -top-20 size-72 rounded-full bg-gold-400/20 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-24 -right-16 size-72 rounded-full bg-cream-50/10 blur-3xl"
              />
              <ChefHat
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-52 rotate-12 text-cream-50/5"
              />

              <div className="relative z-10 flex flex-col items-center">
                <h2
                  id="about-cta-heading"
                  className="max-w-xl text-balance font-serif text-3xl font-bold leading-tight text-cream-50 sm:text-4xl"
                >
                  Every great cake starts with hello.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-cream-100/85">
                  Tell us what we&apos;re celebrating — or just come wander the case and see what
                  sparks an idea.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <ButtonLink href="/gallery" variant="primary" size="lg">
                    Browse the Gallery
                  </ButtonLink>
                  <ButtonLink href="/custom-order" variant="outlineLight" size="lg">
                    Design My Custom Cake
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
