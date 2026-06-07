import type { SupportedLocale } from 'app/types';
import { Button } from 'components';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from 'utils/seo';
import { getCases } from './_data/cases';
import { CasesTimeline } from './CasesTimeline';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cases');

  return buildPageMetadata({
    title: `${t('title')} | Marta Pinedo Sánchez`,
    description: t('metaDescription'),
    path: '/cases',
  });
}

export default async function Cases() {
  const locale = (await getLocale()) as SupportedLocale;
  const t = await getTranslations('cases');
  let cases = [];

  try {
    cases = await getCases(locale);
  } catch (err: unknown) {
    console.error('Error fetching cases:', err);
    notFound();
  }

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
      cases={cases}
      cta={t('cta')}
      locale={locale}
      title={t('title')}
    />
  );
}
