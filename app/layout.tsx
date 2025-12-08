import { PropsWithChildren } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { mainFont } from 'utils/fonts';
import { Footer, Navbar } from '../components';
import '../styles/globals.css';
import { Metadata } from 'next';
import StructuredData from 'components/StructuredData';

export const metadata: Metadata = {
  title: {
    absolute: 'Marta Pinedo Sánchez | Abogada',
  },
  description:
    'Soluciones jurídicas con cercanía, claridad y compromiso.',
};

type Props = PropsWithChildren<{}>;

const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en" className={mainFont.className}>
    <body className="text-white/90 bg-darkPrimary min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <SpeedInsights />
      <StructuredData />
      <main className="py-0 flex flex-col items-center flex-grow">
        {children}
      </main>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
