# ExpertCare

A full-service real estate brokerage website for Dubai: buying, selling, renting, off-plan advice,
Golden Visa guidance, investor work, relocation and property management. Built for
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
| Services (eight) | `lib/services.ts`; URLs in `lib/paths.ts` |
| Guides (thirteen) | `lib/guides/a.ts`, `lib/guides/b.ts`; types in `lib/blocks.ts`; sources in `lib/sources.ts` |
| Area guides (twelve) | `lib/areas.ts` |
| Fees, loan limits and calculators | `lib/costs.ts`, `components/Calculators.tsx` |
| Reference page and glossary | `lib/facts.ts`, `lib/glossary.ts` |
| FAQ page | `lib/faq.ts` |
| Listings on or off | Once the portal is connected, the admin's "On the site" switch; before that `LISTED_DEVELOPERS` and `HIDDEN_LISTINGS` in `lib/listings.ts` |
| Admin portal (enquiries, listings, newsletter) | `/admin`: `components/admin/`, `lib/backend.ts`, `supabase/migrations/` (see Portal below) |
| Off-plan inventory | `content/offplan/*.json` → `npm run offplan` → `lib/data/projects.json` (images whose masters are not on the machine are reused as built) |
| Mashriq Elite units (available homes, unit by unit) | `npm run units` → `lib/data/mashriq-units.json`; each Mashriq project page refreshes it from the developer's sheet in the browser. Price and completion columns are never requested. |
| DLD price pages | `npm run market` → `lib/data/market.json` (Dubai Open Data Licence; attribution kept on the page) |
| Advisers (named on listings, call and WhatsApp routing) | `lib/team.ts` |
| Client reviews (word for word from Google, hidden under three) | `lib/reviews.ts` |
| Newsletter sign-ups (market note) | `lib/newsletter.ts` → Google Sheet via `scripts/newsletter-sheet.gs` |
| Interface strings and page copy | `lib/ui.ts` |
| Content rules for writers | `docs/STYLE.md` |

## Deploying to Hostinger

The `hostinger` branch holds the built site (plain HTML, CSS, JS, images and an `.htaccess`) and is
what Hostinger's Git deployment clones into `public_html`. The GitHub Action in
`.github/workflows/publish.yml` rebuilds it on every push to main, every 15 minutes when listings
changed in the portal, and by hand from the Actions tab. To publish from this machine instead:

```bash
npm run deploy
```

In hPanel: Websites → Manage → Advanced → Git → repository `git@github.com:mashriqelitedevelopments/expertcare.git`,
branch `hostinger`, directory `public_html`. The repo is private, so add the deploy key hPanel shows
under the GitHub repository's Settings → Deploy keys first. Hostinger can auto-deploy on push through
the webhook URL it shows on the same screen (add it under GitHub Settings → Webhooks).

## Portal

`/admin` is the back office: enquiries from every form on the site, the listings (add, edit, photos,
show or hide) and newsletter sign-ups. It is a client-side page over Supabase (Postgres, sign-in and
photo storage), reached over its REST API with no client library. The public site stays static: the
Action pulls the published listings into `lib/data/projects.json` before each build
(`npm run sync-listings`), so an edit reaches the site within about 15 minutes.

Until `lib/backend.ts` holds a project URL and key, the forms keep working as before (WhatsApp, email,
the newsletter sheet), `/admin` shows set-up steps, and on localhost it opens a demo with sample data
kept in the browser.

Connecting it:

1. Create a Supabase project. In the SQL editor run `supabase/migrations/0001_portal.sql`, then
   `supabase/seed.sql` (the current listings; regenerate it with `node scripts/portal/seed-sql.mjs`).
2. Put the project URL and the anon (publishable) key in `lib/backend.ts`. Both are public by design:
   row-level security lets visitors read published listings and add enquiries and sign-ups, nothing else.
3. Authentication → URL configuration: site URL `https://expertcarerealestate.com`, and add
   `https://expertcarerealestate.com/admin/` to the redirect URLs (password-reset links land there).
4. Authentication → Users → Add user for each admin, then in the SQL editor:
   `insert into public.admins (user_id) select id from auth.users where email = 'name@example.com';`
5. Push to main. The Action builds from the portal from then on.

Photos uploaded in the portal are cropped to 3:2 and resized to 640, 960 and 1600 px (JPEG, WebP,
AVIF) at build time, as `public/img/p/<slug>-u<hash>`.

## Before launch

Run `npm run launch-check`: it lists every blocker (contacts, ORN, licence, listing permits, the domain,
the `live` switch) and every warning, and exits 1 until no blocker remains. `node scripts/layoutscan.mjs out`
loads every built page at 390, 768 and 1440 px and reports overflow, broken images, small text and small
tap targets.

- Fill `lib/site.ts`: domain, email, phone, WhatsApp, ORN, trade licence, social links; then set `live: true`
  (until then every page is `noindex` and robots.txt disallows crawling).
- Add the advisers to `lib/team.ts` (name, title, phone, WhatsApp, email, BRN, photo). Until then listing
  cards and pages use the brokerage's own numbers from `lib/site.ts`, and the adviser card stays hidden.
- Copy at least three real reviews from the Google Business Profile into `lib/reviews.ts`, word for word,
  with the profile link, rating and count. The home-page section appears once there are three.
- Connect the newsletter: follow the set-up at the top of `scripts/newsletter-sheet.gs`, then paste the web
  app URL into `NEWSLETTER_ENDPOINT` in `lib/newsletter.ts`. Until then sign-ups go to the email or WhatsApp
  in `lib/site.ts`. Someone has to write and send the note: the sign-up promises one email a month.
- Every listing needs a developer marketing agreement, a Trakheesi permit number and image permission.
- Wire the enquiry forms: they hand the message to WhatsApp or email from `lib/site.ts`.
- Add the GA4 measurement id in `lib/analytics.ts` if measurement is wanted (consent-gated).
