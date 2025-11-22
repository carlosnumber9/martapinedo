import { useRef, useEffect, RefObject } from 'react';
import gsap from 'gsap';

export function useFadeToggle(
    ref: RefObject<HTMLElement | null>,
) {
    const duration = 0.3;

    const tl = useRef<gsap.core.Timeline | null>(null);
    const ctx = useRef<gsap.Context | null>(null);

    useEffect(() => {
        ctx.current = gsap.context(() => {
            tl.current = gsap.timeline({
                paused: true,
            });

            if (ref?.current) {
                tl.current.fromTo(ref.current,
                    { opacity: 0, visibility: 'hidden' },
                    { opacity: 1, visibility: 'visible', duration }
                );
            }
        });

        return () => ctx.current?.revert();
    }, []);

    const open = () => tl.current?.play();
    const close = () => tl.current?.reverse();

    return { open, close };
}