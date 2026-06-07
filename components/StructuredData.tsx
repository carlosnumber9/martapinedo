import { buildSiteStructuredData, JsonLdData, stringifyJsonLd } from 'utils/seo';

type StructuredDataProps = {
  data?: JsonLdData;
};

export const JsonLd = ({ data }: Required<StructuredDataProps>) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
  />
);

export default function StructuredData({ data }: StructuredDataProps) {
  const structuredData = data ?? buildSiteStructuredData();

  return <JsonLd data={structuredData} />;
}
