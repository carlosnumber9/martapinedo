'use client';

import classNames from 'classnames';
import { Button } from 'components/Button';
import { CSSProperties, forwardRef, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'use-intl';
import { useFadeInUpChildren } from 'utils/animations';

const getSplitHeroPositions = (height: number): { claimTop: number; ctaTop: number } => ({
  claimTop: Math.max(140, Math.round(height * 0.16)),
  ctaTop: Math.round(height * 0.64),
});

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const t = useTranslations('header');
  const textsRef = useRef<HTMLDivElement>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [useSplitMobileHeroLayout, setUseSplitMobileHeroLayout] = useState(false);
  const [splitHeroPositions, setSplitHeroPositions] = useState(getSplitHeroPositions(0));
  const [hasMouseHover, setHasMouseHover] = useState(false);

  useEffect(() => {
    const updateLayoutFlags = () => {
      const isLandscapeLayout = window.innerWidth > window.innerHeight;
      const useSplitLayout =
        !isLandscapeLayout &&
        window.innerWidth >= 400 &&
        window.innerWidth < 480 &&
        window.innerHeight >= 760;

      setIsLandscape(isLandscapeLayout);
      setUseSplitMobileHeroLayout(useSplitLayout);
      setSplitHeroPositions(getSplitHeroPositions(window.innerHeight));
      setHasMouseHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };

    updateLayoutFlags();
    window.addEventListener('resize', updateLayoutFlags);

    return () => window.removeEventListener('resize', updateLayoutFlags);
  }, []);

  useFadeInUpChildren(textsRef, '[data-header-animate]', { delay: 0.5 });

  const splitClaimStyle: CSSProperties | undefined = useSplitMobileHeroLayout
    ? { top: splitHeroPositions.claimTop }
    : undefined;
  const splitCtaStyle: CSSProperties | undefined = useSplitMobileHeroLayout
    ? { top: splitHeroPositions.ctaTop }
    : undefined;

  return (
    <div
      className={classNames(
        'h-screen',
        isLandscape ? 'ml-auto flex w-1/2 flex-col items-center justify-center' : 'w-full',
        !isLandscape &&
          (useSplitMobileHeroLayout ? 'relative' : 'flex flex-col items-center justify-end pb-12')
      )}
      ref={ref}
    >
      <div
        ref={textsRef}
        className={classNames(
          'text-4xl font-main text-white/90 sm:text-6xl',
          useSplitMobileHeroLayout
            ? 'absolute inset-0 h-full w-full overflow-visible'
            : 'flex max-w-2xl flex-col gap-0 overflow-hidden p-5'
        )}
      >
        <div
          className={classNames(
            'flex flex-col gap-0',
            useSplitMobileHeroLayout &&
              'absolute left-1/2 w-full max-w-[340px] -translate-x-1/2 px-8 leading-[0.95]'
          )}
          style={splitClaimStyle}
        >
          <span
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
            className="opacity-0"
            data-header-animate
          >
            {t('tagline.line1')}
          </span>
          <span
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
            className="opacity-0"
            data-header-animate
          >
            {t('tagline.line2')}
          </span>
          <span
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
            className="opacity-0"
            data-header-animate
          >
            {t('tagline.line3')}
          </span>
        </div>
        <div
          className={classNames(
            useSplitMobileHeroLayout
              ? 'absolute left-0 right-0 flex justify-center'
              : 'mt-8 self-center'
          )}
          style={splitCtaStyle}
        >
          <Button
            className={classNames(
              hasMouseHover
                ? 'bg-blueSecondary !text-darkPrimary sm:bg-bluePrimary/50 sm:!text-white/90 sm:hover:bg-blueSecondary sm:hover:!text-darkPrimary'
                : 'bg-blueSecondary !text-darkPrimary',
              'whitespace-nowrap opacity-0'
            )}
            href={'/contact'}
            variant="secondary"
            size="lg"
            data-header-animate
          >
            {t('contactButton')}
          </Button>
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
