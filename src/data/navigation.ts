/**
 * Primary navigation, shared by Header + Footer so routes stay in sync.
 * Route paths correspond to pages inside app/(site)/.
 */
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Menu & Pricing", href: "/menu" },
  { label: "Custom Order", href: "/custom-order" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
