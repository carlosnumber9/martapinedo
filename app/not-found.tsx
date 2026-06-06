import { Button } from 'components/Button';
import { Heading } from 'components/Heading';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound');

  return {
    title: {
      absolute: t('metaTitle'),
    },
    description: t('metaDescription'),
  };
}

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <section className="min-h-[calc(100vh-5rem)] w-full bg-darkPrimary px-6 pt-32 pb-16 flex items-center justify-center">
      <div className="w-full max-w-3xl border-2 border-blueSecondary/20 bg-darkSecondary/70 px-6 py-12 text-center shadow-contact sm:px-12">
        <Heading variant="notFoundTitle">{t('title')}</Heading>
        <p className="mx-auto mb-10 max-w-2xl font-body text-lg leading-8 text-white/80">
          {t('description')}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="/"
            variant="primary"
            size="lg"
            className="font-subtitle"
          >
            {t('homeButton')}
          </Button>
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            className="font-subtitle"
          >
            {t('contactButton')}
          </Button>
        </div>
      </div>
    </section>
  );
}
