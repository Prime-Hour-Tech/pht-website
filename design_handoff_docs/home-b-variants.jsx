// home-b-variants.jsx — Three variants of Direction B
//   B2 "Centered & Calm"   — symmetric centered hero, big serif drama, photo BELOW headline
//   B3 "Numbers Forward"   — leads with savings figure; data badges; smaller hero
//   B4 "Warm & Personal"   — cream-tinted whites, founder portrait dominant, friendlier copy
//
// All four (B1 + these 3) keep the user's spec: light base, dark hero/footer band only,
// red CTAs, all content sections (headaches / savings / team / beliefs / cookie banner).
// They reuse the shared blocks from shared-blocks.jsx.

// ── Shared palette + chrome used across variants ──────────────────────────
const BPal = (overrides = {}) => ({
  bg: '#ffffff',
  bgAlt: '#F8F9FA',
  surface: '#ffffff',
  ink: '#1A1A1A',
  muted: '#5b6068',
  line: 'rgba(26,26,26,0.10)',
  lineSoft: 'rgba(26,26,26,0.06)',
  dark: '#0f1115',
  darkText: '#f2f3f5',
  darkMuted: '#9aa0a6',
  darkLine: 'rgba(255,255,255,0.10)',
  font: '"Geist", system-ui, sans-serif',
  mono: '"Geist Mono", ui-monospace, monospace',
  serif: '"Newsreader", Georgia, serif',
  ...overrides,
});

