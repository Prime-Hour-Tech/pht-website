// contact-page.jsx — redesigned Contact page
// Uses Editorial Pro direction's type system (Newsreader + Geist) — it's the
// most readable and the one most likely to be picked for "real" content pages.
// Could be retyped to match the chosen direction once user picks one.

const ContactPage = ({ accent = '#c81d2a' }) => {
  const bg = '#ffffff';
  const surface = '#F8F9FA';
  const ink = '#1A1A1A';
  const muted = '#5b6068';
  const line = 'rgba(26,26,26,0.10)';
  const lineSoft = 'rgba(26,26,26,0.06)';

  return (
    <div className="artboard-root" style={{
      background: bg, color: ink, fontFamily: '"Geist", system-ui, sans-serif',
      fontSize: 16, lineHeight: 1.6, WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale',
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

      {/* nav (matches home-b) */}
      <nav style={{ background: bg, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '18px 40px', display: 'flex', alignItems: 'center', gap: 40 }}>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: ink }}>
            <span style={{ color: ink }}><Logomark size={36} accent={accent} bg={surface}/></span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
              <span style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}>Prime Hour Tech</span>
              <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, color: muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>Reliability & Integrity</span>
            </span>
          </a>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 6, fontSize: 14.5 }}>
            {[
              { label: 'Services' },
              { label: 'Industries' },
              { label: 'About' },
              { label: 'Blog' },
              { label: 'Contact', sel: true },
            ].map(({ label, sel }) => (
              <li key={label}>
                <a href="#" style={{
                  padding: '10px 14px', color: ink, textDecoration: 'none',
                  fontWeight: sel ? 600 : 500,
                  borderBottom: sel ? `2px solid ${accent}` : '2px solid transparent',
                }}>{label}</a>
              </li>
            ))}
          </ul>
          <div style={{ marginLeft: 'auto' }}>
            <button style={{
              background: ink, color: '#fff', border: 'none', padding: '12px 20px', borderRadius: 999,
              fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Schedule a call <Icon name="arrowSm" size={14}/>
            </button>
          </div>
        </div>
      </nav>

      {/* page header */}
      <section style={{ padding: '72px 40px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 18 }}>
            ◆ Contact
          </div>
          <h1 style={{
            margin: 0, fontFamily: '"Newsreader", serif', fontSize: 80, lineHeight: 0.98,
            letterSpacing: '-0.03em', fontWeight: 500, color: ink, textWrap: 'balance', maxWidth: 900,
          }}>
            Let's talk. <em style={{ fontStyle: 'italic', color: accent }}>We pick up.</em>
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, color: muted, maxWidth: 640, lineHeight: 1.5 }}>
            Tell us about your environment, your pain points, or just say hi. We respond within one business day — usually within an hour.
          </p>
        </div>
      </section>

      {/* main: form + contact panels */}
      <section style={{ padding: '32px 40px 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'start' }}>

          {/* FORM */}
          <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: 40, boxShadow: '0 24px 60px -36px rgba(0,0,0,0.2)' }}>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>
              Step 1 of 1 · ~2 min
            </div>
            <h2 style={{ margin: 0, fontFamily: '"Newsreader", serif', fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Tell us about your business.
            </h2>
            <p style={{ marginTop: 8, marginBottom: 28, color: muted, fontSize: 15 }}>
              Required fields marked with *. We never share your info.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Full name *" placeholder="Jane Doe"/>
              <Field label="Company *" placeholder="Acme LLC"/>
              <Field label="Work email *" placeholder="jane@acme.com"/>
              <Field label="Phone" placeholder="(555) 555-5555"/>
            </div>

            <div style={{ marginTop: 16 }}>
              <Field label="Company size" type="select" options={['1–10', '10–50', '50–250', '250+']}/>
            </div>

            <div style={{ marginTop: 16 }}>
              <FieldLabel>What's prompting this conversation? *</FieldLabel>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                {['Switching MSPs', 'No IT today', 'Security concern', 'Cloud migration', 'IT project / move', 'Just exploring'].map((t, i) => (
                  <label key={t} style={{
                    padding: '8px 14px', borderRadius: 999, border: `1px solid ${i === 1 ? accent : line}`,
                    background: i === 1 ? `${accent}10` : '#fff',
                    color: i === 1 ? accent : ink, fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>
                    {i === 1 && <Icon name="check" size={13} stroke={2.2}/>}
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <FieldLabel>Anything else we should know?</FieldLabel>
              <textarea rows={4} placeholder="Stack you're running, current pain points, ideal start date…" style={{
                width: '100%', border: `1px solid ${line}`, borderRadius: 8, padding: '12px 14px',
                background: '#fff', color: ink, fontSize: 15, fontFamily: 'inherit', resize: 'vertical', marginTop: 10,
              }}/>
            </div>

            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button style={{
                background: accent, color: '#fff', border: 'none',
                padding: '14px 24px', borderRadius: 999, fontWeight: 600, fontSize: 15, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: `0 14px 30px -12px ${accent}aa`,
              }}>
                Send & schedule a call <Icon name="arrow" size={16}/>
              </button>
              <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 0.5 }}>
                Reply guaranteed within 1 business day
              </span>
            </div>
          </div>

          {/* CONTACT PANELS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ContactPanel
              icon="phone" accent={accent} label="Call us"
              primary={PHT.phoneDigits} sub={`${PHT.hoursWeekday} · ${PHT.hoursEmergency} for managed clients`}
              href={PHT.phoneLink}
            />
            <ContactPanel
              icon="mail" accent={accent} label="Email"
              primary={PHT.email} sub="Tickets, billing, general — all in one inbox"
              href={`mailto:${PHT.email}`}
            />
            <ContactPanel
              icon="pin" accent={accent} label="Service area"
              primary="Salt Lake City, UT" sub="Statewide Utah on-site · Remote support across the US"
            />
            <ContactPanel
              icon="users" accent={accent} label="Existing client?"
              primary="Open a ticket" sub="Faster than email if you have your client portal credentials"
              href="#"
            />

            {/* Hours block */}
            <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                  <Icon name="clock" size={16} className="" style={{ color: accent }}/> Hours
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#1f7a3a' }}>
                  <LiveDot color="#1f7a3a"/> Open now
                </span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <tbody>
                  {[
                    ['Monday – Friday', '8:00 AM – 6:00 PM MST'],
                    ['Saturday', 'Emergency only'],
                    ['Sunday', 'Emergency only'],
                    ['Managed clients', '24/7'],
                  ].map(([d, h], i, arr) => (
                    <tr key={d} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${lineSoft}` : 'none' }}>
                      <td style={{ padding: '8px 0', color: muted }}>{d}</td>
                      <td style={{ padding: '8px 0', color: ink, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <FooterB accent={accent} dark="#0f1115" darkText="#f2f3f5" darkMuted="#9aa0a6" darkLine="rgba(255,255,255,0.10)"/>
    </div>
  );
};

const FieldLabel = ({ children }) => (
  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1a1d24', letterSpacing: 0.1 }}>{children}</label>
);

const Field = ({ label, placeholder, type, options }) => (
  <div>
    <FieldLabel>{label}</FieldLabel>
    {type === 'select' ? (
      <select style={{
        width: '100%', border: `1px solid rgba(26,26,26,0.10)`, borderRadius: 8, padding: '12px 14px',
        background: '#fff', color: '#1a1d24', fontSize: 15, fontFamily: 'inherit', marginTop: 8,
      }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input placeholder={placeholder} style={{
        width: '100%', border: `1px solid rgba(26,26,26,0.10)`, borderRadius: 8, padding: '12px 14px',
        background: '#fff', color: '#1a1d24', fontSize: 15, fontFamily: 'inherit', marginTop: 8,
      }}/>
    )}
  </div>
);

const ContactPanel = ({ icon, label, primary, sub, href, accent }) => {
  const inner = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
        <span style={{
          width: 32, height: 32, borderRadius: 8, background: `${accent}15`, color: accent,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon} size={16} stroke={1.7}/>
        </span>
        <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: '#5a5e68', letterSpacing: 1.2, textTransform: 'uppercase' }}>{label}</span>
        {href && <Icon name="arrowSm" size={14} className="" style={{ marginLeft: 'auto', color: '#5a5e68' }}/>}
      </div>
      <div style={{ fontFamily: '"Newsreader", serif', fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.15, color: '#1a1d24' }}>
        {primary}
      </div>
      <div style={{ marginTop: 4, fontSize: 13.5, color: '#5a5e68', lineHeight: 1.5 }}>{sub}</div>
    </>
  );
  const baseStyle = {
    background: '#ffffff', border: `1px solid rgba(26,26,26,0.10)`, borderRadius: 12, padding: 20,
    textDecoration: 'none', color: '#1a1d24', display: 'block',
  };
  return href ? <a href={href} style={baseStyle}>{inner}</a> : <div style={baseStyle}>{inner}</div>;
};

Object.assign(window, { ContactPage });
