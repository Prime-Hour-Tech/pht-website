import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { getSanityEnv } from "./lib/env";

const { projectId, dataset } = getSanityEnv();

const SITE_SETTINGS_ID = "siteSettings";
const SINGLETONS = [SITE_SETTINGS_ID];

export default defineConfig({
  name: "default",
  title: "PHT Website",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id(SITE_SETTINGS_ID)
              .child(
                S.editor()
                  .id(SITE_SETTINGS_ID)
                  .schemaType(SITE_SETTINGS_ID)
                  .documentId(SITE_SETTINGS_ID),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETONS.includes(item.getId() ?? ""),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(
            ({ action }) =>
              action && !["duplicate", "delete", "unpublish"].includes(action),
          )
        : actions,
  },
});
