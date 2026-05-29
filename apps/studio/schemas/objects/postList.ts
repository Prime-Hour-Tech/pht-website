import { defineType, defineField } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export const postList = defineType({
  name: "postList",
  title: "Post List",
  type: "object",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "All field notes",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emptyStateMessage",
      title: "Empty State Message",
      description: "Shown when no posts exist.",
      type: "string",
      initialValue: "No posts yet — check back soon.",
      validation: (Rule) => Rule.required().max(200),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", headline: "heading.0.children.0.text" },
    prepare: ({ eyebrow, headline }: { eyebrow?: string; headline?: string }) => {
      const subtitleParts = [eyebrow, headline].filter(Boolean);
      return {
        title: "Post list",
        subtitle: subtitleParts.join(" · ") || "—",
        media: DocumentsIcon,
      };
    },
  },
});
