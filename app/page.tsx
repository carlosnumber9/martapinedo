'use client';

import React, { useEffect } from 'react';
import { About, Header, Services } from '../components';
import Link from 'next/link';

const Page: React.FC = () => {
  useEffect(() => {
    document.title = 'Marta Pinedo Sánchez';
  }, []);

  return (
    <div className="flex flex-row flex-wrap">
      <Header />
      <About />
      <Services />
      <div className="py-10 sm:hidden">
        <Link href={'/blog'}>
          <button className="p-10 border-2 border-solid border-blue-50 bg-bluePrimary hover:bg-blueSecondary transition-colors duration-500 hover:text-black">
            Blog
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
