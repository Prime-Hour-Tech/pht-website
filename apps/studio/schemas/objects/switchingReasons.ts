import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const switchingReasons = defineType({
  name: "switchingReasons",
  title: "Switching Reasons",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The reasons we hear",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({ name: "title", title: "Title", type: "headline", validation: (Rule) => Rule.required() }),
    defineField({
      name: "deck",
      title: "Deck",
      type: "text",
      rows: 3,
      initialValue:
        "When a Salt Lake City business owner finally calls us about switching, the conversation almost always lands on one of these. The first is the most common.",
      validation: (Rule) => Rule.required().max(480),
    }),
    defineField({
      name: "items",
      title: "Reasons",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "head", title: "Head", type: "string", validation: (Rule) => Rule.required().max(120) }),
          defineField({ name: "body", title: "Body", type: "text", rows: 4, validation: (Rule) => Rule.required().max(480) }),
          defineField({ name: "flagLabel", title: "Flag Label (Optional)", type: "string", validation: (Rule) => Rule.max(40) }),
        ],
      }],
      initialValue: [
        {
          head: "The MSP grew faster than its bench.",
          body: "You signed when they had 12 engineers. They have 60 now, half of whom you haven't met. Your ticket gets re-assigned three times before anyone touches it.",
          flagLabel: "Most common",
        },
        {
          head: "The invoice keeps surprising you.",
          body: "Hourly billing on top of \"managed\" services, project fees that weren't in writing, after-hours surcharges. You stopped opening invoices in the inbox preview pane.",
        },
        {
          head: "The engineer who knew you left.",
          body: "Your account was held together by one person who understood your stack. They left. The handoff was an email. The new engineer keeps asking you for context the last engineer should have written down.",
        },
      ],
      validation: (Rule) => Rule.required().length(3),
    }),
  ],
  preview: {
    select: {
      eyebrow: "eyebrow",
      headline: "title.0.children.0.text",
      items: "items",
    },
    prepare: ({ eyebrow, headline, items }: { eyebrow?: string; headline?: string; items?: unknown[] }) => {
      const count = Array.isArray(items) ? items.length : 0;
      const subtitleParts = [
        count > 0 ? `${count} cards` : null,
        eyebrow || headline || null,
      ].filter(Boolean);
      return {
        title: "Reasons",
        subtitle: subtitleParts.join(" · ") || "—",
        media: HelpCircleIcon,
      };
    },
  },
});
