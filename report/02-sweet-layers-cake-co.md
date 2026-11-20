# 02 — Sweet Layers Cake Co. Deep Dive

Date: 2026-11-20

## What I did

- Read the build/config files, local instructions, route tree, shared data modules, type definitions, SEO helpers, form/API implementations, design tokens, and representative components.
- Mapped the route group, content model, client/server boundaries, form data flow, and styling conventions.
- Searched source for placeholders, TODOs, `console.*`, `process.env`, test files, and unused/shared helpers.
- Did not run lint/build/typecheck/tests because the task was read-only discovery and no application files were changed.

## Found

### Purpose and current state

Sweet Layers is a polished marketing/brochure site for a fictional boutique custom cake company. It is not an ecommerce storefront: cake prices are informational, and conversion paths are WhatsApp/contact/custom inquiry rather than cart/checkout. The site is visually rich but still has launch-blocking placeholders and integration stubs.

### Stack and commands

- `package.json`: private Next.js app named `sweet-layers-cake-co`, version `0.1.0`.
- Runtime: Next.js `16.3.2`, React/ReactDOM `19.2.8`.
- Animation/icons/lightbox: `framer-motion ^13.1.1`, `lucide-react ^1.34.0`, `yet-another-react-lightbox ^3.32.2`.
- Styling: Tailwind CSS v4 via `@tailwindcss/postcss ^4`; no `tailwind.config.*`, theme is CSS-first.
- Tooling: TypeScript `^5`, ESLint `^9`, `eslint-config-next 16.3.2`.
- Scripts (`package.json:5-10`): `dev`, `build`, `start`, `lint`. No `typecheck`, `format`, or test script.
- Lockfile present: `package-lock.json`.

### Local instructions and framework docs

- `AGENTS.md` warns that this Next version has breaking changes and requires reading relevant guides in `node_modules/next/dist/docs/` before writing any code.
- `node_modules/next/dist/docs/` contains `01-app/`, `02-pages/`, `03-architecture/`, `04-community/`, and `index.md`.
- `CLAUDE.md` contains only `@AGENTS.md`.
- `README.md` is still generic create-next-app boilerplate and does not describe the current app.

### Configuration and conventions

- `next.config.ts` is empty: no image hosts, redirects, headers, or experimental settings.
- `tsconfig.json:7-33`: strict mode, `noEmit`, bundler resolution, `jsx: react-jsx`, `@/* -> ./src/*`, excludes `node_modules` and `boutique-website`.
- `eslint.config.mjs` ignores `.next/**`, `out/**`, `build/**`, `next-env.d.ts`, and `boutique-website/**`.
- No source tests were found under `src/`.
- No `.env*` files were found in the parent workspace; no secrets were read.

### Route tree

```text
src/app/
├── layout.tsx                 root metadata, fonts, MotionProvider
├── globals.css                Tailwind v4 theme and base styles
├── robots.ts                  allow /, disallow /api/
├── sitemap.ts                 generated from navLinks
└── (site)/
    ├── layout.tsx             Header + main + Footer + MobileContactBar + ScrollToTop
    ├── template.tsx           client page enter transition
    ├── page.tsx               homepage
    ├── about/page.tsx
    ├── contact/page.tsx
    ├── custom-order/page.tsx
    ├── faq/page.tsx
    ├── gallery/page.tsx
    ├── menu/page.tsx
    ├── testimonials/page.tsx
    └── api/
        ├── contact/route.ts
        └── inquiry/route.ts
```

### Root layout and SEO

- `src/app/layout.tsx` uses `Playfair_Display`, `Poppins`, and `Great_Vibes` via `next/font/google`; Great Vibes is documented as logo/hero accent only.
- Root `metadata` sets `metadataBase`, default/template titles, description, Open Graph, and Twitter card.
- `RootLayout` uses the Next 16 typed route helper `LayoutProps<"/">` (`src/app/layout.tsx:51`), which should be preserved for this Next version.
- `MotionProvider` wraps all content and applies `<MotionConfig reducedMotion="user">`.
- `src/lib/seo.ts` centralizes `SITE_URL`, `OG_IMAGE`, and `pageMetadata({ title, description, path })`. Every public page composes metadata through this helper.
- `src/components/seo/BakeryJsonLd.tsx` emits structured data on the homepage.
- `robots.ts` disallows `/api/`; `sitemap.ts` derives URLs from `navLinks` and uses `new Date()` for `lastModified`.

