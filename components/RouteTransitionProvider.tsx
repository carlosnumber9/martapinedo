'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { prefersReducedMotion } from 'utils/animations';

type NavigateOptions = {
  scroll?: boolean;
};

type RouteTransitionContextValue = {
  isTransitioning: boolean;
  navigate: (href: string, options?: NavigateOptions) => Promise<void>;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

const CONTENT_SELECTOR = '[data-route-transition-content]';
const FADE_IN_DURATION = 0.24;
const FADE_OUT_DURATION = 0.16;

const getRouteContent = () => document.querySelector<HTMLElement>(CONTENT_SELECTOR);

export const RouteTransitionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingHrefRef = useRef<string | null>(null);
  const routeKey = `${pathname}?${searchParams}`;

  const fadeIn = useCallback(() => {
    const content = getRouteContent();

    if (!content) {
      setIsTransitioning(false);
      return;
    }

    if (prefersReducedMotion()) {
      gsap.set(content, { autoAlpha: 1, y: 0 });
      setIsTransitioning(false);
      return;
    }

    gsap.fromTo(
      content,
      { autoAlpha: 0, y: 8 },
      {
        autoAlpha: 1,
        duration: FADE_IN_DURATION,
        ease: 'power2.out',
        y: 0,
        onComplete: () => setIsTransitioning(false),
      }
    );
  }, []);

  const fadeOut = useCallback(async () => {
    const content = getRouteContent();

    if (!content || prefersReducedMotion()) return;

    await gsap.to(content, {
      autoAlpha: 0,
      duration: FADE_OUT_DURATION,
      ease: 'power2.inOut',
      y: -8,
    });
  }, []);

  const navigate = useCallback(
    async (href: string, options?: NavigateOptions) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      pendingHrefRef.current = href;

      await fadeOut();
      router.push(href, { scroll: options?.scroll ?? true });
    },
    [fadeOut, isTransitioning, router]
  );

  useGSAP(() => {
    const content = getRouteContent();

    if (!content) return;

    gsap.set(content, { autoAlpha: 1, y: 0 });
  }, []);

  useEffect(() => {
    if (!routeKey || !pendingHrefRef.current) return;

    pendingHrefRef.current = null;
    requestAnimationFrame(fadeIn);
  }, [fadeIn, routeKey]);

  const value = useMemo(
    () => ({
      isTransitioning,
      navigate,
    }),
    [isTransitioning, navigate]
  );

  return (
    <RouteTransitionContext.Provider value={value}>{children}</RouteTransitionContext.Provider>
  );
};

export const useRouteTransition = () => {
  const context = useContext(RouteTransitionContext);

  if (!context) {
    throw new Error('useRouteTransition must be used within RouteTransitionProvider');
  }

  return context;
};
