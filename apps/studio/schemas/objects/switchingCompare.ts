import { defineType, defineField } from "sanity";

export const switchingCompare = defineType({
  name: "switchingCompare",
  title: "Switching Compare",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "vs your current MSP",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({ name: "title", title: "Title", type: "headline", validation: (Rule) => Rule.required() }),
    defineField({
      name: "usHeader",
      title: "Us Header",
      type: "string",
      initialValue: "Prime Hour Tech",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "themHeader",
      title: "Them Header",
      type: "string",
      initialValue: "Most MSPs",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "topic", title: "Topic", type: "string", validation: (Rule) => Rule.required().max(80) }),
          defineField({ name: "us", title: "Us", type: "string", validation: (Rule) => Rule.required().max(240) }),
          defineField({ name: "them", title: "Them", type: "string", validation: (Rule) => Rule.required().max(240) }),
        ],
      }],
      validation: (Rule) => Rule.required().min(4).max(8),
    }),
  ],
  preview: { prepare: () => ({ title: "Switching Compare" }) },
});
