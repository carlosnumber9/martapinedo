'use client';

import { useTranslations } from 'use-intl';
import { Heading } from './Heading';

export const Headline = () => {
  const t = useTranslations('headline');

  return (
    <div className="absolute top-[calc(5rem+10px)] left-0 right-0 flex justify-center px-4 z-10">
      <Heading variant="homeHeadline">
        {t('text')}
      </Heading>
    </div>
  );
};
