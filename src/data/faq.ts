import type { FaqItem } from "@/types";

/**
 * Frequently asked questions, shown on the FAQ page/section.
 * Ordered from "before you order" to "after you take it home".
 * `category` drives the grouped accordion layout on the FAQ page.
 */
export const faqs: FaqItem[] = [
  {
    id: "ordering-lead-time",
    category: "Ordering",
    question: "How far in advance should I place my order?",
    answer:
      "For custom cakes we recommend 3–4 weeks' notice, and 8–12 weeks for weddings — especially between May and September. That said, we keep a few last-minute slots open each week, so it never hurts to ask.",
  },
  {
    id: "cake-sizing",
    category: "Ordering",
    question: "What size cake do I need?",
    answer:
      "Our round tiers serve roughly: 6-inch → 10–12, 8-inch → 20–24, and 10-inch → 30–38 guests. A two-tier cake covers 40–50, and we're always happy to help you size up for dessert-table crowds who come back for seconds.",
  },
  {
    id: "tastings-consultations",
    category: "Ordering",
    question: "Do you offer tastings or design consultations?",
    answer:
      "Yes! Tasting boxes with six signature flavour pairings are $20 and fully credited toward your booking. Wedding consultations are complimentary, and design consults are always free no matter what you order.",
  },
  {
    id: "deposit-policy",
    category: "Ordering",
    question: "What's your deposit and payment policy?",
    answer:
      "A 25% deposit secures your date, with the balance due one week before pickup or delivery. Deposits are fully refundable up to 21 days before your event; after that they convert to store credit you can use within 12 months.",
  },
  {
    id: "delivery-pickup",
    category: "Delivery & Pickup",
    question: "Do you deliver, or is everything pickup?",
    answer:
      "Both! Pickup is free from our Springfield kitchen, or we can deliver within a 25-mile radius for a flat $25 fee (waived on orders over $500). Wedding cakes always include delivery, on-site assembly, and setup.",
  },
  {
    id: "storage-freshness",
    category: "Delivery & Pickup",
    question: "How should I store my cake, and how long will it keep?",
    answer:
      "Buttercream cakes are happiest at room temperature for up to 2 days — just keep them out of direct sunlight. Cakes with fresh fruit or whipped filling should be refrigerated, then rested 30 minutes before serving. Leftover slices freeze beautifully for up to 3 months (if they last that long).",
  },
  {
    id: "flavours",
    category: "Dietary & Flavours",
    question: "Which flavour combinations can I choose from?",
    answer:
      "Classics include vanilla bean, chocolate overload, strawberry bliss, salted caramel espresso, and lemon blueberry — plus seasonal rotations like pumpkin spice in autumn. Every tier can be a different flavour at no extra charge.",
  },
  {
    id: "gluten-free-options",
    category: "Dietary & Flavours",
    question: "Do you offer gluten-free cakes?",
    answer:
      "Yes — most of our flavours can be baked gluten-free with our dedicated GF flour blend for an additional $15. We bake gluten-free orders on separate days with fresh equipment to keep cross-contact risk as low as possible.",
  },
  {
    id: "vegan-options",
    category: "Dietary & Flavours",
    question: "Can you make vegan cakes that still taste amazing?",
    answer:
      "Absolutely. Our vegan sponge and plant-based buttercream come in vanilla bean, chocolate overload, and lemon cloud, and honestly, no one ever guesses. Vegan cupcakes are also available by the dozen.",
  },
  {
    id: "allergens",
    category: "Dietary & Flavours",
    question: "How do you handle nut allergies and other allergens?",
    answer:
      "We take allergies seriously and label every order clearly. Please note our kitchen does handle nuts, dairy, eggs, and wheat daily, so while we take careful precautions, we can't guarantee an allergen-free environment — we'll always be upfront about what we can safely do.",
  },
];
