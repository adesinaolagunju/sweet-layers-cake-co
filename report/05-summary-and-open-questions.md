# 05 — Summary and Open Questions

Date: 2026-11-20

## What I did

- Completed a read-only study of the workspace, Sweet Layers Cake Co., the sibling Boutique website, and the cross-project architecture.
- Created five numbered reports under `./report/`.
- Did not change application code, configs, assets, dependencies, or git history.

## Reports created

1. `report/01-discovery-overview.md`
2. `report/02-sweet-layers-cake-co.md`
3. `report/03-boutique-website.md`
4. `report/04-cross-project-architecture.md`
5. `report/05-summary-and-open-questions.md`

## Found

- Sweet Layers is a polished Next.js 16 static brochure site with rich animations, local typed content, gallery filtering/lightbox, and two custom forms.
- Boutique is a separate Next.js 15 static brochure/reference site with cleaner repo hygiene and WhatsApp-only conversion.
- Both projects are independent repos with no shared code; Sweet Layers config explicitly excludes Boutique.
- Sweet Layers is not launch-ready: business details, people, imagery, and testimonials are placeholders; newsletter is visual-only.
- Contact and inquiry APIs validate input and use honeypots, but delivery is only `console.log` with PII payloads.
- No source tests were found in either project; Sweet Layers also lacks `typecheck`, `format`, and `format:check` scripts.
- Sweet Layers has repo hygiene issues: no root `.gitignore`; generated `.next/` files are tracked/dirty and dependency files appear tracked.
- Design-system drift exists between `src/lib/design-tokens.ts`, `src/lib/animations.ts`, and unused shared UI helpers.
- Local Next 16 documentation must be read before any future code changes, per `AGENTS.md`.

## Decisions

- Kept all work read-only except creating these report files.
- Treated Sweet Layers as the main project and Boutique as a reference until scope is confirmed.
- Used `01`–`05` numbering because `./report/` was empty/nonexistent at the start.
- Preserved existing project boundaries and conventions instead of proposing an immediate merge or refactor.
- Identified API delivery functions, static data modules, and SEO helpers as the key future integration seams.

## Open questions

1. Is Boutique in scope, or reference-only?
2. What are the real Sweet Layers launch details: URL, phone, WhatsApp, email, address, map, hours, and social links?
3. Which backend/provider should receive form submissions, and which inboxes should be used?
4. Which images, team profiles, and testimonials are final versus placeholder?
5. Should repo hygiene and tooling be tightened before feature work?
6. Should Sweet Layers adopt Boutique's Prettier/typecheck/format conventions?
7. Should newsletter signup be implemented or removed?
8. Should unused helpers/tokens be consolidated or deleted?
9. Should gallery deep links be added using existing stable item ids?

## Next steps

1. Confirm scope and the top five items below.
2. Read the relevant Next 16 guide before editing code.
3. Wire form delivery and remove PII logging.
4. Replace placeholders and configure image hosts.
5. Add `.gitignore`, remove generated tracked files, add verification scripts/tests, then clean dead helpers.

## Top 5 things to confirm or correct

1. Boutique should remain reference-only and separate from Sweet Layers.
2. All Sweet Layers business identity/contact/map/social values are placeholders awaiting real launch data.
3. Contact and inquiry submissions should move from console logging to a real provider/inbox.
4. Gallery, team, testimonial, and hero imagery is temporary and needs final assets plus accurate alt text.
5. Sweet Layers should adopt stricter hygiene/tooling: `.gitignore`, untrack generated files, `typecheck`/format commands, and tests.
