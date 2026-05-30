import type { PostCategory } from "./types";

/** Category display label -> URL slug. Lowercase, non-alphanumerics -> single hyphen. */
export function categoryToSlug(category: PostCategory): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Build-time guard: fail loudly if two distinct categories slugify to the same
 * value (would make category routes ambiguous). Call once with the live set.
 */
export function assertUniqueCategorySlugs(categories: PostCategory[]): void {
  const seen = new Map<string, PostCategory>();
  for (const c of categories) {
    const slug = categoryToSlug(c);
    const prior = seen.get(slug);
    if (prior && prior !== c) {
      throw new Error(`Category slug collision: "${prior}" and "${c}" both -> "${slug}"`);
    }
    seen.set(slug, c);
  }
}
