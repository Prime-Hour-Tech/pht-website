import { defineCliConfig } from "sanity/cli";

// CLI-only config. Hardcoded literals (not env-driven) so the Sanity CLI
// can read this file without first loading apps/studio/.env — the CLI
// reads sanity.cli.ts BEFORE it loads the .env file, so any process.env
// access here would throw. The values below aren't secrets:
//   - projectId is visible in every Sanity API URL the browser makes
//   - dataset name is also visible client-side
//   - studioHost is the public subdomain of the deployed Studio
//
// The runtime Studio (browser bundle) still reads SANITY_STUDIO_* env
// vars via sanity.config.ts / lib/env.ts — that path runs through Vite,
// which loads .env before evaluating the config.

export default defineCliConfig({
  api: {
    projectId: "l2p3otz5",
    dataset: "production",
  },
  studioHost: "primehourtech",
});
