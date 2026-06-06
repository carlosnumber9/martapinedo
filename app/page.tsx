'use client';

import React, { useEffect, useRef } from 'react';
import { introduceHeader } from 'utils/animations';
import { Header, Headline, HomeScrollCue, Marta, Services, VideoContainer } from '../components';

const PageContent: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => introduceHeader(headerRef), []);

  return (
    <div className="relative w-full overflow-x-hidden">
      <VideoContainer>
        <Headline />
        <Marta />
        <Header ref={headerRef} />
        <HomeScrollCue />
      </VideoContainer>
      <div className="h-screen w-full" />
      <div id="services" className="relative z-10 w-full">
        <Services />
      </div>
    </div>
  );
};

export default PageContent;
