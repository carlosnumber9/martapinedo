import {
  AnalyticsProvider,
  CookieConsentBanner,
  Footer,
  Navbar,
  RouteTransitionProvider,
} from 'components';
import StructuredData from 'components/StructuredData';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { PropsWithChildren } from 'react';
import { bodyFont, mainFont, subtitleFont } from 'utils/fonts';
import { buildPageMetadata, SITE_NAME, SITE_URL } from 'utils/seo';
import { SupportedLocale } from './types';
import '../styles/globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('layout');

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    publisher: SITE_NAME,
    ...buildPageMetadata({
      title: t('siteTitle'),
      description: t('siteDescription'),
      path: '/',
    }),
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        {
          url: '/favicon.svg',
          type: 'image/svg+xml',
        },
        {
          url: '/favicon.ico',
          sizes: '16x16 32x32 48x48 64x64',
          type: 'image/x-icon',
        },
      ],
      shortcut: '/favicon.ico',
      apple: [
        {
          url: '/apple-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
  };
}

type Props = PropsWithChildren<{}>;

const RootLayout = async ({ children }: Props) => {
  const locale = (await getLocale()) as SupportedLocale;

  return (
    <html lang={locale} className={`${mainFont.variable} ${subtitleFont.variable} ${bodyFont.variable}`}>
      <body className="text-white/90 bg-darkPrimary min-h-screen flex flex-col font-body select-none">
        <NextIntlClientProvider>
          <RouteTransitionProvider>
            <header>
              <Navbar />
            </header>
            <AnalyticsProvider />
            <StructuredData />
            <main
              className="py-0 flex flex-col items-center flex-1 w-full"
              data-route-transition-content
            >
              {children}
            </main>
            <Footer />
            <CookieConsentBanner />
          </RouteTransitionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
