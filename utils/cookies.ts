import { COOKIE_CONSENT_NAME } from 'app/constants';

export const hasCookieConsent = (): boolean => {
  if (typeof document === 'undefined') return false;
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE_CONSENT_NAME}=`));
  return cookie?.split('=')[1] === 'true';
};
