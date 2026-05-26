// blog-page.jsx — Blog root (BlogIndexPage) + template Blog post (BlogPostPage)
// Same chrome as Terms/Privacy/Contact (utility row + nav + dark FooterB).
// Cool whites, dark accents, red CTAs, Newsreader serif for headlines.

// ── Sample posts (used by both components) ──────────────────────────────
const BLOG_POSTS = [
  {
    slug: 'why-your-msp-keeps-missing-tickets',
    cat: 'Cybersecurity',
    title: 'Why your MSP keeps missing tickets — and the metric that fixes it',
    excerpt: 'It usually isn\'t laziness or staffing. It\'s a routing problem nobody is measuring. Here\'s the single number we audit on every new client takeover.',
    author: 'Founder, Prime Hour Tech',
    date: 'May 18, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'm365-license-audit-saved-1800',
    cat: 'Microsoft 365',
    title: 'A 20-minute M365 license audit saved a 30-person law firm $1,800 a month',
    excerpt: 'Most firms over-license by 1.5–2× because nobody owns the seat-by-seat cleanup. Here\'s the spreadsheet we used and the four questions we ask.',
    author: 'Senior IT Engineer',
    date: 'May 09, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'phishing-simulation-roi',
    cat: 'Cybersecurity',
    title: 'Phishing simulations are theater unless you do this one thing after',
    excerpt: 'Click-rate numbers look impressive on a report. They don\'t change behavior without a follow-up step almost every program skips. We have the data.',
    author: 'Cybersecurity Lead',
    date: 'Apr 27, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'cloud-migration-checklist',
    cat: 'Cloud',
    title: 'The 12-question pre-flight checklist before any cloud migration',
    excerpt: 'We learned the hard way that "lift and shift" is rarely just lift and shift. Twelve questions to ask before you touch a single workload.',
    author: 'Cloud Architect',
    date: 'Apr 18, 2026',
    readTime: '9 min read',
  },
  {
    slug: 'choosing-an-msp-without-getting-burned',
    cat: 'Buyer\'s guide',
    title: 'Choosing an MSP without getting burned: a buyer\'s checklist',
    excerpt: 'A non-technical hiring guide for owners and ops leads. Ten questions that separate a real partner from a glorified break-fix shop with a logo.',
    author: 'Founder, Prime Hour Tech',
    date: 'Apr 04, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'small-business-cis-controls',
    cat: 'Cybersecurity',
    title: 'CIS Controls v8 for the 25-person business: where to actually start',
    excerpt: 'The full framework is overwhelming if you\'re not enterprise. Here are the eight controls that move the needle for an SMB in the first 60 days.',
    author: 'Cybersecurity Lead',
    date: 'Mar 24, 2026',
    readTime: '10 min read',
  },
];

const BLOG_CATEGORIES = ['All', 'Cybersecurity', 'Microsoft 365', 'Cloud', 'Buyer\'s guide', 'Field notes', 'Company news'];

