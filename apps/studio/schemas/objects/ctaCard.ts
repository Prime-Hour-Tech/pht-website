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
        "Main heading. Select a span and click \"Italic accent\" in the toolbar to apply the editorial italic + red styling to a fragment.",
      type: "headline",
      validation: (Rule) => Rule.required(),
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
    select: { heading: "heading" },
    prepare: ({ heading }) => {
      // heading is now a Portable Text array; extract first block's text.
      const firstBlock = Array.isArray(heading) ? heading[0] : null;
      const text =
        firstBlock && Array.isArray(firstBlock.children)
          ? firstBlock.children.map((c: { text?: string }) => c.text ?? "").join("")
          : "";
      return {
        title: text ? `${text} (CTA)` : "CTA Card",
        subtitle: "Block",
      };
    },
  },
});
