import { getTranslations } from 'next-intl/server';

export default async function Cases() {
  const t = await getTranslations('cases');

  return (
    <section className="flex min-h-screen w-full items-center justify-center px-6 pt-20 text-center">
      <p className="font-subtitle text-2xl text-white sm:text-3xl">{t('placeholder')}</p>
    </section>
  );
}
