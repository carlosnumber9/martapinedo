'use client';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useCookieConsent } from 'hooks';

export const AnalyticsProvider: React.FC = () => {
  const { hasCookieConsent } = useCookieConsent();

  if (!hasCookieConsent) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
};
