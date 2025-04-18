import { mainFont } from 'utils/fonts';
import { BlogButton, Contact, Navbar } from '../components';
import '../styles/globals.css';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  params: { blog?: string };
}

const RootLayout: React.FC<Props> = ({ children, params }: Props) => {
  const isBlogPage = params?.blog === 'blog';

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
          <Contact />
        </main>
        <footer className="flex items-center justify-center py-4 text-center text-gray-400 text-xs">
          © Marta Pinedo Sánchez. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
