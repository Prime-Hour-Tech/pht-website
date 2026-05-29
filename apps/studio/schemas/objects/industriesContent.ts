import { defineType, defineField } from "sanity";

const ICON_OPTIONS = [
  "monitor", "shield", "cloud", "server", "compass", "globe",
  "file", "users", "spark", "phone", "mail", "check", "arrow", "arrowSm", "chevron",
];

export const industriesContent = defineType({
  name: "industriesContent",
  title: "Industries Content",
  type: "object",
  fields: [
    defineField({
      name: "jumpLabel",
      title: "Jump Nav Label",
      description: "Small uppercase label at the start of the sticky pill row.",
      type: "string",
      initialValue: "Jump to:",
      validation: (Rule) => Rule.required().max(24),
    }),
    defineField({
      name: "verticals",
      title: "Industry Verticals",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Anchor ID",
              description: "URL anchor (e.g., #professional-services). Derived from name; edit if needed.",
              type: "slug",
              options: { source: "name", maxLength: 48 },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "iconName",
              title: "Icon",
              description: "Icon glyph for the jump-nav pill + section header.",
              type: "string",
              options: {
                list: ICON_OPTIONS.map((v) => ({ title: v, value: v })),
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "Vertical Name",
              type: "string",
              validation: (Rule) => Rule.required().max(64),
            }),
            defineField({
              name: "sub",
              title: "Sub Label",
              description: "Tagline shown under the name. e.g., \"Law · Accounting · Real Estate · Consulting\".",
              type: "string",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "intro",
              title: "Intro Paragraph",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required().max(480),
            }),
            defineField({
              name: "bullets",
              title: "Bullets (Capabilities)",
              type: "array",
              of: [{ type: "string", validation: (Rule) => Rule.max(120) }],
              validation: (Rule) => Rule.required().min(2).max(8),
            }),
            defineField({
              name: "examples",
              title: "Who in This Category",
              description: "Sidebar list of example businesses in this vertical.",
              type: "array",
              of: [{ type: "string", validation: (Rule) => Rule.max(48) }],
              validation: (Rule) => Rule.required().min(4).max(10),
            }),
          ],
          preview: {
            select: { title: "name", sub: "sub" },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
  ],
  preview: {
    select: { firstName: "verticals.0.name" },
    prepare: ({ firstName }) => ({
      title: "Industries Content",
      subtitle: firstName ? `Starts: ${firstName}` : "Block",
    }),
  },
});
