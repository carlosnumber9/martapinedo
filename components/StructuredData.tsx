import { SITE_NAME, SITE_URL } from 'utils/seo';

type StructuredDataProps = {
  data?: Record<string, unknown>;
};

const stringifyJsonLd = (data: Record<string, unknown>) =>
  JSON.stringify(data).replace(/</g, '\\u003c');

const personId = `${SITE_URL}/#person`;
const attorneyId = `${SITE_URL}/#attorney`;
const websiteId = `${SITE_URL}/#website`;

const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'es',
      publisher: {
        '@id': personId,
      },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Marta Pinedo Sánchez',
      image: `${SITE_URL}/marta.png`,
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
      '@id': attorneyId,
      name: 'Marta Pinedo Sánchez',
      image: `${SITE_URL}/marta.png`,
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
        '@id': personId,
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
};

export const JsonLd = ({ data }: Required<StructuredDataProps>) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
  />
);

export default function StructuredData({ data = siteStructuredData }: StructuredDataProps) {
  return <JsonLd data={data} />;
}
