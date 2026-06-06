import type { SupportedLocale } from 'app/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { getCleanPostBody } from 'utils';
import { CaseDetailContent } from '../CaseDetailContent';
import { CASES_MOCKS } from '../mocks';

interface Props {
  params: Promise<{ id: string }>;
}

const getCaseById = (id: string, locale: SupportedLocale) =>
  (CASES_MOCKS[locale] ?? []).find((caseItem) => caseItem.id === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedLocale;
  const { id } = await params;
  const caseItem = getCaseById(id, locale);

  if (!caseItem) {
    notFound();
  }

  return {
    title: `${caseItem.caseName} | Marta Pinedo Sánchez`,
    description: caseItem.description.text,
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const locale = (await getLocale()) as SupportedLocale;
  const { id } = await params;
  const caseItem = getCaseById(id, locale);

  if (!caseItem) {
    notFound();
  }

  const cleanDescription = getCleanPostBody(caseItem.description.html);

  return (
    <section className="w-full bg-darkPrimary px-6 py-28">
      <CaseDetailContent
        caseItem={caseItem}
        cleanDescription={cleanDescription}
        locale={locale}
      />
    </section>
  );
}
