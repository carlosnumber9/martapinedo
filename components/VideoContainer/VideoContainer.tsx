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
      <div className="relative z-10 flex flex-col justify-around items-center min-h-screen pt-5 pb-5 gap-10">
        {children}
      </div>
    </div>
  );
};
