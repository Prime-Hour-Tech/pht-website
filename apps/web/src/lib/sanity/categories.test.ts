import { describe, it, expect } from "vitest";
import { categoryToSlug, assertUniqueCategorySlugs } from "./categories";
import type { PostCategory } from "./types";

describe("categoryToSlug", () => {
  it("lowercases and hyphenates", () => {
    expect(categoryToSlug("Security")).toBe("security");
    expect(categoryToSlug("Field notes")).toBe("field-notes");
  });
  it("is stable for all live categories", () => {
    const cats: PostCategory[] = ["Security", "Cloud", "Field notes", "Compliance", "Tooling", "Practice"];
    expect(cats.map(categoryToSlug)).toEqual([
      "security", "cloud", "field-notes", "compliance", "tooling", "practice",
    ]);
  });
});

describe("assertUniqueCategorySlugs", () => {
  it("passes when slugs are unique", () => {
    expect(() => assertUniqueCategorySlugs(["Security", "Cloud"])).not.toThrow();
  });
  it("throws on a slug collision", () => {
    expect(() => assertUniqueCategorySlugs(["Field notes", "Field-notes"] as PostCategory[])).toThrow(/collision/i);
  });
});
