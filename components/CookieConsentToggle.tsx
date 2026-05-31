'use client';

import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_NAME } from 'app/constants';
import { Button } from 'components/Button';
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
      <Button
        type="button"
        onClick={() => setCookieConsent(!hasCookieConsent)}
        variant="accent"
        className="px-6"
      >
        {hasCookieConsent ? t('disableButton') : t('enableButton')}
      </Button>
    </div>
  );
};
