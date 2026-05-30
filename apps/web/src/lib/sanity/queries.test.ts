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
  postSlugListQuery,
  postBySlugQuery,
  allPostsForRssQuery,
  allPostsQuery,
  relatedPostsQuery,
  termsPageQuery,
  privacyPageQuery,
  allLandingSlugsQuery,
  landingBySlugQuery,
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

  it("projects the cardTitle field shared across CtaCard + service CTA components", () => {
    expect(contactInfoQuery).toMatch(/\bcardTitle\b/);
  });

  it("projects serviceAreaSub for the Contact page Service Area panel", () => {
    expect(contactInfoQuery).toMatch(/\bserviceAreaSub\b/);
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

  it("projects pageHero fields", () => {
    expect(pageBySlugQuery).toContain('"pageHero"');
    const block = pageBySlugQuery.match(/_type == "pageHero"[^}]*\{([^}]*)\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "headline", "deck"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects originPhoto fields", () => {
    expect(pageBySlugQuery).toContain('"originPhoto"');
    const block = pageBySlugQuery.match(/_type == "originPhoto"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["image", "aspectRatio", "caption", "eyebrowLabel", "quote", "attribution"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects storyThreeCol fields", () => {
    expect(pageBySlugQuery).toContain('"storyThreeCol"');
    const block = pageBySlugQuery.match(/_type == "storyThreeCol"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "columns"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects numbersStrip fields", () => {
    expect(pageBySlugQuery).toContain('"numbersStrip"');
    const block = pageBySlugQuery.match(/_type == "numbersStrip"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    expect(block![1]).toMatch(/\bstats\b/);
  });

  it("projects milestonesTimeline fields", () => {
    expect(pageBySlugQuery).toContain('"milestonesTimeline"');
    const block = pageBySlugQuery.match(/_type == "milestonesTimeline"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "deck", "items"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects officeCulture fields", () => {
    expect(pageBySlugQuery).toContain('"officeCulture"');
    const block = pageBySlugQuery.match(/_type == "officeCulture"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["image", "aspectRatio", "eyebrow", "heading", "body", "bullets"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects industriesContent fields", () => {
    expect(pageBySlugQuery).toContain('"industriesContent"');
    const block = pageBySlugQuery.match(/_type == "industriesContent"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["jumpLabel", "verticals", "id", "iconName", "name", "sub", "intro", "bullets", "examples"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
    expect(block![1]).toContain('"id": id.current');
  });

  it("projects industriesDontSeeYours fields", () => {
    expect(pageBySlugQuery).toContain('"industriesDontSeeYours"');
    const block = pageBySlugQuery.match(/_type == "industriesDontSeeYours"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "deck", "primaryCta", "secondaryCta"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects contactBody fields", () => {
    expect(pageBySlugQuery).toContain('"contactBody"');
    const block = pageBySlugQuery.match(/_type == "contactBody"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["formHeading", "formDeck", "promptingOptions", "submitLabel", "submitNote", "successHeading", "successBody", "existingClientPanel"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects postList fields", () => {
    expect(pageBySlugQuery).toContain('"postList"');
    const block = pageBySlugQuery.match(/_type == "postList"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "emptyStateMessage"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects servicesIndexHero fields", () => {
    expect(pageBySlugQuery).toContain('"servicesIndexHero"');
    const block = pageBySlugQuery.match(/_type == "servicesIndexHero"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "deck", "featuredService"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
    expect(block![1]).toContain("featuredService->");
  });

  it("projects pricingTiers fields", () => {
    expect(pageBySlugQuery).toContain('"pricingTiers"');
    const block = pageBySlugQuery.match(/_type == "pricingTiers"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "deck", "essentials", "standard", "premier"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects bundleGrid fields", () => {
    expect(pageBySlugQuery).toContain('"bundleGrid"');
    const block = pageBySlugQuery.match(/_type == "bundleGrid"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "deck", "secondaryLinkLabel", "secondaryLinkHref", "tiles", "footerLinkLabel", "footerLinkHref"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects processStrip fields", () => {
    expect(pageBySlugQuery).toContain('"processStrip"');
    const block = pageBySlugQuery.match(/_type == "processStrip"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "steps"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects industryCrosslink fields", () => {
    expect(pageBySlugQuery).toContain('"industryCrosslink"');
    const block = pageBySlugQuery.match(/_type == "industryCrosslink"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "tiles"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects switchingHero fields", () => {
    expect(pageBySlugQuery).toContain('"switchingHero"');
    const block = pageBySlugQuery.match(/_type == "switchingHero"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "title", "deck", "ctaPrimaryLabel", "ctaPrimaryHref", "ctaSecondaryLabel", "ctaSecondaryHref", "dealCard", "factSheetLabel", "liveDotLabel", "stats"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects switchingReasons fields", () => {
    expect(pageBySlugQuery).toContain('"switchingReasons"');
    const block = pageBySlugQuery.match(/_type == "switchingReasons"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "title", "deck", "items"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects switchingTimeline fields", () => {
    expect(pageBySlugQuery).toContain('"switchingTimeline"');
    const block = pageBySlugQuery.match(/_type == "switchingTimeline"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "title", "deck", "phases"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects switchingHandle fields", () => {
    expect(pageBySlugQuery).toContain('"switchingHandle"');
    const block = pageBySlugQuery.match(/_type == "switchingHandle"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "title", "deck", "items"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects switchingCompare fields", () => {
    expect(pageBySlugQuery).toContain('"switchingCompare"');
    const block = pageBySlugQuery.match(/_type == "switchingCompare"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "title", "usHeader", "themHeader", "rows"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects switchingPromises fields", () => {
    expect(pageBySlugQuery).toContain('"switchingPromises"');
    const block = pageBySlugQuery.match(/_type == "switchingPromises"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "title", "promises"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects switchingTestimonial fields", () => {
    expect(pageBySlugQuery).toContain('"switchingTestimonial"');
    const block = pageBySlugQuery.match(/_type == "switchingTestimonial"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "quote", "attributionRole", "attributionContext"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("projects faqList fields", () => {
    expect(pageBySlugQuery).toContain('"faqList"');
    const block = pageBySlugQuery.match(/_type == "faqList"[^{}]*\{([\s\S]*?)\}\s*\}/);
    expect(block).not.toBeNull();
    for (const field of ["eyebrow", "heading", "items"]) {
      expect(block![1]).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });
});

describe("service queries", () => {
  it("servicesSlugListQuery selects complete service documents (skips incomplete legacy docs)", () => {
    expect(servicesSlugListQuery).toContain('_type == "service"');
    expect(servicesSlugListQuery).toContain("defined(headline)");
    expect(servicesSlugListQuery).toContain("defined(heroStat)");
    // Slice-3 fix-up required fields - services missing these aren't
    // route-eligible (would render `◆ undefined` etc.).
    expect(servicesSlugListQuery).toContain("defined(capabilitiesEyebrow)");
    expect(servicesSlugListQuery).toContain("defined(faqEyebrow)");
    expect(servicesSlugListQuery).toContain("defined(ctaEyebrow)");
    expect(servicesSlugListQuery).toContain("defined(ctaDeck)");
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
      "capabilitiesEyebrow",
      "capabilitiesHeading",
      "capabilities",
      // Stats
      "statStrip",
      // FAQ
      "faqEyebrow",
      "faqHelperText",
      "faqHeading",
      "faqs",
      // CTA
      "ctaEyebrow",
      "ctaDeck",
      // Spec sheet
      "specSheetUrl",
    ];
    for (const field of fields) {
      expect(serviceBySlugQuery).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("servicesListQuery filters complete services, orders by order asc, projects card fields", () => {
    expect(servicesListQuery).toContain('_type == "service"');
    expect(servicesListQuery).toContain("defined(headline)");
    expect(servicesListQuery).toContain("defined(heroStat)");
    expect(servicesListQuery).toContain("defined(capabilitiesEyebrow)");
    expect(servicesListQuery).toContain("defined(faqEyebrow)");
    expect(servicesListQuery).toContain("defined(ctaEyebrow)");
    expect(servicesListQuery).toContain("defined(ctaDeck)");
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
    expect(otherServicesQuery).toContain("defined(capabilitiesEyebrow)");
    expect(otherServicesQuery).toContain("defined(faqEyebrow)");
    expect(otherServicesQuery).toContain("defined(ctaEyebrow)");
    expect(otherServicesQuery).toContain("defined(ctaDeck)");
    expect(otherServicesQuery).toContain("order(order asc)");
    expect(otherServicesQuery).toContain("name");
    expect(otherServicesQuery).toContain("shortDescription");
    expect(otherServicesQuery).toContain("iconName");
  });

});

describe("blog queries", () => {
  it("postSlugListQuery selects complete posts (skips incomplete drafts)", () => {
    expect(postSlugListQuery).toContain('_type == "post"');
    expect(postSlugListQuery).toContain("defined(slug.current)");
    expect(postSlugListQuery).toContain("defined(body)");
    expect(postSlugListQuery).toContain("defined(coverImage)");
    expect(postSlugListQuery).toContain("defined(category)");
    expect(postSlugListQuery).toContain("defined(publishDate)");
    expect(postSlugListQuery).toContain("defined(author)");
    expect(postSlugListQuery).toContain('"slug": slug.current');
  });

  it("postBySlugQuery filters by slug and projects all post + dereferenced author fields", () => {
    expect(postBySlugQuery).toContain('*[_type == "post" && slug.current == $slug][0]');
    const fields = [
      "title",
      "excerpt",
      "category",
      "publishDate",
      "coverImage",
      "body",
      "seoTitle",
      "seoDescription",
      "ogImage",
      "updatedAt",
    ];
    for (const field of fields) {
      expect(postBySlugQuery).toMatch(new RegExp(`\\b${field}\\b`));
    }
    expect(postBySlugQuery).toContain("author->");
    expect(postBySlugQuery).toContain('"updatedAt": _updatedAt');
  });

  it("allPostsQuery orders by publishDate desc and projects card-shape fields", () => {
    expect(allPostsQuery).toContain('_type == "post"');
    expect(allPostsQuery).toContain("order(publishDate desc)");
    expect(allPostsQuery).toContain("title");
    expect(allPostsQuery).toContain("excerpt");
    expect(allPostsQuery).toContain("category");
    expect(allPostsQuery).toContain("coverImage");
    expect(allPostsQuery).toContain("author->");
  });

  it("allPostsForRssQuery filters published posts, orders desc, slices to 20, projects RSS fields", () => {
    expect(allPostsForRssQuery).toContain('_type == "post"');
    expect(allPostsForRssQuery).toContain("defined(slug.current)");
    expect(allPostsForRssQuery).toContain("defined(publishDate)");
    expect(allPostsForRssQuery).toContain("order(publishDate desc)");
    expect(allPostsForRssQuery).toContain("[0...20]");
    for (const field of ["title", "excerpt", "category", "publishDate"]) {
      expect(allPostsForRssQuery).toMatch(new RegExp(`\\b${field}\\b`));
    }
    expect(allPostsForRssQuery).toContain('"slug": slug.current');
  });

  it("relatedPostsQuery filters by category, excludes current slug, orders by publishDate desc", () => {
    expect(relatedPostsQuery).toContain('_type == "post"');
    expect(relatedPostsQuery).toContain("category == $category");
    expect(relatedPostsQuery).toContain("slug.current != $slug");
    expect(relatedPostsQuery).toContain("order(publishDate desc)");
    expect(relatedPostsQuery).toContain("[0...3]");
  });

});

describe("legal queries", () => {
  it("termsPageQuery selects the singleton with all fields", () => {
    expect(termsPageQuery).toContain('*[_type == "termsPage"][0]');
    const fields = [
      "eyebrow",
      "title",
      "lastUpdated",
      "summaryHeading",
      "summaryBody",
      "sections",
      "contactCardLabel",
      "contactCardCopy",
      "contactCardCtaLabel",
      "contactCardCtaHref",
    ];
    for (const field of fields) {
      expect(termsPageQuery).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });

  it("privacyPageQuery selects the singleton with all fields", () => {
    expect(privacyPageQuery).toContain('*[_type == "privacyPage"][0]');
    const fields = [
      "eyebrow",
      "title",
      "lastUpdated",
      "summaryHeading",
      "summaryBody",
      "sections",
      "contactCardLabel",
      "contactCardCopy",
      "contactCardCtaLabel",
      "contactCardCtaHref",
    ];
    for (const field of fields) {
      expect(privacyPageQuery).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });
});

describe("landing queries", () => {
  it("allLandingSlugsQuery filters by completeness and projects slug only", () => {
    expect(allLandingSlugsQuery).toContain('_type == "landingPage"');
    expect(allLandingSlugsQuery).toContain("defined(slug.current)");
    expect(allLandingSlugsQuery).toContain("defined(hero)");
    expect(allLandingSlugsQuery).toContain("defined(form)");
    expect(allLandingSlugsQuery).toContain("defined(cta)");
    expect(allLandingSlugsQuery).toContain('"slug": slug.current');
  });

  it("landingBySlugQuery selects by slug and projects all section fields", () => {
    expect(landingBySlugQuery).toContain('*[_type == "landingPage" && slug.current == $slug][0]');
    const fields = [
      "title", "seoTitle", "seoDescription", "ogImage",
      "hero", "form", "trustBar", "problem", "included",
      "howItWorks", "faq", "cta",
      "metaEyebrow", "ctaPrimaryLabel", "ctaPrimaryHref", "heroStats",
      "cardEyebrow", "situationPlaceholder", "submitLabel", "replyNote",
      "successHeading", "successBody",
      "prefixLabel",
      "bullets", "steps", "question", "answer",
    ];
    for (const field of fields) {
      expect(landingBySlugQuery).toMatch(new RegExp(`\\b${field}\\b`));
    }
  });
});
