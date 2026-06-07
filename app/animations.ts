'use client';

import gsap from 'gsap';
import { RefObject } from 'react';
import { prefersReducedMotion } from 'utils/animations';

export const introduceHeader = (headerRef: RefObject<HTMLDivElement | null>) => {
  if (!headerRef.current) return;

  const duration = prefersReducedMotion() ? 0 : 1.2;

  return gsap.fromTo(
    headerRef.current,
    {
      x: prefersReducedMotion() ? 0 : 200,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration,
      ease: 'power3.out',
    }
  );
};
