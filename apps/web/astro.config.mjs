// @ts-check
import { defineConfig } from "astro/config";
import { config as loadDotenv } from "dotenv";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";

// Astro's config runs in Node before Vite starts, so process.env is NOT populated
// from apps/web/.env automatically. dotenv loads it explicitly. (On Vercel, env
// vars are injected directly and .env is absent — dotenv silently no-ops.)
loadDotenv();

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? "2026-05-01";

if (!projectId) {
  throw new Error(
    "SANITY_PROJECT_ID is required at build time. Set it in apps/web/.env (or in Vercel env vars).",
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
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
