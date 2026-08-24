import { pageMetadata } from "@/lib/seo";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { QuickContactForm } from "@/components/contact/QuickContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site-config";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Call, WhatsApp, email, or visit Sweet Layers Cake Co. in Springfield — or send a quick message and we'll reply within one business day.",
  path: "/contact",
});

const WHATSAPP_GREETING =
  "Hi Sweet Layers! I have a question about ordering a custom cake.";

interface ContactChannelCard {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  hint: string;
}

function buildChannels(): ContactChannelCard[] {
  return [
    {
      icon: Phone,
      label: "Call Us",
      value: siteConfig.phone.display,
      href: siteConfig.phone.href,
      hint: "During opening hours — a human always answers.",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteConfig.whatsapp.display,
      href: `${siteConfig.whatsapp.href}?text=${encodeURIComponent(WHATSAPP_GREETING)}`,
      external: true,
      hint: "Usually replies within the hour.",
    },
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      hint: "We reply within one business day.",
    },
  ];
}

const cardClass =
  "group flex h-full flex-col items-center rounded-3xl bg-white p-7 text-center shadow-soft ring-1 ring-espresso-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500";

const iconCircleClass =
  "flex size-14 items-center justify-center rounded-full bg-cream-100 text-espresso-700 ring-1 ring-espresso-900/10 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-espresso-900";

export default function ContactPage() {
  const channels = buildChannels();
  const address = siteConfig.address;
  const addressLine = `${address.line1}${address.line2 ? `, ${address.line2}` : ""} · ${address.city}, ${address.state} ${address.zip}`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.maps.latitude},${siteConfig.maps.longitude}`;

  return (
    <>
      {/* Header */}
      <section
        aria-labelledby="contact-page-heading"
        className="bg-cream-50 pb-16 pt-20 text-center sm:pb-20 sm:pt-24"
      >
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              Say Hello
            </p>
            <h1
              id="contact-page-heading"
              className="mx-auto mt-4 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-espresso-900 sm:text-5xl lg:text-6xl"
            >
              We&apos;d love to hear from you
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-espresso-600 sm:text-lg">
              A question about an order, a flavour idea, or just want to talk cake? Pick whichever
              door feels easiest — every one of them leads to a real person who bakes.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Channel cards */}
      <section aria-label="Ways to reach us" className="bg-white pb-16 pt-4 sm:pb-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel, index) => (
              <Reveal key={channel.label} delay={index * 0.07} className="h-full">
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`${cardClass} group`}
                >
                  <span className={iconCircleClass}>
                    <channel.icon className="size-6" aria-hidden />
                  </span>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso-400">
                    {channel.label}
                  </p>
                  <p className="mt-1 break-words text-base font-semibold text-espresso-900 transition-colors duration-300 group-hover:text-rose-600">
                    {channel.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-espresso-500">{channel.hint}</p>
                </a>
              </Reveal>
            ))}

            {/* Business hours (not a link) */}
            <Reveal delay={3 * 0.07} className="h-full">
              <div className={cardClass}>
                <span className={iconCircleClass}>
                  <Clock className="size-6" aria-hidden />
                </span>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso-400">
                  Opening Hours
                </p>
                <dl className="mt-2 w-full space-y-1.5 px-2">
                  {siteConfig.businessHours.map((entry) => (
                    <div key={entry.days} className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <dt className="text-xs text-espresso-500">{entry.days}</dt>
                      <dd className="text-xs font-semibold text-espresso-900">{entry.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Map + quick form */}
      <section aria-label="Find us or send a message" className="bg-white pb-24 sm:pb-32">
        <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card ring-1 ring-espresso-900/10 sm:aspect-[16/10]">
                <iframe
                  src={siteConfig.maps.embedUrl}
                  title={`Map showing ${siteConfig.businessName} at ${address.line1}, ${address.city}`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0"
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p className="flex items-center gap-2 text-sm text-espresso-600">
                  <MapPin className="size-4 shrink-0 text-gold-600" aria-hidden />
                  {addressLine}
                </p>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-rose-600 transition-colors hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                >
                  Get Directions
                </a>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[2rem] bg-cream-50 p-6 shadow-card ring-1 ring-espresso-900/5 sm:p-9">
              <h2 className="font-serif text-2xl font-semibold text-espresso-900">
                Send us a quick message
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-espresso-500">
                For general questions and hellos. Planning a custom cake?{" "}
                <a
                  href="/custom-order"
                  className="link-draw font-semibold text-rose-600 transition-colors hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                >
                  The inquiry form
                </a>{" "}
                gives us everything we need.
              </p>

              <div className="mt-7">
                <QuickContactForm />
              </div>

              <div className="mt-8 border-t border-dashed border-espresso-900/10 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso-400">
                  Follow the frosting
                </p>
                <SocialLinks variant="light" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
