import { defineType, defineField } from "sanity";

const ctaLinkField = (name: string, title: string, labelDefault: string, hrefDefault: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "label",
        title: "Label",
        type: "string",
        initialValue: labelDefault,
        validation: (Rule) => Rule.required().max(32),
      }),
      defineField({
        name: "href",
        title: "URL",
        type: "string",
        initialValue: hrefDefault,
        validation: (Rule) => Rule.required(),
      }),
    ],
    validation: (Rule) => Rule.required(),
  });

export const industriesDontSeeYours = defineType({
  name: "industriesDontSeeYours",
  title: "Industries — Don't See Yours",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Don't see yours?",
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
      validation: (Rule) => Rule.required().max(360),
    }),
    ctaLinkField("primaryCta", "Primary CTA", "Schedule a discovery call", "/contact"),
    ctaLinkField("secondaryCta", "Secondary CTA", "Read about our approach", "/about"),
  ],
  preview: {
    select: { eyebrow: "eyebrow" },
    prepare: ({ eyebrow }) => ({
      title: "Don't See Yours? (Industries CTA)",
      subtitle: eyebrow ?? "Block",
    }),
  },
});
