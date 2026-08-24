"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";

/* Lucide dropped brand icons; these match its 24x24 style. */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.99 9.13-.03-.78-.06-1.97.02-2.82.07-.75.47-4.7.47-4.7s-.21-.42-.21-1.05c0-.98.57-1.71 1.28-1.71.6 0 .89.45.89 1 0 .61-.39 1.52-.59 2.36-.17.71.35 1.29 1.05 1.29 1.26 0 2.23-1.33 2.23-3.25 0-1.7-1.22-2.89-2.97-2.89-2.02 0-3.21 1.52-3.21 3.09 0 .61.24 1.27.53 1.63.06.07.07.14.05.21l-.2.81c-.03.13-.11.16-.25.1-.93-.43-1.51-1.79-1.51-2.88 0-2.34 1.7-4.49 4.91-4.49 2.58 0 4.58 1.84 4.58 4.29 0 2.56-1.62 4.63-3.86 4.63-.75 0-1.46-.39-1.7-.85l-.46 1.77c-.17.65-.62 1.46-.93 1.96.7.22 1.44.33 2.21.33 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

const icons: Record<string, (props: { className?: string }) => React.ReactNode> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Pinterest: PinterestIcon,
};

export function SocialLinks({ variant = "footer" }: { variant?: "footer" | "light" }) {
  const listClass = variant === "footer" ? "mt-6 flex gap-3" : "flex gap-3";
  const linkClass =
    variant === "footer"
      ? "flex size-11 items-center justify-center rounded-full text-cream-200 transition-colors hover:bg-espresso-800 hover:text-gold-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
      : "flex size-11 items-center justify-center rounded-full text-espresso-600 ring-1 ring-espresso-900/15 transition-all duration-200 hover:bg-cream-100 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500";

  return (
    <ul className={listClass}>
      {siteConfig.socialLinks.map(({ platform, url }) => {
        const Icon = icons[platform];
        return (
          <li key={platform}>
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.businessName} on ${platform}`}
              className={linkClass}
            >
              {Icon ? <Icon className="size-5" /> : null}
            </motion.a>
          </li>
        );
      })}
    </ul>
  );
}
