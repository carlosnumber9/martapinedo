import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const VideoContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover scale-150 md:scale-100"
        src="/services.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="relative z-10 flex flex-col justify-around items-center min-h-screen p-5">
        {children}
      </div>
    </div>
  );
};
