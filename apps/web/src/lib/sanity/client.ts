import { sanityClient } from "sanity:client";
import type {
  ContactInfo,
  Footer,
  LandingPage,
  Navigation,
  NotFoundPage,
  Page,
  PostCard,
  PostFull,
  PostRssItem,
  PrivacyPage,
  ServiceCard,
  ServiceFull,
  SiteSettings,
  TermsPage,
  Theme,
} from "./types";
import {
  allLandingSlugsQuery,
  allPageSlugsQuery,
  allPostsForRssQuery,
  allPostsQuery,
  contactInfoQuery,
  footerQuery,
  landingBySlugQuery,
  navigationQuery,
  notFoundPageQuery,
  otherServicesQuery,
  pageBySlugQuery,
  postBySlugQuery,
  postSlugListQuery,
  privacyPageQuery,
  relatedPostsQuery,
  serviceBySlugQuery,
  servicesListQuery,
  servicesSlugListQuery,
  siteSettingsQuery,
  termsPageQuery,
  themeQuery,
} from "./queries";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
}

export async function getTheme(): Promise<Theme | null> {
  return await sanityClient.fetch<Theme | null>(themeQuery);
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

// All four service helpers share the SERVICE_COMPLETE_FILTER defined in queries.ts.
// Reason: a legacy "directions" doc predates the Slice 3 schema expansion and is
// missing those fields. Filtering at query time keeps it out of routes, listings,
// and the other-services row alike.
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

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return await sanityClient.fetch<{ slug: string }[]>(postSlugListQuery);
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return await sanityClient.fetch<PostFull | null>(postBySlugQuery, { slug });
}

export async function getAllPosts(): Promise<PostCard[]> {
  return await sanityClient.fetch<PostCard[]>(allPostsQuery);
}

export async function getAllPostsForRss(): Promise<PostRssItem[]> {
  return await sanityClient.fetch<PostRssItem[]>(allPostsForRssQuery);
}

export async function getRelatedPosts(category: string, slug: string): Promise<PostCard[]> {
  return await sanityClient.fetch<PostCard[]>(relatedPostsQuery, { category, slug });
}

export async function getTermsPage(): Promise<TermsPage | null> {
  return await sanityClient.fetch<TermsPage | null>(termsPageQuery);
}

export async function getPrivacyPage(): Promise<PrivacyPage | null> {
  return await sanityClient.fetch<PrivacyPage | null>(privacyPageQuery);
}

export async function getAllLandingSlugs(): Promise<{ slug: string }[]> {
  return await sanityClient.fetch<{ slug: string }[]>(allLandingSlugsQuery);
}

export async function getLandingBySlug(slug: string): Promise<LandingPage | null> {
  return await sanityClient.fetch<LandingPage | null>(landingBySlugQuery, { slug });
}

export async function getNotFoundPage(): Promise<NotFoundPage | null> {
  return await sanityClient.fetch<NotFoundPage | null>(notFoundPageQuery);
}
