import { describe, it, expect } from "vitest";
import type { PortableTextBlock } from "@portabletext/types";
import { computeReadTimeMinutes } from "./read-time";

function makeBlock(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: "k",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "s", text, marks: [] }],
  };
}

describe("computeReadTimeMinutes", () => {
  it("returns 1 minute minimum for empty body", () => {
    expect(computeReadTimeMinutes([])).toBe(1);
  });

  it("returns 1 minute for short body (< 200 words)", () => {
    const body = [makeBlock("Just a few words here.")];
    expect(computeReadTimeMinutes(body)).toBe(1);
  });

  it("returns 2 minutes for 250 words", () => {
    const text = Array(250).fill("word").join(" ");
    expect(computeReadTimeMinutes([makeBlock(text)])).toBe(2);
  });

  it("returns 5 minutes for 1000 words", () => {
    const text = Array(1000).fill("word").join(" ");
    expect(computeReadTimeMinutes([makeBlock(text)])).toBe(5);
  });

  it("counts text from multiple blocks", () => {
    const body = [
      makeBlock("first paragraph with five words"),
      makeBlock("second paragraph with five words"),
    ];
    expect(computeReadTimeMinutes(body)).toBe(1);
  });

  it("skips non-block items (e.g., figure blocks)", () => {
    const body = [
      makeBlock("a short paragraph"),
      { _type: "figure", _key: "fig", image: { asset: { _ref: "x", _type: "reference" }, alt: "x" } } as unknown as PortableTextBlock,
    ];
    expect(computeReadTimeMinutes(body)).toBe(1);
  });
});
