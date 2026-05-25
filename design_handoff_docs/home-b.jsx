// home-b.jsx — Direction B: "Light & Professional" (matches user's color spec)
//   Base: white / #F8F9FA
//   Text: #1A1A1A
//   Dark band: hero only + footer
//   Red CTAs throughout
// Type: Newsreader serif + Geist sans + Geist Mono
// Content now includes: headaches framing, savings chart, team, beliefs.

const HomeB = ({ accent = '#dc2626', density = 'airy' }) => {
  const compact = density === 'compact';
  const pad = compact ? 64 : 96;
  // Palette (user spec)
  const bg = '#ffffff';
  const bgAlt = '#F8F9FA';
  const surface = '#ffffff';
  const ink = '#1A1A1A';
  const muted = '#5b6068';
  const line = 'rgba(26,26,26,0.10)';
  const lineSoft = 'rgba(26,26,26,0.06)';
  // Dark band (hero + footer only)
  const dark = '#0f1115';
  const darkText = '#f2f3f5';
  const darkMuted = '#9aa0a6';
  const darkLine = 'rgba(255,255,255,0.10)';

  const font = '"Geist", system-ui, sans-serif';
  const mono = '"Geist Mono", ui-monospace, monospace';
  const serif = '"Newsreader", Georgia, serif';

  return (
    <div className="artboard-root" style={{
      background: bg, color: ink, fontFamily: font,
      fontSize: 16, lineHeight: 1.6, WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale',
      position: 'relative',
    }}>

      {/* ===== UTILITY ROW ===== */}
      <div style={{ borderBottom: `1px solid ${line}`, background: bgAlt }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '10px 40px', display: 'flex', alignItems: 'center', gap: 24, fontFamily: mono, fontSize: 11, letterSpacing: 0.5, color: muted, textTransform: 'uppercase' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#1f7a3a' }}>
            <LiveDot color="#1f7a3a"/> Open now · {PHT.hoursWeekday}
          </span>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 18 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="pin" size={12}/> Salt Lake City, UT</span>
            <a href={PHT.phoneLink} style={{ color: muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="phone" size={12}/> {PHT.phoneDigits}</a>
            <a href={`mailto:${PHT.email}`} style={{ color: muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="mail" size={12}/> {PHT.email}</a>
          </span>
        </div>
      </div>

      {/* ===== NAV ===== */}
      <nav style={{ background: bg, borderBottom: `1px solid ${line}`, position: 'sticky', top: 0, zIndex: 5 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '18px 40px', display: 'flex', alignItems: 'center', gap: 40 }}>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: ink }}>
            <span style={{ color: ink }}><Logomark size={36} accent={accent} bg={bgAlt}/></span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
              <span style={{ fontFamily: serif, fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}>Prime Hour Tech</span>
              <span style={{ fontFamily: mono, fontSize: 10, color: muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>Reliability & Integrity</span>
            </span>
          </a>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 6, fontSize: 14.5 }}>
            {[
              { label: 'Services', sel: true },
              { label: 'Industries' },
              { label: 'About' },
              { label: 'Blog' },
              { label: 'Contact' },
            ].map(({ label, sel }) => (
              <li key={label}>
                <a href="#" style={{
                  padding: '10px 14px', color: ink, textDecoration: 'none',
                  fontWeight: sel ? 600 : 500,
                  borderBottom: sel ? `2px solid ${accent}` : '2px solid transparent',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  {label}{sel && <Icon name="chevron" size={12}/>}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href={PHT.phoneLink} style={{ color: ink, textDecoration: 'none', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
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

      {/* ===== DARK HERO BAND ===== */}
      <section style={{ background: dark, color: darkText, padding: `${pad - 8}px 40px ${pad + 16}px`, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle accent corner glow */}
        <div style={{ position: 'absolute', top: -160, right: -120, width: 480, height: 480, background: `radial-gradient(circle, ${accent}26, transparent 70%)`, pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center', position: 'relative' }}>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 28 }}>
              <span style={{ width: 18, height: 1, background: accent }}/> A Utah MSP · Est. 2024
            </div>
            <h1 style={{
              margin: 0, fontFamily: serif, fontSize: 76, lineHeight: 0.98, letterSpacing: '-0.03em',
              fontWeight: 500, color: darkText, textWrap: 'balance',
            }}>
              IT that actually <em style={{ fontStyle: 'italic', color: accent, fontWeight: 500 }}>answers the phone.</em>
            </h1>
            <p style={{
              marginTop: 24, marginBottom: 32, fontSize: 19, color: darkMuted,
              maxWidth: 520, lineHeight: 1.55, fontWeight: 400,
            }}>
              Prime Hour Tech relieves the day-to-day computer headaches that slow your team down — managed IT, cybersecurity, cloud, and a real person on the phone when you call.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: accent, color: '#fff', border: 'none',
                padding: '15px 24px', borderRadius: 8, fontWeight: 600, fontSize: 15.5, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: `0 14px 32px -12px ${accent}`,
              }}>
                Schedule a discovery call <Icon name="arrow" size={16}/>
              </button>
              <a href="#" style={{
                padding: '15px 22px', borderRadius: 8, color: darkText, textDecoration: 'none', fontSize: 15.5, fontWeight: 500,
                border: `1px solid ${darkLine}`,
              }}>
                See how we save you money →
              </a>
            </div>

            {/* Compact metric strip */}
            <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${darkLine}`, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { k: '<15 min', v: 'Avg response' },
                { k: '24/7', v: 'Monitoring' },
                { k: '99.9%', v: 'Uptime SLA' },
                { k: '30–45%', v: 'Avg savings' },
              ].map(s => (
                <div key={s.k}>
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: darkText }}>{s.k}</div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, color: darkMuted, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — image */}
          <div>
            <Photo label="TEAM / OFFICE PHOTO" tone="dark" radius={12} style={{ aspectRatio: '4/5' }}/>
          </div>
        </div>
      </section>

      {/* ===== HEADACHES ===== */}
      <HeadachesSection {...{ accent, ink, muted, line, surface, bg, font, mono, serif, pad }}/>

      {/* ===== SAVINGS ===== */}
      <SavingsSection {...{ accent, ink, muted, line, surface, bg: bgAlt, font, mono, serif, pad }}/>

      {/* ===== SERVICES ===== */}
      <section style={{ padding: `${pad}px 40px`, background: bg, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: 80, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 88 }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>
                ◆ Services
              </div>
              <h2 style={{
                margin: 0, fontFamily: serif, fontSize: 52, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 500, color: ink, textWrap: 'balance',
              }}>
                Six service lines, <em style={{ fontStyle: 'italic' }}>one accountable</em> partner.
              </h2>
              <p style={{ marginTop: 16, color: muted, fontSize: 16, lineHeight: 1.65, maxWidth: 320 }}>
                No re-routing tickets between vendors. One team owns your stack end-to-end.
              </p>
            </div>

            <div style={{ borderTop: `1px solid ${line}` }}>
              {SERVICES.map((s, i) => (
                <a href="#" key={s.slug} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center', gap: 24,
                  padding: '24px 0', borderBottom: `1px solid ${line}`, textDecoration: 'none', color: ink,
                }}>
                  <span style={{ fontFamily: mono, fontSize: 12, color: muted, letterSpacing: 1, width: 32 }}>0{i+1}</span>
                  <span>
                    <span style={{ fontFamily: serif, fontSize: 26, fontWeight: 500, letterSpacing: '-0.015em', display: 'block', lineHeight: 1.1 }}>
                      {s.name}
                    </span>
                    <span style={{ display: 'block', color: muted, marginTop: 6, fontSize: 15, lineHeight: 1.55 }}>
                      {s.long}
                    </span>
                  </span>
                  <span style={{ color: accent }}><Icon name={['monitor','shield','cloud','server','compass','globe'][i]} size={22}/></span>
                  <span style={{ color: accent, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Read <Icon name="arrowSm" size={14}/>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <TeamSection {...{ accent, ink, muted, line, surface, bg: bgAlt, font, mono, serif, pad, photoTone: 'light' }}/>

      {/* ===== BELIEFS ===== */}
      <BeliefsSection {...{ accent, ink, muted, line, surface, bg, font, mono, serif, pad }}/>

      {/* ===== INDUSTRIES ===== */}
      <section style={{ padding: `${pad}px 40px`, background: bgAlt, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
                ◆ Verticals
              </div>
              <h2 style={{ margin: 0, fontFamily: serif, fontSize: 48, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em' }}>
                Industries we know.
              </h2>
            </div>
            <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>See all industries →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.name} style={{ background: surface, border: `1px solid ${line}`, borderRadius: 12, overflow: 'hidden' }}>
                <Photo label={`INDUSTRY ${i+1}`} tone="light" style={{ aspectRatio: '4/3', borderRadius: 0, border: 0, borderBottom: `1px solid ${lineSoft}` }}/>
                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: mono, fontSize: 10.5, color: muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>{ind.sub}</div>
                  <h3 style={{ margin: 0, fontFamily: serif, fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.15 }}>{ind.name}</h3>
                  <p style={{ margin: '10px 0 16px', color: muted, fontSize: 14.5, lineHeight: 1.55 }}>{ind.body}</p>
                  <a href="#" style={{ color: accent, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Learn more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: `${pad + 16}px 40px`, background: bg, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
              Ready when you are
            </div>
            <h2 style={{ margin: 0, fontFamily: serif, fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 500, textWrap: 'balance', color: ink }}>
              Let's talk about <em style={{ fontStyle: 'italic', color: accent }}>what's slowing you down.</em>
            </h2>
            <p style={{ marginTop: 16, color: muted, fontSize: 18, lineHeight: 1.55, maxWidth: 500 }}>
              30 minutes. We'll look at your stack and your support load, and tell you where Prime Hour Tech fits — even if the answer is "not yet."
            </p>
          </div>
          <div style={{ background: bgAlt, border: `1px solid ${line}`, borderRadius: 14, padding: 28, boxShadow: '0 24px 60px -32px rgba(0,0,0,0.18)' }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, color: ink }}>Get in touch</div>
            <a href={PHT.phoneLink} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: `1px solid ${lineSoft}`, color: ink, textDecoration: 'none', fontSize: 15 }}>
              <Icon name="phone" size={18} stroke={1.5}/> <span style={{ flex: 1 }}>{PHT.phoneDigits}</span> <Icon name="arrowSm" size={14}/>
            </a>
            <a href={`mailto:${PHT.email}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: `1px solid ${lineSoft}`, color: ink, textDecoration: 'none', fontSize: 15 }}>
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

      {/* ===== DARK FOOTER ===== */}
      <FooterB accent={accent} dark={dark} darkText={darkText} darkMuted={darkMuted} darkLine={darkLine}/>

      {/* ===== COOKIE BANNER ===== */}
      <CookieBanner accent={accent} ink={ink}/>
    </div>
  );
};

const FooterB = ({ accent, dark, darkText, darkMuted, darkLine }) => (
  <footer style={{ background: dark, color: darkMuted, padding: '72px 40px 32px', fontSize: 14 }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 32, marginBottom: 56 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 18, color: darkText }}>
            <Logomark size={36} accent={accent}/>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
              <span style={{ fontFamily: '"Newsreader", serif', fontWeight: 600, fontSize: 18 }}>Prime Hour Tech</span>
              <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: darkMuted }}>Est. 2024 · Utah</span>
            </div>
          </div>
          <p style={{ margin: 0, lineHeight: 1.6, maxWidth: 280, color: darkMuted }}>
            We relieve the day-to-day computer headaches that slow your business down. Managed IT, cybersecurity, and cloud — built on integrity, clarity, and 24/7 responsiveness.
          </p>
        </div>
        <FooterColB title="Services" items={SERVICES.map(s => s.name)} darkText={darkText} darkMuted={darkMuted}/>
        <FooterColB title="Industries" items={['Professional Services', 'Small Business', 'Regulated', 'Healthcare', 'Finance']} darkText={darkText} darkMuted={darkMuted}/>
        <FooterColB title="Company" items={['About', 'Blog', 'Careers', 'Contact']} darkText={darkText} darkMuted={darkMuted}/>
        <FooterColB title="Legal" items={['Terms & Conditions', 'Privacy Policy', 'SMS Terms', 'Cookie Policy', 'Client SLA', 'Acceptable Use', 'MSA Exhibit A', 'MSA Exhibit B']} darkText={darkText} darkMuted={darkMuted}/>
      </div>
      <div style={{ borderTop: `1px solid ${darkLine}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, letterSpacing: 0.5, color: darkMuted, textTransform: 'uppercase' }}>
          © 2026 Prime Hour Tech · All rights reserved
        </span>
        <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: darkMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {PHT.area}
        </span>
      </div>
    </div>
  </footer>
);

const FooterColB = ({ title, items, darkText, darkMuted }) => (
  <div>
    <h4 style={{ color: darkText, fontSize: 13, fontWeight: 600, margin: '0 0 14px', letterSpacing: 0.3, fontFamily: '"Geist", system-ui, sans-serif' }}>{title}</h4>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
      {items.map(i => <li key={i}><a href="#" style={{ color: darkMuted, textDecoration: 'none', fontSize: 13 }}>{i}</a></li>)}
    </ul>
  </div>
);

Object.assign(window, { HomeB, FooterB });
