import { defineType, defineField, defineArrayMember } from "sanity";

export const headaches = defineType({
  name: "headaches",
  title: "Headaches Section",
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
      name: "items",
      title: "Pain / Fix Items",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(12),
      of: [
        defineArrayMember({
          type: "object",
          name: "headacheItem",
          fields: [
            defineField({
              name: "pain",
              title: "Pain",
              type: "string",
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: "fix",
              title: "What we do",
              type: "string",
              validation: (Rule) => Rule.required().max(200),
            }),
          ],
          preview: { select: { title: "pain", subtitle: "fix" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title ?? "Headaches",
      subtitle: "Block",
    }),
  },
});
