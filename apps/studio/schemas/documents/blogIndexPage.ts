import { defineType, defineField } from "sanity";

export const blogIndexPage = defineType({
  name: "blogIndexPage",
  title: "Blog Index Page",
  type: "document",
  // Singleton — registered in apps/studio/sanity.config.ts SINGLETONS array.
  // Backs /blog/index.astro.
  groups: [
    { name: "hero", title: "Hero" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      group: "hero",
      initialValue: "The field notes",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDeck",
      title: "Hero Deck",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      type: "string",
      group: "cta",
      initialValue: "Have a question?",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "headline",
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaDeck",
      title: "CTA Deck",
      type: "text",
      rows: 3,
      group: "cta",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      group: "cta",
      initialValue: "Schedule a discovery call",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button URL",
      type: "string",
      group: "cta",
      initialValue: "/contact",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Blog Index Page" }),
  },
});
