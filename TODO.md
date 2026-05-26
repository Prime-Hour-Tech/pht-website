# TODO

Remaining work for the PHT marketing site. Slices 1 (Foundation) and 2 (Home) are shipped; the rest of the work is parked here so a future session can resume from a clean orientation.

> **Before picking up any item below: verify it hasn't already shipped.** Check `git log --oneline -- <relevant files>` and glance at the target code. This list drifts; git doesn't.

---

## Remaining slices

The work was decomposed into 6 slices during initial brainstorming. Each is its own spec → plan → execution cycle.

### Slice 3 — Service template + 6 service routes

- One Astro route `/[serviceSlug].astro` driven by the existing `service` document type.
- Expand the `service` schema with the fields the template needs: hero stat / at-a-glance, how-it-works, capabilities grid (3-col, 6 cards), FAQ accordion (3–4 questions), other-services row.
- New page-coupled hero variant: the `DarkNumbersHero` right column needs an "at a glance" stat card instead of the credentials panel. Decide whether to parameterize the existing block or add a sibling `serviceHero` block.
- Reuses `ctaCard`, `Breadcrumb` (built unused in Slice 1), and `servicesList` (for the "other services" row).
- Reference: `design_handoff_docs/service-page.jsx` (`ServicePage` + `SERVICE_CONTENT` map).

### Slice 4 — About + Industries + Contact

- Three single-instance pages.
- About reuses `teamGrid`, `beliefs`, `ctaCard`. New patterns: founder hero / portrait, milestones timeline (5 entries Q1 2024 → Q2 2026), 3-col story (where we came from / why we started / how we run today), 4-stat strip, office/culture photo + check-bullet list.
- Industries: hero, sticky horizontal-scroll jump nav (pill chips with icons), 4 vertical sections (Professional Services / SMB / Regulated / Nonprofits).
- Contact: form (name / company / email / phone / size / message). Wire to an endpoint (TBD — likely a third-party form provider or a Vercel serverless function).
- References: `design_handoff_docs/about-page.jsx`, `industries-page.jsx`, `contact-page.jsx`.

### Slice 5 — Blog (index + post)

- New document types: `post`, `author`.
- `/blog` index: hero, sticky filter bar (category chips + sort), featured lead post, 3-col recent-posts grid, pagination, newsletter signup.
- `/blog/[slug]` post: breadcrumb, header (eyebrow + 64px serif title + italic deck + byline + share buttons), full-bleed cover, prose body (max 720px), pull quote with accent left-rail, inline figure with caption, author bio card, related-posts row.
- This is the slice that probably forces `@sanity/image-url` integration (cover images need responsive sizing).
- References: `design_handoff_docs/blog-page.jsx`.

### Slice 6 — Legal (Terms + Privacy) + cookie banner + polish

- New schema: `legalPage` document type (or two singletons).
- Two routes: `/terms`, `/privacy`.
- Layout: header, plain-language summary callout (accent-tinted card), sticky TOC sidebar (260px) + sectioned body (numbered `§ 01` through `§ 14`, prose under each), end-of-doc card with contact link.
- Cookie banner (`CookieBanner` from `design_handoff_docs/shared-blocks.jsx`) — deferred since Slice 1; needs legal sign-off on copy + tracking choices before wiring.
- References: `design_handoff_docs/terms-page.jsx`, `privacy-page.jsx`.

---

## Deferred from prior code reviews

Small architectural / quality items surfaced during Slice 1/2 reviews and parked. None block shipping; address opportunistically when adjacent code is being touched.

