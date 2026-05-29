# Design Map

Reference for the marketer / content author. Each page route maps to a Sanity document type and a block sequence per the design.

Use this when authoring in Studio:
1. Find the page you're authoring below.
2. Note its document type (most pages are `page` docs; a few are dedicated singletons).
3. Use the listed block sequence as the starting layout. Blocks are reorderable; the listed order is the design intent.

---

## Quick reference

| Route | Doc type | Slug / ID | Notes |
|---|---|---|---|
| `/` | `page` | `home` | 8 blocks, top-of-funnel |
| `/about` | `page` | `about` | Origin + team + culture story |
| `/industries` | `page` | `industries` | 4 verticals with deep crosslinks |
| `/contact` | `page` | `contact` | Form + hours + map block |
| `/services` | `page` | `services` | Pricing + bundles + crosslink |
| `/services/[slug]` | `service` | per service | Fixed template (not page+blocks) |
| `/blog` | `page` | `blog` | Hero + post grid + CTA |
| `/blog/[slug]` | `post` | per post | Fixed template (not page+blocks) |
| `/switching` | `page` | `switching` | 9 sections, longest editorial page |
| `/landing/[slug]` | `landingPage` | per campaign | Fixed paid-ad template |
| `/terms` | `termsPage` singleton | — | Legal page |
| `/privacy` | `privacyPage` singleton | — | Legal page |

**Authoring pattern for `page` docs:** Create a new `page` document in Studio, set the slug to the route's slug from the table, then drag in the block sequence below.

---

## Per-page block sequences

### `/` Home (slug `home`)

| Block | Purpose |
|---|---|
| `darkNumbersHero` | Dark hero with big number + credentials. The site's main entry beat. |
| `trustStrip` | Logo strip / labels of trusted-by accounts. |
| `headaches` | "If any of these sound familiar" pain enumeration. |
| `savings` | Cost-savings chart (before/after categories) + bullet list. |
| `servicesList` | 4 service cards linking to `/services/[slug]`. |
| `teamGrid` | 4 team members. |
| `beliefs` | "What we believe" — 4 short principles. |
| `ctaCard` | Closing CTA with contact card. |

---

### `/about` About (slug `about`)

| Block | Purpose |
|---|---|
| `pageHero` | Eyebrow + headline + deck. |
| `originPhoto` | Office or founder photo with caption / quote overlay. |
| `storyThreeCol` | 3-column "Who we are / What we do / Why we exist" story. |
| `numbersStrip` | Stat row (e.g., years in business, MRR retained, hours saved). |
| `milestonesTimeline` | Date-anchored milestones for the company timeline. |
| `teamGrid` | 4 team members. |
| `officeCulture` | Image + heading + bullets describing day-to-day culture. |
| `beliefs` | Reuse of the home-page beliefs treatment. |
| `ctaCard` | Closing CTA. |

---

### `/industries` Industries (slug `industries`)

| Block | Purpose |
|---|---|
| `pageHero` | Eyebrow + headline + deck. |
| `industriesContent` | 4 vertical sections (law / accounting / professional services / etc.), each with intro + bullets + examples. Anchor IDs drive in-page jumps. |
| `industriesDontSeeYours` | "Don't see your industry?" callout. |
| `ctaCard` | Closing CTA. |

---

### `/contact` Contact (slug `contact`)

| Block | Purpose |
|---|---|
| `pageHero` | Eyebrow + headline + deck. |
| `contactBody` | The big block: form + hours + service-area copy + map graphic. Pulls phone/email/address from the `contactInfo` singleton (no need to author them here). |
| `ctaCard` | Closing CTA. Often skipped on `/contact` since `contactBody` is already a conversion surface — author's call. |

---

### `/services` Services index (slug `services`)

| Block | Purpose |
|---|---|
| `servicesIndexHero` | Editorial hero with a Featured Service inline (pick `managed-it` by default). |
| `pricingTiers` | 3-tier pricing (Essentials / Standard / Premier). Each tier has tag, tagline, price, bullets, CTA. |
| `bundleGrid` | 6 bundle tiles with descriptors. Includes optional secondary link (e.g., "Download services overview PDF") and required footer link. |
| `processStrip` | 3–6 process steps (engagement / kickoff / steady state / etc.). |
| `industryCrosslink` | 4 industry tiles linking to `/industries#anchor`. |
| `ctaCard` | Closing CTA. |

---

### `/blog` Blog index (slug `blog`)

