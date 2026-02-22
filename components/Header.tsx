'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useEffect, useRef } from 'react';
import { useTranslations } from 'use-intl';

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const t = useTranslations('header');
  const textsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textsRef.current) {
      const textsAndButton = textsRef.current.querySelectorAll('*');

      gsap.fromTo(
        textsAndButton,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          delay: 0.5,
        }
      );
    }
  }, []);

  return (
    <div
      className="flex flex-row items-center flex-grow flex-wrap justify-center lg:w-1/2 xl:w-2/3 h-screen"
      ref={ref}
    >
      <div className="order-2 sm:order-1 relative self-end w-[clamp(400px,40vw,550px)] h-[clamp(500px,70vh,700px)] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:h-6 after:bg-white/40 after:blur-xl after:-z-10">
        {' '}
        <Image
          className="object-contain"
          src="/marta.png"
          alt="Marta Pinedo Sánchez"
          fill
          priority
        />
      </div>
      <div
        ref={textsRef}
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-20 flex flex-col text-white/90 font-main order-1 sm:order-2"
      >
        <span>{t('tagline.line1')}</span>
        <span>{t('tagline.line2')}</span>
        <span>{t('tagline.line3')}</span>
        <Link
          className="bg-blueSecondary sm:bg-bluePrimary/50 hover:bg-blueSecondary text-darkPrimary sm:text-white/90 hover:text-darkPrimary 
                        font-semibold py-2 px-4 transition w-72 h-14 text-lg self-center xl:mt-20 flex items-center 
                        justify-center absolute bottom-10 sm:relative sm:bottom-auto"
          href={'/contact'}
        >
          {t('contactButton')}
        </Link>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
