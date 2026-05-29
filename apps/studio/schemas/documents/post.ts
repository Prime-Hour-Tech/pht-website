import { defineType, defineField } from "sanity";

const CATEGORIES = [
  "Security",
  "Cloud",
  "Field notes",
  "Compliance",
  "Tooling",
  "Practice",
] as const;

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    { name: "card", title: "Card / Listing" },
    { name: "header", title: "Post Header" },
    { name: "body", title: "Body" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "card",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL path. The route is /blog/{slug}.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "1–2 sentence summary. Used as the card excerpt and as the post-detail header deck.",
      type: "text",
      rows: 3,
      group: "card",
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "card",
      options: {
        list: CATEGORIES.map((c) => ({ title: c, value: c })),
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "date",
      group: "card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
      group: "card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      group: "header",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "body",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Pull quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Accent (italic + red)", value: "accent" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
        {
          type: "object",
          name: "figure",
          title: "Figure",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alternative Text",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              validation: (Rule) => Rule.max(200),
            }),
          ],
          preview: {
            select: { caption: "caption", alt: "image.alt" },
            prepare: ({ caption, alt }: { caption?: string; alt?: string }) => ({ title: caption || alt || "Figure" }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      description: "Used in the <title> tag. Falls back to post title.",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      description: "Meta description. Falls back to excerpt.",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      description: "Falls back to cover image.",
      type: "image",
      options: { hotspot: true },
      group: "seo",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      publishDate: "publishDate",
      authorName: "author.name",
    },
    prepare: ({ title, category, publishDate, authorName }: { title?: string; category?: string; publishDate?: string; authorName?: string }) => ({
      title,
      subtitle: `${category ?? "(no category)"} · ${publishDate ?? "(no date)"} · ${authorName ?? "(no author)"}`,
    }),
  },
});
