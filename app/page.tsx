import Head from 'next/head';

const Page: React.FC = () => {
  return (
    <div>
      <Head>
        <title> Marta Pinedo Sánchez </title>
      </Head>
      <main
        className={
          'flex flex-col items-center justify-center flex-grow min-h-screen px-0 py-16'
        }
      ></main>
    </div>
  );
};

export default Page;
