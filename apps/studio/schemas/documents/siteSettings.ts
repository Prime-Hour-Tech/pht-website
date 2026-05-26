import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singletons: only one instance is allowed.
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Default Site Description",
      description: "Used as fallback meta description.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "logoDark",
      title: "Logo (dark)",
      description:
        "Dark-colored logo for use on LIGHT backgrounds (the navbar). SVG preferred.",
      type: "image",
      options: { hotspot: false },
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
      name: "logoLight",
      title: "Logo (light)",
      description:
        "Light-colored logo for use on DARK backgrounds (the footer). SVG preferred.",
      type: "image",
      options: { hotspot: false },
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
      name: "defaultOgImage",
      title: "Default Open Graph Image",
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
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
