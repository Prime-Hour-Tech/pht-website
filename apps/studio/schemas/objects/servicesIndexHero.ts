import { defineType, defineField } from "sanity";

export const servicesIndexHero = defineType({
  name: "servicesIndexHero",
  title: "Services Index Hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Services",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "headline",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deck",
      title: "Deck",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "featuredService",
      title: "Featured Service",
      description: "Reference to a service doc. Renders inline in the hero with its hero stat + first capabilities.",
      type: "reference",
      to: [{ type: "service" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow" },
    prepare: ({ eyebrow }) => ({ title: "Services Index Hero", subtitle: eyebrow }),
  },
});
