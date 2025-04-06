'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { About, Services } from '../components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';

const Page: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.title = 'Marta Pinedo Sánchez';
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return;

      const { clientX, clientY } = event;
      const x = -((clientX / window.innerWidth) * 2 - 1) * 15;
      const y = -((clientY / window.innerHeight) * 2 - 1) * -15;
      setRotation({ x, y });
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isMobile) return;

      const beta = event.beta;
      const gamma = event.gamma;

      if (beta !== null && gamma !== null) {
        const x = Math.min(Math.max(gamma, -15), 15);
        const y = Math.min(Math.max(beta - 45, -15), 15);

        setRotation({ x, y: -y });
      }
    };

    let touchHandler: (() => void) | null = null;

    if (isMobile) {
      touchHandler = () => {
        document.removeEventListener('touchstart', touchHandler!);
      };
      document.addEventListener('touchstart', touchHandler);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (touchHandler) {
        document.removeEventListener('touchstart', touchHandler);
      }
    };
  }, []);

  return (
    <>
      <div
        className={
          'flex flex-row items-center flex-grow px-0 py-16 flex-wrap justify-center'
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
              rotateX: rotation.y,
              rotateY: rotation.x,
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
