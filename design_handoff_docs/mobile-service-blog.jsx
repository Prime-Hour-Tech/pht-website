// mobile-service-blog.jsx — ServiceMobile, BlogIndexMobile, BlogPostMobile,
// ContactMobile, LegalMobile (Privacy/Terms). 390px wide.

/* ═══════════════════════════════════════════════════════════════════════
   ServiceMobile — reusable, slug-driven
   ═══════════════════════════════════════════════════════════════════════ */
const ServiceMobile = ({ accent = '#dc2626', slug = 'managed-it' }) => {
  const t = MTokens;
  const c = (typeof SERVICE_CONTENT !== 'undefined' && SERVICE_CONTENT[slug]) || (typeof SERVICE_CONTENT !== 'undefined' && SERVICE_CONTENT['managed-it']) || { name: slug };

  // Render *italic-accent* in headlines (one pair)
  const renderInline = (s) => {
    if (typeof s !== 'string') return s;
    const m = s.match(/^([\s\S]*?)\*([\s\S]+?)\*([\s\S]*)$/);
    if (!m) return s;
    return <>{m[1]}<em style={{ fontStyle: 'italic', color: accent, fontWeight: 500 }}>{m[2]}</em>{m[3]}</>;
  };

  const others = (typeof SERVICE_CONTENT !== 'undefined') ? Object.entries(SERVICE_CONTENT).filter(([k]) => k !== slug).slice(0, 4) : [];

  return (
    <MobilePageWrapper>
      <MobileTop accent={accent} active="Services"/>

      {/* breadcrumb */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${t.lineSoft}`, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.6, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
        <a href="#" style={{ color: t.muted, textDecoration: 'none' }}>Services</a>
        <span>›</span>
        <span style={{ color: t.ink }}>{c.name}</span>
      </div>

      {/* Dark hero */}
      <section style={{ background: t.dark, color: t.darkText, padding: '32px 20px 36px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, background: `radial-gradient(circle, ${accent}33, transparent 70%)`, pointerEvents: 'none' }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{
              width: 38, height: 38, borderRadius: 10, background: `${accent}1c`, color: accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${accent}55`,
            }}>
              <Icon name={c.iconName} size={18}/>
            </span>
            <span style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.4, textTransform: 'uppercase' }}>
              {c.eyebrow}
            </span>
          </div>
          <h1 style={{
            margin: 0, fontFamily: t.serif, fontSize: 38, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 500, color: t.darkText, textWrap: 'balance',
          }}>
            {renderInline(c.headline)}
          </h1>
          <p style={{ marginTop: 14, color: t.darkMuted, fontSize: 14.5, lineHeight: 1.55 }}>{c.deck}</p>
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <MobilePrimary accent={accent}>Schedule a discovery call</MobilePrimary>
            <MobileGhost dark>Read the spec sheet →</MobileGhost>
          </div>

          {/* At-a-glance card */}
          <div style={{ marginTop: 22, background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.darkLine}`, borderRadius: 12, padding: 18 }}>
            <div style={{ fontFamily: t.mono, fontSize: 10, color: t.darkMuted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>◆ At a glance</div>
            <div style={{ fontFamily: t.serif, fontSize: 50, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1, color: t.darkText, marginTop: 6 }}>{c.heroStat && c.heroStat.k}</div>
            <div style={{ marginTop: 6, color: t.darkMuted, fontSize: 13.5 }}>{c.heroStat && c.heroStat.v}</div>
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${t.darkLine}`, fontFamily: t.mono, fontSize: 10, color: t.darkMuted, letterSpacing: 0.4, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span><LiveDot color="#22c55e"/> Included</span>
              <span>SLA · 15-min</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — sticky title removed on mobile */}
      {(c.sections || []).map((s, i) => (
        <section key={i} style={{ padding: '40px 20px', borderBottom: `1px solid ${t.line}` }}>
          <MobileEyebrow accent={accent}>◆ {s.eyebrow}</MobileEyebrow>
          <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 28, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: t.ink, textWrap: 'balance' }}>
            {s.heading}
          </h2>
          <p style={{ marginTop: 14, color: t.muted, fontSize: 15.5, lineHeight: 1.6 }}>{s.body}</p>
          <ul style={{ marginTop: 18, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {(s.bullets || []).map((b) => (
              <li key={b} style={{ display: 'flex', gap: 10, color: t.ink, fontSize: 14.5, lineHeight: 1.5, padding: '12px 0', borderBottom: `1px solid ${t.lineSoft}` }}>
                <span style={{ color: accent, marginTop: 3 }}><Icon name="check" size={14} stroke={2}/></span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Capabilities — single column cards */}
      <section style={{ padding: '40px 20px', background: t.bgAlt, borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ What's included</MobileEyebrow>
        <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 28, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: t.ink, textWrap: 'balance' }}>
          {(c.capabilities || []).length} capabilities. <em style={{ fontStyle: 'italic', color: accent }}>One SLA.</em>
        </h2>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(c.capabilities || []).map((cap) => (
            <div key={cap.name} style={{ background: t.bg, border: `1px solid ${t.line}`, borderRadius: 10, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: `${accent}12`, color: accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={c.iconName} size={16}/>
                </span>
                <span style={{ fontFamily: t.mono, fontSize: 9, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase', padding: '2px 7px', border: `1px solid ${t.line}`, borderRadius: 4 }}>INCLUDED</span>
              </div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2, color: t.ink }}>{cap.name}</h3>
              <p style={{ margin: '4px 0 0', color: t.muted, fontSize: 13.5, lineHeight: 1.5 }}>{cap.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stat strip — 2x2 */}
      <section style={{ padding: '32px 20px', borderBottom: `1px solid ${t.line}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {(c.statStrip || []).map((s) => (
            <div key={s.v}>
              <div style={{ fontFamily: t.serif, fontSize: 32, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1, color: t.ink, fontVariantNumeric: 'tabular-nums' }}>{s.k}</div>
              <div style={{ marginTop: 6, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — stacked accordion-style rows */}
      <section style={{ padding: '40px 20px', borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ Questions we hear</MobileEyebrow>
        <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 28, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: t.ink, textWrap: 'balance' }}>
          The ones owners ask <em style={{ fontStyle: 'italic', color: accent }}>before signing.</em>
        </h2>
        <div style={{ marginTop: 18, borderTop: `1px solid ${t.line}` }}>
          {(c.faqs || []).map(([q, a], i) => (
            <details key={q} open={i === 0} style={{ borderBottom: `1px solid ${t.line}`, padding: '14px 0' }}>
              <summary style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: 'pointer', listStyle: 'none', gap: 12,
                fontFamily: t.serif, fontSize: 17, fontWeight: 500, color: t.ink, lineHeight: 1.3,
              }}>
                <span>{q}</span>
                <span style={{ color: t.muted, marginTop: 4, flexShrink: 0 }}><Icon name="chevron" size={16}/></span>
              </summary>
              <p style={{ margin: '10px 0 0', color: t.muted, fontSize: 14, lineHeight: 1.6 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Other services */}
      <section style={{ padding: '32px 20px', background: t.bgAlt, borderBottom: `1px solid ${t.line}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: t.ink }}>Other services</h2>
          <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>View all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {others.map(([k, o]) => (
            <a key={k} href="#" style={{
              background: t.bg, border: `1px solid ${t.line}`, borderRadius: 10, padding: 14, textDecoration: 'none', color: t.ink,
              display: 'flex', flexDirection: 'column', gap: 8, minHeight: 110,
            }}>
              <span style={{ width: 30, height: 30, borderRadius: 6, background: `${accent}12`, color: accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={o.iconName} size={15}/>
              </span>
              <div style={{ fontFamily: t.serif, fontSize: 15, fontWeight: 500, lineHeight: 1.18, color: t.ink }}>{o.name}</div>
              <span style={{ marginTop: 'auto', color: accent, fontWeight: 600, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>Read <Icon name="arrowSm" size={11}/></span>
            </a>
          ))}
        </div>
      </section>

      <MobileCTABlock
        accent={accent}
        title={<>See if {String(c.name).toLowerCase()} from PHT <em style={{ fontStyle: 'italic', color: accent }}>fits your business.</em></>}
        deck="30 minutes with the founder. We'll tell you honestly whether this service is the right fit."
      />
      <MobileFooter accent={accent}/>
    </MobilePageWrapper>
  );
};


/* ═══════════════════════════════════════════════════════════════════════
   BlogIndexMobile
   ═══════════════════════════════════════════════════════════════════════ */
const BlogIndexMobile = ({ accent = '#dc2626' }) => {
  const t = MTokens;
  const posts = (typeof BLOG_POSTS !== 'undefined') ? BLOG_POSTS : [];
  const cats  = (typeof BLOG_CATEGORIES !== 'undefined') ? BLOG_CATEGORIES : ['All'];
  const [lead, ...rest] = posts;

  return (
    <MobilePageWrapper>
      <MobileTop accent={accent} active="Blog"/>

      <MobilePageHeader
        accent={accent}
        eyebrow={`◆ Blog · ${posts.length} posts`}
        size={42}
        title={<>Field notes from <em style={{ fontStyle: 'italic', color: accent }}>the helpdesk.</em></>}
        deck="Practical write-ups on managed IT, cybersecurity, M365, and the costly mistakes we see SMBs make. No vendor fluff."
      />

      {/* Category chips — horizontal scroll */}
      <section style={{ padding: '12px 0 16px', borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, background: t.bg, position: 'sticky', top: 0, zIndex: 4 }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px' }}>
          {cats.map((c, i) => (
            <a key={c} href="#" style={{
              padding: '8px 13px', borderRadius: 999, textDecoration: 'none', fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0,
              color: i === 0 ? '#fff' : t.ink, background: i === 0 ? t.ink : 'transparent',
              border: i === 0 ? `1px solid ${t.ink}` : `1px solid ${t.line}`,
            }}>{c}</a>
          ))}
        </div>
      </section>

      {/* Featured lead — stacked */}
      {lead && (
        <section style={{ padding: '32px 20px 16px' }}>
          <a href="#" style={{ textDecoration: 'none', color: t.ink, display: 'flex', flexDirection: 'column' }}>
            <Photo label={`COVER · ${lead.cat.toUpperCase()}`} tone="dark" radius={10} style={{ aspectRatio: '4/3', marginBottom: 16 }}/>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.2, textTransform: 'uppercase',
                padding: '4px 9px', borderRadius: 999, border: `1px solid ${accent}55`, background: `${accent}10`,
              }}>Featured · {lead.cat}</span>
              <span style={{ fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.5 }}>{lead.date} · {lead.readTime}</span>
            </div>
            <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, textWrap: 'balance' }}>
              {lead.title}
            </h2>
            <p style={{ margin: '10px 0 0', color: t.muted, fontSize: 14, lineHeight: 1.55 }}>{lead.excerpt}</p>
            <div style={{ marginTop: 14, fontSize: 13, color: t.muted }}>{lead.author}</div>
          </a>
        </section>
      )}

      {/* Recent posts — stacked */}
      <section style={{ padding: '24px 20px 32px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: t.ink }}>Recent posts</h2>
          <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>View all →</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {rest.map((p) => (
            <a key={p.slug} href="#" style={{ textDecoration: 'none', color: t.ink, display: 'flex', flexDirection: 'column' }}>
              <Photo label={`COVER · ${p.cat.toUpperCase()}`} tone="dark" radius={8} style={{ aspectRatio: '16/9', marginBottom: 12 }}/>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1, textTransform: 'uppercase' }}>{p.cat}</span>
                <span style={{ width: 2, height: 2, borderRadius: 1, background: t.muted }}/>
                <span style={{ fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.4 }}>{p.readTime}</span>
              </div>
              <h3 style={{ margin: 0, fontFamily: t.serif, fontSize: 19, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.18, textWrap: 'balance' }}>{p.title}</h3>
              <p style={{ margin: '8px 0 0', color: t.muted, fontSize: 13.5, lineHeight: 1.5 }}>{p.excerpt}</p>
              <div style={{ marginTop: 10, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.5, textTransform: 'uppercase' }}>{p.date} · {p.author}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <section style={{ padding: '8px 20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {[{ l: '←', dim: true }, { l: '1', active: true }, { l: '2' }, { l: '3' }, { l: '…', dim: true }, { l: '→' }].map((b, i) => (
            <a key={i} href="#" style={{
              minWidth: 36, height: 36, padding: '0 10px', borderRadius: 8,
              border: `1px solid ${b.active ? t.ink : t.line}`, background: b.active ? t.ink : 'transparent',
              color: b.active ? '#fff' : (b.dim ? t.muted : t.ink),
              textDecoration: 'none', fontSize: 13.5, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>{b.l}</a>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '40px 20px', background: t.bgAlt, borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>◆ Newsletter · Once a month</MobileEyebrow>
        <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, color: t.ink, textWrap: 'balance' }}>
          One useful IT post a month. <em style={{ fontStyle: 'italic', color: accent }}>No salesy nonsense.</em>
        </h2>
        <p style={{ marginTop: 12, color: t.muted, fontSize: 14, lineHeight: 1.55 }}>
          Field notes, license-audit templates, and the occasional rant about MSP pricing.
        </p>
        <input type="email" placeholder="you@yourcompany.com" style={{
          marginTop: 16, width: '100%', padding: '13px 16px', borderRadius: 10, border: `1px solid ${t.line}`, background: t.bg,
          fontSize: 15, fontFamily: 'inherit', color: t.ink, boxSizing: 'border-box',
        }}/>
        <div style={{ marginTop: 10 }}><MobilePrimary accent={accent}>Subscribe</MobilePrimary></div>
        <div style={{ marginTop: 10, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.4, textTransform: 'uppercase', textAlign: 'center' }}>
          ~ 600 readers · 92% open rate
        </div>
      </section>

      <MobileFooter accent={accent}/>
    </MobilePageWrapper>
  );
};


/* ═══════════════════════════════════════════════════════════════════════
   BlogPostMobile
   ═══════════════════════════════════════════════════════════════════════ */
const BlogPostMobile = ({ accent = '#dc2626' }) => {
  const t = MTokens;
  const posts = (typeof BLOG_POSTS !== 'undefined') ? BLOG_POSTS : [];
  const post = posts[0] || { cat: 'Cybersecurity', title: 'Post', excerpt: '', author: 'Author', date: '', readTime: '' };
  const related = posts.slice(1, 3);

  return (
    <MobilePageWrapper>
      <MobileTop accent={accent} active="Blog"/>

      {/* breadcrumb */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${t.lineSoft}`, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.6, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
        <a href="#" style={{ color: t.muted, textDecoration: 'none' }}>Blog</a>
        <span>›</span>
        <a href="#" style={{ color: t.muted, textDecoration: 'none' }}>{post.cat}</a>
      </div>

      {/* Header */}
      <section style={{ padding: '28px 20px 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{
            fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.2, textTransform: 'uppercase',
            padding: '4px 9px', borderRadius: 999, border: `1px solid ${accent}55`, background: `${accent}10`,
          }}>{post.cat}</span>
          <span style={{ fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.5 }}>{post.date} · {post.readTime}</span>
        </div>
        <h1 style={{ margin: 0, fontFamily: t.serif, fontSize: 32, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: t.ink, textWrap: 'balance' }}>
          {post.title}
        </h1>
        <p style={{ marginTop: 14, fontFamily: t.serif, fontStyle: 'italic', fontSize: 17, lineHeight: 1.5, color: t.muted }}>
          {post.excerpt}
        </p>

        {/* byline */}
        <div style={{ marginTop: 22, paddingTop: 16, borderTop: `1px solid ${t.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 38, height: 38, borderRadius: '50%', background: t.bgAlt, border: `1px solid ${t.line}`,
            backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 8px)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: t.mono, fontSize: 9, color: t.muted,
          }}>AU</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.ink, lineHeight: 1.2 }}>{post.author}</div>
            <div style={{ fontFamily: t.mono, fontSize: 9.5, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2 }}>Author</div>
          </div>
          <button style={{
            fontFamily: t.font, fontSize: 12, fontWeight: 500, color: t.ink,
            padding: '7px 12px', borderRadius: 999, border: `1px solid ${t.line}`, background: t.bg, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}><Icon name="arrowSm" size={12}/> Share</button>
        </div>
      </section>

      {/* Cover */}
      <section style={{ padding: '0 20px 24px' }}>
        <Photo label={`COVER · ${post.cat.toUpperCase()}`} tone="dark" radius={12} style={{ aspectRatio: '16/9' }}/>
      </section>

      {/* Body */}
      <article style={{ padding: '0 20px 32px', fontSize: 16, lineHeight: 1.7, color: '#33363c' }}>
        <p style={{ margin: 0, fontSize: 17, color: t.ink, fontFamily: t.serif, lineHeight: 1.5 }}>
          When a prospect tells us "our last MSP kept losing tickets," it isn't laziness. It's a routing problem nobody on the floor is measuring. Here's the single number we audit on every new client takeover.
        </p>

        <h2 style={{ marginTop: 32, marginBottom: 10, fontFamily: t.serif, fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.18, color: t.ink }}>
          The problem nobody owns
        </h2>
        <p>Most managed-service shops route tickets the way the previous owner set them up in 2017: a shared inbox, an alias or two, and a Slack channel that's "where we get to it." Nobody is responsible for the gap.</p>

        <h2 style={{ marginTop: 32, marginBottom: 10, fontFamily: t.serif, fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.18, color: t.ink }}>
          The number we audit first
        </h2>
        <p>The metric is <strong style={{ color: t.ink, fontWeight: 600 }}>time-to-assignment</strong>: how long from ticket creation until a human owner is on the ticket. Not first reply. Not resolution.</p>

        <blockquote style={{
          margin: '28px 0', padding: '0 0 0 16px', borderLeft: `3px solid ${accent}`,
          fontFamily: t.serif, fontStyle: 'italic', fontSize: 21, lineHeight: 1.35, color: t.ink, letterSpacing: '-0.01em',
        }}>
          "First reply is a vanity metric. Assignment is the one that predicts whether the rest of the SLA holds."
        </blockquote>

        <p>Once you have a clean median and p95 on time-to-assignment, broken out by category, the routing failures fall out of the data on their own.</p>

        <figure style={{ margin: '28px 0' }}>
          <Photo label="CHART · TIME-TO-ASSIGNMENT" tone="light" radius={8} style={{ aspectRatio: '16/9' }}/>
          <figcaption style={{ marginTop: 8, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            Fig 1 · Sample audit · Categories with no default owner
          </figcaption>
        </figure>

        <h2 style={{ marginTop: 32, marginBottom: 10, fontFamily: t.serif, fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.18, color: t.ink }}>
          Takeaways
        </h2>
        <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
          <li style={{ marginBottom: 6 }}>Stop measuring first reply. Start measuring assignment.</li>
          <li style={{ marginBottom: 6 }}>Every ticket category needs a written default owner.</li>
          <li style={{ marginBottom: 6 }}>The "unowned" queue is the most important queue you have.</li>
        </ul>

        <hr style={{ margin: '36px 0', border: 'none', borderTop: `1px solid ${t.line}` }}/>

        {/* Author bio */}
        <div style={{ background: t.bgAlt, border: `1px solid ${t.line}`, borderRadius: 12, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{
            width: 52, height: 52, borderRadius: '50%', background: t.bg, border: `1px solid ${t.line}`,
            backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 8px)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: t.mono, fontSize: 10, color: t.muted, flexShrink: 0,
          }}>AU</span>
          <div>
            <div style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>About the author</div>
            <div style={{ fontFamily: t.serif, fontSize: 17, fontWeight: 500, color: t.ink, letterSpacing: '-0.01em' }}>{post.author}</div>
            <p style={{ margin: '6px 0 0', color: t.muted, fontSize: 13, lineHeight: 1.55 }}>
              Writes about the unglamorous operational moves that make MSPs feel good to work with.
            </p>
          </div>
        </div>
      </article>

      {/* Related — stacked, only 2 */}
      <section style={{ padding: '32px 20px', background: t.bgAlt, borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: t.ink }}>Keep reading</h2>
          <a href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>All posts →</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {related.map((p) => (
            <a key={p.slug} href="#" style={{ background: t.bg, border: `1px solid ${t.line}`, borderRadius: 12, overflow: 'hidden', textDecoration: 'none', color: t.ink, display: 'flex', flexDirection: 'column' }}>
              <Photo label={`COVER · ${p.cat.toUpperCase()}`} tone="dark" radius={0} style={{ aspectRatio: '16/9' }}/>
              <div style={{ padding: 14 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1, textTransform: 'uppercase' }}>{p.cat}</span>
                  <span style={{ width: 2, height: 2, borderRadius: 1, background: t.muted }}/>
                  <span style={{ fontFamily: t.mono, fontSize: 10, color: t.muted }}>{p.readTime}</span>
                </div>
                <h3 style={{ margin: 0, fontFamily: t.serif, fontSize: 17, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.18, color: t.ink, textWrap: 'balance' }}>{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <MobileCTABlock
        accent={accent}
        eyebrow="◆ Got a routing problem?"
        title={<>Let us audit your ticket flow — <em style={{ fontStyle: 'italic', color: accent }}>30 min, no obligation.</em></>}
        deck="We'll pull the last 90 days of your tickets and run the same time-to-assignment analysis."
      />
      <MobileFooter accent={accent}/>
    </MobilePageWrapper>
  );
};


/* ═══════════════════════════════════════════════════════════════════════
   ContactMobile
   ═══════════════════════════════════════════════════════════════════════ */
const ContactMobile = ({ accent = '#dc2626' }) => {
  const t = MTokens;

  const Field = ({ label, placeholder, type = 'text', textarea = false }) => (
    <label style={{ display: 'block' }}>
      <span style={{ fontFamily: t.mono, fontSize: 10.5, color: t.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>{label}</span>
      {textarea ? (
        <textarea placeholder={placeholder} rows={4} style={{
          width: '100%', border: `1px solid ${t.line}`, borderRadius: 8, padding: '12px 14px', background: t.bg, color: t.ink,
          fontSize: 15, fontFamily: 'inherit', marginTop: 6, resize: 'vertical', boxSizing: 'border-box',
        }}/>
      ) : (
        <input type={type} placeholder={placeholder} style={{
          width: '100%', border: `1px solid ${t.line}`, borderRadius: 8, padding: '12px 14px', background: t.bg, color: t.ink,
          fontSize: 15, fontFamily: 'inherit', marginTop: 6, boxSizing: 'border-box',
        }}/>
      )}
    </label>
  );

  return (
    <MobilePageWrapper>
      <MobileTop accent={accent} active="Contact"/>

      <MobilePageHeader
        accent={accent}
        eyebrow="◆ Contact · We respond in 1 business day"
        size={44}
        title={<>Let's talk about <em style={{ fontStyle: 'italic', color: accent }}>what's slowing you down.</em></>}
        deck="Fill out the form and we'll be in touch within one business day — or call us directly if it's urgent."
      />

      {/* Direct contact card */}
      <section style={{ padding: '0 20px 24px' }}>
        <div style={{ background: t.bgAlt, border: `1px solid ${t.line}`, borderRadius: 12, padding: 18 }}>
          <div style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>◇ Or skip the form</div>
          <a href={PHT.phoneLink} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', color: t.ink, textDecoration: 'none', fontSize: 15, borderBottom: `1px solid ${t.lineSoft}` }}>
            <Icon name="phone" size={16}/> <span style={{ flex: 1 }}>{PHT.phoneDigits}</span> <Icon name="arrowSm" size={14}/>
          </a>
          <a href={`mailto:${PHT.email}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', color: t.ink, textDecoration: 'none', fontSize: 15 }}>
            <Icon name="mail" size={16}/> <span style={{ flex: 1 }}>{PHT.email}</span> <Icon name="arrowSm" size={14}/>
          </a>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: '8px 20px 32px' }}>
        <div style={{ background: t.bg, border: `1px solid ${t.line}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Step 1 of 1 · ~2 min</div>
          <h2 style={{ margin: 0, fontFamily: t.serif, fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, color: t.ink }}>
            Tell us about your business.
          </h2>
          <p style={{ marginTop: 8, color: t.muted, fontSize: 14, lineHeight: 1.55 }}>
            The more we know up front, the more useful our first call will be.
          </p>

          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Full name *"   placeholder="Jane Doe"/>
            <Field label="Company *"     placeholder="Acme LLC"/>
            <Field label="Email *"       placeholder="jane@acme.com"  type="email"/>
            <Field label="Phone"         placeholder={PHT.phoneDigits} type="tel"/>
            <Field label="Company size"  placeholder="e.g. 10–50 seats"/>
            <Field label="What's going on? *" placeholder="Briefly describe what's slowing you down." textarea/>
          </div>

          <div style={{ marginTop: 18 }}>
            <MobilePrimary accent={accent}>Send · We'll reply in 1 business day</MobilePrimary>
          </div>
          <div style={{ marginTop: 10, fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 0.4, textTransform: 'uppercase', textAlign: 'center' }}>
            <Icon name="lock" size={11}/> Encrypted in transit · Never sold
          </div>
        </div>
      </section>

      <MobileFooter accent={accent}/>
    </MobilePageWrapper>
  );
};


/* ═══════════════════════════════════════════════════════════════════════
   LegalMobile — used for Privacy & Terms
   ═══════════════════════════════════════════════════════════════════════ */
const LegalMobile = ({ accent = '#dc2626', kind = 'privacy' }) => {
  const t = MTokens;

  const isPrivacy = kind === 'privacy';
  const titleLabel = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const eyebrow    = isPrivacy ? '◆ Legal · Privacy' : '◆ Legal · Terms';
  const shortSummary = isPrivacy
    ? "We only collect what we need to talk to you, deliver services, and run the business. We don't sell your data, don't run behavioural ads, and don't train AI models on it."
    : "We provide IT services per your signed MSA / SOW. You give us access and pay invoices net-15. We protect your data, document what we do, and you can leave with 30 days' notice.";

  // Short, scannable section set (4 entries) — full pages link out
  const sections = isPrivacy ? [
    { id: '1', heading: 'What we collect',     body: 'Information you give us (form fills, signed agreements), automatically (IP, device, pages viewed), and from referral partners.' },
    { id: '2', heading: 'How we use it',        body: 'To respond to inquiries, deliver and bill for services, keep systems secure, comply with law, and improve the Site.' },
    { id: '3', heading: 'Sharing & disclosures',body: 'Only with vendors who help us run the business (M365, Azure, payroll, accounting, RMM/PSA tools), and as required by law.' },
    { id: '4', heading: 'Your rights',          body: 'Access, correct, delete, port, or restrict your data. Email privacy@ to make a request — we respond within 30 days.' },
  ] : [
    { id: '1', heading: 'Acceptance',           body: 'By using the Site or engaging us for services, you agree to these Terms and our Privacy Policy. Signed MSAs/SOWs supersede where they conflict.' },
    { id: '2', heading: 'Services & fees',      body: 'Managed services billed monthly in advance; projects per SOW milestones; T&M at our then-current rates. Net 15.' },
    { id: '3', heading: 'Liability',            body: "Our total liability is capped at the fees you paid us in the 3 months before the claim. No indirect, incidental, or consequential damages." },
    { id: '4', heading: 'Termination',          body: 'Either side may terminate for material breach with 30 days written notice to cure. For-convenience termination per the MSA notice period.' },
  ];

  return (
    <MobilePageWrapper>
      <MobileTop accent={accent}/>

      {/* Header */}
      <section style={{ padding: '32px 20px 24px', borderBottom: `1px solid ${t.line}` }}>
        <MobileEyebrow accent={accent}>{eyebrow}</MobileEyebrow>
        <h1 style={{ margin: 0, fontFamily: t.serif, fontSize: 40, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: t.ink, textWrap: 'balance' }}>
          {titleLabel}
        </h1>
        <p style={{ marginTop: 14, color: t.muted, fontSize: 15.5, lineHeight: 1.55 }}>
          {isPrivacy
            ? 'What we collect, how we use it, and the choices you have. Plain-language summary first, full policy linked below.'
            : 'The legal agreement that governs your use of this Site and our services. Plain-language summary first, full terms linked below.'}
        </p>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 6, fontFamily: t.mono, fontSize: 11, color: t.muted, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          <span><strong style={{ color: t.ink, fontFamily: 'inherit' }}>Last revised:</strong> May 24, 2026</span>
          <span><strong style={{ color: t.ink, fontFamily: 'inherit' }}>Effective:</strong> June 1, 2026 · v2.0</span>
        </div>
      </section>

      {/* Plain-language summary */}
      <section style={{ padding: '24px 20px' }}>
        <div style={{ background: t.bgAlt, border: `1px solid ${t.line}`, borderRadius: 14, padding: 18 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{
              width: 36, height: 36, borderRadius: 8, background: `${accent}15`, color: accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name={isPrivacy ? 'shield' : 'file'} size={18} stroke={1.6}/>
            </span>
            <div>
              <div style={{ fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>The short version</div>
              <p style={{ margin: 0, fontFamily: t.serif, fontSize: 17, lineHeight: 1.4, color: t.ink, letterSpacing: '-0.01em' }}>
                {shortSummary}
              </p>
            </div>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 12.5, color: t.muted }}>The detail below controls. The summary is a courtesy.</p>
        </div>
      </section>

      {/* Sections — collapsed details */}
      <section style={{ padding: '8px 20px 32px' }}>
        <div style={{ fontFamily: t.mono, fontSize: 10, color: accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>◇ Highlights</div>
        <div style={{ borderTop: `1px solid ${t.line}` }}>
          {sections.map((s, i) => (
            <details key={s.id} open={i === 0} style={{ borderBottom: `1px solid ${t.line}`, padding: '14px 0' }}>
              <summary style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', listStyle: 'none', gap: 12,
                fontFamily: t.serif, fontSize: 17, fontWeight: 500, color: t.ink,
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontFamily: t.mono, fontSize: 11, color: accent }}>§ 0{s.id}</span>
                  {s.heading}
                </span>
                <span style={{ color: t.muted }}><Icon name="chevron" size={16}/></span>
              </summary>
              <p style={{ margin: '10px 0 0', color: t.muted, fontSize: 14, lineHeight: 1.6 }}>{s.body}</p>
            </details>
          ))}
        </div>
        <div style={{ marginTop: 22, padding: 16, background: t.bgAlt, border: `1px solid ${t.line}`, borderRadius: 10 }}>
          <div style={{ fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Other legal documents</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(isPrivacy
              ? [['Terms & Conditions', '/terms'], ['SMS Terms', '/smsterms'], ['Client SLA', '/clientsla']]
              : [['Privacy Policy', '/privacy'],   ['SMS Terms', '/smsterms'], ['Client SLA', '/clientsla']]
            ).map(([n, h]) => (
              <li key={n}>
                <a href={h} style={{ color: accent, textDecoration: 'none', fontSize: 13.5, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="file" size={12}/> {n}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MobileFooter accent={accent}/>
    </MobilePageWrapper>
  );
};

Object.assign(window, { ServiceMobile, BlogIndexMobile, BlogPostMobile, ContactMobile, LegalMobile });
