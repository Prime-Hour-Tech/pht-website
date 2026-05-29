import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

const ICON_OPTIONS = [
  "monitor", "shield", "cloud", "server", "compass", "globe",
  "file", "users", "spark", "lock",
  "phone", "mail", "check", "arrow", "arrowSm", "chevron",
];

export const industryCrosslink = defineType({
  name: "industryCrosslink",
  title: "Industry Crosslink",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "See it by industry instead",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({ name: "heading", title: "Heading", type: "headline", validation: (Rule) => Rule.required() }),
    defineField({
      name: "tiles",
      title: "Tiles",
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
          defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required().max(40) }),
          defineField({ name: "sub", title: "Sub", type: "string", validation: (Rule) => Rule.required().max(80) }),
          defineField({ name: "href", title: "URL", type: "string", validation: (Rule) => Rule.required() }),
        ],
      }],
      initialValue: [
        {
          iconName: "file",
          label: "Professional Services",
          sub: "Law · Accounting",
          href: "/industries#professional-services",
        },
        {
          iconName: "users",
          label: "Small & Mid-Size",
          sub: "10 – 250 seats",
          href: "/industries#smb",
        },
        {
          iconName: "shield",
          label: "Regulated Industries",
          sub: "HIPAA · SOC-2",
          href: "/industries#regulated",
        },
        {
          iconName: "spark",
          label: "Nonprofits & Education",
          sub: "M365 nonprofit",
          href: "/industries#nonprofit",
        },
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", tiles: "tiles" },
    prepare: ({ eyebrow, tiles }: { eyebrow?: string; tiles?: unknown[] }) => {
      const subtitleParts = [tiles?.length ? tiles.length + " tiles" : null, eyebrow || null].filter(Boolean);
      return {
        title: "Industry crosslink",
        subtitle: subtitleParts.join(" · ") || "—",
        media: LinkIcon,
      };
    },
  },
});
