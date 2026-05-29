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

// Feature-gate env checks. These don't break the build — the corresponding
// feature gracefully degrades when unset — but the build log should announce
// what's missing so pre-launch checklist items don't slip through.
// All warnings are prefixed [env] for greppability in Vercel logs.
const warn = (msg) => console.warn(`[env] ${msg}`);

const siteUrl = process.env.SITE_URL;
const vercelEnv = process.env.VERCEL_ENV;
if ((!siteUrl || siteUrl === "http://localhost:4321") && vercelEnv && vercelEnv !== "development") {
  warn(
    "SITE_URL is unset or points at localhost on a non-dev Vercel deployment. Canonical URLs, JSON-LD, sitemap, and RSS will reference localhost. Set to https://primehourtech.com (or the live URL) before launch.",
  );
}

if (!process.env.CONTACT_FORM_URL) {
  warn(
    "CONTACT_FORM_URL is unset. The contact form's action falls back to \"#\" and submissions will not work. Pick a provider (Web3Forms / Formspree / Basin) and set its action URL.",
  );
}

if (!process.env.PUBLIC_GTM_CONTAINER_ID) {
  warn(
    "PUBLIC_GTM_CONTAINER_ID is unset. Analytics disabled — no GTM script will load. Create a GTM container at tagmanager.google.com and set the GTM-XXXXXXX ID.",
  );
}

if (process.env.PUBLIC_COOKIE_BANNER_ENABLED !== "true") {
  warn(
    "PUBLIC_COOKIE_BANNER_ENABLED is not \"true\". Cookie banner hidden — GTM will never fire (it's consent-gated). Set to \"true\" after legal copy is finalized.",
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
      stega: {
        studioUrl: process.env.PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
      },
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
