export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logoDark {
      asset,
      alt
    },
    logoLight {
      asset,
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
            asset,
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
          asset,
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
          asset,
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
      },
      _type == "postList" => {
        eyebrow,
        heading,
        emptyStateMessage
      },
      _type == "servicesIndexHero" => {
        eyebrow,
        heading,
        deck,
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
        }
      },
      _type == "pricingTiers" => {
        eyebrow,
        heading,
        deck,
        essentials,
        standard,
        premier
      },
      _type == "bundleGrid" => {
        eyebrow,
        heading,
        deck,
        secondaryLinkLabel,
        secondaryLinkHref,
        tiles,
        footerLinkLabel,
        footerLinkHref
      },
      _type == "processStrip" => {
        eyebrow,
        heading,
        steps
      },
      _type == "industryCrosslink" => {
        eyebrow,
        heading,
        tiles
      },
      _type == "switchingHero" => {
        eyebrow,
        title,
        deck,
        ctaPrimaryLabel,
        ctaPrimaryHref,
        ctaSecondaryLabel,
        ctaSecondaryHref,
        dealCard,
        factSheetLabel,
        liveDotLabel,
        stats
      },
      _type == "switchingReasons" => {
        eyebrow,
        title,
        deck,
        items
      },
      _type == "switchingTimeline" => {
        eyebrow,
        title,
        deck,
        phases
      },
      _type == "switchingHandle" => {
        eyebrow,
        title,
        deck,
        items
      },
      _type == "switchingCompare" => {
        eyebrow,
        title,
        usHeader,
        themHeader,
        rows
      },
      _type == "switchingPromises" => {
        eyebrow,
        title,
        promises
      },
      _type == "switchingTestimonial" => {
        eyebrow,
        quote,
        attributionRole,
        attributionContext
      },
      _type == "faqList" => {
        eyebrow,
        heading,
        items
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
    specSheetUrl,
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
    "updatedAt": _updatedAt,
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

// Latest 20 published posts, projected to the minimum fields needed for RSS items.
// Matches PostRssItem in types.ts. Sorted by publishDate desc; empty array if zero posts.
export const allPostsForRssQuery = /* groq */ `
  *[_type == "post" && defined(slug.current) && defined(publishDate)]
  | order(publishDate desc)
  [0...20] {
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishDate
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

// Landing pages: dynamic /landing/{slug} routes from a multi-instance doc type.
// Filter on minimum-required structural fields so half-authored drafts don't
// generate broken routes. Same pattern as the services queries.
const LANDING_COMPLETE_FILTER =
  "defined(slug.current) && defined(hero) && defined(form) && defined(cta)";

export const allLandingSlugsQuery = /* groq */ `
  *[_type == "landingPage" && ${LANDING_COMPLETE_FILTER}] {
    "slug": slug.current
  }
`;

export const landingBySlugQuery = /* groq */ `
  *[_type == "landingPage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    ogImage,
    hero {
      metaEyebrow,
      title,
      deck,
      ctaPrimaryLabel,
      ctaPrimaryHref,
      heroStats[]{ k, v }
    },
    form {
      cardEyebrow,
      heading,
      deck,
      situationPlaceholder,
      submitLabel,
      replyNote,
      successHeading,
      successBody
    },
    trustBar {
      prefixLabel,
      items
    },
    problem {
      eyebrow,
      title,
      deck,
      items[]{ head, body }
    },
    included {
      eyebrow,
      title,
      deck,
      bullets[]{ head, body }
    },
    howItWorks {
      eyebrow,
      title,
      steps[]{ k, head, body }
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

