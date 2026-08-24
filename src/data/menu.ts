import type { FlavorGroup, MenuCategory } from "@/types";

/**
 * Cake menu, grouped by category. Prices are "starting from" values in USD;
 * final quotes vary with design complexity. Maps 1:1 to a future CMS
 * "Menu Category" → "Menu Item" collection pair.
 */
export const menu: MenuCategory[] = [
  {
    id: "birthday",
    name: "Birthday Cakes",
    description:
      "Layer cakes that make a wish worth making. Pick a flavour, pick a size — we'll handle the wow.",
    items: [
      {
        id: "classic-confetti",
        name: "Classic Confetti",
        description:
          "Fluffy vanilla bean layers loaded with rainbow sprinkles and whipped vanilla buttercream.",
        sizeOptions: [
          { label: "6-inch round", servings: "Serves 10–12", priceFrom: 65 },
          { label: "8-inch round", servings: "Serves 20–24", priceFrom: 95 },
          { label: "10-inch round", servings: "Serves 30–38", priceFrom: 135 },
        ],
        startingPrice: 65,
        popular: true,
      },
      {
        id: "chocolate-overload",
        name: "Chocolate Overload",
        description:
          "Triple cocoa cake, fudge filling, chocolate buttercream, and chocolate shards. No regrets.",
        sizeOptions: [
          { label: "6-inch round", servings: "Serves 10–12", priceFrom: 70 },
          { label: "8-inch round", servings: "Serves 20–24", priceFrom: 100 },
          { label: "10-inch round", servings: "Serves 30–38", priceFrom: 140 },
        ],
        startingPrice: 70,
      },
      {
        id: "strawberry-bliss",
        name: "Strawberry Bliss",
        description:
          "Golden sponge with fresh strawberry compote and mascarpone whipped frosting.",
        sizeOptions: [
          { label: "6-inch round", servings: "Serves 10–12", priceFrom: 75 },
          { label: "8-inch round", servings: "Serves 20–24", priceFrom: 105 },
          { label: "10-inch round", servings: "Serves 30–38", priceFrom: 145 },
        ],
        startingPrice: 75,
      },
      {
        id: "salted-caramel-espresso",
        name: "Salted Caramel Espresso",
        description:
          "Espresso-soaked chocolate layers, salted caramel filling, and espresso ganache.",
        sizeOptions: [
          { label: "6-inch round", servings: "Serves 10–12", priceFrom: 80 },
          { label: "8-inch round", servings: "Serves 20–24", priceFrom: 115 },
          { label: "10-inch round", servings: "Serves 30–38", priceFrom: 155 },
        ],
        startingPrice: 80,
      },
      {
        id: "lemon-blueberry-sunrise-menu",
        name: "Lemon Blueberry Sunrise",
        description:
          "Zesty lemon curd and wild blueberry layers under pale lemon buttercream clouds.",
        sizeOptions: [
          { label: "6-inch round", servings: "Serves 10–12", priceFrom: 75 },
          { label: "8-inch round", servings: "Serves 20–24", priceFrom: 105 },
          { label: "10-inch round", servings: "Serves 30–38", priceFrom: 145 },
        ],
        startingPrice: 75,
      },
    ],
  },
  {
    id: "wedding",
    name: "Wedding & Tiered Cakes",
    description:
      "Fully custom tiers for the biggest yes of your life. Every booking includes a tasting box, design consultation, delivery, and setup.",
    items: [
      {
        id: "timeless-ivory-tiers",
        name: "Timeless Ivory Tiers",
        description:
          "Smooth ivory buttercream with delicate piping — the classic white wedding cake, perfected.",
        sizeOptions: [
          { label: "Two-tier", servings: "Serves 40–50", priceFrom: 450 },
          { label: "Three-tier", servings: "Serves 75–90", priceFrom: 750 },
          { label: "Four-tier", servings: "Serves 110–130", priceFrom: 1050 },
        ],
        startingPrice: 450,
        popular: true,
      },
      {
        id: "garden-romance-tiers",
        name: "Garden Romance Tiers",
        description:
          "Fresh florals and pressed botanicals over lemon elderflower or vanilla bean layers.",
        sizeOptions: [
          { label: "Two-tier", servings: "Serves 40–50", priceFrom: 480 },
          { label: "Three-tier", servings: "Serves 75–90", priceFrom: 790 },
          { label: "Four-tier", servings: "Serves 110–130", priceFrom: 1090 },
        ],
        startingPrice: 480,
      },
      {
        id: "modern-metallic-tiers",
        name: "Modern Metallic Tiers",
        description:
          "Brushed gold or rose-gold accents on sleek textured buttercream for contemporary celebrations.",
        sizeOptions: [
          { label: "Two-tier", servings: "Serves 40–50", priceFrom: 500 },
          { label: "Three-tier", servings: "Serves 75–90", priceFrom: 820 },
          { label: "Four-tier", servings: "Serves 110–130", priceFrom: 1120 },
        ],
        startingPrice: 500,
      },
    ],
  },
  {
    id: "custom",
    name: "Custom & Novelty",
    description:
      "Sculpted, painted, and one-of-a-kind creations. Share your idea — wilder is welcome.",
    items: [
      {
        id: "fully-bespoke-design",
        name: "Fully Bespoke Design",
        description:
          "A one-of-a-kind sculpted cake designed with you from sketch to slice. Final quote follows your free consultation.",
        sizeOptions: [
          { label: "Single-tier sculpted", servings: "Serves 15–20", priceFrom: 180 },
          { label: "Two-tier sculpted", servings: "Serves 35–45", priceFrom: 380 },
          { label: "Showstopper (3+ tiers)", servings: "Serves 60+", priceFrom: 650 },
        ],
        startingPrice: 180,
      },
      {
        id: "photo-print-cake",
        name: "Photo Print Cake",
        description:
          "Your favourite photo printed in edible ink over smooth fondant — portraits, pets, places, memes welcome.",
        sizeOptions: [
          { label: "6-inch round", servings: "Serves 10–12", priceFrom: 85 },
          { label: "8-inch round", servings: "Serves 20–24", priceFrom: 110 },
          { label: "10-inch round", servings: "Serves 30–38", priceFrom: 150 },
        ],
        startingPrice: 85,
      },
      {
        id: "novelty-character-cake",
        name: "Novelty Character Cake",
        description:
          "Hand-modelled characters and themed details for birthdays that deserve a standing ovation.",
        sizeOptions: [
          { label: "Medium", servings: "Serves 15–20", priceFrom: 160 },
          { label: "Large", servings: "Serves 25–30", priceFrom: 220 },
        ],
        startingPrice: 160,
      },
    ],
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    description:
      "All the charm of our layer cakes in grab-and-go form. Mix and match flavours within any dozen.",
    items: [
      {
        id: "signature-dozen",
        name: "Signature Cupcakes",
        description:
          "Our classic lineup in cupcake form — vanilla bean, chocolate overload, salted caramel espresso, and rotating seasonal flavours.",
        sizeOptions: [
          { label: "Dozen (12)", priceFrom: 42 },
          { label: "Two dozen (24)", priceFrom: 78 },
        ],
        startingPrice: 42,
      },
      {
        id: "mini-two-dozen",
        name: "Mini Cupcakes",
        description:
          "Two-bite versions of any signature flavour — perfect for dessert tables and office trays.",
        sizeOptions: [
          { label: "Two dozen minis (24)", priceFrom: 36 },
          { label: "Four dozen minis (48)", priceFrom: 66 },
        ],
        startingPrice: 36,
      },
      {
        id: "cupcake-tower",
        name: "Cupcake Tower",
        description:
          "A styled tower of cupcakes crowned with a small cutting cake — big-party presence without the cake-cutting ceremony.",
        sizeOptions: [
          { label: "50 cupcakes + 6\" cake", priceFrom: 185 },
          { label: "75 cupcakes + 6\" cake", priceFrom: 265 },
          { label: "100 cupcakes + 8\" cake", priceFrom: 330 },
        ],
        startingPrice: 185,
      },
    ],
  },
];

