import { sanityClient } from "sanity:client";
import type {
  BlogIndexPage,
  ContactInfo,
  Footer,
  Navigation,
  Page,
  PostCard,
  PostFull,
  PrivacyPage,
  ServiceCard,
  ServiceFull,
  ServicesIndexPage,
  SiteSettings,
  SwitchingPage,
  TermsPage,
} from "./types";
import {
  allPageSlugsQuery,
  allPostsQuery,
  blogIndexPageQuery,
  contactInfoQuery,
  footerQuery,
  navigationQuery,
  otherServicesQuery,
  pageBySlugQuery,
  postBySlugQuery,
  postSlugListQuery,
  privacyPageQuery,
  relatedPostsQuery,
  serviceBySlugQuery,
  servicesIndexPageQuery,
  servicesListQuery,
  servicesSlugListQuery,
  siteSettingsQuery,
  switchingPageQuery,
  termsPageQuery,
} from "./queries";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
}

export async function getNavigation(): Promise<Navigation | null> {
  return await sanityClient.fetch<Navigation | null>(navigationQuery);
}

export async function getFooter(): Promise<Footer | null> {
  return await sanityClient.fetch<Footer | null>(footerQuery);
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  return await sanityClient.fetch<ContactInfo | null>(contactInfoQuery);
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return await sanityClient.fetch<Page | null>(pageBySlugQuery, { slug });
}

export async function getAllPageSlugs(): Promise<{ slug: string }[]> {
  return await sanityClient.fetch<{ slug: string }[]>(allPageSlugsQuery);
}

// All four service helpers share the same `defined(headline) && defined(heroStat)`
// filter. Reason: a legacy "directions" doc predates the Slice 3 schema
// expansion and is missing those fields. Filtering at query time keeps it
// out of routes, listings, and the other-services row alike. The two
// sentinels are sufficient — Studio validation enforces the rest of the
// new fields, so a doc that passes the filter is structurally complete.
// Remove the filter once the legacy doc is deleted or backfilled.
export async function getAllServiceSlugs(): Promise<{ slug: string }[]> {
  return await sanityClient.fetch<{ slug: string }[]>(servicesSlugListQuery);
}

export async function getServiceBySlug(slug: string): Promise<ServiceFull | null> {
  return await sanityClient.fetch<ServiceFull | null>(serviceBySlugQuery, { slug });
}

export async function getServicesList(): Promise<ServiceCard[]> {
  return await sanityClient.fetch<ServiceCard[]>(servicesListQuery);
}

export async function getOtherServices(slug: string): Promise<ServiceCard[]> {
  return await sanityClient.fetch<ServiceCard[]>(otherServicesQuery, { slug });
}

export async function getServicesIndexPage(): Promise<ServicesIndexPage | null> {
  return await sanityClient.fetch<ServicesIndexPage | null>(servicesIndexPageQuery);
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return await sanityClient.fetch<{ slug: string }[]>(postSlugListQuery);
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return await sanityClient.fetch<PostFull | null>(postBySlugQuery, { slug });
}

export async function getAllPosts(): Promise<PostCard[]> {
  return await sanityClient.fetch<PostCard[]>(allPostsQuery);
}

export async function getRelatedPosts(category: string, slug: string): Promise<PostCard[]> {
  return await sanityClient.fetch<PostCard[]>(relatedPostsQuery, { category, slug });
}

export async function getBlogIndexPage(): Promise<BlogIndexPage | null> {
  return await sanityClient.fetch<BlogIndexPage | null>(blogIndexPageQuery);
}

export async function getTermsPage(): Promise<TermsPage | null> {
  return await sanityClient.fetch<TermsPage | null>(termsPageQuery);
}

export async function getPrivacyPage(): Promise<PrivacyPage | null> {
  return await sanityClient.fetch<PrivacyPage | null>(privacyPageQuery);
}

export async function getSwitchingPage(): Promise<SwitchingPage | null> {
  return await sanityClient.fetch<SwitchingPage | null>(switchingPageQuery);
}
