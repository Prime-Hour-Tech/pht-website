import { defineType, defineField } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Contact Info",
  type: "document",
  // Singleton; registered in apps/studio/sanity.config.ts SINGLETONS array.
  fields: [
    defineField({
      name: "cardTitle",
      title: "Contact Card Title",
      description: "Title shown above the phone/email/CTA links on every contact card across the site (CtaCard block + service-page CTAs).",
      type: "string",
      initialValue: "Get in touch",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "serviceAreaSub",
      title: "Service Area — Sub Line",
      description: "Secondary line shown under City, State on the Contact page Service Area panel. e.g., \"Statewide Utah on-site · Remote support across the US\".",
      type: "string",
      initialValue: "Statewide Utah on-site · Remote support across the US",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "display",
          title: "Display Format",
          description: "Human-readable, shown in the UI. e.g. +1 (801) 555-0100",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "dial",
          title: "Dial Format",
          description: "Used in tel: href. Digits only with optional leading + e.g. +18015550100",
          type: "string",
          validation: (Rule) => Rule.required().regex(/^\+?[0-9]+$/, { name: "dial-format" }),
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "hours",
      title: "Business Hours",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "weekdayLabel",
          title: "Display Label",
          description: "Human string shown in the utility row. e.g. Mon–Fri 8a–6p MT",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "openMinute",
          title: "Open Minute-of-day",
          description: "Open time as minutes from midnight in the timezone below. e.g. 8a = 480.",
          type: "number",
          validation: (Rule) => Rule.required().integer().min(0).max(1439),
        }),
        defineField({
          name: "closeMinute",
          title: "Close Minute-of-day",
          description: "Close time as minutes from midnight in the timezone below. e.g. 6p = 1080.",
          type: "number",
          validation: (Rule) => Rule.required().integer().min(0).max(1439),
        }),
        defineField({
          name: "timezone",
          title: "Timezone",
          description: "IANA timezone, e.g. America/Denver",
          type: "string",
          initialValue: "America/Denver",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "city",
          title: "City",
          type: "string",
          initialValue: "Salt Lake City",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "state",
          title: "State / Region",
          type: "string",
          initialValue: "UT",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "street",
          title: "Street",
          type: "string",
        }),
        defineField({
          name: "postal",
          title: "Postal Code",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Info" }),
  },
});
