import type { PortableTextBlock } from "@portabletext/types";

export type HeadlineRichText = PortableTextBlock[];

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
  cardTitle: string;
  phone: { display: string; dial: string };
  email: string;
  hours: Hours;
  address: Address;
};

export type ServicesIndexPage = {
  heroEyebrow: string;
  heroHeading: HeadlineRichText;
  heroDeck: string;
  listEyebrow: string;
  listHeading: string;
  ctaEyebrow: string;
  ctaHeading: HeadlineRichText;
  ctaDeck: string;
  ctaLabel: string;
  ctaHref: string;
  otherServicesHeading: string;
  otherServicesViewAllLabel: string;
};

// ── Documents referenced from page blocks ────────────────────────────────

export type IconName =
  | "monitor"
  | "shield"
  | "cloud"
  | "server"
  | "compass"
  | "globe"
  | "arrow"
  | "arrowSm"
  | "check"
  | "phone"
  | "mail"
  | "chevron";

export type TeamMemberResolved = {
  _id: string;
  name: string;
  role: string;
  bio: string;
  order: number;
  photo?: ResolvedImage;
};

export type ServiceCard = {
  name: string;
  slug: string;
  shortDescription: string;
  iconName: IconName;
};

// Used for the home-page ServicesList block — projection includes _id + order.
export type ServiceResolved = ServiceCard & {
  _id: string;
  order: number;
};

export type ServiceCapability = {
  name: string;
  body: string;
};

export type ServiceStat = {
  k: string;
  v: string;
};

export type ServiceFaqEntry = {
  question: string;
  answer: string;
};

export type ServiceFull = ServiceCard & {
  order: number;
  // Hero
  eyebrow: string;
  headline: HeadlineRichText;
  deck: string;
  heroStat: ServiceStat;
  heroPillLeft?: string;
  heroPillRight?: string;
  // Approach
  sectionEyebrow: string;
  sectionHeading: HeadlineRichText;
  sectionBody: string;
  sectionBullets: string[];
  // Capabilities
  capabilitiesEyebrow: string;
  capabilitiesHeading: HeadlineRichText;
  capabilities: ServiceCapability[];
  // Stats
  statStrip: ServiceStat[];
  // FAQ
  faqEyebrow: string;
  faqHelperText?: string;
  faqHeading: HeadlineRichText;
  faqs: ServiceFaqEntry[];
  // CTA
  ctaEyebrow: string;
  ctaDeck: string;
};

// ── Page-body block types ────────────────────────────────────────────────

export type Credential = {
  title: string;
  sub: string;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type DarkNumbersHeroBlock = {
  _type: "darkNumbersHero";
  _key: string;
  eyebrow: string;
  bigNumber: string;
  bigNumberCaption: string;
  subheadline: string;
  deck: string;
  ctaPrimary: CtaLink;
  ctaSecondary?: CtaLink;
  credentials: Credential[];
};

export type TrustStripBlock = {
  _type: "trustStrip";
  _key: string;
  label: string;
  items: string[];
};

export type TeamGridBlock = {
  _type: "teamGrid";
  _key: string;
  eyebrow: string;
  heading: string;
  deck?: string;
  sideLink?: CtaLink;
  members: TeamMemberResolved[];
};

export type HeadacheItem = {
  pain: string;
  fix: string;
};

export type HeadachesBlock = {
  _type: "headaches";
  _key: string;
  eyebrow: string;
  heading: string;
  deck: string;
  items: HeadacheItem[];
};

export type SavingsCategory = {
  label: string;
  before: number;
  after: number;
};

export type SavingsChartData = {
  caption: string;
  categories: SavingsCategory[];
  footnote?: string;
};

export type SavingsBlock = {
  _type: "savings";
  _key: string;
  eyebrow: string;
  heading: string;
  deck: string;
  bulletList?: string[];
  chart: SavingsChartData;
};

export type ServicesListBlock = {
  _type: "servicesList";
  _key: string;
  eyebrow: string;
  heading: string;
  services: ServiceResolved[];
};

export type BeliefsBlock = {
  _type: "beliefs";
  _key: string;
  eyebrow: string;
  heading: string;
  deck?: string;
  items: string[];
};

export type CtaCardBlock = {
  _type: "ctaCard";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  deck: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
};

export type PageBlock =
  | DarkNumbersHeroBlock
  | TrustStripBlock
  | TeamGridBlock
  | HeadachesBlock
  | SavingsBlock
  | ServicesListBlock
  | BeliefsBlock
  | CtaCardBlock;
