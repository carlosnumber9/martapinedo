import type { SupportedLocale } from 'app/types';

export const getLocalizedDate = (date: string, locale: SupportedLocale) => {
  const languageTag = locale === 'es' ? 'es-ES' : 'en-US';

  return new Intl.DateTimeFormat(languageTag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
};
