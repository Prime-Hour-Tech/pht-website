import { defineType, defineField } from "sanity";

export const privacyPage = defineType({
  name: "privacyPage",
  title: "Privacy Page",
  type: "document",
  // Singleton; registered in apps/studio/sanity.config.ts SINGLETONS array.
  // Backs /privacy.
  groups: [
    { name: "header", title: "Header" },
    { name: "summary", title: "Summary Callout" },
    { name: "sections", title: "Sections" },
    { name: "closing", title: "Closing Card" },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "header",
      initialValue: "Privacy Policy",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "header",
      initialValue: "Privacy",
      validation: (Rule) => Rule.required().max(64),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      group: "header",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summaryHeading",
      title: "Summary Heading",
      type: "string",
      group: "summary",
      initialValue: "What we collect and why",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "summaryBody",
      title: "Summary Body",
      description: "Plain-language summary shown in the accent-tinted callout above the sections.",
      type: "array",
      group: "summary",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
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
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description: "Numbered sections (§ 01, § 02, …). Order in array determines numbering.",
      type: "array",
      group: "sections",
      of: [
        {
          type: "object",
          name: "legalSection",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              validation: (Rule) => Rule.required().max(120),
            }),
            defineField({
              name: "body",
              title: "Section Body",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "Heading 3", value: "h3" },
                  ],
                  lists: [
                    { title: "Bulleted", value: "bullet" },
                    { title: "Numbered", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
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
                      },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(30),
    }),
    defineField({
      name: "contactCardLabel",
      title: "Contact Card Label",
      type: "string",
      group: "closing",
      initialValue: "Questions?",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "contactCardCopy",
      title: "Contact Card Copy",
      type: "text",
      rows: 2,
      group: "closing",
      initialValue: "Email privacy@primehourtech.com or call us during business hours.",
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "contactCardCtaLabel",
      title: "Contact Card CTA Label",
      type: "string",
      group: "closing",
      initialValue: "Contact us",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "contactCardCtaHref",
      title: "Contact Card CTA URL",
      type: "string",
      group: "closing",
      initialValue: "/contact",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Privacy Page" }),
  },
});
