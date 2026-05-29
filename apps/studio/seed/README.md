# Sanity Dataset Seed

NDJSON file pre-populating the Sanity dataset with content lifted from the design canvas. Designed so the marketer opens Studio after import and edits in place instead of authoring from scratch.

## Usage

From the repo root:

```bash
# Default — additive (uses --missing flag; skips docs that already exist by _id)
pnpm seed:studio

# Replace — overwrites every doc that matches an _id in the seed (loses author edits)
pnpm seed:studio:replace
```

Or from `apps/studio/`:

```bash
pnpm seed           # additive (--missing)
pnpm seed:replace   # overwrite (--replace)
```

**Important Sanity CLI default:** `sanity dataset import` without `--missing` or `--replace` flags **fails on the first conflict** ("Document by ID X already exists"). Our `pnpm seed` script wraps `--missing` so the import is safe and re-runnable. Use `pnpm seed:replace` only when you intentionally want to reset existing docs to the seed version.

The CLI prompts for confirmation before importing. Cancel with `Ctrl+C`.

## What gets seeded

25 docs total. Default `pnpm seed` (additive) creates docs that don't exist and skips ones that do:

- **7 page docs** with full block sequences — home, about, industries, contact, services, blog, switching
- **6 service docs** — managed-it, cybersecurity, cloud, infrastructure, vcio-advisory, compliance
- **4 teamMember docs** — Devin + 3 placeholder engineers (swap names + bios when real info is available)
- **3 post docs** — varied categories for blog grid visual richness
- **2 landingPage docs** — example paid-ad landers (Managed IT + Cybersecurity)
- **3 singletons** — termsPage, privacyPage (full Portable Text bodies), contactInfo

## What's NOT seeded (intentionally)

- **`siteSettings`, `navigation`, `footer`** — these are likely already authored (the build's BaseLayout gets past them). Including them in the seed would risk clobbering existing values. To reseed these explicitly, edit the NDJSON to include them and run with `--replace`.

- **Image assets** — NDJSON references asset `_ref`s but binaries need separate upload. After seeding, upload these in Studio:
  - `siteSettings.logoDark`, `siteSettings.logoLight`, `siteSettings.defaultOgImage` (1200×630 PHT share card)
  - `teamMember.photo` × 4 (4:5 portraits)
  - `post.coverImage` × 3
  - `originPhoto.image` on the about page (founder/office photo)
  - `officeCulture.image` on the about page

- **Real customer data** — testimonials use design's placeholder attribution ("Operations Director · Professional services firm · 42 seats"). Replace when real customer stories are available.

## `contactInfo` special case

`contactInfo` is included in the seed **only** to set the `serviceAreaSub` field (deferred HANDOFF since Slice 4). Default additive import will skip it because the singleton already exists.

To apply the `serviceAreaSub` value, run with `--replace`:

```bash
pnpm sanity dataset import seed/initial-content.ndjson production --replace
```

This rewrites the singleton with the seed's full contactInfo. Verify in Studio that phone/email/hours/address still match production reality afterward; replace as needed.

## Re-running the seed

Re-runs are safe with default additive mode (skips existing docs). If you've edited a seeded doc in Studio and want to keep your edits, **do not** use `--replace`.

To reset a single doc to the seed version: edit the NDJSON to include only that doc, then run with `--replace`. Or delete the doc in Studio first, then re-run additive.

## Hand-off note

The seed copy is lifted from the design canvas voice (PHT-as-SLC-MSP, conversational, transparent about pricing). Marketer should swap section-by-section:
- Real customer logos in the trust strip
- Real testimonials
- Real engineer names/bios/photos
- Actual contact info if it differs from the seed
- Authentic case study language in the field-notes posts
