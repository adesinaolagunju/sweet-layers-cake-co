import { Gem, HeartHandshake, PartyPopper, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface BrandValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: BrandValue[] = [
  {
    icon: HeartHandshake,
    title: "Handcrafted with Care",
    description:
      "Every sponge is mixed, baked, and frosted by human hands — no boxed mixes, no shortcuts we wouldn't serve our own families.",
  },
  {
    icon: Sprout,
    title: "Locally Sourced",
    description:
      "Eggs, dairy, and seasonal fruit come from farms within an hour of Springfield. Fresher inputs make a better crumb.",
  },
  {
    icon: PartyPopper,
    title: "Made to Celebrate You",
    description:
      "No catalogue cakes here. Every design starts with your story and ends as something nobody else on earth owns.",
  },
  {
    icon: Gem,
    title: "Every Detail Matters",
    description:
      "Level tiers, tempered chocolate, hand-piped borders — the details you notice, and especially the ones you don't.",
  },
];

export function ValuesGrid() {
  return (
    <section aria-labelledby="values-heading" className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What We Believe"
            title="Four things we'll never compromise"
            id="values-heading"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08} className="h-full">
              <div className="group h-full rounded-3xl bg-cream-50 p-7 ring-1 ring-espresso-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-card">
                <span className="flex size-14 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-gold-300">
                  <value.icon className="size-6 text-gold-600" aria-hidden />
                </span>
                <h3 className="mt-5 font-serif text-lg font-semibold text-espresso-900">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-espresso-600">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
