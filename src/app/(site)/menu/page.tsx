import { pageMetadata } from "@/lib/seo";
import { Leaf, PartyPopper } from "lucide-react";
import { FlavorAccordion } from "@/components/menu/FlavorAccordion";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { flavorGroups, menu } from "@/data/menu";

export const metadata = pageMetadata({
  title: "Menu & Pricing",
  description:
    "Starting prices for our birthday cakes, wedding tiers, custom designs, and cupcakes — plus the full sponge, filling, and frosting menu from Sweet Layers Cake Co.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="menu-page-heading"
        className="bg-cream-50 pb-16 pt-20 text-center sm:pb-20 sm:pt-24"
      >
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              Sweet by the Slice
            </p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-tight text-espresso-900 sm:text-5xl lg:text-6xl">
              Menu &amp; Pricing
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-espresso-600 sm:text-lg">
              Everything we make is baked to order, so think of the numbers below as friendly
              starting points rather than a price list.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-espresso-500">
              Your final quote depends on servings, design complexity, and finishing details —
              and your free consultation locks in an exact number before anything goes in the
              oven.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Category tabs + pricing cards */}
      <section aria-label="Cake menu by category" className="bg-cream-50 pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <MenuExplorer categories={menu} />
          </Reveal>
          <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-espresso-400">
            Starting prices include our signature buttercream finish. Fondant work, hand-painted
            details, sugar flowers, and toppers are quoted individually at your consultation.
          </p>
        </Container>
      </section>

      {/* Flavours & fillings reference */}
      <section aria-labelledby="flavors-heading" className="bg-white py-24 sm:py-32">
        <Container>
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              Choose Your Adventure
            </p>
            <h2
              id="flavors-heading"
              className="mt-4 text-balance font-serif text-3xl font-bold leading-tight text-espresso-900 sm:text-4xl"
            >
              Sponges, fillings &amp; finishes
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-espresso-600">
              This is where a cake becomes yours. Mix any sponge with any filling — we&apos;ll
              help you pair like pros during your consultation.
            </p>
          </Reveal>

          <FlavorAccordion groups={flavorGroups} />

          {/* Dietary callout */}
          <Reveal>
            <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-5 rounded-[1.75rem] bg-gold-100 p-7 text-center ring-1 ring-gold-300 sm:flex-row sm:text-left">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-gold-300">
                <Leaf className="size-6 text-gold-600" aria-hidden />
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-espresso-900">
                  Dietary needs? We&apos;ve got you.
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-espresso-600">
                  Gluten-free, vegan, and nut-free versions of nearly everything on this menu —
                  prepared with dedicated pans and tools, so everyone gets a slice that tastes
                  like celebration.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Closing CTA */}
      <section aria-labelledby="menu-cta-heading" className="bg-white pb-24 sm:pb-32">
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
              <PartyPopper
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-52 rotate-12 text-cream-50/5"
              />

              <div className="relative z-10 flex flex-col items-center">
                <h2
                  id="menu-cta-heading"
                  className="max-w-xl text-balance font-serif text-3xl font-bold leading-tight text-cream-50 sm:text-4xl"
                >
                  Ready to design your cake?
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-cream-100/85">
                  Tell us what we&apos;re celebrating and we&apos;ll reply with a personalized
                  quote — usually within one business day.
                </p>
                <ButtonLink href="/custom-order" variant="primary" size="lg" className="mt-9">
                  Get My Personalized Quote
                </ButtonLink>
                <p className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-cream-100/60">
                  Free consultation · No obligation
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
