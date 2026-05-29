import { defineType, defineField } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";

export const processStrip = defineType({
  name: "processStrip",
  title: "Process Strip",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "How every engagement runs",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({ name: "heading", title: "Heading", type: "headline", validation: (Rule) => Rule.required() }),
    defineField({
      name: "deck",
      title: "Deck",
      type: "text",
      rows: 3,
      initialValue:
        "Whether it's a 3-week project or a 5-year managed relationship, the operating model is the same: a named engineer who owns your account, monthly check-ins, quarterly reviews, and a written runbook you can take with you if we ever lose the trust to keep it.",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required().max(80) }),
          defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (Rule) => Rule.required().max(320) }),
        ],
      }],
      initialValue: [
        {
          title: "Discovery",
          body: "A 30-minute call. We look at your environment, your support load, and tell you honestly whether we're a fit.",
        },
        {
          title: "Written SOW",
          body: "Scope and price in writing before anyone touches a wire. Change requests are also in writing — never verbal.",
        },
        {
          title: "Named engineer",
          body: "One primary on your account from day one. Their photo, direct line, and email — not a generic queue.",
        },
        {
          title: "QBR + runbook",
          body: "Quarterly business review with the founder. Annual budget. A runbook you own and can leave us with.",
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(6),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", steps: "steps" },
    prepare: ({ eyebrow, steps }: { eyebrow?: string; steps?: unknown[] }) => {
      const subtitleParts = [steps?.length ? steps.length + " steps" : null, eyebrow || null].filter(Boolean);
      return {
        title: "Process strip",
        subtitle: subtitleParts.join(" · ") || "—",
        media: CheckmarkCircleIcon,
      };
    },
  },
});
