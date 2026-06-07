'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useFadeInUp } from 'utils/animations';

export const Marta = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLayoutFlags = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    updateLayoutFlags();
    window.addEventListener('resize', updateLayoutFlags);

    return () => window.removeEventListener('resize', updateLayoutFlags);
  }, []);

  useFadeInUp(imageRef);

  return (
    <div
      className={classNames(
        `opacity-0 absolute top-20 bottom-0`,
        isLandscape ? 'w-1/2 left-0' : 'w-full'
      )}
      ref={imageRef}
    >
      <Image
        className="object-contain object-bottom"
        src="/marta.png"
        alt="Marta Pinedo Sánchez"
        fill
        priority
      />
    </div>
  );
};
