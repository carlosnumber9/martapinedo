import { PropsWithChildren } from 'react';
import { mainFont } from 'utils/fonts';
import { Footer, Navbar } from '../components';
import '../styles/globals.css';

type Props = PropsWithChildren<{}>;

const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en" className={mainFont.className}>
    <body className="text-white/90 bg-darkPrimary min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="py-0 flex flex-col items-center flex-grow">
        {children}
      </main>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
