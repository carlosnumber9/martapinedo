import { AnalyticsProvider, CookieConsentBanner, Footer, Navbar } from 'components';
import StructuredData from 'components/StructuredData';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { PropsWithChildren } from 'react';
import { bodyFont, mainFont, subtitleFont } from 'utils/fonts';
import { buildPageMetadata, SITE_NAME, SITE_URL } from 'utils/seo';
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
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
  };
}

type Props = PropsWithChildren<{}>;

const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en" className={`${mainFont.variable} ${subtitleFont.variable} ${bodyFont.variable}`}>
    <body className="text-white/90 bg-darkPrimary min-h-screen flex flex-col font-body select-none">
      <NextIntlClientProvider>
        <header>
          <Navbar />
        </header>
        <AnalyticsProvider />
        <StructuredData />
        <main className="py-0 flex flex-col items-center flex-1 w-full">{children}</main>
        <Footer />
        <CookieConsentBanner />
      </NextIntlClientProvider>
    </body>
  </html>
);

export default RootLayout;
