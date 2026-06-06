'use client';

import Lottie from 'lottie-react';
import arrowBackToTop from 'public/lotties/arrow_back_to_top.json';
import type { MouseEvent } from 'react';

interface Props {
  label: string;
  onBack?: () => void;
}

export const CaseBackButton: React.FC<Props> = ({ label, onBack }) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onBack) return;

    event.preventDefault();
    onBack();
  };

  return (
    <a
      href="/cases"
      aria-label={label}
      className="absolute left-4 top-4 flex h-16 w-16 items-center justify-center text-blueSecondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueSecondary"
      onClick={handleClick}
    >
      <Lottie
        animationData={arrowBackToTop}
        loop
        className="h-16 w-16 -rotate-90"
        aria-hidden="true"
      />
    </a>
  );
};
