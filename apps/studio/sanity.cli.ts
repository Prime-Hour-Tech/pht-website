import { defineCliConfig } from "sanity/cli";
import { getSanityEnv } from "./lib/env";

const { projectId, dataset } = getSanityEnv();

export default defineCliConfig({
  api: { projectId, dataset },
});
