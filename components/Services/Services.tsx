'use client';

import { Service } from 'app/types';
import { useServices } from 'hooks';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { CSSProperties } from 'react';

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
          <div
            className="relative z-10 aspect-square w-56 overflow-hidden rounded-full border-2 border-blueSecondary bg-darkPrimary bg-[url('/marta-services.jpg')] bg-cover bg-center shadow-contact sm:w-72 lg:absolute lg:left-1/2 lg:top-1/2 lg:w-80 lg:-translate-x-1/2 lg:-translate-y-1/2"
            role="img"
            aria-label="Marta Pinedo Sánchez"
          >
            <div className="absolute inset-3 rounded-full border border-blueSecondary/30" >
            <Image
              src="/marta-services.png"
              alt="Marta Pinedo Sánchez"
              fill
              className="object-cover object-center rounded-full"
            />
            </div>
          </div>

          <div className="grid w-full gap-5 sm:grid-cols-2 lg:block">
            {services.map(({ id, name, description }: Service, index) => {
              const position = servicePositions[index];
              const serviceStyle = position
                ? ({
                    '--service-x': position.x,
                    '--service-y': position.y,
                  } as CSSProperties)
                : undefined;

              return (
                <article
                  key={id}
                  style={serviceStyle}
                  className="flex min-h-48 flex-col justify-center gap-4 border-2 border-blueSecondary/25 bg-darkSecondary/95 p-6 text-center transition-colors duration-300 hover:border-blueSecondary/70 hover:bg-darkPrimary/70 sm:last:col-span-2 lg:absolute lg:left-1/2 lg:top-1/2 lg:w-72 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:[--tw-translate-x:calc(-50%_+_var(--service-x))] lg:[--tw-translate-y:calc(-50%_+_var(--service-y))] xl:w-80"
                >
                  <h3 className="font-subtitle text-lg text-white/95 sm:text-xl">{name}</h3>
                  <p className="font-body text-base leading-7 text-white/80 sm:text-lg">
                    {description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
