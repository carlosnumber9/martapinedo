'use client';

import React, { useEffect, useRef } from 'react';
import { About, Header, Services } from '../components';
import { introduceHeader } from 'utils/animations';

const PageContent: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => introduceHeader(headerRef, aboutRef), []);

  return (
    <div className="flex flex-row flex-wrap">
      <Header ref={headerRef} />
      <About ref={aboutRef} />
      <Services />
    </div>
  );
};

export default PageContent;