- **Image URL builder.** Wire `@sanity/image-url` (or the equivalent) so we get responsive sizes and crops from Sanity image fields. Slice 5 (blog covers) will force this; do it then.
- **`getSiteSettings()` double-fetch.** `[...slug].astro` and `BaseLayout.astro` both call it on every static page build. Harmless at build time but inconsistent. Fix: derive `siteName` / `description` inside `BaseLayout` from its own fetch and drop those props.
- **Dual `IconName` types.** `apps/web/src/lib/sanity/types.ts` exports a narrow 6-glyph union for `ServiceResolved.iconName`; `apps/web/src/components/Icon.astro` exports a wider 11-glyph union for the component prop. The narrow → wide assignment works today but is brittle. Pick one canonical location and import from it.
- **`open-now.ts` interval refresh.** Currently runs once on `DOMContentLoaded`. If a visitor loads the page at 5:59pm, the indicator stays "Open" until refresh. A 60s `setInterval` (or computing time to the next transition and scheduling a single update) fixes it.
- **`CtaCard.astro` singleton fetch.** Re-fetches `contactInfo` internally. Fine for Slice 2. If more blocks need live singleton data, pre-fetch at the layout level and pass through props rather than each block re-fetching.
- **Tailwind arbitrary values in `SiteNav.astro`.** `py-[18px]` and `text-[19px]` bypass the token scale. Faithful to the design's JSX but worth normalizing when there's a tokens-vs-arbitrary policy.
- **GROQ substring tests.** Tests verify the query string contains expected field names. Catches structural drift but not data shape. Future slices may want at least one fixture-based round-trip test (mock Sanity response → typed result) to catch projection gaps.
- **`headingAccent` pattern.** Added to `ctaCard` in Slice 2 for the italic-red trailing fragment. Same pattern applies to some About headlines (Slice 4) and possibly Service template headings (Slice 3). Add per-block as needed; extract a shared field-set if a third block uses it.
- **Replace `sanity-plugin-vercel-deploy`.** The npm package is officially **UNMAINTAINED** ("This plugin is no longer supported. See README for details and alternatives."). Still works at runtime against Sanity v4 — a peer-rule override in `pnpm-workspace.yaml` suppresses the noise — but it won't get fixes. Options: (a) inline a small custom Studio tool that POSTs to the Vercel deploy hook (~50 lines, we own it); (b) find a maintained replacement plugin. Should land before Sanity v5 or whenever the plugin stops functioning, whichever comes first.
- **React 19 migration.** Sanity v4 still supports React 18 (we're on 18.3.1) but Sanity now nudges React 19 in build output, and several deps (`@sanity/visual-editing`, `@sanity/insert-menu`, `sanity-plugin-vercel-deploy`) declare React 19 as peer. Currently producing 4 pre-existing peer warnings on every install. Migration is its own task — bump `react`, `react-dom`, `@types/react`, then exercise Studio + Astro for React-19 breaking-change fallout (ref handling, hook signatures, etc).

---

## Content / asset gaps

Filled in by the marketer/owner, not by code:

- **Team photos.** Currently shown as grey placeholders. 4 portraits at 4:5 aspect.
- **Real customer logos.** Trust strip uses text placeholders ("LAW FIRM 01" etc).
- **Real `$5,200/mo saved` figure.** Backed by a representative engagement before launch.
- **Real engineer names + credentials** in `teamMember` docs (currently role placeholders).
- **Final marketing copy** across all blocks. Current seed copy is from `design_handoff_docs/shared-blocks.jsx`.
- **Real PHT logo** as `logoDark` and `logoLight`. Slice 2 wires both fields; one is uploaded.
- **Cover images for ~6 blog posts** (Slice 5).
- **Industries hero image** (Slice 4, optional).

---

## Pre-launch checklist

Mostly out-of-scope for the slices above; needed before the site goes to `primehourtech.com`:

- **Custom domain.** Currently `pht-website.vercel.app`. DNS swap to `primehourtech.com` when ready. Update `SITE_URL` env var in Vercel; update `Sitemap:` line in `apps/web/public/robots.txt`.
- **Cookie banner copy + tracking choices** — depends on legal sign-off (Slice 6).
- **Contact form endpoint** (Slice 4 picks this up).
- **JSON-LD structured data** — Organization on every page, Article on blog posts.
- **Analytics provider** — pick one (Plausible / Fathom / Vercel Analytics / etc.) and wire.
- **OG image URL building** — uses `@sanity/image-url` once it's wired (see "Image URL builder" above).
- **Lighthouse CI** or one-time Lighthouse pass — verify Core Web Vitals before launch.
- **Cross-browser sweep** — Chrome / Safari / Firefox / Edge on desktop + mobile Safari + Chrome Android.
- **Self-hosted fonts** — currently Google Fonts. Only worth switching if perf demands it.
- **Webhook auth hardening** — HMAC sign the Vercel deploy hook URL if/when the threat model demands. Currently mitigated by private Sanity dataset.

---

## Where to look

- **Design source of truth:** `design_handoff_docs/` (committed). Start with `README.md` then `HANDOFF.md` for the longer-form companion. Each page mockup is its own JSX file (e.g., `home-b-variants.jsx HomeB5`, `service-page.jsx`).
- **Foundation spec + plan from Slice 1:** `docs/superpowers/specs/2026-05-25-design-system-foundation-design.md` and `docs/superpowers/plans/2026-05-25-design-system-foundation-plan.md`. **Note: `docs/` is gitignored** — these files are local-only and may not exist in a fresh checkout. They're working artifacts; reconstructable from the design handoff + this TODO + the git history.
- **Home spec + plan from Slice 2:** `docs/superpowers/specs/2026-05-25-home-page-design.md` and `docs/superpowers/plans/2026-05-25-home-page-plan.md`. Same gitignore caveat.
- **Live site:** <https://pht-website.vercel.app/>
- **Studio:** <https://primehourtech.sanity.studio/>

---

## Process notes for next session

- Each slice goes: brainstorm (`superpowers:brainstorming`) → spec → plan (`superpowers:writing-plans`) → execute (`superpowers:subagent-driven-development`).
- The user reviews and commits all changes themselves; never run `git commit` or `git push`. `git add` is fine.
- Tasks are batched at the slice end for one large diff review, not per-task.
