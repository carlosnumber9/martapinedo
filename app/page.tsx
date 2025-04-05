"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { About, Services } from '../components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Page: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.title = "Marta Pinedo Sánchez";
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = -((clientX / window.innerWidth) * 2 - 1) * 15;
      const y = -((clientY / window.innerHeight) * 2 - 1) * -15;
      setRotation({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        className={
          'flex flex-col items-center justify-start flex-grow px-0 py-16'
        }
      >
        <div
          className="w-max h-max overflow-hidden"
          style={{
            perspective: '1000px',
          }}
        >
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: rotation.y,
              rotateY: rotation.x,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <Image
              className="rounded-full"
              src={'/marta.jpeg'}
              alt="Marta Pinedo Sánchez"
              width={300}
              height={300}
            />
          </motion.div>
        </div>
        <h1 className={'text-5xl md:text-4xl mt-5 text-center'}>
          Honestidad · Eficacia · Profesionalidad
        </h1>
      </div>
      <About />
      <Services />
      <div className="py-10 sm:hidden">
        <Link href={'/blog'}>
          <button className="p-10 border-2 border-solid border-blue-50 bg-bluePrimary hover:bg-blueSecondary transition-colors duration-500 hover:text-black">
            Blog
          </button>
        </Link>
      </div>
    </>
  );
};

export default Page;
