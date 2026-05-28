import { defineType, defineField } from "sanity";

export const pageHero = defineType({
  name: "pageHero",
  title: "Page Hero",
  type: "object",
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
    select: { headline: "headline", eyebrow: "eyebrow" },
    prepare: ({ headline, eyebrow }) => {
      const firstBlock = Array.isArray(headline) ? headline[0] : null;
      const text =
        firstBlock && Array.isArray(firstBlock.children)
          ? firstBlock.children.map((c: { text?: string }) => c.text ?? "").join("")
          : "";
      return {
        title: text || "Page Hero",
        subtitle: eyebrow ? `Eyebrow: ${eyebrow}` : "Block",
      };
    },
  },
});
