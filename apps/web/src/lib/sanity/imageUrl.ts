import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "sanity:client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ImageRef } from "./types";

const builder = imageUrlBuilder(sanityClient);

// Build a Sanity image URL with transformations.
// Use the returned builder's chainable methods, e.g.:
//   urlFor(image).width(2000).fit("max").url()
//   urlFor(image).width(160).height(160).fit("crop").url()
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Resolve a 1200×630 OG-image URL with per-page → site-default fallback.
// Returns undefined when neither a per-page nor a default image is set —
// BaseLayout skips the og:image meta tag entirely in that case.
export function ogImageUrl(
  specific: ImageRef | undefined,
  fallback: ImageRef | undefined,
): string | undefined {
  const source = specific ?? fallback;
  if (!source) return undefined;
  return urlFor(source).width(1200).height(630).fit("crop").url();
}
