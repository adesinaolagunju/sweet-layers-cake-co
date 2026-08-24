import Image from "next/image";
import { BRAND_BLUR_DATA_URL } from "@/lib/blur-placeholder";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProcessShot {
  imageUrl: string;
  alt: string;
  caption: string;
}

const processShots: ProcessShot[] = [
  {
    imageUrl: "/cakes/Birthday-Cake.jpeg",
    alt: "A finished birthday cake with swirled buttercream",
    caption: "Weighed, never scooped",
  },
  {
    imageUrl: "/cakes/Love-Cake.jpeg",
    alt: "An elegantly decorated celebration cake",
    caption: "Real butter, ten full minutes",
  },
  {
    imageUrl: "/cakes/Mom-Cake.jpeg",
    alt: "A hand-frosted gift cake ready for pickup",
    caption: "Beans scraped, never poured",
  },
  {
    imageUrl: "/cakes/house-cake.jpeg",
    alt: "A sculpted novelty cake with custom detailing",
    caption: "The crumb-coat ritual",
  },
  {
    imageUrl: "/cakes/celebration-cake.jpeg",
    alt: "A festive layer cake decorated for a party",
    caption: "Peonies, piped by hand",
  },
  {
    imageUrl: "/cakes/butterfly-cake.jpg",
    alt: "A whimsical cake with delicate butterfly accents",
    caption: "Stacked to survive the drive",
  },
];

export function KitchenStrip() {
  return (
    <section aria-labelledby="kitchen-heading" className="bg-cream-50 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Behind the Scenes"
            title="Life in the sugar studio"
            description="Six a.m. flour clouds, radio sing-alongs, and the happiest mess you'll ever see."
            id="kitchen-heading"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {processShots.map((shot, index) => (
            <Reveal key={shot.imageUrl} delay={index * 0.06}>
              <figure className="group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-espresso-900/5">
                <Image
                  src={shot.imageUrl}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BRAND_BLUR_DATA_URL}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-espresso-950/80 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 text-[11px] font-semibold uppercase leading-snug tracking-[0.12em] text-cream-50">
                  {shot.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
