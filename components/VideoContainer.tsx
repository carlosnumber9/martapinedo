import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const VideoContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="fixed w-full min-h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover scale-150 md:scale-100 blur-sm"
        src="/night.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="justify-center items-end flex flex-row flex-wrap h-screen">{children}</div>
    </div>
  );
};
