# HANDOFF - PHT Website Operator Manual

**Audience:** Whoever runs the live site day-to-day. No code knowledge required for normal operation.

**Scope:** How to operate the live site - content editing, deploying, form providers, environment variables, and known gotchas.

**Other docs to know about:**
- [`README.md`](./README.md) - developer setup, local dev, seeding, testing. Read this if you're touching code.
- [`TODO.md`](./TODO.md) - remaining pre-launch tasks (content polish, infra config, post-deploy verification, deferred features). Cross-referenced below.
- [`DESIGN_MAP.md`](./DESIGN_MAP.md) - every route, its document type, and its intended block sequence. Use when authoring new pages.

---

## 1. Where things live

| Thing | URL |
|---|---|
| Live site (production) | <https://pht-website.vercel.app/> (swap to `primehourtech.com` before launch) |
| Sanity Studio (CMS) | <https://primehourtech.sanity.studio/> |
| Sanity Manage (project settings, CORS, API tokens) | <https://www.sanity.io/manage> |
| Vercel dashboard (hosting, env vars, deploys) | <https://vercel.com/> → your team → `pht-website` project |

The Studio and the web app are separate deployments sharing the same Sanity dataset. Editing in Studio does not automatically push anything live - you trigger a rebuild explicitly (see §5).

---

## 2. Editing content in Studio

Log in at <https://primehourtech.sanity.studio/>. Request access from Sanity Manage if you don't have it.

**Studio tabs (left sidebar):**

| Tab label | What it does |
|---|---|
| Content | Document list - edit fields directly here. |
| Preview (Presentation) | Renders the live site in an iframe with click-to-edit overlays on every Sanity-bound element. Click any heading, card, or button to jump straight to its field. Fastest way to locate fields you'd otherwise have to scroll to find. |
| Query (Vision) | GROQ query runner for developers. Ignore unless debugging. |
| Deploy | Triggers a Vercel rebuild (see §5). |

**Typical edit workflow:**

1. Open any document in Content - or click an element in the Preview iframe to jump straight to its field.
2. Edit the fields.
3. Click **Publish** at the bottom of the document panel. This saves to Sanity but does NOT rebuild the site.
4. Repeat for any other documents you want to update.
5. When you're ready to push everything live, go to Deploy (see §5). Batching multiple publishes into one deploy is encouraged.

**Important:** The Preview tab shows published content only - what's currently live. To preview unpublished drafts, a developer runs the local dev server.

---

## 3. Adding content - required fields and gotchas

### Blog posts (`post` document)

Required fields - a post missing any of these will NOT appear on `/blog`, will NOT get a `/blog/<slug>` detail page, and will NOT enter the RSS feed. The site silently skips incomplete posts at build time; no error is shown.

| Field | Notes |
|---|---|
| Title | Max 120 characters |
| Slug | Auto-generated from title; edit if needed |
| Excerpt | 1–2 sentence summary, max 280 characters. Used on cards and as the post header deck. |
| Category | Pick one: Security, Cloud, Field notes, Compliance, Tooling, Practice |
| Publish Date | Required |
| Author | Reference to a `teamMember` document; that member must exist |
| **Cover Image** | **REQUIRED - see callout below** |
| Body | At least one block of content |

> **Cover Image is required - a post without one is invisible.**
>
> A `post` document that is saved and published but has no Cover Image **will not appear anywhere on the site** - not on `/blog`, not in category pages, not in the RSS feed. This is enforced by the `POST_COMPLETE_FILTER` gate in the site's GROQ queries (`defined(coverImage)` must be true). Upload a cover image (any reasonable aspect ratio; hotspot cropping is enabled) and fill in the alt text field before publishing a post you want to go live.

Optional SEO fields (fall back to title/excerpt if unset): `seoTitle`, `seoDescription`, `ogImage`.

---

### Services (`service` document)

A service that is missing any of the completeness-filter fields will not appear on `/services`, will not generate a `/services/<slug>` detail page, and will not show up as a related service on other service pages.

The completeness filter checks for: `headline`, `heroStat`, `capabilitiesEyebrow`, `faqEyebrow`, `ctaEyebrow`, and `ctaDeck`.

All service fields with `Rule.required()` in the schema:

