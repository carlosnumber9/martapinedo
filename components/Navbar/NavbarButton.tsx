import { Path } from 'app/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  text: string;
  route: Path;
  isMobile?: boolean;
  onClick?: () => void;
}

export const NavbarButton: React.FC<Props> = ({ text, route, isMobile = false, onClick }) => {
  const path = usePathname();
  return (
    <Link href={route} className={isMobile ? 'block' : 'hidden sm:block'} onClick={onClick}>
      <div className={`h-full font-subtitle ${path === route ? 'text-blueSecondary' : 'text-white/90'} transition-colors duration-300 cursor-pointer ${isMobile ? 'text-4xl' : 'text-lg'}`}>{text}</div>
    </Link>
  )
};
