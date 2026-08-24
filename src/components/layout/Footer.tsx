import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { NewsletterForm } from "./NewsletterForm";
import { SocialLinks } from "./SocialLinks";

const linkClasses =
  "inline-flex min-h-11 items-center text-sm text-cream-200/80 transition-colors hover:text-gold-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

const headingClasses = "text-xs font-semibold uppercase tracking-[0.22em] text-gold-300";

export function Footer() {
  const { businessName, address, businessHours, phone, whatsapp, email, maps, tagline } =
    siteConfig;
  const year = new Date().getFullYear();
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${maps.latitude},${maps.longitude}`;

  return (
    <footer id="site-footer" className="bg-espresso-900 text-cream-100">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1.15fr_1.2fr] lg:gap-10">
        <div>
          <p className="font-script text-3xl leading-none text-gold-300">{businessName}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/80">
            {tagline} Handcrafted in small batches for weddings, birthdays, and every occasion
            worth savouring.
          </p>
          <SocialLinks />
        </div>

        <nav aria-label="Footer">
          <h3 className={headingClasses}>Explore</h3>
          <ul className="mt-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className={headingClasses}>Visit Us</h3>
          <address className="mt-4 space-y-3 not-italic">
            <p className="flex items-start gap-2 text-sm text-cream-200/80">
              <MapPin className="mt-0.5 size-4 shrink-0 text-rose-400" aria-hidden />
              <span>
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}
                <br />
                {address.city}, {address.state} {address.zip}
              </span>
            </p>
            <p>
              <a
                href={phone.href}
                className={`gap-2 ${linkClasses}`}
              >
                <Phone className="size-4 shrink-0 text-rose-400" aria-hidden />
                {phone.display}
              </a>
            </p>
            <p>
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`gap-2 ${linkClasses}`}
              >
                <MessageCircle className="size-4 shrink-0 text-rose-400" aria-hidden />
                WhatsApp us
              </a>
            </p>
            <p>
              <a href={`mailto:${email}`} className={`gap-2 ${linkClasses}`}>
                <Mail className="size-4 shrink-0 text-rose-400" aria-hidden />
                {email}
              </a>
            </p>
          </address>

          {/* Map thumbnail — lazy-loaded embed, replace with static image if
              third-party iframe weight becomes a concern. */}
          <iframe
            title={`Map showing the ${businessName} bakery location`}
            src={maps.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-5 h-28 w-full rounded-xl border-0 ring-1 ring-cream-100/10"
          />
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClasses} mt-2 font-medium`}
          >
            Get directions →
          </a>
        </div>

        <div>
          <h3 className={headingClasses}>Hours</h3>
          <dl className="mt-4 space-y-2 text-sm">
            {businessHours.map((entry) => (
              <div key={entry.days} className="flex justify-between gap-4">
                <dt className="text-cream-200/60">{entry.days}</dt>
                <dd className="text-right text-cream-200/90">{entry.hours}</dd>
              </div>
            ))}
          </dl>

          <h3 className={`${headingClasses} mt-10`}>Sweet News</h3>
          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t border-cream-100/10">
        {/* Extra bottom padding on mobile clears the fixed contact bar. */}
        <Container className="flex flex-col items-center justify-between gap-2 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 text-xs text-cream-200/60 sm:flex-row md:pb-6">
          <p>
            © {year} {businessName}. All rights reserved.
          </p>
          <p>Baked with love, layered with care.</p>
        </Container>
      </div>
    </footer>
  );
}
