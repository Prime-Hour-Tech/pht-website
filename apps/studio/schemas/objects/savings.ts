import { defineType, defineField, defineArrayMember } from "sanity";

export const savings = defineType({
  name: "savings",
  title: "Savings Section",
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
      type: "string",
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
      name: "bulletList",
      title: "Bullet List",
      description: "Short items below the deck. Checkmark icon prepended.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "chart",
      title: "Bar Chart",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "caption",
          title: "Caption",
          description: "Mono label above the chart. e.g., \"Monthly IT spend · representative 25-seat client\"",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "categories",
          title: "Categories",
          description: "Each row shows before vs. after PHT spend in dollars per month.",
          type: "array",
          validation: (Rule) => Rule.required().min(2).max(10),
          of: [
            defineArrayMember({
              type: "object",
              name: "savingsCategory",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required().max(40),
                }),
                defineField({
                  name: "before",
                  title: "Before ($/mo)",
                  type: "number",
                  validation: (Rule) => Rule.required().min(0).integer(),
                }),
                defineField({
                  name: "after",
                  title: "After ($/mo)",
                  type: "number",
                  validation: (Rule) => Rule.required().min(0).integer(),
                }),
              ],
              preview: {
                select: { title: "label", before: "before", after: "after" },
                prepare: ({ title, before, after }) => ({
                  title,
                  subtitle: `$${before ?? 0} → $${after ?? 0}/mo`,
                }),
              },
            }),
          ],
        }),
        defineField({
          name: "footnote",
          title: "Footnote",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.max(240),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title ?? "Savings",
      subtitle: "Block",
    }),
  },
});
