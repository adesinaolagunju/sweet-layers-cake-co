/**
 * Primary navigation, shared by Header + Footer so routes stay in sync.
 * Route paths correspond to pages inside app/(site)/.
 */
export interface NavLink {
  label: string;
  shortLabel?: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Menu & Pricing", shortLabel: "Menu", href: "/menu" },
  { label: "Custom Order", shortLabel: "Order", href: "/custom-order" },
  { label: "Testimonials", shortLabel: "Reviews", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
