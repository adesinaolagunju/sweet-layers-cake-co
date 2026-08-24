import Image from "next/image";
import { BRAND_BLUR_DATA_URL } from "@/lib/blur-placeholder";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="bg-gradient-to-b from-cream-100 to-white py-20 sm:py-28"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              Our Little Bakery
            </p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-tight text-espresso-900 sm:text-5xl">
              Hi — we&apos;re Sweet Layers.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-espresso-600 sm:text-lg">
              We&apos;re a small-batch cake studio in Springfield, founded in 2015 out of a
              borrowed church kitchen and one very patient oven. Ten years later we still bake
              the same way Chioma did on day one: real butter, scraped vanilla beans, and zero
              shortcuts.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 font-script text-3xl text-espresso-800">
              — Chioma &amp; the Sweet Layers crew
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card ring-1 ring-espresso-900/5">
            <Image
              src="/cakes/story-cake.jpeg"
              alt="A signature celebration cake from the Sweet Layers studio"
              fill
              sizes="(min-width: 1024px) 42vw, calc(100vw - 2rem)"
              placeholder="blur"
              blurDataURL={BRAND_BLUR_DATA_URL}
              className="object-cover"
            />
          </div>

          {/* Overlapping "polaroid" throwback shot */}
          <div className="absolute -bottom-10 -left-4 w-40 rotate-[-4deg] rounded-2xl bg-white p-2 shadow-lift ring-1 ring-espresso-900/5 sm:-left-8 sm:w-48">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/cakes/two-cake.jpeg"
                alt="One of our earliest market-day cakes, circa 2015"
                fill
                sizes="(min-width: 1024px) 12rem, 10rem"
                placeholder="blur"
                blurDataURL={BRAND_BLUR_DATA_URL}
                className="object-cover"
              />
            </div>
            <p className="pb-1 pt-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-espresso-400">
              Est. 2015
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
