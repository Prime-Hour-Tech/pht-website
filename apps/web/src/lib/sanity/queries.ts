export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logoDark {
      "url": asset->url,
      alt
    },
    logoLight {
      "url": asset->url,
      alt
    },
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

export const navigationQuery = /* groq */ `
  *[_type == "navigation"][0] {
    items[]{
      label,
      href,
      openInNewTab
    },
    ctaButton {
      label,
      href
    }
  }
`;

export const footerQuery = /* groq */ `
  *[_type == "footer"][0] {
    tagline,
    columns[]{
      heading,
      links[]{
        label,
        href,
        openInNewTab
      }
    },
    bottomLinks[]{
      label,
      href
    },
    socials[]{
      platform,
      href
    },
    copyright
  }
`;

export const contactInfoQuery = /* groq */ `
  *[_type == "contactInfo"][0] {
    phone {
      display,
      dial
    },
    email,
    hours {
      weekdayLabel,
      openMinute,
      closeMinute,
      timezone
    },
    address {
      city,
      state,
      street,
      postal
    }
  }
`;
