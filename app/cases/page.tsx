import type { Case, CasesResponse, SupportedLocale } from 'app/types';
import { Button } from 'components';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { apolloClient, getCleanPostBody } from 'utils';
import { CasesTimeline } from './CasesTimeline';
import { GET_CASES as query } from './queries';

export const dynamic = 'force-dynamic';

export default async function Cases() {
  const locale = (await getLocale()) as SupportedLocale;
  const t = await getTranslations('cases');
  let cases: Case[] = [];

  try {
    const { data } = await apolloClient.query<CasesResponse<Case>>({
      query,
      variables: { locale },
    });

    cases = data.cases ?? [];
  } catch (err: unknown) {
    console.error('Error fetching cases:', err);
    notFound();
  }

  const cleanCases = cases.map((caseItem) => ({
    ...caseItem,
    description: {
      ...caseItem.description,
      html: getCleanPostBody(caseItem.description.html),
    },
  }));

  if (!cases.length) {
    return (
      <section className="flex min-h-screen w-full flex-col items-center justify-center bg-darkPrimary px-6 pt-20 text-center">
        <p className="font-subtitle text-2xl text-white/85 sm:text-3xl">
          {t('placeholder')}
        </p>
        <Button href="/contact" variant="secondary" size="lg" className="mt-12 font-subtitle">
          {t('cta')}
        </Button>
      </section>
    );
  }

  return (
    <CasesTimeline
      backLabel={t('backButton')}
      cases={cleanCases}
      cta={t('cta')}
      locale={locale}
      title={t('title')}
    />
  );
}