| Block | Purpose |
|---|---|
| `pageHero` | Eyebrow + headline + deck. Default eyebrow: "The field notes". |
| `postList` | Renders the post grid. Pulls from all `post` docs sorted by `publishDate` desc. Renders an empty-state message when no posts exist. |
| `ctaCard` | Closing CTA. Default eyebrow: "Have a question?". |

**Pre-requisite:** Create 1+ `post` documents (cover, body, category, publishDate, author reference) before the post grid renders.

---

### `/switching` Switching from your current MSP (slug `switching`)

The longest editorial page in the site. 9 blocks.

| Block | Purpose |
|---|---|
| `switchingHero` | Big hero with deal-card sidebar (the deal "in one card") + fact-sheet strip with live-dot label + 4 stats. |
| `switchingReasons` | "Why people switch" — exactly 3 reasons with an optional "Most common" flag on the first. |
| `switchingTimeline` | 30-day migration timeline. 3–5 phases with phase label, title, body, duration. |
| `switchingHandle` | Awkward-part punchlist — 3–6 items each with pain side + we-handle side. |
| `switchingCompare` | Side-by-side table comparing PHT vs. typical MSPs. 4–8 rows with topic / us / them. Headers default to "Prime Hour Tech" and "Most MSPs". |
| `switchingPromises` | Exactly 4 promise cards with icon + head + body. Third promise uses the `lock` icon by default. |
| `switchingTestimonial` | Centered quote with attribution role + context (e.g., "Operations Director · Professional services firm · 42 seats"). |
| `faqList` | 3–10 FAQ items (question + plain-text answer). Generic block — can be reused on other pages later. |
| `ctaCard` | Closing CTA. |

---

## Fixed-template pages (not page+blocks)

### `/services/[slug]` — `service` document

Each service has a fixed structure: hero (with stat) → capabilities (list of grouped capabilities) → CTA. Schema fields are typed per-service. No block list — just fill in the form.

Special: an optional `specSheetUrl` field. When set, "Read the spec sheet" / "Download spec sheet" CTA buttons render on the page. When empty, those buttons hide.

Six services expected: `managed-it`, `cybersecurity`, `cloud`, `infrastructure`, `vciо-advisory`, `compliance` (slugs may differ — pick what matches the design).

### `/blog/[slug]` — `post` document

Fixed structure: title, slug, excerpt, category, publishDate, coverImage, body (Portable Text), author reference, optional SEO overrides.

`category` is a fixed enum: `Security`, `Cloud`, `Field notes`, `Compliance`, `Tooling`, `Practice`.

### `/landing/[slug]` — `landingPage` document

Fixed paid-ad template with: hero (with form + trustbar), problem, included, howItWorks, faq, cta. Each landing page is a separate `landingPage` document — create one per ad campaign with its own slug (e.g., `managed-it-salt-lake-city`).

Each landing page renders `<meta name="robots" content="noindex, nofollow">` and is excluded from the sitemap (Slice 12).

### `/terms`, `/privacy` — `termsPage` / `privacyPage` singletons

One document each. Each has: eyebrow, title, lastUpdated date, summaryHeading + Portable Text summaryBody, sections array (each section: title + Portable Text body), contactCard fields.

---

## Block library reference

All 31 blocks currently available for `page` documents.

### General-purpose

| Block | Notes |
|---|---|
| `pageHero` | Simple hero: eyebrow + headline + deck. Use when no special hero features are needed. |
| `darkNumbersHero` | Dark-background hero with a big number + caption + credentials. Used on `/`. |
| `ctaCard` | Closing CTA with contact card on the right. Use on essentially every editorial page. |
| `faqList` | Generic FAQ accordion. Designed for /switching but reusable. |

### Home / company-story

| Block | Notes |
|---|---|
| `trustStrip` | Customer logos or labels in a horizontal strip. |
| `headaches` | "Sound familiar?" pain enumeration with `pain → fix` pairs. |
| `savings` | Savings chart (before/after categories) + bulleted summary. Renders the SavingsChart sub-component. |
| `servicesList` | 4 service cards linking to `/services/[slug]`. References live `service` docs. |
| `beliefs` | 4 short principles. |
| `teamGrid` | 4 team members in a grid. References live `teamMember` docs. |

### About

