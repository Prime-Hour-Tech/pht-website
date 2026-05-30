import { stegaClean } from "@sanity/client/stega";
import type { SanityColor, Theme } from "./types";

// Theme field -> CSS custom-property suffix (the global.css token name).
const TOKEN_MAP: Record<keyof Theme, string> = {
  accent: "accent",
  bg: "bg",
  bgAlt: "bg-alt",
  surface: "surface",
  ink: "ink",
  inkBody: "ink-body",
  muted: "muted",
  line: "line",
  lineSoft: "line-soft",
  dark: "dark",
  darkText: "dark-text",
  darkMuted: "dark-muted",
  darkLine: "dark-line",
  success: "success",
  online: "online",
};

// A color-input value -> CSS color string. rgba() when it carries alpha < 1
// (the hairline tokens), hex otherwise.
function colorToCss(c: SanityColor): string {
  const a = c.rgb?.a ?? c.alpha ?? 1;
  if (a < 1 && c.rgb) {
    return `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${a})`;
  }
  return c.hex;
}

// Build the body of a :root{} override block from the set theme fields.
// Returns "" when nothing is set so BaseLayout can skip the <style> entirely.
// stegaClean strips invisible source-map characters Sanity adds in preview
// builds; left in, they would corrupt the CSS color values.
export function themeToCssVars(rawTheme: Theme | null): string {
  if (!rawTheme) return "";
  const theme = stegaClean(rawTheme) as Theme;
  const lines: string[] = [];
  for (const key of Object.keys(TOKEN_MAP) as (keyof Theme)[]) {
    const value = theme[key];
    if (value && value.hex) {
      lines.push(`  --color-${TOKEN_MAP[key]}: ${colorToCss(value)};`);
    }
  }
  return lines.join("\n");
}

// global.css defaults for the foreground/background tokens we contrast-check.
const CONTRAST_DEFAULTS = {
  bg: "#ffffff",
  ink: "#1A1A1A",
  inkBody: "#33363c",
  dark: "#0f1115",
  darkText: "#f2f3f5",
} as const;

type ContrastKey = keyof typeof CONTRAST_DEFAULTS;

const CONTRAST_PAIRS: { fg: ContrastKey; bg: ContrastKey; label: string }[] = [
  { fg: "inkBody", bg: "bg", label: "Body text on page background" },
  { fg: "ink", bg: "bg", label: "Headings on page background" },
  { fg: "darkText", bg: "dark", label: "Dark-band text on dark background" },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const lin = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

// Returns one warning per overridden foreground/background pair whose WCAG
// contrast ratio falls below 4.5:1. All-default pairs are skipped (shipped
// defaults are known-good). Pure + testable; no logging here.
export function checkThemeContrast(rawTheme: Theme | null): string[] {
  if (!rawTheme) return [];
  const theme = stegaClean(rawTheme) as Theme;
  const warnings: string[] = [];
  for (const { fg, bg, label } of CONTRAST_PAIRS) {
    const fgSet = theme[fg]?.hex;
    const bgSet = theme[bg]?.hex;
    if (!fgSet && !bgSet) continue;
    const fgHex = fgSet ?? CONTRAST_DEFAULTS[fg];
    const bgHex = bgSet ?? CONTRAST_DEFAULTS[bg];
    const ratio = contrastRatio(fgHex, bgHex);
    if (ratio < 4.5) {
      warnings.push(
        `${label}: contrast ratio ${ratio.toFixed(2)}:1 is below the 4.5:1 WCAG AA minimum.`,
      );
    }
  }
  return warnings;
}

// BaseLayout renders once per page at build; this guard makes the warnings log
// once per build process instead of once per page.
let warnedOnce = false;
export function warnThemeContrastOnce(theme: Theme | null): void {
  if (warnedOnce) return;
  warnedOnce = true;
  for (const msg of checkThemeContrast(theme)) {
    // eslint-disable-next-line no-console
    console.warn(`[theme] ${msg}`);
  }
}
