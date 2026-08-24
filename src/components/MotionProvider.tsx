"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global framer-motion config. `reducedMotion="user"` makes every transform
 * and layout animation resolve instantly for visitors with the OS-level
 * "reduce motion" preference, while opacity fades still communicate state.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
