export type ImageRef = {
  asset: { _ref: string; _type: "reference" };
  // Required at the schema level on both siteSettings.defaultOgImage and page.ogImage.
  // The whole image object can be absent (parent fields are optional), but if it
  // exists, alt is always present.
  alt: string;
};

// Logos are projected with the asset URL resolved at query time (no image
// URL builder yet — see queries.ts). Other image fields use ImageRef and
// rely on the future builder for transformations.
//
// Two logo variants: logoDark goes on light backgrounds (the navbar),
// logoLight goes on dark backgrounds (the footer).
export type ResolvedImage = {
  url: string;
  alt: string;
};

export type SiteSettings = {
  siteName: string;
  siteDescription: string;
  logoDark?: ResolvedImage;
  logoLight?: ResolvedImage;
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

// ── Chrome singletons ────────────────────────────────────────────────────

export type NavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type CTAButton = {
  label: string;
  href: string;
};

export type Navigation = {
  items: NavItem[];
  ctaButton: CTAButton;
};

export type FooterLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export type BottomLink = {
  label: string;
  href: string;
};

export type SocialPlatform = "linkedin" | "github" | "x" | "youtube";

export type Social = {
  platform: SocialPlatform;
  href: string;
};

export type Footer = {
  tagline?: string;
  columns?: FooterColumn[];
  bottomLinks?: BottomLink[];
  socials?: Social[];
  copyright: string;
};

export type Hours = {
  weekdayLabel: string;
  openMinute: number;
  closeMinute: number;
  timezone: string;
};

export type Address = {
  city: string;
  state: string;
  street?: string;
  postal?: string;
};

export type ContactInfo = {
  phone: { display: string; dial: string };
  email: string;
  hours: Hours;
  address: Address;
};
