import { pageMetadata } from "@/lib/seo";
import { CakeSlice } from "lucide-react";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { galleryItems } from "@/data/gallery";

export const metadata = pageMetadata({
  title: "Cake Gallery",
  description:
    "Browse our portfolio of custom birthday, wedding, corporate, and novelty cakes — every one designed and baked by Sweet Layers Cake Co.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <div className="bg-cream-50">
      {/* Page header */}
      <section aria-labelledby="gallery-page-heading" className="pb-12 pt-20 text-center sm:pb-14 sm:pt-24">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              Our Portfolio
            </p>
            <h1
              id="gallery-page-heading"
              className="mx-auto mt-4 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-espresso-900 sm:text-5xl lg:text-6xl"
            >
              Cakes worth the candle count
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-espresso-600 sm:text-lg">
              Every cake below was somebody&apos;s once-in-a-lifetime moment. Wander through
              weddings, birthdays, corporate parties, and gloriously weird custom ideas — then
              picture your own celebration among them.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Filters + grid + lightbox */}
      <section aria-label="Browse cakes" className="pb-20 sm:pb-24">
        <Container>
          <GalleryExplorer items={galleryItems} />
        </Container>
      </section>

      {/* Custom-order CTA */}
      <section aria-labelledby="gallery-cta-heading" className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gold-100 px-6 py-14 text-center ring-1 ring-gold-300 sm:px-12 sm:py-16">
              <CakeSlice
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-44 rotate-12 text-gold-400/30"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-14 -left-10 size-48 rounded-full bg-cream-50/60 blur-2xl"
              />

              <div className="relative z-10 flex flex-col items-center">
                <h2
                  id="gallery-cta-heading"
                  className="max-w-xl text-balance font-serif text-3xl font-bold leading-tight text-espresso-900 sm:text-4xl"
                >
                  Don&apos;t see what you&apos;re looking for?
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-espresso-600">
                  Let&apos;s design something custom. Bring us your theme, your colours, or the
                  wildest idea you&apos;ve got — we&apos;ll sketch it into cake form.
                </p>
                <ButtonLink href="/custom-order" variant="primary" size="lg" className="mt-8">
                  Design My Custom Cake
                </ButtonLink>
                <p className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-espresso-400">
                  Free consultation · No obligation
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
