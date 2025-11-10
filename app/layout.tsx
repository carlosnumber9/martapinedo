import { mainFont } from 'utils/fonts';
import { BlogButton, ContactButton, Footer, Navbar } from '../components';
import '../styles/globals.css';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  params: Promise<{ blog?: string | string[] }>;
}>;

const RootLayout: React.FC<Props> = async ({ children, params }) => {
  const resolvedParams = await params;
  const isBlogPage = resolvedParams?.blog === 'blog';

  return (
    <html lang="en" className={mainFont.className}>
      <body className="text-white/90 bg-darkPrimary min-h-screen flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="py-0 flex flex-col items-center flex-grow">
          {children}
          {!isBlogPage && (
            <Link href={'/blog'}>
              <BlogButton />
            </Link>
          )}
          <ContactButton />
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
