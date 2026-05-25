# Prime Hour Tech — Design Handoff

This doc is the bridge between the React design canvas in this project and the
production build (Astro + Tailwind, per `primehourtech.com-main/`). Read it
end-to-end before starting implementation; it's short by design.

---

## TL;DR

- **Final home direction:** `B5` in `home-b-variants.jsx` (`HomeB5`).
  Cool whites, dark numbers-led hero, B4's "team up front + plain-spoken
  services list" body.
- **Tokens** (colors, type, spacing, radii, shadows) → `tokens.jsx`.
  Single source of truth; production code should derive its theme file from
  here.
- **Shared layout components** → `site-chrome.jsx`. The dev-side
  equivalents to build first.
- **Pages mocked at 1280px desktop + 390px mobile.** Tablet (768px) and
  hover/focus/menu-open states are **not drawn** — see *Open questions*.

---

## How the project is organized

```
project/
├── index.html              # script-tag entry; loads files in dependency order
├── app.jsx                 # design-canvas wrapper + Tweaks panel
│
├── tokens.jsx              ★ design tokens (start here)
├── site-chrome.jsx         ★ shared chrome components (UtilityRow, SiteNav…)
│
├── shared.jsx              # Icon, Photo, Logomark, LiveDot, PHT site config
├── shared-blocks.jsx       # HeadachesSection, SavingsSection, TeamSection,
│                           # BeliefsSection, CookieBanner
│
├── home-b-variants.jsx     ★ HomeB5 (chosen direction) + B2/B3/B4 (reference)
├── home-b.jsx              # B1 + FooterB (the dark footer used on every page)
├── home-a.jsx, home-c.jsx  # Earlier directions, kept for reference only
│
├── about-page.jsx          ★ About
├── service-page.jsx        ★ Reusable service-page template + SERVICE_CONTENT map
├── industries-page.jsx     ★ Industries overview + INDUSTRY_PAGE_DATA
├── blog-page.jsx           ★ BlogIndexPage + BlogPostPage + BLOG_POSTS
├── contact-page.jsx        ★ Contact form page
├── terms-page.jsx          ★ Terms & Conditions
├── privacy-page.jsx        ★ Privacy Policy
│
├── mobile-chrome.jsx       # MTokens + mobile UtilityRow / Footer / CTA helpers
├── mobile-home-about.jsx   # HomeMobile, AboutMobile, IndustriesMobile
├── mobile-service-blog.jsx # ServiceMobile, BlogIndexMobile, BlogPostMobile,
│                           # ContactMobile, LegalMobile
│
├── design-canvas.jsx       # Editor: DesignCanvas, DCSection, DCArtboard
└── tweaks-panel.jsx        # Editor: Tweaks side-panel
```

★ = files Claude Code should read closely.

---

## Design tokens (canonical)

All values live in `tokens.jsx` as the `TOKENS` object. Spread to JS globals
`T_COLOR / T_FONT / T_SIZE / T_LH / T_LS / T_SPACE / T_RADIUS / T_SHADOW /
T_LAYOUT` for convenience. **The production-side Tailwind/CSS theme file
should mirror this exactly.**

### Colors

```
LIGHT THEME                              DARK BAND (footer + numbers hero)
bg        #ffffff                        dark        #0f1115
bgAlt     #F8F9FA                        darkText    #f2f3f5
surface   #ffffff                        darkMuted   #9aa0a6
ink       #1A1A1A                        darkLine    rgba(255,255,255,0.10)
inkBody   #33363c
muted     #5b6068                        ACCENT (parameterized per-page)
line      rgba(26,26,26,0.10)            #dc2626 (brand red, default)
lineSoft  rgba(26,26,26,0.06)            see ACCENTS map in tokens.jsx for 5 alternates
success   #1f7a3a (Open-now indicator)
```

### Type families

- **Serif (display):** `Newsreader` — used for every page H1 and most H2/H3.
- **Sans (body & UI):** `Geist` — body text, buttons, nav.
- **Mono (eyebrow & meta):** `Geist Mono` — uppercase eyebrows, metadata,
  monospace tags, dates, kbd-style elements.

All three loaded from Google Fonts in `index.html`.

### Type scale (px)

| Token        | Value | Used for                                |
| ------------ | -----:| --------------------------------------- |
| displayXxxl  |   104 | Home + About hero h1                    |
| displayXxl   |    88 | Service template h1                     |
| displayXl    |    72 | Legal page h1                           |
| displayLg    |    64 | Featured blog title; large h2           |
| displayMd    |    52 | Section h2 (story heading, final CTA)   |
| displaySm    |    44 | Section h2 (mid-page)                   |
| displayXs    |    36 | Blog-post h2; "Recent posts"            |
| serifMd      |    32 | h3; mobile h1                           |
| serifSm      |    26 | Blog card title; mobile h2              |
| serifXs      |    22 | Tertiary serif; mobile blog card        |
| bodyXl       |    21 | Deck under hero                         |
| bodyLg       |    18 | Larger body                             |
| bodyMd       |    17 | Standard long-form body                 |
| bodyBase     |    16 | Default body                            |
| bodySm       |  14.5 | Small body, form labels                 |
| bodyXs       |    13 | Tiny body                               |
| label        |    13 | Chips, nav labels                       |
| meta         |    11 | Monospace eyebrows                      |
| micro        |    10 | Tiniest text (tags)                     |

