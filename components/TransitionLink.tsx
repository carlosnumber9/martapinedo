'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useRouteTransition } from './RouteTransitionProvider';

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

const getHrefString = (href: LinkProps['href']) => {
  if (typeof href === 'string') return href;

  const pathname = href.pathname ?? '';
  const query = href.query ? `?${new URLSearchParams(href.query as Record<string, string>)}` : '';
  const hash = href.hash ? `#${href.hash}` : '';

  return `${pathname}${query}${hash}`;
};

const isModifiedClick = (event: MouseEvent<HTMLAnchorElement>) =>
  event.defaultPrevented ||
  event.button !== 0 ||
  event.metaKey ||
  event.altKey ||
  event.ctrlKey ||
  event.shiftKey;

const isLocalRoute = (href: string) => href.startsWith('/') && !href.startsWith('//');

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  onClick,
  replace,
  scroll,
  target,
  ...props
}) => {
  const pathname = usePathname();
  const { navigate } = useRouteTransition();
  const hrefString = getHrefString(href);
  const hrefPathname = hrefString.split('?')[0]?.split('#')[0] ?? hrefString;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      isModifiedClick(event) ||
      target === '_blank' ||
      replace ||
      !isLocalRoute(hrefString) ||
      hrefString.startsWith('#') ||
      hrefPathname === pathname
    ) {
      return;
    }

    event.preventDefault();
    void navigate(hrefString, { scroll });
  };

  return (
    <Link {...props} href={href} onClick={handleClick} replace={replace} scroll={scroll} target={target}>
      {children}
    </Link>
  );
};