/**
 * Flavour & filling reference shown on the Menu page. Notes are short
 * tasting descriptors; "+" values indicate typical surcharges applied
 * during quoting, not fixed prices.
 */
export const flavorGroups: FlavorGroup[] = [
  {
    id: "sponges",
    title: "Signature Sponges",
    description: "Every cake starts here — baked fresh the morning of pickup.",
    options: [
      { name: "Vanilla Bean", note: "Madagascan pods, scraped by hand" },
      { name: "Double Chocolate", note: "Triple cocoa, deeply fudgy" },
      { name: "Lemon Bliss", note: "Zest folded through the crumb" },
      { name: "Red Velvet", note: "Buttermilk-tender, hint of cocoa" },
      { name: "Marble Swirl", note: "Vanilla & chocolate ribbons" },
      { name: "Funfetti", note: "Rainbow sprinkles baked in" },
      { name: "Chai Spice", note: "Cardamom, cinnamon & ginger" },
      { name: "Espresso", note: "A shot in every layer" },
    ],
  },
  {
    id: "fillings",
    title: "Fillings",
    description: "Pick one per tier — or mix two for the best of both.",
    options: [
      { name: "Raspberry Preserve", note: "Bright & just tart enough" },
      { name: "Salted Caramel", note: "House-made, flaky-salt finish" },
      { name: "Fresh Strawberry", note: "Macerated seasonal berries" },
      { name: "Cookies & Cream", note: "Crunchy cookie rubble" },
      { name: "Chocolate Ganache", note: "Silky dark 70%" },
      { name: "Lemon Curd", note: "Ify's recipe — sharp & sunny" },
      { name: "Hazelnut Praline", note: "Roasted, ground & caramelised" },
      { name: "Coconut Cream", note: "Toasted flakes & whipped cream" },
    ],
  },
  {
    id: "frostings-finishes",
    title: "Frostings & Finishes",
    description: "The outside counts too. Buttercream is included; artistry is quoted.",
    options: [
      { name: "Swiss Meringue Buttercream", note: "Silky, never too sweet" },
      { name: "Chocolate Fudge Frosting", note: "Rich & glossy" },
      { name: "Cream Cheese Frosting", note: "Tangy classic pairing" },
      { name: "Fondant Finish", note: "+ $25 per tier, porcelain-smooth" },
      { name: "Hand-Painted Details", note: "+ from $40, edible pigments" },
      { name: "Sugar Flower Bouquet", note: "+ from $15 per bloom" },
    ],
  },
];
