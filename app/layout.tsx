import { AnalyticsProvider, CookieConsentBanner, Footer, Navbar } from 'components';
import StructuredData from 'components/StructuredData';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { PropsWithChildren } from 'react';
import { bodyFont, mainFont, subtitleFont } from 'utils/fonts';
import { SupportedLocale } from './types';
import '../styles/globals.css';

export async function generateMetadata({
  params,
}: {
  params: { locale?: SupportedLocale };
}): Promise<Metadata> {
  const t = await getTranslations('layout');

  return {
    title: {
      absolute: t('siteTitle'),
    },
    description: t('siteDescription'),
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
        <main className="py-0 flex flex-col items-center flex-grow">{children}</main>
        <Footer />
        <CookieConsentBanner />
      </NextIntlClientProvider>
    </body>
  </html>
);

export default RootLayout;
