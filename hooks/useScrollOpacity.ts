import { useScroll, useTransform } from 'motion/react';
import { RefObject } from 'react';

export const useScrollOpacity = (ref: RefObject<HTMLDivElement | null>) => {
  const { scrollYProgress } = useScroll({ container: ref as any });
  const opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);

  return opacity;
};
