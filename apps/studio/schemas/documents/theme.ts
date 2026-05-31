import { defineType, defineField } from "sanity";

// Singleton; registered in apps/studio/sanity.config.ts SINGLETONS array.
// Every field is OPTIONAL: an unset color falls back to the code default in
// apps/web/src/styles/global.css. Editing a color re-themes the whole site on
// the next deploy (Tailwind utilities read these as CSS custom properties).
const color = (
  name: string,
  title: string,
  fieldset: string,
  description: string,
) =>
  defineField({
    name,
    title,
    type: "color",
    fieldset,
    description,
    options: { disableAlpha: false },
  });

export const theme = defineType({
  name: "theme",
  title: "Theme",
  type: "document",
  fieldsets: [
    { name: "accent", title: "Accent" },
    { name: "surfaces", title: "Surfaces & text" },
    { name: "dark", title: "Dark band (footer + dark hero)" },
    { name: "status", title: "Status" },
  ],
  fields: [
    color("accent", "Accent", "accent", "Brand highlight: buttons, links, eyebrows, focus rings."),
    color("bg", "Page background", "surfaces", "Main page background. Leave unset to keep the default white."),
    color("bgAlt", "Alt background", "surfaces", "Alternating section background."),
    color("surface", "Card surface", "surfaces", "Card / panel background."),
    color("ink", "Headings", "surfaces", "Heading text. Keep high contrast against the page background."),
    color("inkBody", "Body text", "surfaces", "Body copy. Keep high contrast against the page background."),
    color("muted", "Muted text", "surfaces", "Secondary / muted text."),
    color("line", "Hairline", "surfaces", "Borders and dividers (usually semi-transparent)."),
    color("lineSoft", "Soft hairline", "surfaces", "Subtler borders."),
    color("dark", "Dark background", "dark", "Footer + dark hero background."),
    color("darkText", "Dark text", "dark", "Text on the dark background. Keep high contrast against it."),
    color("darkMuted", "Dark muted text", "dark", "Muted text on the dark background."),
    color("darkLine", "Dark hairline", "dark", "Borders on the dark background."),
    color("success", "Success", "status", "Confirmation / success green."),
    color("online", "Online dot", "status", '"We reply fast" status dot.'),
  ],
  preview: { prepare: () => ({ title: "Theme" }) },
});
