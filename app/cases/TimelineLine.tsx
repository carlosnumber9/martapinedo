'use client';

import { useRef } from 'react';
import { prefersReducedMotion, useGsapStateTween } from 'utils/animations';

export const Timeline: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useGsapStateTween({
    dependencies: [],
    ref: lineRef,
    getVars: () => ({
      opacity: 0.8,
      duration: prefersReducedMotion() ? 0 : 1.8,
      ease: 'power2.out',
      delay: prefersReducedMotion() ? 0 : 0.2,
    }),
  });

  return (
    <div
      ref={lineRef}
      aria-hidden="true"
      className="absolute bottom-0 left-1/2 top-20 z-0 w-12 -translate-x-1/2 bg-blueSecondary opacity-0 blur-2xl shadow-[0_0_96px_40px_rgba(94,241,241,0.7)]"
    />
  );
};
