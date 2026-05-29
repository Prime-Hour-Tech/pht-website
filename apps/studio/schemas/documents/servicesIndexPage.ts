import { defineType, defineField } from "sanity";

// Reusable shape for a single pricing tier. Same shape for essentials/standard/premier
// to keep the schema symmetric. The `flagLabel` is optional — only `standard`'s
// initialValue uses it (renders as a "★ Most clients land here" chip in the card).
const pricingTierFields = () => [
  defineField({
    name: "tag",
    title: "Tag (Sub-Label)",
    description: 'Small label above the tier name, e.g. "Most popular · 15 – 100 seats".',
    type: "string",
    validation: (Rule) => Rule.required().max(60),
  }),
  defineField({
    name: "tagline",
    title: "Tagline",
    description: "1–2 sentence description shown above the bullets.",
    type: "text",
    rows: 2,
    validation: (Rule) => Rule.required().max(240),
  }),
  defineField({
    name: "price",
    title: "Price (per seat per month)",
    description: "Integer in USD. Rendered as $N / seat / mo.",
    type: "number",
    validation: (Rule) => Rule.required().integer().min(1).max(9999),
  }),
  defineField({
    name: "includesHead",
    title: "Bullets Heading",
    description: 'Small uppercase heading above the bullets, e.g. "Everything in Essentials, plus".',
    type: "string",
    validation: (Rule) => Rule.required().max(60),
  }),
  defineField({
    name: "bullets",
    title: "Included Bullets",
    type: "array",
    of: [{ type: "string", validation: (Rule) => Rule.max(120) }],
    validation: (Rule) => Rule.required().min(4).max(10),
  }),
  defineField({
    name: "ctaLabel",
    title: "CTA Button Label",
    type: "string",
    validation: (Rule) => Rule.required().max(32),
  }),
  defineField({
    name: "ctaHref",
    title: "CTA Button URL",
    type: "string",
    initialValue: "/contact",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "flagLabel",
    title: "Flag Chip (Optional)",
    description: 'Optional small chip rendered above the tier name, e.g. "★ Most clients land here". Standard tier only.',
    type: "string",
    validation: (Rule) => Rule.max(40),
  }),
];

