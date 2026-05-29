import { defineType, defineField } from "sanity";

export const postList = defineType({
  name: "postList",
  title: "Post List",
  type: "object",
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
    prepare: () => ({ title: "Post List", subtitle: "Renders the blog post grid" }),
  },
});
