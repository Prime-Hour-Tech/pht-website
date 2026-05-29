import { defineType, defineField } from "sanity";
import { LockIcon } from "@sanity/icons";

const ICON_OPTIONS = [
  "monitor", "shield", "cloud", "server", "compass", "globe",
  "file", "users", "spark", "lock",
  "phone", "mail", "check", "arrow", "arrowSm", "chevron",
];

export const switchingPromises = defineType({
  name: "switchingPromises",
  title: "Switching Promises",
  type: "object",
  icon: LockIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The four promises",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({ name: "title", title: "Title", type: "headline", validation: (Rule) => Rule.required() }),
    defineField({
      name: "promises",
      title: "Promises",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "iconName",
            title: "Icon",
            type: "string",
            options: { list: ICON_OPTIONS.map((name) => ({ title: name, value: name })) },
            validation: (Rule) => Rule.required(),
          }),
          defineField({ name: "head", title: "Head", type: "string", validation: (Rule) => Rule.required().max(80) }),
          defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (Rule) => Rule.required().max(320) }),
        ],
      }],
      initialValue: [
        {
          iconName: "shield",
          head: "No coverage gap.",
          body: "Side-by-side coverage from the day you sign through the day the previous MSP is fully off-boarded. Your team never wonders who to call.",
        },
        {
          iconName: "file",
          head: "You own your runbook.",
          body: "Markdown + PDF handed over at the end of every migration. If you ever leave us, the runbook leaves with you — that's the deal.",
        },
        {
          iconName: "lock",
          head: "No multi-year lock-in.",
          body: "Month-to-month after the first 90 days. If we're not earning the seat every month, you should be able to walk.",
        },
        {
          iconName: "users",
          head: "You meet the team.",
          body: "You're introduced to your named engineer in week one. The founder is on every QBR. No phantom \"account managers\" in between.",
        },
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", promises: "promises" },
    prepare: ({ eyebrow, promises }: { eyebrow?: string; promises?: unknown[] }) => {
      const subtitleParts = [promises?.length ? promises.length + " promises" : null, eyebrow || null].filter(Boolean);
      return {
        title: "Promises",
        subtitle: subtitleParts.join(" · ") || "—",
        media: LockIcon,
      };
    },
  },
});