| Block | Notes |
|---|---|
| `originPhoto` | Image + caption-card overlay (quote / attribution). |
| `storyThreeCol` | 3-column story (who/what/why). |
| `numbersStrip` | 4 stats in a row. |
| `milestonesTimeline` | Date-anchored milestones. |
| `officeCulture` | Image + heading + body + bullets. |

### Industries

| Block | Notes |
|---|---|
| `industriesContent` | 4 vertical sections with bullets + examples. Anchor IDs. |
| `industriesDontSeeYours` | "Don't see your industry?" callout. |

### Contact

| Block | Notes |
|---|---|
| `contactBody` | Form + hours + service-area + map. Pulls contact data from singleton. |

### Services index

| Block | Notes |
|---|---|
| `servicesIndexHero` | Hero + Featured Service inline. References a live `service` doc. |
| `pricingTiers` | 3 tiers (Essentials / Standard / Premier). |
| `bundleGrid` | 6 bundle tiles. |
| `processStrip` | 3–6 process steps. |
| `industryCrosslink` | 4 industry tiles linking to `/industries`. |

### Blog index

| Block | Notes |
|---|---|
| `postList` | Renders post grid from `post` docs. |

### Switching

| Block | Notes |
|---|---|
| `switchingHero` | Largest hero — deal card + fact sheet + 4 stats. |
| `switchingReasons` | Exactly 3 reasons. |
| `switchingTimeline` | 3–5 migration phases. |
| `switchingHandle` | 3–6 awkward-part items, pain + we-handle. |
| `switchingCompare` | 4–8 comparison rows. |
| `switchingPromises` | Exactly 4 icon-headed promise cards. |
| `switchingTestimonial` | Centered quote. |

---

## Shared data singletons

These hold data referenced from across the site. Author once; consumed everywhere.

| Singleton | Used by |
|---|---|
| `siteSettings` | `siteName`, `siteDescription`, logos (`logoDark` / `logoLight`), `defaultOgImage`. Used in BaseLayout / SEO / JSON-LD / RSS. |
| `navigation` | Top-nav items + CTA button. Drives `SiteNav`. |
| `footer` | Footer columns, bottom links, socials, copyright, tagline. Drives `Footer`. |
| `contactInfo` | Phone (display + dial), email, hours, address, card title, service area sub. Used in nav utility row, footer, `ctaCard` block, `contactBody` block, structured data. |

**Re-save reminders on first launch (existing HANDOFFs):**
- `contactInfo` to populate `serviceAreaSub` (added in Slice 4 after initial creation).
- `siteSettings` to upload `defaultOgImage` (1200×630 PHT-branded share card).

---

## Authoring conventions

- **Slugs:** Use the route's exact slug for each `page` doc. The route file throws a build error naming the expected slug if the doc is missing — that's your authoring cue.
- **Required fields:** Every block has `initialValue` seeds for its required string fields. You can save a block with no edits to get the design's defaults, but most blocks have at least one field without a seed (icons, bullets, or array items with redesigned shapes).
- **`headline` fields:** A custom Portable Text type with one toolbar button — `Italic accent` — that styles a fragment as italic + accent red. Use it on the trailing word/phrase of a headline for the design's typical treatment ("Help that *actually moves the needle*"). Don't use it on every fragment; the design treats one accent run per headline.
- **CTA buttons:** Most blocks have separate `ctaLabel` / `ctaHref` fields. Defaults route to `/contact` where applicable.
- **References:** A few blocks reference other documents:
  - `servicesIndexHero.featuredService` → `service` doc
  - `servicesList.services[]` → `service` docs
  - `teamGrid.members[]` → `teamMember` docs
  - `post.author` → `teamMember` doc
  Author the referenced docs FIRST (or set defaults will leave the block as half-empty).
- **Reordering:** Block order in Studio matches render order. Drag to reorder.
- **No image yet?** Image fields are optional in most blocks. Renderers fall back gracefully (placeholder div or skipped section).

---

## Status (2026-05-28)

- All page templates are code-complete. Blocks library: 31 blocks.
- Singletons authored: `siteSettings`, `navigation`, `footer`, `contactInfo` (existing).
- `page` docs needed (HANDOFF): `home`, `about`, `industries`, `contact`, `services`, `blog`, `switching`.
- Singletons still to author: `termsPage`, `privacyPage`.
- Content docs needed: 4 `teamMember`, 6 `service`, 1+ `post`, 1+ `landingPage` (per ad campaign).
- Updates to this map: when adding a new block type or changing a page's block sequence, update both the per-page section and the block library reference.
