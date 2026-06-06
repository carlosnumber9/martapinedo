'use client';

import { gsap } from 'gsap';
import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'use-intl';
import { LOTTIE_OPTIONS } from 'utils/animations';

export const HomeScrollCue = () => {
  const t = useTranslations('services');
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cueRef.current) return;

    const ctx = gsap.context(() => {
      const cues = cueRef.current?.querySelectorAll('[data-scroll-cue-animate]') ?? [];
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(cues, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        cues,
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
          delay: 2.5,
        }
      );
    }, cueRef);

    return () => ctx.revert();
  }, []);

  const handleScrollCueClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const services = document.getElementById('services');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    services?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    window.history.pushState(null, '', '#services');
  };

  return (
    <div
      ref={cueRef}
      className="pointer-events-none absolute bottom-[-0.25rem] left-1/2 z-20 flex -translate-x-1/2 items-center gap-20 sm:gap-32 md:gap-48 lg:gap-64"
    >
      {[0, 1].map((cue) => (
        <button
          key={cue}
          type="button"
          aria-label={t('scrollCueLabel')}
          className="pointer-events-auto block cursor-pointer border-0 bg-transparent p-0 opacity-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blueSecondary focus-visible:ring-offset-2 focus-visible:ring-offset-darkPrimary"
          data-scroll-cue-animate
          onClick={handleScrollCueClick}
        >
          <Lottie
            {...LOTTIE_OPTIONS.BACK_TO_TOP}
            aria-hidden
            className="w-20 sm:w-24 md:w-28"
          />
        </button>
      ))}
    </div>
  );
};