| Group | Required fields |
|---|---|
| Top-level | `name`, `slug`, `shortDescription`, `iconName`, `order` |
| Hero | `eyebrow`, `headline`, `deck`, `heroStat` (value + label) |
| Approach | `sectionEyebrow`, `sectionHeading`, `sectionBody`, `sectionBullets` (min 2, max 6) |
| Capabilities | `capabilitiesEyebrow`, `capabilitiesHeading`, `capabilities` array (min 3, max 9 items, each with `name` + `body`) |
| Stats | `statStrip` (exactly 4 items, each with `value` + `caption`) |
| FAQ | `faqEyebrow`, `faqHeading`, `faqs` array (1–8 items, each with `question` + `answer`) |
| CTA | `ctaEyebrow`, `ctaDeck` |

Optional: `heroPillLeft`, `heroPillRight`, `faqHelperText`, `specSheetUrl` (when set, "Read / Download spec sheet" buttons render on the service page).

---

### Team members (`teamMember` document)

| Field | Notes |
|---|---|
| `name` | Required, max 64 characters |
| `role` | Required, max 64 characters |
| `bio` | Required, max 280 characters. Shown on Home and About. |
| `order` | Required integer - lower numbers display first |
| `photo` | Not required by the schema (falls back to a grey placeholder), but strongly recommended. 4:5 portrait aspect ratio. Fill in alt text when uploading. |

Team members are referenced by blog posts as the `author` field - a post's Author must point to an existing `teamMember` document.

---

## 4. Blog structure

- `/blog` - paginated list, 12 posts per page. Navigation between pages uses standard URL-based pagination (`/blog/2`, `/blog/3`, etc.), no JavaScript required.
- `/blog/category/<slug>` - per-category filtered list, also paginated. Category slugs are derived from the category name (e.g. "Field notes" → `field-notes`). Filter chips on the blog page are plain links, not JS-driven.
- `/blog/<slug>` - individual post detail page.
- `/blog/rss.xml` - RSS feed of the latest 20 published posts (by publish date).

A post must pass the completeness filter (§3) to appear on any of these routes. **Cover image is the most commonly missed requirement.**

---

## 5. Deploy workflow

The site does not auto-deploy when you publish content in Sanity. You trigger rebuilds explicitly via the **Deploy tab** in Studio.

### Two-stage workflow (recommended)

1. Edit and publish content in Studio (as many documents as you want).
2. In the Studio sidebar, click **Deploy**.
3. Click **Deploy to Preview** - no confirmation required. Vercel rebuilds the preview URL with the published content. Wait 1–2 minutes.
4. Visit the preview URL to review the rendered result.
5. If satisfied, click **Deploy to Production** - an inline confirmation prompt appears ("This will publish current Sanity content to the public site. Continue?"). Click **Yes, deploy to production**. Vercel rebuilds the production URL. Live within 1–2 minutes.

### What each button does

| Button | Hook env var | Confirmation | Branch rebuilt |
|---|---|---|---|
| Deploy to Preview | `SANITY_STUDIO_VERCEL_PREVIEW_DEPLOY_HOOK` | None | `preview` |
| Deploy to Production | `SANITY_STUDIO_VERCEL_DEPLOY_HOOK` | Yes - inline prompt | `main` |

If a button is grayed out or shows a warning that the env var is not set, the corresponding deploy hook URL needs to be added to the Studio's environment variables (see §6).

### Other ways to trigger production deploys

- Push to the `main` git branch (developer workflow).
- Vercel dashboard → Project → Deployments → Redeploy (fallback).

### Security note

The Vercel deploy hook URLs (`SANITY_STUDIO_VERCEL_DEPLOY_HOOK` and `SANITY_STUDIO_VERCEL_PREVIEW_DEPLOY_HOOK`) are embedded in the Studio JavaScript bundle and are visible to anyone with Studio access. This is by design - it matches the same threat model as the prior plugin, which stored the same URL in a Sanity document any editor could read. Studio access should be limited to trusted team members.

If a hook URL is ever leaked or needs to be rotated: Vercel dashboard → Project → Settings → Git → Deploy Hooks → delete the hook and create a new one → update `SANITY_STUDIO_VERCEL_DEPLOY_HOOK` (or `..._PREVIEW_DEPLOY_HOOK`) in the Studio host's environment variables → redeploy the Studio.

---

## 6. Environment variables

### `apps/web` - set on the Vercel web project

