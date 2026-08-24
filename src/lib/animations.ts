import type { Transition, Variants } from "framer-motion";

export type { Variants };

/**
 * Shared motion vocabulary for the whole site.
 * One easing curve, a few durations, a handful of variants — so every
 * page animates with the same timing personality.
 */

/** Signature easing: fast start, long soft landing. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  /** Micro-interactions: hovers, chevrons, chips. */
  fast: 0.25,
  /** Panel swaps, lightbox fades, page transitions. */
  base: 0.4,
  /** Scroll reveals — the site's default "arrive" feel. */
  reveal: 0.55,
} as const;

export const revealTransition: Transition = {
  duration: DURATION.reveal,
  ease: EASE_OUT,
};

/** Fade-and-rise — the standard scroll-reveal (matches <Reveal />). */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: revealTransition },
};

/** Pure fade — for elements that shouldn't move (overlays, images). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

/** Gentle pop — badges, icons, small accents. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

/** Parent container that staggers its `fadeInUp`-style children. */
export function staggerContainer(stagger = 0.07, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Direction-aware horizontal slide for step wizards / carousels. */
export function slidePanel(direction = 1, distance = 44): Variants {
  return {
    enter: { opacity: 0, x: direction >= 0 ? distance : -distance },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: direction >= 0 ? -distance : distance },
  };
}
