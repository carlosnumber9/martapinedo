import Image from 'next/image';
import { About, Services } from '../components';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: `Marta Pinedo Sánchez`,
  };
}

const Page: React.FC = () => {
  return (
    <>
      <div
        className={
          'flex flex-col items-center justify-start flex-grow px-0 py-16 top-16'
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
        <h1 className={'text-3xl md:text-5xl mt-5'}>Marta Pinedo Sánchez</h1>
      </div>
      <About />
      <Services />
      <div className="py-10 sm:hidden">
        <Link href={'/blog'}>
          <button className="p-10 border-2 border-solid border-blue-50 bg-bluePrimary hover:bg-blueSecondary transition-colors duration-500 hover:text-black">
            Blog
          </button>
        </Link>
      </div>
    </>
  );
};

export default Page;
