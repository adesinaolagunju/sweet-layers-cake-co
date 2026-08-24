"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";

import { EASE_OUT as easeOut } from "@/lib/animations";

const actions = [
  {
    label: "Call",
    href: siteConfig.phone.href,
    Icon: Phone,
    external: false,
  },
  {
    label: "WhatsApp",
    href: siteConfig.whatsapp.href,
    Icon: MessageCircle,
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    Icon: Mail,
    external: false,
  },
];

/** Fixed quick-contact bar for phones — always one tap from an enquiry. */
export function MobileContactBar() {
  return (
    <motion.nav
      aria-label="Quick contact"
      initial={{ y: 96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: easeOut }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-espresso-900/10 bg-cream-50/95 pb-[env(safe-area-inset-bottom)] shadow-lift backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-3">
        {actions.map(({ label, href, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={label}
              className="flex min-h-14 flex-col items-center justify-center gap-1 text-espresso-700 transition-colors hover:bg-cream-100 hover:text-rose-600 active:bg-cream-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rose-500"
            >
              <Icon className="size-5" aria-hidden />
              <span className="text-[11px] font-semibold tracking-wide">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
