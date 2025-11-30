'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMobileMenu } from 'hooks';
import { NavbarButton } from './NavbarButton';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const menuRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu, MenuIcon } = useMobileMenu(menuRef);

  return (<>
    <nav
      className={
        'w-screen relative flex flex-row items-center gap-9 h-15 h-20 shadow-custom z-50 bg-darkPrimary'
      }
      aria-label="main-navigation"
    >
      <Link href={'/'}>
        <Image src="/logo.svg" alt="Logo" width={150} height={45} />
      </Link>
      <NavbarButton text="Blog" route="/blog" />
      <NavbarButton text="Contacto" route="/contact" />
      <div className='w-24 sm:hidden ml-auto' onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}>{MenuIcon}</div>
    </nav>
    {isMobileMenuOpen && (<MobileMenu onClose={closeMobileMenu} ref={menuRef} />)}
  </>
  );
};