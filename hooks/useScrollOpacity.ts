import { useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export const useScrollOpacity = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);

  return opacity;
};
