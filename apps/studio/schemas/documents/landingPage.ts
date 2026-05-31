import { defineType, defineField } from "sanity";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  // Multi-instance doc type. Each instance generates one route at
  // /landing/{slug}. NOT a singleton; sidebar auto-lists via the
  // existing documentTypeListItems() fallback in sanity.config.ts.
  groups: [
    { name: "seo", title: "SEO + Slug" },
    { name: "hero", title: "Hero" },
    { name: "form", title: "Discovery Form" },
    { name: "trustBar", title: "Trust Bar" },
    { name: "problem", title: "Problem" },
    { name: "included", title: "What's Included" },
    { name: "howItWorks", title: "How It Works" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Closing CTA" },
  ],
  fields: [
    // ── SEO ──
    defineField({
      name: "title",
      title: "Internal Title",
      description: "Studio listing label. Not rendered on the site (use hero.metaEyebrow / hero.title for visible copy).",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL path. Route is /landing/{slug}.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      description: "Used in the <title> tag. Falls back to Internal Title.",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      description: "Meta description. Falls back to site default.",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      description: "Falls back to site default.",
      type: "image",
      options: { hotspot: true },
      group: "seo",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ── Hero ──
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "metaEyebrow",
          title: "Meta Eyebrow",
          description: "Small uppercase eyebrow. The leading diamond ◆ and accent rail are added by the layout.",
          type: "string",
          initialValue: "Managed IT · Salt Lake City",
          validation: (Rule) => Rule.required().max(80),
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
            "Flat-rate, 24/7 monitoring, and a named engineer who knows your stack. No call centers, no offshore tier-1, no surprise tickets at the end of the month.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "ctaPrimaryLabel",
          title: "Primary CTA Label",
          type: "string",
          initialValue: "Schedule a 30-min discovery call",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "ctaPrimaryHref",
          title: "Primary CTA URL",
          description: 'Defaults to anchor "#discovery-form" which scrolls to the form on the right of the hero.',
          type: "string",
          initialValue: "#discovery-form",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "heroStats",
          title: "Hero Stats",
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
            { k: "< 15 min", v: "Median first-touch · business hours" },
            { k: "99.9%", v: "Uptime SLA on managed endpoints" },
            { k: "Real", v: "Engineers, in Sugar House, SLC" },
            { k: "Flat", v: "Monthly rate · no per-ticket bills" },
          ],
          validation: (Rule) => Rule.required().length(4),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Form ──
    defineField({
      name: "form",
      title: "Discovery Form",
      type: "object",
      group: "form",
      fields: [
        defineField({
          name: "cardEyebrow",
          title: "Card Eyebrow",
          description: "Small uppercase label at the top of the form card. Diamond ◆ added in template.",
          type: "string",
          initialValue: "Free 30-min discovery call",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "heading",
          title: "Form Heading",
          type: "string",
          initialValue: "Talk to the founder, not a salesperson.",
          validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
          name: "deck",
          title: "Form Deck",
          type: "text",
          rows: 3,
          initialValue: "No prep needed. We'll ask about your environment and tell you honestly if we're a fit.",
          validation: (Rule) => Rule.required().max(240),
        }),
        defineField({
          name: "situationPlaceholder",
          title: "\"What's the situation?\" Placeholder",
          description: "Placeholder text inside the optional situation textarea. Changes by campaign tone.",
          type: "text",
          rows: 2,
          initialValue: "Looking to switch MSPs — current one keeps missing tickets…",
          validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
          name: "submitLabel",
          title: "Submit Button Label",
          type: "string",
          initialValue: "Schedule discovery call",
          validation: (Rule) => Rule.required().max(32),
        }),
        defineField({
          name: "replyNote",
          title: "Reply Note",
          description: "Small status pill beneath the submit button.",
          type: "string",
          initialValue: "Replies within 1 business hr",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "successHeading",
          title: "Success State Heading",
          type: "string",
          initialValue: "Thanks — we'll be in touch.",
          validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
          name: "successBody",
          title: "Success State Body",
          type: "text",
          rows: 3,
          initialValue:
            "We've got your message and you'll hear from us within one business hour during business days. For anything urgent, call us directly.",
          validation: (Rule) => Rule.required().max(240),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Trust Bar ──
    defineField({
      name: "trustBar",
      title: "Trust Bar",
      type: "object",
      group: "trustBar",
      fields: [
        defineField({
          name: "prefixLabel",
          title: "Prefix Label",
          description: "Small uppercase prefix; pin/compass icon prepended in template.",
          type: "string",
          initialValue: "Trusted by SLC businesses",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "items",
          title: "Items",
          description: "Bullet-separated trust strings; 3-8.",
          type: "array",
          of: [{ type: "string", validation: (Rule) => Rule.max(32) }],
          initialValue: [
            "Salt Lake City based",
            "CIS v8 aligned",
            "Microsoft Tier-1 partner",
            "HIPAA-aware",
            "Cyber-insurance friendly",
          ],
          validation: (Rule) => Rule.required().min(3).max(8),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Problem ──
    defineField({
      name: "problem",
      title: "Problem",
      type: "object",
      group: "problem",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "The reason you're here",
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
            "Most of the SLC businesses who call us are coming off the exact same set of frustrations. We hear it on the first call, every time.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "items",
          title: "Pain Items",
          description: "Exactly 3 pain items. Numbering (Pain · 01/02/03) is computed at render time.",
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
              ],
            },
          ],
          initialValue: [
            {
              head: "Tickets disappear into a queue.",
              body: "You send an email, get an auto-reply, and a stranger calls you back hours later asking for context you already gave the last stranger.",
            },
            {
              head: "The bill is a surprise.",
              body: "Hourly billing, after-hours surcharges, project fees that weren't in writing. You stopped opening the invoice cold.",
            },
            {
              head: "Nobody owns your environment.",
              body: "No documentation. No named engineer. The person who set up your firewall left the MSP two years ago and nobody told you.",
            },
          ],
          validation: (Rule) => Rule.required().length(3),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Included ──
    defineField({
      name: "included",
      title: "What Flat-Rate Covers",
      type: "object",
      group: "included",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "What flat-rate actually covers",
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
            "No tiering, no \"premium\" upgrade tier, no surcharge for after-hours. If it falls under managed IT, it's included.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "bullets",
          title: "Bullets",
          description: "6-10 bullets. Each one is head + body.",
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
                  rows: 2,
                  validation: (Rule) => Rule.required().max(240),
                }),
              ],
            },
          ],
          initialValue: [
            { head: "24/7 endpoint monitoring", body: "Every workstation and server watched continuously for health, security, and uptime." },
            { head: "Unlimited helpdesk", body: "Real engineers in SLC, on the phone or remote-in. No ticket caps." },
            { head: "Patch & vulnerability management", body: "OS, application, and firmware patches on a managed cadence." },
            { head: "Endpoint protection (EDR-grade)", body: "Defender for Business or SentinelOne, properly tuned and monitored." },
            { head: "MFA + identity hygiene", body: "MFA on every admin account, conditional access policies, quarterly reviews." },
            { head: "Backup verification", body: "Daily verified restores — backups that haven't been tested aren't backups." },
            { head: "Vendor management", body: "We handle the Comcast / Microsoft / line-of-business escalations on your behalf." },
            { head: "On-site visits", body: "Quarterly minimum. More if your office needs it. Included along the Wasatch Front." },
          ],
          validation: (Rule) => Rule.required().min(6).max(10),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── How It Works ──
    defineField({
      name: "howItWorks",
      title: "How It Works",
      type: "object",
      group: "howItWorks",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "How it works",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "headline",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "steps",
          title: "Steps",
          description: "Exactly 3 steps. `k` is the phase label (e.g., \"Week 1\"). Step numbers (01/02/03) computed at render time.",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "k",
                  title: "Phase Label",
                  type: "string",
                  validation: (Rule) => Rule.required().max(20),
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
                  validation: (Rule) => Rule.required().max(480),
                }),
              ],
            },
          ],
          initialValue: [
            {
              k: "Week 1",
              head: "Discovery & SOW",
              body: "30-minute call, environment walkthrough, written scope and price before anyone touches a wire. You see the SOW before signing.",
            },
            {
              k: "Week 2",
              head: "Onboarding & baseline",
              body: "We document your environment, deploy monitoring + EDR, and close the obvious security gaps. You meet your named engineer.",
            },
            {
              k: "Week 3+",
              head: "Steady state",
              body: "Helpdesk live, monitoring tuned, monthly summary, and a quarterly business review on the calendar with the founder.",
            },
          ],
          validation: (Rule) => Rule.required().length(3),
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
          initialValue: "Common questions",
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
          initialValue: "If yours isn't here, ask on the discovery call — we'll give a real answer.",
          validation: (Rule) => Rule.required().max(240),
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
              question: "What does \"flat rate\" actually mean?",
              answer: "A single monthly per-seat number that covers helpdesk, monitoring, patching, EDR, MFA, and managed-services time at any hour. Projects (office moves, server replacements) are quoted separately and always in writing first.",
            },
            {
              question: "Do you really answer the phone yourselves?",
              answer: "Yes. Calls during business hours go straight to a named engineer; after hours they go to the on-call engineer's personal cell. We do not run a call-center.",
            },
            {
              question: "Are you local to Salt Lake City?",
              answer: "Every engineer lives in the Salt Lake or Utah Valley. Our office is in Sugar House. On-site is included for clients along the Wasatch Front; we also do remote-first for clients in Park City, Heber, and Logan.",
            },
            {
              question: "How long is the contract?",
              answer: "Month-to-month after the first 90 days. We don't use multi-year lock-ins; if we're not earning the seat every month, you should be able to leave.",
            },
            {
              question: "What if we already have an internal IT person?",
              answer: "Most of our larger clients do. We augment — we run helpdesk, monitoring, and after-hours so your internal person can focus on business-specific systems instead of running tier-1.",
            },
            {
              question: "What does pricing typically look like?",
              answer: "For SLC SMBs in the 15-100 seat range, all-in cost typically lands between $120-185/seat/month depending on security posture and compliance needs. We give you the exact number after the discovery call.",
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
          initialValue: "Ready when you are",
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
            "30 minutes with the founder. We'll look at your environment, your team, and tell you honestly whether managed IT from PHT is a fit — even if the answer is 'not yet'.",
          validation: (Rule) => Rule.required().max(480),
        }),
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          initialValue: "Schedule a 30-min discovery call",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "href",
          title: "Button URL",
          description: 'Either "/contact" or "#discovery-form" (in-page) — author\'s call.',
          type: "string",
          initialValue: "/contact",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title: title ?? "Landing Page",
      subtitle: slug ? `/landing/${slug}` : "(no slug)",
    }),
  },
});
