import { mainFont } from 'utils/fonts';
import { BlogButton, Contact, Navbar } from '../components';
import '../styles/globals.css';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  return (
    <html lang="en" className={mainFont.className}>
      <body className="text-white bg-darkPrimary min-h-screen flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow">
          <div className="py-0 flex flex-col justify-center items-center flex-grow">
            {children}
          </div>
          <Link href={'/blog'}>
            <BlogButton />
          </Link>
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
