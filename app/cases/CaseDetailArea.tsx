'use client';

import type { MouseEvent, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onBack?: () => void;
}

export const CaseDetailArea: React.FC<Props> = ({ children, onBack }) => {
  const goBackToCases = () => {
    if (onBack) {
      onBack();
      return;
    }

    window.location.assign('/cases');
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;

    goBackToCases();
  };

  return (
    <section className="w-full bg-darkPrimary px-6 py-28" onClick={handleClick}>
      {children}
    </section>
  );
};