export const servicesIndexPage = defineType({
  name: "servicesIndexPage",
  title: "Services Index Page",
  type: "document",
  // Singleton — registered in apps/studio/sanity.config.ts SINGLETONS array.
  // Backs /services/index.astro.
  groups: [
    { name: "hero", title: "Hero" },
    { name: "featured", title: "Featured Service" },
    { name: "pricing", title: "Pricing" },
    { name: "grid", title: "Service Grid + Bundle" },
    { name: "process", title: "Process Strip" },
    { name: "crosslink", title: "Industry Crosslink" },
    { name: "cta", title: "Closing CTA" },
    { name: "otherServices", title: "Other Services row (used by /services/[slug])" },
  ],
  fields: [
    // ── Hero ──
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      description: "Small uppercase eyebrow above the hero headline. The diamond ◆ is added by the layout.",
      type: "string",
      group: "hero",
      initialValue: "Services",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDeck",
      title: "Hero Deck",
      description: "Subhead paragraph below the hero headline.",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (Rule) => Rule.required().max(320),
    }),

    // ── Featured Service ──
    defineField({
      name: "featuredService",
      title: "Featured Service",
      description: "The service that gets the full-width dark editorial card at the top of /services. Typically managed-it.",
      type: "reference",
      to: [{ type: "service" }],
      group: "featured",
      validation: (Rule) => Rule.required(),
    }),

    // ── Pricing ──
    defineField({
      name: "pricingHeading",
      title: "Pricing Heading",
      type: "object",
      group: "pricing",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Plain-spoken pricing",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use the Italic accent toolbar button to style fragments.",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "deck",
          title: "Deck",
          type: "text",
          rows: 3,
          initialValue:
            "All prices per seat per month, billed monthly. No setup fees, no after-hours surcharges, no ticket caps. Organizations over 100 seats are custom-priced — same model, different math.",
          validation: (Rule) => Rule.required().max(480),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "object",
      group: "pricing",
      fields: [
        defineField({
          name: "essentials",
          title: "Essentials Tier",
          type: "object",
          fields: pricingTierFields(),
          initialValue: {
            tag: "For small teams · 5 – 25 seats",
            tagline: "For small teams that just need the lights to stay on. Helpdesk, monitoring, and patching — flat-rate.",
            price: 125,
            includesHead: "What's in it",
            bullets: [
              "24/7 endpoint monitoring",
              "Unlimited helpdesk · SLC engineers",
              "Patch & vulnerability management",
              "MFA enforcement on admin accounts",
              "Monthly summary report",
              "Vendor management (Comcast, M365, etc.)",
            ],
            ctaLabel: "See if it fits",
            ctaHref: "/contact",
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "standard",
          title: "Standard Tier (featured)",
          type: "object",
          fields: pricingTierFields(),
          initialValue: {
            tag: "Most popular · 15 – 100 seats",
            tagline: "Where most SMBs land. Managed IT plus the cybersecurity baseline we'd want on our own environment.",
            price: 165,
            includesHead: "Everything in Essentials, plus",
            bullets: [
              "EDR-grade endpoint protection",
              "Email security · anti-phishing · DMARC",
              "Conditional access policies",
              "Daily-verified backup restores",
              "Quarterly access reviews",
              "CIS v8 baseline alignment",
            ],
            ctaLabel: "Schedule a discovery call",
            ctaHref: "/contact",
            flagLabel: "★ Most clients land here",
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "premier",
          title: "Premier Tier",
          type: "object",
          fields: pricingTierFields(),
          initialValue: {
            tag: "Strategic · 25 – 150 seats",
            tagline: "For organizations that have outgrown a part-time admin and need strategy, not just support.",
            price: 215,
            includesHead: "Everything in Standard, plus",
            bullets: [
              "Quarterly QBR with the founder",
              "Annual IT budget · built bottom-up",
              "90-day rolling roadmap",
              "Live risk register",
              "Cyber-insurance evidence pack",
              "Vendor renewal negotiation",
            ],
            ctaLabel: "Talk to the founder",
            ctaHref: "/contact",
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricingFooterNote",
      title: "Pricing Footer Note",
      type: "string",
      group: "pricing",
      initialValue: "Month-to-month after first 90 days · No setup fees",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "pricingFooterLinkLabel",
      title: "Pricing Footer Link Label",
      type: "string",
      group: "pricing",
      initialValue: "Over 100 seats? Talk custom pricing",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "pricingFooterLinkHref",
      title: "Pricing Footer Link URL",
      type: "string",
      group: "pricing",
      initialValue: "/contact",
      validation: (Rule) => Rule.required(),
    }),

    // ── Grid + Bundle ──
    defineField({
      name: "gridHeading",
      title: "Service Grid Heading",
      type: "object",
      group: "grid",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "The rest of the stack",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "secondaryLinkLabel",
          title: "Secondary Link Label (Optional)",
          description: 'Right-aligned link above the grid, e.g. "Download the services overview →".',
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "secondaryLinkHref",
          title: "Secondary Link URL (Optional)",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bundleTile",
      title: "Bundle Tile (6th grid slot)",
      type: "object",
      group: "grid",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Most clients",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Bundle them.",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 3,
          initialValue:
            "Most engagements start with Managed IT + Cybersecurity, then layer Cloud or vCIO as the business grows. We price it as one flat monthly — no per-service line items.",
          validation: (Rule) => Rule.required().max(400),
        }),
        defineField({
          name: "rows",
          title: "Bundle Rows",
          description: "Exactly 4 rows. Service label + small descriptor.",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "serviceLabel",
                  title: "Service Label",
                  type: "string",
                  validation: (Rule) => Rule.required().max(32),
                }),
                defineField({
                  name: "descriptor",
                  title: "Descriptor",
                  type: "string",
                  validation: (Rule) => Rule.required().max(32),
                }),
              ],
            },
          ],
          initialValue: [
            { serviceLabel: "Managed IT", descriptor: "Spine" },
            { serviceLabel: "Cybersecurity", descriptor: "CIS v8 baseline" },
            { serviceLabel: "Cloud Services", descriptor: "M365 / Azure" },
            { serviceLabel: "vCIO Advisory", descriptor: "Quarterly" },
          ],
          validation: (Rule) => Rule.required().length(4),
        }),
        defineField({
          name: "footerHeadline",
          title: "Footer Headline",
          description: "Use the Italic accent toolbar button to style fragments.",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "footerLinkLabel",
          title: "Footer Link Label",
          type: "string",
          initialValue: "How pricing works",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "footerLinkHref",
          title: "Footer Link URL",
          type: "string",
          initialValue: "/contact",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Process Strip ──
    defineField({
      name: "processStrip",
      title: "Process Strip",
      type: "object",
      group: "process",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "How every engagement runs",
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
          rows: 3,
          initialValue:
            "Whether it's a 3-week project or a 5-year managed relationship, the operating model is the same: a named engineer who owns your account, monthly check-ins, quarterly reviews, and a written runbook you can take with you if we ever lose the trust to keep it.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "steps",
          title: "Steps",
          description: "Exactly 4 steps.",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Step Title",
                  type: "string",
                  validation: (Rule) => Rule.required().max(40),
                }),
                defineField({
                  name: "body",
                  title: "Step Body",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required().max(240),
                }),
              ],
            },
          ],
          initialValue: [
            {
              title: "Discovery",
              body: "A 30-minute call. We look at your environment, your support load, and tell you honestly whether we're a fit.",
            },
            {
              title: "Written SOW",
              body: "Scope and price in writing before anyone touches a wire. Change requests are also in writing — never verbal.",
            },
            {
              title: "Named engineer",
              body: "One primary on your account from day one. Their photo, direct line, and email — not a generic queue.",
            },
            {
              title: "QBR + runbook",
              body: "Quarterly business review with the founder. Annual budget. A runbook you own and can leave us with.",
            },
          ],
          validation: (Rule) => Rule.required().length(4),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Industry Crosslink ──
    defineField({
      name: "industryCrosslink",
      title: "Industry Crosslink",
      type: "object",
      group: "crosslink",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "See it by industry instead",
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
          rows: 3,
          initialValue:
            "Same flat-rate, named engineers, real humans on the phone — what changes is which controls we prioritize and which software we integrate with. Our industries page breaks it down by vertical.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "ctaLinkLabel",
          title: "CTA Link Label",
          type: "string",
          initialValue: "Browse by industry",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "ctaLinkHref",
          title: "CTA Link URL",
          type: "string",
          initialValue: "/industries",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "tiles",
          title: "Tiles",
          description: "Exactly 4 tiles linking to industry sections.",
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
                    list: [
                      { title: "Monitor", value: "monitor" },
                      { title: "Shield", value: "shield" },
                      { title: "Cloud", value: "cloud" },
                      { title: "Server", value: "server" },
                      { title: "Compass", value: "compass" },
                      { title: "Globe", value: "globe" },
                      { title: "File", value: "file" },
                      { title: "Users", value: "users" },
                      { title: "Spark", value: "spark" },
                    ],
                    layout: "dropdown",
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required().max(40),
                }),
                defineField({
                  name: "sub",
                  title: "Sub-Label",
                  type: "string",
                  validation: (Rule) => Rule.required().max(40),
                }),
                defineField({
                  name: "href",
                  title: "URL",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          initialValue: [
            {
              iconName: "file",
              label: "Professional Services",
              sub: "Law · Accounting",
              href: "/industries#professional-services",
            },
            {
              iconName: "users",
              label: "Small & Mid-Size",
              sub: "10 – 250 seats",
              href: "/industries#smb",
            },
            {
              iconName: "shield",
              label: "Regulated Industries",
              sub: "HIPAA · SOC-2",
              href: "/industries#regulated",
            },
            {
              iconName: "spark",
              label: "Nonprofits & Education",
              sub: "M365 nonprofit",
              href: "/industries#nonprofit",
            },
          ],
          validation: (Rule) => Rule.required().length(4),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Closing CTA (unchanged) ──
    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      description: "Small uppercase eyebrow above the final CTA heading. The diamond ◆ is added by the layout.",
      type: "string",
      group: "cta",
      initialValue: "Choosing a service",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaDeck",
      title: "CTA Deck",
      description: "Pitch under the CTA heading.",
      type: "text",
      rows: 3,
      group: "cta",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      group: "cta",
      initialValue: "Schedule a discovery call",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button URL",
      type: "string",
      group: "cta",
      initialValue: "/contact",
      validation: (Rule) => Rule.required(),
    }),

    // ── Other-services (used by /services/[slug]) — unchanged ──
    defineField({
      name: "otherServicesHeading",
      title: "Other Services Heading",
      description: "Heading above the sibling-services card row at the bottom of each service detail page.",
      type: "string",
      group: "otherServices",
      initialValue: "Other services",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "otherServicesViewAllLabel",
      title: "Other Services View-All Link Label",
      description: "Label for the link at the top-right of the Other Services row.",
      type: "string",
      group: "otherServices",
      initialValue: "View all →",
      validation: (Rule) => Rule.required().max(32),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Services Index Page" }),
  },
});
