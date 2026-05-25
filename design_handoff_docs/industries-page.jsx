// industries-page.jsx — Industries overview page.
// Same chrome (utility row + nav + dark FooterB) and B5 palette. One hero,
// then a section per industry with bullet list + a "who in this industry"
// card on the right. Closes with a "we work with you anyway" CTA.

const INDUSTRY_PAGE_DATA = [
  {
    id: 'professional-services',
    iconName: 'file',
    name: 'Professional Services',
    sub: 'Law · Accounting · Real Estate · Consulting',
    intro: 'Firms that bill by the hour can\'t afford downtime, and the data on their drives is often subject to confidentiality rules that go beyond ordinary best practice. We design for both.',
    bullets: [
      'Secure document management and file sharing',
      'Client data protection and encryption-at-rest',
      'Email security and long-term archival',
      'Practice-management software support (Clio, NetDocs, MyCase)',
    ],
    examples: ['Law firms', 'Accounting & CPA firms', 'Real estate agencies', 'Consulting companies', 'Financial advisors', 'Engineering firms'],
  },
  {
    id: 'smb',
    iconName: 'users',
    name: 'Small & Mid-Size Business',
    sub: '10 – 250 seats · One or two locations',
    intro: 'The sweet spot for managed IT — big enough that ad-hoc support has stopped working, small enough that a CIO is a stretch. We slot in between.',
    bullets: [
      'Predictable monthly billing — no hourly tab',
      'Strategic IT planning and quarterly QBRs',
      'Fast helpdesk with named primary engineers',
      'Vendor and contract consolidation',
    ],
    examples: ['Manufacturers', 'Distributors', 'Construction', 'Retail HQs', 'B2B services', 'Family offices'],
  },
  {
    id: 'regulated',
    iconName: 'shield',
    name: 'Regulated Industries',
    sub: 'Healthcare · Financial · GovCon',
    intro: 'Regulators give you a checklist; auditors give you evidence requirements. We map our baseline to both so the conversation with your compliance lead is short.',
    bullets: [
      'HIPAA-aware controls (BAAs, encryption, audit logs)',
      'SOC-2-friendly evidence packs aligned to CIS v8',
      'CMMC / DFARS readiness for GovCon clients',
      'Documented incident-response playbook on retainer',
    ],
    examples: ['Medical & dental practices', 'Behavioral-health groups', 'CPA & wealth advisors', 'Insurance brokers', 'GovCon subs', 'Title companies'],
  },
  {
    id: 'nonprofit',
    iconName: 'spark',
    name: 'Nonprofits & Education',
    sub: 'Foundations · Schools · Faith-based',
    intro: 'Nonprofit budgets are tight and grant rules are picky. We help with Microsoft / Google nonprofit programs, tax-exempt licensing, and the audit trail funders expect.',
    bullets: [
      'M365 / Google nonprofit program enrollment',
      'Donor-data protection (HIPAA-style controls for sensitive cases)',
      'Volunteer & staff IT onboarding playbooks',
      'Grant-compliance reporting on IT spend',
    ],
    examples: ['501(c)(3) operating charities', 'Private schools', 'Faith communities', 'Community foundations', 'Arts organizations', 'Membership orgs'],
  },
];

