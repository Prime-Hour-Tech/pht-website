import { describe, it, expect } from "vitest";
import type { PortableTextBlock } from "@portabletext/types";
import { renderPortableTextBody } from "./portable-text-body";

function paragraph(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: "p",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "s", text, marks: [] }],
  };
}

describe("renderPortableTextBody", () => {
  it("returns empty string for null/empty input", () => {
    expect(renderPortableTextBody(null)).toBe("");
    expect(renderPortableTextBody([])).toBe("");
  });

  it("renders a normal paragraph as <p>", () => {
    const html = renderPortableTextBody([paragraph("Hello world.")]);
    expect(html).toContain("<p");
    expect(html).toContain("Hello world.");
    expect(html).toContain("</p>");
  });

  it("renders h2 style", () => {
    const block: PortableTextBlock = {
      _type: "block",
      _key: "h",
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "s", text: "Section heading", marks: [] }],
    };
    const html = renderPortableTextBody([block]);
    expect(html).toContain("<h2");
    expect(html).toContain("Section heading");
  });

  it("renders h3 style", () => {
    const block: PortableTextBlock = {
      _type: "block",
      _key: "h",
      style: "h3",
      markDefs: [],
      children: [{ _type: "span", _key: "s", text: "Subsection", marks: [] }],
    };
    const html = renderPortableTextBody([block]);
    expect(html).toContain("<h3");
    expect(html).toContain("Subsection");
  });

  it("renders blockquote with accent left-rail class", () => {
    const block: PortableTextBlock = {
      _type: "block",
      _key: "q",
      style: "blockquote",
      markDefs: [],
      children: [{ _type: "span", _key: "s", text: "A pull quote.", marks: [] }],
    };
    const html = renderPortableTextBody([block]);
    expect(html).toContain("<blockquote");
    expect(html).toContain("border-accent");
    expect(html).toContain("A pull quote.");
  });

  it("renders accent mark as italic+accent span", () => {
    const block: PortableTextBlock = {
      _type: "block",
      _key: "p",
      style: "normal",
      markDefs: [{ _key: "acc", _type: "accent" }],
      children: [
        { _type: "span", _key: "s1", text: "Plain ", marks: [] },
        { _type: "span", _key: "s2", text: "accented", marks: ["acc"] },
      ],
    };
    const html = renderPortableTextBody([block]);
    expect(html).toContain("italic");
    expect(html).toContain("text-accent");
    expect(html).toContain("accented");
  });

  it("renders strong + em marks", () => {
    const block: PortableTextBlock = {
      _type: "block",
      _key: "p",
      style: "normal",
      markDefs: [],
      children: [
        { _type: "span", _key: "s1", text: "bold", marks: ["strong"] },
        { _type: "span", _key: "s2", text: " and ", marks: [] },
        { _type: "span", _key: "s3", text: "italic", marks: ["em"] },
      ],
    };
    const html = renderPortableTextBody([block]);
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>italic</em>");
  });

  it("renders link mark with target+rel when openInNewTab", () => {
    const block: PortableTextBlock = {
      _type: "block",
      _key: "p",
      style: "normal",
      markDefs: [{ _key: "lk", _type: "link", href: "https://example.com", openInNewTab: true }],
      children: [
        { _type: "span", _key: "s", text: "click here", marks: ["lk"] },
      ],
    };
    const html = renderPortableTextBody([block]);
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener"');
    expect(html).toContain("click here");
  });

  it("renders link mark without target when openInNewTab is absent", () => {
    const block: PortableTextBlock = {
      _type: "block",
      _key: "p",
      style: "normal",
      markDefs: [{ _key: "lk", _type: "link", href: "/about" }],
      children: [
        { _type: "span", _key: "s", text: "about", marks: ["lk"] },
      ],
    };
    const html = renderPortableTextBody([block]);
    expect(html).toContain('href="/about"');
    expect(html).not.toContain('target="_blank"');
  });

  it("renders bullet list", () => {
    const items: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "i1",
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [{ _type: "span", _key: "s", text: "first", marks: [] }],
      },
      {
        _type: "block",
        _key: "i2",
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [{ _type: "span", _key: "s", text: "second", marks: [] }],
      },
    ];
    const html = renderPortableTextBody(items);
    expect(html).toContain("<ul");
    expect(html).toContain("<li>first</li>");
    expect(html).toContain("<li>second</li>");
    expect(html).toContain("</ul>");
  });

  it("renders figure block with image and caption", () => {
    const figure = {
      _type: "figure",
      _key: "f",
      image: {
        asset: { _ref: "image-abc-1200x800-jpg", _type: "reference" },
        alt: "Server rack",
      },
      caption: "Our server rack at the SLC office.",
    } as unknown as PortableTextBlock;
    const html = renderPortableTextBody([figure]);
    expect(html).toContain("<figure");
    expect(html).toContain('alt="Server rack"');
    expect(html).toContain("Our server rack at the SLC office.");
    expect(html).toContain("<figcaption");
  });
});
