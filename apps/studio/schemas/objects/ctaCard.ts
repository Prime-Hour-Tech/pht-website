import { defineType, defineField } from "sanity";
import { LaunchIcon } from "@sanity/icons";

export const ctaCard = defineType({
  name: "ctaCard",
  title: "CTA Card",
  type: "object",
  icon: LaunchIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      description:
        "Main heading. Select a span and click \"Italic accent\" in the toolbar to apply the editorial italic + red styling to a fragment.",
      type: "headline",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deck",
      title: "Deck",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
      initialValue: "Schedule a discovery call",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA URL",
      type: "string",
      initialValue: "/contact",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", heading: "heading.0.children.0.text" },
    prepare: ({ eyebrow, heading }: { eyebrow?: string; heading?: string }) => {
      const subtitleParts = [eyebrow, heading].filter(Boolean);
      return {
        title: "CTA card",
        subtitle: subtitleParts.join(" · ") || "—",
        media: LaunchIcon,
      };
    },
  },
});
