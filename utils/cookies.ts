import { COOKIE_CONSENT_NAME } from 'app/constants';

const getCookieConsentValue = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE_CONSENT_NAME}=`));
  return cookie?.split('=')[1];
};

export const hasCookieConsent = (): boolean => getCookieConsentValue() === 'true';

export const hasCookieConsentPreference = (): boolean =>
  typeof getCookieConsentValue() !== 'undefined';
