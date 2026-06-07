import 'server-only';

import type {
  Case,
  CaseMetadata,
  CaseSitemapItem,
  CasesResponse,
  SupportedLocale,
} from 'app/types';
import { apolloClient } from 'utils/client';
import { getCleanPostBody } from 'utils/posts';
import {
  GET_CASE_BY_ID,
  GET_CASE_METADATA,
  GET_CASE_SITEMAP_ITEMS,
  GET_CASES,
} from './queries';

export const getCases = async (locale: SupportedLocale): Promise<Case[]> => {
  const { data } = await apolloClient.query<CasesResponse<Case>>({
    query: GET_CASES,
    variables: { locale },
  });

  return data.cases?.map(withCleanDescription) ?? [];
};

export const getCaseById = async (
  id: string,
  locale: SupportedLocale
): Promise<Case | null> => {
  const { data } = await apolloClient.query<CasesResponse<Case>>({
    query: GET_CASE_BY_ID,
    variables: { id, locale },
  });

  const caseItem = data.cases?.[0];

  return caseItem ? withCleanDescription(caseItem) : null;
};

export const getCaseMetadata = async (
  id: string,
  locale: SupportedLocale
): Promise<CaseMetadata | null> => {
  const { data } = await apolloClient.query<CasesResponse<CaseMetadata>>({
    query: GET_CASE_METADATA,
    variables: { id, locale },
  });

  return data.cases?.[0] ?? null;
};

export const getSitemapCases = async (
  locale: SupportedLocale
): Promise<CaseSitemapItem[]> => {
  const { data } = await apolloClient.query<CasesResponse<CaseSitemapItem>>({
    query: GET_CASE_SITEMAP_ITEMS,
    variables: { locale },
  });

  return data.cases ?? [];
};

const withCleanDescription = (caseItem: Case): Case => ({
  ...caseItem,
  description: {
    ...caseItem.description,
    html: getCleanPostBody(caseItem.description.html),
  },
});
