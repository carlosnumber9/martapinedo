import Image from 'next/image';
import { ButtonConfig, buttons } from './buttons';
import { NavbarButton } from './NavbarButton';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav
      className={
        'w-screen flex flex-row justify-start items-center gap-9 h-15 h-20 shadow-custom'
      }
    >
      <Link href={'/'}>
        <Image src="/logo.png" alt="Logo" width={100} height={40} />
      </Link>
      {buttons.map((button: ButtonConfig) => (
        <NavbarButton {...button} key={button.text} />
      ))}{' '}
    </nav>
  );
};
