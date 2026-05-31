'use client';

import { useServices } from 'hooks';
import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';
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
  return (
    <div className="flex flex-row flex-wrap relative w-full min-h-[calc(100vh+5rem)] overflow-hidden bg-darkSecondary">
      <div className="flex w-full flex-col items-center px-6 py-24 text-white sm:px-8 lg:px-10">
        <h2 className="font-main text-4xl uppercase text-white/95 sm:text-5xl">
          {t('title')}
        </h2>

        <div className="relative mt-14 flex w-full max-w-6xl flex-col items-center gap-6 lg:min-h-[44rem]">
          <ServicesImage />

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
                <ServiceItem key={service.id} service={service} style={serviceStyle} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
