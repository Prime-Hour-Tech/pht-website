// site-chrome.jsx — extracted shared layout components.
// These are the chrome pieces that repeat across 5+ pages. Page bodies
// (heroes specific to one page, FAQ sections, timelines, etc) stay inline
// in their page file; only patterns used across pages live here.
//
// Components exported on window:
//   <UtilityRow accent />              — top bar (open-now + phone/email)
//   <SiteNav active accent />          — primary nav + brand + call-to-action button
//   <Breadcrumb trail accent />        — uppercase mono crumb row (terms/blog/service)
//   <PageHeader eyebrow title deck     — section: eyebrow + serif h1 + body deck.
//               deckLeftWidth dark/>     `dark` flips colors for use inside dark band.
//   <DarkNumbersHero ... />            — the B5 hero (stat on left, slot on right)
//   <CTACard accent title deck         — final-CTA block with contact card on right
//               eyebrow primaryLabel/>
//   <StatStrip stats cols />           — n-column stat row (4 or 2)
//
// Pages should consume tokens (T_COLOR, T_FONT, T_SIZE, T_SPACE, T_RADIUS)
// directly, and use these chrome components for the duplicated structure.

// ── UtilityRow ───────────────────────────────────────────────────────────
const UtilityRow = ({ accent = T_COLOR.ink }) => (
  <div style={{ borderBottom: `1px solid ${T_COLOR.line}`, background: T_COLOR.bg }}>
    <div style={{
      maxWidth: T_LAYOUT.contentMax, margin: '0 auto', padding: '10px 40px',
      display: 'flex', alignItems: 'center', gap: 24,
      fontFamily: T_FONT.mono, fontSize: T_SIZE.meta, letterSpacing: T_LS.monoMeta,
      color: T_COLOR.muted, textTransform: 'uppercase',
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: T_COLOR.success }}>
        <LiveDot color={T_COLOR.success}/> Open now · {PHT.hoursWeekday}
      </span>
      <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 18 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="pin" size={12}/> Salt Lake City, UT
        </span>
        <a href={PHT.phoneLink} style={{ color: T_COLOR.muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="phone" size={12}/> {PHT.phoneDigits}
        </a>
        <a href={`mailto:${PHT.email}`} style={{ color: T_COLOR.muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="mail" size={12}/> {PHT.email}
        </a>
      </span>
    </div>
  </div>
);

// ── SiteNav ──────────────────────────────────────────────────────────────
const SiteNav = ({ active = 'Services', accent = T_COLOR.ink, sticky = true }) => (
  <nav style={{
    background: T_COLOR.bg, borderBottom: `1px solid ${T_COLOR.line}`,
    position: sticky ? 'sticky' : 'static', top: 0, zIndex: 5,
  }}>
    <div style={{
      maxWidth: T_LAYOUT.contentMax, margin: '0 auto', padding: '18px 40px',
      display: 'flex', alignItems: 'center', gap: 40,
    }}>
      <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: T_COLOR.ink }}>
        <span style={{ color: T_COLOR.ink }}><Logomark size={36} accent={accent} bg={T_COLOR.bgAlt}/></span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span style={{ fontFamily: T_FONT.serif, fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}>Prime Hour Tech</span>
          <span style={{ fontFamily: T_FONT.mono, fontSize: T_SIZE.micro, color: T_COLOR.muted, letterSpacing: T_LS.monoLabel, textTransform: 'uppercase' }}>Reliability & Integrity</span>
        </span>
      </a>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 6, fontSize: 14.5 }}>
        {['Services', 'Industries', 'About', 'Blog', 'Contact'].map((label) => (
          <li key={label}>
            <a href="#" style={{
              padding: '10px 14px', color: T_COLOR.ink, textDecoration: 'none',
              fontWeight: label === active ? 600 : 500,
              borderBottom: label === active ? `2px solid ${accent}` : '2px solid transparent',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>{label}{label === active && <Icon name="chevron" size={12}/>}</a>
          </li>
        ))}
      </ul>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href={PHT.phoneLink} style={{ color: T_COLOR.ink, textDecoration: 'none', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="phone" size={14} stroke={1.8}/> {PHT.phoneDigits}
        </a>
        <button style={{
          background: accent, color: '#fff', border: 'none',
          padding: '12px 20px', borderRadius: T_RADIUS.md, fontWeight: 600, fontSize: 14, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          boxShadow: `0 6px 16px -8px ${accent}cc`,
        }}>
          Schedule a call <Icon name="arrowSm" size={14}/>
        </button>
      </div>
    </div>
  </nav>
);

// ── Breadcrumb ───────────────────────────────────────────────────────────
// trail: [['Blog', '#'], ['Cybersecurity', '#'], 'This post']
//        — entry can be a [label, href] tuple or a bare string (current).
const Breadcrumb = ({ trail = [], accent = T_COLOR.ink }) => (
  <section style={{ padding: '20px 40px', borderBottom: `1px solid ${T_COLOR.lineSoft}` }}>
    <div style={{
      maxWidth: T_LAYOUT.contentMax, margin: '0 auto',
      fontFamily: T_FONT.mono, fontSize: T_SIZE.meta, color: T_COLOR.muted,
      letterSpacing: 0.8, textTransform: 'uppercase',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      {trail.map((entry, i) => {
        const isCurrent = i === trail.length - 1;
        const isLink = Array.isArray(entry);
        const label = isLink ? entry[0] : entry;
        const href = isLink ? entry[1] : '#';
        return (
          <React.Fragment key={i}>
            {i > 0 && <span>›</span>}
            {isCurrent ? (
              <span style={{ color: T_COLOR.ink }}>{label}</span>
            ) : (
              <a href={href} style={{ color: T_COLOR.muted, textDecoration: 'none' }}>{label}</a>
            )}
          </React.Fragment>
        );
      })}
    </div>
  </section>
);

// ── PageHeader ───────────────────────────────────────────────────────────
// Eyebrow + display headline + deck. Two-column layout when `deck` is
// provided (headline left, deck right at the bottom edge) — mirrors the
// About + Industries header. Pass `dark` for use inside a dark band.
const PageHeader = ({ eyebrow, title, deck, size = T_SIZE.displayXxxl, dark = false, accent = T_COLOR.ink, align = 'split' }) => {
  const colors = dark
    ? { ink: T_COLOR.darkText, muted: T_COLOR.darkMuted }
    : { ink: T_COLOR.ink, muted: T_COLOR.muted };

  const headerInner = (
    <>
      <div style={{
        fontFamily: T_FONT.mono, fontSize: T_SIZE.meta, color: accent,
        letterSpacing: T_LS.monoEyebrow, textTransform: 'uppercase', marginBottom: 18,
      }}>{eyebrow}</div>
      <h1 style={{
        margin: 0, fontFamily: T_FONT.serif, fontSize: size, lineHeight: 0.94,
        letterSpacing: T_LS.displayTight + 'em', fontWeight: 500,
        color: colors.ink, textWrap: 'balance',
      }}>{title}</h1>
    </>
  );

  if (!deck) {
    return (
      <section style={{ padding: '80px 40px 56px' }}>
        <div style={{ maxWidth: T_LAYOUT.contentMax, margin: '0 auto' }}>
          {headerInner}
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '80px 40px 56px' }}>
      <div style={{
        maxWidth: T_LAYOUT.contentMax, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64,
        alignItems: align === 'split' ? 'end' : 'start',
      }}>
        <div>{headerInner}</div>
        <div style={{ color: colors.muted, fontSize: T_SIZE.bodyLg, lineHeight: T_LH.body }}>
          {deck}
        </div>
      </div>
    </section>
  );
};

// ── DarkNumbersHero ──────────────────────────────────────────────────────
// The signature B5 hero: dark band, big eyebrow + headline + deck on the
// left, anything (credentials grid, at-a-glance card, etc) on the right.
// Right column is flush to the artboard's right edge with no right radius
// — that's the B5 "right panel bleeds off-page" treatment. Pass `right`
// children to fill it.
//
// Props:
//   eyebrow      — short mono eyebrow text (rendered inside the accent rail)
//   headline     — JSX/string headline content
//   deck         — JSX/string body paragraph under headline
//   ctaPrimary   — string label for the primary button
//   ctaSecondary — string label for the ghost button
//   right        — JSX rendered in the right column (defaults to nothing)
//   rightAlign   — 'stretch' (default) | 'end' — alignment of the right column
//   rightMarginTop, rightMarginBottom — vertical anchoring (defaults align
//                                       to the visible top of the headline and
//                                       the centre of the CTA row)
//   accent       — accent color
const DarkNumbersHero = ({
  eyebrow,
  headline,
  deck,
  ctaPrimary = 'Schedule a discovery call',
  ctaSecondary,
  right,
  rightAlign = 'stretch',
  rightMarginTop = 68,
  rightMarginBottom = 23,
  accent = T_COLOR.ink,
}) => (
  <section style={{
    background: T_COLOR.dark, color: T_COLOR.darkText,
    padding: '64px 0 80px', position: 'relative', overflow: 'hidden',
  }}>
    {/* Radial glow */}
    <div style={{
      position: 'absolute', top: -160, right: -120, width: 480, height: 480,
      background: `radial-gradient(circle, ${accent}26, transparent 70%)`, pointerEvents: 'none',
    }}/>
    <div style={{
      display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56,
      alignItems: 'center', position: 'relative',
    }}>
      {/* Left column — padded to align with the 1240 content well */}
      <div style={{ paddingLeft: `max(40px, calc((100% - ${T_LAYOUT.contentMax}px) / 2 + 40px))` }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: T_FONT.mono, fontSize: T_SIZE.meta, color: accent,
          letterSpacing: T_LS.monoEyebrow, textTransform: 'uppercase', marginBottom: 24,
        }}>
          <span style={{ width: 18, height: 1, background: accent }}/> {eyebrow}
        </div>
        {headline}
        {deck && (
          <p style={{ marginTop: 16, color: T_COLOR.darkMuted, fontSize: T_SIZE.bodyBase, lineHeight: T_LH.body, maxWidth: 520 }}>
            {deck}
          </p>
        )}
        <div style={{ marginTop: 28, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button style={{
            background: accent, color: '#fff', border: 'none',
            padding: '15px 24px', borderRadius: T_RADIUS.md, fontWeight: 600, fontSize: 15.5, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            boxShadow: T_SHADOW.button(accent),
          }}>{ctaPrimary} <Icon name="arrow" size={16}/></button>
          {ctaSecondary && (
            <a href="#" style={{
              padding: '15px 22px', borderRadius: T_RADIUS.md, color: T_COLOR.darkText, textDecoration: 'none',
              fontSize: 15.5, fontWeight: 500, border: `1px solid ${T_COLOR.darkLine}`,
            }}>{ctaSecondary} →</a>
          )}
        </div>
      </div>

      {/* Right column — flush to artboard right edge, no right radius */}
      {right && (
        <div style={{
          alignSelf: rightAlign,
          marginTop: rightMarginTop,
          marginBottom: rightMarginBottom,
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${T_COLOR.darkLine}`,
          borderRight: 'none',
          borderTopLeftRadius: T_RADIUS.xxl,
          borderBottomLeftRadius: T_RADIUS.xxl,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          padding: 24,
        }}>
          {right}
        </div>
      )}
    </div>
  </section>
);

// ── CTACard ──────────────────────────────────────────────────────────────
// Final-section pattern: 2-column with copy on the left and a contact
// card on the right. Used at the bottom of home, about, service pages.
const CTACard = ({
  eyebrow = '◆ Ready when you are',
  title,
  deck,
  primaryLabel = 'Schedule a discovery call',
  accent = T_COLOR.ink,
  background = T_COLOR.bg,
}) => (
  <section style={{
    padding: '96px 40px', background, borderTop: `1px solid ${T_COLOR.line}`,
  }}>
    <div style={{
      maxWidth: T_LAYOUT.narrowMax, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center',
    }}>
      <div>
        <div style={{
          fontFamily: T_FONT.mono, fontSize: T_SIZE.meta, color: accent,
          letterSpacing: T_LS.monoEyebrow, textTransform: 'uppercase', marginBottom: 14,
        }}>{eyebrow}</div>
        <h2 style={{
          margin: 0, fontFamily: T_FONT.serif, fontSize: T_SIZE.displayMd,
          lineHeight: 1.02, letterSpacing: T_LS.display + 'em', fontWeight: 500,
          color: T_COLOR.ink, textWrap: 'balance',
        }}>{title}</h2>
        {deck && (
          <p style={{ marginTop: 16, color: T_COLOR.muted, fontSize: T_SIZE.bodyMd, lineHeight: T_LH.body, maxWidth: 500 }}>
            {deck}
          </p>
        )}
      </div>
      <div style={{
        background: T_COLOR.bgAlt, border: `1px solid ${T_COLOR.line}`,
        borderRadius: T_RADIUS.xxl, padding: 28,
      }}>
        <div style={{ fontWeight: 600, fontSize: T_SIZE.bodyBase, marginBottom: 16, color: T_COLOR.ink }}>Get in touch</div>
        <a href={PHT.phoneLink} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
          borderTop: `1px solid ${T_COLOR.lineSoft}`, color: T_COLOR.ink,
          textDecoration: 'none', fontSize: 15,
        }}>
          <Icon name="phone" size={18} stroke={1.5}/> <span style={{ flex: 1 }}>{PHT.phoneDigits}</span> <Icon name="arrowSm" size={14}/>
        </a>
        <a href={`mailto:${PHT.email}`} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
          borderTop: `1px solid ${T_COLOR.lineSoft}`, color: T_COLOR.ink,
          textDecoration: 'none', fontSize: 15,
        }}>
          <Icon name="mail" size={18} stroke={1.5}/> <span style={{ flex: 1 }}>{PHT.email}</span> <Icon name="arrowSm" size={14}/>
        </a>
        <button style={{
          marginTop: 16, width: '100%',
          background: accent, color: '#fff', border: 'none',
          padding: '14px 22px', borderRadius: T_RADIUS.md, fontWeight: 600, fontSize: 15, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>{primaryLabel} <Icon name="arrow" size={16}/></button>
      </div>
    </div>
  </section>
);

// ── StatStrip ────────────────────────────────────────────────────────────
// Horizontal row of [number, label] stats. n-column grid; defaults to 4.
const StatStrip = ({ stats = [], cols = 4, background, accent = T_COLOR.ink }) => (
  <section style={{
    padding: '64px 40px',
    background: background ?? T_COLOR.bgAlt,
    borderTop: `1px solid ${T_COLOR.line}`,
    borderBottom: `1px solid ${T_COLOR.line}`,
  }}>
    <div style={{
      maxWidth: T_LAYOUT.contentMax, margin: '0 auto',
      display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24,
    }}>
      {stats.map((s, i) => (
        <div key={i}>
          <div style={{
            fontFamily: T_FONT.serif, fontSize: T_SIZE.displayMd, fontWeight: 500,
            letterSpacing: T_LS.h2 + 'em', lineHeight: 1, color: T_COLOR.ink,
            fontVariantNumeric: 'tabular-nums',
          }}>{s.k}</div>
          <div style={{
            marginTop: 10, fontFamily: T_FONT.mono, fontSize: T_SIZE.meta,
            color: T_COLOR.muted, letterSpacing: T_LS.monoLabel, textTransform: 'uppercase',
          }}>{s.v}</div>
        </div>
      ))}
    </div>
  </section>
);

Object.assign(window, {
  UtilityRow, SiteNav, Breadcrumb, PageHeader, DarkNumbersHero, CTACard, StatStrip,
});
