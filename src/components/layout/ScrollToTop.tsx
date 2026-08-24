"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/lib/animations";

/**
 * Fades in after the visitor scrolls past roughly one viewport (the hero),
 * then smooth-scrolls back to the top on click.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          data-menu-overlay-hide
          initial={{ opacity: 0, y: 14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.85 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="fixed bottom-20 right-4 z-40 flex size-11 items-center justify-center rounded-full bg-espresso-900 text-cream-50 shadow-lift ring-1 ring-espresso-900/10 transition-colors duration-200 hover:bg-espresso-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 md:bottom-8 md:right-8"
        >
          <ArrowUp className="size-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
