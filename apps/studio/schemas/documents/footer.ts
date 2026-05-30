import { defineType, defineField, defineArrayMember } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  // Singleton; registered in apps/studio/sanity.config.ts SINGLETONS array.
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Optional short line under the wordmark in the footer.",
      type: "string",
    }),
    defineField({
      name: "columns",
      title: "Link Columns",
      description: "Up to 4 columns of navigation-style footer links.",
      type: "array",
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "footerColumn",
          fields: [
            defineField({
              name: "heading",
              title: "Column Heading",
              type: "string",
              validation: (Rule) => Rule.required().max(32),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              validation: (Rule) => Rule.required().min(1).max(8),
              of: [
                defineArrayMember({
                  type: "object",
                  name: "footerLink",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required().max(40),
                    }),
                    defineField({
                      name: "href",
                      title: "URL",
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
          ],
          preview: {
            select: { title: "heading" },
          },
        }),
      ],
    }),
    defineField({
      name: "bottomLinks",
      title: "Bottom Row Links",
      description: "Legal / utility links — typically Terms, Privacy, etc.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "bottomLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "X / Twitter", value: "x" },
                  { title: "YouTube", value: "youtube" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Line",
      description: "Use {{year}} to substitute the current year at render time.",
      type: "string",
      initialValue: "© {{year}} Prime Hour Tech. All rights reserved.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Footer" }),
  },
});
