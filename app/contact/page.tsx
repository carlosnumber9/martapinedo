import { Metadata } from 'next';
import { ContactForm } from 'components';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from 'utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact');

  return buildPageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/contact',
    image: '/contact.png',
  });
}

export default function ContactPage() {
  return (
    <section className="flex w-full flex-1 items-center justify-center px-6 pb-12 pt-28">
      <ContactForm />
    </section>
  );
}
