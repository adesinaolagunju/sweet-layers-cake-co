import type { SiteConfig } from "@/types";

/**
 * Business identity & contact details, used by the header, footer,
 * contact page/section, and structured data (SEO).
 *
 * PLACEHOLDER VALUES: phone, WhatsApp, address, and map coordinates are
 * fictional stand-ins — swap in the real details before launch.
 */
export const siteConfig: SiteConfig = {
  businessName: "Sweet Layers Cake Co.",
  shortName: "Sweet Layers",
  // PLACEHOLDER domain — swap for the real production URL before launch.
  url: "https://www.sweetlayerscake.co",
  tagline: "Bespoke cakes, layered with love.",
  phone: {
    display: "(555) 123-4567",
    href: "tel:+15551234567",
  },
  whatsapp: {
    display: "+1 (555) 123-4567",
    href: "https://wa.me/15551234567",
  },
  email: "hello@sweetlayerscake.co",
  address: {
    line1: "123 Baker Street",
    line2: "Suite 4",
    city: "Springfield",
    state: "IL",
    zip: "62704",
  },
  businessHours: [
    { days: "Tuesday – Friday", hours: "10:00 AM – 6:00 PM" },
    { days: "Saturday", hours: "9:00 AM – 4:00 PM" },
    { days: "Sunday & Monday", hours: "By appointment" },
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/sweetlayerscakes" },
    { platform: "Facebook", url: "https://facebook.com/sweetlayerscakes" },
    { platform: "Pinterest", url: "https://pinterest.com/sweetlayerscakes" },
  ],
  maps: {
    // Placeholder coordinates (Springfield, IL area) — replace with the real
    // storefront listing coordinates before launch.
    latitude: 39.7817,
    longitude: -89.6501,
    embedUrl:
      "https://www.google.com/maps?q=39.7817,-89.6501&z=15&output=embed",
  },
};
