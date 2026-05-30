import { toHTML } from "@portabletext/to-html";
import type { PortableTextBlock } from "@portabletext/types";

// Render a Portable Text headline (single-block, accent-marked spans) to an
// HTML string. Used by HeadlineRichText.astro and any other consumer that
// needs the same italic-accent styling, e.g., service page hero/heading
// fields and the migrated CtaCard.
//
// Returns inline-only output (no outer <p>/<h*>) so consumers can wrap in
// whatever heading tag they need.
export function renderHeadlineRichText(
  value: PortableTextBlock[] | string | null | undefined,
): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (value.length === 0) return "";

  return toHTML(value, {
    components: {
      block: {
        normal: ({ children }) => `${children}`,
      },
      marks: {
        accent: ({ children }) =>
          `<em class="italic text-accent font-medium">${children}</em>`,
      },
    },
  });
}