### Data model and content modules

- Types live in `src/types/index.ts` with stable slugs/ids intended for future CMS migration.
- `src/data/site-config.ts` is the single source for business name, tagline, phone, WhatsApp, email, address, hours, social links, and map coordinates.
- `src/data/navigation.ts` drives primary nav and sitemap.
- `src/data/menu.ts` holds menu categories/items, flavor groups, starting prices, and flavor notes; `CustomOrderForm` derives sponge flavor choices from it.
- `src/data/gallery.ts` defines roughly 24 portfolio items across Birthday, Wedding, Corporate, and Custom & Novelty, but explicitly says only a handful of real photos exist and are cycled.
- `src/data/faq.ts` groups FAQs by category.
- `src/data/testimonials.ts` holds customer quotes and ratings.
- `src/data/team.ts` contains fictional people and `placehold.co` portrait URLs.

### Component and interaction map

```text
src/components/
├── MotionProvider.tsx         global reduced-motion config
├── about/                     AboutHero, KitchenStrip, TeamSection, ValuesGrid
├── contact/                   QuickContactForm, ContactChannels, map/location UI
├── custom-order/              CustomOrderForm, InquirySuccess, process/expectation UI
├── faq/                       FaqGroups (client accordion)
├── gallery/                   GalleryExplorer, GalleryLightbox
├── home/                      Hero, TrustStrip, GalleryPreview, AboutTeaser,
│                              HowItWorks, TestimonialCarousel, CtaBanner
├── layout/                    Header, Footer, MobileContactBar, ScrollToTop,
│                              NewsletterForm, SocialLinks
├── menu/                      MenuExplorer, FlavorAccordion
├── seo/                       BakeryJsonLd
├── testimonials/              AggregateStars and related UI
└── ui/                        Reveal, Container, SectionHeading, Card, Button-ish helpers
```

- 20 TSX files are marked `"use client"`; most route/page files remain server components.
- `Header` is client-side for mobile drawer/scroll state; `MobileContactBar`, `ScrollToTop`, `SocialLinks`, gallery/menu/faq/accordion/carousel components are also client-side.
- `GalleryExplorer` dynamically imports `GalleryLightbox` with `ssr: false`, keeping `yet-another-react-lightbox` out of the initial bundle.
- `GalleryExplorer` uses filter pills, `AnimatePresence`, layout animations, and local `openIndex` state.
- `CustomOrderForm` is a 3-step client wizard with local state, per-step validation, photo previews via object URLs, honeypot, shake-on-error animation, and success screen.
- `QuickContactForm` is a smaller client form with local validation, honeypot, submit state, and success/error UI.

### Forms and API behavior

- `QuickContactForm` posts `{ name, email, message, website }` to `/api/contact` (`src/components/contact/QuickContactForm.tsx:79-100`).
- `CustomOrderForm` posts `InquiryPayload & { website?: string }` to `/api/inquiry` (`src/components/custom-order/CustomOrderForm.tsx:274-319`).
- Inspiration photos are previewed locally with `URL.createObjectURL`; only filenames are sent in `photoNames`, not binary data.
- Both APIs parse JSON, return `400` for invalid JSON or validation failures, and return `{ ok: true }` for honeypot hits.
- `deliverContactMessage()` and `deliverInquiry()` are integration seams: each currently `console.log`s the full payload.
- Commented examples reference `RESEND_API_KEY`, `CONTACT_INBOX`, and `INQUIRY_INBOX`, but no email package is installed and no `.env*` files exist.
- No rate limiting, authentication, spam score, or persistence exists beyond the simple hidden-field honeypot.

### Design system

