import type { Testimonial } from "@/types";

/**
 * Customer testimonials shown in carousels/cards across the site.
 * Maps 1:1 to a future CMS "Testimonial" collection.
 */
export const testimonials: Testimonial[] = [
  {
    id: "amara-josh-wedding",
    name: "Amara & Josh T.",
    rating: 5,
    quote:
      "Our wedding cake was almost too beautiful to cut — almost. Every tier was a different flavour, and every single one was perfect. Guests are still talking about it.",
    occasion: "Wedding Cake",
  },
  {
    id: "priya-60th-birthday",
    name: "Priya S.",
    rating: 5,
    quote:
      "The salted caramel espresso cake stole the show at my dad's 60th. Three separate guests asked who made it before the night was over.",
    occasion: "60th Birthday Cake",
  },
  {
    id: "danielle-baby-shower",
    name: "Danielle M.",
    rating: 5,
    quote:
      "Ordering was effortless — they listened, sketched ideas with me, and delivered something better than I had imagined. The reveal cake made everyone cry happy tears.",
    occasion: "Baby Shower Cake",
  },
  {
    id: "marcus-office-opening",
    name: "Marcus L.",
    rating: 4,
    quote:
      "Ordered a branded cake and 150 cupcakes for our office opening. Delivered right on time and looked sharp next to our signage. Would have loved more gluten-free cupcakes, but what we got was excellent.",
    occasion: "Corporate Event",
  },
  {
    id: "henderson-dino-birthday",
    name: "The Henderson Family",
    rating: 5,
    quote:
      "Our six-year-old took one look at the dino dig cake and declared it 'the best birthday in human history.' The buried candy fossils were a genius touch.",
    occasion: "Kids' Birthday Cake",
  },
  {
    id: "sofia-anniversary",
    name: "Sofia R.",
    rating: 5,
    quote:
      "The tasting box sold us instantly. On our tenth anniversary we ordered the Golden Vow tiers and it felt like reliving our wedding day, one delicious slice at a time.",
    occasion: "Anniversary Cake",
  },
  {
    id: "jordan-graduation-gf",
    name: "Jordan K.",
    rating: 5,
    quote:
      "As the gluten-free guest, I usually get fruit. Instead I got a rich chocolate celebration cake nobody could believe was GF — including me. Best graduation gift ever.",
    occasion: "Graduation Cake",
  },
  {
    id: "elena-chris-wedding-table",
    name: "Elena & Chris W.",
    rating: 5,
    quote:
      "From the first consultation to delivery day, everything was calm, kind, and organized — exactly what you want while planning a wedding. The dessert table was the highlight of the reception.",
    occasion: "Wedding Cake & Dessert Table",
  },
];
