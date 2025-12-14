import { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { bodyFont, mainFont, subtitleFont } from 'utils/fonts';
import { Footer, Navbar } from '../components';
import '../styles/globals.css';
import { Metadata } from 'next';
import StructuredData from 'components/StructuredData';
import { SupportedLocale } from './types';
import { getTranslations } from 'next-intl/server';

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
  <html lang="en" className={`${mainFont.variable} ${subtitleFont.variable} ${bodyFont.variable}`}
  >
    <body className="text-white/90 bg-darkPrimary min-h-screen flex flex-col font-body select-none">
      <NextIntlClientProvider><header>
        <Navbar />
      </header>
        <SpeedInsights />
        <Analytics />
        <StructuredData />
        <main className="py-0 flex flex-col items-center flex-grow">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </body>
  </html>
);

export default RootLayout;
