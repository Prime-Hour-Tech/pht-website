import { defineType, defineField } from "sanity";

export const switchingTimeline = defineType({
  name: "switchingTimeline",
  title: "Switching Timeline",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The 30-day migration",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({ name: "title", title: "Title", type: "headline", validation: (Rule) => Rule.required() }),
    defineField({
      name: "deck",
      title: "Deck",
      type: "text",
      rows: 3,
      initialValue:
        "We run every migration on the same calendar. There's a discovery call, a written runbook, and side-by-side coverage from day one. You should never feel like there's a gap between \"old MSP\" and \"new MSP.\"",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "phases",
      title: "Phases",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "phaseLabel", title: "Phase Label", type: "string", validation: (Rule) => Rule.required().max(30) }),
          defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required().max(80) }),
          defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (Rule) => Rule.required().max(480) }),
          defineField({ name: "durationLabel", title: "Duration Label", type: "string", validation: (Rule) => Rule.required().max(30) }),
        ],
      }],
      validation: (Rule) => Rule.required().min(3).max(5),
    }),
  ],
  preview: { prepare: () => ({ title: "Switching Timeline" }) },
});
