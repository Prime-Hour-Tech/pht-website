import { describe, it, expect } from "vitest";
import {
  siteSettingsQuery,
  pageBySlugQuery,
  allPageSlugsQuery,
  navigationQuery,
  footerQuery,
  contactInfoQuery,
  servicesSlugListQuery,
  serviceBySlugQuery,
  servicesListQuery,
  otherServicesQuery,
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

  it("pageBySlugQuery ctaCard projection drops headingAccent and projects heading as Portable Text", () => {
    expect(pageBySlugQuery).toContain('_type == "ctaCard"');
    // Scope: assert heading is projected INSIDE the ctaCard block.
    // The ctaCard arrow is `_type == "ctaCard" => { ... }`. Match against
    // the block body to confirm `heading` is one of its projections.
    const ctaCardBlock = pageBySlugQuery.match(/_type == "ctaCard"[^}]*\{([^}]*)\}/);
    expect(ctaCardBlock).not.toBeNull();
    expect(ctaCardBlock![1]).toMatch(/\bheading\b/);
    expect(ctaCardBlock![1]).not.toMatch(/\bheadingAccent\b/);
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

describe("pageBySlugQuery — block projections", () => {
  it("projects darkNumbersHero fields", () => {
    expect(pageBySlugQuery).toContain('"darkNumbersHero"');
    expect(pageBySlugQuery).toContain("bigNumber");
    expect(pageBySlugQuery).toContain("credentials[]");
  });

  it("projects trustStrip fields", () => {
    expect(pageBySlugQuery).toContain('"trustStrip"');
    expect(pageBySlugQuery).toContain("items");
  });

  it("dereferences teamGrid members and orders by `order`", () => {
    expect(pageBySlugQuery).toContain('"teamGrid"');
    expect(pageBySlugQuery).toContain("members[]->");
    expect(pageBySlugQuery).toContain("order(order asc)");
  });

  it("projects headaches items with pain and fix", () => {
    expect(pageBySlugQuery).toContain('"headaches"');
    expect(pageBySlugQuery).toContain("pain");
    expect(pageBySlugQuery).toContain("fix");
  });

  it("projects savings chart categories", () => {
    expect(pageBySlugQuery).toContain('"savings"');
    expect(pageBySlugQuery).toContain("categories[]");
    expect(pageBySlugQuery).toContain("before");
    expect(pageBySlugQuery).toContain("after");
  });

  it("dereferences servicesList services", () => {
    expect(pageBySlugQuery).toContain('"servicesList"');
    expect(pageBySlugQuery).toContain("services[]->");
  });

  it("projects beliefs and ctaCard", () => {
    expect(pageBySlugQuery).toContain('"beliefs"');
    expect(pageBySlugQuery).toContain('"ctaCard"');
    expect(pageBySlugQuery).toContain("primaryCtaLabel");
  });

  it("no longer references the deleted hero block type", () => {
    expect(pageBySlugQuery).not.toContain('"hero"');
  });
});

describe("service queries", () => {
  it("servicesSlugListQuery selects complete service documents (skips incomplete legacy docs)", () => {
    expect(servicesSlugListQuery).toContain('_type == "service"');
    expect(servicesSlugListQuery).toContain("defined(headline)");
    expect(servicesSlugListQuery).toContain("defined(heroStat)");
    expect(servicesSlugListQuery).toContain('"slug": slug.current');
  });

  it("serviceBySlugQuery filters by slug and projects all expanded fields", () => {
    expect(serviceBySlugQuery).toContain('*[_type == "service" && slug.current == $slug][0]');
    // Word-boundary matching so substring fields don't satisfy each other
    // (e.g., "name" must not match against "iconName" or "capabilitiesHeading").
    const fields = [
      // Card fields
      "name",
      "shortDescription",
      "iconName",
      "order",
      // Hero
      "eyebrow",
      "headline",
      "deck",
      "heroStat",
      "heroPillLeft",
      "heroPillRight",
      // Approach
      "sectionEyebrow",
      "sectionHeading",
      "sectionBody",
      "sectionBullets",
      // Capabilities
      "capabilitiesHeading",
      "capabilities",
      // Stats
      "statStrip",
      // FAQ
      "faqHeading",
      "faqs",
    ];
    for (const field of fields) {
      expect(serviceBySlugQuery).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("servicesListQuery filters complete services, orders by order asc, projects card fields", () => {
    expect(servicesListQuery).toContain('_type == "service"');
    expect(servicesListQuery).toContain("defined(headline)");
    expect(servicesListQuery).toContain("defined(heroStat)");
    expect(servicesListQuery).toContain("order(order asc)");
    expect(servicesListQuery).toContain("name");
    expect(servicesListQuery).toContain("shortDescription");
    expect(servicesListQuery).toContain("iconName");
  });

  it("otherServicesQuery filters complete sibling services, orders by order asc", () => {
    expect(otherServicesQuery).toContain('_type == "service"');
    expect(otherServicesQuery).toContain("slug.current != $slug");
    expect(otherServicesQuery).toContain("defined(headline)");
    expect(otherServicesQuery).toContain("defined(heroStat)");
    expect(otherServicesQuery).toContain("order(order asc)");
    expect(otherServicesQuery).toContain("name");
    expect(otherServicesQuery).toContain("shortDescription");
    expect(otherServicesQuery).toContain("iconName");
  });
});