const BUtilityRow = ({ p, accent }) => (
  <div style={{ borderBottom: `1px solid ${p.line}`, background: p.bgAlt }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '10px 40px', display: 'flex', alignItems: 'center', gap: 24, fontFamily: p.mono, fontSize: 11, letterSpacing: 0.5, color: p.muted, textTransform: 'uppercase' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#1f7a3a' }}>
        <LiveDot color="#1f7a3a"/> Open now · {PHT.hoursWeekday}
      </span>
      <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 18 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="pin" size={12}/> Salt Lake City, UT</span>
        <a href={PHT.phoneLink} style={{ color: p.muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="phone" size={12}/> {PHT.phoneDigits}</a>
        <a href={`mailto:${PHT.email}`} style={{ color: p.muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="mail" size={12}/> {PHT.email}</a>
      </span>
    </div>
  </div>
);

const BNav = ({ p, accent, sel = 'Services' }) => (
  <nav style={{ background: p.bg, borderBottom: `1px solid ${p.line}`, position: 'sticky', top: 0, zIndex: 5 }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '18px 40px', display: 'flex', alignItems: 'center', gap: 40 }}>
      <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: p.ink }}>
        <span style={{ color: p.ink }}><Logomark size={36} accent={accent} bg={p.bgAlt}/></span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span style={{ fontFamily: p.serif, fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}>Prime Hour Tech</span>
          <span style={{ fontFamily: p.mono, fontSize: 10, color: p.muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>Reliability & Integrity</span>
        </span>
      </a>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 6, fontSize: 14.5 }}>
        {['Services', 'Industries', 'About', 'Blog', 'Contact'].map(label => (
          <li key={label}>
            <a href="#" style={{
              padding: '10px 14px', color: p.ink, textDecoration: 'none',
              fontWeight: label === sel ? 600 : 500,
              borderBottom: label === sel ? `2px solid ${accent}` : '2px solid transparent',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>{label}{label === sel && <Icon name="chevron" size={12}/>}</a>
          </li>
        ))}
      </ul>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href={PHT.phoneLink} style={{ color: p.ink, textDecoration: 'none', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="phone" size={14} stroke={1.8}/> {PHT.phoneDigits}
        </a>
        <button style={{
          background: accent, color: '#fff', border: 'none',
          padding: '12px 20px', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          boxShadow: `0 6px 16px -8px ${accent}cc`,
        }}>
          Schedule a call <Icon name="arrowSm" size={14}/>
        </button>
      </div>
    </div>
  </nav>
);

// Final CTA + footer used by all variants
const BFinal = ({ p, accent, serif = p.serif }) => (
  <>
    <section style={{ padding: `96px 40px`, background: p.bg, borderBottom: `1px solid ${p.line}` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: p.mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
            Ready when you are
          </div>
          <h2 style={{ margin: 0, fontFamily: serif, fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 500, textWrap: 'balance', color: p.ink }}>
            Let's talk about <em style={{ fontStyle: 'italic', color: accent }}>what's slowing you down.</em>
          </h2>
          <p style={{ marginTop: 16, color: p.muted, fontSize: 18, lineHeight: 1.55, maxWidth: 500 }}>
            30 minutes. We'll look at your stack and your support load, and tell you where Prime Hour Tech fits — even if the answer is "not yet."
          </p>
        </div>
        <div style={{ background: p.bgAlt, border: `1px solid ${p.line}`, borderRadius: 14, padding: 28 }}>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, color: p.ink }}>Get in touch</div>
          <a href={PHT.phoneLink} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: `1px solid ${p.lineSoft}`, color: p.ink, textDecoration: 'none', fontSize: 15 }}>
            <Icon name="phone" size={18} stroke={1.5}/> <span style={{ flex: 1 }}>{PHT.phoneDigits}</span> <Icon name="arrowSm" size={14}/>
          </a>
          <a href={`mailto:${PHT.email}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: `1px solid ${p.lineSoft}`, color: p.ink, textDecoration: 'none', fontSize: 15 }}>
            <Icon name="mail" size={18} stroke={1.5}/> <span style={{ flex: 1 }}>{PHT.email}</span> <Icon name="arrowSm" size={14}/>
          </a>
          <button style={{
            marginTop: 16, width: '100%',
            background: accent, color: '#fff', border: 'none',
            padding: '14px 22px', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            Schedule a discovery call <Icon name="arrow" size={16}/>
          </button>
        </div>
      </div>
    </section>
    <FooterB accent={accent} dark={p.dark} darkText={p.darkText} darkMuted={p.darkMuted} darkLine={p.darkLine}/>
    <CookieBanner accent={accent} ink={p.ink}/>
  </>
);


/* ═══════════════════════════════════════════════════════════════════════════
   B2 — "Centered & Calm"
   Symmetric centered hero. Headline above a wide hero photo. Magazine-issue feel.
   ═══════════════════════════════════════════════════════════════════════════ */
const HomeB2 = ({ accent = '#dc2626' }) => {
  const p = BPal();
  return (
    <div className="artboard-root" style={{ background: p.bg, color: p.ink, fontFamily: p.font, fontSize: 16, lineHeight: 1.6, position: 'relative', WebkitFontSmoothing: 'antialiased' }}>
      <BUtilityRow p={p} accent={accent}/>
      <BNav p={p} accent={accent}/>

      {/* Centered hero — headline above, photo below */}
      <section style={{ background: p.bg, padding: '88px 40px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: p.mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 28 }}>
            <span style={{ width: 18, height: 1, background: accent }}/>
            <span>Issue No. 04 · Utah MSP · Est. 2024</span>
            <span style={{ width: 18, height: 1, background: accent }}/>
          </div>
          <h1 style={{
            margin: 0, fontFamily: p.serif, fontSize: 104, lineHeight: 0.94, letterSpacing: '-0.035em',
            fontWeight: 500, color: p.ink, textWrap: 'balance',
          }}>
            IT that actually <em style={{ fontStyle: 'italic', color: accent, fontWeight: 500 }}>answers the phone.</em>
          </h1>
          <p style={{
            marginTop: 28, fontSize: 21, color: p.muted,
            maxWidth: 680, lineHeight: 1.5, fontWeight: 400, marginLeft: 'auto', marginRight: 'auto',
          }}>
            We relieve the day-to-day computer headaches that slow your team down — managed IT, cybersecurity, cloud, and a real person on the phone when you call.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              background: accent, color: '#fff', border: 'none',
              padding: '15px 26px', borderRadius: 8, fontWeight: 600, fontSize: 15.5, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: `0 14px 32px -12px ${accent}`,
            }}>
              Schedule a discovery call <Icon name="arrow" size={16}/>
            </button>
            <a href="#" style={{
              padding: '15px 22px', borderRadius: 8, color: p.ink, textDecoration: 'none', fontSize: 15.5, fontWeight: 500,
              border: `1px solid ${p.line}`,
            }}>
              See how we save you money →
            </a>
          </div>
        </div>
      </section>

      {/* Full-width hero photo with stat overlay */}
      <section style={{ background: p.bg, padding: '56px 40px 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
          <Photo label="TEAM / OFFICE — WIDE" tone="dark" radius={14} style={{ aspectRatio: '21/9' }}/>
          <div style={{
            position: 'absolute', left: 24, right: 24, bottom: 24,
            background: 'rgba(15,17,21,0.92)', backdropFilter: 'blur(10px)', color: p.darkText,
            border: `1px solid ${p.darkLine}`, borderRadius: 12, padding: 24,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          }}>
            {[
              { k: '<15 min', v: 'Avg response' },
              { k: '24/7',    v: 'Monitoring' },
              { k: '99.9%',   v: 'Uptime SLA' },
              { k: '30–45%',  v: 'Avg savings' },
            ].map(s => (
              <div key={s.k}>
                <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.025em', fontFamily: p.serif, color: p.darkText }}>{s.k}</div>
                <div style={{ fontFamily: p.mono, fontSize: 10.5, color: p.darkMuted, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HeadachesSection {...p} accent={accent}/>
      <SavingsSection {...p} accent={accent} bg={p.bgAlt}/>

      {/* Services — minimalist table */}
      <section style={{ padding: '96px 40px', background: p.bg, borderBottom: `1px solid ${p.line}` }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: p.mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>
              ◆ Services
            </div>
            <h2 style={{ margin: 0, fontFamily: p.serif, fontSize: 64, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em', textWrap: 'balance' }}>
              Six services. <em style={{ fontStyle: 'italic' }}>One partner.</em>
            </h2>
          </div>
          <div style={{ borderTop: `1px solid ${p.line}` }}>
            {SERVICES.map((s, i) => (
              <a href="#" key={s.slug} style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center', gap: 24,
                padding: '28px 0', borderBottom: `1px solid ${p.line}`, textDecoration: 'none', color: p.ink,
              }}>
                <span style={{ fontFamily: p.mono, fontSize: 12, color: p.muted, letterSpacing: 1, width: 36 }}>0{i+1}</span>
                <span style={{ fontFamily: p.serif, fontSize: 32, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.05 }}>
                  {s.name}
                </span>
                <span style={{ color: p.muted, fontSize: 14, maxWidth: 360, textAlign: 'right' }}>{s.short}</span>
                <span style={{ color: accent, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Read <Icon name="arrowSm" size={14}/>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <TeamSection {...p} accent={accent} bg={p.bgAlt} cols={4} photoTone="light"/>
      <BeliefsSection {...p} accent={accent}/>
      <BFinal p={p} accent={accent}/>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════════════════
   B3 — "Numbers Forward"
   Smaller hero. Big savings figure dominates above the fold. Data-forward.
   Sans headlines (no serif), more monospace, more tables.
   ═══════════════════════════════════════════════════════════════════════════ */
const HomeB3 = ({ accent = '#dc2626' }) => {
  const p = BPal({ serif: '"Geist", system-ui, sans-serif' });  // sans display
  return (
    <div className="artboard-root" style={{ background: p.bg, color: p.ink, fontFamily: p.font, fontSize: 16, lineHeight: 1.6, position: 'relative', WebkitFontSmoothing: 'antialiased' }}>
      <BUtilityRow p={p} accent={accent}/>
      <BNav p={p} accent={accent}/>

      {/* Numbers-led hero */}
      <section style={{ background: p.dark, color: p.darkText, padding: '64px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -160, right: -120, width: 480, height: 480, background: `radial-gradient(circle, ${accent}26, transparent 70%)`, pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56, alignItems: 'center', position: 'relative' }}>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: p.mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 24 }}>
              <span style={{ width: 18, height: 1, background: accent }}/> Average savings · 25-seat client
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 10 }}>
              <span style={{ fontSize: 144, fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: p.darkText }}>$5,200</span>
              <span style={{ fontFamily: p.mono, fontSize: 14, color: p.darkMuted, letterSpacing: 0.5, textTransform: 'uppercase' }}>/mo saved</span>
            </div>
            <h1 style={{
              margin: '6px 0 0', fontSize: 36, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.025em',
              color: p.darkText, maxWidth: 580,
            }}>
              That's what most clients save by switching from break-fix to PHT — in their first year.
            </h1>
            <p style={{ marginTop: 16, color: p.darkMuted, fontSize: 16, lineHeight: 1.55, maxWidth: 520 }}>
              We're a Utah managed-services partner that catches problems before they cost you. Flat-rate, line-itemed, no surprises.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: accent, color: '#fff', border: 'none',
                padding: '15px 24px', borderRadius: 8, fontWeight: 600, fontSize: 15.5, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: `0 14px 32px -12px ${accent}`,
              }}>
                Model your savings <Icon name="arrow" size={16}/>
              </button>
              <a href="#" style={{
                padding: '15px 22px', borderRadius: 8, color: p.darkText, textDecoration: 'none', fontSize: 15.5, fontWeight: 500,
                border: `1px solid ${p.darkLine}`,
              }}>
                Schedule a discovery call →
              </a>
            </div>
          </div>

          {/* Right — badges/certs panel */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${p.darkLine}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontFamily: p.mono, fontSize: 11, color: p.darkMuted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
              ◆ The credentials
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {[
                ['Microsoft Partner', 'M365 & Azure'],
                ['CompTIA Certified', 'Net+/Sec+ team'],
                ['Cisco CCNA', 'Network design'],
                ['CIS Controls v8', 'Aligned framework'],
                ['HIPAA-aware', 'Healthcare-ready'],
                ['Utah-based', '100% U.S. team'],
              ].map(([t, sub]) => (
                <div key={t} style={{ padding: 14, border: `1px solid ${p.darkLine}`, borderRadius: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: p.darkText }}>{t}</div>
                  <div style={{ fontFamily: p.mono, fontSize: 10.5, color: p.darkMuted, letterSpacing: 0.4, textTransform: 'uppercase', marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 12, borderTop: `1px solid ${p.darkLine}`, fontFamily: p.mono, fontSize: 11, color: p.darkMuted, letterSpacing: 0.4, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span><LiveDot color="#22c55e"/> All systems operational</span>
              <span>Tickets today: 38 / 38</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section style={{ background: p.bg, padding: '32px 40px', borderBottom: `1px solid ${p.line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: p.mono, fontSize: 11, color: p.muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>Trusted by</div>
          <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap', flex: 1, justifyContent: 'space-around' }}>
            {['LAW FIRM 01', 'CLINIC 02', 'CPA GROUP', 'REAL ESTATE', 'MANUFACTURING', 'NONPROFIT'].map((l) => (
              <span key={l} style={{ fontFamily: p.mono, fontSize: 13, color: p.muted, letterSpacing: 0.8, opacity: 0.6 }}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      <HeadachesSection {...p} accent={accent}/>
      <SavingsSection {...p} accent={accent} bg={p.bgAlt}/>

      {/* Services — dense card grid w/ badges */}
      <section style={{ padding: '96px 40px', background: p.bg, borderBottom: `1px solid ${p.line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <div style={{ fontFamily: p.mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>
                ◆ Services · 6 lines, 1 SLA
              </div>
              <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: p.ink }}>
                What we run for you.
              </h2>
            </div>
            <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>Compare plans →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {SERVICES.map((s, i) => (
              <div key={s.slug} style={{ background: p.bg, border: `1px solid ${p.line}`, borderRadius: 10, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ width: 36, height: 36, borderRadius: 8, background: `${accent}12`, color: accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={['monitor','shield','cloud','server','compass','globe'][i]} size={18}/>
                  </span>
                  <span style={{ fontFamily: p.mono, fontSize: 10, color: p.muted, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 8px', border: `1px solid ${p.line}`, borderRadius: 4 }}>
                    INCLUDED
                  </span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2, color: p.ink }}>{s.name}</h3>
                <p style={{ margin: '6px 0 14px', color: p.muted, fontSize: 14, lineHeight: 1.55 }}>{s.long}</p>
                <div style={{ paddingTop: 12, borderTop: `1px solid ${p.lineSoft}`, fontFamily: p.mono, fontSize: 11, color: p.muted, letterSpacing: 0.4, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
                  <span>SLA · 15-min</span>
                  <a href="#" style={{ color: accent, textDecoration: 'none' }}>Spec sheet →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection {...p} accent={accent} bg={p.bgAlt} cols={4} photoTone="light"/>
      <BeliefsSection {...p} accent={accent}/>
      <BFinal p={p} accent={accent} serif={p.serif}/>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════════════════
   B4 — "Warm & Personal"
   Cream-tinted whites. Founder portrait dominates the hero. Friendlier copy.
   ═══════════════════════════════════════════════════════════════════════════ */
const HomeB4 = ({ accent = '#dc2626' }) => {
  const p = BPal({
    bg: '#FBF8F2',       // warm off-white
    bgAlt: '#F4EFE5',    // cream
    surface: '#FFFFFF',
    ink: '#1F1B15',
    muted: '#6e6457',
    line: 'rgba(31,27,21,0.10)',
    lineSoft: 'rgba(31,27,21,0.06)',
    dark: '#1F1B15',     // warm dark for footer
    darkText: '#FBF8F2',
    darkMuted: '#a59b8a',
    darkLine: 'rgba(255,255,255,0.10)',
  });

  return (
    <div className="artboard-root" style={{ background: p.bg, color: p.ink, fontFamily: p.font, fontSize: 16, lineHeight: 1.6, position: 'relative', WebkitFontSmoothing: 'antialiased' }}>
      <BUtilityRow p={p} accent={accent}/>
      <BNav p={p} accent={accent}/>

      {/* Photo-led hero */}
      <section style={{ background: p.bg, padding: '64px 40px 96px', borderBottom: `1px solid ${p.line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'center' }}>

          {/* Left — full-bleed portrait */}
          <Photo label="FOUNDER · OFFICE" tone="light" radius={16} style={{ aspectRatio: '4/5' }}/>

          {/* Right — friendly copy */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: p.mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 24 }}>
              <span style={{ width: 14, height: 1, background: accent }}/> Hi, we're Prime Hour Tech.
            </div>
            <h1 style={{
              margin: 0, fontFamily: p.serif, fontSize: 72, lineHeight: 1, letterSpacing: '-0.03em',
              fontWeight: 500, color: p.ink, textWrap: 'balance',
            }}>
              The IT team that <em style={{ fontStyle: 'italic', color: accent, fontWeight: 500 }}>actually picks up.</em>
            </h1>
            <p style={{
              marginTop: 22, fontSize: 19, color: p.muted,
              maxWidth: 520, lineHeight: 1.55,
            }}>
              We're a small Utah-based shop. No call centers. No re-routed tickets. Just the same handful of engineers who learn your systems and stay with your account.
            </p>

            {/* Signature block */}
            <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${p.line}`, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: p.bgAlt,
                backgroundImage: `repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 8px)`,
                border: `1px solid ${p.line}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: p.mono, fontSize: 10, color: p.muted,
              }}>FOUNDER</div>
              <div>
                <div style={{ fontFamily: p.serif, fontStyle: 'italic', fontSize: 18, color: p.ink }}>"We treat your network like it's ours."</div>
                <div style={{ fontFamily: p.mono, fontSize: 10.5, color: p.muted, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>
                  — Founder, Prime Hour Tech
                </div>
              </div>
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: accent, color: '#fff', border: 'none',
                padding: '15px 24px', borderRadius: 8, fontWeight: 600, fontSize: 15.5, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: `0 14px 32px -12px ${accent}`,
              }}>
                Say hi · Schedule a call <Icon name="arrow" size={16}/>
              </button>
              <a href={PHT.phoneLink} style={{
                padding: '15px 22px', borderRadius: 8, color: p.ink, textDecoration: 'none', fontSize: 15.5, fontWeight: 500,
                border: `1px solid ${p.line}`, background: p.surface,
                display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: p.mono,
              }}>
                <Icon name="phone" size={14}/> {PHT.phoneDigits}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team section pulled UP — meet the team prominent */}
      <TeamSection {...p} accent={accent} bg={p.surface} cols={4} photoTone="light"/>

      <HeadachesSection {...p} accent={accent} bg={p.bg}/>
      <SavingsSection {...p} accent={accent} bg={p.bgAlt}/>

      {/* Services — quiet, list with thumb */}
      <section style={{ padding: '96px 40px', background: p.bg, borderBottom: `1px solid ${p.line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: 64, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 88 }}>
              <div style={{ fontFamily: p.mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
                ◆ Services
              </div>
              <h2 style={{ margin: 0, fontFamily: p.serif, fontSize: 52, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em', color: p.ink, textWrap: 'balance' }}>
                The full lineup, plain-spoken.
              </h2>
            </div>
            <div style={{ borderTop: `1px solid ${p.line}` }}>
              {SERVICES.map((s, i) => (
                <a href="#" key={s.slug} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 24,
                  padding: '24px 0', borderBottom: `1px solid ${p.line}`, textDecoration: 'none', color: p.ink,
                }}>
                  <span style={{ width: 56, height: 56, borderRadius: 12, background: p.bgAlt, border: `1px solid ${p.line}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
                    <Icon name={['monitor','shield','cloud','server','compass','globe'][i]} size={22}/>
                  </span>
                  <span>
                    <span style={{ fontFamily: p.serif, fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em', display: 'block', lineHeight: 1.15 }}>{s.name}</span>
                    <span style={{ display: 'block', color: p.muted, marginTop: 4, fontSize: 14.5, lineHeight: 1.55 }}>{s.long}</span>
                  </span>
                  <span style={{ color: accent, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Read <Icon name="arrowSm" size={14}/>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BeliefsSection {...p} accent={accent} bg={p.bgAlt}/>
      <BFinal p={p} accent={accent}/>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   B5 — "Warm body, numbers-forward hero"
   Base: B4's layout (team pulled up, plain-spoken services list, beliefs/cookie).
   Hero: B3's numbers-led dark band (savings figure + credentials panel).
   Colors: B3's palette (cool whites, cold #0f1115 dark) — no cream tint.
   ═══════════════════════════════════════════════════════════════════════════ */
const HomeB5 = ({ accent = '#dc2626', credFill = 'none' }) => {
  // B5 uses TOKENS for chrome/colors; local `p` retained for the body
  // sections (HeadachesSection, SavingsSection, TeamSection, BeliefsSection)
  // which still consume the original `p`-shaped palette.
  const p = BPal();

  // Per-credential-card fill — darker (black tint) / lighter (white tint) / none
  const credCardBg =
    credFill === 'darker'  ? 'rgba(0,0,0,0.28)' :
    credFill === 'lighter' ? 'rgba(255,255,255,0.07)' :
    'transparent';

  return (
    <div className="artboard-root" style={{
      background: T_COLOR.bg, color: T_COLOR.ink, fontFamily: T_FONT.sans,
      fontSize: T_SIZE.bodyBase, lineHeight: 1.6, position: 'relative', WebkitFontSmoothing: 'antialiased',
    }}>
      <UtilityRow accent={accent}/>
      <SiteNav active="Services" accent={accent}/>

      {/* Numbers-led dark hero — DarkNumbersHero component handles the dark
          band, accent rail, CTAs, and the flush-right credentials panel.
          The headline + at-a-glance content is page-specific so it's
          composed inline as JSX children of `headline` and `right`. */}
      <DarkNumbersHero
        accent={accent}
        eyebrow="Average savings · 25-seat client"
        headline={
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 10 }}>
              <span style={{
                fontSize: 144, fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums', color: T_COLOR.darkText, fontFamily: T_FONT.sans,
              }}>$5,200</span>
              <span style={{
                fontFamily: T_FONT.mono, fontSize: 14, color: T_COLOR.darkMuted,
                letterSpacing: 0.5, textTransform: 'uppercase',
              }}>/mo saved</span>
            </div>
            <h1 style={{
              margin: '6px 0 0', fontSize: 36, fontWeight: 600, lineHeight: 1.15,
              letterSpacing: '-0.025em', color: T_COLOR.darkText, maxWidth: 580,
            }}>
              That's what most clients save by switching from break-fix to PHT — in their first year.
            </h1>
          </>
        }
        deck="We're a Utah managed-services partner that catches problems before they cost you. Flat-rate, line-itemed, no surprises."
        ctaPrimary="Model your savings"
        ctaSecondary="Schedule a discovery call"
        right={
          <>
            <div style={{
              fontFamily: T_FONT.mono, fontSize: 11, color: T_COLOR.darkMuted,
              letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16,
            }}>
              ◆ The credentials
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {[
                ['Microsoft Partner', 'M365 & Azure'],
                ['CompTIA Certified', 'Net+/Sec+ team'],
                ['Cisco CCNA', 'Network design'],
                ['CIS Controls v8', 'Aligned framework'],
                ['HIPAA-aware', 'Healthcare-ready'],
                ['Utah-based', '100% U.S. team'],
              ].map(([t, sub]) => (
                <div key={t} style={{
                  padding: 14, border: `1px solid ${T_COLOR.darkLine}`,
                  borderRadius: T_RADIUS.md, background: credCardBg,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T_COLOR.darkText }}>{t}</div>
                  <div style={{
                    fontFamily: T_FONT.mono, fontSize: 10.5, color: T_COLOR.darkMuted,
                    letterSpacing: 0.4, textTransform: 'uppercase', marginTop: 4,
                  }}>{sub}</div>
                </div>
              ))}
            </div>
          </>
        }
      />

      {/* Trust strip — bridges dark hero into the lighter B4 body */}
      <section style={{ background: T_COLOR.bg, padding: '32px 40px', borderBottom: `1px solid ${T_COLOR.line}` }}>
        <div style={{ maxWidth: T_LAYOUT.contentMax, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: T_FONT.mono, fontSize: T_SIZE.meta, color: T_COLOR.muted, letterSpacing: T_LS.monoLabel, textTransform: 'uppercase' }}>Trusted by</div>
          <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap', flex: 1, justifyContent: 'space-around' }}>
            {['LAW FIRM 01', 'CLINIC 02', 'CPA GROUP', 'REAL ESTATE', 'MANUFACTURING', 'NONPROFIT'].map((l) => (
              <span key={l} style={{ fontFamily: T_FONT.mono, fontSize: 13, color: T_COLOR.muted, letterSpacing: 0.8, opacity: 0.6 }}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* From here down: B4's body. Team pulled up first, then the plain-spoken services list. */}
      <TeamSection {...p} accent={accent} bg={p.surface} cols={4} photoTone="light"/>

      <HeadachesSection {...p} accent={accent} bg={p.bg}/>
      <SavingsSection {...p} accent={accent} bg={p.bgAlt}/>

      {/* Services — B4's "plain-spoken" list with sticky title + thumbnails */}
      <section style={{ padding: '96px 40px', background: T_COLOR.bg, borderBottom: `1px solid ${T_COLOR.line}` }}>
        <div style={{ maxWidth: T_LAYOUT.contentMax, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: 64, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 88 }}>
              <div style={{ fontFamily: T_FONT.mono, fontSize: T_SIZE.meta, color: accent, letterSpacing: T_LS.monoEyebrow, textTransform: 'uppercase', marginBottom: 14 }}>
                ◆ Services
              </div>
              <h2 style={{ margin: 0, fontFamily: T_FONT.serif, fontSize: T_SIZE.displayMd, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em', color: T_COLOR.ink, textWrap: 'balance' }}>
                The full lineup, plain-spoken.
              </h2>
            </div>
            <div style={{ borderTop: `1px solid ${T_COLOR.line}` }}>
              {SERVICES.map((s, i) => (
                <a href="#" key={s.slug} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 24,
                  padding: '24px 0', borderBottom: `1px solid ${T_COLOR.line}`, textDecoration: 'none', color: T_COLOR.ink,
                }}>
                  <span style={{ width: 56, height: 56, borderRadius: T_RADIUS.xl, background: T_COLOR.bgAlt, border: `1px solid ${T_COLOR.line}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
                    <Icon name={['monitor','shield','cloud','server','compass','globe'][i]} size={22}/>
                  </span>
                  <span>
                    <span style={{ fontFamily: T_FONT.serif, fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em', display: 'block', lineHeight: 1.15 }}>{s.name}</span>
                    <span style={{ display: 'block', color: T_COLOR.muted, marginTop: 4, fontSize: T_SIZE.bodySm, lineHeight: T_LH.body }}>{s.long}</span>
                  </span>
                  <span style={{ color: accent, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Read <Icon name="arrowSm" size={14}/>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BeliefsSection {...p} accent={accent} bg={p.bgAlt}/>
      <BFinal p={p} accent={accent}/>
    </div>
  );
};

Object.assign(window, { HomeB2, HomeB3, HomeB4, HomeB5 });
