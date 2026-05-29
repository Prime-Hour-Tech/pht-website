import { defineType, defineField } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const pageHero = defineType({
  name: "pageHero",
  title: "Page Hero",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "Small uppercase eyebrow above the headline. Diamond ◆ is added by the layout.",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deck",
      title: "Deck Paragraphs",
      description: "1 or 2 paragraphs of subhead copy. About + Industries pages use 2; Contact uses 1.",
      type: "array",
      of: [{ type: "text", validation: (Rule) => Rule.max(320) }],
      validation: (Rule) => Rule.required().min(1).max(2),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", headline: "headline.0.children.0.text" },
    prepare: ({ eyebrow, headline }: { eyebrow?: string; headline?: string }) => {
      const subtitleParts = [eyebrow, headline].filter(Boolean);
      return {
        title: "Hero (simple)",
        subtitle: subtitleParts.join(" · ") || "—",
        media: BlockElementIcon,
      };
    },
  },
});
