import Image from 'next/image';
import { About, Services } from '../components';

const Page: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <main
        className={
          'flex flex-col items-center justify-start flex-grow min-h-screen px-0 py-16 top-16'
        }
      >
        <div className={'rounded-full w-max h-max overflow-hidden'}>
          <Image
            src={'/marta.jpeg'}
            alt="Marta Pinedo Sánchez"
            width={300}
            height={300}
          />
        </div>
        <h1 className={'text-3xl mt-5'}>Marta Pinedo Sánchez</h1>
        <h2 className="text-xl">Abogada</h2>

        <Services />
        <About />
      </main>
    </div>
  );
};

export default Page;
