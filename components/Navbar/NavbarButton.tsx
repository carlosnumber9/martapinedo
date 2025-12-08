import Link from 'next/link';

interface Props {
  text: string;
  route: string;
}

export const NavbarButton: React.FC<Props> = ({ text, route }) => (
  <Link href={route} className={'hidden sm:block'}>
    <div className={'h-full font-subtitle text-lg'}>{text}</div>
  </Link>
);
