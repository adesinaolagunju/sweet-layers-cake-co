import type { GalleryItem } from "@/types";

/**
 * Gallery portfolio — ~24 cakes across four categories.
 *
 * NOTE ON IMAGERY: photos live in /public/cakes. Only a handful of real
 * photos exist, so they're cycled across entries until per-design
 * photography is available — swap individual imageUrl values then.
 */
export const galleryItems: GalleryItem[] = [
  // ── Birthday ────────────────────────────────────────────────────────────────
  {
    id: "confetti-cloud-birthday",
    title: "Confetti Cloud",
    category: "Birthday",
    imageUrl: "/cakes/Birthday-Cake.jpeg",
    altText: "A layered birthday cake finished with swirled buttercream and sprinkles",
    description:
      "Fluffy vanilla layers stuffed with rainbow sprinkles under a cloud of pink buttercream. A birthday classic that makes every table brighter.",
  },
  {
    id: "midnight-espresso-drip",
    title: "Midnight Espresso Drip",
    category: "Birthday",
    imageUrl: "/cakes/Love-Cake.jpeg",
    altText: "A layered birthday cake finished with swirled buttercream and sprinkles",
    description:
      "Deep, dark chocolate layers with espresso buttercream and a glossy ganache drip. For the coffee-obsessed birthday star.",
  },
  {
    id: "strawberry-shortcake-stack",
    title: "Strawberry Shortcake Stack",
    category: "Birthday",
    imageUrl: "/cakes/celebration-cake.jpeg",
    altText: "An elegantly decorated celebration cake with romantic detailing",
    description:
      "Fresh-picked strawberries and whipped mascarpone between golden sponge layers — summer birthdays, sorted.",
  },
  {
    id: "rainbow-layer-surprise",
    title: "Rainbow Layer Surprise",
    category: "Birthday",
    imageUrl: "/cakes/two-cake.jpeg",
    altText: "A festive layer cake decorated for a special occasion",
    description:
      "A calm pastel exterior hiding six jewel-toned layers inside. Cut the first slice and watch faces light up.",
  },
  {
    id: "chocolate-hazelnut-royale",
    title: "Chocolate Hazelnut Royale",
    category: "Birthday",
    imageUrl: "/cakes/Mom-Cake.jpeg",
    altText: "Tall stacked cake layers showcasing the signature Sweet Layers finish",
    description:
      "Rich cocoa cake, hazelnut praline crunch, and silk-smooth frosting. Decadence is the whole point.",
  },
  {
    id: "caramel-apple-spice",
    title: "Caramel Apple Spice",
    category: "Birthday",
    imageUrl: "/cakes/house-cake.jpeg",
    altText: "A beautifully frosted cake styled as a heartfelt gift cake",
    description:
      "Cozy autumn spice cake layered with cinnamon apples and a salted caramel drizzle. Fall birthdays never had it so good.",
  },
  {
    id: "lemon-blueberry-sunrise",
    title: "Lemon Blueberry Sunrise",
    category: "Birthday",
    imageUrl: "/cakes/butterfly-cake.jpg",
    altText: "A sculpted novelty cake with playful custom detailing",
    description:
      "Zesty lemon curd meets wild blueberries in a sunshiny stack that tastes like a slow weekend morning.",
  },

  // ── Wedding ────────────────────────────────────────────────────────────────
  {
    id: "rose-garden-tiers",
    title: "Rose Garden Tiers",
    category: "Wedding",
    imageUrl: "/cakes/Fragrance-Home.jpeg",
    altText: "A whimsical cake decorated with delicate butterfly accents",
    description:
      "Three ivory tiers crowned with blush garden roses and delicate hand piping — our most requested wedding design.",
  },
  {
    id: "cherry-blossom-promise",
    title: "Cherry Blossom Promise",
    category: "Wedding",
    imageUrl: "/cakes/Birthday-Cake.jpeg",
    altText: "A hand-finished cake photographed in the Sweet Layers studio",
    description:
      "Hand-piped blossoms drift down soft almond-vanilla tiers like petals on a spring breeze.",
  },
  {
    id: "botanical-buttercream",
    title: "Botanical Buttercream",
    category: "Wedding",
    imageUrl: "/cakes/Love-Cake.jpeg",
    altText: "A layered birthday cake finished with swirled buttercream and sprinkles",
    description:
      "Pressed-flower styling over silky, herb-kissed buttercream for couples who want the garden at their reception.",
  },
  {
    id: "golden-vow-tiers",
    title: "Golden Vow Tiers",
    category: "Wedding",
    imageUrl: "/cakes/celebration-cake.jpeg",
    altText: "An elegantly decorated celebration cake with romantic detailing",
    description:
      "Champagne sponge with brushed gold accents — made for golden anniversaries and grand celebrations alike.",
  },
  {
    id: "ivory-lace-tiers",
    title: "Ivory Lace Tiers",
    category: "Wedding",
    imageUrl: "/cakes/two-cake.jpeg",
    altText: "A festive layer cake decorated for a special occasion",
    description:
      "Edible lace detailing inspired by vintage bridal gowns, wrapped around tender vanilla-bean tiers.",
  },
  {
    id: "wildflower-meadow-tiers",
    title: "Wildflower Meadow Tiers",
    category: "Wedding",
    imageUrl: "/cakes/Mom-Cake.jpeg",
    altText: "Tall stacked cake layers showcasing the signature Sweet Layers finish",
    description:
      "A meadow of sugar wildflowers blooming over lemon elderflower layers. Barefoot-elegance in cake form.",
  },
  {
    id: "champagne-pearls-tiers",
    title: "Champagne & Pearls",
    category: "Wedding",
    imageUrl: "/cakes/house-cake.jpeg",
    altText: "A beautifully frosted cake styled as a heartfelt gift cake",
    description:
      "Pearl-studded elegance with a whisper of champagne buttercream. Understated, unforgettable.",
  },

  // ── Corporate ──────────────────────────────────────────────────────────────
  {
    id: "brand-mark-celebration",
    title: "Brand Mark Celebration",
    category: "Corporate",
    imageUrl: "/cakes/butterfly-cake.jpg",
    altText: "A sculpted novelty cake with playful custom detailing",
    description:
      "Your logo rendered in crisp edible print over white fondant. Office parties just got on-brand.",
  },
  {
    id: "product-launch-showstopper",
    title: "Product Launch Showstopper",
    category: "Corporate",
    imageUrl: "/cakes/Fragrance-Home.jpeg",
    altText: "A whimsical cake decorated with delicate butterfly accents",
    description:
      "A sculpted centerpiece that mirrors your newest launch — because the cake should trend too.",
  },
  {
    id: "milestone-anniversary-cake",
    title: "Milestone Anniversary Cake",
    category: "Corporate",
    imageUrl: "/cakes/Birthday-Cake.jpeg",
    altText: "A hand-finished cake photographed in the Sweet Layers studio",
    description:
      "Ten years? Fifty? We'll tier it up in your brand colors with enough sparkle to mark the milestone.",
  },
  {
    id: "conference-coffee-break-cake",
    title: "Conference Coffee-Break Cake",
    category: "Corporate",
    imageUrl: "/cakes/Love-Cake.jpeg",
    altText: "A layered birthday cake finished with swirled buttercream and sprinkles",
    description:
      "Crowd-friendly sheet cake sized for the whole office — mocha, vanilla, or half-and-half. Meetings improve measurably.",
  },

  // ── Custom & Novelty ───────────────────────────────────────────────────────
  {
    id: "unicorn-meadow-fantasy",
    title: "Unicorn Meadow Fantasy",
    category: "Custom & Novelty",
    imageUrl: "/cakes/celebration-cake.jpeg",
    altText: "An elegantly decorated celebration cake with romantic detailing",
    description:
      "A magical mane of pastel rosettes and a shimmering golden horn, baked for little dreamers and big believers.",
  },
  {
    id: "dino-dig-adventure",
    title: "Dino Dig Adventure",
    category: "Custom & Novelty",
    imageUrl: "/cakes/two-cake.jpeg",
    altText: "A festive layer cake decorated for a special occasion",
    description:
      "Crumbly 'soil,' buried candy fossils, and roaming fondant dinos for budding paleontologists.",
  },
  {
    id: "gamers-quest-cake",
    title: "Gamer's Quest",
    category: "Custom & Novelty",
    imageUrl: "/cakes/Mom-Cake.jpeg",
    altText: "Tall stacked cake layers showcasing the signature Sweet Layers finish",
    description:
      "Pixel art, controller toppers, and level-up energy for the player of honor. Achievement unlocked.",
  },
  {
    id: "baby-reveal-cloud",
    title: "Baby Reveal Cloud",
    category: "Custom & Novelty",
    imageUrl: "/cakes/house-cake.jpeg",
    altText: "A beautifully frosted cake styled as a heartfelt gift cake",
    description:
      "A fluffy neutral cloud hiding a sweet pink or blue surprise inside. Cut carefully — everyone's watching.",
  },
  {
    id: "twenty-one-gold-glitz",
    title: "Twenty-One & Golden",
    category: "Custom & Novelty",
    imageUrl: "/cakes/butterfly-cake.jpg",
    altText: "A sculpted novelty cake with playful custom detailing",
    description:
      "Gold leaf, glitz, and bubbly-inspired vanilla bean layers. Twenty-one looks good already.",
  },
  {
    id: "pup-portrait-cake",
    title: "Pup Portrait Cake",
    category: "Custom & Novelty",
    imageUrl: "/cakes/Fragrance-Home.jpeg",
    altText: "A whimsical cake decorated with delicate butterfly accents",
    description:
      "A hand-painted tribute to the family's very good dog. Because they'd do it for you. Probably.",
  },
];
