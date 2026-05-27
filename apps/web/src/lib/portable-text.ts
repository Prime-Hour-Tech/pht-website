import { toHTML } from "@portabletext/to-html";
import type { PortableTextBlock } from "@portabletext/types";

// Render a Portable Text headline (single-block, accent-marked spans) to an
// HTML string. Used by HeadlineRichText.astro and any other consumer that
// needs the same italic-accent styling — e.g., service page hero/heading
// fields and the migrated CtaCard.
//
// Returns inline-only output (no outer <p>/<h*>) so consumers can wrap in
// whatever heading tag they need.
//
// Legacy-string branch: during the Slice 3 migration window, some Sanity
// documents may still hold the old plain-string heading shape (pre-migration
// CtaCard). Render those as HTML-escaped plain text so the page doesn't blank
// out before re-authoring. Remove this branch once all legacy data is gone.
export function renderHeadlineRichText(
  value: PortableTextBlock[] | string | null | undefined,
): string {
  if (value == null) return "";
  if (typeof value === "string") return escapeHtml(value);
  if (!Array.isArray(value) || value.length === 0) return "";

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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
