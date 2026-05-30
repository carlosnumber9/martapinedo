import { SupportedLocale } from 'app/types';
import { CookieConsentToggle } from 'components';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: { locale?: SupportedLocale };
}): Promise<Metadata> {
  const locale: SupportedLocale = params?.locale ?? 'es';
  const t = await getTranslations('legal');

  return {
    title: {
      absolute: t('metaTitle'),
    },
    description: t('metaDescription'),
  };
}

export default async function LegalsPage() {
  const t = await getTranslations('legal');
  return (
    <section className="p-8 pt-28 pb-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <h2 className="text-2xl mb-2 font-subtitle">{t('dataProtection.title')}</h2>
      <p className="mb-4 font-body">{t('dataProtection.description')}</p>
      <h2 className="text-2xl mb-2 mt-10 font-subtitle">{t('cookies.title')}</h2>
      <p className="mb-4 font-body">{t('cookies.description')}</p>
      <ul className="list-disc pl-6 space-y-2 font-body">
        <li>{t('cookies.items.consent')}</li>
        <li>{t('cookies.items.locale')}</li>
        <li>{t('cookies.items.analytics')}</li>
        <li>{t('cookies.items.turnstile')}</li>
      </ul>
      <CookieConsentToggle />
    </section>
  );
}
