/**
 * Sweet Layers Cake Co. — Design Tokens
 *
 * Documentation-first reference for the values every component should use.
 * These mirror the Tailwind v4 theme in src/app/globals.css — if you change
 * a value here, change it there too (and vice versa).
 */

/** Spacing scale — Tailwind's default 4px-base scale (p-4 = 1rem, etc.). */
export const spacing = {
  /** Component internals, icon gaps */ unit: "0.25rem",
  xs: "0.5rem", // gap between related items
  sm: "1rem", // stacked cards, list items
  md: "1.5rem", // card padding
  lg: "2rem", // within-section grouping
  xl: "4rem", // section padding-y (mobile)
  "2xl": "6rem", // section padding-y (desktop)
} as const;

/** Corner rounding — generous and soft; nothing sharp. */
export const radius = {
  sm: "0.5rem", // inputs, small chips        -> rounded-lg
  md: "0.75rem", // small images               -> rounded-xl
  lg: "1rem", // default cards                 -> rounded-2xl
  xl: "1.5rem", // feature cards, media frames -> rounded-3xl
  pill: "9999px", // all buttons + badges      -> rounded-full
} as const;

/** Elevation — soft warm shadows tinted with espresso, never pure black. */
export const shadows = {
  /** Resting state: inputs, subtle cards */
  soft: "0 2px 12px rgb(43 28 18 / 0.06)",
  /** Raised state: standard cards, sticky header on scroll */
  card: "0 10px 30px -6px rgb(43 28 18 / 0.10)",
  /** Emphasis: hover lift, modals/lightbox */
  lift: "0 20px 45px -12px rgb(43 28 18 / 0.16)",
} as const;

/** Shared motion settings so framer-motion animations feel consistent. */
export const motionTokens = {
  durationFast: 0.2,
  durationBase: 0.35,
  durationSlow: 0.6,
  easeOut: [0.16, 1, 0.3, 1] as const,
} as const;

/** Layout constants matching the Container component. */
export const layout = {
  maxWidth: "72rem", // max-w-6xl
  gutter: {
    mobile: "1rem", // px-4
    tablet: "1.5rem", // sm:px-6
    desktop: "2rem", // lg:px-8
  },
} as const;
