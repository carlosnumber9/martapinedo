'use client';

import { SupportedLocale } from 'app/types';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations();

  const changeLanguage = (newLocale: SupportedLocale) => {
    document.cookie = `LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  const nextLocale = currentLocale === 'es' ? 'en' : 'es';
  const isOn = currentLocale === 'en';
  const currentLocaleLabel =
    currentLocale === 'es' ? t('languageSwitcher.spanish') : t('languageSwitcher.english');
  const nextLocaleLabel =
    nextLocale === 'es' ? t('languageSwitcher.spanish') : t('languageSwitcher.english');
  const ariaLabel = `${t('languageSwitcher.changeLanguage')}. ${t('languageSwitcher.currentLanguage')}: ${currentLocaleLabel}. ${t('languageSwitcher.nextLanguage')}: ${nextLocaleLabel}`;

  return (
    <button
      type="button"
      onClick={() => changeLanguage(nextLocale)}
      className="relative w-[60px] h-10 rounded-full overflow-hidden cursor-pointer border-none p-0 bg-cover bg-center transition-all duration-300 flex items-center shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      style={{
        backgroundImage: `url(/${nextLocale}.png)`,
      }}
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
    >
      <div
        className={`w-10 h-10 bg-white rounded-full shadow-md transition-transform duration-300 ${
          isOn ? 'translate-x-5' : 'translate-x-0'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
