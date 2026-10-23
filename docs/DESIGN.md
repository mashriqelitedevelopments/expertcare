# ExpertCare: the design (app/globals.css)

Photography first. Images run full-bleed and carry the type; text sits in a narrow offset column
(`.offset`), never a centred slab. Sections are separated by space, not rules. One family, Archivo:
light (300) for headlines, regular for text, 11px tracked capitals for the few labels that remain.
Ground #F4F4F1, ink #131311, dark #0C0C0A, dim #86867E. No accent colour, no borders on cards, no
pills, no stat tiles, no numbered labels, no mono. Every section leads with a picture; a section
with no picture is a candidate for cutting, not for a box.

## Building blocks (components/Sections.tsx, ListingCard.tsx, HomeSearch.tsx)
- `<Hero image h1 lede crumbs byline caption small foot locale/>`: full-bleed photograph, type in the lower left over a scrim.
- `<Plate image h2 lede caption locale>` buttons `</Plate>`: full-bleed photograph with the copy in its lower left.
- `.doors > a.door`: photographs with the service name on them (home page).
- `.ledger` / `.grid` + `<ListingRow/>`: `.lcard` paper cards: photograph with status and handover chips, project, place and developer, specs, starting price, then `<ContactButtons/>` (call and WhatsApp when the numbers exist, else "Ask about availability"). `<LedgerHead/>` renders nothing. `.row` is now only the guide rows.
- Listing page: `.hero.lhero` full-bleed photograph with crumbs, h1, `.lhero-chips`, `<Gallery/>` (thumbnails, "View gallery (n)", a `<dialog>` lightbox) and a light `.lhero-card` with the price. Below, the `.aside` starts with the enquiry form and `.aside-stick` keeps the price and `<AdviserCard/>` in view.
- `<UnitTable/>` on Mashriq Elite listings: "Homes available now", one row per available unit (unit, unit type, type, view, size, parking, plans, "Ask"); "Ask" scrolls to the form and tags the message with the unit. Snapshot at build, live refresh in the browser.
- `<Reviews/>`: a rail of `.review` cards from `lib/reviews.ts`; renders nothing below three reviews.
- `<NewsletterSection/>` / `.news`: a photograph beside a paper panel with a pill email field and topic toggles (home, guides index, every guide).
- Footer `.ftr-popular`: every `/buy/` collection page, grouped by area, type, budget and developer.
- `.atlas` + `<AtlasTile/>`: areas as photographs with the name on them.
- `.index` + `<IndexRow idx title text href image locale/>`: image and text side by side, alternating; `.index.no-thumb` is a plain spaced list.
- `.ladder`: steps with space between, no numbers. `.figs`: a quiet line of numbers, no tiles.
- `.twin` (4/7 columns), `.cols.cols-2|3|4` (space, no rules), `.offset` narrow column, `.sec`, `.sec.tight`, `.ink` dark section, `.sand` mist section.
- `.article` = `.prose` + sticky `.aside` with `.toc` and `.panel` (white box, the only box).
- `.faq`, `.tbl` (faint row rules only), forms with underlined fields, `.btn` square tracked capitals, `.more` tracked link.
- `<Eyebrow/>` renders nothing: headings carry sections on their own.

## Rules
- **No dark on dark, ever.** A dark element (box, button, badge, border, type) sits on a light ground; a light element sits on a photograph or a dark section. Two dark blocks never touch (no `.ink` section directly before another or before the footer). `npm run check` runs `scripts/darkscan.mjs`, which loads every template at desktop and phone width in headless Chrome and fails on any hit.
- Plan the image per section before the copy. Images: lib/images.ts keys, developer renders under `p/`.
- No `.card`, `.tile`, `.rail`, `.split`, `.stone`, `.band`, `.stats`, `.market`, `.promises`, `.guide-list`, `.services`, `.service-pair`, `.chips` as pills, `.stamp` as a tag.
- Copy rules in docs/STYLE.md apply to every string in lib/ui.ts.
