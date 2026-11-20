# 04 — Cross-Project Architecture and Flows

Date: 2026-11-20

## What I did

- Compared Sweet Layers and Boutique at the workspace, build-tool, routing, styling, content, and runtime-flow levels.
- Traced the main user journeys: browsing static pages, browsing the gallery, submitting a contact message, submitting a custom-order inquiry, and Boutique WhatsApp enquiries.
- Identified shared patterns, intentional differences, and integration seams.

## Found

### Workspace topology

```text
ChiomaPortfolio/                         parent workspace
├── .git/                                parent-level git metadata
├── .next/                               generated parent-level Next output
├── sweet-layers-cake-co/                active project; own git root
│   ├── Next 16.3.2 + React 19.2.8
│   ├── src/ layout with @/* -> ./src/*
│   ├── Tailwind v4 CSS-first theme
│   ├── local data modules + typed content
│   ├── /api/contact and /api/inquiry stubs
│   └── report/                          this study
└── boutique-website/                    separate project; own git root
    ├── Next 15.5.23 + React 19.1.0
    ├── root-level app/components/lib with @/* -> ./*
    ├── Tailwind v4 CSS-first theme
    ├── Prettier + typecheck + Turbopack scripts
    └── static brochure with WhatsApp conversion
```

### Comparison

| Area | Sweet Layers | Boutique |
|---|---|---|
| Role in workspace | Main project to study/change | Separate reference/template |
| Next version | `16.3.2` | `15.5.23` |
| React version | `19.2.8` | `19.1.0` |
| Source root | `src/` | repository root |
| Path alias | `@/* -> ./src/*` | `@/* -> ./*` |
| Component naming | PascalCase files | lower kebab-case files |
| Styling | Tailwind v4 CSS-first theme | Tailwind v4 CSS-first theme |
| Fonts | Playfair, Poppins, Great Vibes | Playfair Display, Inter |
| Build scripts | `next dev/build/start`, `eslint` | adds Turbopack, `typecheck`, Prettier scripts |
| Image config | empty `next.config.ts` | Picsum `remotePatterns` configured |
| Backend | two Next route handlers, console stubs | none; WhatsApp links |
| Ecommerce | no cart/checkout | no cart/checkout |
| Tests | none found | none found |
| Git hygiene | generated files appear tracked/dirty | clean; generated files ignored |

### Shared patterns

- Both are App Router, TypeScript strict mode, Tailwind CSS v4 with `@theme`, Framer Motion, Lucide icons, and static data modules.
- Both are content-driven brochure sites rather than applications with persistent state.
- Both centralize site identity/contact details in a `site-config` module.
- Both use client components as islands for navigation, animation, accordions, and forms rather than making whole routes client-side.
- Both favor soft shadows, rounded surfaces, serif display headings, editorial section layouts, and reduced-motion support.
- Both use placeholder business data.

### Intentional differences

- Sweet Layers is newer Next 16 and uses typed route helpers such as `LayoutProps<"/">`; Boutique is Next 15 with conventional `Readonly<{ children: React.ReactNode }>`.
- Sweet Layers keeps source under `src/` and uses PascalCase components; Boutique uses root-level folders and kebab-case files.
- Sweet Layers has API route seams and a more complex 3-step inquiry form; Boutique has no server intake and converts via WhatsApp.
- Boutique has cleaner tooling conventions; Sweet Layers has richer site functionality.

### Runtime flow: Sweet Layers public browsing

```text
Browser
  -> Next App Router route under src/app/(site)
  -> (site)/layout.tsx shell
       Header / Footer / MobileContactBar / ScrollToTop
  -> (site)/template.tsx client enter transition
  -> route page server component
  -> static data from src/data + typed models from src/types
  -> section components, mostly server-rendered
       with client islands for carousels, filters, accordions, forms
  -> global CSS theme + framer-motion variants
```

### Runtime flow: Sweet Layers gallery

```text
gallery/page.tsx
  -> GalleryExplorer client component
       -> filter pills + AnimatePresence grid
       -> next/image using /public/cakes/* with shared blur placeholder
       -> dynamic import GalleryLightbox only when opened
            -> yet-another-react-lightbox + Captions + Counter plugins
```

Open Index tracking is filtered-list based: `openIndex` points into `filtered`, and slides are derived from `filtered`. This is consistent while the filter is unchanged, but there is no stable deep-link/URL state despite gallery item `id` fields being documented for deep links.

### Runtime flow: Sweet Layers contact message

```text
QuickContactForm (client)
  -> local validation + honeypot
  -> POST /api/contact
  -> route parses JSON
  -> honeypot short-circuit returns ok
  -> validate name/email/message
  -> deliverContactMessage(payload)  [CURRENT STUB: console.log]
  -> { ok: true } response
  -> client success screen or inline error
```

### Runtime flow: Sweet Layers custom inquiry

```text
CustomOrderForm (client wizard)
  -> step 0: occasion, date, servings, optional budget
  -> step 1: flavors, description, optional photo previews
  -> step 2: contact details and preferred contact method
  -> validateAll + honeypot
  -> POST /api/inquiry
  -> route parses JSON
  -> validate required strings + flavors + email
  -> deliverInquiry(payload)  [CURRENT STUB: console.log]
  -> client InquirySuccess screen or inline error
```

Photo binaries never leave the browser in the current design; only `photoNames` are submitted. Object URLs are revoked on removal/unmount.

### Runtime flow: Boutique enquiry

```text
Boutique page/component
  -> static site data from lib/data/site-config.ts
  -> optional client animation/analytics island
  -> WhatsApp deep link built with buildWhatsAppEnquiryLink()
  -> user completes enquiry in WhatsApp
  -> no server-side intake, persistence, or email delivery
```

### Integration seams

- **Delivery seam**: Sweet Layers API `deliverContactMessage()` and `deliverInquiry()` are the single places to swap in Resend/Formspree/Postmark/SES or another provider.
- **Content seam**: `src/data/*` and `src/types/index.ts` are structured for eventual headless CMS migration; stable ids already exist.
- **Asset seam**: Sweet Layers local images live in `public/cakes/`; remote team portraits currently need image-host configuration or replacement.
- **SEO seam**: `src/lib/seo.ts`, `BakeryJsonLd`, `robots.ts`, and `sitemap.ts` centralize metadata, but all depend on the placeholder production URL.
- **Tooling seam**: Boutique provides a ready example for `.gitignore`, Prettier, `typecheck`, and `format:check` adoption.

## Decisions

- Cross-project coupling remains zero: no shared code, config, package, or import paths.
- Boutique remains a reference/template until scope is confirmed.
- Sweet Layers' existing server/client split is appropriate; keep new interactive behavior in small client components.
- API delivery functions are the intended backend boundary and should remain the only place that knows about a notification provider.
- Static data modules remain the intended content boundary until a CMS is explicitly introduced.

## Open questions

1. Should the parent `ChiomaPortfolio/.git` remain as umbrella metadata, or should each repo stand alone?
2. Should Sweet Layers adopt Boutique's formatting/typecheck scripts and kebab-case naming convention?
3. Should WhatsApp conversion links be added to Sweet Layers alongside form submission?
4. Should gallery deep links be implemented using the existing stable item ids?
5. Should both projects eventually share a design system/package, or remain independent?

## Next steps

1. Confirm project scope and ownership boundaries.
2. Choose one set of cross-project conventions if the repos are expected to converge.
3. Implement backend delivery in Sweet Layers without changing client call sites.
4. Replace placeholder identity/content/assets and configure image hosts.
5. Add repo hygiene and verification commands before broader feature work.
