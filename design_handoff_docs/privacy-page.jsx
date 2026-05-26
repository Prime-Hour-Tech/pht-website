// privacy-page.jsx — Privacy Policy page
// Same layout pattern as terms-page (sticky TOC + sectioned body + plain-language
// summary callout). Realistic MSP-scoped boilerplate. Pairs with the B5 home.

const PrivacyPage = ({ accent = '#c81d2a' }) => {
  const bg = '#ffffff';
  const surface = '#F8F9FA';
  const ink = '#1A1A1A';
  const muted = '#5b6068';
  const line = 'rgba(26,26,26,0.10)';
  const lineSoft = 'rgba(26,26,26,0.06)';

  const sections = [
    { id: '1', heading: 'Who we are', body: (
      <>
        <p>Prime Hour Tech LLC ("PHT," "we," "us," or "our") is a Utah-based managed services provider. This Privacy Policy explains what personal information we collect, how we use it, and the choices you have. It applies to this website (the "Site") and to information we receive when you contact us, request a proposal, or engage us for services.</p>
        <p>Information processed under a signed Master Service Agreement (MSA) is also governed by the data-handling terms in that agreement. In the event of a conflict, the signed agreement controls.</p>
      </>
    )},
    { id: '2', heading: 'Information we collect', body: (
      <>
        <p>We collect personal information in three ways:</p>
        <p><strong>You give it to us.</strong> When you fill out a form, request a call, email us, or sign an agreement: your name, business name, email, phone, role, and anything you include in the message. If you become a client, we also receive billing contact and tax information.</p>
        <p><strong>We collect it automatically.</strong> When you visit the Site: IP address, device and browser characteristics, pages viewed, referring URL, and timestamps. We use first-party cookies and a small number of analytics cookies (see § 6).</p>
        <p><strong>From third parties.</strong> If you arrive from a referral partner, an advertising platform, or a public business directory, we may receive limited information about how you found us.</p>
      </>
    )},
    { id: '3', heading: 'How we use information', body: (
      <>
        <p>We use the information we collect to: (a) respond to your inquiry and schedule discovery calls, (b) deliver, support, and bill for services under an active agreement, (c) maintain the security of our and our clients' systems, (d) comply with legal obligations, and (e) improve the Site and our services.</p>
        <p>We do not sell personal information. We do not use your information to train third-party AI models. We do not run behavioural advertising on the Site.</p>
      </>
    )},
    { id: '4', heading: 'Legal bases (where applicable)', body: (
      <>
        <p>Where data-protection law requires a legal basis for processing (e.g., GDPR), we rely on: contract performance (to provide services you requested), legitimate interests (to operate and secure the Site, respond to inquiries, manage client relationships), consent (for non-essential cookies and marketing emails — withdrawable at any time), and legal obligation (to keep records, respond to lawful requests).</p>
      </>
    )},
    { id: '5', heading: 'Sharing & disclosures', body: (
      <>
        <p>We share information only with parties who help us run the business, under appropriate contractual terms. These include: cloud and hosting providers (Microsoft 365, Azure, our website host), payment processors and accounting software, remote-monitoring and ticketing platforms used to deliver managed services, and professional advisors (legal, accounting, insurance).</p>
        <p>We disclose information when required by law, to enforce our agreements, or to protect rights, safety, and property. In the event of a corporate transaction (merger, acquisition, asset sale), information may transfer to the successor entity, subject to this Policy.</p>
      </>
    )},
    { id: '6', heading: 'Cookies & analytics', body: (
      <>
        <p>The Site uses two categories of cookies. <strong>Essential</strong>: required for navigation, security, and remembering your cookie choices — these are always on. <strong>Analytics</strong>: a privacy-respecting analytics tool we use to understand which pages are most useful. You can decline analytics cookies via the banner that appears on your first visit, or change your choice anytime by clearing site data.</p>
        <p>We do not use cross-site advertising trackers.</p>
      </>
    )},
    { id: '7', heading: 'Data retention', body: (
      <>
        <p>We keep personal information only as long as we need it for the purposes described above, plus the retention windows required by law and our insurance carriers. As a baseline: inquiry contact records are retained for 24 months after the last interaction; client records and billing data for seven (7) years after the engagement ends; security and audit logs per the schedule in our Information Security Policy.</p>
      </>
    )},
    { id: '8', heading: 'Security', body: (
      <>
        <p>We protect personal information with administrative, technical, and physical safeguards aligned to the CIS Controls v8 framework: least-privilege access, MFA on all administrative accounts, encryption in transit and at rest, monitored endpoints, and documented incident-response procedures. No system is perfectly secure; we will notify affected individuals and clients of any incident as required by applicable law and our contracts.</p>
      </>
    )},
    { id: '9', heading: 'Your rights & choices', body: (
      <>
        <p>Subject to applicable law, you may have the right to: access the personal information we hold about you, request correction of inaccurate information, request deletion of information we no longer need, object to or restrict certain processing, and request a portable copy of information you provided.</p>
        <p>To exercise any of these rights, email <a href={`mailto:${PHT.email}`} style={{ color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}55` }}>{PHT.email}</a> with the subject line "Privacy request." We will respond within 30 days and may need to verify your identity before acting on the request.</p>
        <p>If you are a California resident, you may also direct an authorized agent to make a request on your behalf and may appeal a denied request by replying to our response.</p>
      </>
    )},
    { id: '10', heading: 'Marketing emails & SMS', body: (
      <>
        <p>If you ask us to keep in touch, we may send occasional emails about our services and resources. Every message includes an unsubscribe link. Transactional emails (proposals, invoices, ticket updates, security advisories) are part of providing services and continue regardless of marketing preferences.</p>
        <p>SMS messages are governed separately by our <a href="#" style={{ color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}55` }}>SMS Terms</a> and require opt-in. Reply STOP to opt out at any time.</p>
      </>
    )},
    { id: '11', heading: 'Children', body: (
      <>
        <p>The Site and our services are not directed to children under 16, and we do not knowingly collect personal information from children. If you believe a child has provided information to us, contact us and we will delete it.</p>
      </>
    )},
    { id: '12', heading: 'International users', body: (
      <>
        <p>We are based in the United States and process information in the U.S. If you access the Site from outside the U.S., you understand your information is transferred to and processed in the U.S. under U.S. law, which may differ from the laws of your country.</p>
      </>
    )},
    { id: '13', heading: 'Changes to this policy', body: (
      <>
        <p>We may update this Privacy Policy from time to time. Material changes will be posted on the Site with an updated "Last revised" date and, when appropriate, additional notice (e.g., a banner on the Site or email to active clients).</p>
      </>
    )},
    { id: '14', heading: 'Contact', body: (
      <>
        <p>Questions about this Policy or our data practices? Email <a href={`mailto:${PHT.email}`} style={{ color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}55` }}>{PHT.email}</a> or call <a href={PHT.phoneLink} style={{ color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}55` }}>{PHT.phoneDigits}</a>. Mail: Prime Hour Tech LLC, Salt Lake City, UT.</p>
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
            ◆ Legal · Privacy
          </div>
          <h1 style={{
            margin: 0, fontFamily: '"Newsreader", serif', fontSize: 72, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 500, color: ink,
          }}>
            Privacy Policy
          </h1>
          <p style={{ marginTop: 20, fontSize: 18, color: muted, maxWidth: 760, lineHeight: 1.55 }}>
            What we collect, how we use it, and the choices you have. Plain-language summary at the top, full policy below.
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
              <Icon name="shield" size={20} stroke={1.6}/>
            </span>
            <div>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
                The short version
              </div>
              <p style={{ margin: 0, fontFamily: '"Newsreader", serif', fontSize: 22, lineHeight: 1.4, color: ink, letterSpacing: '-0.01em' }}>
                We only collect what we need to talk to you, deliver services, and run the business. We don't sell your data, don't run behavioural ads, and don't train AI models on it. You can ask us what we hold, fix it, or delete it any time.
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
                  ['Terms & Conditions', '/terms'],
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
                <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>End of policy</div>
                <div style={{ fontSize: 14, color: muted }}>Privacy request? We respond within 30 days.</div>
              </div>
              <a href="/contact" style={{ color: accent, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Contact privacy team → 
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterB accent={accent} dark="#0f1115" darkText="#f2f3f5" darkMuted="#9aa0a6" darkLine="rgba(255,255,255,0.10)"/>
    </div>
  );
};

Object.assign(window, { PrivacyPage });
