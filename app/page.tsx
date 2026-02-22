'use client';

import React, { useEffect, useRef } from 'react';
import { introduceHeader } from 'utils/animations';
import { Header, Services, VideoContainer } from '../components';

const PageContent: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => introduceHeader(headerRef), []);

  return (
    <div className="flex flex-row flex-wrap overflow-y-scroll">
      <VideoContainer>
        <Header ref={headerRef} />
      </VideoContainer>
      <div className="h-screen w-full" />
      <Services />
    </div>
  );
};

export default PageContent;
