import type { Case, CasesResponse, SupportedLocale } from 'app/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { apolloClient, getCleanPostBody } from 'utils';
import { CaseDetailArea } from '../CaseDetailArea';
import { CaseDetailContent } from '../CaseDetailContent';
import { GET_CASE as query } from '../queries';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

const getCaseById = (id: string, locale: SupportedLocale) =>
  apolloClient.query<CasesResponse<Case>>({
    query,
    variables: { id, locale },
  });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedLocale;
  const { id } = await params;

  try {
    const { data } = await getCaseById(id, locale);
    const caseItem = data.cases?.[0];

    if (!caseItem) {
      notFound();
    }

    return {
      title: `${caseItem.caseName} | Marta Pinedo Sánchez`,
      description: caseItem.description.text,
    };
  } catch (err: unknown) {
    console.error('Error fetching case metadata:', err);
    notFound();
  }
}

export default async function CaseDetailPage({ params }: Props) {
  const locale = (await getLocale()) as SupportedLocale;
  const t = await getTranslations('cases');
  const { id } = await params;
  try {
    const { data } = await getCaseById(id, locale);
    const caseItem = data.cases?.[0];

    if (!caseItem) {
      notFound();
    }

    const cleanDescription = getCleanPostBody(caseItem.description.html);

    return (
      <CaseDetailArea>
        <CaseDetailContent
          backLabel={t('backButton')}
          caseItem={caseItem}
          cleanDescription={cleanDescription}
          locale={locale}
        />
      </CaseDetailArea>
    );
  } catch (err: unknown) {
    console.error('Error fetching case:', err);
    notFound();
  }
}
