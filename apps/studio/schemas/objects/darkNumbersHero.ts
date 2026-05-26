import { defineType, defineField, defineArrayMember } from "sanity";

export const darkNumbersHero = defineType({
  name: "darkNumbersHero",
  title: "Dark Numbers Hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "Mono uppercase line above the headline. e.g., \"Average savings · 25-seat client\"",
      type: "string",
      validation: (Rule) => Rule.required().max(64),
    }),
    defineField({
      name: "bigNumber",
      title: "Big Number",
      description: "Free-form string. e.g., \"$5,200\", \"<15min\", \"24/7\"",
      type: "string",
      validation: (Rule) => Rule.required().max(12),
    }),
    defineField({
      name: "bigNumberCaption",
      title: "Big Number Caption",
      description: "Mono caption next to the big number. e.g., \"/mo saved\"",
      type: "string",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      description: "The sentence below the big number.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "deck",
      title: "Deck",
      description: "Body paragraph under the subheadline.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA",
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
    defineField({
      name: "ctaSecondary",
      title: "Secondary CTA (optional)",
      description:
        "Both label and href are required if this object is present; leave the whole object empty to omit the secondary CTA.",
      type: "object",
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
    defineField({
      name: "credentials",
      title: "Credentials Panel",
      description: "Right-column cards. 6 recommended.",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: "object",
          name: "credential",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: "sub",
              title: "Sub-label",
              type: "string",
              validation: (Rule) => Rule.required().max(40),
            }),
          ],
          preview: { select: { title: "title", subtitle: "sub" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { num: "bigNumber", cap: "bigNumberCaption" },
    prepare: ({ num, cap }) => ({
      title: `${num ?? ""} ${cap ?? ""}`.trim() || "Dark Numbers Hero",
      subtitle: "Hero block",
    }),
  },
});
