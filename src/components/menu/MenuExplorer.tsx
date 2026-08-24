"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { MenuCategory } from "@/types";

import { EASE_OUT as easeOut } from "@/lib/animations";

export function MenuExplorer({ categories }: { categories: MenuCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const active = categories.find((category) => category.id === activeId) ?? categories[0];

  return (
    <div>
      {/* Segmented category tabs */}
      <div
        role="tablist"
        aria-label="Cake categories"
        className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full bg-white p-1.5 shadow-soft ring-1 ring-espresso-900/10"
      >
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={`menu-tab-${category.id}`}
              aria-selected={isActive}
              aria-controls={`menu-panel-${category.id}`}
              onClick={() => setActiveId(category.id)}
              className={`relative inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 sm:px-5 ${
                isActive ? "text-cream-50" : "text-espresso-700 hover:text-rose-600"
              }`}
            >
              {isActive && (
                <motion.span
                  aria-hidden
                  layoutId="menu-tab-indicator"
                  className="absolute inset-0 rounded-full bg-espresso-900 shadow-card"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Animated panel swap */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          role="tabpanel"
          id={`menu-panel-${active.id}`}
          aria-labelledby={`menu-tab-${active.id}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          <p className="mx-auto mt-8 max-w-xl text-center text-sm italic leading-relaxed text-espresso-500">
            {active.description}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {active.items.map((item) => (
              <article
                key={item.id}
                className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-espresso-900/5 transition-shadow duration-300 hover:shadow-card"
              >
                {item.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-espresso-900 shadow-card">
                    Popular
                  </span>
                )}

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-serif text-xl font-semibold text-espresso-900">
                    {item.name}
                  </h3>
                  <p className="shrink-0 font-serif text-lg font-semibold text-rose-600">
                    from ${item.startingPrice}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-espresso-600">{item.description}</p>

                {/* Restaurant-style dotted leaders keep pricing elegant */}
                <ul className="mt-auto pt-5">
                  {item.sizeOptions.map((option) => (
                    <li key={option.label} className="flex items-baseline py-2">
                      <span className="text-sm font-medium text-espresso-800">
                        {option.label}
                        {option.servings && (
                          <span className="ml-2 text-xs font-normal text-espresso-400">
                            {option.servings}
                          </span>
                        )}
                      </span>
                      <span
                        aria-hidden
                        className="mx-3 min-w-6 flex-1 -translate-y-1 border-b border-dotted border-espresso-900/25"
                      />
                      <span className="shrink-0 font-serif text-sm text-espresso-700">
                        ${option.priceFrom}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
