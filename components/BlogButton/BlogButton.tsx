'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useScrollOpacity } from 'hooks';

export const BlogButton = () => {
  const opacity = useScrollOpacity();

  return (
    <motion.div
      className={
        'fixed z-50 bottom-5 left-5 w-20 h-20 flex justify-center items-center rounded-full shadow-contact bg-darkPrimary hover:bg-darkSecondary transition-colors duration-500 ease-in-out cursor-pointer'
      }
      style={{ opacity }}
    >
      <Image
        src={'/blog.png'}
        alt={'Blog button icon'}
        width={50}
        height={50}
      />
    </motion.div>
  );
};
