import type { Case, SupportedLocale } from 'app/types';
import {
  buildBreadcrumbStructuredData,
  getLocalizedHomeLabel,
  SITE_URL,
} from 'utils/seo';

const getCasesLabel = (locale: SupportedLocale) => (locale === 'es' ? 'Casos' : 'Cases');

export const buildCaseBreadcrumbStructuredData = (
  caseItem: Case,
  locale: SupportedLocale
) =>
  buildBreadcrumbStructuredData([
    {
      name: getLocalizedHomeLabel(locale),
      url: SITE_URL,
    },
    {
      name: getCasesLabel(locale),
      url: `${SITE_URL}/cases`,
    },
    {
      name: caseItem.caseName,
      url: `${SITE_URL}/cases/${caseItem.id}`,
    },
  ]);
