# Handoff: Prime Hour Tech — Marketing Site Redesign

## Overview

A full redesign of **primehourtech.com** — a Salt Lake City-based managed IT
services provider (MSP) marketing site. The new design replaces the existing
dark-themed brochure site with a confident editorial layout: cool whites
with a dark numbers-led hero, a Newsreader serif display + Geist sans pairing,
brand-red accent, and a consistent chrome (utility row + sticky nav + dark
footer) across every page.

Eleven page types are mocked at desktop (1280px) and mobile (390px):

- Home (final direction — `B5`)
- About
- Industries (overview)
- Service template (one component, 6 routes via content map)
- Blog (root index + post template)
- Contact
- Terms & Conditions
- Privacy Policy

## About the design files

**The files in this bundle are design references created in React +
inline-style JSX**, rendered statically in a design canvas. They are
**prototypes showing intended look and behavior, not production code to copy
directly.**

The original production site lives at
`primehourtech.com-main/` and is built with **Astro + Tailwind**. The task
is to **recreate these designs in that existing environment** — keep
Astro's content collections, file-based routing, and the Tailwind theme
file; replace the page bodies with the layouts shown here. Do *not* lift
inline-style React into Astro components; instead, translate the design
tokens to Tailwind theme tokens and build the components fresh against
that theme.

If the production stack changes (e.g. Astro → Next.js), the same principle
applies: follow the target stack's idioms, but mirror the design system
faithfully — colors, type scale, spacing, component patterns.

## Fidelity

**High-fidelity (hifi).** Every page is pixel-targeted with final colors,
typography, spacing, radii, and chrome. Mobile mocks are stacked layouts
of the same content at 390px. Hover/focus/menu-open/tablet states are
**not drawn** — see *Open questions* below.

## Pages

Each page in the canvas maps to a production route. The desktop heights
listed are the artboard heights; treat them as the **rendered content
height at 1280px**, not a constraint.

