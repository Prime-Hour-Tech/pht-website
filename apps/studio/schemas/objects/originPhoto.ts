import { defineType, defineField } from "sanity";

export const originPhoto = defineType({
  name: "originPhoto",
  title: "Origin Photo",
  type: "object",
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
          { title: "21:9 — wide cinematic", value: "21/9" },
          { title: "16:9", value: "16/9" },
          { title: "4:3", value: "4/3" },
        ],
        layout: "radio",
      },
      initialValue: "21/9",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption Card",
      type: "object",
      fields: [
        defineField({
          name: "eyebrowLabel",
          title: "Eyebrow Label",
          description: "Small uppercase label at top of card. e.g., \"◇ Office · Sugar House, SLC\".",
          type: "string",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "quote",
          title: "Pull Quote",
          description: "Italic serif quote, 1–2 sentences.",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.required().max(240),
        }),
        defineField({
          name: "attribution",
          title: "Attribution",
          description: "Small uppercase footer. e.g., \"— Founder, Prime Hour Tech\".",
          type: "string",
          validation: (Rule) => Rule.required().max(80),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { quote: "caption.quote" },
    prepare: ({ quote }) => ({
      title: quote || "Origin Photo",
      subtitle: "Block",
    }),
  },
});
