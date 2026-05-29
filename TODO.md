# TODO

Remaining work for the PHT marketing site. **Codebase is launch-ready.** Build succeeds locally and on Vercel after Slice 17 (seed) imports. Remaining work is content polish, infra configuration, and post-deploy verification — no meaningful code changes left unless a new requirement surfaces.

> **Before picking up any item below: verify it hasn't already shipped.** Check `git log --oneline -- <relevant files>` and glance at the target code. This list drifts; git doesn't.

---

## A. Content polish (right now)

The seed populated every doc with design-source copy and placeholders. Replace section by section as real content becomes available — author in Studio (visual editing makes this easy: click any rendered element to jump to its field).

- **Upload images.** The seed left every image field empty. Upload in Studio:
  - `siteSettings.logoDark` + `siteSettings.logoLight` (PHT logo variants — one is uploaded today)
  - `siteSettings.defaultOgImage` (1200×630 PHT-branded share card, neutral enough for any page)
  - `teamMember.photo` × 4 (4:5 portraits)
  - `post.coverImage` × 3
  - `originPhoto.image` on the about page (founder/office photo)
  - `officeCulture.image` on the about page
  - `industriesContent` hero image (optional)
- **Replace placeholder team members.** 3 of 4 `teamMember` docs are seeded with obvious placeholder names ("Engineer Two/Three/Four"). Replace with real engineer names, roles, bios, and photos.
- **Swap `contactInfo` placeholders.** Seed values for phone `(801) 555-0100`, email `hello@primehourtech.com`, and address (Salt Lake City, UT only) are placeholders. Run `pnpm seed:studio:replace` to set `serviceAreaSub`, then edit the contact info in Studio with real phone/email/full address.
- **Real customer logos in the trust strip.** Currently text placeholders ("LAW FIRM 01" etc.) in the home page's `trustStrip` block. Edit `items[]` to real customer names or upload SVG logos.
- **Real testimonial.** `/switching` testimonial uses design's placeholder quote ("Operations Director · Professional services firm · 42 seats"). Swap with a real customer migration story when available.
- **Real `$5,200/mo saved` figure** in the home page `savings` block. Back with a representative engagement before launch.
- **Final marketing copy polish.** Seed copy is lifted from the design canvas — solid starting point, but marketer should walk every page and edit for current brand voice / real-engagement specifics.

## B. Pre-launch infrastructure

Configuration and provider picks. Most are env-var pastes in Vercel; a few are sign-offs that gate something.

- **Pick contact form provider + set `CONTACT_FORM_URL`.** Form is provider-agnostic — POSTs to whatever URL is set. Web3Forms free tier (250 submissions/mo) is the recommended start. Until set, form `action` falls back to `"#"` and submissions don't work. Build log warns when unset.
- **Finalize cookie banner copy with legal.** Banner ships feature-flagged off (`PUBLIC_COOKIE_BANNER_ENABLED=false`). When legal returns approved copy: swap placeholders in `apps/web/src/components/CookieBanner.astro`, set `PUBLIC_COOKIE_BANNER_ENABLED=true` in Vercel env.
- **Create GTM container + set `PUBLIC_GTM_CONTAINER_ID`.** In Google Tag Manager (tagmanager.google.com), create a container for `primehourtech.com`. Copy the `GTM-XXXXXXX` ID into Vercel env. Add GA4 config + conversion tags inside the GTM UI. GTM only fires when a visitor accepts on the cookie banner (consent-gated by design). Pre-req: cookie banner enabled.
- **Wire Visual Editing on Vercel preview env.** Three env vars + one Sanity CORS entry:
  1. **Sanity Manage** (sanity.io/manage): add your Vercel preview URL to the CORS allowlist with "Allow credentials" checked.
  2. **Studio host env**: set `SANITY_STUDIO_PREVIEW_URL` to the Vercel preview URL.
  3. **Vercel preview branch env** (NOT production): set `PUBLIC_SANITY_STUDIO_URL=https://primehourtech.sanity.studio` and `PUBLIC_SANITY_VISUAL_EDITING=true`. Leaving these off production keeps the overlay script (~30 KB) out of public visitor traffic.
  Test: open Studio → Presentation tab → iframe renders the preview deployment → click any element to edit its field.
- **Domain swap to `primehourtech.com`.** DNS update in Vercel, swap `SITE_URL` env var, update `Sitemap:` line in `apps/web/public/robots.txt` to the new host.
- **Wire downstream landing-form attribution.** The discovery form posts a `source: landing-{slug}` hidden field for paid-ad attribution. Configure your form provider's filtering / CRM tagging on that field.

## C. Post-deploy verification

Once deployed, validate the shipped SEO/feed infrastructure works against the live URL.

