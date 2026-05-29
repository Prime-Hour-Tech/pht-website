import { defineType, defineField } from "sanity";
import { SparkleIcon } from "@sanity/icons";

export const beliefs = defineType({
  name: "beliefs",
  title: "Beliefs Section",
  type: "object",
  icon: SparkleIcon,
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
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "items",
      title: "Beliefs",
      description: "Numbered P/01 … P/0N rendering.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", headline: "heading", items: "items" },
    prepare: ({ eyebrow, items }: { eyebrow?: string; headline?: string; items?: unknown[] }) => {
      const subtitleParts = [items?.length ? items.length + " beliefs" : null, eyebrow || null].filter(Boolean);
      return {
        title: "Beliefs",
        subtitle: subtitleParts.join(" · ") || "—",
        media: SparkleIcon,
      };
    },
  },
});
