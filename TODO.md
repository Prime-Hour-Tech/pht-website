# TODO

Remaining work for the PHT marketing site. Slices 1 (Foundation) and 2 (Home) are shipped; the rest of the work is parked here so a future session can resume from a clean orientation.

> **Before picking up any item below: verify it hasn't already shipped.** Check `git log --oneline -- <relevant files>` and glance at the target code. This list drifts; git doesn't.

---

## Deferred from prior code reviews

Small architectural / quality items surfaced during Slice 1/2 reviews and parked. None block shipping; address opportunistically when adjacent code is being touched.

- **Wire Visual Editing in production (Slice 15 HANDOFF).** Visual editing infrastructure shipped in Slice 15 (icons + previews + insert-menu groups + Presentation Tool + click-to-edit overlay). To turn it on in production:
  1. **Studio:** in Sanity Manage (sanity.io/manage), add the Vercel preview origin to the project's CORS allowlist. In the studio's hosting env (Sanity-hosted studio, or wherever you run `sanity dev`/`sanity build`), set `SANITY_STUDIO_PREVIEW_URL` to the Vercel preview URL (or live site URL).
  2. **Web app (Vercel):** on the preview branch / preview env, set `PUBLIC_SANITY_STUDIO_URL=https://primehourtech.sanity.studio` and `PUBLIC_SANITY_VISUAL_EDITING=true`. Leave both unset on the production-public env so prod visitors don't ship the overlay script.
  3. **Test:** open Sanity Studio → Presentation tab → an iframe of the preview deployment renders. Click any heading / hero / button → the field opens for editing.

  Scope note: this slice ships PUBLISHED-content visual editing only. Editors can't see un-published drafts in the iframe. If draft preview becomes a productivity blocker, that's a follow-up slice (SSR/draftMode integration).
- **Verify sitemap exclusions post-deploy (Slice 12 HANDOFF).** After deploy, hit `https://primehourtech.com/sitemap-index.xml` — should reference `/sitemap-0.xml`. Open `/sitemap-0.xml` — confirm `/landing/*` URLs are absent and all other routes (`/`, `/services/*`, `/blog/*`, `/switching`, `/terms`, `/privacy`, etc.) are present. Spot-check a landing page's view-source — confirm `<meta name="robots" content="noindex, nofollow" />` appears in the head. Shipped in Slice 12; requires the live build to validate.
- **Upload `siteSettings.defaultOgImage` (1200×630 PHT-branded share card) in Studio (Slice 11 HANDOFF).** The OG image plumbing ships in Slice 11 with a per-page → site-default fallback chain. Until the default is uploaded, pages that don't set their own `ogImage` (services pages, switching, blog index, terms, privacy) will render no `<meta property="og:image">` tag (the helper returns `undefined` and BaseLayout skips the meta). Recommended: a 1200×630 PNG/JPG with the PHT wordmark and brand color, neutral enough for any page.
- **Author `specSheetUrl` on each `service` doc (Slice nits-sweep HANDOFF).** Optional field added in the deferred-nits sweep. Set it per service in Studio when real spec-sheet PDFs are uploaded; the "Read / Download spec sheet" buttons on `/services/{slug}` render only when the field is set. Until then no spec-sheet CTAs appear.
- **Remember `CtaCard` requires `contactInfo` as a prop.** Refactored in the deferred-nits sweep — `CtaCard.astro` no longer fetches `contactInfo` internally. When adding a new route that renders `<CtaCard block={...} />`, or a new block type that wraps CtaCard, pre-fetch `contactInfo` at the route level and pass it through. `BlockRenderer` already takes a `contactInfo` prop and forwards it.
- **Create your first `landingPage` doc in Studio (Slice 9 HANDOFF).** Pick a slug (e.g., `managed-it-salt-lake-city`); customize hero copy + CTA per campaign. `initialValue` defaults seed the rest. Save → `/landing/{slug}` builds. Until at least one doc exists, no `/landing/*` routes are generated (this is by design, not a build failure).
- **Wire downstream attribution on the `source: landing-{slug}` field** at your form provider (filtering, CRM tagging, etc.). The discovery form posts to `CONTACT_FORM_URL` with the slug-derived `source` hidden field for paid-ad attribution.
- **(Future) V2 StickyForm template + `LANDING_FORM_URL` env var.** Slice 9 ships only the V1 Editorial layout. When you want V2 StickyForm, add a `layoutVariant` schema field + template-switching logic. If you want lander submissions routed to a separate provider account, add a `LANDING_FORM_URL` env var.
- **Author the `blog`, `services`, and `switching` page docs in Studio (Slice 14 HANDOFF).** Each is a `page` document with a slug matching the route. Drag in the blocks per the design — each block has `initialValue` seeds so saving with no edits gives you the design's defaults (except for the few fields without seeds, which need authoring).
  - **`/blog`** (slug `blog`): `pageHero` → `postList` → `ctaCard`. Also create 1–3 `post` docs (cover, body, category, publishDate, author) before posts render in the grid.
  - **`/services`** (slug `services`): `servicesIndexHero` → `pricingTiers` → `bundleGrid` → `processStrip` → `industryCrosslink` → `ctaCard`. The `servicesIndexHero` block requires a Featured Service reference — pick `managed-it` by default.
  - **`/switching`** (slug `switching`): `switchingHero` → `switchingReasons` → `switchingTimeline` → `switchingHandle` → `switchingCompare` → `switchingPromises` → `switchingTestimonial` → `faqList` → `ctaCard`. The `switchingTimeline.phases[]`, `switchingHandle.items[]`, `switchingCompare.rows[]`, and `bundleGrid.tiles[]` arrays were redesigned with different shapes from the old singletons — those need fresh authoring (no seeds carried over).

  Routes hard-throw at build until the page docs exist. The `lock` icon is available for the third promise on `/switching`.