- `src/app/globals.css` defines Tailwind v4 `@theme` tokens: warm cream/espresso/rose/gold palette, fonts, radii, shadows, and custom utilities.
- `src/lib/design-tokens.ts` documents spacing/radius/shadow/motion/layout values but is not imported anywhere in `src/`.
- `src/lib/animations.ts` is the actively used motion vocabulary: `EASE_OUT`, `DURATION`, `fadeInUp`, `fadeIn`, `scaleIn`, `staggerContainer`, and `slidePanel`.
- Token drift exists: `animations.ts:14-21` uses `0.25 / 0.4 / 0.55`, while `design-tokens.ts:40-45` says `0.2 / 0.35 / 0.6`; the easing value is the same.
- `src/components/ui/Card.tsx` exists but is not imported anywhere; `fadeIn`, `scaleIn`, and `slidePanel` also appear defined but unused.
- Accessibility signals: `main#main-content`, semantic landmarks, labels/aria attributes, `min-h-11` interactive targets, `focus-visible` outlines, `aria-live` regions, and reduced-motion handling in `MotionProvider` and `template.tsx`.

### Quality findings and risks

1. **Placeholder identity**: phone, WhatsApp, address, map coordinates, production URL, and social profiles are fictional (`src/data/site-config.ts:3-48`).
2. **Placeholder people**: team names, roles, quotes, and portraits are fictional (`src/data/team.ts:3-4`).
3. **Remote image config gap**: `team.ts` uses `placehold.co`, but `next.config.ts` has no `remotePatterns`; `next/image` would reject those hosts unless changed or unoptimized.
4. **Reused gallery imagery**: only 9 local cake images in `public/cakes/` are cycled across ~24 entries; some alt text is inaccurate for the displayed image.
5. **No delivery backend**: both form endpoints log payloads to server console, including names/emails/messages and inquiry details.
6. **Privacy/abuse**: logged PII, no rate limiting, and no provider-side spam filtering.
7. **Newsletter is visual-only**: `src/components/layout/NewsletterForm.tsx` keeps a local optimistic state and has no backend.
8. **No tests or typecheck script**: validation and wizard logic are untested.
9. **Repo hygiene**: no `.gitignore` in the Sweet Layers root; generated `.next/` files appear tracked/dirty and `node_modules` paths appear in tracked files.
10. **Unused/dead helpers**: `design-tokens.ts`, `Card.tsx`, and several animation helpers are not referenced.
11. **Stale docs/config comment**: README is boilerplate; eslint comment refers to a separate scaffold, which is valid but out of scope.

## Decisions

- Treat Sweet Layers as a static marketing site with stubbed intake APIs, not as an ecommerce app.
- Preserve the existing CSS-first Tailwind v4 setup and `src/` alias.
- Preserve Next 16 typed route helpers and read local Next docs before any future code edits.
- Keep static content centralized in `src/data/` and types in `src/types/`; this is the intended CMS-ready seam.
- Keep `deliverContactMessage()` and `deliverInquiry()` as the single integration points for future delivery providers.

## Open questions

1. What are the real business URL, phone, WhatsApp, email, address, hours, map coordinates, and social links?
2. Which email/notification provider should replace console logging, and what inbox addresses should receive submissions?
3. Are gallery images final, and should alt text be rewritten per actual photo?
4. Are team members and testimonials fictional placeholders, or should real content be supplied?
5. Should newsletter signup be wired to a provider or removed?
6. Should generated `.next/` and `node_modules` files be removed from git tracking and a `.gitignore` added?
7. Should `design-tokens.ts`/`Card.tsx` be used, consolidated, or deleted?
8. Should tests and a typecheck/format command be added?

## Next steps

1. Confirm real content/assets and backend delivery requirements.
2. Read relevant Next 16 guides before code changes.
3. Wire the two API delivery functions to a provider with server-side env vars and remove PII console logging.
4. Fix image host config and replace placeholder imagery/alt text.
5. Clean repo hygiene, add missing scripts/tests, and consolidate dead helpers.
