"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, CakeSlice, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";

import { EASE_OUT as easeOut } from "@/lib/animations";
import { cn } from "@/lib/utils";

const SHRINK_AT = 32;
const RESTORE_AT = 8;

const displayLinks = navLinks.map((link) => ({
  ...link,
  label: link.shortLabel ?? link.label,
}));

const primaryLinks = displayLinks.filter(
  ({ href }) => href !== "/" && href !== "/contact" && href !== "/custom-order",
);

const headerSurface = {
  top: {
    backgroundColor: "rgba(253, 250, 244, 0.88)",
    boxShadow: "0 0 0 0 rgba(43, 28, 18, 0)",
    borderColor: "rgba(43, 28, 18, 0)",
  },
  scrolled: {
    backgroundColor: "rgba(253, 250, 244, 0.92)",
    boxShadow: "0 10px 30px -12px rgba(43, 28, 18, 0.12)",
    borderColor: "rgba(43, 28, 18, 0.08)",
  },
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled((prev) => (prev ? latest > RESTORE_AT : latest > SHRINK_AT));
  });

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    const hidden = document.querySelectorAll<HTMLElement>(
      "#main-content, #site-footer, [data-menu-overlay-hide]",
    );
    for (const el of hidden) el.setAttribute("inert", "");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      for (const el of hidden) el.removeAttribute("inert");
    };
  }, [open]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-espresso-900 focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream-50"
      >
        Skip to content
      </a>

      <motion.header
        initial={false}
        animate={scrolled ? headerSurface.scrolled : headerSurface.top}
        transition={{ duration: 0.35, ease: easeOut }}
        className="sticky top-0 z-50 border-b backdrop-blur-md"
      >
        <Container>
          <motion.div
            initial={false}
            animate={{ height: scrolled ? 64 : 80 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="flex items-center justify-between gap-3 sm:gap-4"
          >
            <Link
              href="/"
              aria-label="Sweet Layers Cake Co. — home"
              className="flex shrink-0 items-center gap-2 rounded-full pr-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
            >
              <CakeSlice className="size-7 shrink-0 text-rose-500 sm:size-8" aria-hidden />
              <span className="flex flex-col leading-none">
                <span className="whitespace-nowrap font-script text-2xl text-espresso-900 sm:text-[1.6rem]">
                  Sweet Layers
                </span>
                <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.28em] text-espresso-500 sm:text-[10px]">
                  Cake Co.
                </span>
              </span>
            </Link>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-0.5 rounded-full border border-espresso-900/5 bg-white/55 p-1 shadow-soft ring-1 ring-espresso-900/5 backdrop-blur lg:flex"
            >
              {primaryLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full px-3.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500",
                      isActive
                        ? "bg-espresso-900 text-cream-50 shadow-soft"
                        : "text-espresso-700 hover:bg-white hover:text-rose-600",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <Link
                href="/contact"
                aria-label="Contact Sweet Layers"
                className="hidden size-11 items-center justify-center rounded-full text-espresso-700 transition-colors hover:bg-cream-100 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 lg:inline-flex"
              >
                <Mail className="size-5" aria-hidden />
              </Link>

              <ButtonLink
                href="/custom-order"
                size="sm"
                aria-current={pathname === "/custom-order" ? "page" : undefined}
                className="hidden whitespace-nowrap px-4 sm:inline-flex sm:px-5"
              >
                Order a Cake
                <ArrowUpRight className="size-4" aria-hidden />
              </ButtonLink>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex size-11 items-center justify-center rounded-full text-espresso-800 transition-colors hover:bg-cream-100 active:bg-cream-200 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
              >
                <span className="relative block h-6 w-6" aria-hidden>
                  <motion.span
                    initial={false}
                    animate={open ? { y: 0, rotate: 45 } : { y: -7, rotate: 0 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                    className="absolute inset-x-0 top-1/2 -mt-px block h-0.5 rounded-full bg-current"
                  />
                  <motion.span
                    initial={false}
                    animate={open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-x-0 top-1/2 -mt-px block h-0.5 rounded-full bg-current"
                  />
                  <motion.span
                    initial={false}
                    animate={open ? { y: 0, rotate: -45 } : { y: 7, rotate: 0 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                    className="absolute inset-x-0 top-1/2 -mt-px block h-0.5 rounded-full bg-current"
                  />
                </span>
              </button>
            </div>
          </motion.div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden
              className="fixed inset-0 z-[45] bg-espresso-950/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="fixed inset-y-0 right-0 z-[46] flex w-[min(22rem,88vw)] flex-col overflow-hidden bg-cream-50 shadow-lift lg:hidden"
            >
              <div className="flex-1 overflow-y-auto px-5 pb-8 pt-24">
                <p className="px-2 text-[10px] font-bold uppercase tracking-[0.22em] text-espresso-400">
                  Explore
                </p>
                <nav aria-label="Mobile" className="mt-3">
                  <ul className="grid grid-cols-2 gap-2">
                    {displayLinks.map((link, index) => {
                      const isActive = pathname === link.href;
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.06 + index * 0.03, duration: 0.3, ease: easeOut }}
                        >
                          <Link
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex min-h-12 items-center whitespace-nowrap rounded-xl px-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rose-500",
                              isActive
                                ? "bg-rose-100 text-rose-700"
                                : "bg-white/70 text-espresso-800 ring-1 ring-espresso-900/5 hover:bg-cream-100 hover:text-rose-600 active:bg-cream-200",
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="mt-8 rounded-2xl bg-cream-100/70 p-5 ring-1 ring-espresso-900/5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose-500">
                    Have something special in mind?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-espresso-600">
                    Share your idea and we&apos;ll help you plan the perfect cake.
                  </p>
                  <ButtonLink
                    href="/custom-order"
                    className="mt-4 w-full"
                    onClick={() => setOpen(false)}
                  >
                    Start an order
                    <ArrowUpRight className="size-4" aria-hidden />
                  </ButtonLink>
                </div>
              </div>

              <div className="border-t border-espresso-900/10 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-espresso-400">
                  Quick contact
                </p>
                <ul className="mt-3 space-y-1">
                  <li>
                    <a
                      href={siteConfig.phone.href}
                      className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-espresso-700 transition-colors hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                    >
                      <Phone className="size-4 shrink-0 text-rose-500" aria-hidden />
                      {siteConfig.phone.display}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-espresso-700 transition-colors hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                    >
                      <Mail className="size-4 shrink-0 text-rose-500" aria-hidden />
                      {siteConfig.email}
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
