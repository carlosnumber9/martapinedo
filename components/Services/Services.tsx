'use client';

import { useTranslations } from 'next-intl';
import { VideoContainer } from 'components/VideoContainer';
import { useServices } from 'hooks';
import { Service } from 'app/types';

export const Services = () => {
  const t = useTranslations('services');
  const services = useServices();
  return (
    <VideoContainer>
      <h2 className="text-3xl mt-5 ml-5 self-start font-main">{t('title')}</h2>
      <hr className="ml-5 mr-5 self-stretch border-white/20" />
      <div className=" flex items-center justify-center gap-5 flex-wrap mt-5">
        {services.map(({ id, name, description }: Service) => (
          <div
            key={id}
            className="bg-darkSecondary p-10 flex flex-col justify-center items-center bg-opacity-90 sm:w-3/4 md:w-2/5 lg:w-1/4 gap-5 mx-5"
          >
            <h2 className="text-xl text-center font-subtitle">{name}</h2>
            <p className='font-body text-lg text-center'>{description}</p>
          </div>
        ))}
      </div>
    </VideoContainer>
  )
};
