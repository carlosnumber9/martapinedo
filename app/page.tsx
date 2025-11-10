import React from 'react';
import { About, Header, Services } from '../components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Marta Pinedo Sánchez',
  },
  description: 'Sitio oficial de Marta Pinedo Sánchez',
};

const Page: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap">
      <Header />
      <About />
      <Services />
    </div>
  );
};

export default Page;
