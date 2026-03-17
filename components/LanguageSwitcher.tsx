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

  const nextLocale: SupportedLocale = currentLocale === 'es' ? 'en' : 'es';
  const isOn: boolean = currentLocale === 'en';
  const currentLocaleLabel: string =
    currentLocale === 'es' ? t('languageSwitcher.spanish') : t('languageSwitcher.english');
  const nextLocaleLabel: string =
    nextLocale === 'es' ? t('languageSwitcher.spanish') : t('languageSwitcher.english');
  const ariaLabel: string = `${t('languageSwitcher.changeLanguage')}. ${t('languageSwitcher.currentLanguage')}: ${currentLocaleLabel}. ${t('languageSwitcher.nextLanguage')}: ${nextLocaleLabel}`;

  return (
    <button
      type="button"
      onClick={() => changeLanguage(nextLocale)}
      className="relative w-[55px] h-7 rounded-full overflow-hidden cursor-pointer border-none p-0 transition-all duration-300 flex items-center shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      style={{
        backgroundImage: `url(/${nextLocale}.png)`,
        backgroundSize: '45px',
        backgroundPosition: isOn ? '-50%' : '100%',
        backgroundRepeat: 'no-repeat',
      }}
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
    >
      <div
        className={`w-7 h-7 bg-darkPrimary rounded-full shadow-md transition-transform duration-300 ${
          isOn ? 'translate-x-7' : 'translate-x-0'
        } border-blueSecondary/70 border-2`}
        draggable
        aria-hidden="true"
      />
    </button>
  );
}
