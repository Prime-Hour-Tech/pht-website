# TODO — pht-website foundation

> Handoff doc for resuming the technical foundation work. Last updated 2026-05-22.

## Status at a glance

| Task | Status |
|---|---|
| 1. Initialize pnpm workspace | ✅ Done |
| 2. Create Sanity project | ✅ Done (project ID `l2p3otz5`, dataset `production`) |
| 3. Scaffold Sanity Studio | ✅ Done |
| 4. `siteSettings` singleton schema | ✅ Done |
| 5. `hero` block object schema | ✅ Done |
| 6. `page` document schema | ✅ Done |
| 7. Scaffold Astro web app | ✅ Done (Astro 6.3.7) |
| 8. Tailwind CSS via Vite plugin | ✅ Done (Tailwind 4) |
| 9. `@sanity/astro` integration + client | ✅ Done |
| 10. Sanity query layer + Vitest tests | ✅ Done (3 tests passing) |
| 11. BaseLayout + SEO component | ✅ Done (incl. `og:site_name`) |
| 12. Hero block component | ✅ Done |
| 13. Dynamic page route | ✅ Done |
| 14. Sitemap + robots.txt | ✅ Done (placeholder sitemap URL) |
| 15. Vercel project + first deploy | 🟡 **In progress — blocked on user action** |
| 16. Sanity → Vercel deploy webhook | ⏳ Pending |
| 17. Deploy Sanity Studio | ⏳ Pending |
| 18. End-to-end smoke test + README | ⏳ Pending |

Working tree is clean as of last commit `ca66e7c chore: silence Vercel build warnings`. Current branch: `development`.

## Currently waiting on

The Vercel project was inadvertently created against a `Devitar/pht-website` personal-fork (Vercel's GitHub App wasn't installed on the `Prime-Hour-Tech` org). We need to re-link Vercel to the canonical org repo before continuing.

**Decision already made:** production branch = `main`. Workflow will be PR `development → main` for releases.

## Resume sequence (do these in order)

### 1. Install Vercel GitHub App on the org

Open <https://github.com/apps/vercel> → **Install/Configure** → choose **Prime-Hour-Tech** → grant access to `pht-website` only (least privilege).

### 2. Sync `origin/main` with `development`

`origin/main` is at `56da00b`, which is far behind `development`. Vercel's production deploy will use whatever's on `main`, so bring it up to date:

```bash
git checkout main
git merge development --ff-only
git push origin main
git checkout development
```

(Or open a PR `development → main` on GitHub if you want the formal review trail.)

### 3. Delete the old Vercel project

In Vercel: **Project → Settings → Advanced → Delete Project**. Confirms severance from the Devitar fork.

### 4. (Optional) Delete `Devitar/pht-website`

On GitHub: `github.com/Devitar/pht-website` → **Settings → Danger Zone → Delete**. Avoids two-repo confusion. Keep only if you want a backup; just don't push to it.

### 5. Re-import the org repo in Vercel

Vercel → **Add New → Project → Import Git Repository** → pick `Prime-Hour-Tech/pht-website`.

Configure:
- **Framework Preset:** Astro (auto-detected from `vercel.json`).
- **Root Directory:** `./` (repo root — `vercel.json` handles paths).
- **Production Branch:** `main`.
- **Environment Variables** (Production scope):
  - `SANITY_PROJECT_ID` = `l2p3otz5`
  - `SANITY_DATASET` = `production`
  - `SANITY_API_VERSION` = `2026-05-01`
  - (leave `SITE_URL` blank for now — set in step 7)

Click **Deploy**.

### 6. Verify the deploy

Build log header should now show `Cloning github.com/Prime-Hour-Tech/pht-website`. The build will produce **0 pages** (no published content in Sanity yet) — that's expected, not an error.

Note your assigned stable Vercel URL (likely `https://pht-website.vercel.app` or with a suffix).

### 7. Set `SITE_URL` and redeploy

