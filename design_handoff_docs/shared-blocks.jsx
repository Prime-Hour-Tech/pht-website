// shared-blocks.jsx — content blocks that map to the new feedback:
//   - Headaches (problem framing: "We stop IT headaches")
//   - SavingsChart (how PHT saves money — SVG bar comparison)
//   - TeamGrid (who we are — placeholder team photos)
//   - Beliefs (values, reframed as a manifesto)
//   - CookieBanner (compliance overlay)
//
// All blocks are theme-agnostic — they accept an `accent`, `palette` (ink/muted/line/bg/surface),
// and `font` config and render accordingly. They're shared between home-b and home-c.

const HEADACHES = [
  { pain: "Tickets that disappear into a vendor black hole",     fix: "One inbox. Every ticket tracked. Updates without asking." },
  { pain: "Surprise invoices for 'after-hours' work",            fix: "Flat-rate monthly billing. Everything in writing." },
  { pain: "Your 'IT person' is out and nobody knows the passwords", fix: "Documented environments. No tribal knowledge." },
  { pain: "Phishing email got someone — what now?",              fix: "Layered defense + incident response built in." },
  { pain: "Office move next month, nobody's planning the network", fix: "Project management with deadlines and accountability." },
  { pain: "You don't know if your backups actually work",         fix: "We verify them. Monthly. With evidence you can audit." },
];

const TEAM = [
  { name: 'Founder & Principal',   role: 'Strategy · vCIO · MSP Lead',     bio: '10+ years in enterprise IT and managed services. Holds CompTIA Network+/Security+ and Microsoft 365 certifications.' },
  { name: 'Senior IT Engineer',    role: 'Network & Cybersecurity',         bio: 'Specializes in firewall configuration, endpoint protection, and incident response. CCNA, CompTIA Security+.' },
  { name: 'Cloud Administrator',   role: 'M365 · Azure · Migrations',       bio: 'Manages day-to-day cloud operations, M365 tenants, and Teams deployments for our SMB clients.' },
  { name: 'Helpdesk Lead',         role: 'Support · Documentation',         bio: 'First voice when you call. Owns ticket triage, end-user training, and environment documentation.' },
];

