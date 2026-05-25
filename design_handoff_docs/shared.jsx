// shared.jsx — Prime Hour Tech redesign shared atoms
// site config, icons, photo placeholders shared across all artboards

const PHT = {
  name: 'Prime Hour Tech',
  tagline: 'Reliability & Integrity',
  phone: '385-77-PRIME',
  phoneLink: 'tel:385-777-7463',
  phoneDigits: '(385) 777-7463',
  email: 'support@primehourtech.com',
  area: 'Utah + Remote U.S. Support',
  hoursWeekday: 'Mon–Fri 8:00 AM – 6:00 PM MST',
  hoursEmergency: '24/7 for managed clients',
  est: 'Est. 2024',
};

const SERVICES = [
  { slug: 'managed-it',     name: 'Managed IT',           short: 'Proactive monitoring, patching, helpdesk.',          long: 'Workstations, servers, network — monitored, patched, and supported 24/7.' },
  { slug: 'cybersecurity',  name: 'Cybersecurity',        short: 'Endpoint, email, identity & MFA defense.',           long: 'Layered protection: endpoint detection, email defense, MFA, identity & access controls.' },
  { slug: 'cloud-services', name: 'Cloud & Microsoft 365',short: 'Migrations, M365, Azure, AWS, Teams.',               long: 'Migrations, configuration, and ongoing management for Microsoft 365, Azure, AWS, and Teams.' },
  { slug: 'it-projects',    name: 'IT Projects',          short: 'Network upgrades, refreshes, office moves.',         long: 'Network upgrades, hardware refreshes, server deployments, office moves, infrastructure work.' },
  { slug: 'vcio',           name: 'vCIO / Strategy',      short: 'Roadmaps, budgets, vendor management.',              long: 'Strategic IT leadership: roadmaps, budgets, compliance, vendor management.' },
  { slug: 'web-services',   name: 'Web & Online',         short: 'Websites, apps, SEO.',                                long: 'Professional websites, web applications, and SEO to help your business get found online.' },
];

const VALUES = [
  { title: 'Reliability above everything', body: 'We pick up the phone, respond quickly, and follow through every time.' },
  { title: 'Integrity you can feel',       body: 'Clear communication, transparent processes, no surprise invoices.' },
  { title: 'Security-first by default',    body: 'We build and manage your systems assuming the internet is hostile.' },
  { title: 'Documented environments',      body: 'We document everything so your IT is never dependent on tribal knowledge.' },
  { title: 'Long-term partnership',        body: 'We learn your business, build your roadmap, support your team like staff.' },
  { title: 'Proactive vs reactive',        body: 'We monitor 24/7 and resolve issues before your team knows anything is wrong.' },
];

const INDUSTRIES = [
  { name: 'Professional Services',    sub: 'Law · Accounting · Real Estate',   body: 'Firms that require uptime, confidentiality, and strong communication.' },
  { name: 'Small & Mid-Size Business', sub: 'Growing teams · 10–250 seats',     body: 'Predictable IT, strategic planning, and fast helpdesk support.' },
  { name: 'Regulated Industries',     sub: 'Healthcare · Finance · GovCon',    body: 'Compliance-aligned IT and security controls for regulated workloads.' },
];

