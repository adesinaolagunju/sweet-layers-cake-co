import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BRAND_BLUR_DATA_URL } from "@/lib/blur-placeholder";
import { galleryItems } from "@/data/gallery";

/* Curated mix of categories for the home page preview. */
const featuredIds = [
  "rose-garden-tiers",
  "confetti-cloud-birthday",
  "botanical-buttercream",
  "midnight-espresso-drip",
  "unicorn-meadow-fantasy",
  "brand-mark-celebration",
];

const featured = featuredIds
  .map((id) => galleryItems.find((item) => item.id === id))
  .filter((item) => item !== undefined);

export function GalleryPreview() {
  return (
    <section aria-labelledby="gallery-preview-heading" className="bg-cream-50 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Fresh From the Oven"
            title="A peek at the case"
            description="Six recent favourites from the studio — every one designed around a real person's big day."
            id="gallery-preview-heading"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 0.08}>
              <Link
                href={`/gallery#${item.id}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-soft ring-1 ring-espresso-900/5 transition-shadow duration-300 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 2rem)"
                  placeholder="blur"
                  blurDataURL={BRAND_BLUR_DATA_URL}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                />

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span
                  aria-hidden
                  className="absolute right-4 top-4 flex size-10 translate-y-1 items-center justify-center rounded-full bg-cream-50/90 text-espresso-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <ArrowUpRight className="size-5" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-cream-50">{item.title}</h3>
                  <p className="mt-2 max-w-[95%] translate-y-2 text-sm leading-relaxed text-cream-100/85 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {item.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <ButtonLink href="/gallery" variant="outline" size="lg">
            View the Full Gallery
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
