import { pageMetadata } from "@/lib/seo";
import { CalendarCheck, Lock, Sparkles } from "lucide-react";
import { CustomOrderForm } from "@/components/custom-order/CustomOrderForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Custom Order Inquiry",
  description:
    "Tell us about your celebration — occasion, date, flavours, and inspiration — and Sweet Layers Cake Co. will reply with a personalized quote within 1–2 business days.",
  path: "/custom-order",
});

const assurances = [
  { icon: CalendarCheck, text: "Reply within 1–2 business days" },
  { icon: Sparkles, text: "Free design consultation & tasting guidance" },
  { icon: Lock, text: "No deposit until you approve the quote" },
];

export default function CustomOrderPage() {
  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="custom-order-heading"
        className="bg-cream-50 pb-14 pt-20 text-center sm:pb-16 sm:pt-24"
      >
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              Custom Orders
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-espresso-900 sm:text-5xl lg:text-6xl">
              Let&apos;s design something delicious
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-espresso-600 sm:text-lg">
              Three quick steps and we&apos;ll take it from there. Share as much or as little as
              you like — the wilder the idea, the more fun our job becomes.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The form */}
      <section aria-label="Custom order inquiry form" className="bg-cream-50 pb-16 sm:pb-20">
        <Container className="max-w-3xl">
          <Reveal>
            <CustomOrderForm />
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:flex-wrap sm:gap-x-8">
              {assurances.map((assurance) => (
                <li
                  key={assurance.text}
                  className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-espresso-500"
                >
                  <assurance.icon className="size-4 text-gold-600" aria-hidden />
                  {assurance.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
