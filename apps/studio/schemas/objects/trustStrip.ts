import { defineType, defineField } from "sanity";

export const trustStrip = defineType({
  name: "trustStrip",
  title: "Trust Strip",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Leading Label",
      type: "string",
      initialValue: "Trusted by",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "items",
      title: "Items",
      description: "Client labels or names. Mono uppercase rendering.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(3).max(10),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: `Trust strip (${(items ?? []).length} labels)`,
      subtitle: "Block",
    }),
  },
});
