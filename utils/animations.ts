'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { LottieOptions } from 'lottie-react';
import backToTop from 'public/lotties/back_to_top.json';
import { RefObject, useEffect, useRef } from 'react';
import menuAnimation from '../public/lotties/menu.json';

gsap.registerPlugin(useGSAP);

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

type GsapTarget = gsap.TweenTarget;

type FadeInUpOptions = {
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  y?: number;
};

type StateTweenOptions<T extends Element> = {
  dependencies: unknown[];
  getVars: () => gsap.TweenVars;
  ref: RefObject<T | null>;
};

type RevealOnIntersectionOptions = FadeInUpOptions & {
  rootRef: RefObject<HTMLElement | null>;
  selector: string;
  threshold?: number;
  triggerRef: RefObject<Element | null>;
};

const DEFAULT_FADE_IN_UP: Required<FadeInUpOptions> = {
  delay: 0,
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0.2,
  y: 20,
};

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const setVisible = (target: GsapTarget) => {
  gsap.set(target, { opacity: 1, y: 0 });
};

export const fadeInUp = (target: GsapTarget, options: FadeInUpOptions = {}) => {
  const animationOptions = { ...DEFAULT_FADE_IN_UP, ...options };

  if (prefersReducedMotion()) {
    setVisible(target);
    return undefined;
  }

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: animationOptions.y,
    },
    {
      opacity: 1,
      y: 0,
      duration: animationOptions.duration,
      stagger: animationOptions.stagger,
      ease: animationOptions.ease,
      delay: animationOptions.delay,
    }
  );
};

export const useFadeInUp = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: FadeInUpOptions = {}
) => {
  useGSAP(
    () => {
      if (!ref.current) return;

      fadeInUp(ref.current, options);
    },
    { scope: ref }
  );
};

export const useFadeInUpChildren = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  selector: string,
  options: FadeInUpOptions = {}
) => {
  useGSAP(
    () => {
      if (!ref.current) return;

      const targets = ref.current.querySelectorAll(selector);
      fadeInUp(targets, options);
    },
    { scope: ref }
  );
};

export const useGsapStateTween = <T extends Element>({
  dependencies,
  getVars,
  ref,
}: StateTweenOptions<T>) => {
  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.to(ref.current, getVars());
    },
    { dependencies, scope: ref }
  );
};

export const useRevealOnIntersection = ({
  rootRef,
  selector,
  threshold = 0.25,
  triggerRef,
  ...animationOptions
}: RevealOnIntersectionOptions) => {
  useEffect(() => {
    const root = rootRef.current;
    const trigger = triggerRef.current;
    const targets = Array.from(root?.querySelectorAll<HTMLElement>(selector) ?? []);

    if (!root || !trigger || targets.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { autoAlpha: 1 });
      return;
    }

    const timeline = gsap.timeline({ paused: true });

    timeline.to(targets, {
      autoAlpha: 1,
      duration: animationOptions.duration ?? 0.35,
      ease: animationOptions.ease ?? 'power2.out',
      stagger: animationOptions.stagger ?? 0.14,
    });

    gsap.set(targets, { autoAlpha: 0 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        timeline.play();
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      timeline.kill();
    };
  }, [
    animationOptions.duration,
    animationOptions.ease,
    animationOptions.stagger,
    rootRef,
    selector,
    threshold,
    triggerRef,
  ]);
};

export const useFadeToggleTimeline = (ref: RefObject<HTMLElement | null>, duration = 0.3) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      timelineRef.current = gsap
        .timeline({ paused: true })
        .fromTo(
          ref.current,
          { opacity: 0, visibility: 'hidden' },
          { opacity: 1, visibility: 'visible', duration }
        );
    },
    { scope: ref }
  );

  return timelineRef;
};

export const createMobileMenuTimeline = (menu: HTMLDivElement, onReverseComplete: () => void) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onReverseComplete });

  return tl.fromTo(
    menu,
    { transform: 'translateX(-100%)' },
    {
      transform: 'translateX(0)',
      duration: 0.2,
      ease: 'power3.out',
    }
  );
};

export const useMobileMenuTimeline = (
  isOpen: boolean,
  menuRef: RefObject<HTMLDivElement | null>,
  onReverseComplete: () => void
) => {
  const timelineRef = useRef<ReturnType<typeof createMobileMenuTimeline> | null>(null);

  useGSAP(
    () => {
      if (!isOpen || !menuRef.current) return;

      timelineRef.current = createMobileMenuTimeline(menuRef.current, onReverseComplete);
    },
    {
      dependencies: [isOpen, onReverseComplete],
      scope: menuRef,
    }
  );

  return timelineRef;
};
