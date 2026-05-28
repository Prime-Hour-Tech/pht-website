import { vi } from "vitest";
vi.mock("./sanity/imageUrl", () => ({
  urlFor: (_source: unknown) => ({
    width: () => ({
      height: () => ({
        fit: () => ({
          url: () => "https://cdn.sanity.io/images/proj/dataset/test-1200x630.jpg",
        }),
      }),
    }),
  }),
}));

import { describe, it, expect } from "vitest";
import {
  buildArticleJsonLd,
  buildOrganizationJsonLd,
  minuteToTime,
} from "./structuredData";
import type {
  ContactInfo,
  Footer,
  PostFull,
  SiteSettings,
} from "./sanity/types";

const baseSiteSettings: SiteSettings = {
  siteName: "Prime Hour Tech",
  siteDescription: "Salt Lake City MSP for small + midsize businesses.",
  logoDark: { url: "https://cdn.sanity.io/images/proj/dataset/abc-200x200.png", alt: "PHT logo" },
};

const baseContactInfo: ContactInfo = {
  cardTitle: "Get in touch",
  serviceAreaSub: "Salt Lake City + the Wasatch Front",
  phone: { display: "(801) 555-0100", dial: "+18015550100" },
  email: "hello@primehourtech.com",
  hours: { weekdayLabel: "Mon–Fri 8am–6pm", openMinute: 480, closeMinute: 1080, timezone: "America/Denver" },
  address: { city: "Salt Lake City", state: "UT" },
};

const baseFooter: Footer = {
  copyright: "© 2026 Prime Hour Tech",
  socials: [
    { platform: "linkedin", href: "https://linkedin.com/company/pht" },
    { platform: "x", href: "https://x.com/pht" },
  ],
};

const SITE_URL = "https://primehourtech.com";

describe("minuteToTime", () => {
  it("formats minute-of-day as HH:MM", () => {
    expect(minuteToTime(0)).toBe("00:00");
    expect(minuteToTime(480)).toBe("08:00");
    expect(minuteToTime(1080)).toBe("18:00");
    expect(minuteToTime(1439)).toBe("23:59");
  });

  it("zero-pads single-digit hours and minutes", () => {
    expect(minuteToTime(65)).toBe("01:05");
  });
});

