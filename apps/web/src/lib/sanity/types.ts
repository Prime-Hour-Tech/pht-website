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
  serviceAreaSub: string;
  phone: { display: string; dial: string };
  email: string;
  hours: Hours;
  address: Address;
};

export type PricingTier = {
  tag: string;
  tagline: string;
  price: number;
  includesHead: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  flagLabel?: string;
};

export type BundleRow = {
  serviceLabel: string;
  descriptor: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type IndustryCrosslinkTile = {
  iconName: IconName;
  label: string;
  sub: string;
  href: string;
};

export type FeaturedService = {
  _id: string;
  name: string;
  slug: string;
  iconName: IconName;
  eyebrow: string;
  headline: HeadlineRichText;
  deck: string;
  heroStat: ServiceStat;
  capabilities: ServiceCapability[];
};

export type ServicesIndexPage = {
  heroEyebrow: string;
  heroHeading: HeadlineRichText;
  heroDeck: string;

  featuredService: FeaturedService;

  pricingHeading: { eyebrow: string; heading: HeadlineRichText; deck: string };
  pricingTiers: {
    essentials: PricingTier;
    standard: PricingTier;
    premier: PricingTier;
  };
  pricingFooterNote: string;
  pricingFooterLinkLabel: string;
  pricingFooterLinkHref: string;

  gridHeading: {
    eyebrow: string;
    heading: HeadlineRichText;
    secondaryLinkLabel?: string;
    secondaryLinkHref?: string;
  };
  bundleTile: {
    eyebrow: string;
    heading: string;
    body: string;
    rows: BundleRow[];
    footerHeadline: HeadlineRichText;
    footerLinkLabel: string;
    footerLinkHref: string;
  };

  processStrip: {
    eyebrow: string;
    heading: HeadlineRichText;
    deck: string;
    steps: ProcessStep[]; // length 4
  };

  industryCrosslink: {
    eyebrow: string;
    heading: HeadlineRichText;
    deck: string;
    ctaLinkLabel: string;
    ctaLinkHref: string;
    tiles: IndustryCrosslinkTile[]; // length 4
  };

  ctaEyebrow: string;
  ctaHeading: HeadlineRichText;
  ctaDeck: string;
  ctaLabel: string;
  ctaHref: string;

  otherServicesHeading: string;
  otherServicesViewAllLabel: string;
};

export type PostCategory =
  | "Security"
  | "Cloud"
  | "Field notes"
  | "Compliance"
  | "Tooling"
  | "Practice";

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: PostCategory;
  publishDate: string;
  coverImage: ImageRef;
  author: { name: string; role: string };
};

export type PostFull = Omit<PostCard, "author"> & {
  body: PortableTextBlock[];
  author: {
    _id: string;
    name: string;
    role: string;
    bio: string;
    photo?: ImageRef;
  };
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: ImageRef;
};

export type BlogIndexPage = {
  heroEyebrow: string;
  heroHeading: HeadlineRichText;
  heroDeck: string;
  ctaEyebrow: string;
  ctaHeading: HeadlineRichText;
  ctaDeck: string;
  ctaLabel: string;
  ctaHref: string;
};

export type LegalSection = {
  title: string;
  body: PortableTextBlock[];
};

type LegalPageBase = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  summaryHeading: string;
  summaryBody: PortableTextBlock[];
  sections: LegalSection[];
  contactCardLabel: string;
  contactCardCopy: string;
  contactCardCtaLabel: string;
  contactCardCtaHref: string;
};

export type TermsPage = LegalPageBase;
export type PrivacyPage = LegalPageBase;

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
  | "chevron"
  | "file"
  | "users"
  | "spark";

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

export type PageHeroBlock = {
  _type: "pageHero";
  _key: string;
  eyebrow: string;
  headline: HeadlineRichText;
  deck: string[];
};

export type OriginPhotoBlock = {
  _type: "originPhoto";
  _key: string;
  image: ResolvedImage;
  aspectRatio: "21/9" | "16/9" | "4/3";
  caption: {
    eyebrowLabel: string;
    quote: string;
    attribution: string;
  };
};

export type StoryColumn = {
  eyebrow: string;
  heading: string;
  body: string;
};

export type StoryThreeColBlock = {
  _type: "storyThreeCol";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  columns: StoryColumn[];
};

export type NumbersStripBlock = {
  _type: "numbersStrip";
  _key: string;
  stats: { k: string; v: string }[];
};

export type Milestone = {
  date: string;
  title: string;
  body: string;
};

export type MilestonesTimelineBlock = {
  _type: "milestonesTimeline";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  deck?: string;
  items: Milestone[];
};

export type OfficeCultureBlock = {
  _type: "officeCulture";
  _key: string;
  image: ResolvedImage;
  aspectRatio: "4/3" | "1/1" | "3/4";
  eyebrow: string;
  heading: HeadlineRichText;
  body: string;
  bullets: string[];
};

export type IndustryVertical = {
  id: string;
  iconName: IconName;
  name: string;
  sub: string;
  intro: string;
  bullets: string[];
  examples: string[];
};

export type IndustriesContentBlock = {
  _type: "industriesContent";
  _key: string;
  jumpLabel: string;
  verticals: IndustryVertical[];
};

export type IndustriesDontSeeYoursBlock = {
  _type: "industriesDontSeeYours";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  deck: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export type ContactBodyBlock = {
  _type: "contactBody";
  _key: string;
  formHeading: string;
  formDeck: string;
  promptingOptions: string[];
  submitLabel: string;
  submitNote?: string;
  successHeading: string;
  successBody: string;
  existingClientPanel?: {
    label: string;
    primary: string;
    sub: string;
    href: string;
  };
};

export type PageBlock =
  | DarkNumbersHeroBlock
  | TrustStripBlock
  | TeamGridBlock
  | HeadachesBlock
  | SavingsBlock
  | ServicesListBlock
  | BeliefsBlock
  | CtaCardBlock
  | PageHeroBlock
  | OriginPhotoBlock
  | StoryThreeColBlock
  | NumbersStripBlock
  | MilestonesTimelineBlock
  | OfficeCultureBlock
  | IndustriesContentBlock
  | IndustriesDontSeeYoursBlock
  | ContactBodyBlock;
