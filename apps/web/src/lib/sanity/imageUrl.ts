import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "sanity:client";
import type { SanityImageSource } from "@sanity/image-url";
import type { ImageRef } from "./types";

const builder = createImageUrlBuilder(sanityClient);

// Build a Sanity image URL with transformations.
// Use the returned builder's chainable methods, e.g.:
//   urlFor(image).width(2000).fit("max").url()
//   urlFor(image).width(160).height(160).fit("crop").url()
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface ResponsiveImage {
  /** Largest variant; fallback `src` for browsers ignoring srcset. */
  src: string;
  /** `<url> <w>w` entries across the requested widths. */
  srcset: string;
  width: number;
  height?: number;
}

// Build a responsive image: a srcset across the given intrinsic widths PLUS
// automatic next-gen format negotiation (`auto('format')` → WebP/AVIF by the
// browser's Accept header). Pair the returned `srcset` with a `sizes` attribute
// on the <img> describing the slot's rendered width per breakpoint.
//
// `aspect` (= width / height) pins each variant to a fixed ratio with fit:crop
// Use for fixed-ratio slots (team 4:5 -> 0.8, cards 4:3 -> 1.333, avatar 1:1 -> 1).
// Omit it for full-bleed images that keep their own ratio (fit:max); pair those
// with an object-cover container.
export function urlForResponsive(
  source: SanityImageSource,
  { widths, aspect }: { widths: number[]; aspect?: number },
): ResponsiveImage {
  const variant = (w: number) => {
    const b = builder.image(source).width(w).auto("format");
    return (aspect ? b.height(Math.round(w / aspect)).fit("crop") : b.fit("max")).url();
  };
  const max = widths[widths.length - 1];
  return {
    src: variant(max),
    srcset: widths.map((w) => `${variant(w)} ${w}w`).join(", "),
    width: max,
    height: aspect ? Math.round(max / aspect) : undefined,
  };
}

// Resolve a 1200×630 OG-image URL with per-page → site-default fallback.
// Returns undefined when neither a per-page nor a default image is set;
// BaseLayout skips the og:image meta tag entirely in that case.
export function ogImageUrl(
  specific: ImageRef | undefined,
  fallback: ImageRef | undefined,
): string | undefined {
  const source = specific ?? fallback;
  if (!source) return undefined;
  return urlFor(source).width(1200).height(630).fit("crop").url();
}
