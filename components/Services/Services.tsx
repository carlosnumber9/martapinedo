'use client';

import gsap from 'gsap';
import { useServices } from 'hooks';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Button } from 'components/Button';
import { ServicesImage } from './ServicesImage';
import { ServiceItem } from './ServiceItem';

const servicePositions = [
  { x: '0rem', y: '-17rem' },
  { x: '24rem', y: '-8rem' },
  { x: '18rem', y: '13rem' },
  { x: '-18rem', y: '13rem' },
  { x: '-24rem', y: '-8rem' },
];

export const Services = () => {
  const t = useTranslations('services');
  const services = useServices();
  const servicesImageRef = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const servicesImage = servicesImageRef.current;
    const serviceItems = serviceItemsRef.current.filter(Boolean) as HTMLElement[];

    if (!servicesImage || serviceItems.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(serviceItems, { autoAlpha: 1 });
      return;
    }

    const timeline = gsap.timeline({ paused: true });

    timeline.to(serviceItems, {
      autoAlpha: 1,
      duration: 0.35,
      ease: 'power2.out',
      stagger: 0.14,
    });

    gsap.set(serviceItems, { autoAlpha: 0 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        timeline.play();
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(servicesImage);

    return () => {
      observer.disconnect();
      timeline.kill();
    };
  }, []);

  return (
    <div className="flex flex-row flex-wrap relative w-full min-h-[calc(100vh+5rem)] overflow-hidden bg-darkSecondary">
      <div className="flex w-full flex-col items-center px-6 py-24 text-white sm:px-8 lg:px-10">
        <h2 className="font-main text-4xl uppercase text-white/95 sm:text-5xl">
          {t('title')}
        </h2>

        <div className="relative mt-14 flex w-full max-w-6xl flex-col items-center gap-6 lg:min-h-[44rem]">
          <ServicesImage ref={servicesImageRef} />

          <div className="grid w-full gap-5 sm:grid-cols-2 lg:block">
            {services.map((service, index) => {
              const position = servicePositions[index];
              const serviceStyle = position
                ? ({
                    '--service-x': position.x,
                    '--service-y': position.y,
                  } as CSSProperties)
                : undefined;

              return (
                <ServiceItem
                  key={service.id}
                  ref={(element) => {
                    serviceItemsRef.current[index] = element;
                  }}
                  service={service}
                  style={serviceStyle}
                />
              );
            })}
          </div>
        </div>

        <Button href="/contact" variant="secondary" size="lg" className="mt-12">
          {t('cta')}
        </Button>
      </div>
    </div>
  );
};
