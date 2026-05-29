import { defineType, defineField } from "sanity";
import { RocketIcon } from "@sanity/icons";

export const servicesIndexHero = defineType({
  name: "servicesIndexHero",
  title: "Services Index Hero",
  type: "object",
  icon: RocketIcon,
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
    select: { eyebrow: "eyebrow", headline: "heading.0.children.0.text", featured: "featuredService.name" },
    prepare: ({ eyebrow, featured }: { eyebrow?: string; headline?: string; featured?: string }) => {
      const subtitleParts = [eyebrow, featured ? "→ " + featured : null].filter(Boolean);
      return {
        title: "Hero (services + featured)",
        subtitle: subtitleParts.join(" · ") || "—",
        media: RocketIcon,
      };
    },
  },
});
