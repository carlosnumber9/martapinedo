import type { SupportedLocale } from 'app/types';
import { getLocale, getTranslations } from 'next-intl/server';
import { getCleanPostBody } from 'utils';
import { CasesTimeline } from './CasesTimeline';
import { CASES_MOCKS } from './mocks';

export default async function Cases() {
  const locale = (await getLocale()) as SupportedLocale;
  const t = await getTranslations('cases');
  const cases = CASES_MOCKS[locale] ?? [];
  const cleanCases = cases.map((caseItem) => ({
    ...caseItem,
    description: {
      ...caseItem.description,
      html: getCleanPostBody(caseItem.description.html),
    },
  }));

  if (!cases.length) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center px-6 pt-20 text-center">
        <p className="font-subtitle text-2xl text-white sm:text-3xl">{t('placeholder')}</p>
      </section>
    );
  }

  return <CasesTimeline backLabel={t('backButton')} cases={cleanCases} locale={locale} />;
}
