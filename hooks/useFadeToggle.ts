import { RefObject } from 'react';
import { useFadeToggleTimeline } from 'utils/animations';

export function useFadeToggle(ref: RefObject<HTMLElement | null>) {
  const tl = useFadeToggleTimeline(ref);

  const open = () => tl.current?.play();
  const close = () => tl.current?.reverse();

  return { open, close };
}
