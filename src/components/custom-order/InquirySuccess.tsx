"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Mail, PartyPopper } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

import { EASE_OUT as easeOut } from "@/lib/animations";

interface ConfettiPiece {
  x: number;
  y: number;
  color: string;
  rotate: number;
}

/* Pre-baked burst — tasteful, ~10 pieces, plays once. */
const CONFETTI: ConfettiPiece[] = [
  { x: -78, y: -46, color: "#d4a24e", rotate: -140 },
  { x: 72, y: -58, color: "#c96f79", rotate: 120 },
  { x: -52, y: 44, color: "#c96f79", rotate: -90 },
  { x: 84, y: 38, color: "#d4a24e", rotate: 150 },
  { x: -92, y: 6, color: "#8a5a3b", rotate: 60 },
  { x: 94, y: -4, color: "#e9c9a0", rotate: -160 },
  { x: -30, y: -72, color: "#8a5a3b", rotate: 100 },
  { x: 34, y: 70, color: "#d4a24e", rotate: -120 },
  { x: -12, y: 82, color: "#c96f79", rotate: 80 },
  { x: 14, y: -86, color: "#e9c9a0", rotate: -60 },
];

const nextSteps: Array<{ icon: LucideIcon; text: string }> = [
  {
    icon: Mail,
    text: "We'll get back to you within 1–2 business days with ideas and an itemized quote.",
  },
  {
    icon: CalendarCheck,
    text: "If we're free on your date, your consultation and tasting can be booked right away.",
  },
  {
    icon: PartyPopper,
    text: "Approve the quote to lock in the date — no deposit until you're completely happy.",
  },
];

export function InquirySuccess({
  firstName,
  onReset,
}: {
  firstName: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-4 text-center" aria-live="polite">
      {/* Animated checkmark + confetti burst */}
      <div className="relative">
        {CONFETTI.map((piece, index) => (
          <motion.span
            key={index}
            aria-hidden
            className="absolute left-1/2 top-1/2 -ml-1 -mt-1 size-2 rounded-[2px]"
            style={{ backgroundColor: piece.color }}
            initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.4, 1, 0.3],
              x: piece.x,
              y: piece.y,
              rotate: piece.rotate,
            }}
            transition={{ duration: 1.1, delay: 0.35 + index * 0.04, ease: easeOut }}
          />
        ))}

        <div className="flex size-24 items-center justify-center rounded-full bg-gold-100 ring-1 ring-gold-300">
          <motion.svg
            viewBox="0 0 64 64"
            className="size-12"
            fill="none"
            role="img"
            aria-label="Request sent successfully"
          >
            <motion.circle
              cx={32}
              cy={32}
              r={28}
              stroke="#d4a24e"
              strokeWidth={3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: easeOut }}
            />
            <motion.path
              d="M20 33.5 L29 42 L45 24"
              stroke="#3a281d"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.45, duration: 0.35, ease: easeOut }}
            />
          </motion.svg>
        </div>
      </div>

      <h2 className="mt-8 font-serif text-3xl font-bold text-espresso-900 sm:text-4xl">
        Thanks{firstName ? `, ${firstName}` : ""} — request received!
      </h2>
      <p className="mt-3 max-w-md text-base leading-relaxed text-espresso-600">
        Your inquiry is on its way to the kitchen (Chioma reads these between buttercream
        batches).
      </p>

      <ul className="mt-8 w-full max-w-md space-y-4 text-left">
        {nextSteps.map((step, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.12, duration: 0.45, ease: easeOut }}
            className="flex items-start gap-3 rounded-2xl bg-cream-50 p-4 ring-1 ring-espresso-900/5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-gold-300">
              <step.icon className="size-4.5 text-gold-600" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed text-espresso-700">{step.text}</p>
          </motion.li>
        ))}
      </ul>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/gallery" variant="primary" size="lg">
          Browse the Gallery While You Wait
        </ButtonLink>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full px-5 py-3 text-sm font-semibold text-espresso-600 transition-colors hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        >
          Send another request
        </button>
      </div>
    </div>
  );
}
