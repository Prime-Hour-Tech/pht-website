import { defineType, defineField } from "sanity";
import { BarChartIcon } from "@sanity/icons";

export const numbersStrip = defineType({
  name: "numbersStrip",
  title: "Numbers Strip",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      description: "Exactly 4 stat items. Big serif value + small mono caption.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "k",
              title: "Value",
              description: 'Big serif number/text. e.g., "2024", "< 15 min", "100%".',
              type: "string",
              validation: (Rule) => Rule.required().max(16),
            }),
            defineField({
              name: "v",
              title: "Caption",
              type: "string",
              validation: (Rule) => Rule.required().max(64),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],
  preview: {
    select: { stats: "stats" },
    prepare: ({ stats }: { stats?: unknown[] }) => {
      const subtitleParts = [stats?.length ? stats.length + " stats" : null].filter(Boolean);
      return {
        title: "Numbers strip",
        subtitle: subtitleParts.join(" · ") || "—",
        media: BarChartIcon,
      };
    },
  },
});
