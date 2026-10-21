# ExpertCare: content rules

ExpertCare is a real estate brokerage in Dubai focused on higher-ticket resale homes and off-plan
projects (the focus since 20 Oct 2026). Selling, investor advice, mortgages, the Golden Visa and
property management support that; renting and relocation stay as services but never lead the copy.
Say "prime resale" or "upper end of the market", never "luxury" as a boast. The site is English only.

## Voice
- Plain, short sentences. One idea per sentence. No clever phrasing, no metaphors.
- Write to the reader as "you". The brokerage is "we" or "ExpertCare".
- No filler: no sentence that only announces what the next sentence says.
- No em-dashes. No exclamation marks. No "artist's impression". No "endure", no "finished".
- No superlatives about the company (no "leading", "trusted by thousands", "award-winning").
- Do not invent company facts: no team names, no years in business, no deal counts, no office address,
  no licence numbers. The site's details live in lib/site.ts and are empty until real.

## Facts
- Every figure, fee, percentage, law, date and rule must come from lib/costs.ts, lib/facts.ts,
  lib/sources.ts or lib/guides/reference.ts, which were checked in September 2026 with the source on each.
- Do not add a new number unless you add its source (label + URL + the date you checked it) to the
  guide's `sources` list and it comes from an official body (DLD, RERA, Central Bank of the UAE,
  GDRFA, Dubai Legislation Portal, FTA, u.ae, Dubai Media Office) or a named portal guide.
- Known traps: title deed fees are AED 520 (not 580); mortgage registration is 0.25% + AED 270
  (not +290); there is no Central Bank cap on arrangement fees; the age-at-maturity rule was removed
  in 2019; rent increase caps are 0/5/10/15/20%; Cabinet Decision 49/2023 on rental income.
- Prices on Mashriq Elite projects are "on request" and have no handover dates. Never state them.
- Where sources disagree or are silent, say so. Do not pick a side.

## Links
- Internal links use [label](/path/) with a trailing slash. Guides: /guides/<slug>/. Areas:
  /areas/<slug>/. Services: /services/<slug>/. Tools: /buying-costs/, /mortgage-calculator/.
  Reference: /dubai-property-facts/, /dubai-property-glossary/, /dubai-property-prices/.
- Bold uses **text**. No other markup.

## SEO
- `seoTitle` under 60 characters, the search phrase first ("Selling property in Dubai: the process and fees").
- `seoDescription` 140 to 160 characters, one direct sentence that answers the query, then what the page adds.
- `summary` is the direct answer in two to four sentences, written to be quoted by an AI answer engine.
- Every FAQ answer is a complete answer on its own (it is emitted as FAQPage JSON-LD).
- Headings are questions or plain noun phrases a searcher would type.
