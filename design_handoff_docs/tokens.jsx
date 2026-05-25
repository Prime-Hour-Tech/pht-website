// tokens.jsx — single source of truth for the PHT design system.
// All colors, type, spacing, radii, and shadows live here. Page files and
// shared components read from this object instead of inline-literaling values.
//
// Convention: keep tokens semantic ("ink", "muted", "accent") rather than
// color-named ("gray-900"). The dev-side theme file will map these to CSS
// custom properties; for the React mockups we read them as JS constants.

const TOKENS = {
  /* ── Colors ─────────────────────────────────────────────────────────
     Light surface palette + a single cool-dark companion for the home
     hero, footer, and service hero. Accent is parameterized via
     `accent` prop on every page — see `ACCENTS` below for the curated
     set. */
  color: {
    // Light theme
    bg:        '#ffffff',          // page background
    bgAlt:     '#F8F9FA',          // alt surface (cards, callouts, alt sections)
    surface:   '#ffffff',          // raised surfaces; same as bg in this palette
    ink:       '#1A1A1A',          // primary text
    inkBody:   '#33363c',          // body prose (slightly softened)
    muted:     '#5b6068',          // secondary text
    line:      'rgba(26,26,26,0.10)', // hairlines / card borders
    lineSoft:  'rgba(26,26,26,0.06)', // very faint dividers
    success:   '#1f7a3a',          // "Open now" indicators

    // Dark theme (used for footer + numbers-led hero on home/service)
    dark:      '#0f1115',
    darkText:  '#f2f3f5',
    darkMuted: '#9aa0a6',
    darkLine:  'rgba(255,255,255,0.10)',
  },

  /* ── Accent ─────────────────────────────────────────────────────────
     Default accent. Pages always accept an `accent` prop, falling back
     to this. Cross-page palettes are exposed via `ACCENTS`. */
  accent: '#dc2626',

  /* ── Type families ──────────────────────────────────────────────────
     Three families. Headlines = Newsreader (display serif). Body =
     Geist. Metadata / eyebrows = Geist Mono. */
  font: {
    sans:  '"Geist", system-ui, sans-serif',
    serif: '"Newsreader", Georgia, serif',
    mono:  '"Geist Mono", monospace',
  },

  /* ── Type scale ─────────────────────────────────────────────────────
     Display sizes are Newsreader serif; body sizes are Geist sans. The
     `display` scale is the editorial ramp used for page headlines. The
     `body` scale is for paragraphs, labels, and UI text. */
  size: {
    // Display (Newsreader serif)
    displayXxxl: 104,  // hero h1 — home, about
    displayXxl:  88,   // hero h1 — service template
    displayXl:   72,   // legal page h1, about hero (cramped grid)
    displayLg:   64,   // featured blog title, final CTA h2
    displayMd:   52,   // section h2 (about story heading, CTA)
    displaySm:   44,   // section h2 (mid-page)
    displayXs:   36,   // blog post h2, blog index "Recent posts"
    serifMd:     32,   // h3 / mobile h1
    serifSm:     26,   // story card h3, mobile h2 / blog card title
    serifXs:     22,   // tertiary serif heads, blog card title (mobile)
    serifMicro:  20,   // smallest serif (mobile)

    // Body / UI (Geist sans)
    bodyXl:   21,   // deck / lead text under hero
    bodyLg:   18,   // larger body
    bodyMd:   17,   // standard body in long-form
    bodyBase: 16,   // default body
    bodySm:   14.5, // smaller body / form labels
    bodyXs:   13,   // tiny body
    label:    13,   // chip / nav labels
    meta:     11,   // monospace eyebrows / metadata
    micro:    10,   // tiniest text (uppercase tags)
  },

  /* ── Line heights ───────────────────────────────────────────────────
     Tight for display (~1.0), comfortable for body (1.55–1.7). */
  lh: {
    display: 1.0,
    h2:      1.05,
    h3:      1.18,
    body:    1.55,
    bodyLg:  1.65,
    prose:   1.7,
  },

  /* ── Letter spacing ─────────────────────────────────────────────────
     Negative on display (tightened serif); positive on uppercase mono. */
  ls: {
    displayTight: -0.035,  // largest serif
    display:      -0.03,
    h2:           -0.025,
    h3:           -0.015,
    body:          0,
    monoEyebrow:   1.4,    // em — uppercase eyebrows
    monoLabel:     1.2,
    monoMeta:      0.5,
  },

  /* ── Spacing scale ──────────────────────────────────────────────────
     Even, multiplicative-ish (4 → 8 → 12 → 16 → 24 → 32 → 48 → 64 → 96).
     Use these for padding/margin/gap. */
  space: {
    1:   4,
    2:   8,
    3:   12,
    4:   16,
    5:   20,
    6:   24,
    8:   32,
    10:  40,
    12:  48,
    14:  56,
    16:  64,
    18:  72,
    20:  80,
    24:  96,
  },

  /* ── Radii ──────────────────────────────────────────────────────────
     8 for buttons, 10 for cards, 14 for big cards, 999 for pills. */
  radius: {
    sm:    6,
    md:    8,    // buttons, small cards
    lg:    10,   // standard cards
    xl:    12,
    xxl:   14,   // hero/credentials panel
    pill:  999,  // chips
  },

  /* ── Shadows ────────────────────────────────────────────────────────
     Only one significant shadow in the design — the accent-toned button
     drop. Re-use via TOKENS.shadow.button(accent). */
  shadow: {
    card:        '0 1px 3px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06)',
    cardHover:   '0 12px 40px rgba(0,0,0,.25), 0 0 0 2px var(--accent)',
    button:      (accent) => `0 14px 32px -12px ${accent}`,
    overlayDark: '0 20px 80px rgba(0,0,0,.4)',
  },

  /* ── Layout ─────────────────────────────────────────────────────────
     Max content width on desktop (most pages), narrower for prose
     (legal pages, blog post). Mobile artboard width. */
  layout: {
    contentMax: 1240,  // most sections
    proseMax:   720,   // long-form (blog post, terms/privacy body)
    narrowMax:  1080,  // home/service CTA blocks
    mobileW:    390,   // standard mobile artboard
    gutterDesktop: 40, // section padding-x on desktop
    gutterMobile:  20, // section padding-x on mobile
  },
};

/* ── Accent presets ──────────────────────────────────────────────────────
   Cross-page accent options exposed via Tweaks. Brand red is canonical;
   the others let the user A/B alternates without touching every page. */
const ACCENTS = {
  red:    { val: '#dc2626', label: 'Brand red (recommended)' },
  rust:   { val: '#b91c1c', label: 'Deep rust' },
  crimson:{ val: '#9b1c1c', label: 'Crimson (darker)' },
  amber:  { val: '#b45309', label: 'Warm amber' },
  blue:   { val: '#1e40af', label: 'Electric blue' },
  green:  { val: '#15803d', label: 'Trust green' },
};

/* ── Convenience helper ──────────────────────────────────────────────────
   Page components destructure what they need. Keeps the import surface
   small (`const { color, font, size } = TOKENS;`). */
const { color: T_COLOR, font: T_FONT, size: T_SIZE, lh: T_LH, ls: T_LS, space: T_SPACE, radius: T_RADIUS, shadow: T_SHADOW, layout: T_LAYOUT } = TOKENS;

Object.assign(window, {
  TOKENS, ACCENTS,
  T_COLOR, T_FONT, T_SIZE, T_LH, T_LS, T_SPACE, T_RADIUS, T_SHADOW, T_LAYOUT,
});
