import { defineType, defineField } from "sanity";

export const servicesIndexPage = defineType({
  name: "servicesIndexPage",
  title: "Services Index Page",
  type: "document",
  // Singleton — registered in apps/studio/sanity.config.ts SINGLETONS array.
  // Backs /services/index.astro.
  groups: [
    { name: "hero", title: "Hero" },
    { name: "list", title: "Services List" },
    { name: "cta", title: "CTA" },
    { name: "otherServices", title: "Other Services row" },
  ],
  fields: [
    // ── Hero group ──
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      description: "Small uppercase eyebrow above the hero headline. The diamond ◆ is added by the layout.",
      type: "string",
      group: "hero",
      initialValue: "Services",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDeck",
      title: "Hero Deck",
      description: "Subhead paragraph below the hero headline.",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (Rule) => Rule.required().max(320),
    }),

    // ── Services list group ──
    defineField({
      name: "listEyebrow",
      title: "List Eyebrow",
      description: "Small uppercase eyebrow above the services-list heading. The diamond ◆ is added by the layout.",
      type: "string",
      group: "list",
      initialValue: "Services",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "listHeading",
      title: "List Heading",
      description: "Plain heading above the services list (no italic-accent — this is a simpler block).",
      type: "string",
      group: "list",
      validation: (Rule) => Rule.required().max(120),
    }),

    // ── CTA group ──
    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      description: "Small uppercase eyebrow above the final CTA heading. The diamond ◆ is added by the layout.",
      type: "string",
      group: "cta",
      initialValue: "Choosing a service",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      description: "Use the Italic accent toolbar button to apply italic + red styling to fragments.",
      type: "headline",
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaDeck",
      title: "CTA Deck",
      description: "Pitch under the CTA heading.",
      type: "text",
      rows: 3,
      group: "cta",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      group: "cta",
      initialValue: "Schedule a discovery call",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button URL",
      type: "string",
      group: "cta",
      initialValue: "/contact",
      validation: (Rule) => Rule.required(),
    }),

    // ── Other Services row group ──
    defineField({
      name: "otherServicesHeading",
      title: "Other Services Heading",
      description: "Heading above the sibling-services card row at the bottom of each service detail page.",
      type: "string",
      group: "otherServices",
      initialValue: "Other services",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "otherServicesViewAllLabel",
      title: "Other Services View-All Link Label",
      description: "Label for the link at the top-right of the Other Services row.",
      type: "string",
      group: "otherServices",
      initialValue: "View all →",
      validation: (Rule) => Rule.required().max(32),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Services Index Page" }),
  },
});
