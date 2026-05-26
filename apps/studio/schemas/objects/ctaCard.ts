import { defineType, defineField } from "sanity";

export const ctaCard = defineType({
  name: "ctaCard",
  title: "CTA Card",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      description:
        "Main heading. To finish with an italic accent-red fragment (the editorial flourish in the design), put the trailing fragment in \"Heading Accent\" below.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent (optional)",
      description:
        "Optional trailing fragment rendered italic + accent red. e.g., for \"Let's talk about what's slowing you down.\" enter heading = \"Let's talk about\" and this field = \"what's slowing you down.\"",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "deck",
      title: "Deck",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
      initialValue: "Schedule a discovery call",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA URL",
      type: "string",
      initialValue: "/contact",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title ? `${title} (CTA)` : "CTA Card",
      subtitle: "Block",
    }),
  },
});