- **(Optional) Add `/switching` to the navigation singleton** when you want the link in the main nav. Today `/switching` is only reachable by direct URL or future deep links from `/services`.
- **(Optional) Replace the seeded testimonial with a real one** when a real customer migration story is available. Today the testimonial uses the design's placeholder quote ("Operations Director · Professional services firm · 42 seats").
- **Replace `bundleGrid.secondaryLinkHref` once a services-overview PDF exists.** Today the label "Download the services overview →" defaults to no href on the `bundleGrid` block. Set it via Studio when a real PDF is available, or clear the label to hide the link.
- **Wire `bundleGrid.footerLinkHref` to a real "How pricing works" anchor.** Currently `/contact` on the `bundleGrid` block; could point to a section anchor on the page or a future help article.
- **Author the `termsPage` + `privacyPage` singletons in Studio.** `/terms` and `/privacy` routes hard-throw at build until both singletons exist. `initialValue` defaults pre-fill labels and CTA copy; you author the `summaryBody` (Portable Text), the `sections[]` array, and the `lastUpdated` date. Build will then succeed.
- **Finalize cookie banner copy + tracking choices with legal.** Slice 6 ships the banner with hardcoded placeholder copy and feature-flagged off (`PUBLIC_COOKIE_BANNER_ENABLED=false`). When legal returns approved copy: swap the placeholders in `apps/web/src/components/CookieBanner.astro`, set `PUBLIC_COOKIE_BANNER_ENABLED=true` in the Vercel project env vars, redeploy.
- **(Optional, follow-up) Per-category consent modal.** Current banner is binary (accept-all / reject-all). If legal requires per-category granularity, add a Settings modal that lets the user toggle categories individually and persist their choices.
- **Re-evaluate pagination + newsletter signup.** Both deferred in Slice 5. Add pagination at 20+ posts; add a `newsletterSignup` block once a provider is picked.
- **Pick a contact form provider + wire `CONTACT_FORM_URL`.** Slice 4 ships the form as provider-agnostic (POSTs to whatever URL is set in `CONTACT_FORM_URL` env var on the web app). Pick a provider — Web3Forms free tier (250 submissions/mo) is the recommended start. Create the form in their UI, copy the action URL into Vercel project env vars, redeploy. Until this is done, the form's `action` falls back to `"#"` and submissions don't work.
- **Author About / Industries / Contact `page` docs in Studio.** Three new `page` documents with slugs `about`, `industries`, `contact`. Schema defaults pre-fill obvious copy via `initialValue`. Required fields (image alts, headline accents, vertical anchor ids, milestone dates) need authoring. Routes won't generate until the docs exist.
- **Re-save `contactInfo` singleton in Studio to populate `serviceAreaSub`.** Slice 4 adds this required field with an `initialValue`, but `initialValue` only fires on doc creation — not on backfill. Open the singleton in Studio and re-save once. Until then `ContactBody.astro` would render with the field empty; also `pnpm build:web` may surface this as a type-narrowing build error depending on how strict TS is configured.
- **Watch contact form spam volume after launch.** If volume warrants, add a Cloudflare Turnstile widget on the form. Otherwise no action.
- **`headingAccent` pattern.** Added to `ctaCard` in Slice 2 for the italic-red trailing fragment. Same pattern applies to some About headlines (Slice 4) and possibly Service template headings (Slice 3). Add per-block as needed; extract a shared field-set if a third block uses it.
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
- **Verify JSON-LD via Google Rich Results Test (post-deploy).** Open <https://search.google.com/test/rich-results>, paste the production home URL — expect `LocalBusiness` detected with no errors. Paste a `/blog/<slug>` URL — expect `BlogPosting` detected. Shipped in Slice 10; needs the live site to validate.
- **Verify RSS feed (post-deploy).** Hit `https://primehourtech.com/blog/rss.xml` in a browser or feed reader — expect valid RSS 2.0 XML with up to 20 latest posts. Also verify the `<link rel="alternate" type="application/rss+xml">` discovery tag is present in page source. Shipped in Slice 10.
- **Create GTM container + set `PUBLIC_GTM_CONTAINER_ID` (Slice 13 HANDOFF).** In Google Tag Manager (tagmanager.google.com), create a new container for `primehourtech.com`. Copy the container ID (format `GTM-XXXXXXX`) into Vercel project env vars as `PUBLIC_GTM_CONTAINER_ID`. Add tags inside the GTM UI (GA4 config, conversion tracking, etc.) — those are configured in GTM, not in code. GTM loads only when a visitor has clicked Accept on the cookie banner. Pre-requisites: legal-approved banner copy + `PUBLIC_COOKIE_BANNER_ENABLED=true`.
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
