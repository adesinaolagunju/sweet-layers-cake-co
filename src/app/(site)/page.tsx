import { AboutTeaser } from "@/components/home/AboutTeaser";
import { CtaBanner } from "@/components/home/CtaBanner";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { TrustStrip } from "@/components/home/TrustStrip";
import { BakeryJsonLd } from "@/components/seo/BakeryJsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description:
    "Custom wedding, birthday, and celebration cakes handcrafted in small batches in Springfield. Browse the gallery, pick your flavours, and request a quote online.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <BakeryJsonLd />
      <Hero />
      <TrustStrip />
      <GalleryPreview />
      <AboutTeaser />
      <HowItWorks />
      <TestimonialCarousel />
      <CtaBanner />
    </>
  );
}