### 1. Home — `/`
- **Component:** `HomeB5` in `home-b-variants.jsx`
- **Purpose:** First impression. Lead with a savings figure ($5,200/mo
  for a 25-seat client) and the differentiator ("we treat your network
  like it's ours"). Drive to discovery-call CTA.
- **Layout (top → bottom):**
  1. Utility row (Open-now + location + phone + email)
  2. Sticky nav (logo + 5 nav items + phone + Schedule CTA button)
  3. **Dark numbers hero** — see `DarkNumbersHero` in `site-chrome.jsx`.
     Big `$5,200` (144px sans), accent rail eyebrow, h1, body, two CTAs,
     credentials grid panel **flush to right edge** (no right radius —
     intentional; bleeds off-page).
  4. Trust strip (6 client-type labels in mono, flex-wrap)
  5. Team grid (4 columns, photo + name + role)
  6. Headaches section (2-col scannable)
  7. Savings chart (SVG bar chart, before/after)
  8. Services list (sticky h2 left, 6-row plain-spoken list right)
  9. Beliefs / values section
  10. Final CTA + dark footer

### 2. About — `/about`
- **Component:** `AboutPage` in `about-page.jsx`
- **Purpose:** Establish the small-shop-by-design narrative.
- **Layout:** Hero (104px serif h1 + mission paragraph), wide office photo
  with dark caption-pull overlay, 3-column story (Where we came from / Why
  we started / How we run today), numbers strip (4 stats), milestones
  timeline (5 entries, Q1 2024 → Q2 2026), beliefs section, team grid,
  office/culture (photo + check-bullet list), final CTA, footer.

### 3. Industries — `/industries`
- **Component:** `IndustriesPage` in `industries-page.jsx`
- **Purpose:** Show vertical specialization.
- **Layout:** Hero, sticky horizontal-scroll jump nav (pill chips with
  icons), 4 vertical sections (Professional Services / SMB / Regulated /
  Nonprofits) each with intro + bullet list + "Who in this category" card.
  Don't-see-yours CTA, footer.

### 4. Service template — `/managed-it`, `/cybersecurity`, `/cloud-services`, `/it-projects`, `/vcio`, `/web-services`
- **Component:** `ServicePage` in `service-page.jsx` (driven by `slug` prop)
- **Content map:** `SERVICE_CONTENT` constant in the same file. All six
  routes consume the same component — **build this once.** In Astro, model
  each service as a content-collection entry; in other stacks use a route
  parameter + lookup.
- **Layout:** Breadcrumb, dark hero (same `DarkNumbersHero` as home, with
  an "At a glance" stat card on the right instead of credentials), how-it-
  works section (sticky title left, body + bullets right), capabilities
  grid (3-col, 6 cards), 4-stat strip, FAQ accordion (3–4 questions), Other
  services row (5 cards), final CTA, footer.

### 5. Blog index — `/blog`
- **Component:** `BlogIndexPage` in `blog-page.jsx`
- **Layout:** Hero, sticky filter bar (category chips + ⌘K search affordance
  + sort), featured lead post (2-col), recent-posts grid (3-col, 5 cards),
  pagination, newsletter signup, footer.

### 6. Blog post template — `/blog/[slug]`
- **Component:** `BlogPostPage` in `blog-page.jsx`
- **Layout:** Breadcrumb, header (eyebrow + 64px serif title + italic deck +
  byline strip with share buttons), full-bleed cover, prose body
  (720px max width), pull quote with accent left-rail, inline figure with
  caption, author bio card, "Keep reading" related-posts row (3 cards),
  final CTA, footer.

### 7. Contact — `/contact`
- **Component:** `ContactPage` in `contact-page.jsx`
- **Layout:** Header, two-column body — form on the left (name, company,
  email, phone, size, message), contact card on the right (phone/email/
  hours block + scheduling CTA).

### 8. Terms — `/terms` & 9. Privacy — `/privacy`
- **Components:** `TermsPage` in `terms-page.jsx` / `PrivacyPage` in
  `privacy-page.jsx`
- **Layout:** Header, plain-language summary callout (accent-tinted card),
  sticky TOC sidebar (260px) + sectioned body (numbered `§ 01` through
  `§ 14`, prose under each), end-of-doc card with contact link, footer.

### 10. Mobile mockups (390px)
Every page above has a mobile companion in `mobile-home-about.jsx` and
`mobile-service-blog.jsx`. Shared mobile chrome (`MobileTop`,
`MobileFooter`, `MobilePageHeader`, `MobileCTABlock`) lives in
`mobile-chrome.jsx`. **Use these as a guide for the stacking pattern; do
not build separate mobile components in production** — build the desktop
components with responsive class variants.

## Interactions & behavior

### Navigation
- **Sticky top nav** (`SiteNav`) — `position: sticky; top: 0; z-index: 5`.
  Active item underlined with 2px accent border + bold weight + chevron
  glyph. Phone number and "Schedule a call" CTA on the right.
- **Mobile:** Hamburger button replaces the nav links. Drawer pattern,
  animation, and focus trap **TBD** — not drawn in the mocks.
- **Utility row** above nav: stays at top, not sticky.

### Buttons
- **Primary** — accent fill, 8px radius, 600 weight, drop shadow
  `0 14px 32px -12px <accent>`. Arrow glyph on the right.
- **Ghost** — transparent, 1px border, same radius/weight, no shadow.
- **Hover/focus/active states are not drawn.** Use opinionated defaults:
  ~5% bg darken for primary; bg fill for ghost on hover; focus ring of
  2px accent at 40% opacity offset 2px.

### Forms (contact, newsletter)
- **Validation rules not specified.** Required fields are marked with `*`
  in the labels. Use HTML5 validation as a floor; full UX TBD.
- **Submit handler** — wire to existing primehourtech form endpoint.

### Animations
- The current mocks have no animations. The accent-toned button shadow
  is the only motion-adjacent element. Suggested: 200ms ease-out for
  hover/focus state changes; 300ms for the mobile drawer.

### Accordions (FAQ, mobile details, legal-page TOC drawer on mobile)
- Use native `<details>` for FAQ rows. First item starts open. No animated
  reveal in the mocks; a small height/opacity transition is fine.

### Cookie banner
- Exists in `shared-blocks.jsx` as `CookieBanner`. **Defer to legal sign-off
  on copy and tracking choices** before wiring it up.

## State management

The site is mostly static. State surfaces:
- **Contact form** — local form state, submit to existing endpoint.
- **Newsletter form** — local form state, submit to ESP (Mailchimp, etc).
- **Blog filter / search** — client-side filter against `BLOG_POSTS` (Astro
  collection in production). ⌘K search is a future feature; the chip is
  a UI affordance only.
- **Mobile menu** — open/closed state. Drawer pattern TBD.
- **Cookie banner** — dismissed flag in localStorage.

No data fetching is required for the marketing pages themselves.

## Design tokens

All tokens live in `tokens.jsx`. Translate to Tailwind theme:

### Colors

```
LIGHT THEME                              DARK BAND
bg          #ffffff                      dark         #0f1115
bgAlt       #F8F9FA                      darkText     #f2f3f5
surface     #ffffff                      darkMuted    #9aa0a6
ink         #1A1A1A                      darkLine     rgba(255,255,255,0.10)
inkBody     #33363c
muted       #5b6068                      ACCENT (default brand red)
line        rgba(26,26,26,0.10)          #dc2626
lineSoft    rgba(26,26,26,0.06)          alternates in ACCENTS map (rust, crimson, amber, blue, green)
success     #1f7a3a (Open-now indicator)
```

### Type families
- **Display serif:** `Newsreader` (Google Fonts)
- **Sans body/UI:** `Geist` (Google Fonts)
- **Mono eyebrow/meta:** `Geist Mono` (Google Fonts)

Loaded via Google Fonts in `<head>`.

### Type scale (px)

| Token        | Px  | Used for                                  |
| ------------ | ---:| ----------------------------------------- |
| displayXxxl  | 104 | Home + About hero h1                      |
| displayXxl   |  88 | Service hero h1                           |
| displayXl    |  72 | Legal page h1                             |
| displayLg    |  64 | Featured blog title; large h2             |
| displayMd    |  52 | Section h2 (story heading, final CTA)     |
| displaySm    |  44 | Section h2 (mid-page)                     |
| displayXs    |  36 | Blog post h2                              |
| serifMd      |  32 | h3, mobile h1                             |
| serifSm      |  26 | Card title, mobile h2                     |
| serifXs      |  22 | Tertiary serif                            |
| bodyXl       |  21 | Deck                                      |
| bodyLg       |  18 | Larger body                               |
| bodyMd       |  17 | Long-form body                            |
| bodyBase     |  16 | Default body                              |
| bodySm       |14.5 | Small body, form labels                   |
| bodyXs       |  13 | Tiny body                                 |
| label        |  13 | Chips, nav labels                         |
| meta         |  11 | Mono eyebrows                             |
| micro        |  10 | Tiniest tags                              |

### Line heights
display 1.0 / h2 1.05 / h3 1.18 / body 1.55 / bodyLg 1.65 / prose 1.7

### Letter spacing (em)
displayTight -0.035 / display -0.03 / h2 -0.025 / h3 -0.015 /
monoEyebrow 1.4 / monoLabel 1.2 / monoMeta 0.5

### Spacing scale (px)
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 56 / 64 / 72 / 80 / 96 (multiples of 4)
- Section vertical padding **96px** desktop, mobile uses smaller values
- Section horizontal **40px** desktop, **20px** mobile

### Radii (px)
sm 6 / md **8 (buttons)** / lg **10 (standard cards)** / xl 12 /
xxl **14 (hero/credentials panel)** / pill 999 (chips)

### Shadows
- **Button:** `0 14px 32px -12px <accent>` — accent-toned drop
- **Card:** `0 1px 3px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06)`
- That's it — no other shadows in the design.

### Layout widths (px)
- **contentMax: 1240** — section inner container, capped
- **narrowMax: 1080** — home/service final CTA
- **proseMax: 720** — blog post body, legal section body
- **mobileW: 390** — mobile artboard

## Shared components

See `site-chrome.jsx`. Build these first:

| Component         | Notes                                                                                                                                                  |
| ----------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------|
| `UtilityRow`      | Top bar: "Open now" + location + phone + email                                                                                                       |
| `SiteNav`         | Logo + 5 nav items + phone + CTA. `active` prop sets indicator. Sticky.                                                                              |
| `Breadcrumb`      | Uppercase mono crumbs. Trail items can be `[label, href]` (link) or string (current page).                                                          |
| `PageHeader`      | Eyebrow + serif h1 + deck. Two-column layout when `deck` is provided.                                                                                 |
| `DarkNumbersHero` | The signature hero: dark band, accent rail, headline content as JSX, optional `right` slot flush to artboard edge with no right radius (intentional). |
| `CTACard`         | Final-CTA pattern: 2-col with copy left, contact card right.                                                                                          |
| `StatStrip`       | n-column stat row. `cols` defaults to 4.                                                                                                              |

Page-specific patterns kept inline (don't bother componentizing in
production unless reused beyond the original page):
- About: timeline, story 3-col, office-photo block
- Industries: jump nav + sectioned verticals
- Blog post: pull quote, inline figure with caption, author bio card
- Service: FAQ accordion, capabilities grid, Other-services row

## Assets

**Photography** — every `<Photo label="…">` is a placeholder. Real assets
needed:
- 4 team portraits (TEAM constant in `shared-blocks.jsx`)
- Founder + office wide shots (About hero, About office-culture section)
- 6 blog post cover images (`BLOG_POSTS` in `blog-page.jsx`)
- Optional: industries-page hero image

**Real customer logos** — currently text labels ("LAW FIRM 01", etc) in
trust strip. Replace with SVG/PNG logos when available.

**Real numbers** — the `$5,200/mo saved` figure on the home hero should
be backed by real engagement data before launch.

**Engineer names** — TEAM constant uses role placeholders. Swap with real
names + credentials.

**Logo** — `Logomark` is a placeholder geometric mark; PHT's real logo is
at `primehourtech.com-main/public/logo.png` and as `favicon.svg`.

**Favicons** — already shipped in `primehourtech.com-main/public/`.

**Icons** — complete; 24 glyphs in `Icon` (`shared.jsx`). All inline SVG,
stroke-current so they inherit accent color.

## Screenshots

Above-the-fold previews of every page are in `screenshots/`:

- Desktop (`home.png`, `about.png`, `service.png`, `industries.png`,
  `blog.png`, `blog-post.png`, `contact.png`, `terms.png`, `privacy.png`)
- Mobile  (`mobile-home.png`, `mobile-about.png`, `mobile-service.png`,
  `mobile-industries.png`, `mobile-blog.png`, `mobile-blog-post.png`,
  `mobile-contact.png`, `mobile-privacy.png`)

These show the hero / first viewport of each page so you can recognize at a
glance which page is which. For the full layout below the fold, open the
corresponding JSX file in this bundle and read top-to-bottom — the markup
maps 1:1 to the rendered page.

## Files included in this bundle

| File                            | Purpose                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| `index.html`                    | Entry; script-tag dependency order reference                     |
| **`tokens.jsx`**                | ★ Design tokens — single source of truth                         |
| **`site-chrome.jsx`**           | ★ Shared chrome components                                       |
| `shared.jsx`                    | Icon set, Photo placeholder, Logomark, LiveDot, PHT config       |
| `shared-blocks.jsx`             | HeadachesSection, SavingsSection, TeamSection, BeliefsSection, CookieBanner |
| `home-b-variants.jsx`           | `HomeB5` (the chosen home) + B2/B3/B4 reference variants         |
| `home-b.jsx`                    | `FooterB` (dark footer used by every page) + B1                  |
| `about-page.jsx`                | `AboutPage`                                                      |
| `service-page.jsx`              | `ServicePage` + `SERVICE_CONTENT` map (6 services)               |
| `industries-page.jsx`           | `IndustriesPage` + `INDUSTRY_PAGE_DATA`                          |
| `blog-page.jsx`                 | `BlogIndexPage` + `BlogPostPage` + `BLOG_POSTS`                  |
| `contact-page.jsx`              | `ContactPage` + form fields                                      |
| `terms-page.jsx`                | `TermsPage` (14 sections)                                        |
| `privacy-page.jsx`              | `PrivacyPage` (14 sections)                                      |
| `mobile-chrome.jsx`             | Mobile chrome primitives                                         |
| `mobile-home-about.jsx`         | HomeMobile, AboutMobile, IndustriesMobile                        |
| `mobile-service-blog.jsx`       | ServiceMobile, BlogIndex/Post/Contact/Legal Mobile               |
| `HANDOFF.md`                    | This doc's longer-form companion (more open-question detail)     |

★ = files to read **first**.

Not included (editor-only — not relevant to the production build):
`design-canvas.jsx`, `tweaks-panel.jsx`, `app.jsx`, `home-a.jsx`,
`home-c.jsx`.

## Open questions / things NOT drawn

These need decisions during the build (rough priority):

1. **Tablet (768px) layouts.** Only desktop (1280px) + mobile (390px) are
   drawn. Tablet should interpolate cleanly for most pages, but the service
   hero (1.4fr 1fr grid) and the home's flush-right credentials panel need
   explicit treatment.
2. **Hover / focus / active states** on buttons, nav links, blog cards,
   service list rows, FAQ summary rows. Use opinionated defaults until
   design-side decisions are made.
3. **Mobile nav menu open state.** Hamburger drawn closed only. Drawer
   pattern, animation, focus trap — all TBD.
4. **Active nav indicator on the home page.** Currently `active="Services"`
   on `HomeB5` (a placeholder). Either drop the indicator on home, or
   introduce a "Home" slot.
5. **Form validation states** on the contact form — error/success/in-flight
   styles not drawn.
6. **Cookie banner copy + tracking choices** — defer to legal.
7. **Footer link targets** — currently `#`. Wire to real routes.

## Recommended build order

1. **Theme file first.** Translate `tokens.jsx` to your Tailwind theme +
   global CSS vars. Don't skip this — it unblocks everything.
2. **Shared chrome components** (the `site-chrome.jsx` list). Build these
   as Astro components in your stack.
3. **Home (`/`)** — highest-stakes page; find chrome contract gaps early.
4. **Service template** — six routes off one component; use a content
   collection so the `SERVICE_CONTENT` map is editable without redeploying.
5. **Remaining pages** — About, Industries, Blog index + post, Contact,
   Terms, Privacy.
6. **Responsive** — use the mobile mocks as reference; build with responsive
   class variants, not separate components.

The mocks are pixel-targeted at the levels described above, but the spirit
of the brief is **consistent system, faithful to the tokens**. Don't fight
the production stack to clone exact pixel positions; do honor the token
values and component patterns.
