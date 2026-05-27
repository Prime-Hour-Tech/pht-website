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
      _type == "darkNumbersHero" => {
        eyebrow,
        bigNumber,
        bigNumberCaption,
        subheadline,
        deck,
        ctaPrimary,
        ctaSecondary,
        credentials[]{
          title,
          sub
        }
      },
      _type == "trustStrip" => {
        label,
        items
      },
      _type == "teamGrid" => {
        eyebrow,
        heading,
        deck,
        sideLink,
        "members": members[]->{
          _id,
          name,
          role,
          bio,
          order,
          photo {
            "url": asset->url,
            alt
          }
        } | order(order asc)
      },
      _type == "headaches" => {
        eyebrow,
        heading,
        deck,
        items[]{
          pain,
          fix
        }
      },
      _type == "savings" => {
        eyebrow,
        heading,
        deck,
        bulletList,
        chart {
          caption,
          categories[]{
            label,
            before,
            after
          },
          footnote
        }
      },
      _type == "servicesList" => {
        eyebrow,
        heading,
        "services": services[]->{
          _id,
          name,
          "slug": slug.current,
          shortDescription,
          iconName,
          order
        } | order(order asc)
      },
      _type == "beliefs" => {
        eyebrow,
        heading,
        deck,
        items
      },
      _type == "ctaCard" => {
        eyebrow,
        heading,
        deck,
        primaryCtaLabel,
        primaryCtaHref
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
    cardTitle,
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

// All three service-list queries share the same completeness filter. A service
// is "complete enough to display" only when every required field added through
// the Slice-3 + Slice-3-fix-up schema expansions is defined on the doc.
// Sanity's `initialValue` only fires on doc creation, so existing docs authored
// before a required field was added project that field as null until the user
// re-saves the doc. Filtering at the query level keeps half-authored services
// out of routes (no /services/<slug> page is generated), lists (no card on the
// home page or /services), and the sibling row (no broken Other Services tile).
// Remove fields from the filter when their authoring is universally complete,
// or add new ones whenever the service schema grows another required field.
const SERVICE_COMPLETE_FILTER =
  "defined(headline) && defined(heroStat) && " +
  "defined(capabilitiesEyebrow) && defined(faqEyebrow) && " +
  "defined(ctaEyebrow) && defined(ctaDeck)";

export const servicesSlugListQuery = /* groq */ `
  *[_type == "service" && ${SERVICE_COMPLETE_FILTER}] {
    "slug": slug.current
  }
`;

export const serviceBySlugQuery = /* groq */ `
  *[_type == "service" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    shortDescription,
    iconName,
    order,
    eyebrow,
    headline,
    deck,
    heroStat,
    heroPillLeft,
    heroPillRight,
    sectionEyebrow,
    sectionHeading,
    sectionBody,
    sectionBullets,
    capabilitiesEyebrow,
    capabilitiesHeading,
    capabilities,
    statStrip,
    faqEyebrow,
    faqHelperText,
    faqHeading,
    faqs,
    ctaEyebrow,
    ctaDeck
  }
`;

export const servicesListQuery = /* groq */ `
  *[_type == "service" && ${SERVICE_COMPLETE_FILTER}] | order(order asc) {
    name,
    "slug": slug.current,
    shortDescription,
    iconName
  }
`;

export const otherServicesQuery = /* groq */ `
  *[_type == "service" && slug.current != $slug && ${SERVICE_COMPLETE_FILTER}] | order(order asc) {
    name,
    "slug": slug.current,
    shortDescription,
    iconName
  }
`;

export const servicesIndexPageQuery = /* groq */ `
  *[_type == "servicesIndexPage"][0] {
    heroEyebrow,
    heroHeading,
    heroDeck,
    listEyebrow,
    listHeading,
    ctaEyebrow,
    ctaHeading,
    ctaDeck,
    ctaLabel,
    ctaHref,
    otherServicesHeading,
    otherServicesViewAllLabel
  }
`;
