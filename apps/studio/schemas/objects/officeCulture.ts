import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const officeCulture = defineType({
  name: "officeCulture",
  title: "Office / Culture",
  type: "object",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect Ratio",
      type: "string",
      options: {
        list: [
          { title: "4:3", value: "4/3" },
          { title: "1:1 — square", value: "1/1" },
          { title: "3:4 — portrait", value: "3/4" },
        ],
        layout: "radio",
      },
      initialValue: "4/3",
      validation: (Rule) => Rule.required(),
    }),
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
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().max(480),
    }),
    defineField({
      name: "bullets",
      title: "Check-Bullets",
      type: "array",
      of: [{ type: "string", validation: (Rule) => Rule.max(120) }],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", headline: "heading.0.children.0.text" },
    prepare: ({ eyebrow, headline }: { eyebrow?: string; headline?: string }) => {
      const subtitleParts = [eyebrow, headline].filter(Boolean);
      return {
        title: "Office / culture",
        subtitle: subtitleParts.join(" · ") || "—",
        media: HomeIcon,
      };
    },
  },
});