### Spacing scale (px)

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 56 / 64 / 72 / 80 / 96`.
Multiplied of 4 throughout. Section vertical padding is typically **96px**,
horizontal **40px** on desktop, **20px** on mobile.

### Radii

`sm 6 / md 8 / lg 10 / xl 12 / xxl 14 / pill 999`.
**Buttons use `md` (8).** **Standard cards use `lg` (10).** **Hero/credentials
panels use `xxl` (14).** **Chips use `pill` (999).**

### Shadow

There's essentially one shadow in the design: the **accent-toned button
shadow**, `0 14px 32px -12px <accent>`. Surface cards use `0 1px 3px
rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06)`.

### Layout widths

| Token       | Value | Used for                                          |
| ----------- | -----:| ------------------------------------------------- |
| contentMax  |  1240 | Section inner container, capped                   |
| narrowMax   |  1080 | Home/service final CTA                            |
| proseMax    |   720 | Blog post body, legal-page section body           |
| mobileW     |   390 | Mobile artboard width                             |

---

## Shared components (`site-chrome.jsx`)

The components below are the ones repeated 5+ times across pages and have
been extracted. **Use these in the production build for those positions.**
Page-specific bodies (timelines, FAQ accordions, capability grids) stay
inline in each page file because they aren't repeated.

| Component         | Props                                               | Used by                                      |
| ----------------- | --------------------------------------------------- | -------------------------------------------- |
| `UtilityRow`      | `accent`                                            | All pages                                    |
| `SiteNav`         | `active`, `accent`, `sticky` (default true)         | All pages — sets active nav indicator       |
| `Breadcrumb`      | `trail` (array of `[label, href]` or string), `accent` | Service, blog post, legal                 |
| `PageHeader`      | `eyebrow`, `title`, `deck`, `size`, `dark`, `align` | About, Industries, Blog index, legal        |
| `DarkNumbersHero` | `eyebrow`, `headline`, `deck`, `ctaPrimary`, `ctaSecondary`, `right`, `rightAlign`, `rightMarginTop`, `rightMarginBottom`, `accent` | Home (B5), Service template |
| `CTACard`         | `eyebrow`, `title`, `deck`, `primaryLabel`, `accent`, `background` | About, Service, Home final CTA |
| `StatStrip`       | `stats`, `cols` (default 4), `background`, `accent` | About, Service                              |

Note: the **right column** of `DarkNumbersHero` is **flush to the artboard's
right edge with no right radius** — this is intentional (the panel bleeds
off-page). Its top is anchored to the visible top of the `headline` content;
its bottom to the center of the CTA button row. See the inline comment in
`site-chrome.jsx`.

### Components still inline (consider extracting if reused)

These appear in 2 pages and are candidates for extraction in a second pass:
- **Plain-language summary callout** (legal pages)
- **Section header with sticky title + content** (services list on home, FAQ
  on service, services list on about)
- **Capability card grid** (service template, blog-index recent grid)

Page-specific patterns kept inline by design:
- About's timeline, story 3-column, office-photo block
- Industries' jump nav + sectioned verticals
- Blog post's pull quote + figure + author bio card
- Service's FAQ accordion + Other-services row

---

## Pages mocked & their site routes

| Mockup component       | File                       | Production route       | Desktop H | Mobile? |
| ---------------------- | -------------------------- | ---------------------- | --------- | ------- |
| `HomeB5`               | `home-b-variants.jsx`      | `/`                    | 6900      | ✅      |
| `AboutPage`            | `about-page.jsx`           | `/about`               | 6450      | ✅      |
| `ServicePage`          | `service-page.jsx`         | `/managed-it`, `/cybersecurity`, `/cloud-services`, `/it-projects`, `/vcio`, `/web-services` (6 routes — same template, content driven by `SERVICE_CONTENT[slug]`) | 4750 | ✅ |
| `IndustriesPage`       | `industries-page.jsx`      | `/industries`          | 5400      | ✅      |
| `BlogIndexPage`        | `blog-page.jsx`            | `/blog`                | 3500      | ✅      |
| `BlogPostPage`         | `blog-page.jsx`            | `/blog/[slug]`         | 5350      | ✅      |
| `ContactPage`          | `contact-page.jsx`         | `/contact`             | 1950      | ✅      |
| `TermsPage`            | `terms-page.jsx`           | `/terms`               | 5300      | ✅ (via `LegalMobile kind="terms"`) |
| `PrivacyPage`          | `privacy-page.jsx`         | `/privacy`             | 5800      | ✅ (via `LegalMobile kind="privacy"`) |

All 9 page types have mobile mocks in the **Mobile** section of the canvas
(toggleable in Tweaks).

---

## Content & assets to source

**Photography** — every `<Photo label="…">` placeholder needs a real image:
- Team portraits (4) — `shared-blocks.jsx` TEAM constant
- Founder + office wide shots — used on About hero and About office-culture
  section
- Cover images for ~6 blog posts (`BLOG_POSTS` in `blog-page.jsx`)
- Industries-page hero image (or none — currently no hero photo there)
- One product/screen shot for "Modeled your savings" if added

**Real content that's currently placeholder copy:**
- The 6 blog posts (titles + excerpts are credible, full bodies are 1 sample).
- The `$5,200/mo saved` figure on home — should be backed by real numbers
  before launch.
- Customer logos in the trust strip (currently text labels like "LAW FIRM 01").
- Real engineer names in `TEAM` (currently "Founder & Principal", etc).

**SVG/icon set** — already complete; `Icon` in `shared.jsx` has all 24 needed
glyphs.

**Logo** — `Logomark` component is a placeholder geometric mark; PHT's real
logo is at `primehourtech.com-main/public/logo.png`. Swap in production.

**Favicons** — already exist in `primehourtech.com-main/public/`.

---

## Open questions / things NOT drawn

These will need decisions during the build (in roughly priority order):

1. **Tablet (768px) layouts.** Designs exist at 1280px desktop + 390px
   mobile only. Tablet should interpolate cleanly for most pages, but the
   service template's hero (1.4fr 1fr grid) and the home's credentials
   panel (flush-right) need explicit treatment.
2. **Hover/focus states** on buttons, nav links, blog cards, service
   list rows, FAQ summary. Not drawn — use opinionated defaults
   (~5% bg darken / accent underline / subtle lift).
3. **Mobile nav menu open state.** Hamburger is drawn closed only. Drawer
   pattern, animation, focus trap — all TBD.
4. **FAQ accordion open/closed semantics** — currently uses native
   `<details>`. Fine for desktop; mobile should consider animated reveal.
5. **Cookie banner.** `<CookieBanner>` exists in `shared-blocks.jsx` and
   renders on B-variant home pages. Confirm copy and behavior with legal
   before launch.
6. **Active nav indicator on the home page.** Currently `active="Services"`
   on HomeB5 — that's a placeholder, the home shouldn't really highlight
   anything. Either pass `active={null}` or set it to a real "Home" slot.
7. **The hidden "Industries" nav item.** Original site has industries.astro
   linked from nav; design has it too. Decide URL structure.
8. **Empty / error / form-validation states** for the contact form.
9. **Footer link targets** — currently `#`. Wire up to real routes.

