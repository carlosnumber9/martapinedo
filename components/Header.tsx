'use client';

import Image from 'next/image';
import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslations } from 'use-intl';

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const t = useTranslations('header');
  const textsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textsRef.current) {
      const spans = textsRef.current.querySelectorAll('span');

      gsap.fromTo(
        spans,
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
      className={
        'flex flex-row items-center flex-grow px-0 flex-wrap justify-center lg:w-1/2 xl:w-2/3'
      }
      ref={ref}
    >
      <div className="overflow-hidden w-[500px] h-[500px] relative shadow-lg mt-auto">
        <Image
          className="object-cover"
          src={'/marta.png'}
          alt="Marta Pinedo Sánchez"
          fill
          sizes="400px"
          priority
        />
      </div>
      <div
        ref={textsRef}
        className={'text-5xl md:text-4xl mt-5 flex flex-col text-white/90 font-main'}
      >
        <span> {t('tagline.line1')} </span>
        <span> {t('tagline.line2')} </span>
        <span> {t('tagline.line3')} </span>
      </div>
    </div>
  );
});