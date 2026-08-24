import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Poppins } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

// Headings — elegant serif
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Body — clean, friendly sans-serif
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Script — logo + hero tagline accent ONLY, never body copy
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sweet Layers Cake Co. | Boutique Custom Cakes in Springfield",
    template: "%s | Sweet Layers Cake Co.",
  },
  description:
    "Bespoke celebration cakes handcrafted in small batches for weddings, birthdays, and every occasion worth savouring.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: siteConfig.businessName,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
