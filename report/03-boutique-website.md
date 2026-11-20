# 03 — Boutique Website Reference Study

Date: 2026-11-20

## What I did

- Studied the sibling `/home/adesina-olagunju/Documents/ChiomaPortfolio/boutique-website` as a reference implementation.
- Reviewed its package scripts, TypeScript/Next/Prettier/ESLint/Tailwind config, root layout, global styles, site data, utilities, and component/page inventory.
- Checked git state and generated-file hygiene.
- Did not modify any Boutique files.

## Found

### Purpose and current state

Boutique is a polished static marketing/brochure site for a fictional women's fashion boutique called Élané Boutique. It has no cart, checkout, database, auth, or backend. Conversion is handled through WhatsApp enquiry links and a stub enquiry form.

### Stack and commands

- `package.json`: private app named `boutique-website`, version `0.1.0`.
- Runtime: Next.js `15.5.23`, React/ReactDOM `19.1.0`.
- Styling/icons/motion: Tailwind CSS v4, `clsx`, `tailwind-merge`, `lucide-react ^1.34.0`, `framer-motion ^13.1.1`.
- Tooling: TypeScript `^5`, ESLint `^9`, `eslint-config-next 15.5.23`, Prettier `^3.9.6`, `prettier-plugin-tailwindcss ^0.8.1`, `eslint-config-prettier ^10.1.8`.
- Scripts (`package.json:5-13`):
  - `dev: next dev --turbopack`
  - `build: next build --turbopack`
  - `start: next start`
  - `lint: eslint`
  - `typecheck: tsc --noEmit`
  - `format: prettier --write .`
  - `format:check: prettier --check .`
- No test script or source test files were found.

### Configuration and conventions

- `tsconfig.json`: strict, `noEmit`, bundler resolution, `jsx: preserve`, `@/* -> ./*`; no `src/` directory.
- `next.config.ts`: allows `picsum.photos` and `fastly.picsum.photos` through `images.remotePatterns`; sets `turbopack.root = __dirname`.
- `app/globals.css`: Tailwind v4 CSS-first theme with primary/secondary/background/text/support/surface colors, radius scale, soft/lift shadows, container utility, no-scrollbar utility, smooth scrolling, display font headings, and reduced-motion scroll behavior.
- Root layout uses `Inter` and `Playfair_Display` via `next/font/google`, applies CSS variables, and renders `AnalyticsListener`.
- `.prettierrc.json` sets double quotes, semicolons, trailing commas, 100-character print width, and Tailwind class sorting.
- `.gitignore` ignores `node_modules`, `.next`, `out`, `build`, coverage, `.env*`, `.vercel`, `*.tsbuildinfo`, and `next-env.d.ts`.

### Route and component inventory

```text
app/
├── layout.tsx                 root metadata, fonts, AnalyticsListener
├── globals.css                Tailwind v4 theme and base utilities
├── page.tsx                   homepage
├── not-found.tsx
├── about/page.tsx
├── collections/page.tsx
├── collections/[slug]/page.tsx
├── contact/page.tsx
├── faq/page.tsx
├── lookbook/page.tsx
├── privacy/page.tsx
├── terms/page.tsx
└── testimonials/page.tsx

components/
├── analytics/analytics-listener.tsx
├── contact/contact-form.tsx
├── layout/footer.tsx
├── layout/navbar.tsx
├── sections/                  hero, collection showcases, editorial strips, etc.
├── ui/                        button, card, section heading, reveal, etc.
└── ...                        lower kebab-case component files throughout

hooks/
└── use-cwv-animation.ts / related client animation helpers

lib/
├── data/site-config.ts        identity, nav, contact, social, hours, legal links
├── seo.ts                     createMetadata()
└── utils.ts                   cn(), formatNaira()
```

- Component filenames use lower kebab-case, unlike Sweet Layers' PascalCase components.
- `lib/utils.ts:4-6` provides the standard `cn()` helper using `clsx` and `tailwind-merge`.
- `formatNaira()` exists for product pricing display (`lib/utils.ts:8-10`).
- `lib/data/site-config.ts` provides WhatsApp helpers: `buildEnquiryMessage()`, `buildWhatsAppLink()`, and `buildWhatsAppEnquiryLink()`.
- Site data is static placeholder content: `+234 800 000 0000`, `hello@boutique.example`, `12 Placeholder Lane`, and generic social links.
- `legalLinks` references `/privacy` and `/terms`, which have route files.

### Design and UX patterns

- Elegant editorial palette: wine/plum primary (`#7a2946`), gold secondary (`#c9a66b`), warm background (`#f8f3ee`), dark text/support colors.
- Serif display headings via Playfair Display; body via Inter.
- Motion is centralized through client hooks/components using Framer Motion, with `useReducedMotion`-style handling and CSS reduced-motion support.
- Components commonly accept stable `id` values so section links and scroll behavior work.
- All enquiries ultimately use WhatsApp deep links; the contact form is a UI shell rather than a backend submission.

### Git state and hygiene

- Clean working tree at study time.
- Visible history: `e3baceb (HEAD -> main, origin/main) Ammendment` and `eff4ba6 App done`.
- `.gitignore` correctly excludes generated/build/dependency output.
- Separate `.git` root and `node_modules` from Sweet Layers; no shared source code.

### Quality findings

1. **Good hygiene**: clean status, generated files ignored, typecheck/format scripts present.
2. **No backend**: contact/enquiry is WhatsApp-driven, consistent with brochure scope.
3. **Placeholder identity**: phone, email, address, and social links are explicitly generic.
4. **No tests**: no test script or source test files.
5. **Different conventions from Sweet Layers**: root-level `@/*`, kebab-case components, Prettier, and Turbopack scripts.
6. **Remote images are configured** for Picsum, unlike Sweet Layers' empty `next.config.ts`.

## Decisions

- Treat Boutique as a reference/template, not as part of the Sweet Layers application, unless scope is confirmed otherwise.
- Do not merge the two codebases or copy conventions blindly; each has deliberate differences.
- Preserve Boutique as a separate repo with its own package manager state and git history.
- Use Boutique mainly as a benchmark for repo hygiene, formatting, file naming, and reduced-motion patterns.

## Open questions

1. Is Boutique intended to remain a separate project, be deleted, or be used as a shared design-system source?
2. Should Sweet Layers adopt Boutique's `typecheck`, `format`, `format:check`, and Turbopack scripts?
3. Should Sweet Layers adopt Prettier and kebab-case component files, or keep its current conventions?
4. Are Boutique placeholders acceptable, or is that project also awaiting real launch content?

## Next steps

1. Confirm whether Boutique is in scope for future work.
2. If adopting conventions from Boutique, do so selectively and with explicit owner approval.
3. Use its `.gitignore` and script setup as a reference for Sweet Layers repo hygiene.