const IndustriesPage = ({ accent = '#dc2626' }) => {
  const bg = '#ffffff';
  const bgAlt = '#F8F9FA';
  const ink = '#1A1A1A';
  const muted = '#5b6068';
  const dark = '#0f1115';
  const darkText = '#f2f3f5';
  const darkMuted = '#9aa0a6';
  const darkLine = 'rgba(255,255,255,0.10)';
  const line = 'rgba(26,26,26,0.10)';
  const lineSoft = 'rgba(26,26,26,0.06)';

  return (
    <div className="artboard-root" style={{
      background: bg, color: ink, fontFamily: '"Geist", system-ui, sans-serif',
      fontSize: 16, lineHeight: 1.65, WebkitFontSmoothing: 'antialiased',
    }}>
      {/* utility row */}
      <div style={{ borderBottom: `1px solid ${line}`, fontFamily: '"Geist Mono", monospace', fontSize: 11, letterSpacing: 0.5, color: muted, background: bg }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '10px 40px', display: 'flex', alignItems: 'center', gap: 24, textTransform: 'uppercase' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#1f7a3a' }}>
            <LiveDot color="#1f7a3a"/> Available now · {PHT.hoursWeekday}
          </span>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 18 }}>
            <a href={PHT.phoneLink} style={{ color: muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="phone" size={12}/> {PHT.phoneDigits}</a>
            <a href={`mailto:${PHT.email}`} style={{ color: muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="mail" size={12}/> {PHT.email}</a>
          </span>
        </div>
      </div>

      {/* nav */}
      <nav style={{ background: bg, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '18px 40px', display: 'flex', alignItems: 'center', gap: 40 }}>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: ink }}>
            <span style={{ color: ink }}><Logomark size={36} accent={accent} bg={bgAlt}/></span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
              <span style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}>Prime Hour Tech</span>
              <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, color: muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>Reliability & Integrity</span>
            </span>
          </a>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 6, fontSize: 14.5 }}>
            {['Services', 'Industries', 'About', 'Blog', 'Contact'].map(label => (
              <li key={label}>
                <a href="#" style={{
                  padding: '10px 14px', color: ink, textDecoration: 'none',
                  fontWeight: label === 'Industries' ? 600 : 500,
                  borderBottom: label === 'Industries' ? `2px solid ${accent}` : '2px solid transparent',
                }}>{label}</a>
              </li>
            ))}
          </ul>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href={PHT.phoneLink} style={{ color: ink, textDecoration: 'none', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="phone" size={14}/> {PHT.phoneDigits}
            </a>
            <button style={{
              background: accent, color: '#fff', border: 'none',
              padding: '12px 20px', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>Schedule a call <Icon name="arrowSm" size={14}/></button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '80px 40px 56px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 18 }}>
              ◆ Industries · {INDUSTRY_PAGE_DATA.length} verticals · Utah & remote
            </div>
            <h1 style={{
              margin: 0, fontFamily: '"Newsreader", serif', fontSize: 104, lineHeight: 0.94, letterSpacing: '-0.035em',
              fontWeight: 500, color: ink, textWrap: 'balance',
            }}>
              IT designed for <em style={{ fontStyle: 'italic', color: accent, fontWeight: 500 }}>your kind of business.</em>
            </h1>
          </div>
          <div>
            <p style={{ margin: 0, color: muted, fontSize: 18, lineHeight: 1.55 }}>
              The baseline is the same — flat-rate, named engineers, real humans on the phone. What changes is which controls we prioritize, which software we integrate with, and which regulators show up on quarterly review.
            </p>
            <p style={{ marginTop: 14, color: muted, fontSize: 18, lineHeight: 1.55 }}>
              Below: the four verticals that make up most of our book. Don't see yours? Most of what we do crosses categories cleanly.
            </p>
          </div>
        </div>
      </section>

      {/* Jump nav */}
      <section style={{ padding: '24px 40px', borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`, background: bgAlt, position: 'sticky', top: 0, zIndex: 4 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>Jump to:</span>
          {INDUSTRY_PAGE_DATA.map((d) => (
            <a key={d.id} href={`#${d.id}`} style={{
              padding: '8px 14px', borderRadius: 999, textDecoration: 'none', fontSize: 13.5, fontWeight: 500,
              color: ink, border: `1px solid ${line}`, background: bg,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <Icon name={d.iconName} size={13}/> {d.name}
            </a>
          ))}
        </div>
      </section>

      {/* Industry sections */}
      {INDUSTRY_PAGE_DATA.map((d, i) => {
        const altBg = i % 2 === 1 ? bgAlt : bg;
        return (
          <section id={d.id} key={d.id} style={{ padding: '96px 40px', background: altBg, borderBottom: `1px solid ${line}` }}>
            <div style={{ maxWidth: 1240, margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <span style={{
                  width: 48, height: 48, borderRadius: 12, background: `${accent}12`, color: accent,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${accent}33`,
                }}>
                  <Icon name={d.iconName} size={22}/>
                </span>
                <div>
                  <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase' }}>
                    ◆ Vertical · 0{i + 1} of 0{INDUSTRY_PAGE_DATA.length}
                  </div>
                  <h2 style={{
                    margin: '6px 0 0', fontFamily: '"Newsreader", serif', fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.025em',
                    fontWeight: 500, color: ink, textWrap: 'balance',
                  }}>
                    {d.name}
                  </h2>
                  <div style={{ marginTop: 6, fontFamily: '"Geist Mono", monospace', fontSize: 12, color: muted, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                    {d.sub}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56, alignItems: 'start', marginTop: 32 }}>
                <div>
                  <p style={{ margin: 0, color: muted, fontSize: 17.5, lineHeight: 1.6, maxWidth: 620 }}>{d.intro}</p>
                  <ul style={{ marginTop: 24, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {d.bullets.map((b) => (
                      <li key={b} style={{ display: 'flex', gap: 14, color: ink, fontSize: 15.5, lineHeight: 1.55, padding: '14px 0', borderBottom: `1px solid ${lineSoft}` }}>
                        <span style={{ color: accent, marginTop: 4 }}><Icon name="check" size={16} stroke={2}/></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 24 }}>
                    <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 14.5, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      Talk about {d.name.toLowerCase()} <Icon name="arrowSm" size={14}/>
                    </a>
                  </div>
                </div>

                <div style={{ background: i % 2 === 1 ? bg : bgAlt, border: `1px solid ${line}`, borderRadius: 14, padding: 24 }}>
                  <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
                    ◇ Who in this category
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                    {d.examples.map((e) => (
                      <li key={e} style={{ padding: '10px 0', borderBottom: `1px solid ${lineSoft}`, fontSize: 14, color: ink, fontFamily: '"Geist Mono", monospace', letterSpacing: 0.3 }}>
                        — {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Don't see your industry? */}
      <section style={{ padding: '80px 40px', background: bg }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>
            ◆ Don't see yours?
          </div>
          <h2 style={{
            margin: 0, fontFamily: '"Newsreader", serif', fontSize: 56, lineHeight: 1, letterSpacing: '-0.03em',
            fontWeight: 500, color: ink, textWrap: 'balance',
          }}>
            We work with most SMBs <em style={{ fontStyle: 'italic', color: accent }}>regardless of vertical.</em>
          </h2>
          <p style={{ marginTop: 20, color: muted, fontSize: 17, lineHeight: 1.55, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
            The categories above are where we have deepest pattern recognition. If your business doesn't fit cleanly into one, it usually fits cleanly into the cross-section of two. Tell us what you do — we'll tell you whether we're a fit.
          </p>
          <div style={{ marginTop: 28, display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button style={{
              background: accent, color: '#fff', border: 'none',
              padding: '15px 26px', borderRadius: 8, fontWeight: 600, fontSize: 15.5, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: `0 14px 32px -12px ${accent}`,
            }}>Schedule a discovery call <Icon name="arrow" size={16}/></button>
            <a href="#" style={{
              padding: '15px 22px', borderRadius: 8, color: ink, textDecoration: 'none', fontSize: 15.5, fontWeight: 500,
              border: `1px solid ${line}`,
            }}>Read about our approach →</a>
          </div>
        </div>
      </section>

      <FooterB accent={accent} dark={dark} darkText={darkText} darkMuted={darkMuted} darkLine={darkLine}/>
    </div>
  );
};

Object.assign(window, { IndustriesPage });
