// mobile-home-about.jsx — HomeMobile (B5), AboutMobile, IndustriesMobile.
// All 390px wide. Reuses MobileTop / MobileFooter / MTokens from mobile-chrome.jsx.

/* ═══════════════════════════════════════════════════════════════════════
   HomeMobile — B5 on mobile
   ═══════════════════════════════════════════════════════════════════════ */
const HomeMobile = ({ accent = '#dc2626' }) => {
  const t = MTokens;
  return (
    <MobilePageWrapper>
      <MobileTop accent={accent} active="Home"/>

      {/* Dark numbers-led hero */}
      <section style={{ background: t.dark, color: t.darkText, padding: '40px 20px 36px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, background: `radial-gradient(circle, ${accent}33, transparent 70%)`, pointerEvents: 'none' }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>
            <span style={{ width: 14, height: 1, background: accent }}/> Average savings · 25-seat
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 76, fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: t.darkText }}>$5,200</span>
            <span style={{ fontFamily: t.mono, fontSize: 11, color: t.darkMuted, letterSpacing: 0.5, textTransform: 'uppercase' }}>/mo saved</span>
          </div>
          <h1 style={{
            margin: '14px 0 0', fontSize: 24, fontWeight: 600, lineHeight: 1.18, letterSpacing: '-0.02em', color: t.darkText,
          }}>
            That's what most clients save by switching from break-fix to PHT — in their first year.
          </h1>
          <p style={{ marginTop: 12, color: t.darkMuted, fontSize: 14.5, lineHeight: 1.55 }}>
            We're a Utah managed-services partner that catches problems before they cost you. Flat-rate, line-itemed, no surprises.
          </p>
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <MobilePrimary accent={accent}>Model your savings</MobilePrimary>
            <MobileGhost dark>Schedule a discovery call →</MobileGhost>
          </div>

          {/* credentials card — full-bleed right is hard on mobile; just regular */}
          <div style={{
            marginTop: 28, background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.darkLine}`,
            borderRadius: 14, padding: 18,
          }}>
            <div style={{ fontFamily: t.mono, fontSize: 10.5, color: t.darkMuted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>
              ◆ The credentials
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                ['Microsoft Partner', 'M365 & Azure'],
                ['CompTIA Certified', 'Net+/Sec+ team'],
                ['Cisco CCNA', 'Network design'],
                ['CIS Controls v8', 'Aligned framework'],
                ['HIPAA-aware', 'Healthcare-ready'],
                ['Utah-based', '100% U.S.'],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: 10, border: `1px solid ${t.darkLine}`, borderRadius: 6 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: t.darkText, lineHeight: 1.2 }}>{k}</div>
                  <div style={{ fontFamily: t.mono, fontSize: 9.5, color: t.darkMuted, letterSpacing: 0.3, textTransform: 'uppercase', marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip — horizontal scroll */}
      <section style={{ background: t.bg, padding: '20px 20px', borderBottom: `1px solid ${t.line}` }}>
        <div style={{ fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Trusted by</div>
        <div style={{ display: 'flex', gap: 18, overflowX: 'auto', paddingBottom: 4 }}>
          {['LAW FIRM 01', 'CLINIC 02', 'CPA GROUP', 'REAL ESTATE', 'MANUFACTURING', 'NONPROFIT'].map((l) => (
            <span key={l} style={{ fontFamily: t.mono, fontSize: 11.5, color: t.muted, letterSpacing: 0.6, opacity: 0.65, whiteSpace: 'nowrap' }}>{l}</span>
          ))}
        </div>
      </section>

      {/* Team — 2-col grid */}
      <section style={{ padding: '40px 20px', borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ The team</MobileEyebrow>
        <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 32, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: t.ink, textWrap: 'balance' }}>
          The same engineers, <em style={{ fontStyle: 'italic', color: accent }}>every call.</em>
        </h2>
        <p style={{ marginTop: 12, color: t.muted, fontSize: 14.5, lineHeight: 1.55 }}>
          Four engineers in one Salt Lake City office. No outsourced tier-1. Your account is named to two of us, by name, on day one.
        </p>
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { name: 'Founder & Principal', role: 'Strategy · vCIO' },
            { name: 'Sr. IT Engineer',     role: 'Network · Security' },
            { name: 'Cloud Admin',          role: 'M365 · Azure' },
            { name: 'Helpdesk Lead',        role: 'Support · Docs' },
          ].map((m) => (
            <div key={m.name}>
              <Photo label={m.name.split(' ')[0].toUpperCase()} tone="light" radius={8} style={{ aspectRatio: '4/5', marginBottom: 10 }}/>
              <div style={{ fontFamily: t.serif, fontSize: 15, fontWeight: 500, color: t.ink, lineHeight: 1.15 }}>{m.name}</div>
              <div style={{ marginTop: 2, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Headaches — list */}
      <section style={{ padding: '40px 20px', background: t.bgAlt, borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ The problem</MobileEyebrow>
        <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 30, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: t.ink, textWrap: 'balance' }}>
          We stop the IT headaches keeping you up at night.
        </h2>
        <ul style={{ marginTop: 22, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            ['Tickets that disappear', 'One inbox. Every ticket tracked.'],
            ["Surprise 'after-hours' invoices", 'Flat-rate monthly. Everything in writing.'],
            ['Slow, vague responses', '<15 min median first-touch.'],
            ['No clear security posture', 'CIS v8 baseline on every client.'],
            ['Vendor finger-pointing', 'We own the resolution end-to-end.'],
          ].map(([p, f]) => (
            <li key={p} style={{ padding: '14px 0', borderBottom: `1px solid ${t.line}` }}>
              <div style={{ fontWeight: 600, color: t.ink, fontSize: 15, lineHeight: 1.3 }}>{p}</div>
              <div style={{ marginTop: 4, color: t.muted, fontSize: 13.5, lineHeight: 1.5 }}>{f}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Savings — single illustration */}
      <section style={{ padding: '40px 20px', borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ The math</MobileEyebrow>
        <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 30, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: t.ink, textWrap: 'balance' }}>
          Monthly IT cost <em style={{ fontStyle: 'italic', color: accent }}>before vs. with PHT.</em>
        </h2>
        <Photo label="BAR CHART · BEFORE / AFTER" tone="light" radius={10} style={{ aspectRatio: '4/3', marginTop: 20 }}/>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 12, border: `1px solid ${t.line}`, borderRadius: 8 }}>
            <div style={{ fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>Before</div>
            <div style={{ fontFamily: t.serif, fontSize: 28, fontWeight: 500, color: t.ink, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>$8,400</div>
            <div style={{ marginTop: 4, fontSize: 12, color: t.muted }}>break-fix · monthly avg</div>
          </div>
          <div style={{ padding: 12, border: `1px solid ${accent}55`, borderRadius: 8, background: `${accent}08` }}>
            <div style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 0.8, textTransform: 'uppercase' }}>With PHT</div>
            <div style={{ fontFamily: t.serif, fontSize: 28, fontWeight: 500, color: t.ink, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>$3,200</div>
            <div style={{ marginTop: 4, fontSize: 12, color: t.muted }}>flat managed · monthly</div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section style={{ padding: '40px 20px', borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ Services</MobileEyebrow>
        <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 32, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: t.ink, textWrap: 'balance' }}>
          The full lineup, <em style={{ fontStyle: 'italic', color: accent }}>plain-spoken.</em>
        </h2>
        <ul style={{ marginTop: 22, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0, borderTop: `1px solid ${t.line}` }}>
          {[
            { name: 'Managed IT',     short: 'Proactive monitoring, patching, helpdesk.', icon: 'monitor' },
            { name: 'Cybersecurity',  short: 'Endpoint, email, identity & MFA defense.',   icon: 'shield' },
            { name: 'Cloud Services', short: 'M365, Azure, migrations & tenant admin.',     icon: 'cloud' },
            { name: 'IT Projects',    short: 'Fixed-fee, scoped, weekly check-ins.',        icon: 'server' },
            { name: 'vCIO Advisory',  short: 'Strategy, budget, and quarterly QBRs.',       icon: 'compass' },
            { name: 'Web Services',   short: 'Hosting, DNS, email deliverability.',         icon: 'globe' },
          ].map((s) => (
            <li key={s.name}>
              <a href="#" style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 14,
                padding: '16px 0', borderBottom: `1px solid ${t.line}`, textDecoration: 'none', color: t.ink,
              }}>
                <span style={{ width: 42, height: 42, borderRadius: 10, background: t.bgAlt, border: `1px solid ${t.line}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
                  <Icon name={s.icon} size={18}/>
                </span>
                <span>
                  <span style={{ fontFamily: t.serif, fontSize: 18, fontWeight: 500, display: 'block', lineHeight: 1.15 }}>{s.name}</span>
                  <span style={{ display: 'block', color: t.muted, marginTop: 2, fontSize: 13, lineHeight: 1.45 }}>{s.short}</span>
                </span>
                <span style={{ color: accent, fontWeight: 600 }}><Icon name="arrowSm" size={14}/></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Beliefs — stacked */}
      <section style={{ padding: '40px 20px', background: t.bgAlt, borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ What we believe</MobileEyebrow>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            'We answer the phone. Always.',
            "We don't grow past the point where we can keep that promise.",
            "If we can't help, we say so — and we tell you who can.",
            "Pricing is on one page. Contracts are one PDF.",
          ].map((b, i) => (
            <li key={b} style={{ borderTop: i === 0 ? `1px solid ${t.line}` : 'none', borderBottom: `1px solid ${t.line}`, padding: '16px 0', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontFamily: t.mono, fontSize: 11, color: accent, letterSpacing: 0.6 }}>0{i + 1}</span>
              <span style={{ fontFamily: t.serif, fontSize: 19, fontWeight: 500, color: t.ink, lineHeight: 1.25, textWrap: 'balance' }}>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <MobileCTABlock
        accent={accent}
        title={<>Let's talk about <em style={{ fontStyle: 'italic', color: accent }}>what's slowing you down.</em></>}
        deck="30 minutes. We'll look at your stack and your support load, and tell you where Prime Hour Tech fits — even if the answer is 'not yet.'"
      />
      <MobileFooter accent={accent}/>
    </MobilePageWrapper>
  );
};


/* ═══════════════════════════════════════════════════════════════════════
   AboutMobile
   ═══════════════════════════════════════════════════════════════════════ */
const AboutMobile = ({ accent = '#dc2626' }) => {
  const t = MTokens;
  return (
    <MobilePageWrapper>
      <MobileTop accent={accent} active="About"/>

      <MobilePageHeader
        accent={accent}
        eyebrow="◆ About · Est. 2024 · Salt Lake City"
        size={42}
        title={<>A small IT team that <em style={{ fontStyle: 'italic', color: accent }}>treats your network like it's ours.</em></>}
        deck="We started Prime Hour Tech because we kept getting hired by businesses who'd been failed by an MSP that grew too fast. We wanted to build the opposite of that."
      />

      {/* Office photo with caption pull below */}
      <section style={{ padding: '0 20px 40px' }}>
        <Photo label="TEAM AT OFFICE · WIDE" tone="dark" radius={12} style={{ aspectRatio: '4/3' }}/>
        <div style={{
          marginTop: 12, background: t.dark, color: t.darkText, borderRadius: 12, padding: 18, border: `1px solid ${t.darkLine}`,
        }}>
          <div style={{ fontFamily: t.mono, fontSize: 10, color: t.darkMuted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            ◇ Office · Sugar House, SLC
          </div>
          <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 17, lineHeight: 1.4 }}>
            "If we can't pick up your call, something has already gone wrong."
          </div>
          <div style={{ marginTop: 8, fontFamily: t.mono, fontSize: 10, color: t.darkMuted, letterSpacing: 0.6, textTransform: 'uppercase' }}>
            — Founder, Prime Hour Tech
          </div>
        </div>
      </section>

      {/* Story — stacked */}
      <section style={{ padding: '24px 20px 40px', borderTop: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ The story</MobileEyebrow>
        <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 30, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: t.ink, textWrap: 'balance' }}>
          We've been on every side of <em style={{ fontStyle: 'italic', color: accent }}>this work.</em>
        </h2>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { e: 'Where we came from', h: 'Enterprise IT — over a decade.',                       b: '200–5,000 seat orgs. Long migrations, late-night failovers, regulator audits.' },
            { e: 'Why we started PHT', h: 'To keep SMBs from getting forgotten.',                  b: 'Too many small businesses were getting routed into queues by MSPs that grew too fast.' },
            { e: 'How we run today',   h: 'Flat-rate, line-itemed, no surprises.',                 b: 'Named primary + backup on every account. One PDF contract. One pricing page.' },
          ].map((c) => (
            <div key={c.e}>
              <div style={{ fontFamily: t.mono, fontSize: 10.5, color: t.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>{c.e}</div>
              <h3 style={{ margin: 0, fontFamily: t.serif, fontSize: 21, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.18, color: t.ink, textWrap: 'balance' }}>{c.h}</h3>
              <p style={{ marginTop: 8, color: t.muted, fontSize: 14.5, lineHeight: 1.6 }}>{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers — 2x2 grid */}
      <section style={{ padding: '32px 20px', background: t.bgAlt, borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { k: '2024',     v: 'Year founded' },
            { k: '4',        v: 'Engineers' },
            { k: '< 15 min', v: 'Median first-touch' },
            { k: '100%',     v: 'U.S.-based team' },
          ].map((s) => (
            <div key={s.v}>
              <div style={{ fontFamily: t.serif, fontSize: 36, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1, color: t.ink, fontVariantNumeric: 'tabular-nums' }}>
                {s.k}
              </div>
              <div style={{ marginTop: 6, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '40px 20px', borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ Milestones</MobileEyebrow>
        <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 28, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: t.ink, textWrap: 'balance' }}>
          The short version, in order.
        </h2>
        <ol style={{ marginTop: 22, padding: 0, listStyle: 'none', borderTop: `1px solid ${t.line}` }}>
          {[
            { d: 'Q1 2024', t: 'Prime Hour Tech founded', b: 'First two clients sign as design partners.' },
            { d: 'Q3 2024', t: 'First engineer hired',     b: '"Named primary + named backup" model formalized.' },
            { d: 'Q1 2025', t: 'Cybersecurity launches',   b: 'CIS Controls v8 baseline rolled out as standard.' },
            { d: 'Q3 2025', t: 'Cloud admin + Helpdesk',    b: 'The four-person team that runs PHT today.' },
            { d: 'Q2 2026', t: 'QBRs go formal',           b: 'Quarterly review with the founder for every client.' },
          ].map((m) => (
            <li key={m.d} style={{ padding: '18px 0', borderBottom: `1px solid ${t.line}` }}>
              <div style={{ fontFamily: t.mono, fontSize: 11, color: accent, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6 }}>{m.d}</div>
              <div style={{ fontFamily: t.serif, fontSize: 18, fontWeight: 500, color: t.ink, lineHeight: 1.2 }}>{m.t}</div>
              <p style={{ margin: '6px 0 0', color: t.muted, fontSize: 14, lineHeight: 1.55 }}>{m.b}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Beliefs */}
      <section style={{ padding: '40px 20px', background: t.bgAlt, borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ What we believe</MobileEyebrow>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            'We answer the phone. Always.',
            "We don't grow past the point where we can keep that promise.",
            "If we can't help, we say so.",
            "Pricing is on one page.",
          ].map((b, i) => (
            <li key={b} style={{ borderTop: `1px solid ${t.line}`, padding: '14px 0', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontFamily: t.mono, fontSize: 10.5, color: accent, letterSpacing: 0.5 }}>0{i + 1}</span>
              <span style={{ fontFamily: t.serif, fontSize: 17, fontWeight: 500, color: t.ink, lineHeight: 1.3 }}>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Team — 2x2 */}
      <section style={{ padding: '40px 20px', borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ The team</MobileEyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { name: 'Founder & Principal', role: 'Strategy · vCIO' },
            { name: 'Sr. IT Engineer',     role: 'Network · Sec' },
            { name: 'Cloud Admin',          role: 'M365 · Azure' },
            { name: 'Helpdesk Lead',        role: 'Support · Docs' },
          ].map((m) => (
            <div key={m.name}>
              <Photo label={m.name.split(' ')[0].toUpperCase()} tone="light" radius={8} style={{ aspectRatio: '4/5', marginBottom: 8 }}/>
              <div style={{ fontFamily: t.serif, fontSize: 15, fontWeight: 500, color: t.ink, lineHeight: 1.15 }}>{m.name}</div>
              <div style={{ marginTop: 2, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      <MobileCTABlock
        accent={accent}
        eyebrow="◆ Want to talk?"
        title={<>Coffee, a tour, <em style={{ fontStyle: 'italic', color: accent }}>or a discovery call.</em></>}
        deck="All three work. We'll take 30 minutes to look at your stack and tell you whether PHT fits — even if the answer is 'not yet.'"
      />
      <MobileFooter accent={accent}/>
    </MobilePageWrapper>
  );
};


/* ═══════════════════════════════════════════════════════════════════════
   IndustriesMobile
   ═══════════════════════════════════════════════════════════════════════ */
const IndustriesMobile = ({ accent = '#dc2626' }) => {
  const t = MTokens;
  const data = (typeof INDUSTRY_PAGE_DATA !== 'undefined') ? INDUSTRY_PAGE_DATA : [];

  return (
    <MobilePageWrapper>
      <MobileTop accent={accent} active="Industries"/>

      <MobilePageHeader
        accent={accent}
        eyebrow={`◆ Industries · ${data.length} verticals`}
        size={44}
        title={<>IT designed for <em style={{ fontStyle: 'italic', color: accent }}>your kind of business.</em></>}
        deck="The baseline is the same — flat-rate, named engineers. What changes is which controls we prioritize and which software we integrate with."
      />

      {/* Jump nav — horizontal scroll */}
      <section style={{ padding: '12px 0 16px', borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, background: t.bgAlt, position: 'sticky', top: 0, zIndex: 4 }}>
        <div style={{ padding: '0 20px', fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>
          Jump to:
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 4px' }}>
          {data.map((d) => (
            <a key={d.id} href={`#${d.id}`} style={{
              padding: '8px 12px', borderRadius: 999, textDecoration: 'none', fontSize: 12.5, fontWeight: 500,
              color: t.ink, border: `1px solid ${t.line}`, background: t.bg, whiteSpace: 'nowrap',
              display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
            }}>
              <Icon name={d.iconName} size={12}/> {d.name}
            </a>
          ))}
        </div>
      </section>

      {/* Industry sections */}
      {data.map((d, i) => (
        <section id={d.id} key={d.id} style={{
          padding: '40px 20px',
          background: i % 2 === 1 ? t.bgAlt : t.bg,
          borderBottom: `1px solid ${t.line}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
            <span style={{
              width: 42, height: 42, borderRadius: 10, background: `${accent}12`, color: accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${accent}33`, flexShrink: 0,
            }}>
              <Icon name={d.iconName} size={20}/>
            </span>
            <div>
              <div style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                ◆ Vertical · 0{i + 1} / 0{data.length}
              </div>
              <h2 style={{ margin: '4px 0 0', fontFamily: t.serif, fontSize: 28, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: t.ink }}>
                {d.name}
              </h2>
              <div style={{ marginTop: 4, fontFamily: t.mono, fontSize: 10.5, color: t.muted, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                {d.sub}
              </div>
            </div>
          </div>

          <p style={{ margin: 0, color: t.muted, fontSize: 14.5, lineHeight: 1.6 }}>{d.intro}</p>

          <ul style={{ marginTop: 18, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {d.bullets.map((b) => (
              <li key={b} style={{ display: 'flex', gap: 10, color: t.ink, fontSize: 14, lineHeight: 1.5, padding: '10px 0', borderBottom: `1px solid ${t.lineSoft}` }}>
                <span style={{ color: accent, marginTop: 3 }}><Icon name="check" size={14} stroke={2}/></span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 18, background: i % 2 === 1 ? t.bg : t.bgAlt, border: `1px solid ${t.line}`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>
              ◇ Who in this category
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {d.examples.map((e) => (
                <li key={e} style={{ padding: '6px 0', fontSize: 12.5, color: t.ink, fontFamily: t.mono, letterSpacing: 0.2 }}>
                  — {e}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <MobileCTABlock
        accent={accent}
        eyebrow="◆ Don't see yours?"
        title={<>We work with most SMBs <em style={{ fontStyle: 'italic', color: accent }}>regardless of vertical.</em></>}
        deck="Tell us what you do — we'll tell you whether we're a fit."
      />
      <MobileFooter accent={accent}/>
    </MobilePageWrapper>
  );
};

Object.assign(window, { HomeMobile, AboutMobile, IndustriesMobile });
