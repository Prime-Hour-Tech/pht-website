import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "ctaLabel",
      title: "Call-to-action Label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "Call-to-action URL",
      type: "string",
      description: "Absolute or root-relative URL (e.g., /contact or https://...)",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title ?? "Hero (no heading)", subtitle: "Hero block" }),
  },
});
