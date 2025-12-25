import gsap from 'gsap';
import { LottieOptions } from 'lottie-react';
import backToTop from 'public/lotties/back_to_top.json';
import { RefObject } from 'react';
import menuAnimation from '../public/lotties/menu.json';

export const LOTTIE_OPTIONS: Record<string, LottieOptions> = {
  MENU: {
    loop: false,
    animationData: menuAnimation,
  },
  BACK_TO_TOP: {
    loop: true,
    animationData: backToTop,
  },
};

export const introduceHeader = (
  headerRef: RefObject<HTMLDivElement | null>,
  aboutRef: RefObject<HTMLDivElement | null>
) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    headerRef.current,
    {
      x: 200,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
    }
  ).fromTo(
    aboutRef.current,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.8,
    },
    '-=0.3'
  );
};
