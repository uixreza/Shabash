import {
  SITE_ADDRESS,
  SITE_DESCRIPTION,
  SITE_GEO,
  SITE_NAME,
  SITE_NAME_EN,
  SITE_PHONE,
  SITE_URL,
} from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: [SITE_NAME_EN, "Shabashchi Luxury"],
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.jpg`,
          width: 512,
          height: 512,
        },
        telephone: SITE_PHONE,
        address: {
          "@type": "PostalAddress",
          ...SITE_ADDRESS,
        },
        geo: {
          "@type": "GeoCoordinates",
          ...SITE_GEO,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "خراسان شمالی",
          sameAs: "https://fa.wikipedia.org/wiki/%D8%AE%D8%B1%D8%A7%D8%B3%D8%A7%D9%86_%D8%B4%D9%85%D8%A7%D9%84%DB%8C",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SITE_PHONE,
          contactType: "customer service",
          areaServed: "IR",
          availableLanguage: ["Persian", "fa"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: SITE_NAME_EN,
        inLanguage: "fa-IR",
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  const listItems = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: listItems,
  };
}
