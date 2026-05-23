export function getSanityEnv(): { projectId: string; dataset: string } {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET ?? "production";

  if (!projectId) {
    throw new Error(
      "SANITY_PROJECT_ID is required. Set it in apps/studio/.env (or your shell environment).",
    );
  }

  return { projectId, dataset };
}