// Stable inline-SVG icon set, stroke-current so it inherits accent color
const Icon = ({ name, size = 20, stroke = 1.6, className = '', style }) => {
  const s = size;
  const common = {
    width: s, height: s, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
    className, style,
  };
  const paths = {
    monitor:  <><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></>,
    shield:   <><path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"/></>,
    cloud:    <><path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.5A4 4 0 0118 18H7z"/></>,
    server:   <><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M7 7h.01M7 17h.01"/></>,
    compass:  <><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6 6-2z"/></>,
    globe:    <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></>,
    clock:    <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    bolt:     <><path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"/></>,
    check:    <><path d="M5 12l4 4 10-10"/></>,
    arrow:    <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    arrowSm:  <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    phone:    <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></>,
    mail:     <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
    pin:      <><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></>,
    users:    <><circle cx="9" cy="9" r="3.5"/><path d="M2 21a7 7 0 0114 0M16 11a3 3 0 100-6M22 21a6 6 0 00-4-5.7"/></>,
    file:     <><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z"/><path d="M14 3v5h5"/></>,
    chat:     <><path d="M21 12a8 8 0 11-3.6-6.7L21 4l-1.3 4A8 8 0 0121 12z"/></>,
    spark:    <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></>,
    lock:     <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></>,
    menu:     <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    close:    <><path d="M6 6l12 12M18 6L6 18"/></>,
    chevron:  <><path d="M6 9l6 6 6-6"/></>,
    dot:      <><circle cx="12" cy="12" r="3" fill="currentColor"/></>,
    play:     <><path d="M6 4l14 8-14 8z"/></>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
};

// Photo placeholder — striped SVG with monospace label.
// Use as a stand-in until the user supplies real photography.
const Photo = ({ label = 'PHOTO', tone = 'dark', radius = 0, className = '', style = {}, ratio }) => {
  const dark = tone === 'dark';
  const bg = dark ? '#1a1a1a' : '#e8e4dc';
  const stripe = dark ? 'rgba(255,255,255,.045)' : 'rgba(0,0,0,.06)';
  const fg = dark ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.5)';
  const border = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';
  const wrap = {
    position: 'relative',
    background: bg,
    backgroundImage: `repeating-linear-gradient(135deg, ${stripe} 0 1px, transparent 1px 14px)`,
    borderRadius: radius,
    border: `1px solid ${border}`,
    color: fg,
    overflow: 'hidden',
    ...style,
  };
  if (ratio) wrap.aspectRatio = ratio;
  return (
    <div className={className} style={wrap}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Geist Mono", ui-monospace, monospace', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
      }}>
        ◇ {label}
      </div>
    </div>
  );
};

// Logo mark — geometric "PH" monogram (clock-tick concept tied to "prime hour")
// Color via currentColor. Use accent on a token wrap for hero, neutral elsewhere.
const Logomark = ({ size = 32, accent = '#e11d2e', bg = 'transparent' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: 'block' }}>
    <rect x="0.5" y="0.5" width="39" height="39" rx="6" fill={bg} stroke="currentColor" strokeOpacity=".18"/>
    {/* Clock-tick ring */}
    <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1"/>
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i * 30 - 90) * Math.PI / 180;
      const r1 = 13, r2 = i % 3 === 0 ? 10.5 : 12;
      return (
        <line key={i}
          x1={20 + Math.cos(a)*r1} y1={20 + Math.sin(a)*r1}
          x2={20 + Math.cos(a)*r2} y2={20 + Math.sin(a)*r2}
          stroke="currentColor" strokeOpacity=".35" strokeWidth="1"/>
      );
    })}
    {/* "12-tick" accent — the "prime hour" */}
    <line x1="20" y1="7" x2="20" y2="11" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
    {/* Inner "PH" mark */}
    <text x="20" y="25" textAnchor="middle"
      fontFamily="'Geist Mono', ui-monospace, monospace"
      fontSize="11" fontWeight="700"
      fill="currentColor" letterSpacing="0">
      PH
    </text>
  </svg>
);

// Tagged chip — small uppercase pill / kbd-style tag
const Tag = ({ children, mono = true, color, bg, style = {} }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '3px 8px', borderRadius: 999,
    fontFamily: mono ? '"Geist Mono", ui-monospace, monospace' : 'inherit',
    fontSize: 10.5, fontWeight: 500, letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: color || 'currentColor',
    background: bg || 'rgba(255,255,255,0.06)',
    border: '1px solid currentColor',
    borderColor: 'rgba(255,255,255,0.12)',
    ...style,
  }}>{children}</span>
);

// "Live" status dot
const LiveDot = ({ color = '#22c55e', size = 6 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
    <span style={{
      display: 'inline-block', width: size, height: size, borderRadius: '50%',
      background: color, boxShadow: `0 0 0 0 ${color}80`,
      animation: 'phtPulse 1.8s ease-out infinite',
    }} />
    <style>{`@keyframes phtPulse{
      0%{box-shadow:0 0 0 0 ${color}80}
      70%{box-shadow:0 0 0 8px ${color}00}
      100%{box-shadow:0 0 0 0 ${color}00}
    }`}</style>
  </span>
);

Object.assign(window, { PHT, SERVICES, VALUES, INDUSTRIES, Icon, Photo, Logomark, Tag, LiveDot });
