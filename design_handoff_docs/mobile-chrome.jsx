// mobile-chrome.jsx — shared building blocks for mobile mockups.
// All mobile artboards are 390px wide (standard iPhone) and re-use these.

const MOBILE_W = 390;

// ── Tokens used across mobile pages (light palette) ──────────────────────
const MTokens = {
  bg: '#ffffff',
  bgAlt: '#F8F9FA',
  ink: '#1A1A1A',
  muted: '#5b6068',
  line: 'rgba(26,26,26,0.10)',
  lineSoft: 'rgba(26,26,26,0.06)',
  dark: '#0f1115',
  darkText: '#f2f3f5',
  darkMuted: '#9aa0a6',
  darkLine: 'rgba(255,255,255,0.10)',
  font: '"Geist", system-ui, sans-serif',
  mono: '"Geist Mono", monospace',
  serif: '"Newsreader", Georgia, serif',
};

// ── MobileTop — utility row + nav with hamburger ─────────────────────────
const MobileTop = ({ accent, active }) => {
  const t = MTokens;
  return (
    <>
      {/* utility row */}
      <div style={{ borderBottom: `1px solid ${t.line}`, background: t.bg, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.5, textTransform: 'uppercase' }}>
        <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1f7a3a' }}>
            <LiveDot color="#1f7a3a"/> Open now
          </span>
          <a href={PHT.phoneLink} style={{ color: t.muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="phone" size={11}/> {PHT.phoneDigits}
          </a>
        </div>
      </div>

      {/* nav */}
      <nav style={{ background: t.bg, borderBottom: `1px solid ${t.line}` }}>
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: t.ink, flex: 1 }}>
            <span style={{ color: t.ink }}><Logomark size={30} accent={accent} bg={t.bgAlt}/></span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
              <span style={{ fontFamily: t.serif, fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>Prime Hour Tech</span>
              <span style={{ fontFamily: t.mono, fontSize: 9, color: t.muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>{active || 'Reliability & Integrity'}</span>
            </span>
          </a>
          <button style={{
            background: 'transparent', border: `1px solid ${t.line}`, borderRadius: 8,
            width: 38, height: 38, padding: 0, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: t.ink,
          }} aria-label="Menu"><Icon name="menu" size={20} stroke={1.8}/></button>
        </div>
      </nav>
    </>
  );
};

// ── MobileFooter — stacked, compact ──────────────────────────────────────
const MobileFooter = ({ accent }) => {
  const t = MTokens;
  return (
    <footer style={{ background: t.dark, color: t.darkMuted, padding: '40px 20px 24px', fontSize: 13 }}>
      {/* brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <span style={{ color: t.darkText }}><Logomark size={32} accent={accent} bg="transparent"/></span>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span style={{ fontFamily: t.serif, fontWeight: 600, fontSize: 16, color: t.darkText, letterSpacing: '-0.01em' }}>Prime Hour Tech</span>
          <span style={{ fontFamily: t.mono, fontSize: 9, color: t.darkMuted, letterSpacing: 1.2, textTransform: 'uppercase' }}>Salt Lake City, UT</span>
        </div>
      </div>

      {/* link sections — collapsed details for mobile */}
      {[
        { h: 'Services', items: ['Managed IT', 'Cybersecurity', 'Cloud', 'IT Projects', 'vCIO', 'Web Services'] },
        { h: 'Company', items: ['About', 'Industries', 'Blog', 'Contact'] },
        { h: 'Legal', items: ['Terms', 'Privacy', 'SMS Terms', 'Client SLA'] },
      ].map((g, gi) => (
        <details key={g.h} open={gi === 0} style={{ borderTop: `1px solid ${t.darkLine}`, padding: '14px 0' }}>
          <summary style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', listStyle: 'none', fontFamily: t.mono, fontSize: 11, color: t.darkText,
            letterSpacing: 1.2, textTransform: 'uppercase',
          }}>
            {g.h} <Icon name="chevron" size={14}/>
          </summary>
          <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {g.items.map((it) => (
              <li key={it}><a href="#" style={{ color: t.darkMuted, textDecoration: 'none', fontSize: 14 }}>{it}</a></li>
            ))}
          </ul>
        </details>
      ))}

      {/* contact */}
      <div style={{ borderTop: `1px solid ${t.darkLine}`, padding: '20px 0 0', marginTop: 4, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <a href={PHT.phoneLink} style={{ color: t.darkText, textDecoration: 'none', fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Icon name="phone" size={14}/> {PHT.phoneDigits}
        </a>
        <a href={`mailto:${PHT.email}`} style={{ color: t.darkText, textDecoration: 'none', fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Icon name="mail" size={14}/> {PHT.email}
        </a>
      </div>

      <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${t.darkLine}`, fontFamily: t.mono, fontSize: 10, color: t.darkMuted, letterSpacing: 0.4, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
        <span>© 2026 PHT LLC</span>
        <span>v2.0</span>
      </div>
    </footer>
  );
};

// ── MobileH1 — consistent serif headline w/ optional italic accent ───────
const MobileH1 = ({ children, size = 44, accent, color }) => (
  <h1 style={{
    margin: 0, fontFamily: MTokens.serif, fontSize: size, lineHeight: 0.98, letterSpacing: '-0.03em',
    fontWeight: 500, color: color || MTokens.ink, textWrap: 'balance',
  }}>{children}</h1>
);

// ── MobileEyebrow — uppercase mono accent eyebrow ────────────────────────
const MobileEyebrow = ({ accent, children, color }) => (
  <div style={{
    fontFamily: MTokens.mono, fontSize: 10.5, color: color || accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14,
  }}>{children}</div>
);

// ── MobilePrimary / MobileGhost — CTA buttons (full-width by default) ────
const MobilePrimary = ({ accent, children, dark = false }) => (
  <button style={{
    background: accent, color: '#fff', border: 'none',
    padding: '14px 22px', borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    width: '100%', boxShadow: `0 14px 32px -12px ${accent}`,
  }}>{children} <Icon name="arrow" size={15}/></button>
);
const MobileGhost = ({ children, dark = false }) => {
  const t = MTokens;
  return (
    <a href="#" style={{
      padding: '13px 18px', borderRadius: 10, fontSize: 14.5, fontWeight: 500,
      color: dark ? t.darkText : t.ink, textDecoration: 'none',
      border: `1px solid ${dark ? t.darkLine : t.line}`, background: 'transparent',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%',
    }}>{children}</a>
  );
};

// ── MobilePageHeader — eyebrow + serif title + deck ──────────────────────
const MobilePageHeader = ({ accent, eyebrow, title, deck, size = 44 }) => (
  <section style={{ padding: '32px 20px 24px' }}>
    <MobileEyebrow accent={accent}>{eyebrow}</MobileEyebrow>
    <MobileH1 size={size}>{title}</MobileH1>
    {deck && <p style={{ marginTop: 14, color: MTokens.muted, fontSize: 16, lineHeight: 1.55 }}>{deck}</p>}
  </section>
);

// ── MobileCTABlock — final CTA used across pages ─────────────────────────
const MobileCTABlock = ({ accent, eyebrow = '◆ Ready when you are', title, deck }) => {
  const t = MTokens;
  return (
    <section style={{ padding: '48px 20px', borderTop: `1px solid ${t.line}` }}>
      <MobileEyebrow accent={accent}>{eyebrow}</MobileEyebrow>
      <h2 style={{
        margin: 0, fontFamily: t.serif, fontSize: 32, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: t.ink, textWrap: 'balance',
      }}>{title}</h2>
      {deck && <p style={{ marginTop: 14, color: t.muted, fontSize: 15.5, lineHeight: 1.55 }}>{deck}</p>}
      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <MobilePrimary accent={accent}>Schedule a discovery call</MobilePrimary>
        <a href={PHT.phoneLink} style={{
          padding: '13px 18px', borderRadius: 10, fontSize: 14.5, fontWeight: 500,
          color: t.ink, textDecoration: 'none', border: `1px solid ${t.line}`, background: t.bg,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%',
          fontFamily: t.mono,
        }}><Icon name="phone" size={14}/> {PHT.phoneDigits}</a>
      </div>
    </section>
  );
};

// ── MobilePageWrapper — applies the artboard-root + font defaults ────────
const MobilePageWrapper = ({ children, bg = MTokens.bg }) => (
  <div className="artboard-root" style={{
    background: bg, color: MTokens.ink, fontFamily: MTokens.font, fontSize: 15.5, lineHeight: 1.6,
    width: MOBILE_W, WebkitFontSmoothing: 'antialiased',
  }}>{children}</div>
);

Object.assign(window, {
  MOBILE_W, MTokens, MobileTop, MobileFooter, MobileH1, MobileEyebrow,
  MobilePrimary, MobileGhost, MobilePageHeader, MobileCTABlock, MobilePageWrapper,
});
