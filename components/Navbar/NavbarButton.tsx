import { Path } from 'app/types';
import { on } from 'events';
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
  const isAlreadyOnRoute = path === route;
  return (
    <Link href={route} className={isMobile ? 'block' : 'hidden sm:block'} onClick={() => isAlreadyOnRoute ? undefined : onClick?.()}>
      <div className={`h-full font-subtitle ${isAlreadyOnRoute ? 'text-blueSecondary' : 'text-white/90'} transition-colors duration-300 cursor-pointer ${isMobile ? 'text-4xl' : 'text-lg'}`}>{text}</div>
    </Link>
  )
};
