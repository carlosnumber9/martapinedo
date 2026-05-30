import { Metadata } from 'next';
import Link from 'next/link';
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
        <h1 className="mb-6 font-main text-4xl text-white/90 sm:text-6xl">{t('title')}</h1>
        <p className="mx-auto mb-10 max-w-2xl font-body text-lg leading-8 text-white/80">
          {t('description')}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex h-14 items-center justify-center border-2 border-blueSecondary bg-blueSecondary px-6 font-subtitle text-lg font-semibold text-darkPrimary transition-colors duration-300 hover:bg-bluePrimary/50 hover:text-white/90"
          >
            {t('homeButton')}
          </Link>
          <Link
            href="/contact"
            className="flex h-14 items-center justify-center border-2 border-blueSecondary px-6 font-subtitle text-lg font-semibold text-white/90 transition-colors duration-300 hover:bg-blueSecondary hover:text-darkPrimary"
          >
            {t('contactButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}
