'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CookieConsent from 'react-cookie-consent';

export const CookieConsentBanner = () => {
  const t = useTranslations('cookieConsent');
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText={t('accept')}
      declineButtonText={t('decline')}
      enableDeclineButton
      disableStyles
      cookieName="martapinedo_cookie_consent"
      containerClasses={`fixed border-2 border-blueSecondary bottom-3 left-3 right-3 flex items-center justify-between gap-4 bg-darkSecondary px-6 py-4 z-50 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
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
