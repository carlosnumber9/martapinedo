import { mainFont } from 'utils/fonts';
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
    <html lang="en" className={mainFont.className}>
      <body className={'text-white bg-darkPrimary min-h-screen flex flex-col'}>
        <header>
          <Navbar />
        </header>
        <main>
          <div
            className={
              'py-0 flex flex-col justify-center items-center flex-grow'
            }
          >
            {children}
          </div>
          <Contact />
        </main>
        <footer
          className={
            'flex items-center justify-center flex-grow py-4 text-center'
          }
        >
          © Marta Pinedo Sánchez. All right reserved.
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
