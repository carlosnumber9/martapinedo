'use client';

import React, { useEffect } from 'react';
import { About, Header, Services } from '../components';

const Page: React.FC = () => {
  useEffect(() => {
    document.title = 'Marta Pinedo Sánchez';
  }, []);

  return (
    <div className="flex flex-row flex-wrap">
      <Header />
      <About />
      <Services />
    </div>
  );
};

export default Page;
