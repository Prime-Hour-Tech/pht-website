import { defineType, defineField } from "sanity";

export const switchingHandle = defineType({
  name: "switchingHandle",
  title: "Switching Handle (Awkward Parts)",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The awkward parts",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({ name: "title", title: "Title", type: "headline", validation: (Rule) => Rule.required() }),
    defineField({
      name: "deck",
      title: "Deck",
      type: "text",
      rows: 3,
      initialValue:
        "Most owners delay switching MSPs because they're bracing for an awkward set of conversations. We handle nearly all of them for you. You sign a few things. That's it.",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "painLabel", title: "Pain Label", type: "string", validation: (Rule) => Rule.required().max(60) }),
          defineField({ name: "painBody", title: "Pain Body", type: "text", rows: 3, validation: (Rule) => Rule.required().max(320) }),
          defineField({ name: "weHandleLabel", title: "We Handle Label", type: "string", validation: (Rule) => Rule.required().max(60) }),
          defineField({ name: "weHandleBody", title: "We Handle Body", type: "text", rows: 3, validation: (Rule) => Rule.required().max(320) }),
        ],
      }],
      validation: (Rule) => Rule.required().min(3).max(6),
    }),
  ],
  preview: { prepare: () => ({ title: "Switching Handle" }) },
});
