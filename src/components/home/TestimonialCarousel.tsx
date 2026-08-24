"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

import { EASE_OUT as easeOut } from "@/lib/animations";
const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 72;

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 64 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -64 }),
};

export function TestimonialCarousel() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [autoplay, setAutoplay] = useState(true);
  const reduceMotion = useReducedMotion();

  const paginate = useCallback((step: 1 | -1) => {
    setState(([current]) => [
      (current + step + testimonials.length) % testimonials.length,
      step,
    ]);
  }, []);

  const goTo = (target: number) => {
    if (target === index) return;
    setState([target, target > index ? 1 : -1]);
  };

  // Reset the timer on every change so manual navigation isn't cut short.
  // Auto-advance is skipped entirely for visitors who prefer reduced motion.
  useEffect(() => {
    if (!autoplay || reduceMotion) return;
    const timer = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [autoplay, index, paginate, reduceMotion]);

  const active = testimonials[index];

  return (
    <section aria-labelledby="testimonials-heading" className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Kind Words"
            title="Sugar-coated praise"
            description="Real notes from real celebrations — lightly edited for humble bragging."
            id="testimonials-heading"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="relative mx-auto mt-12 max-w-3xl"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            onFocus={() => setAutoplay(false)}
            onBlur={() => setAutoplay(true)}
          >
            {/* Prev / next (desktop) */}
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="absolute -left-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-espresso-800 shadow-card ring-1 ring-espresso-900/5 transition-all hover:-translate-y-[calc(50%+2px)] hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:translate-y-[calc(50%-2px)] sm:flex lg:-left-16"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="absolute -right-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-espresso-800 shadow-card ring-1 ring-espresso-900/5 transition-all hover:-translate-y-[calc(50%+2px)] hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:translate-y-[calc(50%-2px)] sm:flex lg:-right-16"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>

            <div
              aria-roledescription="carousel"
              aria-label="Customer testimonials"
              className="rounded-[2rem] bg-cream-50 p-8 shadow-soft ring-1 ring-espresso-900/5 sm:p-12"
            >
              <Quote
                className="mx-auto size-9 text-gold-400"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden
              />

              <div className="mt-6 min-h-[280px] sm:min-h-[240px]">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.figure
                    key={active.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: easeOut }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.55}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
                      else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
                    }}
                    className="flex min-h-[240px] cursor-grab touch-pan-y flex-col items-center justify-center text-center active:cursor-grabbing sm:min-h-[210px]"
                  >
                    <div className="flex items-center gap-1" role="img" aria-label={`Rated ${active.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <Star
                          key={starIndex}
                          aria-hidden
                          className={`size-5 ${
                            starIndex < active.rating
                              ? "fill-gold-500 text-gold-500"
                              : "fill-espresso-900/10 text-espresso-900/15"
                          }`}
                        />
                      ))}
                    </div>

                    <blockquote className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-espresso-800 sm:text-xl">
                      &ldquo;{active.quote}&rdquo;
                    </blockquote>

                    <figcaption className="mt-5">
                      <p className="font-semibold text-espresso-900">{active.name}</p>
                      <p className="mt-0.5 text-sm font-medium uppercase tracking-[0.14em] text-rose-600">
                        {active.occasion}
                      </p>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              {/* Dots — 44px hit areas with small visual indicators */}
              <div className="mt-6 flex items-center justify-center">
                {testimonials.map((testimonial, dotIndex) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    onClick={() => goTo(dotIndex)}
                    aria-label={`Show testimonial ${dotIndex + 1} of ${testimonials.length}`}
                    aria-current={dotIndex === index}
                    className="flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                  >
                    <span
                      aria-hidden
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        dotIndex === index
                          ? "w-7 bg-rose-600"
                          : "w-2 bg-espresso-900/15 group-hover:bg-espresso-900/30 hover:bg-espresso-900/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
