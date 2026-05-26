import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(64),
    }),
    defineField({
      name: "role",
      title: "Role",
      description: "e.g., Strategy · vCIO · MSP Lead",
      type: "string",
      validation: (Rule) => Rule.required().max(64),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      description: "One short paragraph. Shown on Home and About.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      description: "4:5 aspect ratio recommended. Falls back to a grey placeholder if absent.",
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
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Sort key. Lower numbers render first.",
      type: "number",
      validation: (Rule) => Rule.required().integer(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
