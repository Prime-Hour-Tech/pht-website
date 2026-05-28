# TODO

Remaining work for the PHT marketing site. Slices 1 (Foundation) and 2 (Home) are shipped; the rest of the work is parked here so a future session can resume from a clean orientation.

> **Before picking up any item below: verify it hasn't already shipped.** Check `git log --oneline -- <relevant files>` and glance at the target code. This list drifts; git doesn't.

---

## Future pages (design refresh round 2)

Three new page templates landed in `design_handoff_pht_redesign/` (despite the folder name, this is additive — not a redesign of what's already shipped). Each is its own slice when prioritized; none are blocking. References live in the top-level `pht-website/project/` of the design canvas tarball: `services-page.jsx`, `switching-page.jsx`, `landing-page.jsx` (note: not in the `design_handoff_pht_redesign/` subdirectory of the canvas — that subdirectory mirrors the original handoff).

### `/services` redesign — replaces current 6-card singleton list

**Component:** `ServicesIndexPage` in `services-page.jsx`. Much richer than the current `servicesIndexPage` singleton.

**Layout (top → bottom):**
1. Hero — editorial split (eyebrow + headline + 2-paragraph deck)
2. Sticky jump-chip row — all 6 services + "Same engineer, same number" live-dot
3. Featured service (Managed IT) — full-width dark editorial card with iconed eyebrow, large headline, "At a glance" stat (96px serif), 4-capability preview, dual CTA
4. **Pricing — 3-tier block** ($125 Essentials / $165 Standard ★ most popular / $215 Premier). Per-seat per-month. Per-tier bullets list "What's in it" / "Everything in X, plus…"
5. Service grid — 5 remaining services as substantial cards (icon, name, deck, 3-capability preview, hero stat) + 6th tile = "Bundle them" companion card (4-line summary of typical bundle)
6. "How every engagement runs" — 4-step process strip (Discovery / Written SOW / Named engineer / QBR + runbook)
7. Industry crosslink — "See it by industry instead" with 4 industry tiles (Professional Services / SMB / Regulated / Nonprofits)
8. Final CTA (reuses existing `CtaCard`/`ctaCard` block pattern)

**New content shapes:**
- **Pricing tiers** — 3 inline objects per page (name / price / tag / tagline / "includes head" / bullets array / cta label / featured flag). Either an array on a refactored `servicesIndexPage` singleton, or a new `pricingTiers` field. Includes the `flag: "★ Most clients land here"` on the middle tier.
- **Featured service callout** — schema needs to know which service to feature (likely a reference to a `service` doc, defaulting to managed-it).
- **Process strip** — 4 inline items {step / title / body}. Reusable; consider a new `processStrip` block.
- **Industry crosslink** — 4 inline {icon / label / sub / href} items. Could reuse the `industriesContent` schema if those tiles can be auto-derived from the existing /industries page.

**Scope estimate:** ~15–20 files. Migration concern — the existing `servicesIndexPage` singleton has Slice-3 + Slice-3-fix-up fields (heroEyebrow, heroHeading, heroDeck, listEyebrow, listHeading, ctaEyebrow, ctaHeading, ctaDeck, ctaLabel, ctaHref, otherServicesHeading, otherServicesViewAllLabel). The redesign would likely keep most of those + add pricing + process strip + industry crosslink fields. Existing `/services` route file `apps/web/src/pages/services/index.astro` gets a full rewrite.

### `/switching` — new route, "Switching from your current MSP"

**Component:** `SwitchingPage` in `switching-page.jsx`. Targets prospects already with another MSP.

**Layout:**
1. Breadcrumb (Services › Switching MSPs)
2. Hero — dark band, 2-col (headline + 2-paragraph deck on left, "The deal in one card" 5-row panel on right) + 4-stat strip beneath ("30 days" / "0 coverage gap" / "You own" / "M-to-M")
3. Reasons people switch — 3-col cards (3 reasons, one tagged "Most common")
4. **Migration timeline** — the centerpiece. Vertical 4-week rail with numbered week markers (01-04). Each week: serif title + 2-col body ("What you get this week" check-bullets + "On our side" chip pills). Weeks: Discovery → Documentation/side-by-side → Baseline deployed → Old MSP off
5. "The awkward part" punchlist — 8 items in 2-col grid (notice letter, credential handover, documentation request, side-by-side, tool removal, vendor re-pointing, backup verification, off-board confirmation)
6. Comparison table — 8 rows (first-touch / pricing / engineer continuity / after-hours / docs / contract / QBR / location) × 3 cols (aspect, current MSP, PHT). Logomark in the PHT column header.
7. 4-promise grid — iconed cards (shield, file, lock, users glyphs). NOTE: `lock` icon not in current set.
8. Testimonial — pull quote + metric card ("14 days · Old MSP fully off-boarded")
9. FAQ — 6 Q&A in 0.7fr/1.3fr sticky-heading layout
10. Final CTA + footer

**New content shapes:**
- New singleton `switchingPage` (recommended over fitting onto an existing doc) — hero, reasons array, timeline weeks array, handle items array, comparison rows array, promises array, testimonial object, faqs array, CTA fields.
- All arrays are inline; no new doc types needed.
- New `lock` icon glyph needed in `Icon.astro`.

**Scope estimate:** ~14–18 files. Comparable to Slice 4 About page in complexity (timeline section parallels the milestones timeline; comparison table is novel but mechanical).

### `/landing/[slug]` — paid-ad lander template

**Component:** `LandingV1Editorial` + `LandingV2StickyForm` + `LandingMobile` in `landing-page.jsx`. Two desktop variants of the same content for A/B-style testing of paid-ad campaigns.

**Variants:**
- **V1 Editorial:** Dark hero with discovery form on the right, full site chrome (utility row + nav). Includes 4-stat fact sheet under the hero on the dark band.
- **V2 Sticky-form:** Minimal chrome (just brand + open-now pill + phone + book button — no main nav). Sticky discovery form column. Dark final CTA band.

**Shared sections** (used by both variants):
1. Hero (variant-specific layout)
2. Trust bar — 1-line strip with 5 trust items
3. Problem section — 3-col "Pain · 01/02/03" cards
4. "What flat-rate covers" — 8-bullet 2-col with check icons
5. "How it works" — 3-step cards (Week 1 / Week 2 / Week 3+)
6. FAQ — 6 Q&A in 0.7fr/1.3fr layout
7. Final CTA — variant-specific (V1 reuses CtaCard, V2 has its own dark band + secondary form)

**Content model:**
- Content lives in a `LANDING` constant in the JSX — single source of truth shared by both variants. In production: a new `landingPage` doc type (NOT a singleton — multiple landing-page instances for different campaigns/cities/services) with all of: city, service, metaEyebrow, heroTitleA, heroTitleB, heroDeck, heroStats[], problem object, included object, howItWorks object, faqs[], trustBar[].
- Each instance is a separate route: `/landing/managed-it-salt-lake-city`, `/landing/cybersecurity-utah`, etc. Slug-driven via `getStaticPaths`.
- **Variant selector field:** schema field `layoutVariant: "editorial" | "stickyForm"` picks which template renders.

**Form:** Discovery-call form (name / work email / company / situation textarea + Schedule button). Provider-agnostic POST to `CONTACT_FORM_URL` like the contact form — same field-name conventions + redirect hidden inputs.

**Scope estimate:** ~20–25 files (largest of the three because both variants need their own page render path, even though they share section components).

### Open decisions for these three slices

- Whether to refactor existing `servicesIndexPage` singleton or replace it with a richer schema (pricing tiers are the new piece).
- Where `/switching` sits in the nav — under Services dropdown? Standalone? Currently rendered with `active="Services"` in the design.
- Whether to ship ONE landing-page variant first (recommend V1 Editorial — more content, broader applicability) and add V2 later.
- Landing-page form: same provider URL as `/contact`, or a separate `LANDING_FORM_URL` for tracking source separately?

---

## Deferred from prior code reviews

Small architectural / quality items surfaced during Slice 1/2 reviews and parked. None block shipping; address opportunistically when adjacent code is being touched.

- **Author the `termsPage` + `privacyPage` singletons in Studio.** `/terms` and `/privacy` routes hard-throw at build until both singletons exist. `initialValue` defaults pre-fill labels and CTA copy; you author the `summaryBody` (Portable Text), the `sections[]` array, and the `lastUpdated` date. Build will then succeed.
- **Finalize cookie banner copy + tracking choices with legal.** Slice 6 ships the banner with hardcoded placeholder copy and feature-flagged off (`PUBLIC_COOKIE_BANNER_ENABLED=false`). When legal returns approved copy: swap the placeholders in `apps/web/src/components/CookieBanner.astro`, set `PUBLIC_COOKIE_BANNER_ENABLED=true` in the Vercel project env vars, redeploy.
- **Wire analytics / tracking that honors cookie consent.** The banner records the user's choice in `localStorage.getItem("pht-cookie-consent")` but doesn't actually load any tracking scripts. When you add an analytics provider, gate the script tags on that value.
- **(Optional, follow-up) Per-category consent modal.** Current banner is binary (accept-all / reject-all). If legal requires per-category granularity, add a Settings modal that lets the user toggle categories individually and persist their choices.
- **Author the `blogIndexPage` singleton + 1–3 starter posts.** Slice 5 ships /blog routes that don't render until content exists. In Studio: create the singleton (initialValue defaults cover most fields; you author the two Portable Text headings + save). Then create 1–3 `post` docs with cover, body, category, publishDate, author. Build will then succeed.
- **Replace LinkedIn / X icons on `ShareButtons.astro`.** Slice 5 uses `arrowSm` as a placeholder for both share-target icons. Add proper `linkedin` and `x` glyphs to `Icon.astro` + the `IconName` union, then swap the icons in `apps/web/src/components/blog/ShareButtons.astro`.
- **Retrofit existing image fields to use `urlFor`.** `logoDark`, `logoLight`, and `teamMember.photo` still project raw `asset->url` from Slice 2. Switch to the new `apps/web/src/lib/sanity/imageUrl.ts` builder for responsive sizes the next time those files are touched.
- **Re-evaluate pagination + newsletter signup.** Both deferred in Slice 5. Add pagination at 20+ posts; add a `newsletterSignup` block once a provider is picked.
- **Add RSS feed + Article structured data.** Pre-launch tasks. RSS at `/blog/rss.xml`, Article JSON-LD on each `/blog/<slug>` page.
- **Pick a contact form provider + wire `CONTACT_FORM_URL`.** Slice 4 ships the form as provider-agnostic (POSTs to whatever URL is set in `CONTACT_FORM_URL` env var on the web app). Pick a provider — Web3Forms free tier (250 submissions/mo) is the recommended start. Create the form in their UI, copy the action URL into Vercel project env vars, redeploy. Until this is done, the form's `action` falls back to `"#"` and submissions don't work.
- **Author About / Industries / Contact `page` docs in Studio.** Three new `page` documents with slugs `about`, `industries`, `contact`. Schema defaults pre-fill obvious copy via `initialValue`. Required fields (image alts, headline accents, vertical anchor ids, milestone dates) need authoring. Routes won't generate until the docs exist.
- **Re-save `contactInfo` singleton in Studio to populate `serviceAreaSub`.** Slice 4 adds this required field with an `initialValue`, but `initialValue` only fires on doc creation — not on backfill. Open the singleton in Studio and re-save once. Until then `ContactBody.astro` would render with the field empty; also `pnpm build:web` may surface this as a type-narrowing build error depending on how strict TS is configured.
- **Watch contact form spam volume after launch.** If volume warrants, add a Cloudflare Turnstile widget on the form. Otherwise no action.
- **Image URL builder.** Wire `@sanity/image-url` (or the equivalent) so we get responsive sizes and crops from Sanity image fields. Slice 5 (blog covers) will force this; do it then.
- **`getSiteSettings()` double-fetch.** `[...slug].astro` and `BaseLayout.astro` both call it on every static page build. Harmless at build time but inconsistent. Fix: derive `siteName` / `description` inside `BaseLayout` from its own fetch and drop those props.
- **`open-now.ts` interval refresh.** Currently runs once on `DOMContentLoaded`. If a visitor loads the page at 5:59pm, the indicator stays "Open" until refresh. A 60s `setInterval` (or computing time to the next transition and scheduling a single update) fixes it.
- **`CtaCard.astro` singleton fetch.** Re-fetches `contactInfo` internally. Fine for Slice 2. If more blocks need live singleton data, pre-fetch at the layout level and pass through props rather than each block re-fetching.
- **Tailwind arbitrary values in `SiteNav.astro`.** `py-[18px]` and `text-[19px]` bypass the token scale. Faithful to the design's JSX but worth normalizing when there's a tokens-vs-arbitrary policy.
- **`headingAccent` pattern.** Added to `ctaCard` in Slice 2 for the italic-red trailing fragment. Same pattern applies to some About headlines (Slice 4) and possibly Service template headings (Slice 3). Add per-block as needed; extract a shared field-set if a third block uses it.
- **Replace spec-sheet placeholder hrefs.** Service page hero and capabilities-header each render an `aria-disabled="true"` `href="#"` link ("Read the spec sheet" / "Download spec sheet") — 2 per service × 6 services = 12 placeholder buttons. Must resolve before public launch: either build real spec-sheet PDFs and link to them, add an optional `specSheetUrl` field to the `service` doc and hide both CTAs when empty, or remove the CTAs entirely.
- **ServiceCta heading lowercases the service name.** `apps/web/src/components/service/ServiceCta.astro` builds the headline `"See if {service.name.toLowerCase()} from PHT *fits your business.*"`. For services with acronyms (e.g., "Managed IT" → "managed it", "vCIO Advisory" → "vcio advisory") this reads awkwardly. The behavior is faithful to the design's source JSX, but worth a copywriting pass before public launch — either remove `.toLowerCase()` (preserves acronyms), use a per-service `displayName` field, or hand-author each service's CTA copy.

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
