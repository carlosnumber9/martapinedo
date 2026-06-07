import type { SupportedLocale } from 'app/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from 'utils/seo';
import { getCaseById, getCaseMetadata } from '../_data/cases';
import { CaseDetailArea } from '../CaseDetailArea';
import { CaseDetailContent } from '../CaseDetailContent';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedLocale;
  const { id } = await params;

  try {
    const caseItem = await getCaseMetadata(id, locale);

    if (!caseItem) {
      notFound();
    }

    return buildPageMetadata({
      title: `${caseItem.caseName} | Marta Pinedo Sánchez`,
      description: caseItem.description.text,
      path: `/cases/${id}`,
    });
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
    const caseItem = await getCaseById(id, locale);

    if (!caseItem) {
      notFound();
    }

    return (
      <CaseDetailArea>
        <CaseDetailContent
          backLabel={t('backButton')}
          caseItem={caseItem}
          cleanDescription={caseItem.description.html}
          locale={locale}
        />
      </CaseDetailArea>
    );
  } catch (err: unknown) {
    console.error('Error fetching case:', err);
    notFound();
  }
}
