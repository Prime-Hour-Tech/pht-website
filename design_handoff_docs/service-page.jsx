// service-page.jsx — Reusable service-page template.
// One layout, one component, one source-of-truth content map keyed by slug.
// Render any service by passing slug={'managed-it'|'cybersecurity'|...}.
// Same chrome as About / Blog / Terms (utility row + nav + dark FooterB).

// ── Content map — every service the original site has ────────────────────
const SERVICE_CONTENT = {
  'managed-it': {
    name: 'Managed IT',
    iconName: 'monitor',
    eyebrow: '◆ Service · 01 of 06',
    headline: "IT that keeps your business *running smoothly.*",
    deck: "Proactive support, continuous monitoring, and clear communication — so your team can focus on what they do best, not on tickets.",
    heroStat: { k: '24/7', v: 'Monitoring on every endpoint' },
    sections: [
      {
        eyebrow: 'How it works',
        heading: 'We handle problems before they reach your team.',
        body: 'Your systems are watched 24/7 for performance issues, security risks, and outages. We identify and resolve problems early, keeping your organization online and productive — usually before anyone on your team noticed.',
        bullets: [
          'Health checks and alerting around the clock',
          'Automated maintenance and performance tuning',
          'Early detection of network or device issues',
          'Fewer disruptions and downtime events',
        ],
      },
    ],
    capabilities: [
      { name: 'Workstation Management', body: 'Setup, management, and optimization of every endpoint.' },
      { name: 'Server Maintenance',     body: 'Backups, performance monitoring, and updates.' },
      { name: 'Network Support',        body: 'Firewalls, switches, WiFi configuration.' },
      { name: 'Patch Management',       body: 'Regular updates for security and stability.' },
      { name: 'Remote Support',         body: 'Fast, friendly help when your team needs it.' },
      { name: 'On-site Support',        body: 'In-person help throughout Utah.' },
    ],
    statStrip: [
      { k: '< 15 min', v: 'Median first-touch' },
      { k: 'Real',     v: 'People, not phone trees' },
      { k: '99.9%',    v: 'Uptime SLA target' },
      { k: 'Flat',     v: 'Monthly rate, no surprises' },
    ],
    faqs: [
      ['Do you replace our internal IT person?',  "Usually we augment them. Internal IT focuses on business-specific systems; we run the helpdesk, monitoring, patching, and on-call so they're not stretched thin."],
      ['How fast do you actually respond?',       "Median first-touch is under 15 minutes during business hours and under 30 minutes after hours. We publish the numbers in every QBR."],
      ['Is there an after-hours surcharge?',      "No. The monthly rate covers managed-services work at any hour. Project work is quoted separately and always in writing first."],
      ['Where do your engineers live?',           "All in Salt Lake City, in our one office. No offshore tier-1, no outsourced overnight."],
    ],
  },

  'cybersecurity': {
    name: 'Cybersecurity',
    iconName: 'shield',
    eyebrow: '◆ Service · 02 of 06',
    headline: "Security that *fits a small business* — not a Fortune 500.",
    deck: "Layered defense built around the CIS Controls v8 baseline. Endpoint, email, identity, and incident response — sized for SMBs and run by humans, not a portal.",
    heroStat: { k: 'CIS v8', v: 'Aligned framework on every client' },
    sections: [
      {
        eyebrow: 'The approach',
        heading: 'Stop incidents before they become headlines.',
        body: "Most breaches at small businesses come through the front door: a misconfigured account, a missed patch, a credential nobody remembered to revoke. We close those doors with a baseline that's repeatable, measurable, and proportional to the threat.",
        bullets: [
          'MFA on every administrative account, including ours',
          'Endpoint detection-and-response across every workstation',
          'Email security with anti-phishing and DMARC enforcement',
          'Quarterly access reviews and credential rotation',
        ],
      },
    ],
    capabilities: [
      { name: 'Endpoint Protection',     body: 'EDR-grade detection on every workstation and server.' },
      { name: 'Email Security',           body: 'Anti-phishing, anti-spoofing, DMARC, and quarantine review.' },
      { name: 'Identity & Access',        body: 'MFA, conditional access, and least-privilege role design.' },
      { name: 'Phishing Simulation',      body: 'Quarterly campaigns with follow-up training that actually works.' },
      { name: 'Incident Response',        body: 'Documented playbook + retainer for after-hours containment.' },
      { name: 'Compliance Mapping',       body: 'CIS v8, HIPAA-aware, and SOC-2-friendly evidence packs.' },
    ],
    statStrip: [
      { k: '8/18',  v: 'CIS controls baseline · day-90' },
      { k: '100%',  v: 'MFA enforcement on managed clients' },
      { k: '< 4hr', v: 'Initial containment target' },
      { k: 'Q1+',   v: 'Quarterly access reviews' },
    ],
    faqs: [
      ["Do we need a SOC?",                          "Almost no SMB does. A baseline of EDR + MFA + email defense covers >95% of what a SOC would catch, at a fraction of the cost."],
      ["What about cyber insurance?",                "We provide an evidence pack mapped to the questions most insurers ask. Several clients have used it to lower premiums."],
      ["Are you HIPAA / SOC-2 / PCI experts?",       "We're HIPAA-aware and align to CIS v8. For formal audits we work alongside specialist auditors — we provide the evidence; they make the call."],
      ["What happens when something does break in?", "Incident-response retainer covers it. Documented playbook, defined escalation, after-hours coverage. No scrambling to find the contract."],
    ],
  },

  'cloud-services': {
    name: 'Cloud Services',
    iconName: 'cloud',
    eyebrow: '◆ Service · 03 of 06',
    headline: "Microsoft 365 & Azure, *run by people who use them daily.*",
    deck: "Tenant administration, migrations, license-audits, and Teams rollouts — for organizations that want the productivity without the complexity.",
    heroStat: { k: 'M365', v: 'Tenants managed end-to-end' },
    sections: [
      {
        eyebrow: 'How we work',
        heading: 'We treat your tenant like a real environment, not a checklist.',
        body: "Conditional access policies, retention rules, Teams governance, and a license posture you can actually defend. Our cloud admin owns each client's tenant and stays with it — no rotating consultants.",
        bullets: [
          'M365 tenant administration with a named owner',
          'Azure subscription management and cost reviews',
          'Exchange, SharePoint, and Teams governance',
          'Migration support from on-prem and other vendors',
        ],
      },
    ],
    capabilities: [
      { name: 'Microsoft 365',     body: 'Exchange, SharePoint, Teams, OneDrive — all under one tenant policy.' },
      { name: 'Azure',             body: 'Identity, networking, VMs, and cost monitoring.' },
      { name: 'Migrations',        body: 'From Google Workspace, on-prem Exchange, or a previous MSP.' },
      { name: 'License Audits',    body: 'Quarterly cleanup — most clients save 1.5–2× their license cost.' },
      { name: 'Backup & Retention',body: 'Third-party M365 backup and policy-driven retention.' },
      { name: 'Teams Rollouts',    body: 'Voice, meetings, and governance done in one engagement.' },
    ],
    statStrip: [
      { k: '$1.8k', v: 'Avg. monthly license savings · 30-seat' },
      { k: 'M365',  v: 'Tier-1 partner since 2024' },
      { k: '< 1d',  v: 'Avg. tenant cleanup turnaround' },
      { k: '4',     v: 'Cloud admins on staff' },
    ],
    faqs: [
      ['Do you do email migrations?',          "Yes — Google Workspace → M365, on-prem Exchange → M365, and tenant-to-tenant. Cutover is always on a weekend so Monday is a non-event."],
      ['Can you take over an existing tenant?', "That's most of what we do. We audit, document, fix the obvious gaps, then put the named-owner model in place."],
      ['How does license audit pricing work?',  "Included in managed services. For non-managed clients we run a one-off audit at a flat fee — most pay for it in the first month of savings."],
      ['Azure or AWS?',                         "We specialize in Azure and M365. For AWS-first shops we partner with a specialist firm rather than pretending to be one."],
    ],
  },

  'it-projects': {
    name: 'IT Projects',
    iconName: 'server',
    eyebrow: '◆ Service · 04 of 06',
    headline: "Scoped, priced, and *delivered when we said.*",
    deck: "Office moves, network rebuilds, server replacements, hardware refreshes — handled as a fixed-fee project so you know what you're getting before we start.",
    heroStat: { k: '1 SOW', v: 'One scope, one price, one team' },
    sections: [
      {
        eyebrow: 'How projects work',
        heading: 'Fixed fee, fixed scope, weekly check-ins.',
        body: "Every project starts with a discovery, ends with a runbook, and has a named engineer who owns it from kickoff to handoff. You see weekly status, the spec is in writing, and there's no scope-creep without an amendment.",
        bullets: [
          'Discovery and a written statement of work',
          'Named project engineer + weekly status report',
          'Change requests in writing — never verbal-only',
          'Runbook + as-built docs handed off at close',
        ],
      },
    ],
    capabilities: [
      { name: 'Office Moves',        body: 'Network, phones, printers, and conference rooms — turnkey.' },
      { name: 'Network Rebuilds',    body: 'Firewalls, switches, WiFi, and segmentation.' },
      { name: 'Server Replacements', body: 'On-prem refreshes or migration to cloud.' },
      { name: 'Hardware Refresh',    body: 'Staged endpoint rollouts with zero-touch deployment.' },
      { name: 'Backup Overhauls',    body: '3-2-1 with offsite, tested restores, and reporting.' },
      { name: 'Compliance Projects', body: 'CIS, HIPAA, or cyber-insurance gap-closure work.' },
    ],
    statStrip: [
      { k: 'Fixed', v: 'Fee, set on day one' },
      { k: '1wk',   v: 'Status cadence' },
      { k: '100%',  v: 'Projects with written runbook' },
      { k: '~3wk',  v: 'Median project length' },
    ],
    faqs: [
      ["What's the smallest project you'll take?", "We've done $4k server-replacement projects. There's no floor — the floor is whether it can be scoped in writing."],
      ['Can we phase it?',                          "Yes. We commonly phase larger projects (network → security → cloud) so cash flow stays predictable."],
      ['Who owns the runbook?',                     "You do. We provide a markdown copy and a PDF, both yours. If you leave us, the runbook leaves with you."],
      ['What if the project goes over scope?',      "Change request in writing, you decide. We don't keep working past the SOW without a signature."],
    ],
  },

  'vcio': {
    name: 'vCIO Advisory',
    iconName: 'compass',
    eyebrow: '◆ Service · 05 of 06',
    headline: "Strategy, budget, and *roadmap* — without hiring a CIO.",
    deck: "A virtual CIO for organizations too small to need a full-time one. Quarterly business reviews, a 90-day roadmap, and the IT budget conversation owners actually need.",
    heroStat: { k: 'QBR', v: 'Quarterly business review with the founder' },
    sections: [
      {
        eyebrow: 'What you get',
        heading: 'IT leadership for a fraction of a CIO salary.',
        body: "Most SMBs don't have an executive thinking about IT strategy past next quarter. Our vCIO engagement gives you that — without committing to a $200k hire. We meet quarterly, run a structured review, and own the roadmap with you.",
        bullets: [
          'Quarterly business reviews with documented outcomes',
          'Annual IT budget — built bottom-up, not vendor-driven',
          'Risk register kept up to date between QBRs',
          'Vendor management — we negotiate the renewals',
        ],
      },
    ],
    capabilities: [
      { name: 'Quarterly QBRs',       body: 'Structured review of tickets, security, licenses, and roadmap.' },
      { name: 'IT Budgeting',         body: 'Annual budget built around your business plan, not vendors.' },
      { name: 'Roadmap Planning',     body: 'Rolling 90-day plan, owned in writing, reviewed every QBR.' },
      { name: 'Risk Register',        body: 'Living document of risks, owners, and mitigation status.' },
      { name: 'Vendor Management',    body: 'We handle the renewals, escalations, and contract reviews.' },
      { name: 'M&A Tech Diligence',   body: 'Optional — IT diligence for SMB acquisitions.' },
    ],
    statStrip: [
      { k: '4',    v: 'QBRs per year' },
      { k: '90d',  v: 'Rolling roadmap horizon' },
      { k: '1 PDF',v: 'Annual budget deliverable' },
      { k: 'Live', v: 'Risk register' },
    ],
    faqs: [
      ['Is this a separate engagement or part of managed?', "It can be either. Managed-services clients get an annual review for free; quarterly QBRs are a small monthly add-on."],
      ['Who attends the QBR on your side?',                 "The founder, every time. The point of the QBR is to talk to a decision-maker, not an account manager."],
      ['Do we need a vCIO if we already have a CIO?',       "Almost never. vCIO is for organizations under ~150 seats. Above that you usually need the real thing."],
      ['Can you help with cyber-insurance applications?',   "Yes — vCIO clients get the security evidence pack with the application, and we sit in on the underwriter call if useful."],
    ],
  },

  'web-services': {
    name: 'Web Services',
    iconName: 'globe',
    eyebrow: '◆ Service · 06 of 06',
    headline: "A website that *does its job* — and stays up.",
    deck: "Small-business websites, hosting, DNS, email deliverability, and the slow boring work of keeping a domain healthy. Not a marketing-agency product.",
    heroStat: { k: '99.99%', v: 'Hosted-domain uptime, last 12 months' },
    sections: [
      {
        eyebrow: 'Scope',
        heading: 'The unglamorous part of "the website."',
        body: "We don't compete with marketing agencies. We do the parts they don't want to: hosting, DNS, SSL, email deliverability, security headers, accessibility baselines, and keeping the lights on when something breaks at 9pm.",
        bullets: [
          'Hosting on managed infrastructure with a named owner',
          'DNS, SSL, and domain health you don\'t have to think about',
          'Email deliverability — SPF, DKIM, DMARC done properly',
          'Quarterly accessibility and security pass on every site',
        ],
      },
    ],
    capabilities: [
      { name: 'Hosting',            body: 'Managed hosting on Cloudflare, Netlify, or Azure depending on stack.' },
      { name: 'DNS & Domains',      body: 'Consolidated registrar, audited records, version-controlled changes.' },
      { name: 'Email Deliverability',body:'SPF, DKIM, DMARC — set up, monitored, reported on.' },
      { name: 'SSL & Security',     body: 'Certificate management, CSP headers, security baseline.' },
      { name: 'Migrations',         body: 'WordPress → static, custom CMS → managed, registrar consolidation.' },
      { name: 'Small Builds',       body: 'Brochure / single-page sites for clients who just need a presence.' },
    ],
    statStrip: [
      { k: '99.99%', v: 'Hosted-domain uptime · 12mo' },
      { k: 'DMARC',  v: 'Enforced on every managed domain' },
      { k: '1d',     v: 'Median DNS-change turnaround' },
      { k: '0',      v: 'Lapsed certs in 24 months' },
    ],
    faqs: [
      ['Will you build us a marketing site?',     "We can build a simple brochure or single-page site. For bigger marketing builds we partner with an agency — and we host whatever they build."],
      ['Do you do SEO?',                          "Operationally yes (clean markup, fast hosting, accessible pages). Content/keyword strategy — no, partner with a specialist."],
      ['Can you take over an existing website?',  "Yes — we frequently take over hosting, DNS, and email for clients whose marketing agency disappeared."],
      ['What CMS do you support?',                "Whatever the existing site uses. We work in WordPress, Webflow, Astro, plain HTML, and a handful of others."],
    ],
  },
};

