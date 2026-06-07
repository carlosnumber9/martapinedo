import type { Service } from 'app/types';
import { Heading } from 'components/Heading';
import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

interface ServiceItemProps extends ComponentPropsWithoutRef<'article'> {
  service: Service;
  style?: CSSProperties;
}

export const ServiceItem = ({ service, style, ...props }: ServiceItemProps) => (
  <article
    {...props}
    style={style}
    className="flex min-h-48 flex-col justify-center gap-4 border-2 border-blueSecondary/25 bg-darkSecondary/95 p-6 text-center opacity-0 transition-colors duration-300 hover:border-blueSecondary/70 hover:bg-darkPrimary/70 sm:last:col-span-2 lg:absolute lg:left-1/2 lg:top-1/2 lg:w-72 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:[--tw-translate-x:calc(-50%_+_var(--service-x))] lg:[--tw-translate-y:calc(-50%_+_var(--service-y))] xl:w-80"
  >
    <Heading variant="serviceCardTitle">{service.name}</Heading>
    <p className="font-body text-base leading-7 text-white/80 sm:text-lg">{service.description}</p>
  </article>
);
