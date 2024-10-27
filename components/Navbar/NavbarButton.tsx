import Link from 'next/link';
import { ButtonConfig } from './buttons';

export const NavbarButton: React.FC<ButtonConfig> = ({ text, route }) => (
  <Link href={route} className={'hidden sm:block'}>
    <div className={'h-full'}>{text}</div>
  </Link>
);
