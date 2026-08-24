"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { EASE_OUT as easeOut } from "@/lib/animations";

/** Five gold stars that pop in one-by-one when scrolled into view. */
export function AggregateStars({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.2, rotate: -35 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: index * 0.12, duration: 0.5, ease: easeOut }}
        >
          <Star className="size-7 fill-gold-500 text-gold-500 sm:size-8" aria-hidden />
        </motion.span>
      ))}
    </div>
  );
}
