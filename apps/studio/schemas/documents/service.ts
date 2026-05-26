import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(64),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL path. Used by the Service template route (built in Slice 3).",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      description: "Plain-spoken one-liner. Shown on the Home services list.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "iconName",
      title: "Icon",
      description: "Which glyph to render in the services list.",
      type: "string",
      options: {
        list: [
          { title: "Monitor", value: "monitor" },
          { title: "Shield", value: "shield" },
          { title: "Cloud", value: "cloud" },
          { title: "Server", value: "server" },
          { title: "Compass", value: "compass" },
          { title: "Globe", value: "globe" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
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
    select: { title: "name", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug ? `/${slug}` : "(no slug)",
    }),
  },
});
