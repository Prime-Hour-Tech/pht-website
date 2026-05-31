import { toHTML, type PortableTextOptions } from "@portabletext/to-html";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "./sanity/imageUrl";

// Render a Portable Text body (multi-block prose with rich marks) to HTML.
// Distinct from `renderHeadlineRichText` (single-block, accent-only).
// Used by the blog post body. Returns flow content; consumers wrap as needed.
export function renderPortableTextBody(value: PortableTextBlock[] | null | undefined): string {
  if (value == null || value.length === 0) return "";

  const components: PortableTextOptions["components"] = {
    block: {
      normal: ({ children }) => `<p class="my-4 text-ink text-body-lg leading-body">${children}</p>`,
      h2: ({ children }) =>
        `<h2 class="font-serif font-medium text-ink mt-12 mb-4" style="font-size: 36px; line-height: 1.15; letter-spacing: -0.02em;">${children}</h2>`,
      h3: ({ children }) =>
        `<h3 class="font-serif font-medium text-ink mt-8 mb-3" style="font-size: 26px; line-height: 1.18; letter-spacing: -0.015em;">${children}</h3>`,
      blockquote: ({ children }) =>
        `<blockquote class="border-l-2 border-accent pl-6 my-8 font-serif italic text-ink" style="font-size: 22px; line-height: 1.4;">${children}</blockquote>`,
    },
    list: {
      bullet: ({ children }) => `<ul class="list-disc pl-6 my-4 text-ink text-body-lg leading-body">${children}</ul>`,
      number: ({ children }) => `<ol class="list-decimal pl-6 my-4 text-ink text-body-lg leading-body">${children}</ol>`,
    },
    listItem: {
      bullet: ({ children }) => `<li>${children}</li>`,
      number: ({ children }) => `<li>${children}</li>`,
    },
    marks: {
      accent: ({ children }) => `<em class="italic text-accent font-medium">${children}</em>`,
      strong: ({ children }) => `<strong>${children}</strong>`,
      em: ({ children }) => `<em>${children}</em>`,
      link: ({ children, value }) => {
        const v = (value ?? {}) as { href?: string; openInNewTab?: boolean };
        const href = v.href ?? "#";
        const attrs = v.openInNewTab
          ? ` target="_blank" rel="noopener"`
          : "";
        return `<a class="text-accent underline decoration-1 hover:decoration-2 break-words" href="${escapeAttr(href)}"${attrs}>${children}</a>`;
      },
    },
    types: {
      figure: ({ value }) => {
        const v = (value ?? {}) as { image?: { asset?: unknown; alt?: string }; caption?: string };
        if (!v.image?.asset) return "";
        const url = urlFor(v.image as { asset: unknown }).width(1440).fit("max").url();
        const alt = v.image.alt ?? "";
        const caption = v.caption
          ? `<figcaption class="mt-2 text-meta text-muted font-mono uppercase tracking-mono-eyebrow">${escapeHtml(v.caption)}</figcaption>`
          : "";
        return `<figure class="my-8"><img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" class="w-full h-auto rounded-lg" />${caption}</figure>`;
      },
    },
  };

  return toHTML(value, { components });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, "&quot;").replace(/&/g, "&amp;");
}
