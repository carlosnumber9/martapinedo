'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

export const Timeline: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.to(lineRef.current, {
        opacity: 0.8,
        duration: prefersReducedMotion ? 0 : 1.8,
        ease: 'power2.out',
        delay: prefersReducedMotion ? 0 : 0.2,
      });
    },
    { scope: lineRef }
  );

  return (
    <div
      ref={lineRef}
      aria-hidden="true"
      className="absolute left-1/2 top-20 h-[calc(100vh-5rem)] w-12 -translate-x-1/2 bg-blueSecondary opacity-0 blur-2xl shadow-[0_0_96px_40px_rgba(94,241,241,0.7)]"
    />
  );
};
