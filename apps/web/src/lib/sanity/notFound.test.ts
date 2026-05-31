import { describe, it, expect } from "vitest";
import { resolveNotFoundContent, NOT_FOUND_DEFAULTS } from "./notFound";
import type { NotFoundPage } from "./types";

describe("resolveNotFoundContent", () => {
  it("returns all defaults for a null doc", () => {
    expect(resolveNotFoundContent(null)).toEqual(NOT_FOUND_DEFAULTS);
  });

  it("merges per field: a set field wins, the rest fall back", () => {
    const doc: NotFoundPage = { headline: "Lost in the cloud" };
    const r = resolveNotFoundContent(doc);
    expect(r.headline).toBe("Lost in the cloud");
    expect(r.deck).toBe(NOT_FOUND_DEFAULTS.deck);
    expect(r.primaryCta).toEqual(NOT_FOUND_DEFAULTS.primaryCta);
    expect(r.destinations).toEqual(NOT_FOUND_DEFAULTS.destinations);
  });

  it("falls back a CTA when either label or href is blank", () => {
    const doc: NotFoundPage = { primaryCta: { label: "Go", href: "" } };
    expect(resolveNotFoundContent(doc).primaryCta).toEqual(NOT_FOUND_DEFAULTS.primaryCta);
  });

  it("uses the default destination list when destinations is empty", () => {
    expect(resolveNotFoundContent({ destinations: [] }).destinations).toEqual(NOT_FOUND_DEFAULTS.destinations);
  });

  it("coerces an unknown destination icon to 'monitor'", () => {
    const doc: NotFoundPage = {
      destinations: [{ name: "X", icon: "banana", description: "d", href: "/x" }],
    };
    expect(resolveNotFoundContent(doc).destinations[0].icon).toBe("monitor");
  });

  it("keeps a valid destination icon", () => {
    const doc: NotFoundPage = {
      destinations: [{ name: "X", icon: "shield", description: "d", href: "/x" }],
    };
    expect(resolveNotFoundContent(doc).destinations[0].icon).toBe("shield");
  });

  it("defaults seoTitle to 'Page not found'", () => {
    expect(resolveNotFoundContent(null).seoTitle).toBe("Page not found");
  });
});
