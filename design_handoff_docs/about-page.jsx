// about-page.jsx — About Us page
// Editorial company story: hero, founder + origin, numbers, beliefs (reused),
// timeline, team (reused), office photo, final CTA. Pairs with B5 home.

const AboutPage = ({ accent = '#dc2626' }) => {
  const bg = '#ffffff';
  const bgAlt = '#F8F9FA';
  const surface = '#ffffff';
  const ink = '#1A1A1A';
  const muted = '#5b6068';
  const line = 'rgba(26,26,26,0.10)';
  const lineSoft = 'rgba(26,26,26,0.06)';

  // Reusable style tokens for the BeliefsSection / TeamSection helpers
  const reusable = {
    accent, ink, muted, line, surface, bg: bgAlt,
    font: '"Geist", system-ui, sans-serif',
    mono: '"Geist Mono", monospace',
    serif: '"Newsreader", Georgia, serif',
  };

  return (
    <div className="artboard-root" style={{
      background: bg, color: ink, fontFamily: '"Geist", system-ui, sans-serif',
      fontSize: 16, lineHeight: 1.65, WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Chrome — shared components from site-chrome.jsx */}
      <UtilityRow accent={accent}/>
      <SiteNav active="About" accent={accent}/>

      {/* Hero — eyebrow + big editorial headline + mission paragraph */}
      <section style={{ padding: '80px 40px 56px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 18 }}>
              ◆ About · Est. 2024 · Salt Lake City, UT
            </div>
            <h1 style={{
              margin: 0, fontFamily: '"Newsreader", serif', fontSize: 104, lineHeight: 0.94, letterSpacing: '-0.035em',
              fontWeight: 500, color: ink, textWrap: 'balance',
            }}>
              A small IT team that <em style={{ fontStyle: 'italic', color: accent, fontWeight: 500 }}>treats your network like it's ours.</em>
            </h1>
          </div>
          <div>
            <p style={{ margin: 0, color: muted, fontSize: 18, lineHeight: 1.55 }}>
              We started Prime Hour Tech because we kept getting hired by businesses who'd been failed by an MSP that grew too fast, lost the engineers who knew their environment, and started routing tickets to call centers. We wanted to build the opposite of that.
            </p>
            <p style={{ marginTop: 14, color: muted, fontSize: 18, lineHeight: 1.55 }}>
              Small, accountable, and answering the phone — for as long as we possibly can.
            </p>
          </div>
        </div>
      </section>

      {/* Founder / origin photo block — wide hero photo with caption pull */}
      <section style={{ padding: '0 40px 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
          <Photo label="TEAM AT OFFICE · WIDE" tone="dark" radius={14} style={{ aspectRatio: '21/9' }}/>
          <div style={{
            position: 'absolute', left: 24, bottom: 24, right: 'auto', maxWidth: 420,
            background: 'rgba(15,17,21,0.92)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.10)', borderRadius: 12, padding: 22, color: '#f2f3f5',
          }}>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: '#9aa0a6', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
              ◇ Office · Sugar House, SLC
            </div>
            <div style={{ fontFamily: '"Newsreader", serif', fontStyle: 'italic', fontSize: 20, lineHeight: 1.35 }}>
              "If we can't pick up your call, something has already gone wrong."
            </div>
            <div style={{ marginTop: 8, fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: '#9aa0a6', letterSpacing: 0.6, textTransform: 'uppercase' }}>
              — Founder, Prime Hour Tech
            </div>
          </div>
        </div>
      </section>

      {/* Story — 3-column editorial */}
      <section style={{ padding: '0 40px 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 24, textAlign: 'center' }}>
            ◆ The story
          </div>
          <h2 style={{
            margin: 0, fontFamily: '"Newsreader", serif', fontSize: 56, lineHeight: 1, letterSpacing: '-0.03em',
            fontWeight: 500, color: ink, textWrap: 'balance', textAlign: 'center', marginBottom: 56,
          }}>
            We've been on every side of <em style={{ fontStyle: 'italic', color: accent }}>this work.</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            {[
              {
                eyebrow: 'Where we came from',
                heading: 'Enterprise IT — for over a decade.',
                body: 'Before PHT, our founder ran infrastructure and security for organizations from 200 to 5,000 seats. Long migrations, late-night failovers, regulator audits — the unglamorous work that keeps a business open.',
              },
              {
                eyebrow: 'Why we started PHT',
                heading: 'To keep small businesses from getting forgotten.',
                body: 'We watched too many SMBs sign with MSPs that promised the world and then routed every call into a queue. We wanted a shop that stayed small enough that the engineer on your account today is still on it next year.',
              },
              {
                eyebrow: 'How we run today',
                heading: 'Flat-rate, line-itemed, no surprises.',
                body: 'Every client has a named primary engineer, a named backup, and a quarterly business review with the founder. Tickets go to the same people. Pricing is on one page. The contract is one PDF.',
              },
            ].map((c) => (
              <div key={c.eyebrow}>
                <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>
                  {c.eyebrow}
                </div>
                <h3 style={{
                  margin: 0, fontFamily: '"Newsreader", serif', fontSize: 26, fontWeight: 500, letterSpacing: '-0.015em',
                  lineHeight: 1.18, color: ink, textWrap: 'balance',
                }}>{c.heading}</h3>
                <p style={{ marginTop: 14, color: muted, fontSize: 15.5, lineHeight: 1.6 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <section style={{ padding: '64px 40px', background: bgAlt, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { k: '2024',     v: 'Year founded' },
            { k: '4',        v: 'Engineers on staff' },
            { k: '< 15 min', v: 'Median first-touch' },
            { k: '100%',     v: 'U.S.-based team' },
          ].map((s) => (
            <div key={s.v}>
              <div style={{ fontFamily: '"Newsreader", serif', fontSize: 56, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1, color: ink, fontVariantNumeric: 'tabular-nums' }}>
                {s.k}
              </div>
              <div style={{ marginTop: 10, fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1, textTransform: 'uppercase' }}>
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline — milestones */}
      <section style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: 64, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 88 }}>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
                ◆ Milestones
              </div>
              <h2 style={{
                margin: 0, fontFamily: '"Newsreader", serif', fontSize: 52, fontWeight: 500, letterSpacing: '-0.03em',
                lineHeight: 1, color: ink, textWrap: 'balance',
              }}>
                The short version, in order.
              </h2>
              <p style={{ marginTop: 18, color: muted, fontSize: 15.5, lineHeight: 1.6, maxWidth: 320 }}>
                Two years in, deliberately small. Growing one named engineer at a time.
              </p>
            </div>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: `1px solid ${line}` }}>
              {[
                {
                  date: 'Q1 2024',
                  title: 'Prime Hour Tech is founded',
                  body: 'Founder leaves a corporate infrastructure role. First two clients — a Salt Lake law firm and a multi-location dental practice — sign as design partners.',
                },
                {
                  date: 'Q3 2024',
                  title: 'First engineer hired',
                  body: 'Senior network and security engineer joins. The "named primary + named backup" model is formalized — every client gets two people who know their environment by heart.',
                },
                {
                  date: 'Q1 2025',
                  title: 'Cybersecurity practice launches',
                  body: 'CIS Controls v8-aligned baseline rolled out as standard for every managed client. Phishing simulation and incident-response retainer added as optional services.',
                },
                {
                  date: 'Q3 2025',
                  title: 'Cloud + M365 administrator joins',
                  body: 'Dedicated cloud admin brings M365 tenant and Azure migrations in-house. Helpdesk lead joins later that quarter — the four-person team that runs PHT today.',
                },
                {
                  date: 'Q2 2026',
                  title: 'Quarterly business reviews go formal',
                  body: 'Every client now gets a structured QBR with the founder: ticket data, security posture, license audit, and a 90-day roadmap. The format is the one in the field-notes blog.',
                },
              ].map((m, i, arr) => (
                <li key={m.date} style={{ padding: '28px 0', borderBottom: i < arr.length - 1 ? `1px solid ${line}` : 'none', display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32 }}>
                  <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 12, color: accent, letterSpacing: 0.6, textTransform: 'uppercase', paddingTop: 4 }}>
                    {m.date}
                  </div>
                  <div>
                    <div style={{ fontFamily: '"Newsreader", serif', fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2, color: ink }}>
                      {m.title}
                    </div>
                    <p style={{ margin: '8px 0 0', color: muted, fontSize: 15.5, lineHeight: 1.6 }}>{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Beliefs — reused from shared-blocks */}
      <BeliefsSection {...reusable} bg={bg}/>

      {/* Team — reused from shared-blocks */}
      <TeamSection {...reusable} bg={bgAlt} cols={4} photoTone="light"/>

      {/* Office / culture — wide photo + short copy */}
      <section style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <Photo label="OFFICE · CULTURE" tone="light" radius={14} style={{ aspectRatio: '4/3' }}/>
            <div>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
                ◆ How we work
              </div>
              <h2 style={{
                margin: 0, fontFamily: '"Newsreader", serif', fontSize: 44, fontWeight: 500, letterSpacing: '-0.025em',
                lineHeight: 1.05, color: ink, textWrap: 'balance',
              }}>
                One office. <em style={{ fontStyle: 'italic', color: accent }}>One phone number.</em> One team.
              </h2>
              <p style={{ marginTop: 18, color: muted, fontSize: 16.5, lineHeight: 1.6, maxWidth: 480 }}>
                We're a single physical office in Sugar House, Salt Lake City. We don't operate satellite call centers, we don't outsource overnight tier-1, and we don't grow past the point where we can keep that promise. When it gets crowded, we hire the engineer first and figure out the desk second.
              </p>
              <ul style={{ marginTop: 22, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Engineers, not "account managers," are on every call.',
                  'On-site visits for any client within an hour of downtown SLC.',
                  'Quarterly office hours for clients — free for any working-stage problem.',
                ].map((t) => (
                  <li key={t} style={{ display: 'flex', gap: 12, color: ink, fontSize: 15.5 }}>
                    <span style={{ color: accent, marginTop: 4 }}><Icon name="check" size={14} stroke={2}/></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '96px 40px', borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
              ◆ Want to talk?
            </div>
            <h2 style={{
              margin: 0, fontFamily: '"Newsreader", serif', fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.03em',
              fontWeight: 500, color: ink, textWrap: 'balance',
            }}>
              Coffee, a tour of the office, <em style={{ fontStyle: 'italic', color: accent }}>or a discovery call.</em>
            </h2>
            <p style={{ marginTop: 16, color: muted, fontSize: 17, lineHeight: 1.55, maxWidth: 500 }}>
              All three work. We'll take 30 minutes to look at your stack and tell you whether PHT fits — even if the honest answer is "not yet."
            </p>
          </div>
          <div style={{ background: bgAlt, border: `1px solid ${line}`, borderRadius: 14, padding: 28 }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, color: ink }}>Reach the team</div>
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
            }}>Schedule a discovery call <Icon name="arrow" size={16}/></button>
          </div>
        </div>
      </section>

      <FooterB accent={accent} dark="#0f1115" darkText="#f2f3f5" darkMuted="#9aa0a6" darkLine="rgba(255,255,255,0.10)"/>
    </div>
  );
};

Object.assign(window, { AboutPage });
