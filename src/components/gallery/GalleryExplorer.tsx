"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import nextDynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/types";
import { BRAND_BLUR_DATA_URL as BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";

import { EASE_OUT as easeOut } from "@/lib/animations";

/* Loaded on demand — keeps YARL + plugins out of the initial gallery bundle. */
const GalleryLightbox = nextDynamic(() => import("./GalleryLightbox"), { ssr: false });

type Filter = "All" | GalleryCategory;

export function GalleryExplorer({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filters = useMemo<Filter[]>(
    () => ["All", ...(Array.from(new Set(items.map((item) => item.category))) as GalleryCategory[])],
    [items],
  );

  const counts = useMemo(() => {
    const map = new Map<GalleryCategory, number>();
    for (const item of items) {
      map.set(item.category, (map.get(item.category) ?? 0) + 1);
    }
    return map;
  }, [items]);

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const slides = useMemo(
    () =>
      filtered.map((item) => ({
        src: item.imageUrl,
        title: item.title,
        description: `${item.category} — ${item.description}`,
        width: 800,
        height: 1000,
      })),
    [filtered],
  );

  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      {/* Category filter pills */}
      <div
        role="group"
        aria-label="Filter cakes by category"
        className="flex flex-wrap justify-center gap-2.5 sm:gap-3"
      >
        {filters.map((option) => {
          const isActive = option === filter;
          const count = option === "All" ? items.length : (counts.get(option) ?? 0);
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={isActive}
              className={`relative inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 ${
                isActive
                  ? ""
                  : "bg-white text-espresso-700 shadow-soft ring-1 ring-espresso-900/10 hover:text-rose-600 hover:ring-espresso-900/25"
              }`}
            >
              {isActive && (
                <motion.span
                  aria-hidden
                  layoutId="gallery-filter-pill"
                  className="absolute inset-0 rounded-full bg-espresso-900 shadow-card"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? "text-cream-50" : undefined}`}>
                {option}
                <span
                  className={`ml-1.5 text-xs tabular-nums ${
                    isActive ? "text-gold-300" : "text-espresso-400"
                  }`}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo grid */}
      <motion.div
        layout
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.4,
                  ease: easeOut,
                  delay: Math.min(index * 0.04, 0.24),
                },
              }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18, ease: "easeIn" } }}
              transition={{ layout: { duration: 0.45, ease: easeOut } }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`View ${item.title} larger`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl text-left shadow-soft ring-1 ring-espresso-900/5 transition-shadow duration-300 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 2rem)"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                />

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/15 to-transparent"
                />

                <span
                  aria-hidden
                  className="absolute right-4 top-4 flex size-10 translate-y-1 items-center justify-center rounded-full bg-cream-50/90 text-espresso-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                >
                  <ArrowUpRight className="size-5" />
                </span>

                {/* Persistent caption so info stays visible on touch devices */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-serif text-lg text-cream-50">{item.title}</h3>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm font-medium text-espresso-400">
          Nothing in this category yet — ask us about it!
        </p>
      )}

      {/* Full-screen lightbox (keyboard arrows / Esc / swipe supported) */}
      <GalleryLightbox
        open={openIndex !== null}
        index={openIndex ?? 0}
        slides={slides}
        onClose={closeLightbox}
      />
    </>
  );
}
