"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealTransition } from "@/lib/animations";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Initial upward offset in px. */
  y?: number;
  className?: string;
};

/** Fade-and-rise scroll reveal, fires once when the element enters view.
 *  Timing/easing come from lib/animations so the whole site moves in unison. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ ...revealTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
