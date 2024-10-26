import Link from 'next/link';
import { ButtonConfig } from './buttons';

export const NavbarButton: React.FC<ButtonConfig> = ({ text, route }) => (
  <Link href={route}>
    <div className={'h-full'}>{text}</div>
  </Link>
);
