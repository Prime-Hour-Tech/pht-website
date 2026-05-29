// Stub for the virtual `sanity:client` module used in Vitest.
// Only exposes what imageUrlBuilder needs to produce a URL from an asset ref.
export const sanityClient = {
  config: () => ({
    projectId: "test-project",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
  }),
  clientConfig: {
    projectId: "test-project",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
  },
};
