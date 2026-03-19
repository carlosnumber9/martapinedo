'use client';

import { Service } from 'app/types';
import { useServices } from 'hooks';
import { useTranslations } from 'next-intl';

export const Services = () => {
  const t = useTranslations('services');
  const services = useServices();
  return (
    <div className="flex flex-row flex-wrap relative w-full min-h-[calc(100vh+5rem)] overflow-hidden bg-darkSecondary">
      <div className=" flex items-center justify-center gap-5 flex-wrap">
        {services.map(({ id, name, description }: Service) => (
          <div
            key={id}
            className="bg-darkSecondary border-2 border-blueSecondary/20 p-10 flex flex-col justify-center items-center bg-opacity-90 sm:w-3/4 md:w-2/5 lg:w-1/4 gap-5"
          >
            <h2 className="text-xl text-center font-subtitle">{name}</h2>
            <p className="font-body text-lg text-center">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
