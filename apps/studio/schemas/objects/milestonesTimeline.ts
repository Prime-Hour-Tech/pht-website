import { defineType, defineField } from "sanity";

export const milestonesTimeline = defineType({
  name: "milestonesTimeline",
  title: "Milestones Timeline",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
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
      description: "Optional short paragraph below the heading.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "items",
      title: "Milestones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "date",
              title: "Date",
              description: "Free-form, e.g., \"Q1 2024\".",
              type: "string",
              validation: (Rule) => Rule.required().max(24),
            }),
            defineField({
              name: "title",
              title: "Milestone Title",
              type: "string",
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "body",
              title: "Milestone Body",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(320),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(12),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", count: "items.length" },
    prepare: ({ eyebrow, count }) => ({
      title: "Milestones Timeline",
      subtitle: `${eyebrow ?? "?"} · ${count ?? 0} items`,
    }),
  },
});
