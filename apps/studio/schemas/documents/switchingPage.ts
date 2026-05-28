import { defineType, defineField } from "sanity";

const ICON_OPTIONS = [
  "monitor", "shield", "cloud", "server", "compass", "globe",
  "file", "users", "spark", "lock",
  "phone", "mail", "check", "arrow", "arrowSm", "chevron",
];

export const switchingPage = defineType({
  name: "switchingPage",
  title: "Switching Page",
  type: "document",
  // Singleton — registered in apps/studio/sanity.config.ts SINGLETONS array.
  // Backs /switching.astro.
  groups: [
    { name: "hero", title: "Hero" },
    { name: "reasons", title: "Reasons" },
    { name: "timeline", title: "Migration Timeline" },
    { name: "handle", title: "Awkward-Part Punchlist" },
    { name: "compare", title: "Comparison Table" },
    { name: "promises", title: "Four Promises" },
    { name: "testimonial", title: "Testimonial" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Closing CTA" },
  ],
  fields: [
    // ── Hero ──
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          description: "Small uppercase eyebrow. The leading diamond ◆ and accent dash are added by the layout.",
          type: "string",
          initialValue: "Switching MSPs · Salt Lake City",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "title",
          title: "Title",
          description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "deck",
          title: "Deck",
          type: "text",
          rows: 4,
          initialValue:
            "Most of our SLC clients came to us off another MSP — and the migration is rarely what they were dreading. We handle the awkward parts (the notice letter, the credential handover, the side-by-side coverage) so your team mostly notices the calls start getting answered faster.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "ctaPrimaryLabel",
          title: "Primary CTA Label",
          type: "string",
          initialValue: "Schedule the switching call",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "ctaPrimaryHref",
          title: "Primary CTA URL",
          type: "string",
          initialValue: "/contact",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "ctaSecondaryLabel",
          title: "Secondary CTA Label",
          type: "string",
          initialValue: "See the 30-day timeline →",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "ctaSecondaryHref",
          title: "Secondary CTA URL",
          type: "string",
          initialValue: "#timeline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "dealCard",
          title: "Deal Card (right side of hero)",
          type: "object",
          fields: [
            defineField({
              name: "eyebrow",
              title: "Eyebrow",
              type: "string",
              initialValue: "The deal, in one card",
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: "rows",
              title: "Rows",
              description: "Each row is label + value. Design uses 5 rows.",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required().max(40),
                    }),
                    defineField({
                      name: "value",
                      title: "Value",
                      type: "string",
                      validation: (Rule) => Rule.required().max(60),
                    }),
                  ],
                },
              ],
              initialValue: [
                { label: "Notice letter", value: "We draft it." },
                { label: "Credential handover", value: "We coordinate it." },
                { label: "Side-by-side", value: "0 days of gap." },
                { label: "Runbook", value: "You own it." },
                { label: "Contract", value: "Month-to-month after 90 days." },
              ],
              validation: (Rule) => Rule.required().min(4).max(8),
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "factSheetLabel",
          title: "Fact Sheet Label",
          description: "Eyebrow for the stat strip beneath the hero. Hollow diamond ◇ added in template.",
          type: "string",
          initialValue: "Fact sheet · what to expect",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "liveDotLabel",
          title: "Live-Dot Label",
          description: "Small live-status label on the right of the fact sheet row.",
          type: "string",
          initialValue: "Booking switching calls this week",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "stats",
          title: "Stats",
          description: "Exactly 4 stats. Big serif value + mono caption.",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "k",
                  title: "Value",
                  type: "string",
                  validation: (Rule) => Rule.required().max(16),
                }),
                defineField({
                  name: "v",
                  title: "Caption",
                  type: "string",
                  validation: (Rule) => Rule.required().max(64),
                }),
              ],
            },
          ],
          initialValue: [
            { k: "30 days", v: "Median time to steady state" },
            { k: "0", v: "Coverage gap during handoff" },
            { k: "You", v: "Own every credential & doc at the end" },
            { k: "M-to-M", v: "Month-to-month after 90 days" },
          ],
          validation: (Rule) => Rule.required().length(4),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Reasons ──
    defineField({
      name: "reasons",
      title: "Reasons People Switch",
      type: "object",
      group: "reasons",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "The reasons we hear",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "deck",
          title: "Deck",
          type: "text",
          rows: 3,
          initialValue:
            "When a Salt Lake City business owner finally calls us about switching, the conversation almost always lands on one of these. The first is the most common.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "items",
          title: "Reasons",
          description: "Exactly 3 reasons. Numbering (Reason · 01/02/03) is computed at render time.",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "head",
                  title: "Head",
                  type: "string",
                  validation: (Rule) => Rule.required().max(120),
                }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required().max(480),
                }),
                defineField({
                  name: "flagLabel",
                  title: "Flag Label (Optional)",
                  description: 'Optional chip, e.g. "Most common".',
                  type: "string",
                  validation: (Rule) => Rule.max(40),
                }),
              ],
            },
          ],
          initialValue: [
            {
              head: "The MSP grew faster than its bench.",
              body: "You signed when they had 12 engineers. They have 60 now, half of whom you haven't met. Your ticket gets re-assigned three times before anyone touches it.",
              flagLabel: "Most common",
            },
            {
              head: "The invoice keeps surprising you.",
              body: "Hourly billing on top of \"managed\" services, project fees that weren't in writing, after-hours surcharges. You stopped opening invoices in the inbox preview pane.",
            },
            {
              head: "The engineer who knew you left.",
              body: "Your account was held together by one person who understood your stack. They left. The handoff was an email. The new engineer keeps asking you for context the last engineer should have written down.",
            },
          ],
          validation: (Rule) => Rule.required().length(3),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Timeline ──
    defineField({
      name: "timeline",
      title: "Migration Timeline",
      type: "object",
      group: "timeline",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "What 30 days looks like",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "deck",
          title: "Deck",
          type: "text",
          rows: 4,
          initialValue:
            "We run every migration on the same calendar. There's a discovery call, a written runbook, and side-by-side coverage from day one. You should never feel like there's a gap between \"old MSP\" and \"new MSP.\"",
          validation: (Rule) => Rule.required().max(600),
        }),
        defineField({
          name: "weeks",
          title: "Weeks",
          description: "Exactly 4 weeks. Numbering (01–04 in the circles) is computed at render time.",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "k",
                  title: "Week Label",
                  type: "string",
                  validation: (Rule) => Rule.required().max(20),
                }),
                defineField({
                  name: "sub",
                  title: "Sub-Label (date range)",
                  type: "string",
                  validation: (Rule) => Rule.required().max(40),
                }),
                defineField({
                  name: "head",
                  title: "Head",
                  type: "string",
                  validation: (Rule) => Rule.required().max(120),
                }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required().max(800),
                }),
                defineField({
                  name: "deliverables",
                  title: "Deliverables (check-bullet list)",
                  type: "array",
                  of: [{ type: "string", validation: (Rule) => Rule.max(120) }],
                  validation: (Rule) => Rule.required().min(1).max(8),
                }),
                defineField({
                  name: "ours",
                  title: "On Our Side (chip pills)",
                  type: "array",
                  of: [{ type: "string", validation: (Rule) => Rule.max(40) }],
                  validation: (Rule) => Rule.required().min(1).max(8),
                }),
              ],
            },
          ],
          initialValue: [
            {
              k: "Week 1",
              sub: "Days 1 – 7",
              head: "Discovery, decision, paperwork.",
              body: "A 30-minute call with the founder. We look at your environment, your support load, and your current MSP's contract. If we're a fit, you get a written SOW with a fixed monthly price before anyone signs anything.",
              deliverables: [
                "Discovery call notes (yours)",
                "SOW · scope + price in writing",
                "Templated notice letter for your current MSP",
              ],
              ours: ["Discovery", "Written SOW", "Notice-letter draft"],
            },
            {
              k: "Week 2",
              sub: "Days 8 – 14",
              head: "Documentation, side-by-side, named engineer.",
              body: "We send notice to your current MSP and request credential + documentation handover. While that lands, we begin our own environment walkthrough — networking, identity, endpoints, backups, vendor list. You're introduced to your named engineer; their direct line and email go into your team's contact list.",
              deliverables: [
                "Inventory document (live)",
                "Named-engineer card",
                "Side-by-side coverage in place",
              ],
              ours: ["Inventory", "Credential intake", "Side-by-side"],
            },
            {
              k: "Week 3",
              sub: "Days 15 – 21",
              head: "Baseline deployed. The gaps get closed.",
              body: "Monitoring agents, EDR, and MFA enforcement roll out across endpoints — usually overnight, in waves. We close the security gaps the previous MSP didn't (or didn't want to talk about). Backups are validated with a real restore, not a screenshot.",
              deliverables: [
                "EDR + monitoring deployed",
                "MFA enforced across admin accounts",
                "Test restore from backup",
              ],
              ours: ["EDR rollout", "MFA push", "Backup test"],
            },
            {
              k: "Week 4",
              sub: "Days 22 – 30",
              head: "Old MSP off. Steady state on.",
              body: "The previous MSP's access is revoked, their tools removed, their domain accounts disabled. The first monthly summary lands. The QBR with the founder is on the calendar. You have a runbook on your drive that you own — if you ever leave us, it leaves with you.",
              deliverables: [
                "Previous MSP fully off-boarded",
                "Runbook · markdown + PDF (yours)",
                "First QBR on the calendar",
              ],
              ours: ["Off-board", "Runbook handoff", "QBR scheduled"],
            },
          ],
          validation: (Rule) => Rule.required().length(4),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Handle ──
    defineField({
      name: "handle",
      title: "The Awkward Part",
      type: "object",
      group: "handle",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "The awkward part",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "deck",
          title: "Deck",
          type: "text",
          rows: 3,
          initialValue:
            "Most owners delay switching MSPs because they're bracing for an awkward set of conversations. We handle nearly all of them for you. You sign a few things. That's it.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "items",
          title: "Items",
          description: "Exactly 8 items. Numbered badges (01–08) computed at render time.",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "head",
                  title: "Head",
                  type: "string",
                  validation: (Rule) => Rule.required().max(80),
                }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required().max(320),
                }),
              ],
            },
          ],
          initialValue: [
            { head: "Drafting the notice letter", body: "A clean, professional letter to your current MSP. We give you the draft; you send it." },
            { head: "Credential handover", body: "We coordinate the privileged-access transfer directly with their team — admin accounts, password vaults, certificate stores." },
            { head: "Documentation request", body: "A formal request for the runbooks and configs they have on file. If they refuse, we rebuild from scratch and document better." },
            { head: "Side-by-side coverage", body: "During the handover window, both MSPs cover tickets. Your team never has a \"who do I call?\" moment." },
            { head: "Tool removal", body: "Their monitoring agents, RMM clients, and remote-access tools come off every endpoint, audited and verified." },
            { head: "Vendor re-pointing", body: "We re-point your Comcast, Microsoft, line-of-business vendor accounts to PHT as the technical contact." },
            { head: "Backup verification", body: "Before we say \"steady state,\" we run a real restore. Backups that haven't been tested aren't backups." },
            { head: "Off-board confirmation", body: "Written confirmation that the previous MSP's access is fully revoked — sent to you, kept in your runbook." },
          ],
          validation: (Rule) => Rule.required().length(8),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Compare ──
    defineField({
      name: "compare",
      title: "Comparison Table",
      type: "object",
      group: "compare",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Side by side",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "rows",
          title: "Rows",
          description: "Each row: aspect (left) / current MSP (middle) / PHT (right).",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "aspect",
                  title: "Aspect",
                  type: "string",
                  validation: (Rule) => Rule.required().max(60),
                }),
                defineField({
                  name: "currentMsp",
                  title: "Your current MSP",
                  type: "string",
                  validation: (Rule) => Rule.required().max(160),
                }),
                defineField({
                  name: "pht",
                  title: "Prime Hour Tech",
                  type: "string",
                  validation: (Rule) => Rule.required().max(160),
                }),
              ],
            },
          ],
          initialValue: [
            { aspect: "First-touch response", currentMsp: "2 – 6 hours via ticket queue", pht: "< 15 minutes from a named engineer" },
            { aspect: "Pricing model", currentMsp: "Hourly + project fees on top of \"managed\"", pht: "Flat per-seat monthly. All-inclusive." },
            { aspect: "Engineer continuity", currentMsp: "Whoever the queue routes today", pht: "One named engineer. Their photo, line, email." },
            { aspect: "After-hours", currentMsp: "Surcharge — or unreachable", pht: "On-call engineer's cell. No surcharge." },
            { aspect: "Documentation", currentMsp: "Vendor-internal, you never see it", pht: "A runbook you own. Markdown + PDF." },
            { aspect: "Contract", currentMsp: "2 – 3 year auto-renew lock-in", pht: "Month-to-month after 90 days." },
            { aspect: "QBR cadence", currentMsp: "Annual, if you ask", pht: "Quarterly. With the founder." },
            { aspect: "Where engineers live", currentMsp: "Offshore tier-1, US tier-2", pht: "All in Salt Lake & Utah Valley." },
          ],
          validation: (Rule) => Rule.required().min(4).max(12),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Promises ──
    defineField({
      name: "promises",
      title: "Four Promises",
      type: "object",
      group: "promises",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "The four promises",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "items",
          title: "Promises",
          description: "Exactly 4 promises. Icons: shield / file / lock / users in design.",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "iconName",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: ICON_OPTIONS.map((v) => ({ title: v, value: v })),
                    layout: "dropdown",
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "head",
                  title: "Head",
                  type: "string",
                  validation: (Rule) => Rule.required().max(60),
                }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required().max(280),
                }),
              ],
            },
          ],
          initialValue: [
            {
              iconName: "shield",
              head: "No coverage gap.",
              body: "Side-by-side coverage from the day you sign through the day the previous MSP is fully off-boarded. Your team never wonders who to call.",
            },
            {
              iconName: "file",
              head: "You own your runbook.",
              body: "Markdown + PDF handed over at the end of every migration. If you ever leave us, the runbook leaves with you — that's the deal.",
            },
            {
              iconName: "lock",
              head: "No multi-year lock-in.",
              body: "Month-to-month after the first 90 days. If we're not earning the seat every month, you should be able to walk.",
            },
            {
              iconName: "users",
              head: "You meet the team.",
              body: "You're introduced to your named engineer in week one. The founder is on every QBR. No phantom \"account managers\" in between.",
            },
          ],
          validation: (Rule) => Rule.required().length(4),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Testimonial ──
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      group: "testimonial",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "A recent switch",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "quote",
          title: "Quote",
          description: "Italic serif pull quote.",
          type: "text",
          rows: 4,
          initialValue:
            "I'd been told switching MSPs was a four-month nightmare. It wasn't. They ran their thing in parallel with our old MSP for two weeks, and by the time we cut over, my team didn't even notice — except that tickets started getting answered the same day.",
          validation: (Rule) => Rule.required().max(800),
        }),
        defineField({
          name: "name",
          title: "Name / Title",
          type: "string",
          initialValue: "Operations Director",
          validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
          name: "role",
          title: "Role / Company",
          type: "string",
          initialValue: "Professional services firm · Salt Lake City · 42 seats",
          validation: (Rule) => Rule.required().max(120),
        }),
        defineField({
          name: "cardEyebrow",
          title: "Card Eyebrow",
          type: "string",
          initialValue: "Migration outcome",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "metricK",
          title: "Metric Value",
          type: "string",
          initialValue: "14 days",
          validation: (Rule) => Rule.required().max(24),
        }),
        defineField({
          name: "metricV",
          title: "Metric Caption",
          type: "text",
          rows: 2,
          initialValue: "Old MSP fully off-boarded",
          validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
          name: "locationLabel",
          title: "Location Label",
          description: 'Small bottom-row label, e.g. "Salt Lake City · Professional services".',
          type: "string",
          initialValue: "Salt Lake City · Professional services",
          validation: (Rule) => Rule.required().max(80),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── FAQ ──
    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      group: "faq",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "The honest questions",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "deck",
          title: "Deck",
          type: "text",
          rows: 3,
          initialValue:
            "If yours isn't here, ask on the discovery call — we'll give a real answer, even if it's \"that depends.\"",
          validation: (Rule) => Rule.required().max(400),
        }),
        defineField({
          name: "items",
          title: "Q&A Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                  validation: (Rule) => Rule.required().max(160),
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required().max(800),
                }),
              ],
            },
          ],
          initialValue: [
            {
              question: "Will my team experience downtime during the switch?",
              answer: "No — that's the whole point of side-by-side coverage. Until the old MSP is off-boarded, both teams have access. Your end-users don't notice a cut-over day; they notice that tickets start getting answered faster.",
            },
            {
              question: "What if my current MSP won't hand over documentation?",
              answer: "It happens. Their contract usually says they own the runbooks. We assume that and rebuild from scratch — and frankly, we document better than most of the MSPs we replace. The handover request still goes; we just don't depend on it.",
            },
            {
              question: "I'm in a multi-year contract. Can I still switch?",
              answer: "Usually yes. Most MSP contracts have a 60- or 90-day notice clause buried in them. We'll read your contract with you on the discovery call and tell you what your real exit window is.",
            },
            {
              question: "How do you handle credentials and admin access?",
              answer: "Via a formal privileged-access handover — coordinated directly between our security lead and their senior engineer. Old credentials are rotated; new ones go into your vault, which you own. Nothing sits in a Slack channel.",
            },
            {
              question: "What does the transition cost?",
              answer: "Onboarding is included in the first month's flat rate for migrations under 100 seats. Larger transitions get a one-time onboarding fee, quoted in writing on the SOW. There are no per-hour surprises.",
            },
            {
              question: "What if we decide you're not the right fit halfway through?",
              answer: "You walk. The first 90 days exist specifically for this — both sides should know if it's working. If you leave in that window, you take the runbook with you and we hand back the keys cleanly. No drama.",
            },
          ],
          validation: (Rule) => Rule.required().min(3).max(12),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── CTA ──
    defineField({
      name: "cta",
      title: "Closing CTA",
      type: "object",
      group: "cta",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Want to talk?",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "deck",
          title: "Deck",
          type: "text",
          rows: 4,
          initialValue:
            "30 minutes with the founder. Bring your current MSP's contract if you have it handy — we'll read the exit clause with you and tell you what your real timeline looks like. No pressure. If we're not the right fit, we'll tell you who is.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          initialValue: "Schedule the switching call",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "href",
          title: "Button URL",
          type: "string",
          initialValue: "/contact",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Switching Page" }),
  },
});
