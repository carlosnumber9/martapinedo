import { CookieConsentToggle, Heading } from 'components';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from 'utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal');

  return buildPageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/legal',
  });
}

export default async function LegalsPage() {
  const t = await getTranslations('legal');
  return (
    <section className="p-8 pt-28 pb-12 max-w-4xl">
      <Heading variant="legalTitle">{t('title')}</Heading>
      <Heading variant="legalSectionTitle">{t('dataProtection.title')}</Heading>
      <p className="mb-4 font-body">{t('dataProtection.description')}</p>
      <Heading variant="legalSectionTitle" className="mt-10">{t('cookies.title')}</Heading>
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
