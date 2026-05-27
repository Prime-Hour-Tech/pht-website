import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "approach", title: "Approach" },
    { name: "capabilities", title: "Capabilities" },
    { name: "stats", title: "Stats" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    // ── Default (uncategorized) fields — appear first in the editor ──
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(64),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL path. The route is /services/{slug}.",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      description: "Plain-spoken one-liner. Shown on the Home and /services list, and on the Other Services row of sibling service pages.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "iconName",
      title: "Icon",
      description: "Which glyph to render in the services list and on this service page's hero/capability cards.",
      type: "string",
      options: {
        list: [
          { title: "Monitor", value: "monitor" },
          { title: "Shield", value: "shield" },
          { title: "Cloud", value: "cloud" },
          { title: "Server", value: "server" },
          { title: "Compass", value: "compass" },
          { title: "Globe", value: "globe" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Sort key. Lower numbers render first across all services lists.",
      type: "number",
      validation: (Rule) => Rule.required().integer(),
    }),

    // ── Hero group ──
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "e.g., \"Service · 01 of 06\". Manual entry — not auto-derived from order.",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deck",
      title: "Deck",
      description: "Subhead paragraph below the headline.",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "heroStat",
      title: "Hero Stat (At a glance)",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "k",
          title: "Value",
          description: "Big serif number/text. e.g., \"24/7\", \"CIS v8\", \"99.99%\".",
          type: "string",
          validation: (Rule) => Rule.required().max(32),
        }),
        defineField({
          name: "v",
          title: "Label",
          description: "Caption under the value. e.g., \"Monitoring on every endpoint\".",
          type: "string",
          validation: (Rule) => Rule.required().max(64),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroPillLeft",
      title: "Hero Pill (left)",
      description: "Optional bottom-left footer pill on the stat card. e.g., \"Included in managed\".",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "heroPillRight",
      title: "Hero Pill (right)",
      description: "Optional bottom-right footer pill on the stat card. e.g., \"SLA · 15-min\".",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.max(40),
    }),

    // ── Approach group ──
    defineField({
      name: "sectionEyebrow",
      title: "Section Eyebrow",
      description: "Small uppercase eyebrow above the approach heading. e.g., \"How it works\".",
      type: "string",
      group: "approach",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "sectionHeading",
      title: "Section Heading",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      group: "approach",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionBody",
      title: "Section Body",
      type: "text",
      rows: 4,
      group: "approach",
      validation: (Rule) => Rule.required().max(600),
    }),
    defineField({
      name: "sectionBullets",
      title: "Section Bullets",
      description: "Check-bulleted list under the body.",
      type: "array",
      of: [{ type: "string", validation: (Rule) => Rule.max(120) }],
      group: "approach",
      validation: (Rule) => Rule.required().min(2).max(6),
    }),

    // ── Capabilities group ──
    defineField({
      name: "capabilitiesHeading",
      title: "Capabilities Heading",
      description: "e.g., \"6 capabilities. *One SLA.*\" (with accent on \"One SLA.\")",
      type: "headline",
      group: "capabilities",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      group: "capabilities",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Capability Name",
              description: "Short title, sentence-case. e.g., \"Workstation Management\".",
              type: "string",
              validation: (Rule) => Rule.required().max(48),
            }),
            defineField({
              name: "body",
              title: "Capability Body",
              description: "1 sentence, plain-spoken. e.g., \"Setup, management, and optimization of every endpoint.\"",
              type: "string",
              validation: (Rule) => Rule.required().max(160),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(9),
    }),

    // ── Stats group ──
    defineField({
      name: "statStrip",
      title: "Stat Strip",
      description: "Exactly 4 stats. Big serif value + small mono caption.",
      type: "array",
      group: "stats",
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
      validation: (Rule) => Rule.required().length(4),
    }),

    // ── FAQ group ──
    defineField({
      name: "faqHeading",
      title: "FAQ Heading",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      group: "faq",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              description: "Natural phrasing — the way an owner would ask it.",
              type: "string",
              validation: (Rule) => Rule.required().max(140),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              description: "2–4 sentences. Plain-spoken; specific numbers/policies where possible.",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required().max(600),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
  ],
  preview: {
    select: { title: "name", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug ? `/services/${slug}` : "(no slug)",
    }),
  },
});
