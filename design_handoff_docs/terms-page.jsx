// terms-page.jsx — Terms & Conditions page
// Light editorial layout: sticky TOC on the left, long-form readable body on the right.
// Sectioned content is realistic boilerplate scoped to a managed-services provider.
// Pairs with home-b style (matches contact-page).

const TermsPage = ({ accent = '#c81d2a' }) => {
  const bg = '#ffffff';
  const surface = '#F8F9FA';
  const ink = '#1A1A1A';
  const muted = '#5b6068';
  const line = 'rgba(26,26,26,0.10)';
  const lineSoft = 'rgba(26,26,26,0.06)';

  const sections = [
    { id: '1', heading: 'Acceptance of terms', body: (
      <>
        <p>By accessing the Prime Hour Tech website ("Site") or engaging Prime Hour Tech LLC ("PHT," "we," "us") for any services, you agree to be bound by these Terms & Conditions ("Terms") and our Privacy Policy. If you do not agree, do not use the Site or our services.</p>
        <p>These Terms supplement — and do not replace — any signed Master Service Agreement (MSA), Statement of Work (SOW), or Client SLA in effect between you and PHT. In the event of a conflict, the signed agreement controls.</p>
      </>
    )},
    { id: '2', heading: 'Services we provide', body: (
      <>
        <p>Prime Hour Tech offers managed IT services, cybersecurity, cloud and Microsoft 365 administration, IT projects, vCIO advisory, and web services to small and mid-size businesses, primarily in Utah and remotely across the United States.</p>
        <p>The specific scope, deliverables, response targets, and pricing for any engagement are defined in a separately executed SOW or MSA. Nothing on this Site constitutes a binding offer of service.</p>
      </>
    )},
    { id: '3', heading: 'Eligibility & accounts', body: (
      <>
        <p>You must be at least 18 years old and authorized to enter into contracts on behalf of your organization to engage PHT. You agree to provide accurate information and to keep account credentials confidential. You are responsible for activity that occurs under your accounts.</p>
      </>
    )},
    { id: '4', heading: 'Fees, billing & late payment', body: (
      <>
        <p>Fees are set out in the applicable SOW or MSA. Recurring managed-service fees are billed monthly in advance unless otherwise stated. Project work is billed per the milestones defined in the SOW. Time & materials work is invoiced at our then-current hourly rates.</p>
        <p>Invoices are due net 15 from the date of issue. Past-due balances accrue interest at 1.5% per month (or the maximum permitted by law, whichever is lower). PHT may suspend services for accounts more than 30 days past due.</p>
      </>
    )},
    { id: '5', heading: 'Client responsibilities', body: (
      <>
        <p>To deliver our services, we need timely access to your environment, accurate documentation, and a designated point of contact. You agree to: (a) provide reasonable access to systems and facilities, (b) implement security recommendations we mark as critical, (c) maintain valid licenses for third-party software we manage, and (d) respond to requests for information needed to resolve incidents.</p>
        <p>PHT is not liable for service interruptions or security incidents resulting from your failure to act on recommendations or maintain licensing.</p>
      </>
    )},
    { id: '6', heading: 'Confidentiality', body: (
      <>
        <p>Both parties may receive non-public information ("Confidential Information") in the course of an engagement. Each party will use the other's Confidential Information only to perform under the agreement, will protect it with the same care it uses for its own confidential data (at minimum reasonable care), and will not disclose it to third parties without prior written consent, except as required by law.</p>
      </>
    )},
    { id: '7', heading: 'Intellectual property', body: (
      <>
        <p>The Site, our methodologies, documentation templates, tooling, and any pre-existing materials remain the exclusive property of PHT. Materials created specifically for you under an SOW ("Work Product") are assigned to you upon full payment, subject to PHT's retained ownership of pre-existing IP and any third-party components.</p>
      </>
    )},
    { id: '8', heading: 'Warranties & disclaimers', body: (
      <>
        <p>PHT warrants that services will be performed in a professional and workmanlike manner consistent with industry standards. Except as expressly stated, the Site and all services are provided "as is" and "as available" without warranties of any kind, whether express, implied, or statutory, including without limitation warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
      </>
    )},
    { id: '9', heading: 'Limitation of liability', body: (
      <>
        <p>To the maximum extent permitted by law, PHT's total aggregate liability arising out of or related to these Terms or our services will not exceed the fees paid by you to PHT during the three (3) months preceding the event giving rise to the claim. In no event will PHT be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or business interruption, even if advised of the possibility.</p>
      </>
    )},
    { id: '10', heading: 'Indemnification', body: (
      <>
        <p>You will indemnify and hold PHT harmless from third-party claims arising out of (a) your use of the services in violation of these Terms or applicable law, (b) content or data you provide, or (c) your infringement of any third-party right.</p>
      </>
    )},
    { id: '11', heading: 'Termination', body: (
      <>
        <p>Either party may terminate an engagement for material breach if the breach is not cured within thirty (30) days of written notice. Either party may terminate for convenience subject to the notice period defined in the applicable agreement (typically 30 days). Upon termination, you will pay all fees accrued through the termination date and we will reasonably assist with transition for up to thirty (30) days at our standard hourly rates.</p>
      </>
    )},
    { id: '12', heading: 'Governing law & disputes', body: (
      <>
        <p>These Terms are governed by the laws of the State of Utah, without regard to its conflict-of-law principles. Any disputes will be resolved in the state or federal courts located in Salt Lake County, Utah, and the parties consent to personal jurisdiction there.</p>
      </>
    )},
    { id: '13', heading: 'Changes to these terms', body: (
      <>
        <p>We may update these Terms from time to time. Material changes will be posted on the Site with an updated "Last revised" date. Continued use of the Site or our services after the effective date constitutes acceptance.</p>
      </>
    )},
    { id: '14', heading: 'Contact', body: (
      <>
        <p>Questions about these Terms? Email <a href={`mailto:${PHT.email}`} style={{ color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}55` }}>{PHT.email}</a> or call <a href={PHT.phoneLink} style={{ color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}55` }}>{PHT.phoneDigits}</a>.</p>
      </>
    )},
  ];

  return (
    <div className="artboard-root" style={{
      background: bg, color: ink, fontFamily: '"Geist", system-ui, sans-serif',
      fontSize: 16, lineHeight: 1.65, WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale',
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
            <span style={{ color: ink }}><Logomark size={36} accent={accent} bg={surface}/></span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
              <span style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}>Prime Hour Tech</span>
              <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, color: muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>Reliability & Integrity</span>
            </span>
          </a>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 6, fontSize: 14.5 }}>
            {['Services', 'Industries', 'About', 'Blog', 'Contact'].map(label => (
              <li key={label}>
                <a href="#" style={{ padding: '10px 14px', color: ink, textDecoration: 'none', fontWeight: 500 }}>{label}</a>
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
      <section style={{ padding: '64px 40px 24px', borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>
            ◆ Legal · Terms
          </div>
          <h1 style={{
            margin: 0, fontFamily: '"Newsreader", serif', fontSize: 72, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 500, color: ink,
          }}>
            Terms & Conditions
          </h1>
          <p style={{ marginTop: 20, fontSize: 18, color: muted, maxWidth: 760, lineHeight: 1.55 }}>
            The legal agreement that governs your use of this Site and our services. Plain-language summary at the top, full terms below.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap', fontFamily: '"Geist Mono", monospace', fontSize: 11.5, color: muted, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            <span><strong style={{ color: ink, fontFamily: 'inherit' }}>Last revised:</strong> May 24, 2026</span>
            <span><strong style={{ color: ink, fontFamily: 'inherit' }}>Effective:</strong> June 1, 2026</span>
            <span><strong style={{ color: ink, fontFamily: 'inherit' }}>Version:</strong> 2.0</span>
          </div>
        </div>
      </section>

      {/* Plain-language summary callout */}
      <section style={{ padding: '40px 40px 16px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: 32, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'start' }}>
            <span style={{
              width: 40, height: 40, borderRadius: 10, background: `${accent}15`, color: accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="file" size={20} stroke={1.6}/>
            </span>
            <div>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
                The short version
              </div>
              <p style={{ margin: 0, fontFamily: '"Newsreader", serif', fontSize: 22, lineHeight: 1.4, color: ink, letterSpacing: '-0.01em' }}>
                We provide IT services per your signed MSA / SOW. You give us access and pay invoices net-15. We protect your data, document what we do, and you can leave with 30 days' notice. Disputes are settled in Utah.
              </p>
              <p style={{ marginTop: 12, fontSize: 14, color: muted }}>
                The detail below controls. The summary is a courtesy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body: TOC + sections */}
      <section style={{ padding: '40px 40px 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 64, alignItems: 'start' }}>

          {/* Sticky TOC */}
          <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
              ◇ Contents
            </div>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#s${s.id}`} style={{
                    display: 'flex', alignItems: 'baseline', gap: 10,
                    color: i === 0 ? ink : muted, textDecoration: 'none', fontSize: 13.5,
                    padding: '4px 8px', borderRadius: 4, borderLeft: i === 0 ? `2px solid ${accent}` : '2px solid transparent',
                    fontWeight: i === 0 ? 500 : 400,
                  }}>
                    <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: muted, minWidth: 20 }}>{s.id.padStart(2, '0')}</span>
                    <span>{s.heading}</span>
                  </a>
                </li>
              ))}
            </ol>

            <div style={{ marginTop: 32, padding: 16, border: `1px solid ${line}`, borderRadius: 10, background: surface, fontSize: 13, color: muted }}>
              <div style={{ fontWeight: 600, color: ink, marginBottom: 6, fontSize: 13 }}>Other legal documents</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['Privacy Policy', '/privacy'],
                  ['SMS Terms', '/smsterms'],
                  ['Client SLA', '/clientsla'],
                  ['MSA Exhibit A', '#'],
                  ['MSA Exhibit B', '#'],
                ].map(([t, h]) => (
                  <li key={t}>
                    <a href={h} style={{ color: accent, textDecoration: 'none', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="file" size={12}/> {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <div style={{ maxWidth: 720, fontSize: 16, color: ink }}>
            {sections.map((s, i) => (
              <div key={s.id} id={`s${s.id}`} style={{ paddingBottom: 40, marginBottom: 40, borderBottom: i < sections.length - 1 ? `1px solid ${lineSoft}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12 }}>
                  <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 12, color: accent, letterSpacing: 0.6, minWidth: 36 }}>
                    § {s.id.padStart(2, '0')}
                  </span>
                  <h2 style={{ margin: 0, fontFamily: '"Newsreader", serif', fontSize: 30, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
                    {s.heading}
                  </h2>
                </div>
                <div style={{ marginLeft: 50, fontSize: 16, lineHeight: 1.7, color: '#33363c' }}>
                  {React.Children.map(s.body.props.children, (child) => child)}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, padding: 24, border: `1px solid ${line}`, borderRadius: 12, background: surface, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>End of terms</div>
                <div style={{ fontSize: 14, color: muted }}>Questions? We respond within one business day.</div>
              </div>
              <a href="/contact" style={{ color: accent, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Contact legal → 
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterB accent={accent} dark="#0f1115" darkText="#f2f3f5" darkMuted="#9aa0a6" darkLine="rgba(255,255,255,0.10)"/>
    </div>
  );
};

Object.assign(window, { TermsPage });
