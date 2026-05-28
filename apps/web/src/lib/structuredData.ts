import type {
  ContactInfo,
  Footer,
  PostFull,
  SiteSettings,
} from "./sanity/types";
import { urlFor } from "./sanity/imageUrl";

export type OrganizationJsonLd = Record<string, unknown>;
export type ArticleJsonLd = Record<string, unknown>;

// Convert minute-of-day (0–1439) to HH:MM. Used for OpeningHoursSpecification.
export function minuteToTime(minute: number): string {
  const h = Math.floor(minute / 60).toString().padStart(2, "0");
  const m = (minute % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function buildOrganizationJsonLd(args: {
  siteSettings: SiteSettings;
  contactInfo: ContactInfo;
  footer: Footer;
  siteUrl: string;
}): OrganizationJsonLd {
  const { siteSettings, contactInfo, footer, siteUrl } = args;

  const logoUrl = siteSettings.logoDark
    ? urlFor(siteSettings.logoDark).width(200).height(200).fit("crop").url()
    : undefined;
  const sameAs = (footer.socials ?? [])
    .map((s) => s.href)
    .filter((href): href is string => !!href);

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: contactInfo.address.city,
    addressRegion: contactInfo.address.state,
    addressCountry: "US",
  };
  if (contactInfo.address.street) address.streetAddress = contactInfo.address.street;
  if (contactInfo.address.postal) address.postalCode = contactInfo.address.postal;

  const result: OrganizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: siteSettings.siteName,
    url: siteUrl,
    description: siteSettings.siteDescription,
    telephone: contactInfo.phone.dial,
    email: contactInfo.email,
    address,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        // PHT's authored hours are weekdays only. If hours expand, switch to a structured day list.
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: minuteToTime(contactInfo.hours.openMinute),
        closes: minuteToTime(contactInfo.hours.closeMinute),
      },
    ],
  };

  if (logoUrl) {
    result.logo = { "@type": "ImageObject", url: logoUrl };
    result.image = logoUrl;
  }
  if (sameAs.length > 0) result.sameAs = sameAs;

  return result;
}

export function buildArticleJsonLd(args: {
  post: PostFull;
  siteSettings: SiteSettings;
  canonicalUrl: string;
  siteUrl: string;
}): ArticleJsonLd {
  const { post, siteSettings, canonicalUrl, siteUrl } = args;

  const imageUrl = urlFor(post.coverImage).width(1200).height(630).fit("crop").url();
  const logoUrl = siteSettings.logoDark
    ? urlFor(siteSettings.logoDark).width(200).height(200).fit("crop").url()
    : undefined;

  const publisher: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteSettings.siteName,
  };
  if (logoUrl) publisher.logo = { "@type": "ImageObject", url: logoUrl };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishDate,
    dateModified: post.updatedAt ?? post.publishDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher,
    image: imageUrl,
    articleSection: post.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    url: canonicalUrl,
  };
}
