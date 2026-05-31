import { defineType, defineField } from "sanity";

// Singleton; registered in apps/studio/sanity.config.ts SINGLETONS array.
// Renders the 404 page. Unset fields fall back to code defaults
// (apps/web/src/lib/sanity/notFound.ts), so the page is never blank.

// The icon list must match the IconName union in apps/web/src/lib/sanity/types.ts.
const ICON_OPTIONS = [
  "monitor", "shield", "cloud", "server", "compass", "globe", "arrow", "arrowSm",
  "check", "phone", "mail", "chevron", "file", "users", "spark", "lock", "linkedin", "x",
];

// A label + href pair. Both optional: the web fallback supplies a default when
// either is blank.
const linkObject = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "label", title: "Label", type: "string" }),
      defineField({ name: "href", title: "Link (URL or path)", type: "string" }),
    ],
  });

export const notFoundPage = defineType({
  name: "notFoundPage",
  title: "404 / Not Found Page",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string", validation: (R) => R.required().max(80) }),
    defineField({ name: "deck", title: "Deck", type: "text", rows: 3, validation: (R) => R.required().max(320) }),
    linkObject("primaryCta", "Primary button"),
    linkObject("secondaryCta", "Secondary button"),
    defineField({ name: "destinationsHeading", title: "Destinations heading", type: "string", validation: (R) => R.required().max(60) }),
    linkObject("browseAllLink", "Browse-all link"),
    defineField({
      name: "destinations",
      title: "Destinations",
      type: "array",
      validation: (R) => R.min(1).max(9),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required().max(60) }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              initialValue: "monitor",
              options: { list: ICON_OPTIONS.map((i) => ({ title: i, value: i })) },
              validation: (R) => R.required(),
            }),
            defineField({ name: "description", title: "Description", type: "string", validation: (R) => R.required().max(120) }),
            defineField({ name: "href", title: "Link (URL or path)", type: "string", validation: (R) => R.required() }),
          ],
          preview: { select: { title: "name", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      description: 'Browser tab / search title. Defaults to "Page not found".',
    }),
  ],
  preview: { prepare: () => ({ title: "404 / Not Found" }) },
});
