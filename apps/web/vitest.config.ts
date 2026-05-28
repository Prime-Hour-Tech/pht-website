import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      // Stub the Astro virtual `sanity:client` module for Vitest
      "sanity:client": path.resolve(__dirname, "src/__mocks__/sanity-client.ts"),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
