import { Metadata } from 'next';
import { ContactForm } from 'components';
import { SupportedLocale } from 'app/types';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: { locale?: SupportedLocale };
}): Promise<Metadata> {
  const locale: SupportedLocale = params?.locale ?? 'es';
  const t = await getTranslations('contact');

  return {
    title: {
      absolute: t('metaTitle'),
    },
    description: t('metaDescription'),
  };
}

export default function ContactPage() {
  return <ContactForm />;
}