In Vercel → **Project → Settings → Environment Variables** (Production scope):
- `SITE_URL` = `https://<your-assigned>.vercel.app`

Then **Deployments → latest → ⋯ → Redeploy** (no cache). This makes canonical URLs + sitemap use the production domain.

### 8. Update `robots.txt` with the real sitemap URL

Edit `apps/web/public/robots.txt` — replace the placeholder line:

```txt
Sitemap: https://example.com/sitemap-index.xml
```

…with your real URL:

```txt
Sitemap: https://<your-assigned>.vercel.app/sitemap-index.xml
```

Commit and push to `main`. Vercel redeploys automatically.

**Task 15 is then complete.**

## Remaining tasks (16–18)

### Task 16 — Sanity → Vercel deploy webhook

User actions:
1. In Vercel: **Settings → Git → Deploy Hooks** → create a hook named `sanity-publish` on the `main` branch. Copy the URL.
2. In Sanity Manage (`https://www.sanity.io/manage` → your project → API → Webhooks):
   - **Name:** Vercel deploy on publish
   - **URL:** the Vercel deploy hook URL from step 1
   - **Dataset:** `production`
   - **Trigger on:** Create + Update + Delete
   - **Filter (GROQ):** `_type in ["page", "siteSettings"]`
   - **HTTP method:** POST
   - **API version:** `2026-05-01`
   - **Enable:** ON
3. Smoke test: change `siteSettings.siteDescription` in Studio → Publish → confirm Vercel deploys within ~30s.

### Task 17 — Deploy Sanity Studio to Sanity hosting

```bash
pnpm --filter studio exec sanity login   # one-time per machine
pnpm --filter studio deploy
```

When prompted for a hostname, pick something like `pht` → Studio lives at `https://pht.sanity.studio`.

Invite editors in Sanity Manage → Members (role: Editor).

### Task 18 — End-to-end smoke test + README

1. Create real content in the now-hosted Studio: publish `Site Settings` and a `Page` with slug `home` containing a Hero block.
2. Trigger or wait for a Vercel deploy.
3. Verify the live URL renders the Hero. View source — confirm `<title>`, meta description, `og:site_name`, canonical link.
4. Run a clean build locally: `pnpm install && pnpm --filter web build && pnpm --filter web test`.
5. Append local-dev + deploy instructions to root `README.md` (see plan doc for the exact snippet).

## Reference

The full spec and implementation plan are local-only (under gitignored `docs/`):

- Spec: `docs/superpowers/specs/2026-05-22-marketing-site-technical-foundation-design.md`
- Plan: `docs/superpowers/plans/2026-05-22-marketing-site-technical-foundation.md`

Sanity project ID: `l2p3otz5` (also in `apps/web/.env` and `apps/studio/.env`, both gitignored).

## Open questions for v2+ planning

These were intentionally deferred at the foundation level. Decide before any content/design plan:

- Page inventory for v1 (home, about, services, contact, …?)
- Blog in scope? (`post` + `author` schemas would be added)
- Design direction — existing brand assets vs. starting from scratch
- Domain — purchased? DNS managed where?
- Analytics provider (Plausible / Fathom / GA?)
- Forms / lead-capture (Vercel functions / Formspree / HubSpot?)
- Multilingual support — required now or later?

## Deferred from v1 (planned follow-up work)

Mentioned in the spec but explicitly out of scope for the foundation plan. Each warrants its own follow-up plan when the time comes:

- Additional block types: Testimonial, FAQ, CTA section, FeatureGrid, etc.
- Blog (`post` + `author` schemas, listing + detail pages)
- JSON-LD structured data (Organization, Article)
- Analytics provider integration
- Forms / lead capture
- Multilingual (i18n)
- Lighthouse perf-regression suite (CI gate)
- Webhook auth hardening (HMAC signing on the deploy hook)
- OG image URL building via `@sanity/image-url` (route currently passes no `ogImageUrl` to BaseLayout)
- Per-page draft preview deploy environment (separate Vercel project with drafts-enabled token)
