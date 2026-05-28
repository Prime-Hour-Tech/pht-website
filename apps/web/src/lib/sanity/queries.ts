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
      },
      _type == "pageHero" => {
        eyebrow,
        headline,
        deck
      },
      _type == "originPhoto" => {
        image {
          "url": asset->url,
          alt
        },
        aspectRatio,
        caption {
          eyebrowLabel,
          quote,
          attribution
        }
      },
      _type == "storyThreeCol" => {
        eyebrow,
        heading,
        columns[]{
          eyebrow,
          heading,
          body
        }
      },
      _type == "numbersStrip" => {
        stats[]{ k, v }
      },
      _type == "milestonesTimeline" => {
        eyebrow,
        heading,
        deck,
        items[]{ date, title, body }
      },
      _type == "officeCulture" => {
        image {
          "url": asset->url,
          alt
        },
        aspectRatio,
        eyebrow,
        heading,
        body,
        bullets
      },
      _type == "industriesContent" => {
        jumpLabel,
        verticals[]{
          "id": id.current,
          iconName,
          name,
          sub,
          intro,
          bullets,
          examples
        }
      },
      _type == "industriesDontSeeYours" => {
        eyebrow,
        heading,
        deck,
        primaryCta { label, href },
        secondaryCta { label, href }
      },
      _type == "contactBody" => {
        formHeading,
        formDeck,
        promptingOptions,
        submitLabel,
        submitNote,
        successHeading,
        successBody,
        existingClientPanel { label, primary, sub, href }
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
    serviceAreaSub,
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
    featuredService->{
      _id,
      name,
      "slug": slug.current,
      iconName,
      eyebrow,
      headline,
      deck,
      heroStat,
      capabilities
    },
    pricingHeading { eyebrow, heading, deck },
    pricingTiers {
      essentials { tag, tagline, price, includesHead, bullets, ctaLabel, ctaHref, flagLabel },
      standard   { tag, tagline, price, includesHead, bullets, ctaLabel, ctaHref, flagLabel },
      premier    { tag, tagline, price, includesHead, bullets, ctaLabel, ctaHref, flagLabel }
    },
    pricingFooterNote,
    pricingFooterLinkLabel,
    pricingFooterLinkHref,
    gridHeading { eyebrow, heading, secondaryLinkLabel, secondaryLinkHref },
    bundleTile {
      eyebrow,
      heading,
      body,
      rows[]{ serviceLabel, descriptor },
      footerHeadline,
      footerLinkLabel,
      footerLinkHref
    },
    processStrip {
      eyebrow,
      heading,
      deck,
      steps[]{ title, body }
    },
    industryCrosslink {
      eyebrow,
      heading,
      deck,
      ctaLinkLabel,
      ctaLinkHref,
      tiles[]{ iconName, label, sub, href }
    },
    ctaEyebrow,
    ctaHeading,
    ctaDeck,
    ctaLabel,
    ctaHref,
    otherServicesHeading,
    otherServicesViewAllLabel
  }
`;

// All four post queries share the same completeness filter — same pattern as
// the SERVICE_COMPLETE_FILTER above. Posts missing any required structural
// field are skipped at the query level (no /blog/<slug> route generated, no
// card appears in lists). Drafts in progress don't break the build.
const POST_COMPLETE_FILTER =
  "defined(slug.current) && defined(body) && " +
  "defined(coverImage) && defined(category) && " +
  "defined(publishDate) && defined(author)";

export const postSlugListQuery = /* groq */ `
  *[_type == "post" && ${POST_COMPLETE_FILTER}] {
    "slug": slug.current
  }
`;

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishDate,
    coverImage {
      asset,
      alt
    },
    body,
    seoTitle,
    seoDescription,
    ogImage,
    author->{
      _id,
      name,
      role,
      bio,
      photo {
        asset,
        alt
      }
    }
  }
`;

export const allPostsQuery = /* groq */ `
  *[_type == "post" && ${POST_COMPLETE_FILTER}] | order(publishDate desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishDate,
    coverImage {
      asset,
      alt
    },
    author->{
      name,
      role
    }
  }
`;

export const relatedPostsQuery = /* groq */ `
  *[_type == "post" && category == $category && slug.current != $slug && ${POST_COMPLETE_FILTER}]
    | order(publishDate desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishDate,
    coverImage {
      asset,
      alt
    },
    author->{
      name,
      role
    }
  }
`;

export const blogIndexPageQuery = /* groq */ `
  *[_type == "blogIndexPage"][0] {
    heroEyebrow,
    heroHeading,
    heroDeck,
    ctaEyebrow,
    ctaHeading,
    ctaDeck,
    ctaLabel,
    ctaHref
  }
`;

export const termsPageQuery = /* groq */ `
  *[_type == "termsPage"][0] {
    eyebrow,
    title,
    lastUpdated,
    summaryHeading,
    summaryBody,
    sections[]{
      title,
      body
    },
    contactCardLabel,
    contactCardCopy,
    contactCardCtaLabel,
    contactCardCtaHref
  }
`;

export const privacyPageQuery = /* groq */ `
  *[_type == "privacyPage"][0] {
    eyebrow,
    title,
    lastUpdated,
    summaryHeading,
    summaryBody,
    sections[]{
      title,
      body
    },
    contactCardLabel,
    contactCardCopy,
    contactCardCtaLabel,
    contactCardCtaHref
  }
`;

export const switchingPageQuery = /* groq */ `
  *[_type == "switchingPage"][0] {
    hero {
      eyebrow,
      title,
      deck,
      ctaPrimaryLabel,
      ctaPrimaryHref,
      ctaSecondaryLabel,
      ctaSecondaryHref,
      dealCard {
        eyebrow,
        rows[]{ label, value }
      },
      factSheetLabel,
      liveDotLabel,
      stats[]{ k, v }
    },
    reasons {
      eyebrow,
      title,
      deck,
      items[]{ head, body, flagLabel }
    },
    timeline {
      eyebrow,
      title,
      deck,
      weeks[]{
        k,
        sub,
        head,
        body,
        deliverables,
        ours
      }
    },
    handle {
      eyebrow,
      title,
      deck,
      items[]{ head, body }
    },
    compare {
      eyebrow,
      title,
      rows[]{ aspect, currentMsp, pht }
    },
    promises {
      eyebrow,
      title,
      items[]{ iconName, head, body }
    },
    testimonial {
      eyebrow,
      quote,
      name,
      role,
      cardEyebrow,
      metricK,
      metricV,
      locationLabel
    },
    faq {
      eyebrow,
      title,
      deck,
      items[]{ question, answer }
    },
    cta {
      eyebrow,
      heading,
      deck,
      label,
      href
    }
  }
`;
