import { defineType, defineField, defineArrayMember } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  // Singleton — registered in apps/studio/sanity.config.ts SINGLETONS array.
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      description: "Used in the Studio listing. Not rendered on the site.",
      type: "string",
      initialValue: "Primary Navigation",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Nav Items",
      description: "4–6 recommended. Order here is order on the site.",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required().max(24),
            }),
            defineField({
              name: "href",
              title: "URL",
              description: "Root-relative (e.g. /about) or absolute (https://...).",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "openInNewTab",
              title: "Open in new tab",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
    defineField({
      name: "ctaButton",
      title: "Right-side CTA Button",
      description: "The accent-filled button on the right of the nav (e.g. 'Schedule a call').",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required().max(32),
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Navigation" }),
  },
});
