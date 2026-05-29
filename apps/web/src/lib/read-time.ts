import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

const WORDS_PER_MINUTE = 200;

// Estimate read time for a Portable Text body in minutes.
// Counts whitespace-separated words across all top-level `block` items;
// custom blocks (figure, etc.) contribute nothing. Always returns at least 1.
export function computeReadTimeMinutes(body: PortableTextBlock[]): number {
  let wordCount = 0;
  for (const block of body) {
    if (block._type !== "block") continue;
    const children = block.children as PortableTextSpan[] | undefined;
    if (!children) continue;
    for (const span of children) {
      const text = typeof span.text === "string" ? span.text : "";
      if (!text) continue;
      wordCount += text.trim().split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
