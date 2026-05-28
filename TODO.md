# TODO

Remaining work for the PHT marketing site. Slices 1 (Foundation) and 2 (Home) are shipped; the rest of the work is parked here so a future session can resume from a clean orientation.

> **Before picking up any item below: verify it hasn't already shipped.** Check `git log --oneline -- <relevant files>` and glance at the target code. This list drifts; git doesn't.

---

## Remaining slices

The work was decomposed into 6 slices during initial brainstorming. Each is its own spec → plan → execution cycle.

### Slice 6 — Legal (Terms + Privacy) + cookie banner + polish

- New schema: `legalPage` document type (or two singletons).
- Two routes: `/terms`, `/privacy`.
- Layout: header, plain-language summary callout (accent-tinted card), sticky TOC sidebar (260px) + sectioned body (numbered `§ 01` through `§ 14`, prose under each), end-of-doc card with contact link.
- Cookie banner (`CookieBanner` from `design_handoff_docs/shared-blocks.jsx`) — deferred since Slice 1; needs legal sign-off on copy + tracking choices before wiring.
- References: `design_handoff_docs/terms-page.jsx`, `privacy-page.jsx`.

---

## Deferred from prior code reviews

Small architectural / quality items surfaced during Slice 1/2 reviews and parked. None block shipping; address opportunistically when adjacent code is being touched.

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
