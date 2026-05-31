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
  return (
    <section className="flex w-full flex-1 items-center justify-center px-6 pb-12 pt-28">
      <ContactForm />
    </section>
  );
}
