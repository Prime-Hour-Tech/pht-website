import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./schemas";
import { getSanityEnv } from "./lib/env";
import { DeployTool } from "./lib/deployTool";

const { projectId, dataset } = getSanityEnv();

const SITE_SETTINGS_ID = "siteSettings";
const NAVIGATION_ID = "navigation";
const FOOTER_ID = "footer";
const CONTACT_INFO_ID = "contactInfo";
const TERMS_PAGE_ID = "termsPage";
const PRIVACY_PAGE_ID = "privacyPage";
const SINGLETONS = [
  SITE_SETTINGS_ID,
  NAVIGATION_ID,
  FOOTER_ID,
  CONTACT_INFO_ID,
  TERMS_PAGE_ID,
  PRIVACY_PAGE_ID,
];

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
      title: "Content",
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            singletonItem(S, SITE_SETTINGS_ID, "Site Settings"),
            singletonItem(S, NAVIGATION_ID, "Navigation"),
            singletonItem(S, FOOTER_ID, "Footer"),
            singletonItem(S, CONTACT_INFO_ID, "Contact Info"),
            singletonItem(S, TERMS_PAGE_ID, "Terms Page"),
            singletonItem(S, PRIVACY_PAGE_ID, "Privacy Page"),
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
    visionTool({ title: "Query" }),
    presentationTool({
      title: "Preview",
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:4321",
      },
      resolve: {
        locations: {
          page: {
            select: { slug: "slug.current", title: "title" },
            resolve: (doc) => ({
              locations: [{
                href: doc?.slug === "home" ? "/" : `/${doc?.slug}`,
                title: doc?.title || "Page",
              }],
            }),
          },
          post: {
            select: { slug: "slug.current", title: "title" },
            resolve: (doc) => ({
              locations: [{ href: `/blog/${doc?.slug}`, title: doc?.title || "Post" }],
            }),
          },
          service: {
            select: { slug: "slug.current", name: "name" },
            resolve: (doc) => ({
              locations: [{ href: `/services/${doc?.slug}`, title: doc?.name || "Service" }],
            }),
          },
          landingPage: {
            select: { slug: "slug.current", title: "title" },
            resolve: (doc) => ({
              locations: [{ href: `/landing/${doc?.slug}`, title: doc?.title || "Landing page" }],
            }),
          },
          termsPage: {
            resolve: () => ({ locations: [{ href: "/terms", title: "Terms" }] }),
          },
          privacyPage: {
            resolve: () => ({ locations: [{ href: "/privacy", title: "Privacy" }] }),
          },
        },
      },
    }),
  ],
  tools: [
    {
      name: "deploy",
      title: "Deploy",
      component: DeployTool,
    },
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