| Variable | What it does | Required? |
|---|---|---|
| `SANITY_PROJECT_ID` | Sanity project identifier | Yes |
| `SANITY_DATASET` | Dataset name (usually `production`) | Yes |
| `SANITY_API_VERSION` | Pinned Sanity API version date (e.g. `2026-05-01`) | Yes |
| `SANITY_READ_TOKEN` | Read-only API token (dataset is private - build fails without this) | Yes |
| `SITE_URL` | Public site URL, used for canonical tags, JSON-LD, sitemap, and RSS. Update when domain swaps from `.vercel.app` to `primehourtech.com`. | Yes |
| `CONTACT_FORM_URL` | POST endpoint for the contact + discovery forms (Web3Forms / Formspree / Basin). If unset, both forms render with `action="#"` and submissions go nowhere; build log prints a warning. | Pre-launch |
| `PUBLIC_COOKIE_BANNER_ENABLED` | Set to `"true"` only after legal approves banner copy. Default `false` - banner doesn't render at all. | After legal sign-off |
| `PUBLIC_GTM_CONTAINER_ID` | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`). When set, GTM loads only after a visitor accepts the cookie banner. Pre-requires banner enabled. | When analytics ready |
| `PUBLIC_SANITY_STUDIO_URL` | Studio URL for click-to-edit stega popups. Set to `https://primehourtech.sanity.studio` on the Vercel preview environment only. | Preview env only |
| `PUBLIC_SANITY_VISUAL_EDITING` | Set to `"true"` only on the env that Studio's Presentation iframe loads (typically the Vercel preview deployment). Keeps the ~30 KB overlay script off production visitor traffic. | Preview env only |

### `apps/studio` - set on the Studio host (Sanity-managed hosting)

| Variable | What it does | Required? |
|---|---|---|
| `SANITY_STUDIO_PROJECT_ID` | Sanity project ID. Studio fails to load without it. | Yes |
| `SANITY_STUDIO_DATASET` | Dataset name. Default `production`. | Yes |
| `SANITY_STUDIO_PREVIEW_URL` | URL that the Presentation Tool iframe loads. Point at the Vercel preview URL so editors see the deployed preview inside Studio. | Recommended |
| `SANITY_STUDIO_VERCEL_DEPLOY_HOOK` | Vercel deploy hook for the `main` branch. Powers the "Deploy to Production" button. Get from Vercel → Project → Settings → Git → Deploy Hooks. | For Deploy tool |
| `SANITY_STUDIO_VERCEL_PREVIEW_DEPLOY_HOOK` | Vercel deploy hook for the `preview` branch. Powers the "Deploy to Preview" button. | For Deploy tool |
| `SANITY_STUDIO_VERCEL_PREVIEW_URL` | Optional. Displayed as a "Visit preview" link on the preview deploy card so editors can click straight through. | Optional |

---

## 7. Anti-spam

Both forms already include two honeypot fields:

| Field | Mechanism |
|---|---|
| `_gotcha` (hidden `input`, value always `""`) | Formspree / Basin pattern - bots that populate it are dropped by the provider |
| `botcheck` (visible-to-CSS-but-off-screen `text` input, `tabindex="-1"`, `autocomplete="off"`, `display:none`) | Web3Forms pattern - same drop-on-fill logic |

Both fields are present in the contact page form (`ContactBody.astro`) and the landing page discovery form (`DiscoveryForm.astro`). The form provider does the dropping server-side - nothing needs to be configured here.

No CAPTCHA is installed. If post-launch spam volume becomes a problem, Cloudflare Turnstile is the planned addition (see §8).

---

## 8. Intentionally deferred features

These were considered and deliberately left out. Don't implement without a real trigger.

| Feature | Why deferred | Trigger to revisit |
|---|---|---|
| Per-category cookie consent modal | Current banner is binary (accept/reject). GDPR-style per-category controls require legal to specify which categories are needed. If added, GTM must migrate to Consent Mode v2. | Legal requires granular GDPR controls |
| V2 StickyForm landing template | Current landing pages use the Editorial layout. A StickyForm variant (floating form sidebar) requires a `layoutVariant` schema field + template-switching logic, plus possibly a separate `LANDING_FORM_URL` env var. | A real paid-ad campaign needs the sticky layout |
| Newsletter signup block | No newsletter provider is chosen. A `newsletterSignup` block can be added once a provider is selected. | Provider selected |
| Cloudflare Turnstile (CAPTCHA) | Honeypots cover realistic bot volume. Turnstile adds friction for real users. | Measurable spam volume post-launch |

See [`TODO.md`](./TODO.md) section D for the full deferred list with additional items (spec-sheet / services-overview PDF links, adding `/switching` to the nav, draft preview in the Presentation pane, etc.). Note: deploy-hook secret rotation is covered in §5 above, not deferred.
