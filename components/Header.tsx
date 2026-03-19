'use client';

import { gsap } from 'gsap';
import Link from 'next/link';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'use-intl';

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const t = useTranslations('header');
  const textsRef = useRef<HTMLDivElement>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [hasMouseHover, setHasMouseHover] = useState(false);

  useEffect(() => {
    const updateLayoutFlags = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
      setHasMouseHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };

    updateLayoutFlags();
    window.addEventListener('resize', updateLayoutFlags);

    return () => window.removeEventListener('resize', updateLayoutFlags);
  }, []);

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
      className={`flex flex-col items-center h-screen w-full ${
        isLandscape ? 'justify-center w-1/2 ml-auto' : 'justify-end pb-12'
      }`}
      ref={ref}
    >
      <div
        ref={textsRef}
        className="text-4xl sm:text-6xl flex flex-col text-white/90 font-main p-5 overflow-hidden gap-0 max-w-2xl"
      >
        <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }} className="opacity-0">
          {t('tagline.line1')}
        </span>
        <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }} className="opacity-0">
          {t('tagline.line2')}
        </span>
        <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }} className="opacity-0">
          {t('tagline.line3')}
        </span>
        <Link
          className={`${
            hasMouseHover
              ? 'bg-bluePrimary/50 hover:bg-blueSecondary text-white/90 hover:text-darkPrimary'
              : 'bg-blueSecondary text-darkPrimary'
          } font-semibold py-2 px-4 transition h-14 text-lg self-center mt-8 flex items-center justify-center whitespace-nowrap border-blueSecondary border-2 opacity-0`}
          href={'/contact'}
        >
          {t('contactButton')}
        </Link>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
