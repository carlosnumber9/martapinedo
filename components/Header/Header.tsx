'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRotator } from './useRotator';

export const Header = () => {
  const { rotateX, rotateY } = useRotator();

  return (
    <div
      className={
        'flex flex-row items-center flex-grow px-0 py-16 flex-wrap justify-center lg:w-1/2 xl:w-2/3'
      }
    >
      <div
        className="w-max h-max p-8"
        style={{
          perspective: '1000px',
        }}
      >
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateX,
            rotateY,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="rounded-full overflow-hidden w-[300px] h-[300px] relative border-4 border-white shadow-lg">
            <Image
              className="object-cover"
              src={'/marta.jpeg'}
              alt="Marta Pinedo Sánchez"
              fill
              sizes="300px"
              priority
            />
          </div>
        </motion.div>
      </div>
      <div className={'text-5xl md:text-4xl mt-5 flex flex-col'}>
        <span> Honestidad </span>
        <span> Eficacia </span>
        <span> Profesionalidad </span>
      </div>
    </div>
  );
};
