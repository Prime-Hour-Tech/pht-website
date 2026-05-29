import { defineType, defineField } from "sanity";

export const faqList = defineType({
  name: "faqList",
  title: "FAQ List",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The honest questions",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({ name: "heading", title: "Heading", type: "headline", validation: (Rule) => Rule.required() }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required().max(200) }),
          defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (Rule) => Rule.required().max(800) }),
        ],
      }],
      initialValue: [
        {
          question: "Will my team experience downtime during the switch?",
          answer: "No — that's the whole point of side-by-side coverage. Until the old MSP is off-boarded, both teams have access. Your end-users don't notice a cut-over day; they notice that tickets start getting answered faster.",
        },
        {
          question: "What if my current MSP won't hand over documentation?",
          answer: "It happens. Their contract usually says they own the runbooks. We assume that and rebuild from scratch — and frankly, we document better than most of the MSPs we replace. The handover request still goes; we just don't depend on it.",
        },
        {
          question: "I'm in a multi-year contract. Can I still switch?",
          answer: "Usually yes. Most MSP contracts have a 60- or 90-day notice clause buried in them. We'll read your contract with you on the discovery call and tell you what your real exit window is.",
        },
        {
          question: "How do you handle credentials and admin access?",
          answer: "Via a formal privileged-access handover — coordinated directly between our security lead and their senior engineer. Old credentials are rotated; new ones go into your vault, which you own. Nothing sits in a Slack channel.",
        },
        {
          question: "What does the transition cost?",
          answer: "Onboarding is included in the first month's flat rate for migrations under 100 seats. Larger transitions get a one-time onboarding fee, quoted in writing on the SOW. There are no per-hour surprises.",
        },
        {
          question: "What if we decide you're not the right fit halfway through?",
          answer: "You walk. The first 90 days exist specifically for this — both sides should know if it's working. If you leave in that window, you take the runbook with you and we hand back the keys cleanly. No drama.",
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(10),
    }),
  ],
  preview: { prepare: () => ({ title: "FAQ List" }) },
});
