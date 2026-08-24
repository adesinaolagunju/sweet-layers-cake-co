import { CalendarHeart, PenLine, Search, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: Search,
    title: "Browse & Inspire",
    description:
      "Wander the gallery and menu, and save everything that makes your heart skip.",
  },
  {
    icon: PenLine,
    title: "Request a Quote",
    description:
      "Tell us the occasion, date, and headcount — we reply within one business day, usually faster.",
  },
  {
    icon: CalendarHeart,
    title: "Consultation & Tasting",
    description:
      "Meet the bakers, taste six signature flavour pairings, and finalise your design together.",
  },
  {
    icon: Truck,
    title: "Delivery & Setup",
    description:
      "We deliver, assemble, and style your cake to the minute — you take all the credit.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="bg-cream-100 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The Process"
            title="Easy as cake"
            description="Four calm steps between craving and candle-blowing."
            id="how-it-works-heading"
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-12 md:grid-cols-4 md:gap-6">
          {/* Vertical connector (mobile) */}
          <div
            aria-hidden
            className="absolute bottom-8 left-8 top-8 w-px border-l-2 border-dashed border-rose-300 md:hidden"
          />
          {/* Horizontal connector (desktop) */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden border-t-2 border-dashed border-rose-300 md:block"
          />

          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.1} className="flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center">
                <div className="relative z-10 shrink-0">
                  <span className="flex size-16 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-espresso-900/5">
                    <step.icon className="size-7 text-rose-500" aria-hidden />
                  </span>
                  <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-gold-500 font-serif text-xs font-bold text-espresso-900 ring-2 ring-cream-100">
                    {index + 1}
                  </span>
                </div>
                <div className="pt-1 md:pt-5">
                  <h3 className="font-serif text-lg font-semibold text-espresso-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-espresso-600 md:mx-auto">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
