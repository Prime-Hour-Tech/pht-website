import { defineType, defineField } from "sanity";

export const storyThreeCol = defineType({
  name: "storyThreeCol",
  title: "Story (3-Column)",
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
      description: "Use the Italic accent toolbar button for fragments.",
      type: "headline",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "columns",
      title: "Columns",
      description: "Exactly 3 columns.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "eyebrow",
              title: "Column Eyebrow",
              type: "string",
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: "heading",
              title: "Column Heading",
              type: "string",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "body",
              title: "Column Body",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required().max(360),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().length(3),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow" },
    prepare: ({ eyebrow }) => ({
      title: eyebrow || "Story (3-Column)",
      subtitle: "Block",
    }),
  },
});
