/**
 * Sweet Layers Cake Co. — Content Types
 *
 * These interfaces define the shape of every piece of page content.
 * Each record carries a stable `id` (slug) so the data can later move to a
 * headless CMS without changing how components reference it.
 */

/** Star rating constrained to whole values 1–5. */
export type StarRating = 1 | 2 | 3 | 4 | 5;

/** Gallery filter buckets shown as tabs/chips on the gallery page. */
export type GalleryCategory = "Birthday" | "Wedding" | "Corporate" | "Custom & Novelty";

export interface GalleryItem {
  /** Stable slug — React key, deep links, future CMS document id. */
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  /** Descriptive text for screen readers and SEO. */
  altText: string;
  /** One-line story shown in the lightbox caption. */
  description: string;
}

export interface Testimonial {
  id: string;
  /** Customer name as it should appear publicly, e.g. "Amara & Josh T.". */
  name: string;
  rating: StarRating;
  quote: string;
  /** What they ordered, e.g. "Wedding Cake". */
  occasion: string;
}

/** Buckets used to group FAQs on the FAQ page. */
export type FaqCategory = "Ordering" | "Delivery & Pickup" | "Dietary & Flavours";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** Grouping bucket on the FAQ page. */
  category?: FaqCategory;
}

/** One purchasable size/format with its servings estimate and base price. */
export interface MenuItemOption {
  /** Human-readable size label, e.g. "8-inch round" or "Dozen (12)". */
  label: string;
  /** Servings guidance, e.g. "Serves 20–24". Omit for cupcakes. */
  servings?: string;
  /** Starting price in USD. Final quotes may vary with design complexity. */
  priceFrom: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  sizeOptions: MenuItemOption[];
  /** Convenience copy of the lowest `priceFrom`, for "from $X" labels. */
  startingPrice: number;
  /** Flagged items earn a subtle "Popular" badge on the menu page. */
  popular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  /** Short blurb shown above the category's menu items. */
  description: string;
  items: MenuItem[];
}

export interface BusinessHoursEntry {
  /** Day or range, e.g. "Tuesday – Friday". */
  days: string;
  /** Display hours, e.g. "10:00 AM – 6:00 PM". */
  hours: string;
}

export interface SocialLink {
  /** Platform name, e.g. "Instagram". */
  platform: string;
  url: string;
}

export interface PostalAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface ContactChannel {
  /** Formatted for display, e.g. "(555) 123-4567". */
  display: string;
  /** Clickable value, e.g. "tel:+15551234567" or "https://wa.me/15551234567". */
  href: string;
}

export interface MapsInfo {
  latitude: number;
  longitude: number;
  /** API-key-less iframe src, e.g. "https://www.google.com/maps?q=LAT,LNG&output=embed". */
  embedUrl: string;
}

export interface SiteConfig {
  businessName: string;
  /** Short form for tight spaces, e.g. header logo lockup. */
  shortName: string;
  /** Production origin, no trailing slash — canonicals, sitemap, JSON-LD. */
  url: string;
  /** Hero tagline — the one place (besides the logo) allowed in script font. */
  tagline: string;
  phone: ContactChannel;
  whatsapp: ContactChannel;
  email: string;
  address: PostalAddress;
  businessHours: BusinessHoursEntry[];
  socialLinks: SocialLink[];
  maps: MapsInfo;
}

/** A person featured on the About page. */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** Short first-person quote shown beneath their portrait. */
  quote: string;
  imageUrl: string;
  imageAlt: string;
}

/** A flavour or filling choice with a short tasting note. */
export interface FlavorOption {
  name: string;
  /** Tasting note or surcharge hint, e.g. "+ $25 per tier". */
  note?: string;
}

/** Grouped flavour choices shown in the Menu page reference section. */
export interface FlavorGroup {
  id: string;
  title: string;
  /** One-line blurb shown inside the accordion panel. */
  description: string;
  options: FlavorOption[];
}

/** Payload submitted by the custom order inquiry form (see /api/inquiry). */
export interface InquiryPayload {
  occasion: string;
  /** ISO date string, e.g. "2026-09-12". */
  eventDate: string;
  servings: string;
  /** Optional budget guidance selected by the customer. */
  budget?: string;
  flavors: string[];
  description: string;
  /** Filenames of optional inspiration photos (binaries stay client-side in v1). */
  photoNames?: string[];
  contactName: string;
  email: string;
  phone?: string;
  preferredContact: "email" | "phone" | "whatsapp";
}

/** Payload submitted by the general contact form (see /api/contact). */
export interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
}