---

## Recommended build order

1. **Theme file first.** Translate `tokens.jsx` into your Tailwind theme +
   global CSS variables. This unblocks everything else.
2. **Shared components.** Build the 7 `site-chrome.jsx` components as
   Astro/React components in your stack. Don't try to clone the JSX inline
   styles 1:1 — use Tailwind classes that reference your theme.
3. **Home (`/`).** Highest-stakes page; build it second so you find any
   gaps in the chrome contracts early.
4. **Service template.** Has the most reuse — six routes consume the same
   component. Build the `SERVICE_CONTENT` map as a content-collection
   (Astro's strength) so it's editable without redeploying components.
5. **Remaining pages.** About, Industries, Blog index + post, Contact,
   Terms, Privacy. Most are mostly chrome + body content; should go fast.
6. **Mobile** + **tablet breakpoints**. Mobile mocks demonstrate stacked
   layouts; reuse the same components with responsive class variants
   rather than building separate mobile components.

---

## What's in the design canvas (Tweaks panel)

The canvas lets the reviewer toggle:
- **Accent color** — swap between 6 curated accents
- **Density** — Airy / Compact (only affects B1 reference variant)
- **Credentials card fill** — None / Lighter / Darker (B5 hero only)
- **Service shown in template** — switch which of the 6 services renders
- **Show / hide** — Pages section, Services & Industries, Blog, Mobile
- **Reference variants** — B1–B4 and earlier directions A/C, all off by default

These are exploration aids and **don't need to ship**. The canonical
direction is **B5 with brand red**.

---

## Status & ownership of this doc

| Section                 | Status         | Owner       |
| ----------------------- | -------------- | ----------- |
| Tokens (`tokens.jsx`)   | ✅ Complete    | Design      |
| Shared chrome           | ✅ Complete    | Design      |
| Page inventory          | ✅ Complete    | Design      |
| Asset list              | ⚠ Pending     | Client      |
| Tablet breakpoints      | ❌ Not drawn  | Design (TODO) or dev |
| Hover/focus/open states | ❌ Not drawn  | Design (TODO) or dev |
| Real content/copy       | ⚠ Placeholder | Client      |

Questions about the design system itself → reply in the design canvas with
comments on specific elements. Anything else → the original site repo
(`primehourtech.com-main/`) is the production reference.
