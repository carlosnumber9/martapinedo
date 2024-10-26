import { ButtonConfig, buttons } from './buttons';
import { NavbarButton } from './NavbarButton';

export const Navbar = () => {
  return (
    <nav
      className={
        'fixed top-0 w-screen flex flex-row justify-center align-middle border-white gap-9'
      }
    >
      {' '}
      {buttons.map((button: ButtonConfig) => (
        <NavbarButton {...button} key={button.text} />
      ))}{' '}
    </nav>
  );
};
