import type { SupportedLocale } from 'app/types';
import { getLocale, getTranslations } from 'next-intl/server';
import { CASES_MOCKS } from './mocks';
import { Timeline } from './TimelineLine';

export default async function Cases() {
  const locale = (await getLocale()) as SupportedLocale;
  const t = await getTranslations('cases');
  const cases = CASES_MOCKS[locale] ?? [];

  if (!cases.length) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center px-6 pt-20 text-center">
        <p className="font-subtitle text-2xl text-white sm:text-3xl">{t('placeholder')}</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-darkPrimary pt-20">
      <Timeline />
    </section>
  );
}
