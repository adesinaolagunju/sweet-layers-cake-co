"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FlavorGroup } from "@/types";

import { EASE_OUT as easeOut } from "@/lib/animations";

export function FlavorAccordion({ groups }: { groups: FlavorGroup[] }) {
  const firstId = groups[0]?.id;
  const [openIds, setOpenIds] = useState<string[]>(firstId ? [firstId] : []);

  const toggle = (id: string) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id],
    );

  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-4">
      {groups.map((group) => {
        const isOpen = openIds.includes(group.id);
        return (
          <div
            key={group.id}
            className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-espresso-900/5"
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(group.id)}
                aria-expanded={isOpen}
                aria-controls={`flavor-panel-${group.id}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rose-500"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-serif text-lg font-semibold text-espresso-900">
                    {group.title}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-espresso-400">
                    {group.options.length} options
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cream-100 text-espresso-700"
                >
                  <ChevronDown className="size-4" aria-hidden />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={`flavor-panel-${group.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <div className="border-t border-dashed border-espresso-900/10 px-6 pb-6 pt-5">
                    <p className="text-xs italic leading-relaxed text-espresso-400">
                      {group.description}
                    </p>
                    <dl className="mt-4 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                      {group.options.map((option) => (
                        <div
                          key={option.name}
                          className="flex items-baseline justify-between gap-3"
                        >
                          <dt className="text-sm font-medium text-espresso-800">{option.name}</dt>
                          <dd className="text-right text-xs leading-snug text-espresso-400">
                            {option.note}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
