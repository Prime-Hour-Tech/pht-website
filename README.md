# pht-website

Prime Hour Tech's marketing site. Static-generated with Astro, content managed in Sanity, deployed to Vercel.

## Live links

- **Site:** <https://pht-website.vercel.app/>
- **Sanity Studio:** <https://primehourtech.sanity.studio/>

## Stack

- **Frontend:** [Astro](https://astro.build/) 6 (static output)
- **CMS:** [Sanity](https://www.sanity.io/) Studio v5 (schemas-in-code, React 19)
- **Hosting:** [Vercel](https://vercel.com/) (edge CDN)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4 (via the `@tailwindcss/vite` plugin)
- **Package manager:** [pnpm](https://pnpm.io/) workspaces (Node 22 LTS)

## Repo layout

```
apps/
  web/      # Astro site (deployed to Vercel)
  studio/   # Sanity Studio (deployed to primehourtech.sanity.studio)
```

Project reference docs at the root:
- **`DESIGN_MAP.md`** — every route, its document type, and its intended block sequence. Use when authoring content or adding new pages.
- **`TODO.md`** — current launch-state checklist (content polish, infra config, post-deploy verification).

## Prerequisites

- [Node.js 22 LTS](https://nodejs.org/) — the included `.nvmrc` pins the version for nvm / nvm-windows users.
- [pnpm](https://pnpm.io/installation).

## Local development

```bash
# Install dependencies for the whole workspace
pnpm install

# Each app has its own .env.example. Copy + fill in.
cp apps/web/.env.example apps/web/.env
cp apps/studio/.env.example apps/studio/.env
```

Then:

```bash
pnpm dev:web        # Astro dev server at http://localhost:4321
pnpm dev:studio     # Sanity Studio at http://localhost:3333
```

Run both in parallel terminals for the full editing experience (Visual Editing's iframe loads the web dev server inside Studio).

## Tests

```bash
pnpm test
```

100 tests across 5 files covering GROQ projection assertions, JSON-LD builders, and supporting helpers. Add unit tests for any new pure logic; Astro components themselves aren't unit-tested.

## Editing content

Marketers / editors use the hosted Studio at <https://primehourtech.sanity.studio/>:

1. Log in with your Sanity account (request access via Sanity Manage if you don't have it yet).
2. **Easiest workflow — click-to-edit:** open any page doc → click the **Presentation** tab → the live site renders in an iframe → click any heading, hero, or button to jump straight to its field. No need to scroll the blocks array.
3. Or edit fields directly in the document view.
4. Click **Publish** on each document you change.
5. When ready to ship, click the **Deploy** tool in the sidebar — this triggers a Vercel rebuild. Live within 1–2 minutes.

Batching multiple edits into one Deploy click is encouraged. The site doesn't auto-deploy on every publish.

## Visual Editing

The Studio's Presentation pane shows the live site in an iframe with click-to-edit overlays on every Sanity-bound element. Enabled by:

1. **Sanity Manage** (sanity.io/manage): add the Vercel preview URL to the project's CORS allowlist, with "Allow credentials" checked.
2. **Studio env**: `SANITY_STUDIO_PREVIEW_URL` pointing at the preview/live web URL.
3. **Vercel preview env (NOT production)**: `PUBLIC_SANITY_VISUAL_EDITING=true` and `PUBLIC_SANITY_STUDIO_URL=https://primehourtech.sanity.studio`. Leaving these unset on production keeps the overlay script (~30 KB) out of public visitor traffic.

Scope: published-content only — editors see what's currently live. To preview unpublished drafts they use `pnpm dev:web` locally.

## Seeding the Sanity dataset

A comprehensive seed file at `apps/studio/seed/initial-content.ndjson` populates 25 starter docs (7 page docs, 6 services, 4 team members, 3 posts, 2 landing pages, 3 singletons) with copy lifted from the design canvas. Run from the repo root:

```bash
pnpm seed:studio              # additive — skips existing docs
pnpm seed:studio:replace      # overwrites existing docs (loses author edits)
```

See `apps/studio/seed/README.md` for details on the `--missing` vs `--replace` modes, image-upload reminders, and the contactInfo special case.

After seeding, replace placeholder content in Studio (placeholder engineer names, design-placeholder testimonial, etc.). The seed leaves image fields empty — upload logos / team photos / cover images in Studio.

## Deploy

- **Web app** auto-deploys to Vercel on push to `main`.
- **Sanity Studio** is deployed with `pnpm deploy:studio` (only needed after schema changes — content edits don't require a Studio redeploy).
- **Production rebuilds** can be triggered three ways:
  1. The **Deploy** button in the Studio (marketer-friendly). Requires `SANITY_STUDIO_VERCEL_DEPLOY_HOOK` to be set on the Studio host.
  2. A push to `main` (developer-friendly).
  3. The Vercel dashboard's manual redeploy (fallback).

## Environment variables

### `apps/web/.env`

Required:

| Variable | Purpose |
|---|---|
| `SANITY_PROJECT_ID` | Project identifier |
| `SANITY_DATASET` | Usually `production` |
| `SANITY_API_VERSION` | Pinned API version date |
| `SANITY_READ_TOKEN` | Read-only token (dataset is private) |
| `SITE_URL` | Public site URL — used for canonical, JSON-LD, sitemap, RSS |

Feature gates (build log warns when unset; features degrade off):

| Variable | Purpose |
|---|---|
| `CONTACT_FORM_URL` | Contact form action URL — Web3Forms / Formspree / Basin |
| `PUBLIC_COOKIE_BANNER_ENABLED` | `"true"` after legal approves banner copy |
| `PUBLIC_GTM_CONTAINER_ID` | Google Tag Manager container (`GTM-XXXXXXX`); consent-gated |
| `PUBLIC_SANITY_STUDIO_URL` | Studio URL — stega click-to-edit popup target |
| `PUBLIC_SANITY_VISUAL_EDITING` | `"true"` ONLY on the env that Studio's Presentation iframe loads |

### `apps/studio/.env`

| Variable | Purpose |
|---|---|
| `SANITY_STUDIO_PROJECT_ID` | Browser-exposed project ID (required — Studio fails to load without) |
| `SANITY_STUDIO_DATASET` | Browser-exposed dataset name (default: `production`) |
| `SANITY_STUDIO_PREVIEW_URL` | URL the Presentation Tool iframe loads (default: `http://localhost:4321`) |
| `SANITY_STUDIO_VERCEL_DEPLOY_HOOK` | Vercel deploy hook URL — gates the Studio Deploy tool's visibility |

### Vercel-only

| Variable | Notes |
|---|---|
| `VERCEL_ENV` | Auto-set by Vercel (`production` / `preview` / `development`). Used by the build's env-warning logic to scope the `SITE_URL` localhost warning. |
