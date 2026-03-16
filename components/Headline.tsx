'use client';

import { useTranslations } from 'use-intl';

export const Headline = () => {
  const t = useTranslations('headline');

  return (
    <div className="absolute top-[calc(5rem+10px)] left-0 right-0 flex justify-center px-4 z-10">
      <h2 className="text-lg sm:text-xl md:text-2xl uppercase tracking-wide text-white/90 font-main text-center max-w-full">
        {t('text')}
      </h2>
    </div>
  );
};
