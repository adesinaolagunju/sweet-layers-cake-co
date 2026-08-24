import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function StorySection() {
  return (
    <section aria-labelledby="story-heading" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              How It Started
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight text-espresso-900 sm:text-4xl">
              One oven, a borrowed kitchen, and Grandma Ify&apos;s notebook
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-espresso-600">
              <p>
                In the spring of 2015, Chioma baked her first paid cake — lemon blueberry, for a
                coworker who insisted on paying &ldquo;real money.&rdquo; She used her grandmother
                Ify&apos;s handwritten sponge recipe, a borrowed church kitchen after Sunday
                service, and every mixing bowl she owned. That Saturday, her little farmers-market
                stall sold out by 10 a.m., and a business accidentally began.
              </p>
              <p>
                The way we bake hasn&apos;t changed much since. Butter, never margarine. Vanilla
                beans, scraped by hand. Layers baked the morning they&apos;re collected — never
                frozen, never waiting under a fluorescent display case. If a recipe wouldn&apos;t
                pass Grandma Ify&apos;s taste test, it doesn&apos;t leave our kitchen.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <blockquote className="my-10 text-center">
              <p className="font-script text-3xl leading-snug text-espresso-800 sm:text-4xl">
                &ldquo;People forget the napkins. Nobody forgets the cake.&rdquo;
              </p>
              <cite className="mt-3 block text-xs font-semibold uppercase not-italic tracking-[0.18em] text-espresso-400">
                — Ify, circa forever
              </cite>
            </blockquote>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="space-y-5 text-base leading-relaxed text-espresso-600">
              <p>
                Big bakeries will happily sell you a cake off the shelf. We start with a
                conversation instead — your grandmother&apos;s lemon curd, the song that played
                during the proposal, the exact blush of the bridesmaids&apos; dresses. Those
                details become the brief, and the brief becomes buttercream.
              </p>
              <p>
                Because dessert isn&apos;t the end of the party. It&apos;s the moment everyone
                leans in. We just make sure it&apos;s worth leaning in for.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
