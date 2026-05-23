import { sanityClient } from "sanity:client";
import type { Page, SiteSettings } from "./types";
import {
  siteSettingsQuery,
  pageBySlugQuery,
  allPageSlugsQuery,
} from "./queries";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return await sanityClient.fetch<Page | null>(pageBySlugQuery, { slug });
}

export async function getAllPageSlugs(): Promise<{ slug: string }[]> {
  return await sanityClient.fetch<{ slug: string }[]>(allPageSlugsQuery);
}