// ── HeadachesSection ────────────────────────────────────────────────────
// "We stop IT headaches" — problem framing, scannable two-column.
const HeadachesSection = ({ accent, ink, muted, line, surface, bg, font, mono, serif, pad = 96 }) => (
  <section style={{ padding: `${pad}px 40px`, background: bg, borderBottom: `1px solid ${line}` }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 88 }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
            ◆ The problem
          </div>
          <h2 style={{ margin: 0, fontFamily: serif, fontSize: 56, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: ink, textWrap: 'balance' }}>
            We stop the IT headaches keeping you up at night.
          </h2>
          <p style={{ marginTop: 18, color: muted, fontSize: 17, lineHeight: 1.6, maxWidth: 380 }}>
            If any of these sound familiar, you're our kind of client. Our job is to make them disappear quietly — not impress you with how busy we look.
          </p>
        </div>
        <div style={{ borderTop: `1px solid ${line}` }}>
          {HEADACHES.map((h, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr', gap: 28, padding: '24px 0', borderBottom: `1px solid ${line}`, alignItems: 'start' }}>
              <span style={{ fontFamily: mono, fontSize: 12, color: muted, letterSpacing: 0.6, paddingTop: 6 }}>
                {String(i+1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ fontFamily: mono, fontSize: 10.5, color: muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>The pain</div>
                <div style={{ fontSize: 16, color: ink, lineHeight: 1.45, fontWeight: 500 }}>{h.pain}</div>
              </div>
              <div style={{ borderLeft: `1px solid ${line}`, paddingLeft: 24 }}>
                <div style={{ fontFamily: mono, fontSize: 10.5, color: accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>What we do</div>
                <div style={{ fontSize: 15.5, color: ink, lineHeight: 1.5 }}>{h.fix}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── SavingsChart ────────────────────────────────────────────────────────
// SVG bar chart comparing "before PHT" vs "with PHT" monthly IT costs.
// Placeholder numbers — designed so user can swap real client data in.
const SavingsChart = ({ accent, ink, muted, line, surface, font, mono }) => {
  const cats = [
    { label: 'Break-fix calls',       before: 2400, after:  300, kind: 'reactive' },
    { label: 'Lost productivity',     before: 3800, after:  900, kind: 'reactive' },
    { label: 'Security incidents',    before: 1500, after:  200, kind: 'reactive' },
    { label: 'Software licensing',    before: 1100, after:  850, kind: 'managed' },
    { label: 'Managed-service fee',   before:    0, after: 1600, kind: 'managed' },
  ];
  const max = Math.max(...cats.flatMap(c => [c.before, c.after]));
  const beforeTotal = cats.reduce((s, c) => s + c.before, 0);
  const afterTotal  = cats.reduce((s, c) => s + c.after, 0);
  const savings = beforeTotal - afterTotal;
  const savingsPct = Math.round((savings / beforeTotal) * 100);

  return (
    <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: 36 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 10.5, color: muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>
            Monthly IT spend · representative 25-seat client
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: ink, letterSpacing: '-0.015em' }}>Before vs. with Prime Hour Tech</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, color: muted, fontFamily: mono, textTransform: 'uppercase', letterSpacing: 0.6 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, background: muted, borderRadius: 2, opacity: 0.4 }}/> Before
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, background: accent, borderRadius: 2 }}/> With PHT
          </span>
        </div>
      </div>

      {/* Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cats.map((c, i) => {
          const beforeW = (c.before / max) * 100;
          const afterW = (c.after / max) * 100;
          return (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13.5, color: ink }}>
                <span style={{ fontWeight: 500 }}>{c.label}</span>
                <span style={{ color: muted, fontFamily: mono, fontSize: 12 }}>
                  ${c.before.toLocaleString()} → <span style={{ color: c.after < c.before ? '#15803d' : ink }}>${c.after.toLocaleString()}/mo</span>
                </span>
              </div>
              <div style={{ position: 'relative', height: 14, background: 'transparent' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: 6, width: `${beforeW}%`, background: muted, opacity: 0.35, borderRadius: 2 }}/>
                <div style={{ position: 'absolute', left: 0, top: 8, height: 6, width: `${afterW}%`, background: accent, borderRadius: 2 }}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals row */}
      <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${line}`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 10.5, color: muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>Before total</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: ink, letterSpacing: '-0.02em', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
            ${beforeTotal.toLocaleString()}<span style={{ fontSize: 14, color: muted, fontWeight: 400 }}>/mo</span>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: mono, fontSize: 10.5, color: muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>With PHT</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: ink, letterSpacing: '-0.02em', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
            ${afterTotal.toLocaleString()}<span style={{ fontSize: 14, color: muted, fontWeight: 400 }}>/mo</span>
          </div>
        </div>
        <div style={{ paddingLeft: 20, borderLeft: `1px solid ${line}` }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, color: accent, letterSpacing: 1.2, textTransform: 'uppercase' }}>You save</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: accent, letterSpacing: '-0.02em', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
            ${savings.toLocaleString()}<span style={{ fontSize: 14, color: accent, fontWeight: 500, opacity: 0.7 }}>/mo · {savingsPct}%</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 11.5, color: muted, fontFamily: mono, letterSpacing: 0.3 }}>
        * Representative figures from a 25-seat professional-services client. Your numbers will vary — we'll model them in your discovery call.
      </div>
    </div>
  );
};

// ── SavingsSection — wraps chart with eyebrow + heading
const SavingsSection = ({ accent, ink, muted, line, surface, bg, font, mono, serif, pad = 96 }) => (
  <section style={{ padding: `${pad}px 40px`, background: bg, borderBottom: `1px solid ${line}` }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
            ◆ The math
          </div>
          <h2 style={{ margin: 0, fontFamily: serif, fontSize: 52, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: ink, textWrap: 'balance' }}>
            Managed IT usually costs less than break-fix.
          </h2>
          <p style={{ marginTop: 18, color: muted, fontSize: 17, lineHeight: 1.6, maxWidth: 380 }}>
            Most clients save 30–45% in the first year — not because we're cheap, but because preventing problems is cheaper than fixing them.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Fewer break-fix emergencies',
              'Less lost productivity',
              'No surprise after-hours invoices',
              'Predictable monthly budgeting',
            ].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, color: ink }}>
                <span style={{ color: accent, display: 'inline-flex' }}><Icon name="check" size={14} stroke={2.4}/></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <SavingsChart accent={accent} ink={ink} muted={muted} line={line} surface={surface} font={font} mono={mono}/>
      </div>
    </div>
  </section>
);

// ── TeamGrid — placeholder team photos with name + role + bio
const TeamSection = ({ accent, ink, muted, line, surface, bg, font, mono, serif, pad = 96, cols = 4, photoTone = 'light' }) => (
  <section style={{ padding: `${pad}px 40px`, background: bg, borderBottom: `1px solid ${line}` }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
            ◆ Who you'll work with
          </div>
          <h2 style={{ margin: 0, fontFamily: serif, fontSize: 52, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: ink }}>
            The same people. Every ticket.
          </h2>
          <p style={{ marginTop: 14, color: muted, fontSize: 17, lineHeight: 1.55, maxWidth: 480 }}>
            No call centers. No rotating account managers. You get to know us, we get to know your stack, and that's how problems get solved fast.
          </p>
        </div>
        <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>Read about our story →</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24 }}>
        {TEAM.map((m, i) => (
          <div key={i}>
            <Photo label={`PHOTO ${i+1}`} tone={photoTone} radius={10} style={{ aspectRatio: '4/5', marginBottom: 16 }}/>
            <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em', color: ink, lineHeight: 1.15 }}>
              {m.name}
            </div>
            <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>
              {m.role}
            </div>
            <p style={{ margin: '10px 0 0', color: muted, fontSize: 14, lineHeight: 1.55 }}>{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── BeliefsSection — values reframed as a "what we believe" manifesto
const BeliefsSection = ({ accent, ink, muted, line, surface, bg, font, mono, serif, pad = 96, dark = false }) => {
  const beliefs = [
    'We answer the phone. Always.',
    'We tell you the truth, even when it costs us a sale.',
    'We document everything. Nothing lives in one person\'s head.',
    'We treat your network like it\'s ours.',
    'We bill flat. No mystery line items.',
    'We assume the internet is hostile. We build accordingly.',
  ];
  return (
    <section style={{ padding: `${pad}px 40px`, background: bg, borderBottom: dark ? `1px solid rgba(255,255,255,0.08)` : `1px solid ${line}` }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 88 }}>
            <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
              ◆ What we believe
            </div>
            <h2 style={{ margin: 0, fontFamily: serif, fontSize: 56, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: ink, textWrap: 'balance' }}>
              Six things we put in writing.
            </h2>
            <p style={{ marginTop: 16, color: muted, fontSize: 16.5, lineHeight: 1.6, maxWidth: 320 }}>
              Every one of these is in our MSA. Every breach is an automatic credit.
            </p>
          </div>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, counterReset: 'belief' }}>
            {beliefs.map((b, i) => (
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr', gap: 24,
                padding: '24px 0', borderTop: i === 0 ? 'none' : `1px solid ${line}`,
                alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: mono, fontSize: 13, color: accent, letterSpacing: 0.5, fontWeight: 600,
                }}>
                  P/{String(i+1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: serif, fontSize: 26, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2, color: ink,
                }}>
                  {b}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

// ── CookieBanner — bottom-anchored, accent CTA, manage prefs link
const CookieBanner = ({ accent = '#dc2626', ink = '#1a1a1a' }) => {
  const [closed, setClosed] = React.useState(false);
  if (closed) return null;
  return (
    <div style={{
      position: 'absolute', left: 24, right: 24, bottom: 24, zIndex: 50,
      background: '#ffffff', border: `1px solid rgba(26,26,26,0.10)`,
      borderRadius: 12, padding: '18px 22px',
      display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center',
      boxShadow: '0 20px 48px -16px rgba(0,0,0,0.2), 0 4px 12px -4px rgba(0,0,0,0.08)',
      fontFamily: '"Geist", system-ui, sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{
          width: 36, height: 36, borderRadius: 999, background: `${accent}15`, color: accent,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon name="file" size={18}/>
        </span>
        <div style={{ fontSize: 14, color: ink, lineHeight: 1.5 }}>
          <strong style={{ fontWeight: 600 }}>We use cookies</strong> to improve site performance and understand how visitors use our pages. None of it is sold.{' '}
          <a href="#" style={{ color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}55` }}>Read our policy</a>.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => setClosed(true)} style={{
          padding: '10px 16px', background: 'transparent', color: ink, border: '1px solid rgba(26,26,26,0.15)',
          borderRadius: 999, fontSize: 13.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Manage preferences
        </button>
        <button onClick={() => setClosed(true)} style={{
          padding: '10px 20px', background: ink, color: '#fff', border: 'none',
          borderRadius: 999, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Accept all
        </button>
      </div>
    </div>
  );
};

Object.assign(window, {
  HEADACHES, TEAM,
  HeadachesSection, SavingsChart, SavingsSection, TeamSection, BeliefsSection,
  CookieBanner,
});
