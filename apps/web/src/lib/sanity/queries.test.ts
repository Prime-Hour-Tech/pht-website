import { describe, it, expect } from "vitest";
import { siteSettingsQuery, pageBySlugQuery, allPageSlugsQuery } from "./queries";

describe("GROQ queries", () => {
  it("siteSettingsQuery selects the single siteSettings document", () => {
    expect(siteSettingsQuery).toContain('*[_type == "siteSettings"][0]');
    expect(siteSettingsQuery).toContain("siteName");
    expect(siteSettingsQuery).toContain("siteDescription");
  });

  it("pageBySlugQuery filters by slug.current and projects blocks", () => {
    expect(pageBySlugQuery).toContain('*[_type == "page" && slug.current == $slug][0]');
    expect(pageBySlugQuery).toContain("blocks[]");
  });

  it("allPageSlugsQuery returns slugs only", () => {
    expect(allPageSlugsQuery).toContain('*[_type == "page" && defined(slug.current)]');
    expect(allPageSlugsQuery).toContain('"slug": slug.current');
  });
});
