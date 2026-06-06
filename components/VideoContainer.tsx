import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const VideoContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover scale-150 blur-sm md:scale-100"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/night-poster.jpg"
      >
        <source src="/night-hero.webm" type="video/webm" />
        <source src="/night-hero.mp4" type="video/mp4" />
      </video>
      <div className="relative h-screen w-full flex flex-row flex-wrap items-end justify-center">
        {children}
      </div>
    </div>
  );
};
