'use client';

import classNames from 'classnames';
import { useScrollPosition } from 'hooks';
import { useLottie } from 'lottie-react';
import { LOTTIE_OPTIONS } from 'utils/animations';

export const BackToTopButton = () => {
  const { View: BackToTop } = useLottie(LOTTIE_OPTIONS.BACK_TO_TOP);
  const isScrolled = useScrollPosition(300);

  return (
    <div
      className={classNames(
        'fixed bottom-10 right-10 w-24 h-24 cursor-pointer rounded-full md:hover:scale-125 transition-all duration-300',
        {
          'opacity-100 visible': isScrolled,
          'opacity-0 invisible': !isScrolled,
        }
      )}
      style={{
        background: 'radial-gradient(circle, #113240 0%, transparent 60%)',
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className="transform rotate-180">{BackToTop}</div>
    </div>
  );
};
