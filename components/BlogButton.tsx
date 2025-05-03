'use client';

import { motion } from 'motion/react';
import { useScrollOpacity } from 'hooks';
import { LottieOptions, useLottie } from 'lottie-react';
import animationData from '../public/lotties/blog.json';

const defaultOptions: LottieOptions = {
  animationData: animationData,
  loop: true,
};

export const BlogButton = () => {
  const opacity = useScrollOpacity();

  const { View: BlogIcon } = useLottie(defaultOptions);

  return (
    <motion.div
      className={
        'fixed z-50 bottom-0 left-0 w-36 h-36 flex justify-center items-center cursor-pointer sm:hidden'
      }
      style={{ opacity }}
    >
      {BlogIcon}
    </motion.div>
  );
};
