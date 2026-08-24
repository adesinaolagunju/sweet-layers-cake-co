import { siteConfig } from "@/data/site-config";

/**
 * LocalBusiness "Bakery" structured data for rich results.
 * All values flow from site-config so SEO stays in sync with the footer
 * and contact page. Render once, in the homepage body.
 */
export function BakeryJsonLd() {
  const { businessName, tagline, phone, email, address, maps, socialLinks } =
    siteConfig;

  /* Map the human-readable hours into schema.org opening hours.
     "By appointment" days are intentionally omitted. */
  const openingHoursSpecification = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "16:00",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: businessName,
    description: `${tagline} Custom wedding, birthday, and celebration cakes baked in small batches.`,
    url: siteConfig.url,
    telephone: phone.display,
    email,
    image: `${siteConfig.url}/cakes/butterfly-cake.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.line2 ? `${address.line1}, ${address.line2}` : address.line1,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: maps.latitude,
      longitude: maps.longitude,
    },
    openingHoursSpecification,
    sameAs: socialLinks.map((social) => social.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
