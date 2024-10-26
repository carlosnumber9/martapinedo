import Head from "next/head";
import Link from "next/link";

const Page: React.FC = () => {
  return (
    <div>
      <Head>
        <title> Marta Pinedo Sánchez </title>
      </Head>
      <main
        className={
          "flex flex-col items-center justify-center flex-grow min-h-screen px-0 py-16 text-white"
        }
      >
        <Link href="/blog" rel="noopener noreferrer">
          <h2>The blog &rarr;</h2>
        </Link>

        <Link href="/contact" rel="noopener noreferrer">
          <h2>Contact &rarr;</h2>
        </Link>
      </main>
    </div>
  );
};

export default Page;
