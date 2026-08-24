import { Check } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BRAND_BLUR_DATA_URL } from "@/lib/blur-placeholder";

const values = [
  "European-style butter & real vanilla bean",
  "Small-batch sponges, never frozen",
  "Free design consult with every order",
];

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser-heading" className="bg-white py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Offset gold frame behind the portrait */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-gold-200"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
            <Image
              src="/cakes/Fragrance-Home.jpeg"
              alt="A hand-finished Sweet Layers cake styled in the studio"
              fill
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, calc(100vw - 2rem)"
              placeholder="blur"
              blurDataURL={BRAND_BLUR_DATA_URL}
              className="object-cover"
            />
          </div>
          <p className="absolute -bottom-5 left-6 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-espresso-700 shadow-lift ring-1 ring-espresso-900/5">
            Since 2015 · Small Batch
          </p>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="From our kitchen to your celebration"
              id="about-teaser-heading"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-espresso-600">
              <p>
                Our kitchen runs on real butter, patience, and the belief that dessert is the
                emotional peak of every gathering. Since 2015 we&apos;ve baked hundreds of custom
                cakes for weddings, birthdays, and &ldquo;just because&rdquo; Tuesdays across
                Springfield.
              </p>
              <p>
                Every cake starts with a conversation — your story, your flavours, your favourite
                flowers — and ends with something almost too pretty to cut. Almost.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <ul className="mt-8 space-y-3">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3 text-sm font-medium text-espresso-700">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.22}>
            <ButtonLink href="/about" variant="outline" size="lg" className="mt-10">
              Read Our Story
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
