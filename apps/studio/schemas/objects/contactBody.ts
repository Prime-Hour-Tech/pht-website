import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

export const contactBody = defineType({
  name: "contactBody",
  title: "Contact Body",
  type: "object",
  icon: UserIcon,
  fields: [
    defineField({
      name: "formHeading",
      title: "Form Heading",
      type: "string",
      initialValue: "Tell us about your business.",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "formDeck",
      title: "Form Deck",
      type: "text",
      rows: 2,
      initialValue: "Required fields marked with *. We never share your info.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "promptingOptions",
      title: "\"What's prompting this?\" Options",
      description: "Chip-select labels. Single-select at runtime.",
      type: "array",
      of: [{ type: "string", validation: (Rule) => Rule.max(40) }],
      initialValue: [
        "Switching MSPs",
        "No IT today",
        "Security concern",
        "Cloud migration",
        "IT project / move",
        "Just exploring",
      ],
      validation: (Rule) => Rule.required().min(3).max(10),
    }),
    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      initialValue: "Send & schedule a call",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "submitNote",
      title: "Submit Note",
      description: "Small reassurance line next to the submit button.",
      type: "string",
      initialValue: "Reply guaranteed within 1 business day",
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "successHeading",
      title: "Success State Heading",
      type: "string",
      initialValue: "Thanks — we'll be in touch.",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "successBody",
      title: "Success State Body",
      type: "text",
      rows: 3,
      initialValue: "We've got your message and you'll hear from us within one business day. For anything urgent, call us directly.",
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "existingClientPanel",
      title: "Existing Client Panel (Optional)",
      description: "Optional promo panel for existing clients to open a support ticket.",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Existing client?",
          validation: (Rule) => Rule.required().max(24),
        }),
        defineField({
          name: "primary",
          title: "Primary Line",
          type: "string",
          initialValue: "Open a ticket",
          validation: (Rule) => Rule.required().max(32),
        }),
        defineField({
          name: "sub",
          title: "Sub Line",
          type: "string",
          initialValue: "Faster than email if you have your client portal credentials",
          validation: (Rule) => Rule.required().max(120),
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Contact body",
      subtitle: "Form + hours + map",
      media: UserIcon,
    }),
  },
});
