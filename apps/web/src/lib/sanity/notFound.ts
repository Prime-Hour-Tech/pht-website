import { ICON_NAMES } from "./types";
import type { CtaLink, IconName, NotFoundDestination, NotFoundPage } from "./types";

export type ResolvedNotFound = {
  headline: string;
  deck: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  destinationsHeading: string;
  browseAllLink: CtaLink;
  destinations: NotFoundDestination[];
  seoTitle: string;
};

// Runtime guard for an editor-supplied icon name, derived from the same array
// that produces the IconName type — so the two can never drift.
const VALID_ICONS: ReadonlySet<string> = new Set(ICON_NAMES);

// The shipped copy. Single source of default truth; mirrors what the page
// showed before it became CMS-editable.
export const NOT_FOUND_DEFAULTS: ResolvedNotFound = {
  headline: "This page is off the clock.",
  deck: "The page you're looking for moved, retired, or never existed. Our monitoring runs 24/7 — this link just didn't resolve. Let's get you back on track.",
  primaryCta: { label: "Back to home", href: "/" },
  secondaryCta: { label: "Contact support", href: "/contact" },
  destinationsHeading: "Popular destinations",
  browseAllLink: { label: "Browse all services", href: "/services" },
  destinations: [
    { name: "Managed IT", icon: "monitor", description: "Proactive monitoring, patching, and helpdesk.", href: "/services/managed-it" },
    { name: "Cybersecurity", icon: "shield", description: "Endpoint, email, identity & MFA defense.", href: "/services/cybersecurity" },
    { name: "Cloud & Microsoft 365", icon: "cloud", description: "Migrations, M365, Azure, AWS, and Teams.", href: "/services/cloud" },
    { name: "About Prime Hour Tech", icon: "users", description: "Who we are and how we work with clients.", href: "/about" },
    { name: "Blog & resources", icon: "file", description: "Plain-spoken guides on IT and security.", href: "/blog" },
    { name: "Contact us", icon: "phone", description: "Talk to a real person — fast response.", href: "/contact" },
  ],
  seoTitle: "Page not found",
};

// A CTA wins only when both halves are filled; otherwise the default is used.
function cta(value: CtaLink | undefined, fallback: CtaLink): CtaLink {
  return value && value.label && value.href ? value : fallback;
}

// Merge a Sanity notFoundPage doc over the defaults, per field. Always returns
// a fully-populated object so 404.astro can render without guards.
export function resolveNotFoundContent(doc: NotFoundPage | null): ResolvedNotFound {
  const destinations: NotFoundDestination[] =
    doc?.destinations && doc.destinations.length > 0
      ? doc.destinations.map((d) => ({
          name: d.name,
          icon: (VALID_ICONS.has(d.icon) ? d.icon : "monitor") as IconName,
          description: d.description,
          href: d.href,
        }))
      : NOT_FOUND_DEFAULTS.destinations;

  return {
    headline: doc?.headline ?? NOT_FOUND_DEFAULTS.headline,
    deck: doc?.deck ?? NOT_FOUND_DEFAULTS.deck,
    primaryCta: cta(doc?.primaryCta, NOT_FOUND_DEFAULTS.primaryCta),
    secondaryCta: cta(doc?.secondaryCta, NOT_FOUND_DEFAULTS.secondaryCta),
    destinationsHeading: doc?.destinationsHeading ?? NOT_FOUND_DEFAULTS.destinationsHeading,
    browseAllLink: cta(doc?.browseAllLink, NOT_FOUND_DEFAULTS.browseAllLink),
    destinations,
    seoTitle: doc?.seoTitle ?? NOT_FOUND_DEFAULTS.seoTitle,
  };
}