// ── Shared chrome (utility row + nav + page-header eyebrow) ────────────
const BlogChrome = ({ ink, muted, line, surface, accent, bg }) => (
  <>
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
              <a href="#" style={{
                padding: '10px 14px', color: ink, textDecoration: 'none',
                fontWeight: label === 'Blog' ? 600 : 500,
                borderBottom: label === 'Blog' ? `2px solid ${accent}` : '2px solid transparent',
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
  </>
);


/* ═══════════════════════════════════════════════════════════════════════════
   BlogIndexPage — root listing
   ═══════════════════════════════════════════════════════════════════════════ */
const BlogIndexPage = ({ accent = '#dc2626' }) => {
  const bg = '#ffffff';
  const bgAlt = '#F8F9FA';
  const surface = '#ffffff';
  const ink = '#1A1A1A';
  const muted = '#5b6068';
  const line = 'rgba(26,26,26,0.10)';
  const lineSoft = 'rgba(26,26,26,0.06)';

  const [lead, ...rest] = BLOG_POSTS;

  return (
    <div className="artboard-root" style={{
      background: bg, color: ink, fontFamily: '"Geist", system-ui, sans-serif',
      fontSize: 16, lineHeight: 1.65, WebkitFontSmoothing: 'antialiased',
    }}>
      <BlogChrome {...{ ink, muted, line, surface, accent, bg }}/>

      {/* page header */}
      <section style={{ padding: '64px 40px 32px', borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>
              ◆ Blog · {BLOG_POSTS.length} posts
            </div>
            <h1 style={{
              margin: 0, fontFamily: '"Newsreader", serif', fontSize: 96, lineHeight: 0.95, letterSpacing: '-0.035em',
              fontWeight: 500, color: ink, textWrap: 'balance',
            }}>
              Field notes from <em style={{ fontStyle: 'italic', color: accent, fontWeight: 500 }}>the helpdesk.</em>
            </h1>
          </div>
          <p style={{ margin: 0, color: muted, fontSize: 17, lineHeight: 1.55, maxWidth: 420 }}>
            Practical write-ups on managed IT, cybersecurity, Microsoft 365, and the costly mistakes we see SMBs make over and over. No vendor fluff. No SEO bait. Just what worked.
          </p>
        </div>
      </section>

      {/* Filter / category strip */}
      <section style={{ padding: '24px 40px', borderBottom: `1px solid ${line}`, background: bg, position: 'sticky', top: 0, zIndex: 4 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {BLOG_CATEGORIES.map((c, i) => (
              <a key={c} href="#" style={{
                padding: '8px 14px', borderRadius: 999, textDecoration: 'none', fontSize: 13.5, fontWeight: 500,
                color: i === 0 ? '#fff' : ink, background: i === 0 ? ink : 'transparent',
                border: i === 0 ? `1px solid ${ink}` : `1px solid ${line}`,
              }}>{c}</a>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', borderRadius: 999, border: `1px solid ${line}`, background: bgAlt,
              color: muted, fontSize: 13.5, minWidth: 220,
            }}>
              <Icon name="spark" size={14}/>
              <span style={{ flex: 1 }}>Search the blog…</span>
              <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, padding: '2px 6px', borderRadius: 4, border: `1px solid ${line}`, color: muted }}>⌘K</span>
            </div>
            <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 1, textTransform: 'uppercase' }}>Sort: Newest</span>
          </div>
        </div>
      </section>

      {/* Featured lead */}
      <section style={{ padding: '56px 40px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <a href="#" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center', textDecoration: 'none', color: ink }}>
            <Photo label={`COVER · ${lead.cat.toUpperCase()}`} tone="dark" radius={14} style={{ aspectRatio: '4/3' }}/>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{
                  fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent,
                  letterSpacing: 1.2, textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 999, border: `1px solid ${accent}55`, background: `${accent}10`,
                }}>Featured · {lead.cat}</span>
                <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 0.5 }}>{lead.date} · {lead.readTime}</span>
              </div>
              <h2 style={{
                margin: 0, fontFamily: '"Newsreader", serif', fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 500, textWrap: 'balance',
              }}>{lead.title}</h2>
              <p style={{ marginTop: 18, color: muted, fontSize: 17, lineHeight: 1.55, maxWidth: 540 }}>{lead.excerpt}</p>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{
                  width: 40, height: 40, borderRadius: '50%', background: bgAlt, border: `1px solid ${line}`,
                  backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 8px)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Geist Mono", monospace', fontSize: 9, color: muted,
                }}>AU</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: ink, lineHeight: 1.2 }}>{lead.author}</div>
                  <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: muted, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2 }}>Author</div>
                </div>
                <span style={{ marginLeft: 'auto', color: accent, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Read story <Icon name="arrow" size={14}/>
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Recent posts grid */}
      <section style={{ padding: '40px 40px 24px', borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
            <h2 style={{ margin: 0, fontFamily: '"Newsreader", serif', fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em', color: ink }}>
              Recent posts
            </h2>
            <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>View all →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {rest.map((p) => (
              <a key={p.slug} href="#" style={{ textDecoration: 'none', color: ink, display: 'flex', flexDirection: 'column' }}>
                <Photo label={`COVER · ${p.cat.toUpperCase()}`} tone="dark" radius={10} style={{ aspectRatio: '4/3', marginBottom: 18 }}/>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: accent, letterSpacing: 1, textTransform: 'uppercase' }}>{p.cat}</span>
                  <span style={{ width: 3, height: 3, borderRadius: 2, background: muted }}/>
                  <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: muted, letterSpacing: 0.5 }}>{p.readTime}</span>
                </div>
                <h3 style={{
                  margin: 0, fontFamily: '"Newsreader", serif', fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em',
                  lineHeight: 1.15, color: ink, textWrap: 'balance',
                }}>{p.title}</h3>
                <p style={{ margin: '10px 0 16px', color: muted, fontSize: 14.5, lineHeight: 1.55 }}>{p.excerpt}</p>
                <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `1px solid ${lineSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: muted }}>{p.author}</span>
                  <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 0.5 }}>{p.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section style={{ padding: '32px 40px 48px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {[
            { l: '←', dim: true },
            { l: '1', active: true },
            { l: '2' }, { l: '3' }, { l: '…', dim: true }, { l: '8' },
            { l: '→' },
          ].map((b, i) => (
            <a key={i} href="#" style={{
              minWidth: 36, height: 36, padding: '0 10px', borderRadius: 8,
              border: `1px solid ${b.active ? ink : line}`, background: b.active ? ink : 'transparent',
              color: b.active ? '#fff' : (b.dim ? muted : ink),
              textDecoration: 'none', fontSize: 14, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>{b.l}</a>
          ))}
        </div>
      </section>

      {/* Newsletter signup */}
      <section style={{ padding: '64px 40px 96px', background: bgAlt, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>
            ◆ Newsletter · Once a month
          </div>
          <h2 style={{
            margin: 0, fontFamily: '"Newsreader", serif', fontSize: 48, lineHeight: 1.02, letterSpacing: '-0.025em', fontWeight: 500, color: ink, textWrap: 'balance',
          }}>
            One useful IT post a month. <em style={{ fontStyle: 'italic', color: accent }}>No salesy nonsense.</em>
          </h2>
          <p style={{ marginTop: 16, color: muted, fontSize: 16, lineHeight: 1.55, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            Field notes, license-audit templates, and the occasional rant about MSP pricing. Unsubscribe in one click.
          </p>
          <form style={{ marginTop: 28, display: 'flex', gap: 8, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
            <input type="email" placeholder="you@yourcompany.com" style={{
              flex: 1, padding: '14px 18px', borderRadius: 10, border: `1px solid ${line}`, background: bg,
              fontSize: 15, fontFamily: 'inherit', color: ink,
            }}/>
            <button style={{
              background: accent, color: '#fff', border: 'none',
              padding: '14px 22px', borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>Subscribe <Icon name="arrowSm" size={14}/></button>
          </form>
          <div style={{ marginTop: 12, fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            ~ 600 readers · Avg. 92% open rate
          </div>
        </div>
      </section>

      <FooterB accent={accent} dark="#0f1115" darkText="#f2f3f5" darkMuted="#9aa0a6" darkLine="rgba(255,255,255,0.10)"/>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════════════════
   BlogPostPage — template for an individual article
   ═══════════════════════════════════════════════════════════════════════════ */
const BlogPostPage = ({ accent = '#dc2626' }) => {
  const bg = '#ffffff';
  const bgAlt = '#F8F9FA';
  const surface = '#ffffff';
  const ink = '#1A1A1A';
  const muted = '#5b6068';
  const bodyInk = '#33363c';
  const line = 'rgba(26,26,26,0.10)';
  const lineSoft = 'rgba(26,26,26,0.06)';

  const post = BLOG_POSTS[0];
  const related = BLOG_POSTS.slice(1, 4);

  return (
    <div className="artboard-root" style={{
      background: bg, color: ink, fontFamily: '"Geist", system-ui, sans-serif',
      fontSize: 16, lineHeight: 1.65, WebkitFontSmoothing: 'antialiased',
    }}>
      <BlogChrome {...{ ink, muted, line, surface, accent, bg }}/>

      {/* breadcrumb */}
      <section style={{ padding: '20px 40px', borderBottom: `1px solid ${lineSoft}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 0.8, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="#" style={{ color: muted, textDecoration: 'none' }}>Blog</a>
          <span>›</span>
          <a href="#" style={{ color: muted, textDecoration: 'none' }}>{post.cat}</a>
          <span>›</span>
          <span style={{ color: ink }}>This post</span>
        </div>
      </section>

      {/* Article header */}
      <section style={{ padding: '64px 40px 40px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <span style={{
              fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent,
              letterSpacing: 1.2, textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: 999, border: `1px solid ${accent}55`, background: `${accent}10`,
            }}>{post.cat}</span>
            <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 0.5 }}>{post.date} · {post.readTime}</span>
          </div>
          <h1 style={{
            margin: 0, fontFamily: '"Newsreader", serif', fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 500, color: ink, textWrap: 'balance',
          }}>
            {post.title}
          </h1>
          <p style={{ marginTop: 20, fontSize: 21, color: muted, lineHeight: 1.5, fontFamily: '"Newsreader", serif', fontStyle: 'italic' }}>
            {post.excerpt}
          </p>

          {/* byline strip */}
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{
              width: 44, height: 44, borderRadius: '50%', background: bgAlt, border: `1px solid ${line}`,
              backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 8px)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Geist Mono", monospace', fontSize: 9, color: muted,
            }}>AU</span>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: ink, lineHeight: 1.2 }}>{post.author}</div>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: muted, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2 }}>Author · Posted {post.date}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              {['Copy link', 'X / Twitter', 'LinkedIn', 'Email'].map((s) => (
                <button key={s} style={{
                  fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500, color: ink,
                  padding: '7px 12px', borderRadius: 999, border: `1px solid ${line}`, background: bg, cursor: 'pointer',
                }}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section style={{ padding: '0 40px 56px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Photo label={`COVER · ${post.cat.toUpperCase()}`} tone="dark" radius={14} style={{ aspectRatio: '21/9' }}/>
          <div style={{ marginTop: 12, fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Illustration · Replace with field photo / chart
          </div>
        </div>
      </section>

      {/* Body — full-width prose (no sidebar) */}
      <section style={{ padding: '0 40px 96px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Article body — placeholder prose */}
          <article style={{ fontSize: 17.5, lineHeight: 1.7, color: bodyInk }}>
            <p style={{ marginTop: 0, fontSize: 19.5, color: ink, fontFamily: '"Newsreader", serif', lineHeight: 1.5 }}>
              When a prospect tells us "our last MSP kept losing tickets," nine times out of ten it isn't laziness or understaffing. It's a routing problem nobody on the floor is measuring. Here's the single number we audit on every new client takeover — and what we do about it in the first week.
            </p>

            <h2 id="h0" style={{ marginTop: 48, marginBottom: 12, fontFamily: '"Newsreader", serif', fontSize: 32, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.15, color: ink }}>
              The problem nobody owns
            </h2>
            <p>Most managed-service shops route tickets the way the previous owner set them up in 2017: a shared inbox, an alias or two, and a Slack channel that's "where we get to it." Nobody is responsible for the gap between "a customer asked for help" and "the right engineer started working."</p>
            <p>That gap is invisible until you measure it. And when you do, the numbers are uncomfortable: median first-touch on routed tickets at 4 hours, p95 over 24 hours, with about 8% of tickets getting <em>zero</em> response on the day they came in.</p>

            <h2 id="h1" style={{ marginTop: 48, marginBottom: 12, fontFamily: '"Newsreader", serif', fontSize: 32, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.15, color: ink }}>
              The number we audit first
            </h2>
            <p>The metric is <strong style={{ color: ink, fontWeight: 600 }}>time-to-assignment</strong>: how long from ticket creation until a human owner is on the ticket. Not first reply. Not resolution. <em>Assignment.</em></p>

            {/* Pull quote */}
            <blockquote style={{
              margin: '36px 0', padding: '0 0 0 24px', borderLeft: `3px solid ${accent}`,
              fontFamily: '"Newsreader", serif', fontStyle: 'italic', fontSize: 26, lineHeight: 1.35, color: ink, letterSpacing: '-0.01em',
            }}>
              "First reply is a vanity metric. Assignment is the one that predicts whether the rest of the SLA holds."
            </blockquote>

            <p>Once you have a clean median and p95 on time-to-assignment, broken out by category (security, M365, hardware, network), the routing failures fall out of the data on their own. Almost every one is a category with no clear default owner.</p>

            {/* Inline image */}
            <figure style={{ margin: '36px 0' }}>
              <Photo label="CHART · TIME-TO-ASSIGNMENT BY CATEGORY" tone="light" radius={10} style={{ aspectRatio: '16/9' }}/>
              <figcaption style={{ marginTop: 10, fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                Fig 1 · Sample audit · Categories with no default owner are the long bars
              </figcaption>
            </figure>

            <h2 id="h2" style={{ marginTop: 48, marginBottom: 12, fontFamily: '"Newsreader", serif', fontSize: 32, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.15, color: ink }}>
              How to fix routing in a week
            </h2>
            <ol style={{ paddingLeft: 22, margin: '12px 0' }}>
              <li style={{ marginBottom: 8 }}>Pull the last 90 days of tickets. Tag each one with a category if it isn't already.</li>
              <li style={{ marginBottom: 8 }}>For each category, identify a primary owner and a backup. Write it down somewhere everyone reads.</li>
              <li style={{ marginBottom: 8 }}>Stand up an "unowned" queue. Anything without a category goes there, and someone owns the queue itself.</li>
              <li style={{ marginBottom: 8 }}>Re-measure time-to-assignment after two weeks. You'll usually halve it without hiring.</li>
            </ol>

            <h2 id="h3" style={{ marginTop: 48, marginBottom: 12, fontFamily: '"Newsreader", serif', fontSize: 32, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.15, color: ink }}>
              What good looks like
            </h2>
            <p>For the clients we run today, median time-to-assignment sits around 6 minutes during business hours, p95 under 22 minutes. None of that requires a 24/7 SOC. It requires a category owner and a queue that nobody is allowed to ignore.</p>

            <h2 id="h4" style={{ marginTop: 48, marginBottom: 12, fontFamily: '"Newsreader", serif', fontSize: 32, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.15, color: ink }}>
              Takeaways
            </h2>
            <ul style={{ paddingLeft: 22, margin: '12px 0' }}>
              <li style={{ marginBottom: 8 }}>Stop measuring first reply. Start measuring assignment.</li>
              <li style={{ marginBottom: 8 }}>Every ticket category needs a written default owner.</li>
              <li style={{ marginBottom: 8 }}>The "unowned" queue is the most important queue you have.</li>
            </ul>

            <hr style={{ margin: '56px 0', border: 'none', borderTop: `1px solid ${line}` }}/>

            {/* Author bio card */}
            <div style={{ background: bgAlt, border: `1px solid ${line}`, borderRadius: 14, padding: 28, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20 }}>
              <span style={{
                width: 72, height: 72, borderRadius: '50%', background: bg, border: `1px solid ${line}`,
                backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 8px)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Geist Mono", monospace', fontSize: 11, color: muted,
              }}>AU</span>
              <div>
                <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>About the author</div>
                <div style={{ fontFamily: '"Newsreader", serif', fontSize: 20, fontWeight: 500, color: ink, letterSpacing: '-0.01em' }}>{post.author}</div>
                <p style={{ margin: '8px 0 0', color: muted, fontSize: 14.5, lineHeight: 1.55 }}>
                  10+ years in enterprise IT and managed services. Writes about the unglamorous operational moves that quietly make MSPs feel good to work with.
                </p>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <a href="#" style={{ color: accent, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>More from this author →</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related posts */}
      <section style={{ padding: '64px 40px', background: bgAlt, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
            <h2 style={{ margin: 0, fontFamily: '"Newsreader", serif', fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em', color: ink }}>
              Keep reading
            </h2>
            <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>All posts →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {related.map((p) => (
              <a key={p.slug} href="#" style={{ background: bg, border: `1px solid ${line}`, borderRadius: 12, overflow: 'hidden', textDecoration: 'none', color: ink, display: 'flex', flexDirection: 'column' }}>
                <Photo label={`COVER · ${p.cat.toUpperCase()}`} tone="dark" radius={0} style={{ aspectRatio: '16/9' }}/>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: accent, letterSpacing: 1, textTransform: 'uppercase' }}>{p.cat}</span>
                    <span style={{ width: 3, height: 3, borderRadius: 2, background: muted }}/>
                    <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: muted, letterSpacing: 0.5 }}>{p.readTime}</span>
                  </div>
                  <h3 style={{
                    margin: 0, fontFamily: '"Newsreader", serif', fontSize: 21, fontWeight: 500, letterSpacing: '-0.015em',
                    lineHeight: 1.2, color: ink, textWrap: 'balance',
                  }}>{p.title}</h3>
                  <div style={{ marginTop: 'auto', paddingTop: 14, color: muted, fontSize: 13 }}>{p.date}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '96px 40px', background: bg }}>
        <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>
            ◆ Got a routing problem?
          </div>
          <h2 style={{
            margin: 0, fontFamily: '"Newsreader", serif', fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 500, color: ink, textWrap: 'balance',
          }}>
            Let us audit your ticket flow — <em style={{ fontStyle: 'italic', color: accent }}>30 minutes, no obligation.</em>
          </h2>
          <p style={{ marginTop: 16, color: muted, fontSize: 17, lineHeight: 1.55, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            We'll pull the last 90 days of your tickets, run the same time-to-assignment analysis we use on every new client, and tell you exactly where the gap is.
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
            }}>Back to the blog →</a>
          </div>
        </div>
      </section>

      <FooterB accent={accent} dark="#0f1115" darkText="#f2f3f5" darkMuted="#9aa0a6" darkLine="rgba(255,255,255,0.10)"/>
    </div>
  );
};

Object.assign(window, { BlogIndexPage, BlogPostPage });
