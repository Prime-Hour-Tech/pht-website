export type ImageRef = {
  asset: { _ref: string; _type: "reference" };
  // Required at the schema level on both siteSettings.defaultOgImage and page.ogImage.
  // The whole image object can be absent (parent fields are optional), but if it
  // exists, alt is always present.
  alt: string;
};

export type SiteSettings = {
  siteName: string;
  siteDescription: string;
  defaultOgImage?: ImageRef;
};

export type HeroBlock = {
  _type: "hero";
  _key: string;
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type PageBlock = HeroBlock; // union grows as more block types are added

export type Page = {
  _id: string;
  title: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: ImageRef;
  blocks?: PageBlock[];
};
