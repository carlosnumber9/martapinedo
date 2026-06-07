'use client';

import Lottie from 'lottie-react';
import { useRef } from 'react';
import { useTranslations } from 'use-intl';
import { LOTTIE_OPTIONS, prefersReducedMotion, useFadeInUpChildren } from 'utils/animations';

export const HomeScrollCue = () => {
  const t = useTranslations('services');
  const cueRef = useRef<HTMLDivElement>(null);

  useFadeInUpChildren(cueRef, '[data-scroll-cue-animate]', { delay: 2.5 });

  const handleScrollCueClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const services = document.getElementById('services');
    services?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
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
          <Lottie {...LOTTIE_OPTIONS.BACK_TO_TOP} aria-hidden className="w-20 sm:w-24 md:w-28" />
        </button>
      ))}
    </div>
  );
};
