import { useLottie } from 'lottie-react';
import { useCallback, useState } from 'react';
import { LOTTIE_OPTIONS, useMobileMenuTimeline } from 'utils/animations';

export const useMobileMenu = (menuRef: React.RefObject<HTMLDivElement | null>) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { View: MenuIcon, playSegments } = useLottie(LOTTIE_OPTIONS.MENU);
  const handleMobileMenuClosed = useCallback(() => setIsMobileMenuOpen(false), []);
  const timelineRef = useMobileMenuTimeline(isMobileMenuOpen, menuRef, handleMobileMenuClosed);

  const closeMobileMenu = () => {
    playSegments([30, 0], true);
    timelineRef.current?.reverse();
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    playSegments([0, 30], true);
  };

  return {
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    MenuIcon,
  };
};
