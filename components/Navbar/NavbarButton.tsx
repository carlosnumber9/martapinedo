import { Path } from 'app/types';
import { TransitionLink } from 'components/TransitionLink';
import { usePathname } from 'next/navigation';

interface Props {
  text: string;
  route: Path;
  isMobile?: boolean;
  align?: 'start' | 'end';
  onClick?: () => void;
}

export const NavbarButton: React.FC<Props> = ({
  text,
  route,
  isMobile = false,
  align = 'start',
  onClick,
}) => {
  const path = usePathname();
  const isAlreadyOnRoute = path === route || (route !== '/' && path.startsWith(`${route}/`));
  const alignmentClass = align === 'end' ? (isMobile ? 'mt-auto' : 'ml-auto') : '';

  return (
    <TransitionLink
      href={route}
      className={`${isMobile ? 'block' : 'hidden sm:block'} ${alignmentClass}`}
      onClick={() => (isAlreadyOnRoute ? undefined : onClick?.())}
    >
      <div
        className={`h-full font-subtitle ${
          isAlreadyOnRoute ? 'text-blueSecondary' : 'text-white/90'
        } transition-colors duration-300 cursor-pointer ${isMobile ? 'text-4xl' : 'text-lg'}`}
      >
        {text}
      </div>
    </TransitionLink>
  );
};
