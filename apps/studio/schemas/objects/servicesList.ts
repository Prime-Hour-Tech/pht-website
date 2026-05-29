import { defineType, defineField, defineArrayMember } from "sanity";
import { StackCompactIcon } from "@sanity/icons";

export const servicesList = defineType({
  name: "servicesList",
  title: "Services List",
  type: "object",
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      description: "Select services to feature. Order in this list controls display order (or use the service's own order field).",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "service" }],
        }),
      ],
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", headline: "heading", services: "services" },
    prepare: ({ eyebrow, services }: { eyebrow?: string; headline?: string; services?: unknown[] }) => {
      const subtitleParts = [services?.length ? services.length + " services" : null, eyebrow || null].filter(Boolean);
      return {
        title: "Services list",
        subtitle: subtitleParts.join(" · ") || "—",
        media: StackCompactIcon,
      };
    },
  },
});
