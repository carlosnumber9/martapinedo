import { Contact, Navbar } from '../components';
import '../styles/globals.css';

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body className={'text-white bg-primary'}>
        <header>
          <Navbar />
        </header>
        <main>
          <div
            className={'py-0 px-8 flex flex-col justify-center items-center'}
          >
            {children}
          </div>
          <Contact />
        </main>
        <footer
          className={'relative flex items-center justify-center flex-grow'}
        >
          © Marta Pinedo Sánchez. All right reserved.
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
