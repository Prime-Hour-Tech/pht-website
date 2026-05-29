import { defineType, defineField } from "sanity";

export const switchingTestimonial = defineType({
  name: "switchingTestimonial",
  title: "Switching Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "A recent switch",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 5,
      initialValue:
        "I'd been told switching MSPs was a four-month nightmare. It wasn't. They ran their thing in parallel with our old MSP for two weeks, and by the time we cut over, my team didn't even notice — except that tickets started getting answered the same day.",
      validation: (Rule) => Rule.required().max(600),
    }),
    defineField({
      name: "attributionRole",
      title: "Attribution Role",
      type: "string",
      initialValue: "Operations Director",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "attributionContext",
      title: "Attribution Context",
      type: "string",
      initialValue: "Professional services firm · Salt Lake City · 42 seats",
      validation: (Rule) => Rule.required().max(80),
    }),
  ],
  preview: { prepare: () => ({ title: "Switching Testimonial" }) },
});