describe("buildOrganizationJsonLd", () => {
  it("includes required LocalBusiness fields", () => {
    const ld = buildOrganizationJsonLd({
      siteSettings: baseSiteSettings,
      contactInfo: baseContactInfo,
      footer: baseFooter,
      siteUrl: SITE_URL,
    });
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("LocalBusiness");
    expect(ld["@id"]).toBe(`${SITE_URL}/#organization`);
    expect(ld.name).toBe("Prime Hour Tech");
    expect(ld.url).toBe(SITE_URL);
    expect(ld.description).toBe(baseSiteSettings.siteDescription);
    expect(ld.telephone).toBe("+18015550100");
    expect(ld.email).toBe("hello@primehourtech.com");
  });

  it("renders address with city, state, country and omits empty street/postal", () => {
    const ld = buildOrganizationJsonLd({
      siteSettings: baseSiteSettings,
      contactInfo: baseContactInfo,
      footer: baseFooter,
      siteUrl: SITE_URL,
    });
    const address = ld.address as Record<string, string>;
    expect(address["@type"]).toBe("PostalAddress");
    expect(address.addressLocality).toBe("Salt Lake City");
    expect(address.addressRegion).toBe("UT");
    expect(address.addressCountry).toBe("US");
    expect(address.streetAddress).toBeUndefined();
    expect(address.postalCode).toBeUndefined();
  });

  it("includes streetAddress and postalCode when present", () => {
    const ld = buildOrganizationJsonLd({
      siteSettings: baseSiteSettings,
      contactInfo: {
        ...baseContactInfo,
        address: { city: "Salt Lake City", state: "UT", street: "123 Main St", postal: "84101" },
      },
      footer: baseFooter,
      siteUrl: SITE_URL,
    });
    const address = ld.address as Record<string, string>;
    expect(address.streetAddress).toBe("123 Main St");
    expect(address.postalCode).toBe("84101");
  });

  it("renders openingHoursSpecification from minute integers", () => {
    const ld = buildOrganizationJsonLd({
      siteSettings: baseSiteSettings,
      contactInfo: baseContactInfo,
      footer: baseFooter,
      siteUrl: SITE_URL,
    });
    const hours = (ld.openingHoursSpecification as Array<Record<string, unknown>>)[0];
    expect(hours["@type"]).toBe("OpeningHoursSpecification");
    expect(hours.dayOfWeek).toEqual(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
    expect(hours.opens).toBe("08:00");
    expect(hours.closes).toBe("18:00");
  });

  it("includes logo and image when logoDark is present", () => {
    const ld = buildOrganizationJsonLd({
      siteSettings: baseSiteSettings,
      contactInfo: baseContactInfo,
      footer: baseFooter,
      siteUrl: SITE_URL,
    });
    expect(ld.logo).toEqual({
      "@type": "ImageObject",
      url: "https://cdn.sanity.io/images/proj/dataset/abc-200x200.png",
    });
    expect(ld.image).toBe("https://cdn.sanity.io/images/proj/dataset/abc-200x200.png");
  });

  it("omits logo and image when logoDark is absent", () => {
    const ld = buildOrganizationJsonLd({
      siteSettings: { ...baseSiteSettings, logoDark: undefined },
      contactInfo: baseContactInfo,
      footer: baseFooter,
      siteUrl: SITE_URL,
    });
    expect(ld.logo).toBeUndefined();
    expect(ld.image).toBeUndefined();
  });

  it("populates sameAs from non-empty footer.socials", () => {
    const ld = buildOrganizationJsonLd({
      siteSettings: baseSiteSettings,
      contactInfo: baseContactInfo,
      footer: baseFooter,
      siteUrl: SITE_URL,
    });
    expect(ld.sameAs).toEqual([
      "https://linkedin.com/company/pht",
      "https://x.com/pht",
    ]);
  });

  it("omits sameAs when socials array is empty or undefined", () => {
    const emptyFooter: Footer = { ...baseFooter, socials: [] };
    const ld1 = buildOrganizationJsonLd({
      siteSettings: baseSiteSettings,
      contactInfo: baseContactInfo,
      footer: emptyFooter,
      siteUrl: SITE_URL,
    });
    expect(ld1.sameAs).toBeUndefined();

    const noSocialsFooter: Footer = { ...baseFooter, socials: undefined };
    const ld2 = buildOrganizationJsonLd({
      siteSettings: baseSiteSettings,
      contactInfo: baseContactInfo,
      footer: noSocialsFooter,
      siteUrl: SITE_URL,
    });
    expect(ld2.sameAs).toBeUndefined();
  });
});

describe("buildArticleJsonLd", () => {
  const basePost: PostFull = {
    _id: "post-1",
    title: "Why MSPs Matter",
    slug: "why-msps-matter",
    excerpt: "A short summary.",
    category: "Practice",
    publishDate: "2026-03-15",
    coverImage: {
      asset: { _ref: "image-abc123-1200x630-jpg", _type: "reference" },
      alt: "Cover photo",
    },
    body: [],
    author: {
      _id: "author-1",
      name: "Devin Curtis",
      role: "Founder + Principal Engineer",
      bio: "Years of MSP experience.",
    },
  };

  const CANONICAL = "https://primehourtech.com/blog/why-msps-matter";

  it("includes required BlogPosting fields", () => {
    const ld = buildArticleJsonLd({
      post: basePost,
      siteSettings: baseSiteSettings,
      canonicalUrl: CANONICAL,
      siteUrl: SITE_URL,
    });
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("BlogPosting");
    expect(ld.headline).toBe("Why MSPs Matter");
    expect(ld.datePublished).toBe("2026-03-15");
    expect(ld.articleSection).toBe("Practice");
    expect(ld.url).toBe(CANONICAL);
  });

  it("dateModified falls back to publishDate when updatedAt is undefined", () => {
    const ld = buildArticleJsonLd({
      post: basePost,
      siteSettings: baseSiteSettings,
      canonicalUrl: CANONICAL,
      siteUrl: SITE_URL,
    });
    expect(ld.dateModified).toBe("2026-03-15");
  });

  it("dateModified uses updatedAt when present", () => {
    const ld = buildArticleJsonLd({
      post: { ...basePost, updatedAt: "2026-04-01T12:00:00Z" },
      siteSettings: baseSiteSettings,
      canonicalUrl: CANONICAL,
      siteUrl: SITE_URL,
    });
    expect(ld.dateModified).toBe("2026-04-01T12:00:00Z");
  });

  it("description prefers seoDescription, falls back to excerpt", () => {
    const ldExcerpt = buildArticleJsonLd({
      post: basePost,
      siteSettings: baseSiteSettings,
      canonicalUrl: CANONICAL,
      siteUrl: SITE_URL,
    });
    expect(ldExcerpt.description).toBe("A short summary.");

    const ldSeo = buildArticleJsonLd({
      post: { ...basePost, seoDescription: "SEO-specific copy." },
      siteSettings: baseSiteSettings,
      canonicalUrl: CANONICAL,
      siteUrl: SITE_URL,
    });
    expect(ldSeo.description).toBe("SEO-specific copy.");
  });

  it("author renders as a Person with name and jobTitle", () => {
    const ld = buildArticleJsonLd({
      post: basePost,
      siteSettings: baseSiteSettings,
      canonicalUrl: CANONICAL,
      siteUrl: SITE_URL,
    });
    expect(ld.author).toEqual({
      "@type": "Person",
      name: "Devin Curtis",
      jobTitle: "Founder + Principal Engineer",
    });
  });

  it("publisher @id matches the Organization @id", () => {
    const ld = buildArticleJsonLd({
      post: basePost,
      siteSettings: baseSiteSettings,
      canonicalUrl: CANONICAL,
      siteUrl: SITE_URL,
    });
    const publisher = ld.publisher as Record<string, unknown>;
    expect(publisher["@type"]).toBe("Organization");
    expect(publisher["@id"]).toBe(`${SITE_URL}/#organization`);
    expect(publisher.name).toBe("Prime Hour Tech");
  });

  it("mainEntityOfPage references the canonical URL", () => {
    const ld = buildArticleJsonLd({
      post: basePost,
      siteSettings: baseSiteSettings,
      canonicalUrl: CANONICAL,
      siteUrl: SITE_URL,
    });
    expect(ld.mainEntityOfPage).toEqual({ "@type": "WebPage", "@id": CANONICAL });
  });
});
