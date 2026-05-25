# pht-website

Prime Hour Tech's marketing site. Static-generated with Astro, content managed in Sanity, deployed to Vercel.

## Live links

- **Site:** <https://pht-website.vercel.app/>
- **Sanity Studio:** <https://primehourtech.sanity.studio/>

## Stack

- **Frontend:** [Astro](https://astro.build/) (static output, Astro 6)
- **CMS:** [Sanity](https://www.sanity.io/) (Studio v3, schemas-in-code)
- **Hosting:** [Vercel](https://vercel.com/) (edge CDN)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4 (via the `@tailwindcss/vite` plugin)
- **Package manager:** [pnpm](https://pnpm.io/) workspaces (Node 22 LTS)

## Repo layout

```
apps/
  web/      # Astro site (deployed to Vercel)
  studio/   # Sanity Studio (deployed to primehourtech.sanity.studio)
```

## Prerequisites

- [Node.js 22 LTS](https://nodejs.org/) — the included `.nvmrc` pins the version for nvm / nvm-windows users.
- [pnpm](https://pnpm.io/installation).

## Local development

```bash
# Install dependencies for the whole workspace
pnpm install

# Copy env template and fill in your Sanity values
cp .env.example apps/web/.env
# Then edit apps/web/.env to add SANITY_PROJECT_ID, SANITY_READ_TOKEN, etc.

# Studio also needs its own .env with the SANITY_STUDIO_ prefix:
#   apps/studio/.env:
#     SANITY_STUDIO_PROJECT_ID=<project id>
#     SANITY_STUDIO_DATASET=production
```

Then:

```bash
pnpm dev:web        # Astro dev server at http://localhost:4321
pnpm dev:studio     # Sanity Studio at http://localhost:3333
```

## Tests

```bash
pnpm test
```

(Currently covers GROQ query construction; expand as needed.)

## Editing content

Marketers / editors use the hosted Studio at <https://primehourtech.sanity.studio/>:

1. Log in with your Sanity account (request access via Sanity Manage if you don't have it yet).
2. Edit pages, site settings, etc.
3. Click **Publish** on each document you change.
4. When ready to ship, click the **Deploy** tool in the sidebar — this triggers a Vercel rebuild. Live within 1–2 minutes.

Batching multiple edits into one Deploy click is encouraged. The site doesn't auto-deploy on every publish.

## Deploy

- **Web app** auto-deploys to Vercel on push to `main`.
- **Sanity Studio** is deployed with `pnpm deploy:studio` (only needed after schema changes — content edits don't require a Studio redeploy).
- **Production rebuilds** can be triggered three ways:
  1. The **Deploy** button in the Studio (marketer-friendly).
  2. A push to `main` (developer-friendly).
  3. The Vercel dashboard's manual redeploy (fallback).

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `SANITY_PROJECT_ID` | `apps/web/.env`, Vercel | Project identifier |
| `SANITY_DATASET` | `apps/web/.env`, Vercel | Usually `production` |
| `SANITY_API_VERSION` | `apps/web/.env`, Vercel | Pinned API version date |
| `SANITY_READ_TOKEN` | `apps/web/.env`, Vercel | Read-only token (dataset is private) |
| `SITE_URL` | `apps/web/.env`, Vercel | Public site URL (used for canonical + sitemap) |
| `SANITY_STUDIO_PROJECT_ID` | `apps/studio/.env` | Browser-exposed copy for the Studio bundle |
| `SANITY_STUDIO_DATASET` | `apps/studio/.env` | Browser-exposed dataset name for the Studio |
