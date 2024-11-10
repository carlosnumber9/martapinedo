import Image from 'next/image';
import { NavbarButton } from './NavbarButton';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav
      className={
        'w-screen flex flex-row justify-center sm:justify-start items-center gap-9 h-15 h-20 shadow-custom'
      }
    >
      <Link href={'/'}>
        <Image src="/logo.svg" alt="Logo" width={150} height={45} />
      </Link>
      <NavbarButton text="El Blog" route="/blog" />
    </nav>
  );
};
