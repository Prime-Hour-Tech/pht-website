import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
import { schemaTypes } from "./schemas";
import { getSanityEnv } from "./lib/env";

const { projectId, dataset } = getSanityEnv();

const SITE_SETTINGS_ID = "siteSettings";
const NAVIGATION_ID = "navigation";
const FOOTER_ID = "footer";
const CONTACT_INFO_ID = "contactInfo";
const SINGLETONS = [SITE_SETTINGS_ID, NAVIGATION_ID, FOOTER_ID, CONTACT_INFO_ID];

// Helper for the sidebar list — keeps each singleton entry compact.
const singletonItem = (S: any, id: string, title: string) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.editor().id(id).schemaType(id).documentId(id));

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
            singletonItem(S, SITE_SETTINGS_ID, "Site Settings"),
            singletonItem(S, NAVIGATION_ID, "Navigation"),
            singletonItem(S, FOOTER_ID, "Footer"),
            singletonItem(S, CONTACT_INFO_ID, "Contact Info"),
            S.divider(),
            S.listItem()
              .title("Team Members")
              .schemaType("teamMember")
              .child(S.documentTypeList("teamMember").title("Team Members")),
            S.listItem()
              .title("Services")
              .schemaType("service")
              .child(S.documentTypeList("service").title("Services")),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => {
              const id = item.getId() ?? "";
              return (
                !SINGLETONS.includes(id) &&
                id !== "teamMember" &&
                id !== "service"
              );
            }),
          ]),
    }),
    visionTool(),
    vercelDeployTool(),
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
