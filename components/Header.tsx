'use client';

import { gsap } from 'gsap';
import Link from 'next/link';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'use-intl';

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const t = useTranslations('header');
  const textsRef = useRef<HTMLDivElement>(null);
  const [isTallScreen, setIsTallScreen] = useState(false);
  const [isNarrowPhone, setIsNarrowPhone] = useState(false);
  const [isTabletPortrait, setIsTabletPortrait] = useState(false);
  const [hasMouseHover, setHasMouseHover] = useState(false);

  useEffect(() => {
    const updateLayoutFlags = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsTallScreen(height / width > 1.6);
      setIsNarrowPhone(width <= 380 && height >= 650);
      setIsTabletPortrait(width >= 720 && width <= 820 && height >= 900);
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
      className={`flex flex-col flex-grow flex-wrap lg:absolute lg:right-0 lg:top-0 lg:w-1/2 xl:w-2/3 lg:pl-8 h-screen ${
        isNarrowPhone
          ? 'items-center justify-end pb-16'
          : isTallScreen
            ? 'items-center justify-start pt-16'
            : 'items-center justify-center'
      }`}
      ref={ref}
    >
      <div
        ref={textsRef}
        className="text-4xl sm:text-6xl lg:text-5xl xl:text-6xl mt-28 flex flex-col text-white/90 font-main order-1 md:order-2 p-5 whitespace-normal max-w-full overflow-hidden lg:max-w-[min(45rem,90%)]"
      >
        <span>{t('tagline.line1')}</span>
        <span>{t('tagline.line2')}</span>
        <span>{t('tagline.line3')}</span>
        <Link
          className={`${
            hasMouseHover
              ? 'bg-bluePrimary/50 hover:bg-blueSecondary text-white/90 hover:text-darkPrimary'
              : 'bg-blueSecondary text-darkPrimary'
          } font-semibold py-2 px-4 transition ${
            isTabletPortrait ? 'w-80 h-16 text-xl' : 'w-72 h-14 text-lg'
          } self-center mt-10 sm:mt-12 lg:mt-16 xl:mt-20 flex items-center justify-center ${
            isNarrowPhone ? 'relative' : 'absolute bottom-10'
          } sm:relative sm:bottom-auto`}
          href={'/contact'}
        >
          {t('contactButton')}
        </Link>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
