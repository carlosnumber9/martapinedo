'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { useMobileMenu, useScrollPosition } from 'hooks';
import { NavbarButton } from './NavbarButton';
import { MobileMenu } from './MobileMenu';
import LanguageSwitcher from 'components/LanguageSwitcher';

export const Navbar: React.FC = () => {
  const t = useTranslations('navbar');
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu, MenuIcon } = useMobileMenu(menuRef);
  const isScrolled = useScrollPosition(50);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    if (!logoRef.current) return;

    gsap.to(logoRef.current, {
      scale: isScrolled ? 0.9 : 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isScrolled]);

  useGSAP(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      opacity: isScrolled && !isHovered ? 0.95 : 1,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  }, [isScrolled, isHovered]);

  return (
    <>
      <nav
        ref={navRef}
        className={`w-full fixed top-0 left-0 flex flex-row items-center gap-9 h-20 z-50 px-6 transition-all duration-300 ${isScrolled
          ? 'bg-darkPrimary/85 backdrop-blur-xl shadow-lg'
          : 'bg-darkPrimary shadow-custom'
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="main-navigation"
      >
        <Link href="/">
          <div ref={logoRef}>
            <Image src="/logo.svg" alt="Logo" width={150} height={45} priority />
          </div>
        </Link>
        <NavbarButton text={t('buttons.blog')} route="/blog" />
        <NavbarButton text={t('buttons.contact')} route="/contact" />
        <div
          className="w-24 hidden sm:block ml-auto cursor-pointer lg:hover:scale-110 transition-transform duration-700 ease-in-out"
        >
          <LanguageSwitcher />
        </div>
        <div
          className="w-24 sm:hidden ml-auto cursor-pointer"
          onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
        >
          {MenuIcon}
        </div>
      </nav>
      <div className="h-20" />
      {isMobileMenuOpen && <MobileMenu onClickLink={closeMobileMenu} ref={menuRef} />}
    </>
  );
};