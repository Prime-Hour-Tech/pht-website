import { describe, it, expect } from "vitest";
import { themeToCssVars, checkThemeContrast } from "./theme";
import type { Theme } from "./types";

const solid = (hex: string) => ({ hex, alpha: 1, rgb: { r: 0, g: 0, b: 0, a: 1 } });

describe("themeToCssVars", () => {
  it("returns empty string for null or empty theme", () => {
    expect(themeToCssVars(null)).toBe("");
    expect(themeToCssVars({})).toBe("");
  });

  it("emits only set tokens with correct CSS names", () => {
    const theme: Theme = { accent: solid("#ff0000"), inkBody: solid("#222222") };
    const css = themeToCssVars(theme);
    expect(css).toContain("--color-accent: #ff0000;");
    expect(css).toContain("--color-ink-body: #222222;");
    expect(css).not.toContain("--color-bg:");
  });

  it("uses rgba() when alpha < 1, hex otherwise", () => {
    const theme: Theme = {
      line: { hex: "#1a1a1a", alpha: 0.1, rgb: { r: 26, g: 26, b: 26, a: 0.1 } },
      accent: solid("#dc2626"),
    };
    const css = themeToCssVars(theme);
    expect(css).toContain("--color-line: rgba(26, 26, 26, 0.1);");
    expect(css).toContain("--color-accent: #dc2626;");
  });

  it("strips stega-encoded invisible characters from values", () => {
    // Stega uses 4+ consecutive chars from its codepoint set as the payload marker.
    // U+200B (zero-width space, codepoint 8203) is one of those codepoints, so a run
    // of 4 of them is a valid stega payload and stegaClean will remove it.
    const stegaPayload = "​​​​";
    const dirty = "#abc" + stegaPayload + "def";
    const theme: Theme = { accent: { hex: dirty, alpha: 1, rgb: { r: 1, g: 2, b: 3, a: 1 } } };
    const css = themeToCssVars(theme);
    expect(css).not.toContain(stegaPayload);
  });

  it("drops a malformed color value (defense-in-depth)", () => {
    const theme: Theme = {
      accent: { hex: "#zzz; } body{display:none}", alpha: 1, rgb: { r: 0, g: 0, b: 0, a: 1 } },
      ink: solid("#123456"),
    };
    const css = themeToCssVars(theme);
    expect(css).not.toContain("--color-accent");
    expect(css).not.toContain("display:none");
    expect(css).toContain("--color-ink: #123456;");
  });
});

const c = (hex: string) => ({ hex, alpha: 1, rgb: { r: 0, g: 0, b: 0, a: 1 } });

describe("checkThemeContrast", () => {
  it("returns no warnings for an all-default (empty) theme", () => {
    expect(checkThemeContrast({})).toEqual([]);
    expect(checkThemeContrast(null)).toEqual([]);
  });

  it("warns when an overridden body-on-bg pair is low contrast", () => {
    const warnings = checkThemeContrast({ inkBody: c("#cccccc"), bg: c("#ffffff") });
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings.join(" ")).toMatch(/contrast/i);
  });

  it("does not warn when an overridden pair has strong contrast", () => {
    expect(checkThemeContrast({ inkBody: c("#111111"), bg: c("#ffffff") })).toEqual([]);
  });

  it("checks an override against the default of the other half of the pair", () => {
    const warnings = checkThemeContrast({ inkBody: c("#f0f0f0") });
    expect(warnings.length).toBeGreaterThan(0);
  });
});
