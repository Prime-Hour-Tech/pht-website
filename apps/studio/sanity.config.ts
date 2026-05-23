import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { getSanityEnv } from "./lib/env";

const { projectId, dataset } = getSanityEnv();

export default defineConfig({
  name: "default",
  title: "PHT Website",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
