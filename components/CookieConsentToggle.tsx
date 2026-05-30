'use client';

import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_NAME } from 'app/constants';
import { useCookieConsent } from 'hooks';
import { useTranslations } from 'next-intl';

const COOKIE_MAX_AGE = 31536000;

const setCookieConsent = (value: boolean): void => {
  document.cookie = `${COOKIE_CONSENT_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
};

export const CookieConsentToggle: React.FC = () => {
  const t = useTranslations('legal.cookies');
  const { hasCookieConsent } = useCookieConsent();

  return (
    <div className="flex justify-center mt-8">
      <button
        type="button"
        onClick={() => setCookieConsent(!hasCookieConsent)}
        className="bg-blueSecondary text-darkPrimary font-semibold px-6 py-2 cursor-pointer hover:opacity-90 transition-opacity"
      >
        {hasCookieConsent ? t('disableButton') : t('enableButton')}
      </button>
    </div>
  );
};
