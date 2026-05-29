import { defineType, defineField, defineArrayMember } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const teamGrid = defineType({
  name: "teamGrid",
  title: "Team Grid",
  type: "object",
  icon: UsersIcon,
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
      description: "Optional body paragraph under the heading.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "sideLink",
      title: "Side Link (optional)",
      description: "Right-aligned link next to the heading. e.g., \"Read about our story →\"",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "members",
      title: "Team Members",
      description: "Select team members to feature. Order in this list controls display order (or use the member's own order field).",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "teamMember" }],
        }),
      ],
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", members: "members" },
    prepare: ({ eyebrow, members }: { eyebrow?: string; members?: unknown[] }) => {
      const subtitleParts = [members?.length ? members.length + " members" : null, eyebrow || null].filter(Boolean);
      return {
        title: "Team grid",
        subtitle: subtitleParts.join(" · ") || "—",
        media: UsersIcon,
      };
    },
  },
});
