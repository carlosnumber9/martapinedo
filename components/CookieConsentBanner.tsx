'use client';

import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_NAME } from 'app/constants';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CookieConsent from 'react-cookie-consent';

export const CookieConsentBanner: React.FC = () => {
  const t = useTranslations('cookieConsent');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const handleDismiss = (): void => {
    setIsVisible(false);
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    setTimeout(() => setIsDismissed(true), 300);
  };

  if (isDismissed) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText={t('accept')}
      declineButtonText={t('decline')}
      enableDeclineButton
      disableStyles
      cookieName={COOKIE_CONSENT_NAME}
      containerClasses={`fixed border-2 border-blueSecondary bottom-3 left-3 right-3 flex items-center justify-between gap-4 bg-darkSecondary px-6 py-4 z-50 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      contentClasses="flex-1 text-white/90"
      buttonClasses="bg-blueSecondary text-darkPrimary font-semibold px-5 py-2 cursor-pointer mx-2"
      declineButtonClasses="bg-transparent border border-white/30 text-white/80 px-5 py-2 cursor-pointer mx-2"
      onAccept={handleDismiss}
      onDecline={handleDismiss}
      hideOnAccept={false}
      hideOnDecline={false}
    >
      {t('message')}{' '}
      <a href="/legal" className="underline text-blueSecondary">
        {t('learnMore')}
      </a>
    </CookieConsent>
  );
};
