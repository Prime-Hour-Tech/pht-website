// @ts-check
import { defineConfig } from "astro/config";
import { config as loadDotenv } from "dotenv";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";

// Astro's config runs in Node before Vite starts, so process.env is NOT populated
// from apps/web/.env automatically. dotenv loads it explicitly. (On Vercel, env
// vars are injected directly and .env is absent — dotenv silently no-ops.)
loadDotenv();

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? "2026-05-01";
// Server-side read token. Required when the dataset is private (which it is,
// to keep plugin config like the Vercel deploy hook URL auth-gated). Astro
// fetches at build time only — the token is never sent to a browser.
const token = process.env.SANITY_READ_TOKEN;

if (!projectId) {
  throw new Error(
    "SANITY_PROJECT_ID is required at build time. Set it in apps/web/.env (or in Vercel env vars).",
  );
}
if (!token) {
  throw new Error(
    "SANITY_READ_TOKEN is required at build time (dataset is private). Set it in apps/web/.env (or in Vercel env vars).",
  );
}

export default defineConfig({
  site: process.env.SITE_URL ?? "http://localhost:4321",
  output: "static",
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token,
    }),
    sitemap({
      // Paid-ad landers are excluded from the sitemap. They're built for
      // ad-campaign attribution and shouldn't compete in organic search. Each
      // landing page also renders <meta name="robots" content="noindex, nofollow">.
      filter: (page) => !page.includes("/landing/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // @sanity/astro hints these Studio-only deps to Vite's pre-bundler, but
      // they aren't installed in the web app (and don't need to be - we only
      // use the runtime client, not the Studio UI). Excluding silences the
      // "Failed to resolve dependency" warnings at build time.
      exclude: [
        "react-compiler-runtime",
        "react-is",
        "styled-components",
        "lodash/startCase.js",
      ],
    },
  },
});
