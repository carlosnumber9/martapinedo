import Image from 'next/image';
import type { FC, Ref } from 'react';

interface ServicesImageProps {
  ref?: Ref<HTMLDivElement>;
}

export const ServicesImage: FC<ServicesImageProps> = ({ ref }) => (
  <div
    ref={ref}
    className="relative z-10 aspect-square w-56 overflow-hidden rounded-full border-2 border-blueSecondary bg-darkPrimary bg-[url('/marta-services.jpg')] bg-cover bg-center shadow-contact sm:w-72 lg:absolute lg:left-1/2 lg:top-1/2 lg:w-80 lg:-translate-x-1/2 lg:-translate-y-1/2"
    role="img"
    aria-label="Marta Pinedo Sánchez"
  >
    <div className="absolute inset-3 rounded-full border border-blueSecondary/30">
      <Image
        src="/marta-services.png"
        alt="Marta Pinedo Sánchez"
        fill
        className="rounded-full object-cover object-center"
      />
    </div>
  </div>
);
