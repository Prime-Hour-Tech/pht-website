import { sanityClient } from "sanity:client";
import type { QueryParams } from "@sanity/client";
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

// Build-scoped fetch cache. The site is a static build (output: "static"), so
// during `astro build` Sanity content is an immutable snapshot — fetching the
// same query+params more than once always yields the same result. Astro renders
// pages concurrently and every page pulls the same chrome singletons
// (siteSettings, navigation, footer, contactInfo, theme), so without this each
// is re-fetched once per page. Caching the *promise* (not the resolved value)
// also collapses concurrent in-flight calls into one request.
//
// Only active in production builds. In `astro dev` the module stays resident
// across requests, so a cache there would serve stale content and defeat Sanity
// visual-editing live preview — dev always fetches fresh.
const fetchCache = new Map<string, Promise<unknown>>();

function rawFetch<T>(query: string, params?: QueryParams): Promise<T> {
  return params
    ? sanityClient.fetch<T>(query, params)
    : sanityClient.fetch<T>(query);
}

function cachedFetch<T>(query: string, params?: QueryParams): Promise<T> {
  if (!import.meta.env.PROD) return rawFetch<T>(query, params);
  const key = params ? `${query}::${JSON.stringify(params)}` : query;
  const hit = fetchCache.get(key);
  if (hit) return hit as Promise<T>;
  const pending = rawFetch<T>(query, params);
  // Evict on rejection so one transient failure doesn't poison the key for the
  // rest of the build. Callers still await `pending` and see the rejection;
  // this extra handler only deletes the cache entry, allowing a fresh retry.
  pending.catch(() => fetchCache.delete(key));
  fetchCache.set(key, pending);
  return pending;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await cachedFetch<SiteSettings | null>(siteSettingsQuery);
}

export async function getTheme(): Promise<Theme | null> {
  return await cachedFetch<Theme | null>(themeQuery);
}

export async function getNavigation(): Promise<Navigation | null> {
  return await cachedFetch<Navigation | null>(navigationQuery);
}

export async function getFooter(): Promise<Footer | null> {
  return await cachedFetch<Footer | null>(footerQuery);
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  return await cachedFetch<ContactInfo | null>(contactInfoQuery);
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return await cachedFetch<Page | null>(pageBySlugQuery, { slug });
}

export async function getAllPageSlugs(): Promise<{ slug: string }[]> {
  return await cachedFetch<{ slug: string }[]>(allPageSlugsQuery);
}

// All four service helpers share the SERVICE_COMPLETE_FILTER defined in queries.ts.
// Reason: a legacy "directions" doc predates the Slice 3 schema expansion and is
// missing those fields. Filtering at query time keeps it out of routes, listings,
// and the other-services row alike.
// Remove the filter once the legacy doc is deleted or backfilled.
export async function getAllServiceSlugs(): Promise<{ slug: string }[]> {
  return await cachedFetch<{ slug: string }[]>(servicesSlugListQuery);
}

export async function getServiceBySlug(slug: string): Promise<ServiceFull | null> {
  return await cachedFetch<ServiceFull | null>(serviceBySlugQuery, { slug });
}

export async function getServicesList(): Promise<ServiceCard[]> {
  return await cachedFetch<ServiceCard[]>(servicesListQuery);
}

export async function getOtherServices(slug: string): Promise<ServiceCard[]> {
  return await cachedFetch<ServiceCard[]>(otherServicesQuery, { slug });
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return await cachedFetch<{ slug: string }[]>(postSlugListQuery);
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return await cachedFetch<PostFull | null>(postBySlugQuery, { slug });
}

export async function getAllPosts(): Promise<PostCard[]> {
  return await cachedFetch<PostCard[]>(allPostsQuery);
}

export async function getAllPostsForRss(): Promise<PostRssItem[]> {
  return await cachedFetch<PostRssItem[]>(allPostsForRssQuery);
}

export async function getRelatedPosts(category: string, slug: string): Promise<PostCard[]> {
  return await cachedFetch<PostCard[]>(relatedPostsQuery, { category, slug });
}

export async function getTermsPage(): Promise<TermsPage | null> {
  return await cachedFetch<TermsPage | null>(termsPageQuery);
}

export async function getPrivacyPage(): Promise<PrivacyPage | null> {
  return await cachedFetch<PrivacyPage | null>(privacyPageQuery);
}

export async function getAllLandingSlugs(): Promise<{ slug: string }[]> {
  return await cachedFetch<{ slug: string }[]>(allLandingSlugsQuery);
}

export async function getLandingBySlug(slug: string): Promise<LandingPage | null> {
  return await cachedFetch<LandingPage | null>(landingBySlugQuery, { slug });
}

export async function getNotFoundPage(): Promise<NotFoundPage | null> {
  return await cachedFetch<NotFoundPage | null>(notFoundPageQuery);
}
