import { useState, useRef } from "react";
import gsap from "gsap";
import { useLottie } from "lottie-react";
import { useGSAP } from "@gsap/react";
import { LOTTIE_OPTIONS } from "utils/animations";

gsap.registerPlugin(useGSAP);

export const useMobileMenu = (menuRef: React.RefObject<HTMLDivElement | null>) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const { View: MenuIcon, playSegments } = useLottie(LOTTIE_OPTIONS.MENU);

    useGSAP(() => {
        if (isMobileMenuOpen && menuRef.current) {
            timelineRef.current = gsap.timeline({
                onReverseComplete: () => setIsMobileMenuOpen(false)
            });

            timelineRef.current.fromTo(
                menuRef.current,
                { transform: 'translateX(-100%)' },
                { transform: 'translateX(0)', duration: 0.2, ease: 'power3.out' }
            );
        }
    }, { 
        dependencies: [isMobileMenuOpen],
        scope: menuRef 
    });

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