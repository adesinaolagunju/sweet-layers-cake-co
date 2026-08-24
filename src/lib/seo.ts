import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

/**
 * Shared SEO helpers — every route composes its Metadata through here so
 * canonicals, Open Graph, and Twitter cards stay consistent.
 */
export const SITE_URL = siteConfig.url;

export const OG_IMAGE = {
  url: "/cakes/butterfly-cake.jpg",
  width: 1000,
  height: 1500,
  alt: "A whimsical celebration cake decorated with delicate butterfly accents — Sweet Layers Cake Co.",
} as const;

type PageMetaInput = {
  /** Page title; omit on the homepage to inherit the root default. */
  title?: string;
  description: string;
  /** Route path beginning with "/", used for canonical + og:url. */
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.businessName}` : `${siteConfig.businessName} | Boutique Custom Cakes`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.businessName,
      locale: "en_US",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
