import { defineType, defineField } from "sanity";

export const bundleGrid = defineType({
  name: "bundleGrid",
  title: "Bundle Grid",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The rest of the stack",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({ name: "heading", title: "Heading", type: "headline", validation: (Rule) => Rule.required() }),
    defineField({ name: "deck", title: "Deck", type: "text", rows: 3, validation: (Rule) => Rule.required().max(320) }),
    defineField({ name: "secondaryLinkLabel", title: "Secondary Link Label", type: "string", validation: (Rule) => Rule.max(60) }),
    defineField({ name: "secondaryLinkHref", title: "Secondary Link URL", type: "string" }),
    defineField({
      name: "tiles",
      title: "Bundle Tiles",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Bundle Name", type: "string", validation: (Rule) => Rule.required().max(60) }),
          defineField({ name: "descriptor", title: "Descriptor", type: "string", validation: (Rule) => Rule.required().max(120) }),
          defineField({ name: "includesLine", title: "Includes Line", type: "string", validation: (Rule) => Rule.required().max(160) }),
        ],
      }],
      validation: (Rule) => Rule.required().length(6),
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
  preview: { prepare: () => ({ title: "Bundle Grid" }) },
});
