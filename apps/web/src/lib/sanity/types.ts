import type { PortableTextBlock } from "@portabletext/types";

export type HeadlineRichText = PortableTextBlock[];

export type ImageRef = {
  asset: { _ref: string; _type: "reference" };
  // Required at the schema level on both siteSettings.defaultOgImage and page.ogImage.
  // The whole image object can be absent (parent fields are optional), but if it
  // exists, alt is always present.
  alt: string;
};

// Two logo variants: logoDark goes on light backgrounds (the navbar),
// logoLight goes on dark backgrounds (the footer).
export type SiteSettings = {
  siteName: string;
  siteDescription: string;
  logoDark?: ImageRef;
  logoLight?: ImageRef;
  defaultOgImage?: ImageRef;
};

// A @sanity/color-input value. rgb.a is 0-1 alpha.
export type SanityColor = {
  hex: string;
  alpha?: number;
  rgb?: { r: number; g: number; b: number; a: number };
};

// Editable theme overrides. Every field optional; unset = global.css default.
export type Theme = {
  accent?: SanityColor;
  bg?: SanityColor;
  bgAlt?: SanityColor;
  surface?: SanityColor;
  ink?: SanityColor;
  inkBody?: SanityColor;
  muted?: SanityColor;
  line?: SanityColor;
  lineSoft?: SanityColor;
  dark?: SanityColor;
  darkText?: SanityColor;
  darkMuted?: SanityColor;
  darkLine?: SanityColor;
  success?: SanityColor;
  online?: SanityColor;
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

export type PostRssItem = {
  title: string;
  slug: string;
  excerpt: string;
  category: PostCategory;
  publishDate: string;
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
  // Projected from Sanity's _updatedAt; used for Article JSON-LD dateModified.
  updatedAt?: string;
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


export type LandingPainItem = { head: string; body: string };
export type LandingIncludedBullet = { head: string; body: string };
export type LandingHowItWorksStep = { k: string; head: string; body: string };
export type LandingFaqEntry = { question: string; answer: string };

export type LandingPage = {
  title: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: ImageRef;
  hero: {
    metaEyebrow: string;
    title: HeadlineRichText;
    deck: string;
    ctaPrimaryLabel: string;
    ctaPrimaryHref: string;
    heroStats: ServiceStat[]; // length 4
  };
  form: {
    cardEyebrow: string;
    heading: string;
    deck: string;
    situationPlaceholder: string;
    submitLabel: string;
    replyNote: string;
    successHeading: string;
    successBody: string;
  };
  trustBar: {
    prefixLabel: string;
    items: string[]; // 3-8 items
  };
  problem: {
    eyebrow: string;
    title: HeadlineRichText;
    deck: string;
    items: LandingPainItem[]; // length 3
  };
  included: {
    eyebrow: string;
    title: HeadlineRichText;
    deck: string;
    bullets: LandingIncludedBullet[]; // 6-10
  };
  howItWorks: {
    eyebrow: string;
    title: HeadlineRichText;
    steps: LandingHowItWorksStep[]; // length 3
  };
  faq: {
    eyebrow: string;
    title: HeadlineRichText;
    deck: string;
    items: LandingFaqEntry[];
  };
  cta: {
    eyebrow: string;
    heading: HeadlineRichText;
    deck: string;
    label: string;
    href: string;
  };
};

// ── 404 singleton ────────────────────────────────────────────────────────

// Resolved/runtime destination (icon already coerced to a valid IconName).
export type NotFoundDestination = { name: string; icon: IconName; description: string; href: string };

// Raw notFoundPage singleton. Every field optional; unset = code default.
// destinations[].icon is a raw string from Sanity (coerced at resolve time).
export type NotFoundPage = {
  headline?: string;
  deck?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  destinationsHeading?: string;
  browseAllLink?: CtaLink;
  destinations?: { name: string; icon: string; description: string; href: string }[];
  seoTitle?: string;
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
  | "chevron"
  | "file"
  | "users"
  | "spark"
  | "lock"
  | "linkedin"
  | "x";

export type TeamMemberResolved = {
  _id: string;
  name: string;
  role: string;
  bio: string;
  order: number;
  photo?: ImageRef;
};

export type ServiceCard = {
  name: string;
  slug: string;
  shortDescription: string;
  iconName: IconName;
};

// Used for the home-page ServicesList block; projection includes _id + order.
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
  specSheetUrl?: string;
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
  image: ImageRef;
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
  image: ImageRef;
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

export type PostListBlock = {
  _type: "postList";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  emptyStateMessage: string;
};

export type ServicesIndexHeroBlock = {
  _type: "servicesIndexHero";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  deck: string;
  featuredService: FeaturedService;
};

export type PricingTiersBlock = {
  _type: "pricingTiers";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  deck: string;
  essentials: PricingTier;
  standard: PricingTier;
  premier: PricingTier;
};

export type BundleGridBlock = {
  _type: "bundleGrid";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  deck: string;
  secondaryLinkLabel?: string;
  secondaryLinkHref?: string;
  tiles: { name: string; descriptor: string; includesLine: string }[];
  footerLinkLabel: string;
  footerLinkHref: string;
};

export type ProcessStripBlock = {
  _type: "processStrip";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  deck: string;
  steps: { title: string; body: string }[];
};

export type IndustryCrosslinkBlock = {
  _type: "industryCrosslink";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  tiles: IndustryCrosslinkTile[];
};

export type SwitchingHeroBlock = {
  _type: "switchingHero";
  _key: string;
  eyebrow: string;
  title: HeadlineRichText;
  deck: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  dealCard: { eyebrow: string; rows: { label: string; value: string }[] };
  factSheetLabel: string;
  liveDotLabel: string;
  stats: { k: string; v: string }[];
};

export type SwitchingReasonsBlock = {
  _type: "switchingReasons";
  _key: string;
  eyebrow: string;
  title: HeadlineRichText;
  deck: string;
  items: { head: string; body: string; flagLabel?: string }[];
};

export type SwitchingTimelineBlock = {
  _type: "switchingTimeline";
  _key: string;
  eyebrow: string;
  title: HeadlineRichText;
  deck: string;
  phases: { phaseLabel: string; title: string; body: string; durationLabel: string }[];
};

export type SwitchingHandleBlock = {
  _type: "switchingHandle";
  _key: string;
  eyebrow: string;
  title: HeadlineRichText;
  deck: string;
  items: { painLabel: string; painBody: string; weHandleLabel: string; weHandleBody: string }[];
};

export type SwitchingCompareBlock = {
  _type: "switchingCompare";
  _key: string;
  eyebrow: string;
  title: HeadlineRichText;
  usHeader: string;
  themHeader: string;
  rows: { topic: string; us: string; them: string }[];
};

export type SwitchingPromisesBlock = {
  _type: "switchingPromises";
  _key: string;
  eyebrow: string;
  title: HeadlineRichText;
  promises: { iconName: IconName; head: string; body: string }[];
};

export type SwitchingTestimonialBlock = {
  _type: "switchingTestimonial";
  _key: string;
  eyebrow: string;
  quote: string;
  attributionRole: string;
  attributionContext: string;
};

export type FaqListBlock = {
  _type: "faqList";
  _key: string;
  eyebrow: string;
  heading: HeadlineRichText;
  items: { question: string; answer: string }[];
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
  | ContactBodyBlock
  | PostListBlock
  | ServicesIndexHeroBlock
  | PricingTiersBlock
  | BundleGridBlock
  | ProcessStripBlock
  | IndustryCrosslinkBlock
  | SwitchingHeroBlock
  | SwitchingReasonsBlock
  | SwitchingTimelineBlock
  | SwitchingHandleBlock
  | SwitchingCompareBlock
  | SwitchingPromisesBlock
  | SwitchingTestimonialBlock
  | FaqListBlock;
