import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import {
  getAllPostsForRss,
  getFooter,
  getSiteSettings,
} from "../../lib/sanity/client";

export const GET: APIRoute = async (context) => {
  const [siteSettings, footer, posts] = await Promise.all([
    getSiteSettings(),
    getFooter(),
    getAllPostsForRss(),
  ]);

  if (!siteSettings) {
    throw new Error("Site Settings singleton not found in Sanity.");
  }
  if (!footer) {
    throw new Error("Footer singleton not found in Sanity.");
  }

  return rss({
    title: `${siteSettings.siteName} Blog`,
    description: siteSettings.siteDescription,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.title,
      link: `/blog/${post.slug}`,
      description: post.excerpt,
      pubDate: new Date(post.publishDate),
      categories: [post.category],
    })),
    customData: `<language>en-us</language><copyright>${footer.copyright}</copyright>`,
  });
};
