import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const VideoContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover scale-150 blur-sm md:scale-100"
        src="/night.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="relative h-screen w-full flex flex-row flex-wrap items-end justify-center">
        {children}
      </div>
    </div>
  );
};
