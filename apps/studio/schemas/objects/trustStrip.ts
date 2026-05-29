import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const trustStrip = defineType({
  name: "trustStrip",
  title: "Trust Strip",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "label",
      title: "Leading Label",
      type: "string",
      initialValue: "Trusted by",
      validation: (Rule) => Rule.required().max(32),
    }),
    defineField({
      name: "items",
      title: "Items",
      description: "Client labels or names. Mono uppercase rendering.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(3).max(10),
    }),
  ],
  preview: {
    select: { label: "label", items: "items" },
    prepare: ({ label, items }: { label?: string; items?: unknown[] }) => {
      const subtitleParts = [label, items?.length ? items.length + " items" : null].filter(Boolean);
      return {
        title: "Trust strip",
        subtitle: subtitleParts.join(" · ") || "—",
        media: UsersIcon,
      };
    },
  },
});
