import { pageMetadata } from "@/lib/seo";
import { MessageCircle } from "lucide-react";
import { FaqGroups } from "@/components/faq/FaqGroups";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/data/faq";
import { siteConfig } from "@/data/site-config";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about ordering custom cakes, delivery and pickup, dietary options, storage, and more — from Sweet Layers Cake Co. in Springfield.",
  path: "/faq",
});

const GROUP_META = [
  {
    id: "ordering",
    title: "Ordering",
    description: "Timelines, sizing, deposits & consultations.",
  },
  {
    id: "delivery",
    title: "Delivery & Pickup",
    description: "Getting your cake where it needs to be — and keeping it lovely.",
  },
  {
    id: "dietary",
    title: "Dietary & Flavours",
    description: "Gluten-free, vegan, allergens & flavour picks.",
  },
] as const;

export default function FaqPage() {
  const groups = GROUP_META.map((meta) => ({
    ...meta,
    items: faqs.filter((faq) => faq.category === meta.title),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      {/* Header */}
      <section
        aria-labelledby="faq-page-heading"
        className="bg-cream-50 pb-16 pt-20 text-center sm:pb-20 sm:pt-24"
      >
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              Good to Know
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-espresso-900 sm:text-5xl lg:text-6xl">
              Frequently asked questions
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-espresso-600 sm:text-lg">
              Everything customers ask before ordering — lead times, sizing, delivery,
              gluten-free, and what to do with leftovers. Can&apos;t find yours? We&apos;re one
              message away.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Grouped accordion */}
      <section aria-label="Frequently asked questions" className="bg-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <FaqGroups groups={groups} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section aria-labelledby="faq-cta-heading" className="bg-white pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gold-100 px-6 py-14 text-center ring-1 ring-gold-300 sm:px-12 sm:py-16">
              <MessageCircle
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-44 rotate-12 text-gold-300/40"
              />

              <div className="relative z-10 flex flex-col items-center">
                <h2
                  id="faq-cta-heading"
                  className="max-w-xl text-balance font-serif text-3xl font-bold leading-tight text-espresso-900 sm:text-4xl"
                >
                  Still have questions?
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-espresso-600">
                  We answer every message personally — no chatbots, no scripts. Ask us anything.
                </p>
                <ButtonLink href="/contact" variant="primary" size="lg" className="mt-8">
                  Get in Touch
                </ButtonLink>
                <p className="mt-5 text-sm text-espresso-500">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="link-draw font-semibold text-rose-600 transition-colors hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
