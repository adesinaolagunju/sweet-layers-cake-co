import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teamMembers } from "@/data/team";
import { Quote } from "lucide-react";
import Image from "next/image";
import { BRAND_BLUR_DATA_URL } from "@/lib/blur-placeholder";

export function TeamSection() {
  return (
    <section aria-labelledby="team-heading" className="bg-cream-50 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The People"
            title="Meet your bakers"
            description="Three humans, one sweet obsession, and an unreasonable number of sprinkles."
            id="team-heading"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {teamMembers.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.08} className="h-full">
              <article className="flex h-full flex-col items-center rounded-[1.75rem] bg-white p-8 text-center shadow-soft ring-1 ring-espresso-900/5 transition-shadow duration-300 hover:shadow-card">
                <div className="relative size-36 overflow-hidden rounded-full ring-4 ring-gold-200">
                  <Image
                    src={member.imageUrl}
                    alt={member.imageAlt}
                    fill
                    sizes="144px"
                    placeholder="blur"
                    blurDataURL={BRAND_BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-espresso-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                  {member.role}
                </p>
                <Quote
                  aria-hidden
                  className="mt-5 size-5 text-gold-400"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <p className="mt-2 flex-1 text-sm italic leading-relaxed text-espresso-600">
                  &ldquo;{member.quote}&rdquo;
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
