import { sanityClient } from "sanity:client";
import type {
  ContactInfo,
  Footer,
  Navigation,
  Page,
  SiteSettings,
} from "./types";
import {
  allPageSlugsQuery,
  contactInfoQuery,
  footerQuery,
  navigationQuery,
  pageBySlugQuery,
  siteSettingsQuery,
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
