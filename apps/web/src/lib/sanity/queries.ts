export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    defaultOgImage
  }
`;

export const pageBySlugQuery = /* groq */ `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    ogImage,
    blocks[]{
      _type,
      _key,
      _type == "hero" => {
        heading,
        subheading,
        ctaLabel,
        ctaHref
      }
    }
  }
`;

export const allPageSlugsQuery = /* groq */ `
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current
  }
`;