// ── The reusable page ────────────────────────────────────────────────────
const ServicePage = ({ accent = '#dc2626', slug = 'managed-it' }) => {
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

  const c = SERVICE_CONTENT[slug] || SERVICE_CONTENT['managed-it'];

  // Helper to render *italic-accent* markup in headlines (one pair only)
  const renderInline = (s) => {
    const m = s.match(/^([\s\S]*?)\*([\s\S]+?)\*([\s\S]*)$/);
    if (!m) return s;
    return <>{m[1]}<em style={{ fontStyle: 'italic', color: accent, fontWeight: 500 }}>{m[2]}</em>{m[3]}</>;
  };

  // Sibling services for "Other services" row
  const others = Object.entries(SERVICE_CONTENT).filter(([k]) => k !== slug).slice(0, 5);

  return (
    <div className="artboard-root" style={{
      background: bg, color: ink, fontFamily: '"Geist", system-ui, sans-serif',
      fontSize: 16, lineHeight: 1.65, WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Chrome — shared from site-chrome.jsx */}
      <UtilityRow accent={accent}/>
      <SiteNav active="Services" accent={accent}/>
      <Breadcrumb trail={[['Services', '#'], c.name]} accent={accent}/>

      {/* Hero — dark band, mirrors home B5 */}
      <section style={{ background: dark, color: darkText, padding: '72px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -160, right: -120, width: 480, height: 480, background: `radial-gradient(circle, ${accent}26, transparent 70%)`, pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end', position: 'relative' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{
                width: 48, height: 48, borderRadius: 12, background: `${accent}1c`, color: accent,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${accent}55`,
              }}>
                <Icon name={c.iconName} size={22}/>
              </span>
              <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase' }}>
                {c.eyebrow}
              </span>
            </div>
            <h1 style={{
              margin: 0, fontFamily: '"Newsreader", serif', fontSize: 88, lineHeight: 0.96, letterSpacing: '-0.035em',
              fontWeight: 500, color: darkText, textWrap: 'balance',
            }}>
              {renderInline(c.headline)}
            </h1>
            <p style={{ marginTop: 22, color: darkMuted, fontSize: 18, lineHeight: 1.55, maxWidth: 580 }}>
              {c.deck}
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: accent, color: '#fff', border: 'none',
                padding: '15px 24px', borderRadius: 8, fontWeight: 600, fontSize: 15.5, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: `0 14px 32px -12px ${accent}`,
              }}>Schedule a discovery call <Icon name="arrow" size={16}/></button>
              <a href="#" style={{
                padding: '15px 22px', borderRadius: 8, color: darkText, textDecoration: 'none', fontSize: 15.5, fontWeight: 500,
                border: `1px solid ${darkLine}`,
              }}>Read the spec sheet →</a>
            </div>
          </div>

          {/* hero stat card */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${darkLine}`, borderRadius: 14, padding: 28,
            alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: darkMuted, letterSpacing: 1.2, textTransform: 'uppercase' }}>
              ◆ At a glance
            </div>
            <div>
              <div style={{ fontFamily: '"Newsreader", serif', fontSize: 88, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, color: darkText }}>
                {c.heroStat.k}
              </div>
              <div style={{ marginTop: 10, color: darkMuted, fontSize: 15, lineHeight: 1.4 }}>{c.heroStat.v}</div>
            </div>
            <div style={{ paddingTop: 18, borderTop: `1px solid ${darkLine}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '"Geist Mono", monospace', fontSize: 11, color: darkMuted, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              <span><LiveDot color="#22c55e"/> Included in managed</span>
              <span>SLA · 15-min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Approach / how-it-works sections */}
      {c.sections.map((s, i) => (
        <section key={i} style={{ padding: '96px 40px', borderBottom: `1px solid ${line}` }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 64, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 88 }}>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
                ◆ {s.eyebrow}
              </div>
              <h2 style={{
                margin: 0, fontFamily: '"Newsreader", serif', fontSize: 48, fontWeight: 500, letterSpacing: '-0.025em',
                lineHeight: 1.05, color: ink, textWrap: 'balance',
              }}>
                {s.heading}
              </h2>
            </div>
            <div>
              <p style={{ margin: 0, color: muted, fontSize: 17.5, lineHeight: 1.6 }}>{s.body}</p>
              <ul style={{ marginTop: 28, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {s.bullets.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 14, color: ink, fontSize: 16, lineHeight: 1.55, padding: '14px 0', borderBottom: `1px solid ${lineSoft}` }}>
                    <span style={{ color: accent, marginTop: 4 }}><Icon name="check" size={16} stroke={2}/></span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Capabilities grid */}
      <section style={{ padding: '96px 40px', background: bgAlt, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>
                ◆ What's included
              </div>
              <h2 style={{ margin: 0, fontFamily: '"Newsreader", serif', fontSize: 44, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: ink, textWrap: 'balance' }}>
                {c.capabilities.length} capabilities. <em style={{ fontStyle: 'italic', color: accent }}>One SLA.</em>
              </h2>
            </div>
            <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>Download spec sheet →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {c.capabilities.map((cap) => (
              <div key={cap.name} style={{ background: bg, border: `1px solid ${line}`, borderRadius: 10, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ width: 36, height: 36, borderRadius: 8, background: `${accent}12`, color: accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={c.iconName} size={18}/>
                  </span>
                  <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, color: muted, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 8px', border: `1px solid ${line}`, borderRadius: 4 }}>
                    INCLUDED
                  </span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2, color: ink }}>{cap.name}</h3>
                <p style={{ margin: '6px 0 0', color: muted, fontSize: 14.5, lineHeight: 1.55 }}>{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section style={{ padding: '64px 40px', borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {c.statStrip.map((s) => (
            <div key={s.v}>
              <div style={{ fontFamily: '"Newsreader", serif', fontSize: 52, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1, color: ink, fontVariantNumeric: 'tabular-nums' }}>
                {s.k}
              </div>
              <div style={{ marginTop: 10, fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1, textTransform: 'uppercase' }}>
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '96px 40px', borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: 64, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 88 }}>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
              ◆ Questions we hear
            </div>
            <h2 style={{
              margin: 0, fontFamily: '"Newsreader", serif', fontSize: 44, fontWeight: 500, letterSpacing: '-0.025em',
              lineHeight: 1.05, color: ink, textWrap: 'balance',
            }}>
              The ones owners ask <em style={{ fontStyle: 'italic', color: accent }}>before signing.</em>
            </h2>
            <p style={{ marginTop: 16, color: muted, fontSize: 15.5, lineHeight: 1.6, maxWidth: 320 }}>
              If yours isn't here, ask on the discovery call — we'll give a real answer.
            </p>
          </div>
          <div style={{ borderTop: `1px solid ${line}` }}>
            {c.faqs.map(([q, a]) => (
              <div key={q} style={{ padding: '24px 0', borderBottom: `1px solid ${line}`, display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
                <div>
                  <h3 style={{ margin: 0, fontFamily: '"Newsreader", serif', fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.25, color: ink }}>
                    {q}
                  </h3>
                  <p style={{ margin: '8px 0 0', color: muted, fontSize: 15.5, lineHeight: 1.6 }}>{a}</p>
                </div>
                <span style={{ color: muted, paddingTop: 4 }}><Icon name="chevron" size={18}/></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other services row */}
      <section style={{ padding: '64px 40px', background: bgAlt, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontFamily: '"Newsreader", serif', fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', color: ink }}>
              Other services
            </h2>
            <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>View all →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {others.map(([k, o]) => (
              <a key={k} href="#" style={{
                background: bg, border: `1px solid ${line}`, borderRadius: 10, padding: 20, textDecoration: 'none', color: ink,
                display: 'flex', flexDirection: 'column', gap: 14,
              }}>
                <span style={{ width: 36, height: 36, borderRadius: 8, background: `${accent}12`, color: accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={o.iconName} size={18}/>
                </span>
                <div>
                  <div style={{ fontFamily: '"Newsreader", serif', fontSize: 19, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2, color: ink }}>{o.name}</div>
                  <div style={{ marginTop: 6, color: muted, fontSize: 13, lineHeight: 1.55 }}>{o.deck.split('.')[0]}.</div>
                </div>
                <span style={{ marginTop: 'auto', color: accent, fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Read <Icon name="arrowSm" size={12}/>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '96px 40px', background: bg }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
              ◆ Ready when you are
            </div>
            <h2 style={{
              margin: 0, fontFamily: '"Newsreader", serif', fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.03em',
              fontWeight: 500, color: ink, textWrap: 'balance',
            }}>
              See if {c.name.toLowerCase()} from PHT <em style={{ fontStyle: 'italic', color: accent }}>fits your business.</em>
            </h2>
            <p style={{ marginTop: 16, color: muted, fontSize: 17, lineHeight: 1.55, maxWidth: 500 }}>
              30 minutes with the founder. We'll look at your environment, your support load, and tell you honestly whether this service is the right fit — even if the answer is "not yet."
            </p>
          </div>
          <div style={{ background: bgAlt, border: `1px solid ${line}`, borderRadius: 14, padding: 28 }}>
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
            }}>Schedule a discovery call <Icon name="arrow" size={16}/></button>
          </div>
        </div>
      </section>

      <FooterB accent={accent} dark={dark} darkText={darkText} darkMuted={darkMuted} darkLine={darkLine}/>
    </div>
  );
};

Object.assign(window, { ServicePage, SERVICE_CONTENT });