- **Verify JSON-LD** via [Google Rich Results Test](https://search.google.com/test/rich-results). Paste the home URL → expect `LocalBusiness` detected. Paste a `/blog/<slug>` URL → expect `BlogPosting` detected. No errors.
- **Verify RSS feed.** Hit `https://primehourtech.com/blog/rss.xml` — expect valid RSS 2.0 XML with up to 20 latest posts. Confirm `<link rel="alternate" type="application/rss+xml">` discovery tag in page source.
- **Verify sitemap exclusions.** Hit `/sitemap-index.xml` → references `/sitemap-0.xml`. Open `/sitemap-0.xml` → confirm `/landing/*` URLs are absent, all other routes present. Spot-check a landing page's view-source → confirm `<meta name="robots" content="noindex, nofollow">` in head.
- **Verify OG image previews.** Test deployed URLs at [opengraph.xyz](https://www.opengraph.xyz/) or LinkedIn Post Inspector. Pages with their own `ogImage` use that; others fall back to `siteSettings.defaultOgImage`.
- **Lighthouse pass.** Run on home + a service detail page + a blog post. Verify Core Web Vitals before launch. Address any flags (likely candidates: image lazy-loading, font preload, JS bundle splitting).
- **Cross-browser sweep.** Chrome / Safari / Firefox / Edge on desktop + mobile Safari + Chrome Android. Especially the switching page's dealCard sidebar and the comparison table's responsive behavior.

## D. Optional / future / YAGNI

Don't pick up until a real trigger fires.

- **Per-category cookie consent modal.** Current banner is binary (accept/reject). Add a per-category settings modal only if legal requires GDPR-style granularity. If added, migrate GTM from hard-gate to Consent Mode v2.
- **V2 StickyForm landing template + `LANDING_FORM_URL`.** Slice 9 ships V1 Editorial only. If a campaign wants the StickyForm layout, add a `layoutVariant` schema field + template-switching logic. Optional separate `LANDING_FORM_URL` env var if landings route to a different provider account.
- **Blog pagination + newsletter signup.** Deferred in Slice 5. Add pagination at 20+ posts. Add a `newsletterSignup` block once a newsletter provider is picked.
- **Cloudflare Turnstile on the contact form.** Add only if post-launch form spam volume warrants it.
- **`specSheetUrl` per service doc.** Optional field exists on the `service` schema. Set when real spec-sheet PDFs are uploaded; the "Read / Download spec sheet" buttons on `/services/{slug}` render only when set.
- **`bundleGrid.secondaryLinkHref` PDF link.** The label "Download the services overview →" defaults to no href. Set when a real services-overview PDF is available, or clear the label to hide the link.
- **`bundleGrid.footerLinkHref` anchor refinement.** Currently `/contact`. Could point to a "How pricing works" section anchor on the page or a future help article.
- **Add `/switching` to the navigation singleton.** Today reachable only by direct URL or deep links from `/services`. Add to nav when ready.
- **Draft preview in Studio's Presentation pane.** Slice 15 ships published-content visual editing only. If editors want pre-publish iframe preview, add SSR/draftMode plumbing.
- **Self-hosted fonts.** Currently Google Fonts. Switch only if Lighthouse flags font perf.
- **Webhook auth hardening.** HMAC sign the Vercel deploy hook URL if the threat model demands. Currently mitigated by private Sanity dataset.
- **`headingAccent` pattern extraction.** Reused across a few blocks. Extract a shared field-set if a third+ block needs the italic-red trailing-fragment treatment.

## E. Code reminders

- **`<CtaCard>` requires `contactInfo` as a prop.** Refactored in the deferred-nits sweep — CtaCard no longer fetches `contactInfo` internally. Any new route or wrapper block that renders `<CtaCard>` must pre-fetch `contactInfo` and pass it through. `BlockRenderer` already takes a `contactInfo` prop and forwards it.

---

## Where to look

- **Page-template ↔ block-sequence reference:** `DESIGN_MAP.md` (committed).
- **Seed file:** `apps/studio/seed/initial-content.ndjson` (25 docs from the design canvas) + `apps/studio/seed/README.md` (usage + caveats).
- **Live site:** <https://pht-website.vercel.app/> (until domain swap)
- **Studio:** <https://primehourtech.sanity.studio/>
- **Sanity Manage** (project settings, CORS allowlist, API tokens): <https://www.sanity.io/manage>
- **Vercel project env vars:** Vercel dashboard → Project → Settings → Environment Variables
- **Working slice specs + plans:** `docs/superpowers/specs/` and `docs/superpowers/plans/`. **Note: `docs/` is gitignored** — these files are local-only and may not exist in a fresh checkout. They're working artifacts; reconstructable from this TODO + git history.

---

Test Deployment