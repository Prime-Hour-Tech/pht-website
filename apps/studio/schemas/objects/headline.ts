import { defineType } from "sanity";

// Reusable Portable Text headline used for all italic-accent headlines across
// service pages and the existing CtaCard block. Constrained to a single block
// (one line), no styles, no decorators, no lists; editors get a "fancy plain
// text input with an accent button" UX. The `accent` annotation carries no
// data; its presence on a span is what the renderer styles as italic + accent.
export const headline = defineType({
  name: "headline",
  title: "Headline",
  type: "array",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [],
        annotations: [
          {
            name: "accent",
            type: "object",
            title: "Italic accent",
            fields: [
              {
                name: "marker",
                type: "boolean",
                hidden: true,
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
  ],
});
