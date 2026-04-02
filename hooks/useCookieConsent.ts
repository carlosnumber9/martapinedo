import { COOKIE_CONSENT_EVENT } from 'app/constants';
import { useEffect, useState } from 'react';
import { hasCookieConsent as checkCookieConsent } from 'utils';

interface UseCookieConsentReturn {
  hasCookieConsent: boolean;
}

export const useCookieConsent = (): UseCookieConsentReturn => {
  const [hasCookieConsent, setHasCookieConsent] = useState<boolean>(false);

  useEffect(() => {
    setHasCookieConsent(checkCookieConsent());

    const handleUpdate = (): void => setHasCookieConsent(checkCookieConsent());
    window.addEventListener(COOKIE_CONSENT_EVENT, handleUpdate);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleUpdate);
  }, []);

  return { hasCookieConsent };
};
