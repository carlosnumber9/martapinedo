'use client';

import { useScrollOpacity } from 'hooks';
import { LottieOptions, useLottie } from 'lottie-react';
import animationData from '../public/lotties/blog.json';
import { useRef } from 'react';

const defaultOptions: LottieOptions = {
  animationData: animationData,
  loop: true,
};

export const BlogButton = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useScrollOpacity(ref); // Ya no necesitas el valor de retorno

  const { View: BlogIcon } = useLottie(defaultOptions);

  return (
    <div
      ref={ref}
      className="fixed z-50 bottom-0 left-0 w-36 h-36 flex justify-center items-center cursor-pointer sm:hidden"
      style={{ opacity: 0 }} // Opacidad inicial
    >
      {BlogIcon}
    </div>
  );
};