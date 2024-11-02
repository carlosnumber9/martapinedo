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
        <Image src="/logo.png" alt="Logo" width={150} height={60} />
      </Link>
      <NavbarButton text="The Blog" route="/blog" />
    </nav>
  );
};
