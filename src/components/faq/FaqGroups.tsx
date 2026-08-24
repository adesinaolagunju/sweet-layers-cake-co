"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FaqItem } from "@/types";

import { EASE_OUT as easeOut } from "@/lib/animations";

export interface FaqGroupData {
  id: string;
  title: string;
  description: string;
  items: FaqItem[];
}

/**
 * Grouped accordion. Multiple panels may be open at once (skimmable),
 * with the very first question open by default so the interaction is obvious.
 */
export function FaqGroups({ groups }: { groups: FaqGroupData[] }) {
  const firstId = groups[0]?.items[0]?.id;
  const [openIds, setOpenIds] = useState<string[]>(firstId ? [firstId] : []);

  const toggle = (id: string) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id],
    );

  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`faq-group-${group.id}`}>
          <h2
            id={`faq-group-${group.id}`}
            className="font-serif text-xl font-semibold text-espresso-900 sm:text-2xl"
          >
            {group.title}
          </h2>
          <p className="mt-1 text-sm text-espresso-500">{group.description}</p>

          <div className="mt-5 space-y-3">
            {group.items.map((item) => {
              const isOpen = openIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-2xl bg-white transition-shadow duration-300 ${
                    isOpen
                      ? "shadow-card ring-1 ring-gold-300"
                      : "shadow-soft ring-1 ring-espresso-900/5 hover:ring-espresso-900/15"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      id={`faq-button-${item.id}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-cream-50/70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rose-500"
                    >
                      <span className="text-[15px] font-semibold leading-snug text-espresso-900 sm:text-base">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: easeOut }}
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                          isOpen ? "bg-gold-400 text-espresso-900" : "bg-cream-100 text-espresso-700"
                        }`}
                      >
                        <ChevronDown className="size-4" aria-hidden />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={`faq-panel-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-button-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: easeOut }}
                      >
                        <div className="border-t border-dashed border-espresso-900/10 px-6 py-5">
                          <p className="text-sm leading-relaxed text-espresso-600">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
