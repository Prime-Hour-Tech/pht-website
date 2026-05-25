export function getSanityEnv(): { projectId: string; dataset: string } {
  // Sanity Studio is a browser SPA. Env vars must be prefixed with
  // SANITY_STUDIO_ for Vite to expose them to the client bundle. Plain
  // process.env reads only work in Node (CLI / build) and are undefined
  // when the bundled Studio runs in the browser.
  const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
  const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

  if (!projectId) {
    throw new Error(
      "SANITY_STUDIO_PROJECT_ID is required. Set it in apps/studio/.env (or your shell environment).",
    );
  }

  return { projectId, dataset };
}
