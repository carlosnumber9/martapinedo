import type { Metadata } from 'next';

export const SITE_URL = 'https://www.martapinedoabogada.es';
export const SITE_NAME = 'Marta Pinedo Sánchez | Abogada';
export const DEFAULT_OG_IMAGE = '/marta.png';
export const SITE_PERSON_ID = `${SITE_URL}/#person`;
export const SITE_ATTORNEY_ID = `${SITE_URL}/#attorney`;
export const SITE_WEBSITE_ID = `${SITE_URL}/#website`;
export const SITE_PERSON_NAME = 'Marta Pinedo Sánchez';
export const SITE_PERSON_IMAGE = `${SITE_URL}/marta.png`;
export const BLOG_IMAGE = `${SITE_URL}/blog.png`;

export type JsonLdData = Record<string, unknown>;

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

const normalizePath = (path: string = '/') => (path.startsWith('/') ? path : `/${path}`);

export const stringifyJsonLd = (data: JsonLdData) => JSON.stringify(data).replace(/</g, '\\u003c');

export const buildPageMetadata = ({
  authors,
  description,
  image = DEFAULT_OG_IMAGE,
  modifiedTime,
  path = '/',
  publishedTime,
  title,
  type = 'website',
}: PageMetadataOptions): Metadata => {
  const canonicalPath = normalizePath(path);
  const openGraphBase = {
    title,
    description,
    url: canonicalPath,
    siteName: SITE_NAME,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph:
      type === 'article'
        ? {
            ...openGraphBase,
            type: 'article',
            publishedTime,
            modifiedTime,
            authors,
          }
        : {
            ...openGraphBase,
            type: 'website',
          },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
};

export const buildSiteStructuredData = (): JsonLdData => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': SITE_WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'es',
      publisher: {
        '@id': SITE_PERSON_ID,
      },
    },
    {
      '@type': 'Person',
      '@id': SITE_PERSON_ID,
      name: SITE_PERSON_NAME,
      image: SITE_PERSON_IMAGE,
      jobTitle: 'Abogada',
      url: SITE_URL,
      sameAs: [
        'https://www.linkedin.com/in/marta-pinedo-7a8959195',
        'https://lexgoapp.com/marta-pinedo-i4447',
      ],
      knowsAbout: [
        'Derecho Civil',
        'Derecho Mercantil',
        'Derecho Administrativo',
        'Responsabilidad civil',
        'Contratos',
        'Litigios',
      ],
    },
    {
      '@type': 'Attorney',
      '@id': SITE_ATTORNEY_ID,
      name: SITE_PERSON_NAME,
      image: SITE_PERSON_IMAGE,
      url: SITE_URL,
      telephone: '+34-676-841-354',
      email: 'martapinedo@icam.es',
      priceRange: '€€',
      areaServed: {
        '@type': 'City',
        name: 'Madrid',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Cebreros, 103',
        addressLocality: 'Madrid',
        postalCode: '28011',
        addressCountry: 'ES',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 40.402056,
        longitude: -3.754028,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      founder: {
        '@id': SITE_PERSON_ID,
      },
      sameAs: [
        'https://www.linkedin.com/in/marta-pinedo-7a8959195',
        'https://lexgoapp.com/marta-pinedo-i4447',
      ],
      knowsAbout: [
        'Derecho Civil',
        'Derecho Mercantil',
        'Derecho Administrativo',
        'Responsabilidad civil',
        'Contratos',
        'Litigios',
      ],
    },
  ],
});

type BreadcrumbItem = {
  name: string;
  url: string;
};

export const buildBreadcrumbStructuredData = (items: BreadcrumbItem[]): JsonLdData => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

type BlogPostingStructuredDataOptions = {
  authorImage?: string;
  authorName: string;
  dateModified?: string;
  datePublished: string;
  description: string;
  headline: string;
  inLanguage: string;
  url: string;
};

export const buildBlogPostingStructuredData = ({
  authorImage,
  authorName,
  dateModified,
  datePublished,
  description,
  headline,
  inLanguage,
  url,
}: BlogPostingStructuredDataOptions): JsonLdData => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${url}#article`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url,
  },
  headline,
  description,
  image: BLOG_IMAGE,
  datePublished,
  dateModified: dateModified || datePublished,
  inLanguage,
  author: {
    '@type': 'Person',
    name: authorName,
    ...(authorImage ? { image: authorImage } : {}),
  },
  publisher: {
    '@type': 'Person',
    '@id': SITE_PERSON_ID,
    name: SITE_PERSON_NAME,
    image: SITE_PERSON_IMAGE,
  },
});

export const getLocalizedHomeLabel = (locale: string) => (locale === 'es' ? 'Inicio' : 'Home');
