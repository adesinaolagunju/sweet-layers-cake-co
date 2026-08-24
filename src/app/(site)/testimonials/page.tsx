import { pageMetadata } from "@/lib/seo";
import { Quote, Star } from "lucide-react";
import { AggregateStars } from "@/components/testimonials/AggregateStars";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export const metadata = pageMetadata({
  title: "Testimonials",
  description:
    "Real reviews from real celebrations — weddings, birthdays, corporate events, and more, straight from Sweet Layers Cake Co. customers.",
  path: "/testimonials",
});

function CardStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          className={`size-4 ${
            index < rating
              ? "fill-gold-500 text-gold-500"
              : "fill-espresso-900/10 text-espresso-900/15"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const average = (
    testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <>
      {/* Header with aggregate rating */}
      <section
        aria-labelledby="testimonials-page-heading"
        className="bg-cream-50 pb-16 pt-20 text-center sm:pb-20 sm:pt-24"
      >
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              Sweet Words
            </p>
            <h1
              id="testimonials-page-heading"
              className="mx-auto mt-4 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-espresso-900 sm:text-5xl lg:text-6xl"
            >
              The reviews are in — and they&apos;re delicious
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-9 flex flex-col items-center gap-3">
              <AggregateStars label={`Rated ${average} out of 5`} />
              <p className="font-serif text-2xl font-bold text-espresso-900">
                {average} out of 5
              </p>
              <p className="max-w-md text-sm leading-relaxed text-espresso-500">
                From 500+ happy customers across Springfield — a few recent favourites below.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Masonry wall of testimonials */}
      <section aria-label="Customer reviews" className="bg-cream-50 pb-24 sm:pb-32">
        <Container>
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {testimonials.map((testimonial, index) => (
              <Reveal
                key={testimonial.id}
                delay={(index % 3) * 0.08}
                className="mb-6 break-inside-avoid"
              >
                <figure className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-espresso-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <div className="flex items-start justify-between gap-4">
                    <CardStars rating={testimonial.rating} />
                    <Quote
                      aria-hidden
                      className="size-6 shrink-0 fill-gold-400 text-gold-400"
                      strokeWidth={0}
                    />
                  </div>

                  <blockquote className="mt-4 text-[15px] leading-relaxed text-espresso-700">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-dashed border-espresso-900/10 pt-4">
                    <p className="text-sm font-semibold text-espresso-900">{testimonial.name}</p>
                    <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-espresso-600">
                      {testimonial.occasion}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section aria-labelledby="testimonials-cta-heading" className="bg-white pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gold-100 px-6 py-14 text-center ring-1 ring-gold-300 sm:px-12 sm:py-16">
              <Quote
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-48 rotate-12 text-gold-300/40"
                strokeWidth={1}
                fill="currentColor"
              />

              <div className="relative z-10 flex flex-col items-center">
                <h2
                  id="testimonials-cta-heading"
                  className="max-w-xl text-balance font-serif text-3xl font-bold leading-tight text-espresso-900 sm:text-4xl"
                >
                  Ready to create your own sweet memory?
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-espresso-600">
                  The next review could be yours. Tell us about your celebration and we&apos;ll
                  bring the cake worth writing home about.
                </p>
                <ButtonLink href="/custom-order" variant="primary" size="lg" className="mt-8">
                  Start Your Custom Cake
                </ButtonLink>
                <p className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-espresso-400">
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
