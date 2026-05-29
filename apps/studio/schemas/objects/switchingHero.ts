import { defineType, defineField } from "sanity";

export const switchingHero = defineType({
  name: "switchingHero",
  title: "Switching Hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Switching MSPs · Salt Lake City",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({ name: "title", title: "Title", type: "headline", validation: (Rule) => Rule.required() }),
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
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required().max(40) }),
              defineField({ name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required().max(60) }),
            ],
          }],
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
      type: "string",
      initialValue: "Fact sheet · what to expect",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "liveDotLabel",
      title: "Live-Dot Label",
      type: "string",
      initialValue: "Booking switching calls this week",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "k", title: "Value", type: "string", validation: (Rule) => Rule.required().max(16) }),
          defineField({ name: "v", title: "Caption", type: "string", validation: (Rule) => Rule.required().max(64) }),
        ],
      }],
      initialValue: [
        { k: "30 days", v: "Median time to steady state" },
        { k: "0", v: "Coverage gap during handoff" },
        { k: "You", v: "Own every credential & doc at the end" },
        { k: "M-to-M", v: "Month-to-month after 90 days" },
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],
  preview: { prepare: () => ({ title: "Switching Hero" }) },
});
