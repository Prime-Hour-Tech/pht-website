import { describe, it, expect } from "vitest";
import type { PortableTextBlock } from "@portabletext/types";
import { renderHeadlineRichText } from "./portable-text";

describe("renderHeadlineRichText", () => {
  it("returns an empty string when value is null or empty array", () => {
    expect(renderHeadlineRichText(null)).toBe("");
    expect(renderHeadlineRichText(undefined)).toBe("");
    expect(renderHeadlineRichText([])).toBe("");
  });

  it("renders a plain headline with no marks", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "h1",
        style: "normal",
        markDefs: [],
        children: [
          { _type: "span", _key: "s1", text: "Six services. One team.", marks: [] },
        ],
      },
    ];
    expect(renderHeadlineRichText(value)).toBe("Six services. One team.");
  });

  it("renders an accent-marked span as italic + accent <em>", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "h1",
        style: "normal",
        markDefs: [{ _key: "acc1", _type: "accent" }],
        children: [
          { _type: "span", _key: "s1", text: "Six services. ", marks: [] },
          { _type: "span", _key: "s2", text: "One team.", marks: ["acc1"] },
        ],
      },
    ];
    const html = renderHeadlineRichText(value);
    expect(html).toContain("Six services. ");
    expect(html).toContain(
      '<em class="italic text-accent font-medium">One team.</em>',
    );
  });

  it("renders an accent-mark in the middle of a headline", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "h1",
        style: "normal",
        markDefs: [{ _key: "acc1", _type: "accent" }],
        children: [
          { _type: "span", _key: "s1", text: "Security that ", marks: [] },
          { _type: "span", _key: "s2", text: "fits a small business", marks: ["acc1"] },
          { _type: "span", _key: "s3", text: " — not a Fortune 500.", marks: [] },
        ],
      },
    ];
    const html = renderHeadlineRichText(value);
    expect(html).toContain("Security that ");
    expect(html).toContain(
      '<em class="italic text-accent font-medium">fits a small business</em>',
    );
    expect(html).toContain(" — not a Fortune 500.");
  });

  it("escapes HTML special characters in span text (XSS regression guard)", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "h1",
        style: "normal",
        markDefs: [],
        children: [
          { _type: "span", _key: "s1", text: "AT&T <ops>", marks: [] },
        ],
      },
    ];
    const html = renderHeadlineRichText(value);
    expect(html).toContain("AT&amp;T");
    expect(html).toContain("&lt;ops&gt;");
    expect(html).not.toContain("<ops>");
  });

  it("renders an accent-mark at the very start of a headline", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "h1",
        style: "normal",
        markDefs: [{ _key: "acc1", _type: "accent" }],
        children: [
          { _type: "span", _key: "s1", text: "One team.", marks: ["acc1"] },
          { _type: "span", _key: "s2", text: " Six services.", marks: [] },
        ],
      },
    ];
    const html = renderHeadlineRichText(value);
    expect(html).toContain(
      '<em class="italic text-accent font-medium">One team.</em>',
    );
    expect(html).toContain(" Six services.");
  });

  it("renders multiple accent spans in the same headline", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "h1",
        style: "normal",
        markDefs: [
          { _key: "acc1", _type: "accent" },
          { _key: "acc2", _type: "accent" },
        ],
        children: [
          { _type: "span", _key: "s1", text: "Made by ", marks: [] },
          { _type: "span", _key: "s2", text: "humans", marks: ["acc1"] },
          { _type: "span", _key: "s3", text: ", for ", marks: [] },
          { _type: "span", _key: "s4", text: "humans", marks: ["acc2"] },
          { _type: "span", _key: "s5", text: ".", marks: [] },
        ],
      },
    ];
    const html = renderHeadlineRichText(value);
    // Both accent spans should render with the styling
    const matches = html.match(
      /<em class="italic text-accent font-medium">humans<\/em>/g,
    );
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(2);
  });

});
