# ExpertCare

A full-service real estate brokerage website for Dubai: buying, selling, renting, off-plan advice,
mortgage help, Golden Visa guidance, investor work, relocation and property management. Built for
search and for AI answer engines: every page carries structured data, every figure names its source,
and the whole site is also published as plain text at `/llms.txt` and `/llms-full.txt`.

Next.js 15 static export, plain CSS, no runtime dependencies beyond React. English only, with the
locale plumbing in place for a second language.

## Run

```bash
npm run dev        # http://localhost:4370
npm run build      # static site in .next/ (or NEXT_DIST_DIR=.next-build)
npm run typecheck
npm run check      # builds into .next-build and gates every page (see scripts/check.mjs)
```

`node_modules` is a symlink to a sibling project's install; run `npm install` to make it local.

## Where things live

| What | Where |
| --- | --- |
| The brokerage's own details (name, domain, contacts, ORN, `live` switch) | `lib/site.ts` |
| Services (nine) | `lib/services.ts`; URLs in `lib/paths.ts` |
| Guides (fourteen) | `lib/guides/a.ts`, `lib/guides/b.ts`; types in `lib/blocks.ts`; sources in `lib/sources.ts` |
| Area guides (twelve) | `lib/areas.ts` |
| Fees, loan limits and calculators | `lib/costs.ts`, `components/Calculators.tsx` |
| Reference page and glossary | `lib/facts.ts`, `lib/glossary.ts` |
| FAQ page | `lib/faq.ts` |
| Off-plan inventory | `content/offplan/*.json` → `npm run offplan` → `lib/data/projects.json` |
| DLD price pages | `npm run market` → `lib/data/market.json` (Dubai Open Data Licence; attribution kept on the page) |
| Interface strings and page copy | `lib/ui.ts` |
| Content rules for writers | `docs/STYLE.md` |

## Before launch

- Fill `lib/site.ts`: domain, email, phone, WhatsApp, ORN, trade licence, social links; then set `live: true`
  (until then every page is `noindex` and robots.txt disallows crawling).
- Every listing needs a developer marketing agreement, a Trakheesi permit number and image permission.
- Replace the placeholder photographs noted in `lib/areas.ts` (`TODO photo`) and `public/img/CREDITS.md`.
- Wire the enquiry forms: they hand the message to WhatsApp or email from `lib/site.ts`.
- Add the GA4 measurement id in `lib/analytics.ts` if measurement is wanted (consent-gated).
