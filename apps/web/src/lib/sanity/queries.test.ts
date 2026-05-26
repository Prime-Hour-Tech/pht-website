import { describe, it, expect } from "vitest";
import {
  siteSettingsQuery,
  pageBySlugQuery,
  allPageSlugsQuery,
  navigationQuery,
  footerQuery,
  contactInfoQuery,
} from "./queries";

describe("GROQ queries", () => {
  it("siteSettingsQuery selects the single siteSettings document", () => {
    expect(siteSettingsQuery).toContain('*[_type == "siteSettings"][0]');
    expect(siteSettingsQuery).toContain("siteName");
    expect(siteSettingsQuery).toContain("siteDescription");
    expect(siteSettingsQuery).toContain("logoDark");
    expect(siteSettingsQuery).toContain("logoLight");
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

describe("navigationQuery", () => {
  it("targets the navigation singleton", () => {
    expect(navigationQuery).toContain('*[_type == "navigation"][0]');
  });

  it("projects items with label, href, openInNewTab", () => {
    expect(navigationQuery).toContain("items[]");
    expect(navigationQuery).toContain("label");
    expect(navigationQuery).toContain("href");
    expect(navigationQuery).toContain("openInNewTab");
  });

  it("projects the CTA button", () => {
    expect(navigationQuery).toContain("ctaButton");
  });
});

describe("footerQuery", () => {
  it("targets the footer singleton", () => {
    expect(footerQuery).toContain('*[_type == "footer"][0]');
  });

  it("projects columns with nested links", () => {
    expect(footerQuery).toContain("columns[]");
    expect(footerQuery).toContain("heading");
    expect(footerQuery).toContain("links[]");
  });

  it("projects bottom links, socials, copyright, tagline", () => {
    expect(footerQuery).toContain("bottomLinks[]");
    expect(footerQuery).toContain("socials[]");
    expect(footerQuery).toContain("copyright");
    expect(footerQuery).toContain("tagline");
  });
});

describe("contactInfoQuery", () => {
  it("targets the contactInfo singleton", () => {
    expect(contactInfoQuery).toContain('*[_type == "contactInfo"][0]');
  });

  it("projects phone (display + dial), email, hours, address", () => {
    expect(contactInfoQuery).toContain("phone");
    expect(contactInfoQuery).toContain("display");
    expect(contactInfoQuery).toContain("dial");
    expect(contactInfoQuery).toContain("email");
    expect(contactInfoQuery).toContain("hours");
    expect(contactInfoQuery).toContain("address");
  });

  it("projects hours sub-fields needed by the client open-now script", () => {
    expect(contactInfoQuery).toContain("weekdayLabel");
    expect(contactInfoQuery).toContain("openMinute");
    expect(contactInfoQuery).toContain("closeMinute");
    expect(contactInfoQuery).toContain("timezone");
  });
});
