import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "sanity:client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanityClient);

// Build a Sanity image URL with transformations.
// Use the returned builder's chainable methods, e.g.:
//   urlFor(image).width(2000).fit("max").url()
//   urlFor(image).width(160).height(160).fit("crop").url()
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
