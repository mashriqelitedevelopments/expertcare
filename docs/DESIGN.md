# ExpertCare: the ledger system (app/globals.css)

Square corners, hairline rules, condensed Archivo headlines, JetBrains Mono for every label and
number. Photography sits in panels with captions, never as a wash behind type. No rounded cards,
no drop shadows, no gradients. Every section is ruled, not floated.

## Page skeleton
- `<Hero small image h1 lede crumbs byline caption locale />` (components/Sections.tsx): split hero,
  copy left, photo right. Use on every page that has a title. `foot` renders at the bottom of the copy column.
- `.sec` vertical padding; `.sec.tight` less. `.wrap` horizontal container. `.narrow` 820px max.
- `.sec-head` = grid with `<Eyebrow n={1}>Label</Eyebrow>` + `<h2>` on the left and a `.more` link on the right.
- `.twin` two columns 5/7 (`.twin.even` 1/1, `.twin.rev` swaps). `.cols.cols-2|3|4` ruled columns.
- `.ink` section = ink background, bone text (buttons inside become bone-filled automatically).
- `.sand` section = sand background.

## Lists
- `.ledger` + `<LedgerHead/>` + `<ListingRow l={l} locale idx/>` (components/ListingCard.tsx): listings as ruled rows.
- `.index` + `<IndexRow idx title text meta href image locale/>`: numbered rows (services, guides). `.index.no-thumb` when no images.
- `.atlas` + `<AtlasTile a locale idx/>`: areas as a ruled photo grid.
- `.doors` + `.door` (photo, then `.door-in` with h3/p/.more): four photo panels.
- `.figs` > div (`.num` + span): a row of numbers. `.facts` dl: ruled fact cells.
- `.ladder` > div > div(h3,p): numbered steps.
- `.chips` ul > li > a. `.faq` > details > summary + p.

## Article pages
- `.article` = prose + `.aside` (sticky). `.prose` numbers its h2 automatically (counter), `.keypoints` box,
  `.note` clay-ruled, `.sources` list. `.toc` ruled contents. `.panel` white ruled box; `.panel.ink`.
- `<Plate image h2 lede caption locale>` buttons `</Plate>`: full-bleed photo with a bone card on its lower edge.

## Controls
- `.btn` (ink), `.btn-ghost`, `.btn-clay` (the one strong button per page). `.more` mono underlined link with `<Arrow/>`.
- `.ticket` search form (see components/HomeSearch.tsx). `.seg` segmented radios. `.toggle` radio pair.
- Forms: `.form > .inputs > .input(.full)` label+control; `.check`; `.form-status`.
- Calculators: `.calc` > `.input`/`.range-row` rows, `.calc-out` > `.calc-sum` dl (`.total`, `.big`).
- Tables: `.tbl-wrap > table.tbl` (last column right-aligned, `.tbl-left` to disable). `.tbl .total` row.
- `.stamp` mono tag, `.stamp.clay`. `.card-tag` small bordered tag. `.save` / `.save-wide` buttons.
- Charts: `.chart-card`, `.chart-grid`, `.hbars`; series colour `--chart` #1c2f4d, active `--chart-active` #b4481f.
- `.mbar` sticky mobile action bar. `.gallery` 2+1 ruled photo grid. `.empty` ruled empty state. `.results-bar`.

## Rules
- Lead every page with the split hero (a photograph). Never a text-only top.
- No `.card`, `.tile`, `.rail`, `.grid`, `.split`, `.stone`, `.dark`, `.band`, `.stats`, `.market`, `.promises`,
  `.guide-list`, `.services`, `.service-pair`: those classes no longer exist.
- Section order should differ from a brochure: data first (figures, tables, rows), explanation second, form last.
- Copy rules in docs/STYLE.md still apply to any string you add to lib/ui.ts.
