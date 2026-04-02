import { SupportedLocale } from 'app/types';
import { ContactForm } from 'components';
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
    <section className="relative top-24 p-8">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <h2 className="text-2xl mb-2 font-subtitle">{t('dataProtection.title')}</h2>
      <p className="mb-4 font-body">{t('dataProtection.description')}</p>
    </section>
  );
}
