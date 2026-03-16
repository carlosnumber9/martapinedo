'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export const Marta = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateLayoutFlags = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    updateLayoutFlags();
    window.addEventListener('resize', updateLayoutFlags);

    return () => window.removeEventListener('resize', updateLayoutFlags);
  }, []);

  return (
    <div className={`absolute top-20 bottom-0 ${isLandscape ? 'w-1/2 left-0' : 'w-full'}`}>
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
