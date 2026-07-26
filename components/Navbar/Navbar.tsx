'use client';

import LanguageSwitcher from 'components/LanguageSwitcher';
import { TransitionLink } from 'components/TransitionLink';
import { useMobileMenu, useScrollPosition } from 'hooks';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { useRef, useState } from 'react';
import { useGsapStateTween } from 'utils/animations';
import { MobileMenu } from './MobileMenu';
import { NavbarButton } from './NavbarButton';

export const Navbar: React.FC = () => {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu, MenuIcon } = useMobileMenu(menuRef);
  const isScrolled = useScrollPosition(50);
  const [isHovered, setIsHovered] = useState(false);

  useGsapStateTween({
    dependencies: [isScrolled],
    ref: logoRef,
    getVars: () => ({
      scale: isScrolled ? 0.9 : 1,
      duration: 0.3,
      ease: 'power2.out',
    }),
  });

  useGsapStateTween({
    dependencies: [isScrolled, isHovered],
    ref: navRef,
    getVars: () => ({
      opacity: isScrolled && !isHovered ? 0.95 : 1,
      duration: 0.3,
      ease: 'power2.inOut',
    }),
  });

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }

    if (pathname !== '/') return;

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    window.history.pushState(null, '', '/');
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`w-full fixed top-0 left-0 flex flex-row items-center gap-9 h-20 z-50 px-6 transition-all duration-300 ${
          isScrolled
            ? 'bg-darkPrimary/85 backdrop-blur-xl shadow-lg'
            : 'bg-darkPrimary shadow-custom'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="main-navigation"
      >
        <TransitionLink href="/" onClick={handleLogoClick}>
          <div ref={logoRef} className="flex h-16 w-14 items-center">
            <Image
              src="/logo.svg"
              alt="Marta Pinedo Sánchez"
              width={56}
              height={61}
              priority
            />
          </div>
        </TransitionLink>
        <NavbarButton text={t('buttons.cases')} route="/cases" />
        <NavbarButton text={t('buttons.contact')} route="/contact" />
        <NavbarButton text={t('buttons.blog')} route="/blog" />
        <NavbarButton text={t('buttons.legal')} route="/legal" align="end" />
        <div className="w-24 hidden sm:block cursor-pointer lg:hover:scale-110 transition-transform duration-700 ease-in-out">
          <LanguageSwitcher />
        </div>
        <div
          className="w-24 sm:hidden ml-auto cursor-pointer"
          onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
        >
          {MenuIcon}
        </div>
      </nav>
      {isMobileMenuOpen && <MobileMenu onClickLink={closeMobileMenu} ref={menuRef} />}
    </>
  );
};
