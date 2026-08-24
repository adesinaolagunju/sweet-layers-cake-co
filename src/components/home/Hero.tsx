"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Fragment, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

import { EASE_OUT as easeOut } from "@/lib/animations";

/** Word-by-word masked rise for the headline. */
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35 + index * 0.08, duration: 0.7, ease: easeOut }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/*
 * PLACEHOLDER IMAGERY: swap this URL for a real lifestyle cake photo
 * (e.g. /images/hero.jpg) when photography is available.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax drift, slower than the page scroll.
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Background photo — oversized so parallax + zoom never expose edges */}
      <motion.div style={{ y: backgroundY }} aria-hidden className="absolute inset-x-0 -top-[16%] h-[132%]">
        <motion.div
          animate={{ scale: [1, 1.07] }}
          transition={{ duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="relative h-full w-full will-change-transform"
        >
          <Image
            src="/cakes/butterfly-cake.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Legibility scrim + blend into the page background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-espresso-950/75 via-espresso-950/45 to-cream-50"
      />

      <Container className="relative z-10 flex flex-col items-center pb-28 pt-36 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: easeOut }}
          className="font-script text-3xl text-gold-300 sm:text-5xl"
        >
          Bespoke cakes, layered with love.
        </motion.p>

        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-bold leading-[1.05] text-cream-50 sm:text-6xl lg:text-7xl">
          <AnimatedHeadline text="Custom Cakes for Life's Sweetest Moments" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6, ease: easeOut }}
          className="mt-6 max-w-xl text-base text-cream-100/90 sm:text-lg"
        >
          Handcrafted in small batches for weddings, birthdays, and every milestone worth
          savouring — baked fresh, never rushed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6, ease: easeOut }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <ButtonLink href="/gallery" size="lg">
            View Our Cakes
          </ButtonLink>
          <ButtonLink href="/custom-order" variant="outlineLight" size="lg">
            Request a Custom Cake
          </ButtonLink>
        </motion.div>
      </Container>

      <motion.a
        href="#trust"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-11 items-center justify-center rounded-full border border-cream-50/40 bg-espresso-950/20 text-cream-100 backdrop-blur-sm transition-colors hover:bg-espresso-950/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
        >
          <ChevronDown className="size-5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
